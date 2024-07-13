import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, Text, StyleSheet, FlatList, View, Dimensions, ScrollView } from "react-native";
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect from React Navigation
import { HomeStyles as styles } from '../styles/HomeStyles';
import Header from "../context/Header";
import { getCartItems, removeFromCart } from "../context/Storage";
import MontText from "../components/MontText";
import CartItem from "../components/CartItem";
import Summary from "../components/Summary";

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const { height: viewportHeight } = Dimensions.get('window');

    // Function to load cart items
    const loadCartItems = async () => {
        try {
            const storedCartItems = await getCartItems();
            if (storedCartItems !== null) {
                setCartItems(storedCartItems);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error("Error loading cart items from AsyncStorage:", error);
        }
    };

    // Load cart items on initial render and whenever screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadCartItems();
        }, [])
    );

    const handleDelete = unique_id => {
        setCartItems(prev => prev.filter(item => unique_id !== item.unique_id));
        const saveItem = async () => {
            let response = await removeFromCart(unique_id);
            return response;
        }
        if (saveItem()) {
            console.log("Decrement Successfull");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header header="My Cart" />
            {cartItems.length === 0 ? (
                <View style={localStyles.messageContainer}>
                    <MontText style={localStyles.message}>No Items In The cart</MontText>
                </View>
            ) : (
                // Render items in cart
                <FlatList
                    data={cartItems}
                    renderItem={({ item }) => (
                        <CartItem current={item} setCartItems={setCartItems} handleDelete={handleDelete} />
                    )}
                    keyExtractor={(item) => item.unique_id}
                    style={{ flex: 1, maxHeight: viewportHeight - 170 }}
                    ListFooterComponent={<Summary cartItems={cartItems} />}
                />
            )}
        </SafeAreaView>
    );
};

const localStyles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
    }
});

export default CartScreen;
