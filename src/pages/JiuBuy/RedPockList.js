/**
 * Created by lintong on 2016/12/12.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import {mainColor} from '../../configure'
import {connect} from 'react-redux'
import * as immutable from 'immutable';
import BaseListView from '../../components/Base/BaseListView';
import {listLoad, listLoadMore} from '../../redux/actions/list'
class List extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        load: PropTypes.func.isRequired,
        loadMore: PropTypes.func.isRequired,
    };
    static defaultProps = {};

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props.data, nextProps.data)
    }


    renderRow(itme: Object, sectionID: number, rowID: number) {

        return (
            <TouchableOpacity
                style={{marginTop:10}}
                onPress={()=>{
            }}>
                <View style={styles.line}/>

                <View style={styles.row}>
                    <Text
                        numberOfLines={1}
                        style={styles.date}>
                        {moment(itme.updatedAt).format('YYYY-MM-DD HH:mm')}
                    </Text>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between'}}>
                        <View style={styles.subRow}>
                            <Image source={trip_up}/>
                            <Text
                                numberOfLines={1}
                                style={styles.text}>
                                {itme.start}
                            </Text>
                        </View>
                        <Text
                            numberOfLines={1}
                            style={[styles.subText,{color}]}>
                            {itme.statu}
                        </Text>
                    </View>
                    <View style={styles.subRow}>
                        <Image source={trip_down}/>
                        <Text
                            numberOfLines={1}
                            style={styles.text}>
                            {itme.finish}
                        </Text>
                    </View>
                </View>
                <View style={styles.line}/>
            </TouchableOpacity>
        )
    }

    render() {

        const loadStatu = this.props.data && this.props.data.get('loadStatu')
        let listData = this.props.data && this.props.data.get('listData')
        listData = listData && listData.toJS()

        return (
            <BaseListView
                //renderHeader={this._renderHeader}
                style={[this.props.style,styles.list]}
                loadStatu={loadStatu}
                loadData={this.props.load}
                dataSource={listData}
                loadMore={this.props.loadMore}
                renderRow={this.renderRow.bind(this)}
            />
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    line: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    text: {
        marginLeft: 5,
        fontSize: 16,
        color: 'rgb(150,150,150)'
    },
    subText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: 'rgb(200,200,200)'
    },
    date: {
        fontSize: 14,
        color: 'rgb(100,100,100)'
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 18,
        paddingVertical: 18,
    },
    subRow: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    }
})


const listKey = 'listKey'
function myListLoad(more: bool = false) {
    return (dispatch, getState) => {
        const user = getState().login.data
        const param = {
            'where': {
                'user': {'__type': "Pointer", "className": "_User", "objectId": user.objectId}
            }
        }

        more ? dispatch(listLoadMore(listKey, listKey, param)) :
            dispatch(listLoad(listKey, listKey, param))
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.list.get(listKey),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: ()=>dispatch(myListLoad()),
        loadMore: ()=>dispatch(myListLoad(true)),
        push: (key)=> {
            // dispatch(navigatePush(key));
        },

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)