import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, Dimensions } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, useDerivedValue, withTiming } from "react-native-reanimated";

const Colors = {
    dark: {
        background: '#1E1E1E',
        circle: '#252525',
        text: '#F8F8F8',
    },
    light: {
        background: '#F8F8F8',
        circle: '#FFF',
        text: '#1E1E1E',
    },
};

const SWITCH_TRACK_COLOR = {
    true: 'rgba(256, 0, 256, 0.2)',
    false: 'rgba(0,0,0,0.1)',
};

type Theme = 'light' | 'dark';

const InterpolateColorsScreen = () => {

    const [theme, setTheme] = useState<Theme>('light');

    const progress = useDerivedValue(() => {
        return theme === 'dark' ? withTiming(1, { duration: 300 }) : withTiming(0, { duration: 300 })
    }, [theme]);

    const toggleTheme = (toggled: boolean) => {
        setTheme(toggled ? 'dark' : 'light');
    }

    const rStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(progress.value, [0, 1], [Colors.light.background, Colors.dark.background]);
        return {
            backgroundColor
        }
    });

    const rCircleStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(progress.value, [0, 1], [Colors.light.circle, Colors.dark.circle]);
        return {
            backgroundColor
        }
    });

    const rTextStyle = useAnimatedStyle(() => {
        const color = interpolateColor(progress.value, [0, 1], [Colors.light.text, Colors.dark.text])
        return {
            color
        }
    })


    return (
        <Animated.View style={[styles.container, rStyle]}>
            <Animated.Text style={[styles.text, rTextStyle]}>THEME</Animated.Text>
            <Animated.View style={[styles.circle, rCircleStyle]}>
                <Switch
                    value={theme === 'dark'}
                    onValueChange={(toggled) => { toggleTheme(toggled) }}
                    trackColor={SWITCH_TRACK_COLOR}
                    thumbColor={'violet'}
                ></Switch>
            </Animated.View>
        </Animated.View>
    )
}

const SIZE = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: SIZE,
        height: SIZE,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZE / 2,
        shadowOffset: {
            width: 20, height: 20
        },
        elevation: 8,
        backgroundColor: 'white',

    },
    text: {
        fontSize: 70,
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: 14,
    }
})

export default InterpolateColorsScreen;