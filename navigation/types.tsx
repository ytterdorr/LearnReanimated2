import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type DefaultStackNavigatorParamList = {
    Home: undefined;
    Intro: undefined;
    PanGestureHandler: undefined;
    PanGestureOfficial: undefined;
    InterpolateScroll: undefined;
}

export type HomeScreenNavigationProp = NativeStackNavigationProp<
    DefaultStackNavigatorParamList,
    "Intro", "PanGestureHandler"
>;