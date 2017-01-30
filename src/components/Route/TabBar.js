/*@flow*/
'use strict'


/**
 * 底部tabbar 的UI。
 */

import React, {Component} from 'react';
import ReactNative, {
    NavigationExperimental,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    Platform,
} from 'react-native';
import {mainColor, containingColor, lightMainColor, lightContainingColor} from '../../configure';
// import * as Animatable from 'react-native-animatable';
// import Icon from 'react-native-vector-icons/Ionicons'
// const AniView = Animatable.createAnimatableComponent(Icon);
// const {
//   JumpToAction,
// } = NavigationReducer.TabsReducer;

// import {grayFontColor, blackFontColor} from '../configure'
// import { BlurView} from 'react-native-blur';

// {/*<View style={styles.line}/>*/}
import {
    navbar_1,
    navbar_1_on,
    navbar_2,
    navbar_2_on,
    navbar_3,
    navbar_3_on,
    navbar_4,
    navbar_4_on
} from '../../../source'
export default class TabBar extends Component {

    render() {
        return (
            <View style={{backgroundColor:'#f7f5f6', zIndex:2}}>
                <View style={styles.line}/>
                <View style={styles.tabBar}>
                    {this.props.tabs.map(this._renderTab)}
                </View>
            </View>
        );
    }

    // iconForTab(tab:Object, selected:bool):Object {
    //   switch (tab.key) {
    //     case 'tab1':
    //       return {image:selected ? my_lesson : my_lesson_hover, title:"我的课程"};
    //     case 'tab2':
    //       return {image:selected ? person_center : person_center_hover, title:"个人中心"};
    //   }
    //   return {};
    // }

    _renderTab = (tab: Object, index: number) => {
        const {title, selectImage, key, unSelectImage, name} = tab;
        // let image = unSelectImage;
        // // let textStyle = [styles.tabButtonText];
        // if (this.props.index === index) {
        //   // textStyle.push(styles.selectedTabButtonText);
        //   // image = selectImage;
        //
        // }
        const unSelectBarImage = [navbar_1,navbar_2,navbar_3,navbar_4]
        const selectBarImage = [navbar_1_on,navbar_2_on,navbar_3_on,navbar_4_on]
        const color = this.props.index === index ? mainColor : "rgba(0,0,0,0.3)"
        // let {image, title} = this.iconForTab(tab, this.props.index === index);
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.tabButton}
                key={key}
                onPress={()=>{
          //this.refs[title].bounceIn(1000);
          this.props.onNavigate(index)}}>
                <Image source={this.props.index !== index?unSelectBarImage[index]:selectBarImage[index]}/>
                    <Text style={[styles.text,{color}]}>
                        {title}
                    </Text>
            </TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
    line: {
        // elevation:5,
        height: StyleSheet.hairlineWidth * 2,
        // shadowColor:'black',
        // shadowOpacity:.5,
        backgroundColor: 'rgba(0,0,0,0.1)',
        // shadowOffset:{width:0,height:1},
    },
    tabBar: {
        height: 50,
        flexDirection: 'row',
        // backgroundColor: 'white',
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    // tabButtonText: {
    //   textAlign: 'center',
    //   fontSize: 13,
    //   fontWeight: '500',
    //   marginTop: 5,
    //   color: grayFontColor
    // },
    // selectedTabButtonText: {
    //   color:  blackFontColor
    // },
    icon: {
        alignSelf: 'center'
    },
    text: {
        color: 'black',
        textAlign: 'center',
        marginTop:2,
        fontSize: 12,
    }
})
