/* @flow */
'use strict';
import React, {Component, PropTypes} from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    ScrollView,
    WebView,
    TouchableOpacity,
    Image,
    Platform,
    Linking
} from 'react-native';

import {navbarHeight, screenHeight} from '../../util';

import ExceptionView, {ExceptionType} from '../ExceptionView';
import {connect} from 'react-redux';




const WEBVIEW_REF = 'webview';
import {NavigaNavigation} from 'react-navigation';
// const noWifi = require('../../../source/img/xy_nowifi/xy_nowifi.png');
class BaseWebView extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            status: "No Page Loaded",
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            scalesPageToFit: true,
        };
    }

    state: {
        status:string,
        backButtonEnabled:bool,
        forwardButtonEnabled:bool,
        loading:bool,
        scalesPageToFit:bool,
    };

    static propTypes = {
        url: PropTypes.string,
    };


    static navigationOptions = props => {
        const {navigation} = props;
        const {state} = navigation;
        const {params} = state;
        return {
            title: params && params.title || '加载中。。',
            headerLeft: (
                <TouchableOpacity style={styles.buttonContainer} onPress={()=>{
                    if(params.canGoBack){
                        params.webView && params.webView.goBack()
                    }else {
                       navigation.goBack()
                    }
                }}>
                    <View style={styles.arrowView}/>
                </TouchableOpacity>)
        }
    };


    // canGoBack: boolean = false;

    // backEventHandle() {
    //     if (this.canGoBack) {
    //         this.refs[WEBVIEW_REF].goBack();
    //     } else {
    //         this.props.pop();
    //     }
    // }
    //
    // renderLeftComponent() {
    //     return (
    //         // onPress={props.onNavigateBack}
    //         <TouchableOpacity style={styles.buttonContainer} onPress={this.backEventHandle.bind(this)}>
    //             <View style={styles.arrowView}/>
    //         </TouchableOpacity>
    //     );
    // }

    componentDidMount() {
        // this.props.refresh({renderLeftComponent:this.renderLeftComponent.bind(this)});
        this.props.navigation.setParams({webView: this.refs[WEBVIEW_REF]})
    }

    _onNavigationStateChange(state: Object) {
        // console.log('state:',state);
        if (state.title && state.title.length) {
            // this.props.refresh({title:state.title});
            this.props.navigation.setParams({title: state.title})
        }
        // this.canGoBack = state.canGoBack;
        // console.log('state:', state);
        this.props.navigation.setParams({canGoBack: state.canGoBack})
    }

    _onError(error: Object) {
        console.log("webError:", error);
    }

    _onLoadStart(event) {
        console.log("onloadStart:", event.nativeEvent);
    }

    _onLoad() {

    }

    _renderError() {
        return (
            // <ExceptionView exceptionType={ExceptionType.NetError} image={noWifi}/>
            <ExceptionView style={{height:screenHeight}} exceptionType={ExceptionType.NetError}/>
        );
    }

    _renderLoading(props,e) {
        console.log('test:',props,e);
    
        return (
            <ExceptionView style={{height:screenHeight}} exceptionType={ExceptionType.Loading}/>
        );
    }

    // let jsCode = `
    //         document.querySelector('#myContent').style.backgroundColor = 'red';
    //     `;
    //
    //
    /**
     * iOS
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    _onShouldStartLoadWithRequest(event: Object) {
        //Implement any custom loading logic here, don't forget to return!
        console.log("onShouldStartLoadWithRequest:", event.url);
        if (event.url.startsWith('http://') || event.url.startsWith('https://')) {
            // this.props.navigation.setParams({canGoBack: true})
            return true;
        } else {
            Linking.canOpenURL(event.url)
                .then(supported => {
                    if (supported) {
                        return Linking.openURL(url);
                        // return false;
                    } else {
                        return false;
                    }
                }).catch(err => {
                return false;
            })
        }

        return false;
    }

    render() {
        // console.log(this.props);
        const params = this.props.navigation.state.params
        // console.log(this.props.scene .route.url);
        //  var header = Object.assign({}, httpHeader,{token:userManager.userData.user_token || ""})
        return (
            <View style={[styles.container]}>
                <WebView
                    ref={WEBVIEW_REF}
                    automaticallyAdjustContentInsets={false}
                    style={styles.webView}
                    source={{uri:params && params.uri || ''}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest.bind(this)}
                    //javaScriptEnabled={false}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    startInLoadingState={true}
                    scalesPageToFit={this.state.scalesPageToFit}
                    onError={this._onError}
                    onLoadStart={this._onLoadStart}
                    onLoad={this._onLoad} //
                    //onMessage={()=>{}}
                    //onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest.bind(this)}//iOS,Android 咱么处理
                    //onLoadEnd
                    //injectedJavaScript=jsCode  //Sets the JS to be injected when the webpage loads.
                    renderLoading={this._renderLoading} //Function that returns a loading indicator.
                    renderError={this._renderError} //Function that returns a view to show if there's an error.
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb',
    },
    webView: {
        flex: 1,
        backgroundColor: '#fbfbfb',
        marginTop: navbarHeight,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 100,
    },
    button: {
        margin: Platform.OS === 'ios' ? 14 : 16,
        //resizeMode: 'contain'
    },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 5,
        borderRightWidth: StyleSheet.hairlineWidth * 5,
        borderColor: '#0093cb',
        transform: [{rotate: '135deg'}],
        marginLeft: 15,
        width: 13,
        height: 13,
    },
});


const mapStateToProps = (state) => {
    //从login reduce 中获取state的初始值。
    //console.log('state:',state);
    //去最后一个
    // console.log("web view map state",state.route.navigationState.routes[state.route.navigationState.index]);
    return {
        //  state:state.route.navigationState.routes[state.route.navigationState.index],
        // uri:'',
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        push: (key)=> {
            // dispatch(navigatePush(key))
            dispatch(NavigationActions.navigate(key))
        },
        pop: (state)=> {
            // dispatch(navigatePop(state))
            dispatch(NavigationActions.back())
        },
        // refresh:(route)=>{
        //     // dispatch(navigateRefresh(route))
        // }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BaseWebView)
