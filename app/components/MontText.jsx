import React from 'react';
import { Text, StyleSheet } from 'react-native';

const MontText = ({ children, style, monttype, ...props }) => {
    return (
        <Text style={[styles.text, { fontFamily: monttype || "MontSemi" }, style]} {...props}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16
    },
});

export default MontText;
