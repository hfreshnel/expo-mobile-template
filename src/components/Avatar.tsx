import { Image, type ImageStyle } from 'expo-image';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { FONT_FAMILY, LIGHT_PALETTE } from '@/constants/theme';

type Props = {
  name?: string;
  initials?: string;
  imageUri?: string;
  size?: number;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
};

function initialsFromName(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('');
}

export default function Avatar({
  name,
  initials,
  imageUri,
  size = 44,
  backgroundColor = LIGHT_PALETTE.primary,
  style,
}: Props) {
  const dimensionStyle = { width: size, height: size, borderRadius: size / 2 };

  if (imageUri) {
    return (
      <Image
        source={{ uri: imageUri }}
        style={[dimensionStyle, style] as StyleProp<ImageStyle>}
        contentFit="cover"
        accessibilityLabel={name}
      />
    );
  }

  const label = initials ?? (name ? initialsFromName(name) : '');

  return (
    <View style={[styles.base, dimensionStyle, { backgroundColor }, style]}>
      <Text style={[styles.label, { fontSize: size * 0.36 }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  label: {
    fontFamily: FONT_FAMILY.bold,
    fontWeight: '800',
    color: LIGHT_PALETTE.textInverse,
  },
});
