import React, { useEffect, useState } from "react";
import MontText from "../components/MontText";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Header from "../context/Header";
import RadioButton from "../components/RadioButton";
import { useNavigation } from "@react-navigation/native";

const CheckOutScreen = () => {
    const navigation = useNavigation();
    const { height: viewportHeight } = Dimensions.get('window');
    const [isDisabled, setIsDisabled] = useState(true);
    const [formData, setFormData] = useState({
        delivery: "",
        phone1: "",
        phone2: "",
    });

    useEffect(() => {
        if (
            formData.delivery.trim() !== "" &&
            formData.phone1.trim() !== "" &&
            formData.phone2.trim() !== ""
        ) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [formData]);

    return (
        <SafeAreaView style={styles.container}>
            <Header header="CheckOut" />
            <ScrollView style={{ flex: 1, maxHeight: viewportHeight - 180 }} contentContainerStyle={{ paddingBottom: 20 }}>
                <MontText style={{ color: "#2A2A2A", fontSize: 16, marginVertical: 7 }}>Select how to recieve your package(s)</MontText>
                <MontText style={{ color: "#2A2A2A", fontSize: 14, marginVertical: 7 }}>Pickup</MontText>
                <RadioButton />
                <MontText style={{ fontSize: 13, marginTop: 7 }}>Delivery</MontText>
                <View style={{ borderWidth: 1, borderColor: "#2A2A2A", borderRadius: 9, padding: 10, marginVertical: 10 }}>
                    <TextInput value={formData.delivery} onChangeText={e => setFormData(prev => ({ ...prev, delivery: e }))} style={{ fontFamily: "Mont" }} />
                </View>
                <MontText style={{ fontSize: 13, marginTop: 7 }}>Contact</MontText>
                <View style={{ borderWidth: 1, borderColor: "#2A2A2A", borderRadius: 9, paddingVertical: 8, paddingHorizontal: 10, marginVertical: 10, width: "80%" }}>
                    <TextInput value={formData.phone1} onChangeText={e => setFormData(prev => ({ ...prev, phone1: e }))} style={{ fontFamily: "Mont" }} placeholder="Phone No1" />
                </View>
                <View style={{ borderWidth: 1, borderColor: "#2A2A2A", borderRadius: 9, paddingVertical: 8, paddingHorizontal: 10, marginVertical: 10, width: "80%" }}>
                    <TextInput value={formData.phone2} onChangeText={e => setFormData(prev => ({ ...prev, phone2: e }))} style={{ fontFamily: "Mont" }} placeholder="Phone No2" />
                </View>
                <TouchableOpacity disabled={isDisabled} style={[styles.wideButton, isDisabled ? { backgroundColor: "#FF9F9D" } : null]} onPress={() => navigation.navigate("Payment")}>
                    <MontText style={{ fontSize: 12.5 }}>Go To Payment</MontText>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingHorizontal: 15,
    },
    wideButton: {
        backgroundColor: "#FF7F7D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 12,
        flex: 1,
        width: "90%",
        marginVertical: 20,
        marginHorizontal: "auto"
    }
});

export default CheckOutScreen;