import { useState } from "react";
import type { QrType } from "../src/constants/qr";
import {
  DEFAULT_QR_BACKGROUND,
  DEFAULT_QR_COLOR,
  DEFAULT_QR_LOGO,
  type QrLogoId,
} from "../src/constants/qr-customization";

export function useQrForm() {
  const [selectedType, setSelectedType] = useState<QrType>("link");
  const [link, setLink] = useState("");
  const [text, setText] = useState("");
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState("WPA");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [qrColor, setQrColor] = useState(DEFAULT_QR_COLOR);
  const [qrBackgroundColor, setQrBackgroundColor] = useState(DEFAULT_QR_BACKGROUND);
  const [qrLogo, setQrLogo] = useState<QrLogoId>(DEFAULT_QR_LOGO);
  const [qrLogoImageUri, setQrLogoImageUri] = useState("");

  const resetCurrentForm = () => {
    setQrLogo(DEFAULT_QR_LOGO);
    setQrLogoImageUri("");

    if (selectedType === "link") {
      setLink("");
      return;
    }

    if (selectedType === "text") {
      setText("");
      return;
    }

    if (selectedType === "wifi") {
      setWifiName("");
      setWifiPassword("");
      setWifiSecurity("WPA");
      return;
    }

    setContactName("");
    setContactPhone("");
    setContactEmail("");
  };

  return {
    selectedType,
    setSelectedType,
    link,
    setLink,
    text,
    setText,
    wifiName,
    setWifiName,
    wifiPassword,
    setWifiPassword,
    wifiSecurity,
    setWifiSecurity,
    contactName,
    setContactName,
    contactPhone,
    setContactPhone,
    contactEmail,
    setContactEmail,
    qrColor,
    setQrColor,
    qrBackgroundColor,
    setQrBackgroundColor,
    qrLogo,
    setQrLogo,
    qrLogoImageUri,
    setQrLogoImageUri,
    resetCurrentForm,
  };
}

export type QrFormState = ReturnType<typeof useQrForm>;
