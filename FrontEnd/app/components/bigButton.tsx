import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, Pressable, Animated } from 'react-native';
import Colors from '@/constants/Colors';
import Typography from '@/constants/Typography';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
}

const BigButton: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
    const [isHovered, setIsHovered] = useState(false);

    const hoverAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(hoverAnim, {
            toValue: isHovered ? 1 : 0,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [isHovered]);

    const backgroundColor = hoverAnim.interpolate({
        inputRange: [0, 1],
        outputRange: variant === 'primary' ? [Colors.primary, Colors.secondary] : ['transparent', 'transparent'],
    });

    const borderColor = hoverAnim.interpolate({
        inputRange: [0, 1],
        outputRange: variant === 'secondary' ? [Colors.primary, Colors.secondary] : [Colors.primary, Colors.primary],
    });

    return (
        <Pressable
            onPress={onPress}
            onHoverIn={() => setIsHovered(true)}
            onHoverOut={() => setIsHovered(false)}
            style={({ pressed }) => [
                styles.button,
                variant === 'secondary' ? styles.secondaryButton : styles.primaryButton,
                pressed && variant === 'primary' ? styles.primaryPressed : {},
                pressed && variant === 'secondary' ? styles.secondaryPressed : {},
            ]}
        >
            <Animated.View style={[styles.animatedContainer, { backgroundColor, borderColor }]}>
                <Text style={variant === 'secondary' ? styles.secondaryText : styles.primaryText}>
                    {title}
                </Text>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 297,
        height: 53,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    animatedContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 2,
    },

    // Primary button styles
    primaryButton: {
        backgroundColor: Colors.primary,
    },
    primaryText: {
        color: Colors.background,
        fontSize: Typography.fontSize.medium,
        fontFamily: Typography.fontFamily.semiBold_weight_600,
        fontWeight: '600',
        lineHeight: Typography.lineHeight.default(Typography.fontSize.medium),
    },
    primaryPressed: {
        transform: [{ scale: 0.98 }],
    },

    // Secondary button styles
    secondaryButton: {
        borderColor: Colors.primary,
        borderWidth: 1.5,
        backgroundColor: 'transparent',
    },
    secondaryText: {
        color: Colors.text,
        fontSize: Typography.fontSize.medium,
        fontFamily: Typography.fontFamily.semiBold_weight_600,
        fontWeight: '600',
        lineHeight: Typography.lineHeight.default(Typography.fontSize.medium),
    },
    secondaryPressed: {
        transform: [{ scale: 0.98 }],
    },
});

export default BigButton;
