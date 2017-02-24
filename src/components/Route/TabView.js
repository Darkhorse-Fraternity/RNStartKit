/*@flow*/

'use strict'

/*
 * tabview 的UI 视图。这边没有做成两个栈，主要是因为业务没有需要，
 * 两个栈在第二个页面还有tabbar 的时候是必须。
 * TODO:子页面的属性能否正确传递还没有尝试，因为这边还没有这个需求。
 *
 */

import React, {Component} from 'react';
import ReactNative, {
    StyleSheet,
    Text,
    View,
    InteractionManager,
    Platform
} from 'react-native';
import {mainColor, containingColor, lightMainColor, lightContainingColor} from '../../configure'
import TabBar from './TabBar'
import {pageConfig} from './pageConfig'
import {PageMap} from './page'
import {navigateRefresh} from '../../redux/actions/nav'

import {connect} from 'react-redux'
import {tabSwitch} from '../../redux/actions/tab'

import Dimensions from "Dimensions";
let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;


class TabView extends Component {

    timer: number;

    componentWillMount() {
        var self = this;
        // this.timer = setTimeout(()=>{
        //   self.props.refreshDirection()
        // }, 1000);
    }

    componentWillUnmount() {
        const tabState = this.props.state;
        this.props.refreshNav(tabState.tabs[0].key)
        // this.timer && clearTimeout(this.timer)
    }

    componentWillReceiveProps(nextProps) {
        const tabState = nextProps.state;

        if (this.props.state.index != tabState.index) {
            this.props.refreshNav(tabState.tabs[tabState.index].key);
        }
    }


    //  index==i?0:-SCREEN_WIDTH
    lazyMark = []
    _sceneMap(state: Object) {
        const index = state.index;
        const tabs = state.tabs;
        var scenes = [];
        const height = Platform.OS == 'ios' ? 50 : 70



        return tabs.map((tab, i) => {
            let pageKey = tab.key.split('-')[0];
            let MyComponent = PageMap[pageKey];
            //做一个lazy Load
            if(!this.lazyMark[i]){
                this.lazyMark[i] = index==i
            }

            return (
                <View key={tab.key} style={{position:'absolute',
                        width:SCREEN_WIDTH,
                        height:SCREEN_HEIGHT-height,
                        top:0,
                        left:0,
                        zIndex:index==i?1:0}}>
                    {(index==i ||this.lazyMark[i] ) &&
                    (<MyComponent style={{backgroundColor:'rgb(250,250,250)'}}/>)}
                </View>
            )

        });
    }


    _renderTabBar = ()=> {
        const tabState = this.props.state;
        return (
            <TabBar
                tabs={tabState.tabs}
                index={tabState.index}
                onNavigate={(index)=>{

            this.props.switch(index)}}
            />
        );
    };

    render() {
        let tabState = this.props.state;

        //第一个为主页list ，第二个为个人中心。
        return (
            <View style={styles.topView}>
                <View style={{flex:1, flexDirection:'row'}}>
                    {this._sceneMap(tabState)}
                </View>
                {this._renderTabBar()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    topView: {
        flex: 1,
    },
});


const mapStateToProps = (state) => {
    return {
        state: state.tab.tabState,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        switch: (index)=> {
            dispatch(tabSwitch(index))

        },
        refreshNav: (key)=> {
            let config = pageConfig[key];
            dispatch(navigateRefresh(config))
        },
        refreshDirection: ()=> {
            dispatch(navigateRefresh({direction: undefined}))
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabView)
