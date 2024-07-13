import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import MontText from './MontText';
import ProductItem from "./ProductItem";

const { width: viewportWidth } = Dimensions.get('window');

const CarouselComponent = ({ products }) => {
    const [tech, setTech] = useState([]);
    const [men, setMen] = useState([]);
    const [women, setWomen] = useState([]);

    const extractUsableId = (unique_id) => {
        return parseInt(unique_id.substring(unique_id.indexOf("_") + 1));
    };

    useEffect(() => {
        const sortedProducts = products.sort((a, b) => {
            const idA = extractUsableId(a.unique_id);
            const idB = extractUsableId(b.unique_id);
            return idA - idB;
        });

        const techProducts = [];
        const menProducts = [];
        const womenProducts = [];

        sortedProducts.forEach(item => {
            const id = extractUsableId(item.unique_id);
            if (id >= 1 && id <= 6) {
                techProducts.push(item);
            } else if (id >= 7 && id <= 12) {
                menProducts.push(item);
            } else if (id >= 13 && id <= 18) {
                womenProducts.push(item);
            }
        });

        setTech(techProducts);
        setMen(menProducts);
        setWomen(womenProducts);
    }, [products]);

    const [activeIndexTech, setActiveIndexTech] = useState(0);
    const [activeIndexMen, setActiveIndexMen] = useState(0);
    const [activeIndexWomen, setActiveIndexWomen] = useState(0);

    const scrollViewRefTech = useRef(null);
    const scrollViewRefMen = useRef(null);
    const scrollViewRefWomen = useRef(null);

    const scrollToIndex = (index, ref) => {
        ref.current.scrollTo({ x: index * viewportWidth, animated: true });
    };

    const RenderPagination = ({ activeIndex, setActiveIndex, length, scrollViewRef }) => (
        <View style={styles.paginationContainer}>
            {Array.from({ length: Math.ceil(length / 2) }).map((_, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.dot, activeIndex === index ? styles.activeDot : styles.inactiveDot]}
                    onPress={() => {
                        setActiveIndex(index);
                        scrollToIndex(index, scrollViewRef);
                    }}
                />
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <View>
                <MontText monttype={"MontSemi"} style={styles.header}>Tech Gadgets</MontText>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    ref={scrollViewRefTech}
                    onScroll={(event) => {
                        const contentOffsetX = event.nativeEvent.contentOffset.x;
                        const index = Math.round(contentOffsetX / viewportWidth);
                        setActiveIndexTech(index);
                    }}
                    scrollEventThrottle={16}  // Lower the throttle value for more frequent updates
                    contentContainerStyle={{ justifyContent: 'space-between' }}
                >
                    {tech.map((item, index) => (
                        <ProductItem
                            item={item}
                            index={index}
                            styles={styles}
                            viewportWidth={viewportWidth}
                            key={index}
                        />
                    ))}
                </ScrollView>
                <RenderPagination
                    activeIndex={activeIndexTech}
                    setActiveIndex={setActiveIndexTech}
                    length={tech.length}
                    scrollViewRef={scrollViewRefTech}
                />
            </View>
            <View>
                <MontText monttype={"MontSemi"} style={styles.header}>Men's Fashion</MontText>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    ref={scrollViewRefMen}
                    onScroll={(event) => {
                        const contentOffsetX = event.nativeEvent.contentOffset.x;
                        const index = Math.round(contentOffsetX / viewportWidth);
                        setActiveIndexMen(index);
                    }}
                    scrollEventThrottle={16}  // Lower the throttle value for more frequent updates
                    contentContainerStyle={{ justifyContent: 'space-between' }}
                >
                    {men.map((item, index) => (
                        <ProductItem
                            item={item}
                            index={index}
                            styles={styles}
                            viewportWidth={viewportWidth}
                            key={index}
                        />
                    ))}
                </ScrollView>
                <RenderPagination
                    activeIndex={activeIndexMen}
                    setActiveIndex={setActiveIndexMen}
                    length={men.length}
                    scrollViewRef={scrollViewRefMen}
                />
            </View>
            <View>
                <MontText monttype={"MontSemi"} style={styles.header}>Women's Fashion</MontText>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    ref={scrollViewRefWomen}
                    onScroll={(event) => {
                        const contentOffsetX = event.nativeEvent.contentOffset.x;
                        const index = Math.round(contentOffsetX / viewportWidth);
                        setActiveIndexWomen(index);
                    }}
                    scrollEventThrottle={16}  // Lower the throttle value for more frequent updates
                    contentContainerStyle={{ justifyContent: 'space-between' }}
                >
                    {women.map((item, index) => (
                        <ProductItem
                            item={item}
                            index={index}
                            styles={styles}
                            viewportWidth={viewportWidth}
                            key={index}
                        />
                    ))}
                </ScrollView>
                <RenderPagination
                    activeIndex={activeIndexWomen}
                    setActiveIndex={setActiveIndexWomen}
                    length={women.length}
                    scrollViewRef={scrollViewRefWomen}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: 20,
        marginVertical: 20,
        textAlign: 'left',
    },
    card: {
        display: "flex",
        flexDirection: "column",
        alignItems: 'baseline',
        justifyContent: "flex-start"
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: "#FF7F7D",
    },
    inactiveDot: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: "#BBBBBB",
        opacity: 0.4,
    },
    imgContainer: {
        backgroundColor: '#EDEDEDAB',
        padding: 20,
        paddingVertical: 30,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    cardImage: {
        width: 90,
        height: 90,
    },
    button: {
        borderWidth: 1,
        borderColor: '#FF7F7D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 14,
        marginVertical: 7
    },
    buttonOpp: {
        backgroundColor: '#FF7F7D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 14,
        marginVertical: 7
    },
    buttonText: {
        color: '#2A2A2A',
        fontSize: 12,
    },
    buttonBeen: {
        color: "#FFF",
        fontSize: 12
    }
});

export default CarouselComponent;
