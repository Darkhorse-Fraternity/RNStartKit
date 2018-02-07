import {Animated, Easing, I18nManager} from 'react-native';

function forInitial(props) {
    const {navigation, scene} = props;

    const focused = navigation.state.index === scene.index;
    const opacity = focused ? 1 : 0;
    // If not focused, move the scene far away.
    const translate = focused ? 0 : 1000000;
    return {
        opacity,
        transform: [{translateX: translate}, {translateY: translate}],
    };
}

export function forRotate(props) {
    const {layout, position, scene} = props;

    if (!layout.isMeasured) {
        return forInitial(props);
    }

    const index = scene.index;

    // Add [index - 1, index - 0.99] to the interpolated opacity for screen transition.
    // This makes the screen's shadow to disappear smoothly.
    const opacity = position.interpolate({
        inputRange: [
            index - 1,
            index - 0.99,
            index,
            index + 0.99,
            index + 1,
        ],
        outputRange: [0, 1, 1, 0.3, 0],
    });


    const rotate = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: ['360deg', '0deg', '0deg']
    });

    return {
        opacity,
        transform: [
            { perspective: 850 },
            {rotateY:rotate}
        ],
    };
}

