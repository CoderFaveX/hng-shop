import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "@cart";

export const overwrite = async (items) => {
  try {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
    return true; // Item added successfully
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};

export const addToCart = async (item) => {
  try {
    let cart = await AsyncStorage.getItem(CART_KEY);
    cart = cart ? JSON.parse(cart) : [];

    // Check if item is already in cart
    const existingItem = cart.find((cartItem) => cartItem.unique_id === item.unique_id);
    if (existingItem) {
      return false; // Item already exists in cart
    }

    cart.push(item);
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    return true; // Item added successfully
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    let cart = await AsyncStorage.getItem(CART_KEY);
    cart = cart ? JSON.parse(cart) : [];

    const updatedCart = cart.filter((item) => item.unique_id !== itemId);
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    return updatedCart; // Item removed successfully
  } catch (error) {
    console.error("Error removing from cart:", error);
    return JSON.parse(cart);
  }
};

export const getCartItems = async () => {
  try {
    const cart = await AsyncStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error getting cart items:", error);
    return [];
  }
};

export const editCartItem = async (unique_id, newItem) => {
  try {
    let cart = await AsyncStorage.getItem(CART_KEY);
    cart = cart ? JSON.parse(cart) : [];

    const itemIndex = cart.findIndex((item) => item.unique_id === unique_id);
    if (itemIndex === -1) {
      return false; // Item not found in the cart
    }

    // Update the item
    cart[itemIndex] = { ...cart[itemIndex], ...newItem };

    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
    return true; // Item edited successfully
  } catch (error) {
    console.error("Error editing cart item:", error);
    return false;
  }
};
