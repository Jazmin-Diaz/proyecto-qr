export type ParsedQrContent = {
  type: "link" | "text" | "wifi" | "contact";
  title: string;
  icon: "link" | "text-outline" | "wifi" | "person-outline";
  actionLabel?: string;
  actionUrl?: string;
  fields: {
    label: string;
    value: string;
  }[];
  rawValue: string;
};

const unescapeQrField = (value = "") =>
  value
    .replace(/\\;/g, ";")
    .replace(/\\,/g, ",")
    .replace(/\\:/g, ":")
    .replace(/\\\\/g, "\\")
    .trim();

const splitEscaped = (value: string, separator: string) => {
  const parts: string[] = [];
  let current = "";
  let isEscaped = false;

  for (const character of value) {
    if (isEscaped) {
      current += `\\${character}`;
      isEscaped = false;
      continue;
    }

    if (character === "\\") {
      isEscaped = true;
      continue;
    }

    if (character === separator) {
      parts.push(current);
      current = "";
      continue;
    }

    current += character;
  }

  parts.push(current);
  return parts;
};

const parseKeyValuePayload = (payload: string) =>
  splitEscaped(payload, ";").reduce<Record<string, string>>((fields, part) => {
    const separatorIndex = part.indexOf(":");

    if (separatorIndex < 0) {
      return fields;
    }

    const key = part.slice(0, separatorIndex).toUpperCase();
    const value = part.slice(separatorIndex + 1);
    fields[key] = unescapeQrField(value);
    return fields;
  }, {});

const getEscapedWifiField = (payload: string, key: string) => {
  const match = payload.match(
    new RegExp(`(?:^|;)${key}:((?:\\\\.|[^;])*)`, "i")
  );

  return unescapeQrField(match?.[1] ?? "");
};

const parseWifiFields = (value: string) => {
  const wifiIndex = value.toUpperCase().indexOf("WIFI:");

  if (wifiIndex < 0) {
    return null;
  }

  const payload = value.slice(wifiIndex + 5);
  const fields = parseKeyValuePayload(payload);
  const network = fields.S || getEscapedWifiField(payload, "S");
  const password = fields.P || getEscapedWifiField(payload, "P");
  const rawSecurity = fields.T || getEscapedWifiField(payload, "T") || "WPA";
  const security = rawSecurity.toLowerCase() === "nopass" ? "Sin clave" : rawSecurity;

  if (!network && !password) {
    return null;
  }

  return [
    { label: "Red", value: network || "Sin nombre" },
    { label: "Seguridad", value: security },
    {
      label: "Contrasena",
      value:
        rawSecurity.toLowerCase() === "nopass"
          ? "Sin clave"
          : password || "No incluida",
    },
  ];
};

const unfoldVCardLines = (value: string) =>
  value.split(/\r?\n/).reduce<string[]>((lines, line) => {
    if (/^[ \t]/.test(line) && lines.length > 0) {
      lines[lines.length - 1] += line.slice(1);
      return lines;
    }

    lines.push(line);
    return lines;
  }, []);

const formatVCardName = (value = "") => {
  const [lastName, firstName, middleName, prefix, suffix] =
    splitEscaped(value, ";").map(unescapeQrField);

  return [prefix, firstName, middleName, lastName, suffix]
    .filter(Boolean)
    .join(" ")
    .trim();
};

const parseVCardPayload = (value: string) =>
  unfoldVCardLines(value).reduce<Record<string, string>>((fields, line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex < 0) {
      return fields;
    }

    const key = line.slice(0, separatorIndex).split(";")[0].toUpperCase();
    const fieldValue = unescapeQrField(line.slice(separatorIndex + 1));

    if (!fieldValue || fields[key]) {
      return fields;
    }

    fields[key] = key === "N" ? formatVCardName(fieldValue) : fieldValue;
    return fields;
  }, {});

