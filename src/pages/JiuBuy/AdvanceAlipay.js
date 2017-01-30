/**
 * Created by lintong on 2016/12/14.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
} from 'react-native'
import {connect} from 'react-redux'
import {mainColor} from '../../configure'
import {BCButton} from '../../components/Base/WBButton'

class MyComponet extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    _renderRowMain(image: number, placeholder: string, onChangeText: Function,
                   boardType: PropTypes.oneOf = 'default', autoFocus: bool = false, maxLength: number = 16,
                   ref: string) {

        return (
            <View style={styles.rowMainStyle}>
                {/*<Text style={styles.textStyle}>{title}</Text>*/}
                <TextInput
                    ref={ref}
                    placeholderTextColor="rgba(180,180,180,1)"
                    selectionColor={mainColor}
                    returnKeyType='next'
                    autoFocus={autoFocus}
                    //maxLength={maxLength}
                    keyboardType={boardType}
                    style={styles.textInputStyle}
                    underlineColorAndroid='transparent'
                    placeholder={placeholder}
                    clearButtonMode='while-editing'
                    enablesReturnKeyAutomatically={true}
                    onSubmitEditing={() =>this.focusNextField(ref)}
                    onChangeText={onChangeText}/>
            </View>
        )
    }

    render(): ReactElement<any> {
        return (
            <View style={[this.props.style,styles.wrap]}>
                {this._renderRowMain(0, '请输入支付宝账号',
                    (text) => this.setState({phone: text}), 'default', true, 0, "1"
                )}
                <View style={styles.line}/>
                {this._renderRowMain(0, '请输入姓名',
                    (text) => this.setState({phone: text}), 'default', true, 0, "2"
                )}
                <View style={styles.line}/>


                <BCButton
                    //disabled={!flag}
                    //isLoad={this.props.state.loaded}
                    onPress={()=>{}}
                    containerStyle={styles.buttonContainerStyle2}>
                    完成
                </BCButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        backgroundColor:'white'
    },
    textInputStyle: {
        // width:200,
        flex: 1,
        marginLeft: 0,
        textAlign: 'left',
        fontSize: 14,
        color: 'black',
    },

    rowMainStyle: {
        height: 40,
        marginTop: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(100,100,100,0.1)',
    },
    buttonContainerStyle2: {
        marginLeft: 29 / 2,
        marginRight: 29 / 2,
        marginTop: 30,
        height: 40,
        justifyContent: 'center',
    },
})

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponet)