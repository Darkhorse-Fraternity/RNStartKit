import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    TouchableWithoutFeedback,
    Animated
} from 'react-native';
import Interactable from 'react-native-interactable';

const Screen = Dimensions.get('window');

export default class TinderCard extends Component {
    constructor(props) {
        super(props);
        this._deltaX = new Animated.Value(0);
    }

    render() {
        return (
            <View style={styles.container}>

                <Interactable.View style={styles.container}
                                   horizontalOnly={true}
                                   snapPoints={[
                                       {x: Screen.width},
                                       {x: 0, damping: 0.8},
                                       {x: -Screen.width}
                                   ]}
                                   animatedValueX={this._deltaX}>
                    <Animated.View style={[styles.card, {
                        transform: [{
                            rotate: this._deltaX.interpolate({
                                inputRange: [-250, 0, 250],
                                outputRange: ['10deg', '0deg', '-10deg']
                            })
                        }]
                    }]}>

                        <TouchableWithoutFeedback onPress={() => {
                            console.log('test:', '1111');
                        }}>
                            <View>
                                <Image style={styles.image} source={require('../../../source/img/tinder-photo.jpg')}/>

                                <Animated.View style={[styles.overlay, {backgroundColor: '#de6d77'}, {
                                    opacity: this._deltaX.interpolate({
                                        inputRange: [-120, 0],
                                        outputRange: [0.8, 0],
                                        extrapolateLeft: 'clamp',
                                        extrapolateRight: 'clamp'
                                    })
                                }]}>
                                    <Text style={styles.overlayText}>暂放</Text>
                                </Animated.View>

                                <Animated.View style={[styles.overlay, {backgroundColor: '#2f9a5d'}, {
                                    opacity: this._deltaX.interpolate({
                                        inputRange: [0, 120],
                                        outputRange: [0, 0.8],
                                        extrapolateLeft: 'clamp',
                                        extrapolateRight: 'clamp'
                                    })
                                }]}>
                                    <Text style={styles.overlayText}>完成</Text>
                                </Animated.View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </Interactable.View>

                <View style={{marginBottom: 40}}>
                    <Text style={styles.text}>向左滑动完成</Text>
                    <Text style={styles.text}>向右滑动暂放</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#efefef',
        width: Screen.width + 80,
        alignSelf: 'center'
    },
    card: {
        width: Screen.width - 40,
        marginHorizontal: 20,
        borderColor: 'white',
        borderWidth: 3
    },
    image: {
        width: Screen.width - 40 - 6,
        height: Screen.width - 40 - 6
    },
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlayText: {
        fontSize: 60,
        color: 'white'
    },
    text: {
        textAlign: 'center',
        marginTop: 4,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#aaaaaa'
    }
});
