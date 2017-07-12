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
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {logout} from '../../redux/actions/login'
import {ICARD} from '../../redux/reqKeys'
import {add, search} from '../../redux/module/leancloud'
import {selfUser} from '../../request/LCModle'
// import
//static displayName = Home
@connect(
    state =>({
        //data:state.req.get()
        data: state.list.get(ICARD),
        normalizrData: state.normalizr.get(ICARD)
    }),
    (dispatch, props) =>({
        //...bindActionCreators({},dispatch),
        logout: ()=>dispatch(logout()),

        search: ()=> {
            dispatch(search(false, {
                'where': selfUser()
            }, ICARD))
        },
        done:(id)=> dispatch(async(dispatch, getState)=> {
            const state = getState()
            const user = state.login.data;
            const param = {
                id,
                ...selfUser(),
            }

            const res = await add(param, ICARD)
            const entity = {
                ...param,
                ...res
            }
            dispatch(addNormalizrEntity(ICARD, entity))
            props.navigation.goBack()
        }),
    })
)
export  default  class Home extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    static navigationOptions = props => {
        // const {navigation} = props;
        // const {state} = navigation;
        // const {params} = state;
        return {
            header: null
        }
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    componentDidMount() {
        this.props.search()
    }

    _keyExtractor = (item, index) => {
        const key = item.id || index;
        return key + '';
    }

    __renderItem = ({item})=> {
        const data = this.props.normalizrData.get(item).toJS()
        return (
            <View style={styles.item}>
                <View style={styles.card}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.num}>{"0"}</Text>
                    <TouchableOpacity>
                        <Text>打卡</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    render(): ReactElement<any> {
        const data = this.props.data.toJS().listData
        const navigation = this.props.navigation
        return (
            <View style={[this.props.style,styles.container]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={this.props.logout}>
                        <Text>{"<-"}</Text>
                    </TouchableOpacity>
                    <Text>Combo</Text>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Creat')
                    }}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={styles.list}
                    data={data}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.__renderItem}
                    keyExtractor={this._keyExtractor}
                />
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
    header: {
        marginTop: 30,
        flexDirection: 'row',
        width: width,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    list: {},
    item: {
        width: width,
        height: height - 100,
        padding: 50,
    },
    card: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0.3,
        },
        justifyContent: 'space-between'
    },
    title: {
        marginTop: 10,
    },
    num: {
        fontSize: 100,
    }
})
