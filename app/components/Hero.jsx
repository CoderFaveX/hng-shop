import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import MontText from './MontText'; // Adjust the import path as necessary

const HeroComponent = () => {
    return (
        <ImageBackground source={require('../../assets/images/HeroBg.png')} style={styles.heroBackground}>
            <View style={styles.overlay}>
                <MontText style={styles.heroText}>Premium Sound,</MontText>
                <MontText style={styles.heroText}>Premium Savings,</MontText>
                <MontText style={styles.heroSubText}>Limited offer, hop on and get yours now</MontText>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    heroBackground: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    overlay: {
        backgroundColor: "transparent",
        padding: 20,
        borderRadius: 10,
    },
    heroText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'left',
    },
    heroSubText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'left',
        marginTop: 10,
    },
});

export default HeroComponent;
