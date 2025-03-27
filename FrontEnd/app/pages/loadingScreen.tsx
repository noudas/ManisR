import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Logo } from '../components/Logo';
import { Colors } from '@constants/Colors';

export const LoadingScreen = () => {
    const spinValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        // Spin animation (continuous loop)
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 750,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // Scale animation (bounce effect)
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['360deg', '0deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ rotate: spin }, { scale: scaleValue }] }}>
                <Logo />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
});
