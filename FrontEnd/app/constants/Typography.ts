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
    light: 'Rubik_300Light',
    regular: 'Rubik_400Regular',
    medium: 'Rubik_500Medium',
    semiBold: 'Rubik_600SemiBold',
    bold: 'Rubik_700Bold',
    extraBold: 'Rubik_800ExtraBold',
    black: 'Rubik_900Black',
    lightItalic: 'Rubik_300Light_Italic',
    regularItalic: 'Rubik_400Regular_Italic',
    mediumItalic: 'Rubik_500Medium_Italic',
    semiBoldItalic: 'Rubik_600SemiBold_Italic',
    boldItalic: 'Rubik_700Bold_Italic',
    extraBoldItalic: 'Rubik_800ExtraBold_Italic',
    blackItalic: 'Rubik_900Black_Italic',
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
