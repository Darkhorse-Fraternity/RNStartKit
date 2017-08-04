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
import {bindActionCreators} from 'redux';
import {logout} from '../../redux/actions/login'
import {ICARD, IDONE} from '../../redux/reqKeys'
import {add, search, update, remove} from '../../redux/module/leancloud'
import {selfUser, iCard} from '../../request/LCModle'
import {addNormalizrEntity} from '../../redux/actions/list'
import {addEntities} from '../../redux/module/normalizr'
import {clear} from '../../redux/actions/list'
import Pop from '../../components/Pop'
import Menu from '../../pages/Home/Menu'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons'
import BounceBtn from '../../components/Button/BounceBtn'
import * as Animatable from 'react-native-animatable';
const List = Animatable.createAnimatableComponent(FlatList);

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
// import
//static displayName = Home
//data:state.req.get()
@connect(
    state =>({
        data: state.list.get(ICARD),
        normalizrData: state.normalizr.get(ICARD)
    }),
    (dispatch, props) =>({
        //...bindActionCreators({},dispatch),
        logout: ()=>dispatch(logout()),

        search: ()=> {
            dispatch(search(false, {
                where: {
                    ...selfUser(),
                    time: {"$ne": -1},
                },
                order: 'doneDate'


            }, ICARD))
        },
        done: async(data) => {
            const id = data.objectId
            let time, cycle
            if (data.time == 6) {
                time = -1
                cycle = data.cycle + 1
            } else {
                time = data.time + 1
                cycle = data.cycle
            }
            // const param = {
            //     ...iCard(id),
            //     ...selfUser()
            // }
            //
            // const res = await add(param, IDONE)
            // console.log('test:', res);
            // const entity = {
            //     ...param,
            //     ...res
            // }
            // dispatch(addEntities({[IDONE]:{
            //     [entity.objectId]:entity
            // }}))


            const param = {
                doneDate: {"__type": "Date", "iso": moment()},
                time: time,
                cycle,
            }

            const res = await update(id, param, ICARD)
            const entity = {
                ...param,
                ...res
            }
            dispatch(addEntities({
                [ICARD]: {
                    [entity.objectId]: entity
                }
            }))
        },
        delete: async(rowId, objectId,callBack)=> {
            await remove(objectId, ICARD)
            dispatch(clear(ICARD, rowId))
            callBack && callBack()
        }

    })
)
export  default  class Home extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};


    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    componentWillReceiveProps(nextProps: Objec) {
        const size1 = nextProps.data.get('listData').size
        const size2 = this.props.data.get('listData').size
        if(size1  > size2 && size2 !=0  ){
            this.refs.list.ref._component &&
            this.refs.list.ref._component.scrollToOffset({x: 0, y: 0, animated: false})
        }
    }



    componentDidMount() {
        this.props.search()
    }




    _keyExtractor = (item, index) => {
        const key = item.id || index;
        return key + '';
    }


    __delete = (index, objectId)=> {
        Alert.alert(
            '确定删除?',
            '删除后不可恢复~！',
            [{text: '取消'}, {
                text: '确定', onPress: async() => {
                    const itemView = this.rows[index]
                    ///因为view 是根据key 复用的，所以最后需要还原，否则会出错
                    const endState = await itemView.fadeOutDownBig(500)
                    endState.finished && this.props.delete(index, objectId,()=>itemView.fadeInRight(500))
                }
            }]
        )
    }
    rows = []
    __renderItem = ({item, index})=> {
        const data = this.props.normalizrData.get(item).toJS()

        //计算上次完成时间和当前完成时间， 只有大于24个小时，才能再次打卡。

        let FlagView = (
            <Animatable.Text
                animation="zoomInUp"
                style={styles.num}>
                {data.time}
            </Animatable.Text>)
        if (data.time == -1) {
            FlagView = (<Text style={styles.done}>{'恭喜,已完成'}</Text>)
        } else if (data.doneDate) {
            const doneDate = data.doneDate.iso
            const lastMoment = moment(doneDate)
            if (moment.min(lastMoment, moment(2,"HH")) === lastMoment) {
                FlagView = (
                    <BounceBtn onPress={()=>this.props.done(data)} title="轻触打卡"/>)
            }
        }


        //flag 为true 的时候说明离上次打卡已经有24小时了
        return (
            <Animatable.View
                ref={(row) => this.rows[index] = row}
                style={styles.item}>
                <View style={styles.card}>
                    <View style={styles.toper}>
                        <TouchableOpacity
                            onPress={()=>{
                                this.__delete(index,data.objectId)
                            }}
                            style={{marginTop:20}}>
                            <Icon name="md-close" size={20}/>
                        </TouchableOpacity>
                        <Text style={styles.title}>{data.title}</Text>
                        <View/>
                    </View>
                    {FlagView}
                    <View style={{height:40}}/>
                </View>
            </Animatable.View>
        )
    }


    render(): ReactElement<any> {
        const data = this.props.data.toJS().listData
        // const navigation = this.props.navigation
        // console.log('test:',typeof View());
        return (
            <List
                onScroll={this.props.onScroll}
                ref="list"
                animation="slideInRight"
                style={styles.container}
                data={data}
                horizontal={true}
                removeClippedSubviews={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                renderItem={this.__renderItem}
                keyExtractor={this._keyExtractor}
            />
        );
    }
}

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    bc: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 44,
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
        justifyContent: 'space-between',
        // elevation:10,
    },
    title: {
        fontSize: 17,
        marginTop: 10,
    },
    headerBtn: {
        padding: 20,
        paddingHorizontal: 15,
    },
    num: {
        fontSize: 100,
    },


    done: {
        fontSize: 17,
    },
    toper: {
        width: 200,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
