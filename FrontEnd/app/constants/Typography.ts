import { useFonts } from 'expo-font';
import { 
  Rubik_300Light, Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, 
  Rubik_700Bold, Rubik_800ExtraBold, Rubik_900Black 
} from '@expo-google-fonts/rubik';

import { 
  Rubik_300Light_Italic, Rubik_400Regular_Italic, Rubik_500Medium_Italic, 
  Rubik_600SemiBold_Italic, Rubik_700Bold_Italic, Rubik_800ExtraBold_Italic, 
  Rubik_900Black_Italic 
} from '@expo-google-fonts/rubik';

const Typography = {
  fontFamily: {
    light_weight_300: 'Rubik_300Light',
    regular_weight_400: 'Rubik_400Regular',
    medium_weight_500: 'Rubik_500Medium',
    semiBold_weight_600: 'Rubik_600SemiBold',
    bold_weight_700: 'Rubik_700Bold',
    extraBold_weight_800: 'Rubik_800ExtraBold',
    black_weight_900: 'Rubik_900Black',
    lightItalic_weight_300: 'Rubik_300Light_Italic',
    regularItalic_weight_400: 'Rubik_400Regular_Italic',
    mediumItalic_weight_500: 'Rubik_500Medium_Italic',
    semiBoldItalic_weight_600: 'Rubik_600SemiBold_Italic',
    boldItalic_weight_700: 'Rubik_700Bold_Italic',
    extraBoldItalic_weight_800: 'Rubik_800ExtraBold_Italic',
    blackItalic_weight_900: 'Rubik_900Black_Italic',

  },
  fontSize: {
    small: 15,
    regular: 16,
    medium: 18,
    large: 30,
    extraLarge: 32,
    huge: 40,
  },
  lineHeight: {
    tight: (size: number) => size * 1.58, // 158%
    default: (size: number) => size * 1.0, // 100%
  }
};

export default Typography;
