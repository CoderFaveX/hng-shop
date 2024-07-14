import React, { useEffect, useState } from "react";
import MontText from "./MontText";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Summary = ({ cartItems }) => {
    const [subTotal, setsubTotal] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        const calculateTotalPrice = () => {
            let total = 0;
            cartItems.map(item => {
                const NGN = item.current_price[0].NGN;
                const price = parseInt(NGN.toString().substring(0, NGN.toString().length - 2));
                const orderCount = parseInt(item.orderCount);
                total += price * orderCount;
            });
            setsubTotal(total);
        };

        calculateTotalPrice();
    }, [cartItems]);
    return (
        <View style={styles.summaryContainer}>
            <MontText style={{ marginVertical: 10, fontSize: 16 }}>Shopping Summary</MontText>
            <MontText monttype={"Mont"} style={{ marginVertical: 5, fontSize: 14 }}>Discount Code</MontText>
            <View style={styles.inputFlex}>
                <TextInput style={styles.input} />
                <TouchableOpacity style={styles.button}>
                    <MontText monttype={"MontSemi"} style={{ fontSize: 12, color: "#2A2A2A" }}>Apply</MontText>
                </TouchableOpacity>
            </View>
            <View style={[styles.inputFlex, { marginTop: 10 }]}>
                <MontText monttype={"Mont"} style={{ fontSize: 13, flex: 1 }}>Sub-Total</MontText>
                <MontText style={{ fontSize: 14, color: "#2A2A2A" }}>N {subTotal.toLocaleString("en-US")}</MontText>
            </View>
            <View style={styles.inputFlex}>
                <MontText monttype={"Mont"} style={{ fontSize: 13, flex: 1 }}>Delivery Fee</MontText>
                <MontText style={{ fontSize: 14, color: "#2A2A2A" }}>N {parseInt(0.05 * subTotal).toLocaleString("en-US")}</MontText>
            </View>
            <View style={styles.inputFlex}>
                <MontText monttype={"Mont"} style={{ fontSize: 13, flex: 1 }}>Discount Amount</MontText>
                <MontText style={{ fontSize: 14, color: "#2A2A2A" }}>N {parseInt(0.15 * subTotal).toLocaleString("en-US")}</MontText>
            </View>
            <View style={styles.line}></View>
            <View style={styles.inputFlex}>
                <MontText monttype={"Mont"} style={{ fontSize: 13, flex: 1 }}>Total Amount</MontText>
                <MontText style={{ fontSize: 14, color: "#2A2A2A" }}>N {(subTotal + (0.05 * subTotal)) - (0.15 * subTotal)}</MontText>
            </View>
            <TouchableOpacity style={styles.wideButton} onPress={() => navigation.navigate("CheckOut")}>
                <MontText style={{ fontSize: 12.5 }}>CheckOut</MontText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    summaryContainer: {
        backgroundColor: "#EDEDED",
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 25,
    },
    inputFlex: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 4,
        gap: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#2A2A2A",
        borderRadius: 9,
        padding: 5,
        fontFamily: "Mont"
    },
    button: {
        backgroundColor: "#FF7F7D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 7
    },
    line: {
        borderWidth: 1,
        borderColor: "#2A2A2A80",
        marginVertical: 15,
        borderStyle: "dashed"
    },
    wideButton: {
        backgroundColor: "#FF7F7D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 7,
        flex: 1
    }
});

export default Summary;