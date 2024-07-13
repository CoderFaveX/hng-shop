import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, View, FlatList, TouchableOpacity, Text, Button, Image, SafeAreaView, StyleSheet, Animated, ScrollView, Dimensions } from 'react-native';
import { HomeStyles as styles } from '../styles/HomeStyles';
import { Ionicons } from '@expo/vector-icons';
import { ProductContext } from "../context/ProductContext";
import Header from "../context/Header";
import Hero from "../components/Hero";
import CarouselComponent from "../components/CarouselComponent";
import { getCartItems, overwrite, set } from "../context/Storage";

const HomeScreen = () => {
    const { products, loading, error } = useContext(ProductContext);
    const { height: viewportHeight } = Dimensions.get('window');
    const [animatedValue] = useState(new Animated.Value(-100));

    useEffect(() => {
        if (error) {
            Animated.timing(animatedValue, {
                toValue: 10,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [animatedValue, error]);

    useEffect(() => {
        const extractUsableId = (unique_id) => {
            return parseInt(unique_id.substring(unique_id.indexOf("_") + 1));
        };
        const sortedProducts = products.sort((a, b) => {
            const idA = extractUsableId(a.unique_id);
            const idB = extractUsableId(b.unique_id);
            return idA - idB;
        });
        (async () => {
            let cartItems = await getCartItems();
            const mapProducts = new Map(sortedProducts.map(obj => [obj.unique_id, obj]));
            const updatedCartItems = cartItems.map(obj2 => {
                const obj1 = mapProducts.get(obj2.unique_id); // Get corresponding object from array1
                if (obj1) {
                    return { ...obj2, ...obj1 }; // Merge obj2 with obj1 (array1's object)
                } else {
                    return obj2; // Return obj2 as is if no corresponding obj1 found
                }
            });
            if (overwrite(updatedCartItems)) {
                console.log("Updated the cart");
            }
        })();
    }, []);

    const errorMessage = error?.response?.data || 'Failed to load products';
    const errorCode = error?.response?.status || 'Unknown Error';

    const hideError = () => {
        Animated.timing(animatedValue, {
            toValue: -300,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header header="Product List" />
            <ScrollView style={{ flex: 1, maxHeight: viewportHeight - 180 }} contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Animated error message */}
                {error && (
                    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                        <Animated.View style={[styles.errorContainer, { transform: [{ translateY: animatedValue }] }]}>
                            <Ionicons name='close' size={20} style={styles.errorIcon} onPress={hideError} />
                            <Text style={styles.errorText}>{error.code} (401)</Text>
                        </Animated.View>
                        <View style={styles.networkErrorContainer}>
                            <Image source={require("../../assets/images/networkerr.png")} style={styles.networkErrorImage} />
                            <Text style={styles.networkErrorText}>The Products Weren't Loaded</Text>
                            <View style={styles.networkErrorSteps}>
                                <Text style={styles.networkErrorStepText}>- Check your internet connection</Text>
                                <Text style={styles.networkErrorStepText}>- Try refreshing the page</Text>
                                <Text style={styles.networkErrorStepText}>- Move closer to your router</Text>
                                <Text style={styles.networkErrorStepText}>- Contact your internet service provider if the problem persists</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Loading indicator */}
                {loading && (
                    <View style={{ flex: 1, height: viewportHeight - 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ActivityIndicator size="large" color="#B7D7FD" />
                    </View>
                )}

                {/* Product list */}
                {!loading && !error && (
                    <View style={{ flex: 1 }}>
                        <Hero />
                        <CarouselComponent products={products} />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
