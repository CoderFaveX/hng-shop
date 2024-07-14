import React from "react";
import MontText from "../components/MontText";
import { Image, SafeAreaView, StyleSheet, ImageBackground, View } from "react-native";
import Header from "../context/Header";

const Successful = () => {
    const { height: viewportHeight } = Dimensions.get('window');

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../../assets/images/confetti.png')} style={[styles.heroBackground, { height: viewportHeight - 180 }]}>
                <Header header="" />
                <MontText style={{ fontSize: 20, color: "#2A2A2A", marginHorizontal: "auto", marginVertical: 20 }}>Payment Successful</MontText>
                <View style={{ marginTop: 40, marginHorizontal: "auto" }}>
                    <View style={{ backgroundColor: "#FF7F7D", padding: 20, width: 100, borderRadius: 120, marginHorizontal: "auto" }}>
                        <Image style={{ width: 67, height: 67 }} source={require("../../assets/images/checks.png")} />
                    </View>
                    <MontText style={{ fontSize: 18, textAlign: "center", marginVertical: 10 }}>Payment Successful</MontText>
                    <MontText style={{ textAlign: "center" }} monttype={"Mont"}>Thanks for your purchase</MontText>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingHorizontal: 15,
    },
    heroBackground: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
});

export default Successful;