import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export const Logo = () => {
    return (
        <View style={styles.logoContainer}>
            <Image source={require('@assets/images/logo.png')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});
