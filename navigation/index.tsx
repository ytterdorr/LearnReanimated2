import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import DefaultStackNavigator from './DefaultStack';

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <DefaultStackNavigator />
        </NavigationContainer>
    );
};

export default RootNavigator;