const parseLabeledContactPayload = (value: string) => {
  const normalizedValue = value.replace(/\r\n/g, "\n");
  const compactValue = normalizedValue.replace(/\n/g, " ");
  const contactNamePattern =
    /nombre(?!\s+de\s+la\s+red)\s*:?\s*([^\n\r]+)/i;
  const compactContactNamePattern =
    /nombre(?!\s+de\s+la\s+red)\s*:?\s*(.*?)(?=\s*(?:tel[eé]fono|tel|correo|email)\s*:|$)/i;
  const contactFields = [
    {
      label: "Nombre",
      value:
        normalizedValue.match(contactNamePattern)?.[1]?.trim() ??
        compactValue
          .match(compactContactNamePattern)?.[1]
          ?.trim() ??
        "",
    },
    {
      label: "Telefono",
      value:
        normalizedValue.match(/tel[eé]fono\s*:?\s*([^\n\r]+)/i)?.[1]?.trim() ??
        normalizedValue.match(/tel\s*:?\s*([^\n\r]+)/i)?.[1]?.trim() ??
        compactValue
          .match(/tel[eé]fono\s*:?\s*(.*?)(?=\s*(?:nombre|correo|email)\s*:|$)/i)?.[1]
          ?.trim() ??
        compactValue
          .match(/tel\s*:?\s*(.*?)(?=\s*(?:nombre|correo|email)\s*:|$)/i)?.[1]
          ?.trim() ??
        "",
    },
    {
      label: "Correo",
      value:
        normalizedValue
          .match(/correo(?:\s+electr[oó]nico)?\s*:?\s*([^\n\r]+)/i)?.[1]
          ?.trim() ??
        normalizedValue.match(/email\s*:?\s*([^\n\r]+)/i)?.[1]?.trim() ??
        compactValue
          .match(/correo(?:\s+electr[oó]nico)?\s*:?\s*(.*?)(?=\s*(?:nombre|tel[eé]fono|tel)\s*:|$)/i)?.[1]
          ?.trim() ??
        compactValue
          .match(/email\s*:?\s*(.*?)(?=\s*(?:nombre|tel[eé]fono|tel)\s*:|$)/i)?.[1]
          ?.trim() ??
        "",
    },
  ].filter((field) => field.value);

  const hasExplicitContactLabel =
    /\b(?:tel[eé]fono|tel|correo|email)\b\s*:?/i.test(normalizedValue) ||
    /\bnombre(?!\s+de\s+la\s+red)\b\s*:?/i.test(normalizedValue);

  return contactFields.length >= 2 || (hasExplicitContactLabel && contactFields.length > 0)
    ? contactFields
    : [];
};

const parseLabeledWifiPayload = (value: string) => {
  const compactValue = value.replace(/\r?\n/g, " ");
  const network =
    compactValue
      .match(/(?:^|\s)(?:red|ssid|nombre\s+de\s+la\s+red)\s*:\s*(.*?)(?=\s*(?:clave|contrase(?:n|ñ)a|password|seguridad)\s*:|$)/i)?.[1]
      ?.trim() ?? "";
  const password =
    compactValue
      .match(/(?:^|\s)(?:clave|contrase(?:n|ñ)a|password)\s*:\s*(.*?)(?=\s*(?:red|ssid|seguridad)\s*:|$)/i)?.[1]
      ?.trim() ?? "";
  const security =
    compactValue
      .match(/(?:^|\s)seguridad\s*:\s*(.*?)(?=\s*(?:red|ssid|clave|contrase(?:n|ñ)a|password)\s*:|$)/i)?.[1]
      ?.trim() ?? "No especificado";
  const normalizedSecurity = /^(?:nopass|sin\s+(?:clave|contrase(?:n|ñ)a))$/i.test(
    security
  )
    ? "Sin clave"
    : security;

  if (!network && !password) {
    return [];
  }

  return [
    { label: "Red", value: network || "Sin nombre" },
    { label: "Seguridad", value: normalizedSecurity },
    {
      label: "Contrasena",
      value: normalizedSecurity === "Sin clave" ? "Sin clave" : password || "No incluida",
    },
  ];
};

const parseCompactWifiPayload = (value: string) => {
  const compactValue = value.trim().replace(/\s+/g, " ");
  const parts = compactValue.split(" ");

  if (
    parts.length < 2 ||
    compactValue.includes(":") ||
    compactValue.includes(";") ||
    compactValue.includes("@")
  ) {
    return [];
  }

  const network = parts.slice(0, -1).join(" ");
  const password = parts[parts.length - 1];
  const passwordLooksLikeWifiKey = /\d/.test(password) || password.length >= 6;

  if (!network || !password || !passwordLooksLikeWifiKey) {
    return [];
  }

  return [
    { label: "Red", value: network },
    { label: "Seguridad", value: "WPA" },
    { label: "Contrasena", value: password },
  ];
};

const shouldPreferCompactWifi = (value: string) =>
  value.trim().replace(/\s+/g, " ").split(" ").length > 2;

