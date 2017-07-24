/**
 * Created by lintong on 2017/7/3.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native'
import {connect} from 'react-redux'

import Pop from '../../components/Pop'
import Menu from '../../pages/Home/Menu'
import Icon from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable';
export const Btn = Animatable.createAnimatableComponent(TouchableOpacity);
import BG from '../../components/BG/BG'
import CardView from './CardView'
function makeScaleInTranslation(translationType, value) {
    return {
        from: {
            [translationType]: 0,
        },
        to: {
            [translationType]: value,
        },
    };
}
const cloudMoveLeft = makeScaleInTranslation('translateX', -500);
Animatable.initializeRegistryWithDefinitions({cloudMoveLeft})

@connect(
    state =>({
    }),
    (dispatch, props) =>({
        //...bindActionCreators({},dispatch)
    })
)
export  default  class Home extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    static navigationOptions = props => {
        const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            title: 'COMBO',
            headerRight: (<TouchableOpacity
                style={styles.headerBtn}
                onPress={()=>{
                        navigation.navigate('Creat')
                    }}>
                <Icon name="md-add" size={30}/>
            </TouchableOpacity>),
            headerLeft: (
                <TouchableOpacity
                    style={styles.headerBtn}
                    onPress={()=>{
                        Pop.show(<Menu/>,{maskStyle:{backgroundColor:'transparent'}})
                }}>
                    <Icon name="md-list" size={30}/>
                </TouchableOpacity>)
        }
    };








    render(): ReactElement<any> {
        return (
            <View style={[this.props.style,styles.container]}>
                <BG style={styles.bc}/>
                <CardView/>
            </View>
        );
    }
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    bc: {
        position: 'absolute',
        width: width,
        height: height-44,
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        width: width,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },

    headerBtn: {
        padding: 20,
        paddingHorizontal: 15,
    },

})
