import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const Header = ({ header, renderIcon = false, iconname, handleClick }) => {
    return (
        <View style={styles.header}>
            {
                !renderIcon ?
                    <Image
                        source={require("../../assets/images/materiallogo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    /> : <Ionicons name={iconname} size={20} style={{ marginRight: 20 }} onPress={() => handleClick()} />
            }
            <Text style={styles.headerText}>{header}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "transparent",
        paddingVertical: 25,
    },
    logo: {
        width: 99,
        height: 31,
        marginRight: 10,
    },
    headerText: {
        color: "#000",
        fontSize: 18,
        fontFamily: "MontSemi",
    },
});

export default Header;
