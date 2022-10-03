import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, interpolate, withSpring, withTiming } from 'react-native-reanimated';

const imageUri = 'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window")

// Credit to Mariana Ibanez https://unsplash.com/photos/NJ8Z8Y_xUKc
const PinchGestureScreen = () => {

    const scale = useSharedValue(1);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onStart: (event) => {

        },
        onActive: (event) => {



            focalX.value = event.focalX;
            focalY.value = event.focalY;
            console.log(event);
            scale.value = event.scale
        },
        onEnd: (event) => {
            scale.value = withTiming(1);
        },
    });

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value },
                { translateY: focalY.value },
                { translateX: -WINDOW_WIDTH / 2 },
                { translateY: -WINDOW_HEIGHT / 2 },
                { scale: scale.value },
                { translateX: -focalX.value },
                { translateY: -focalY.value },
                { translateX: WINDOW_WIDTH / 2 },
                { translateY: WINDOW_HEIGHT / 2 },
            ]
        }
    })

    const rFocalPointStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: focalX.value - 10 },
                { translateY: focalY.value - 10 },
            ]
        }
    })

    const AnimatedImage = Animated.createAnimatedComponent(Image);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <PinchGestureHandler onGestureEvent={pinchHandler}>
                <Animated.View style={{ flex: 1 }}>
                    <AnimatedImage style={[{ flex: 1 }, rStyle]} source={{ uri: imageUri }} />
                    <Animated.View style={[styles.focalPoint, rFocalPointStyle]} />
                </Animated.View>
            </PinchGestureHandler>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    focalPoint: {
        ...StyleSheet.absoluteFillObject,
        width: 20,
        height: 20,
        backgroundColor: 'blue',
        borderRadius: 10,

    }
})

export default PinchGestureScreen;