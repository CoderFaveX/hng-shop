import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // Import only what you need from Expo icons
import { ProductProvider } from './context/ProductContext';
import { useFonts } from 'expo-font';
// Import screens
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import CheckOutScreen from './screens/CheckOutScreen';
import Payment from './screens/Payment';
import Successful from './screens/Successful';
import HomeIcon from "./icons/HomeIcon";
import CartIcon from "./icons/CartIcon";
import CheckOutIcon from "./icons/CheckOutIcon";

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CheckOutStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CheckOut" component={CheckOutScreen} />
    <Stack.Screen name="Payment" component={Payment} />
    <Stack.Screen name="Successful" component={Successful} />
  </Stack.Navigator>
);

const CustomTabBar = ({ state, descriptors, navigation, isVisible }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabItem}
          >
            <View style={{
              backgroundColor: isFocused ? '#FF7F7D' : 'transparent',
              padding: options.tabBarIcon == "CartView" ? 3 : 7,
              borderRadius: 50,
            }}>
              {returnIcon(options.tabBarIcon, isFocused ? '#2A2A2A' : '#FAFAFA', 20, 20)}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const returnIcon = (name, color, width, height) => {
  switch (name) {
    case 'Home':
      return <HomeIcon style={{ color: color }} width={width} height={height} />;
    case 'Cart':
      return <CartIcon style={{ color: color }} width={width} height={height} />;
    case 'CheckOutStack':
      return <CheckOutIcon style={{ color: color }} />;
    default:
      return <HomeIcon style={{ color: color }} width={width} height={height} />;
  }
};

const Index = () => {
  const [fontsLoaded] = useFonts({
    Mont: require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
    MontSemi: require('../assets/fonts/static/Montserrat-SemiBold.ttf'),
    MontBold: require('../assets/fonts/static/Montserrat-SemiBold.ttf'),
  });

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsVisible(false);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsVisible(true);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
      <ProductProvider>
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} isVisible={isVisible} />}
          screenOptions={({ route }) => ({
            tabBarIcon: route.name,
          })}
        >
          <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Tab.Screen name="Cart" options={{ headerShown: false }} component={CartScreen} />
          <Tab.Screen name="CheckOutStack" options={{ headerShown: false }} component={CheckOutStack} />
        </Tab.Navigator>
      </ProductProvider>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
