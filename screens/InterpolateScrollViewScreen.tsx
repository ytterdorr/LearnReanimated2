import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ScrollPage from '../components/ScrollPage';

const WORDS = ["Nice", "To", "See", "You"]

const InterpolateScrollViewScreen = () => {

    const translateX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        // console.log(event.contentOffset.x);
        translateX.value = event.contentOffset.x;
    })



    return (
        <Animated.ScrollView
            pagingEnabled
            horizontal
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            style={styles.container}>
            {WORDS.map((title, index) => {
                return <ScrollPage key={index} title={title} index={index} translateX={translateX}></ScrollPage>
            })}

        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default InterpolateScrollViewScreen