import React from 'react';
import { Text, StyleSheet, Pressable, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
}

export const BigButton: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                variant === 'secondary' ? styles.secondaryButton : styles.primaryButton,
                pressed && variant === 'primary' ? styles.primaryPressed : {},
                pressed && variant === 'secondary' ? styles.secondaryPressed : {},
            ]}
        >
            <Text style={variant === 'secondary' ? styles.secondaryText : styles.primaryText}>
                {title}
            </Text>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5, // Android shadow
    },
    primaryButton: {
        backgroundColor: '#39B54A', // Dark Green (Primary)
    },
    secondaryButton: {
        backgroundColor: '#F27D98', // Pink (Secondary)
    },
    primaryText: {
        color: '#F0F7F7', // White text for primary
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryText: {
        color: '#101010', // Black text for secondary
        fontSize: 18,
        fontWeight: 'bold',
    },
    primaryPressed: {
        transform: [{ scale: 0.96 }], // Shrinks slightly when pressed
        opacity: 0.8, // Reduces opacity slightly
    },
    secondaryPressed: {
        transform: [{ scale: 0.96 }], // Shrinks slightly when pressed
        opacity: 0.8, // Reduces opacity slightly
    },
});

