import { Platform } from 'react-native';
import { Tokens } from '@/theme/tokens';

const primaryColor = Tokens.colors.primary;
const secondaryColor = Tokens.colors.secondary;
const backgroundColor = Tokens.colors.background;
const textColor = Tokens.colors.text;

export const Colors = {
  light: {
    text: textColor,
    background: backgroundColor,
    tint: primaryColor,
    icon: textColor,
    tabIconDefault: '#8E8E93',
    tabIconSelected: primaryColor,
    secondary: secondaryColor,
  },
  dark: {
    text: backgroundColor,
    background: textColor,
    tint: secondaryColor,
    icon: backgroundColor,
    tabIconDefault: '#8E8E93',
    tabIconSelected: secondaryColor,
    secondary: primaryColor,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
