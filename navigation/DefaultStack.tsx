import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';

import { DefaultStackNavigatorParamList } from './types';
import PanGestureHandlerScreen from '../screens/PanGestureHandlerScreen';
import PanGestureOfficial from '../screens/PanGestureOfficial';
import InterpolateScrollViewScreen from '../screens/InterpolateScrollViewScreen';


const DefaultStack = createNativeStackNavigator<DefaultStackNavigatorParamList>();

const DefaultStackNavigator = () => {
    return (
        <DefaultStack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }} >
            <DefaultStack.Screen name="Home" component={HomeScreen} />
            {/* <DefaultStack.Screen name="Intro" component={IntroScreen} />
            <DefaultStack.Screen name="PanGestureHandler" component={PanGestureHandlerScreen} />
            <DefaultStack.Screen name="PanGestureOfficial" component={PanGestureOfficial} />
            <DefaultStack.Screen name="InterpolateScroll" component={InterpolateScrollViewScreen} /> */}

        </DefaultStack.Navigator>
    );
};

export default DefaultStackNavigator;