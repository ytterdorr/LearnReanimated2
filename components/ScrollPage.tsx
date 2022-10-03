import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface PageProps {
    title: string;
    index: number;
    translateX: Animated.SharedValue<number>;
}

const { height: WINDOW_HEIGHT, width: WINDOW_WIDHT } = Dimensions.get("window");

const SIZE = WINDOW_WIDHT * 0.7

const ScrollPage: React.FC<PageProps> = ({ index, title, translateX }) => {

    const inputRange = [(index - 1) * WINDOW_WIDHT, index * WINDOW_WIDHT, (index + 1) * WINDOW_WIDHT];

    const rStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP
        )

        const borderRadius = interpolate(
            translateX.value,
            inputRange,
            [0, SIZE / 2, 0],
            Extrapolate.CLAMP

        )
        console.log("Scale: ", scale)

        return {
            borderRadius,
            transform: [{ scale }]
        }
    });

    const rTextStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            translateX.value,
            inputRange,
            [-WINDOW_HEIGHT / 2, 0, 0],
            Extrapolate.CLAMP

        )

        const opacity = interpolate(
            translateX.value,
            inputRange,
            [-2, 1, -2],
            Extrapolate.CLAMP
        )


        return {
            transform: [
                { translateY }
            ]
        }
    })

    return <View style={[styles.pageContainer, { backgroundColor: `rgba(0,0,256, 0.${index + 2})` }]} >
        <Animated.View style={[styles.square, rStyle]}>
            <Animated.View style={[rTextStyle]}>
                <Text style={styles.text}>{title}</Text>
            </Animated.View>
        </Animated.View>
    </View>
}
const styles = StyleSheet.create({
    pageContainer: {
        width: WINDOW_WIDHT,
        height: WINDOW_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },
    square: {
        height: SIZE,
        width: SIZE,
        backgroundColor: 'blue',
        borderRadius: SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 70,
        fontWeight: "bold",
        textTransform: 'uppercase',
    }
})


export default ScrollPage;
