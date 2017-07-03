'use strict';

import React, {Component, PropTypes} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Text,
    Navigator,
    Vibration,
    Linking,
    Animated,
    Easing,
    View,
    Image,
} from 'react-native';

import Camera from 'react-native-camera'
import {sweep_bg, sweep_line} from '../../source'
import * as Animatable from 'react-native-animatable';

function makeSlideInTranslation(translationType, fromValue) {
    return {
        from: {
            [translationType]: 0,
        },
        to: {
            [translationType]: fromValue,
        },
    };
}
export const slideOutDownBig = makeSlideInTranslation('translateY', 200);
Animatable.initializeRegistryWithDefinitions({slideOutDownBig})
import _ from 'lodash';
export default class QRCodeScanner extends Component {
    static propTypes = {
        onRead: PropTypes.func.isRequired,
        reactivate: PropTypes.bool,
        reactivateTimeout: PropTypes.number,
        fadeIn: PropTypes.bool,
        showMarker: PropTypes.bool,
        customMarker: PropTypes.element,

    }

    static defaultProps = {
        onRead: (e) => (console.log('QR code scanned!', e.datat)),
        reactivate: false,
        reactivateTimeout: 30000,
        fadeIn: true,
        showMarker: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            scanning: false,
            lineTop: 0,
        }

        // this._handleBarCodeRead = this._handleBarCodeRead.bind(this);
        this._handleBarCodeRead = _.throttle(this._handleBarCodeRead, 1000);
    }

    timer: number


    componentDidMount() {
        // if (this.props.fadeIn) {
        //     Animated.sequence([
        //         Animated.delay(1000),
        //         Animated.timing(
        //             this.state.fadeInOpacity,
        //             {
        //                 toValue: 1,
        //                 easing: Easing.inOut(Easing.quad),
        //             },
        //         )
        //     ]).start();
        // }
        // var self = this
        // this.timer = setInterval(() => {
        //     let num = self.state.lineTop
        //     if (num == 180) num = 1;
        //     num++;
        //     self.setState({lineTop: num})
        // }, 10)
    }

    componentWillUnmount() {
        // this.timer && clearInterval(this.timer)
        // this.timer2 && clearTimeout(this.timer2)
    }


    flag:bool = false
    _handleBarCodeRead(e) {
        // console.log('e:', e);
        const origin = e.bounds.origin
       const  sh = Dimensions.get('window').height
        // console.log('test:', this);
        // console.log('test:', this.flag);
        if(origin.x>50 && origin.y>100 && (sh - origin.y )> 100  && this.flag === false){
            this.flag = true;
            // console.log('test:', this.flag);
            this.props.onRead(e)
            Vibration.vibrate();//控制震动。
        }

    }


    _renderCameraMarker() {
        return (
            <Image source={sweep_bg} style={styles.rectangleContainer}>
                <View style={styles.rectangle}>
                    <Animatable.Image
                        useNativeDriver
                        iterationCount="infinite"
                        direction="alternate"
                        duration={2000}
                        easing="ease-in-out"
                        //transition = {['translateY']}
                        source={sweep_line}
                        style={[styles.line]}
                        animation="slideOutDownBig"
                    />
                    {/*<Image source={sweep_line} style={[styles.line,{top:this.state.lineTop}]}/>*/}
                </View>
            </Image>
        )
    }


    _renderQR() {
        return (
            <Camera {...this.props}
                aspect={Camera.constants.Aspect.fill}
                barCodeTypes={["org.iso.QRCode"]}
                style={styles.camera}
                onBarCodeRead={this._handleBarCodeRead.bind(this)}>
                {this._renderCameraMarker()}
            </Camera>
        )
    }

    render() {
        // if (this.props.fadeIn) {
        //     return (
        //         <Animated.View
        //             style={{
        //     opacity: this.state.fadeInOpacity,
        //     backgroundColor: 'transparent',
        //     flex:1,
        // }}>
        //             {this._renderQR()}
        //             <Text style={styles.text}>放入框内,自动扫描</Text>
        //         </Animated.View>
        //     )
        // }
        return this._renderQR()

    }


}

const styles = StyleSheet.create({


    textBold: {
        fontWeight: '500',
        color: '#000',
    },

    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },

    buttonTouchable: {
        // backgroundColor: 'pink',
        padding: 16,
    },

    camera: {

        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },

    rectangleContainer: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },

    rectangle: {
        height: 200,
        width: 200,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    line: {
        marginTop:-20
    },
    text: {
        marginTop: -200,
        fontSize: 13,
        color: 'rgb(150,150,150)',
        alignSelf: 'center'
    }
})
