import Animated from 'react-native-reanimated';
import { helloWaveStyles } from "../styles/helloWaveStyles";

export function HelloWave() {
  return (
    <Animated.Text
      style={helloWaveStyles.wave}>
      👋
    </Animated.Text>
  );
}
