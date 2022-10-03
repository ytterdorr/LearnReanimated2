import React, { useCallback, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Logs } from 'expo';
import Animated, {
    useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming,
} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
// Following this tutorial:
// https://www.youtube.com/watch?v=yz9E10Dq8Bg&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ&index=1&ab_channel=Reactiive



Logs.enableExpoCliLogging();
console.log("== EXPO LOGGING ENABLED ==");

type ContextType = {
    translateX: number;
    translateY: number;
};

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");


const SIZE = 100.0;
const CIRCLE_RADIUS = (SCREEN_WIDTH / 2) * 0.8

const PanGestureHandlerScreen = () => {


    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const isTouching = () => {
        console.log("Is touching")
    }

    const otherIdea = useCallback(
        Animated.event(
            [{
                nativeEvent: {
                    translationX: translateX,
                    translationY: translateY,
                },
            }],
            { useNativeDriver: true },
        ),
        []
    )

    const panGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        ContextType
    >({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },
        onEnd: () => {
            const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

            // if (distance < CIRCLE_RADIUS + SIZE / 2) {
            //     translateX.value = withSpring(0);
            //     translateY.value = withSpring(0);
            // }
        },
    });

    const panGestureEventMine = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>(
        {
            onStart: (event, context) => {
                console.log("Gesture started")
                context.translateX = translateX.value;
                context.translateY = translateY.value
            },
            onActive: (event, context) => {
                translateX.value = event.translationX + context.translateX;
                translateY.value = event.translationY + context.translateY;
            },
            onEnd: (event) => {
                const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

                console.log("Gesture ended")
                if (distance < CIRCLE_RADIUS + SIZE / 2) {
                    translateX.value = withSpring(0);
                    translateY.value = withSpring(0);
                }

            },
        }
    )

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: translateX.value,
            },
            {
                translateY: translateY.value,

            }

            ]
        }
    })

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.circle}>
                    <PanGestureHandler onGestureEvent={panGestureEventMine}>
                        <Animated.View style={[styles.square, rStyle]} />
                    </PanGestureHandler>
                </View>
            </View>
        </GestureHandlerRootView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    square: {
        width: SIZE,
        height: SIZE,
        backgroundColor: 'rgba(0,0,256,0.8)',
        borderRadius: 20,
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "blue",
        borderWidth: 5,
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,


    }
})

export default PanGestureHandlerScreen;