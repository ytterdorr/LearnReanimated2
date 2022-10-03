import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';

import { DefaultStackNavigatorParamList } from './types';
import PanGestureHandlerScreen from '../screens/PanGestureHandlerScreen';
import InterpolateScrollViewScreen from '../screens/InterpolateScrollViewScreen';
import InterpolateColorsScreen from '../screens/InterpolateColorsScreen';
import PinchGestureScreen from '../screens/PinchGestureScreen';


const DefaultStack = createNativeStackNavigator<DefaultStackNavigatorParamList>();

const DefaultStackNavigator = () => {
    return (
        <DefaultStack.Navigator initialRouteName='PinchGesture' screenOptions={{ headerShown: false }} >
            <DefaultStack.Screen name="Home" component={HomeScreen} />
            <DefaultStack.Screen name="Intro" component={IntroScreen} />
            <DefaultStack.Screen name="PanGestureHandler" component={PanGestureHandlerScreen} />
            <DefaultStack.Screen name="InterpolateScroll" component={InterpolateScrollViewScreen} />
            <DefaultStack.Screen name="InterpolateColor" component={InterpolateColorsScreen} />
            <DefaultStack.Screen name="PinchGesture" component={PinchGestureScreen} />

        </DefaultStack.Navigator>
    );
};

export default DefaultStackNavigator;