import React, { useEffect, useState } from "react";
import MontText from "../components/MontText";
import { Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../context/Header";
import { useNavigation } from "@react-navigation/native";

const Payment = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        cardNo: "",
        expiry: "",
        cvv: ""
    });
    const [isDisabled, setIsDisabled] = useState(true);
    const { height: viewportHeight } = Dimensions.get('window');


    useEffect(() => {
        if (
            formData.cardNo.trim() !== "" &&
            formData.expiry.trim() !== "" &&
            formData.cvv.trim() !== ""
        ) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [formData]);

    const handleNavigate = () => {
        navigation.navigate("CheckOut")
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header renderIcon={true} handleClick={handleNavigate} iconname={"arrow-back"} header="Payment" />
            <ImageBackground source={require('../../assets/images/confetti.png')} style={[styles.heroBackground, { height: viewportHeight - 300}]}>
                <View style={styles.card}>
                    <View style={styles.bgCard}>
                        <View style={[styles.circle, { transform: [{ translateX: 220 }, { translateY: -10 }] }]}></View>
                        <View style={[styles.circle, { transform: [{ translateX: 140 }, { translateY: -220 }] }]}></View>
                    </View>
                    <View style={styles.textView}>
                        <MontText style={{ alignSelf: "flex-end", color: "#FAFAFA", fontSize: 20, marginVertical: 10, marginHorizontal: 20 }}>VISA</MontText>
                        <MontText style={{ fontSize: 20, marginTop: 70, marginHorizontal: 10, color: "#FAFAFA", }}>{formData.cardNo == "" ? "0000 0000 0000 0000" : formData.cardNo}</MontText>
                        <View style={styles.viewflex}>
                            <View style={styles.view}>
                                <MontText style={{ color: "#FAFAFA", fontSize: 12 }}>Card Holder Name</MontText>
                                <MontText style={{ color: "#FAFAFA", fontSize: 12 }} monttype={"Mont"}>Hasfat Ardo</MontText>
                            </View>
                            <View style={styles.view}>
                                <MontText style={{ color: "#FAFAFA", fontSize: 12 }}>Card Holder Name</MontText>
                                <MontText style={{ color: "#FAFAFA", fontSize: 12 }} monttype={"Mont"}>{formData.expiry == "" ? "02/30" : formData.expiry}</MontText>
                            </View>
                            <Image source={require("../../assets/images/cardbar.png")} style={{ width: 42, height: 31 }} />
                        </View>
                    </View>
                </View>
                <MontText style={{ fontSize: 13, marginTop: 7 }}>Card Number</MontText>
                <View style={{ borderWidth: 1, borderColor: "#2A2A2A", borderRadius: 9, padding: 10, marginVertical: 10 }}>
                    <TextInput value={formData.cardNo} onChangeText={e => setFormData(prev => ({ ...prev, cardNo: e }))} style={{ fontFamily: "Mont" }} placeholder="0000 0000 0000 0000" />
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <MontText style={{ fontSize: 13, marginTop: 7, width: "55%" }}>Expiry Date</MontText>
                    <MontText style={{ fontSize: 13, marginTop: 7, flex: 1 }}>CVV</MontText>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ borderWidth: 1, borderColor: "#2A2A2A", borderRadius: 9, paddingVertical: 8, paddingHorizontal: 10, marginVertical: 10, width: "45%" }}>
                        <TextInput value={formData.expiry} onChangeText={e => setFormData(prev => ({ ...prev, expiry: e }))} style={{ fontFamily: "Mont" }} placeholder="MM/YY" />
                    </View>
                    <View style={{ borderWidth: 1, borderColor: "#2A2A2A", borderRadius: 9, paddingVertical: 8, paddingHorizontal: 10, marginVertical: 10, width: "45%" }}>
                        <TextInput value={formData.cvv} onChangeText={e => setFormData(prev => ({ ...prev, cvv: e }))} style={{ fontFamily: "Mont" }} placeholder="123" />
                    </View>
                </View>
                <TouchableOpacity disabled={isDisabled} style={[styles.wideButton, isDisabled ? { backgroundColor: "#FF9F9D" } : null]} onPress={() => navigation.navigate("Successful")}>
                    <MontText style={{ fontSize: 12.5 }}>Make Payment</MontText>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView >
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
    card: {
        height: 217,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    bgCard: {
        backgroundColor: "#2A2A2AF2",
        borderRadius: 10,
        height: 217,
        width: "100%",
        borderWidth: 1,
        borderColor: "#FFF"
    },
    circle: {
        width: 158,
        height: 158,
        borderRadius: 158,
        backgroundColor: "#FAFAFA40"
    },
    textView: {
        position: "absolute",
        height: 217,
        width: "100%",
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    viewflex: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        flex: 1,
        width: "100%",
        padding: 10
    },
    view: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
    wideButton: {
        backgroundColor: "#FF7F7D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 12,
        width: "90%",
        marginVertical: 20,
        marginHorizontal: "auto"
    }
});

export default Payment;