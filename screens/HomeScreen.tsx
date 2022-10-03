import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('screen')

import { HomeScreenNavigationProp } from '../navigation/types';

const HomeScreen = () => {

    const navigator = useNavigation<HomeScreenNavigationProp>();

    return <View style={styles.container}>
        <TouchableOpacity style={styles.navigationButton}
            onPress={() => navigator.navigate('Intro')}
        >
            <Text style={styles.buttonText}>Intro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton}
            onPress={() => navigator.navigate('PanGestureHandler')}
        >
            <Text style={styles.buttonText}>PanGestureHandler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton}
            onPress={() => navigator.navigate('InterpolateScroll')}
        >
            <Text style={styles.buttonText}>Interpolate Scroll View</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    navigationButton: {
        paddingLeft: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        width: SCREEN_WIDTH * 0.9,
        height: 40,
        borderRadius: 10,
        backgroundColor: "lightblue",
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default HomeScreen;