const parseCompactContactPayload = (value: string) => {
  const compactValue = value.trim().replace(/\s+/g, " ");

  if (!compactValue) {
    return [];
  }

  if (parseCompactWifiPayload(compactValue).length > 0) {
    return [];
  }

  const parts = compactValue.split(" ");
  const email = compactValue.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] ?? "";
  const phone = compactValue.match(/(?:\+?\d[\d()\-\s]{6,}\d)/)?.[0]?.trim() ?? "";

  if (email || phone) {
    const name = compactValue
      .replace(email, "")
      .replace(phone, "")
      .replace(/\s+/g, " ")
      .trim();
    const contactFields = [
      { label: "Nombre", value: name },
      { label: "Telefono", value: phone },
      { label: "Correo", value: email },
    ].filter((field) => field.value);

    if (contactFields.length >= 2 || (name && (email || phone))) {
      return contactFields;
    }
  }

  if (parts.length === 2) {
    const [name, phone] = parts;
    const phoneDigits = phone.replace(/\D/g, "");
    const phoneLooksLikeContact =
      /^[+]?[0-9()\-\s]+$/.test(phone) && phoneDigits.length >= 8;

    if (name && phoneLooksLikeContact) {
      return [
        { label: "Nombre", value: name },
        { label: "Telefono", value: phone },
      ];
    }
  }

  const looksLikeNameOnly =
    parts.length <= 4 &&
    !compactValue.includes(":") &&
    !compactValue.includes(";") &&
    !compactValue.includes("@") &&
    !/\d/.test(compactValue);

  if (looksLikeNameOnly) {
    return [{ label: "Nombre", value: compactValue }];
  }

  if (
    parts.length !== 1 ||
    compactValue.includes(":") ||
    compactValue.includes(";") ||
    compactValue.includes("@") ||
    /\d/.test(compactValue)
  ) {
    return [];
  }

  return [{ label: "Nombre", value: compactValue }];
};

const isLinkValue = (value: string) => /^https?:\/\//i.test(value.trim());

export const parseQrContent = (value = ""): ParsedQrContent => {
  const rawValue = value;
  const comparableValue = rawValue.trim();
  const upperValue = comparableValue.toUpperCase();

  const wifiFields = parseWifiFields(comparableValue);

  if (wifiFields) {
    return {
      type: "wifi",
      title: "RED WIFI",
      icon: "wifi",
      fields: wifiFields,
      rawValue,
    };
  }

  if (upperValue.startsWith("MECARD:")) {
    const fields = parseKeyValuePayload(comparableValue.slice(7));
    const contactFields = [
      { label: "Nombre", value: fields.N },
      { label: "Telefono", value: fields.TEL },
      { label: "Correo", value: fields.EMAIL },
    ].filter((field) => field.value);

    return {
      type: "contact",
      title: "CONTACTO",
      icon: "person-outline",
      fields:
        contactFields.length > 0
          ? contactFields
          : [{ label: "Contacto", value: rawValue }],
      rawValue,
    };
  }

  if (upperValue.startsWith("BEGIN:VCARD")) {
    const fields = parseVCardPayload(rawValue);
    const contactFields = [
      { label: "Nombre", value: fields.FN || fields.N },
      { label: "Telefono", value: fields.TEL },
      { label: "Correo", value: fields.EMAIL },
      { label: "Organizacion", value: fields.ORG },
      { label: "Direccion", value: fields.ADR },
      { label: "Sitio web", value: fields.URL },
    ].filter((field) => field.value);

    return {
      type: "contact",
      title: "CONTACTO",
      icon: "person-outline",
      fields:
        contactFields.length > 0
          ? contactFields
          : [{ label: "Contacto", value: comparableValue }],
      rawValue,
    };
  }

  const labeledWifiFields = parseLabeledWifiPayload(comparableValue);

  if (labeledWifiFields.length > 0) {
    return {
      type: "wifi",
      title: "RED WIFI",
      icon: "wifi",
      fields: labeledWifiFields,
      rawValue,
    };
  }

  const labeledContactFields = parseLabeledContactPayload(comparableValue);

  if (labeledContactFields.length > 0) {
    return {
      type: "contact",
      title: "CONTACTO",
      icon: "person-outline",
      fields: labeledContactFields,
      rawValue,
    };
  }

  const compactWifiFields = parseCompactWifiPayload(comparableValue);

  if (compactWifiFields.length > 0 && shouldPreferCompactWifi(comparableValue)) {
    return {
      type: "wifi",
      title: "RED WIFI",
      icon: "wifi",
      fields: compactWifiFields,
      rawValue,
    };
  }

  const compactContactFields = parseCompactContactPayload(comparableValue);

  if (compactContactFields.length > 0) {
    return {
      type: "contact",
      title: "CONTACTO",
      icon: "person-outline",
      fields: compactContactFields,
      rawValue,
    };
  }

  if (compactWifiFields.length > 0) {
    return {
      type: "wifi",
      title: "RED WIFI",
      icon: "wifi",
      fields: compactWifiFields,
      rawValue,
    };
  }

  if (isLinkValue(comparableValue)) {
    return {
      type: "link",
      title: "ENLACE DETECTADO",
      icon: "link",
      actionLabel: "Ir al sitio web",
      actionUrl: comparableValue,
      fields: [{ label: "Link", value: comparableValue }],
      rawValue,
    };
  }

  return {
    type: "text",
    title: "TEXTO DEL QR",
    icon: "text-outline",
    fields: [{ label: "Texto", value: comparableValue || "Sin contenido" }],
    rawValue,
  };
};
