/* @flow */
'use strict';
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    PickerIOS,
    Dimensions,
    ActionSheetIOS
} from 'react-native'
// import { BlurView} from 'react-native-blur';
import Icon from 'react-native-vector-icons/FontAwesome'
import Pop from '../Pop'

const PickerItemIOS = PickerIOS.Item;

export default class Picker extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            mark: ''
        };
    }

    state: {};
    static propTypes = {};
    static defaultProps = {};

    render() {
        const items = this.props.items;
        const callBack = this.props.callBack
        return (

            <View blurType="dark" style={{backgroundColor:'white',}}>
                <View style={{zIndex:2,top:-50,right:0,width:100,position:'absolute'}}>
                               <Icon.Button name="close" backgroundColor="transparent"
                                              iconStyle={{marginLeft:20}} onPress={()=>Pop.hide()}/>
                            </View>
                <PickerIOS
                    selectedValue={this.state.mark}
                    onValueChange={(mark) => {
                        this.setState({mark:mark})
                        callBack && callBack(mark)
                    }}>
                    {items.map((item, i) => (
                        <PickerItemIOS
                            key={i}
                            value={item}
                            label={item}
                        />
                    ))}
                </PickerIOS>
            </View>
        );
    }
}

export function showSelector(items: Array<string>, callBack: Function) {
    const BUTTONS = items.concat('取消')
    ActionSheetIOS.showActionSheetWithOptions({
            options: BUTTONS,
            // title: '标题',
            cancelButtonIndex: BUTTONS.length - 1,
            //message:'',
        },callBack);


}

export function showSelector2(items: Array<string>, callBack: Function) {
    // const mainView = (
    //     <View blurType="dark">
    //         <View style={{zIndex:2,top:-50,right:0,width:100,position:'absolute'}}>
    //             <Icon.Button name="close" backgroundColor="transparent"
    //                          iconStyle={{marginLeft:20}} onPress={Pop.hide()}/>
    //         </View>
    //         <View style={styles.main}>
    //             {items.map((item, i)=> {
    //                 return (
    //                     <TouchableOpacity key={item} style={styles.btn} onPress={()=>{
    //             callBack && callBack(item,i);
    //             Pop.hide()
    //           }}>
    //                         <Text style={styles.text} key={item}>
    //                             {item}
    //                         </Text>
    //                     </TouchableOpacity>
    //                 )
    //             })}
    //         </View>
    //     </View>
    // )
    const mainView = (
        <Picker items={items} callBack={callBack}/>
    )

    Pop.show(mainView, {
        maskClosable: true,
        onMaskClose() {
        },
        wrapStyle: {justifyContent: 'flex-end',}
    })
}
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        paddingHorizontal: 30,
        width: 200,
    },
    btn: {
        width: 200,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgb(200,200,200)'

    },
    text: {
        marginTop: 20,
        marginBottom: 8,
        color: 'rgb(100,100,100)',
        fontSize: 15,
        borderBottomWidth: 1,
        borderColor: 'white',
        fontWeight: 'bold',
    },
    line: {
        backgroundColor: 'white',
        height: StyleSheet.hairlineWidth,
        width: 200,
    }
})
