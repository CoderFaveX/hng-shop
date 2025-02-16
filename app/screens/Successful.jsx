import React, { useEffect } from "react";
import MontText from "../components/MontText";
import { Image, SafeAreaView, StyleSheet, ImageBackground, View, Dimensions } from "react-native";
import Header from "../context/Header";
import { overwrite } from "../context/Storage";
import { useNavigation } from "@react-navigation/native";

const Successful = () => {
    const { height: viewportHeight } = Dimensions.get('window');
    const navigate = useNavigation();

    useEffect(() => {
        (async () => {
            const response = await overwrite([]);
            if (response) {
                console.log("Payment Made");
                setTimeout(() => navigate.navigate("Home"), 2500);
            };
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header header="" />
            <ImageBackground source={require('../../assets/images/confetti.png')} resizeMode="cover" style={[styles.heroBackground, { height: viewportHeight - 90 }]}>
                <MontText style={{ fontSize: 20, color: "#2A2A2A", marginHorizontal: "auto", marginVertical: 20 }}>Payment Successful</MontText>
                <View style={{ marginTop: 150, marginHorizontal: "auto" }}>
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
        borderRadius: 10,
        overflow: 'hidden',
    },
});

export default Successful;