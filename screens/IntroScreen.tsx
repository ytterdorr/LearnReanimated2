import { useEffect } from 'react';
import * as React from 'react-native';
import { StyleSheet, View, Text } from 'react-native';

// Following this tutorial:
// https://www.youtube.com/watch?v=yz9E10Dq8Bg&list=PLjHsmVtnAr9TWoMAh-3QMiP7bPUqPFuFZ&index=1&ab_channel=Reactiive

import Animated, {
    useSharedValue, useAnimatedStyle, withSpring, withTiming, withRepeat, useAnimatedGestureHandler
} from 'react-native-reanimated';

const handleRotation = (progress: Animated.SharedValue<number>) => {
    "worklet";
    return `${progress.value * 2 * Math.PI}rad`
}

const SIZE = 100.0;

const IntroScreen = () => {
    const progress = useSharedValue(1);
    const scale = useSharedValue(2);

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            borderRadius: progress.value * SIZE / 2,
            transform: [{ scale: scale.value },
            { rotate: handleRotation(progress) }],
        }
    }, [])

    useEffect(() => {
        const reverse = true
        progress.value = withRepeat(withSpring(0.5), -1, reverse);
        scale.value = withRepeat(withSpring(1), 3, reverse);
    }, [])

    return <View style={styles.container}>
        <Animated.View style={[{ height: SIZE, width: SIZE, backgroundColor: 'blue' }, reanimatedStyle]}>

        </Animated.View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default IntroScreen;