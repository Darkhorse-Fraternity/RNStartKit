/* @flow */

'use strict'
import React, {Component, PropTypes} from 'react';
import  {ScrollView, View, Image, StyleSheet, ViewPagerAndroid, Modal} from 'react-native';
import {screenWidth, screenHeight, pixel, OS} from '../../util'

import {saveFirstTime, loadFirstJoin} from '../../util/XGlobal'
import {connect} from 'react-redux'
import {dataStorage} from '../../redux/actions/util'

const currentScreenHeight = Math.max(screenWidth, screenHeight);
const currentScreenWidth = Math.min(screenWidth, screenHeight);

import {guide1, guide2, guide3} from '../../../source'
 class IntroView extends Component {

    static propTypes = {
        onClick: PropTypes.func,
    };


     componentDidMount() {
         loadFirstJoin().catch(()=>{
             this.props.showModal(true)
         })
     }

    render() {
        // if (OS === 'ios') {
            return (
                <Modal
                    transparent={true}
                    onRequestClose={() => {
                   this.props.showModal(false)
                }}
                    visible={this.props.show || false}>
                    <ScrollView
                        bounces={false}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        scrollEventThrottle={100}
                        onScroll={(e)=>{
                            let nativeEvent = e.nativeEvent;
                            const flag = nativeEvent.contentSize.width == nativeEvent.contentOffset.x + screenWidth;
                            if(flag){
                                saveFirstTime()
                                this.props.showModal(false)
                            }

                        }}
                        style={[this.props.style,styles.content]}>
                        <Image resizeMode='contain' source={guide1} style={styles.content}/>
                        <Image resizeMode='contain' source={guide2} style={styles.content}/>
                        <Image resizeMode='contain' source={guide3} style={styles.content}/>
                        <View style={styles.content}/>
                    </ScrollView>
                </Modal>
            );
        // } else {
        //     return (
        //         <ViewPagerAndroid
        //             style={styles.content}
        //             initialPage={0}>
        //             {this.renderView(xy_ad1, xy_skkb, xy_kcap, xy_dot)}
        //             {this.renderView(xy_ad2, xy_zxzb, xy_sjsk, xy_dot2, true)}
        //         </ViewPagerAndroid>
        //     )


        // }

    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: currentScreenWidth,
        height: currentScreenHeight,
    },

    OneView: {
        width: currentScreenWidth,
        height: currentScreenHeight,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inlineView: {
        alignItems: 'center',
    },

    top: {
        marginTop: 83 > (currentScreenHeight - 470) / 3 ? (currentScreenHeight - 470) / 3 : 83,
        width: 347.5 > currentScreenWidth - 40 ? currentScreenWidth - 40 : 347.5,
        height: 314,
    },
    center1: {
        width: 180,
        height: 30.5,
    },
    center2: {
        marginTop: 16,
        width: 179,
        height: 17,
    },
    bottom: {
        marginTop: 74,
        width: 26,
        height: 8.5,
        marginBottom: 60,
    },

    button: {
        marginHorizontal: 10,
        color: '#f06355',
    },
    bbutton: {
        height: 35,
        borderRadius: 4,
        marginTop: 16,
        justifyContent: 'center',
        borderWidth: pixel,
        borderColor: '#f06355',
    }

});

export const shareModalKey = 'Guide_Modal_Show'
const mapStateToProps = (state) => {
    return {
        show: state.util.get(shareModalKey),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showModal: (value)=> {
            dispatch(dataStorage(shareModalKey, value))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IntroView)