import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { addToCart, removeFromCart, getCartItems } from '../context/Storage.js';
import { Ionicons } from '@expo/vector-icons';
import MontText from './MontText';
import { useFocusEffect } from '@react-navigation/native';

const Rating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<Ionicons key={`full-${i}`} size={14} name="star" color="#FFC657" />);
    }
    if (halfStar) {
        stars.push(<Ionicons key="half" size={14} name='star-half' color="#FFC657" />);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<Ionicons key={`empty-${i}`} size={14} name='star-outline' color="#FFC657" />);
    }

    return <View style={{ display: "flex", flexDirection: "row" }}>{stars}</View>;
};

const ProductItem = ({ item, styles, index, viewportWidth }) => {
    const [inCart, setInCart] = useState(false);
    const format = no => no.toLocaleString('en-US').substring(0, no.toString().length - 1);

    useFocusEffect(
        useCallback(() => {
            checkInCart();
        }, [])
    );

    const checkInCart = async () => {
        const cartItems = await getCartItems();
        const found = cartItems.some(cartItem => cartItem.unique_id === item.unique_id);
        setInCart(found);
    };

    const handleToggleCart = async () => {
        if (inCart) {
            const removed = await removeFromCart(item.unique_id);
            if (removed) setInCart(false);
        } else {
            const newItem = {...item, orderCount: 1};
            const added = await addToCart(newItem);
            if (added) setInCart(true);
        }
    };

    return (
        <View key={item.unique_id} style={[styles.card, { width: (viewportWidth / 2) - 25, marginLeft: index !== 0 ? 10 : 0 }]}>
            <View style={styles.imgContainer}>
                <Image style={styles.cardImage} resizeMode="cover" source={{ uri: `https://api.timbu.cloud/images/${item.photos[0].url}` }} />
            </View>
            <View style={{ marginVertical: 10, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <MontText style={{ fontSize: 12, color: "#2A2A2A" }} numberOfLines={1} >{item.name}</MontText>
                <MontText style={{ fontSize: 12, marginVertical: 5, color: "#000" }} monttype={"Mont"} numberOfLines={2}>{item.description.substring(0, 19)}{item.description.length > 19 ? "..." : ""}</MontText>
                <Rating rating={4} />
                <MontText style={{ fontSize: 13, color: "#FF7F7D", marginTop: 4 }} monttype="Mont">N {format(item.current_price[0].NGN)}</MontText>
                <TouchableOpacity style={!inCart ? styles.button : styles.buttonOpp} onPress={handleToggleCart}>
                    <MontText style={!inCart ? styles.buttonText : styles.buttonBeen} monttype={"Mont"}>{inCart ? "Remove" : "Add to Cart"}</MontText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProductItem;
