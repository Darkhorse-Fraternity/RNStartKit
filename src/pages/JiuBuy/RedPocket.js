/**
 * Created by lintong on 2016/12/6.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Text,
    ScrollView,
} from 'react-native'
import {blackFontColor, grayFontColor, backViewColor} from '../../configure';
import {connect} from 'react-redux'
import {navigatePush} from '../../redux/actions/nav'
import {placeholder} from  '../../../source/'
class MyComponet extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};

    _renderRow(title: string, style: any, isArraw: bool = false, onPress: Function = ()=> {
    }, description: any = null) {
        return (
            <TouchableOpacity onPress={onPress} style={style}>
                <View style={styles.row}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        {/*<Image
                         resizeMode='contain'
                         source={source}
                         style={styles.imageNail}
                         />*/}
                        <Text style={styles.rowText}>
                            {title}
                        </Text>
                    </View >
                    <View style={styles.row2}>
                        {description ? <Text style={styles.description}>{description}</Text> : null}
                        {isArraw ? <View style={styles.arrowView}/> : null}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render(): ReactElement<any> {
        return (
            <View style={[this.props.style,styles.wrap]}>
                <TouchableOpacity onPress={()=>{
                    this.props.push('RedPocketInfo');
                }}>
                    <Image style={styles.top} source={placeholder}/>
                    <Text style={styles.titel}>红包</Text>
                </TouchableOpacity>

                {this._renderRow('签到抽奖', styles.group, true, () => {
                    this.props.push('RedPocketInfo');
                })}
                <View style={styles.line}/>
                {this._renderRow('抢红包', styles.group, true, () => {
                    this.props.push('RedPockList');
                })}
                <View style={styles.line}/>
                {this._renderRow('邀请好友', styles.group, true, () => {
                    this.props.push('Invite');
                },'奖励30元，在抢红包')}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    top: {
        width: Dimensions.get('window').width,
        height: 200,
        marginBottom:10,
    },
    titel: {
        position: 'absolute',
        top: 40,
        left: Dimensions.get('window').width / 2 - 10,
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontSize: 15,

    },
    description: {
        marginRight: 8,
        fontSize: 11,
        color: 'rgb(200,200,200)'
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    group: {
        marginTop: 0
    },
    arrowView: {
        borderBottomWidth: StyleSheet.hairlineWidth * 1,
        borderRightWidth: StyleSheet.hairlineWidth * 1,
        borderColor: 'rgb(200,200,200)',
        transform: [{rotate: '315deg'}],
        marginRight: 5,
        width: 8,
        height: 8,
    },
    line:{
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgb(230,230,230)',
        marginLeft:15,
    }
})

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        push:(key)=>{
            dispatch(navigatePush(key))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponet)