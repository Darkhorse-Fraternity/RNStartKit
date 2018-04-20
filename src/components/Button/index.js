const React = require('react');
const ReactNative = require('react-native');
const {
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
    View
} = ReactNative;

const ButtonIOS = (props) => {
    return <TouchableOpacity {...props}>
        {props.children}
    </TouchableOpacity>;
};

const ButtonAndroid = (props) => {
    return <TouchableNativeFeedback
        delayPressIn={0}
        background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
        {...props}
    >
        {props.innerView ||props.style ? (
            <View style={props.style}>
                {props.children}
            </View>) : props.children}
    </TouchableNativeFeedback>;
};


module.exports = Platform.OS === 'ios' ? ButtonIOS : ButtonAndroid;
