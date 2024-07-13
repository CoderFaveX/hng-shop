import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import MontText from "./MontText";
import TrashIcon from "../icons/TrashIcon";
import { editCartItem, removeFromCart } from "../context/Storage";

const CartItem = ({ current, handleDelete, setCartItems }) => {
    const format = (no) => no.toLocaleString('en-US').substring(0, no.toString().length - 1);

    const handleIncrement = () => {
        setCartItems(prev => prev.map(item => item.unique_id === current.unique_id ? ({ ...item, orderCount: item.orderCount + 1 }) : item));
        const saveItem = async () => {
            let response = await editCartItem(current.unique_id, current);
            return response;
        }
        if (saveItem()) {
            console.log("Increment Successfull");
        }
    };
    const handleDecrement = () => {
        setCartItems(prev => prev.map(item =>item.unique_id === current.unique_id ? ({ ...item, orderCount: item.orderCount == 1 ? 1 : item.orderCount - 1 }) : item ));
        const saveItem = async () => {
            let response = await editCartItem(current.unique_id, current);
            return response;
        }
        if (saveItem()) {
            console.log("Decrement Successfull");
        }
    };

    return (
        <View key={current.unique_id} style={styles.card}>
            <Image style={styles.image} resizeMode="contain" source={{ uri: `https://api.timbu.cloud/images/${current.photos[0].url}` }} />
            <View style={styles.detailsContainer}>
                <MontText style={styles.name}>{current.name}</MontText>
                <MontText monttype={"Mont"} style={styles.description}>{current.description}</MontText>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={handleDecrement} style={[styles.box, { paddingHorizontal: 8.5, marginRight: 20 }]}>
                        <MontText>-</MontText>
                    </TouchableOpacity>
                    <MontText>{current.orderCount}</MontText>
                    <TouchableOpacity onPress={handleIncrement} style={[styles.box, { marginLeft: 20 }]}>
                        <MontText>+</MontText>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.priceContainer}>
                <TouchableOpacity onPress={() => handleDelete(current.unique_id)}>
                    <TrashIcon />
                </TouchableOpacity>
                <MontText style={{ fontSize: 13 }}>N{format(current.current_price[0].NGN)}</MontText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        borderWidth: 1,
        borderColor: "#2A2A2A1A",
        borderRadius: 5,
        marginVertical: 10,
    },
    detailsContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
    },
    name: {
        fontSize: 12,
        marginVertical: 4
    },
    description: {
        fontSize: 11,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 10,
    },
    priceContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexDirection: "column",
        height: 70
    },
    trashIcon: {
        alignSelf: "flex-start",
    },
    price: {
        alignSelf: "flex-end",
    },
    box: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 0.7,
        borderColor: "#2A2A2A",
        paddingVertical: 0,
        paddingHorizontal: 7,
    }
});

export default CartItem;
