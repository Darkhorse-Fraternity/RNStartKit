/**
 * Created by lintong on 2016/12/6.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native'
import {connect} from 'react-redux'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import CourseTabBar from '../../components/CourseTabBar'
import BaseListView from '../../components/Base/BaseListView';
import {listLoad, listLoadMore} from '../../redux/actions/list'
import * as immutable from 'immutable';
import {renderOrderRow} from '../../components/Row'
class MyComponet extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {};
    static defaultProps = {};

    shouldComponentUpdate(props) {
        if(this.props.scene){
            props.scene.route.page !=  this.props.scene.route.page
        }
        return false
    }

    componentWillReceiveProps(props ) {
        // if(this.props.scene && props.scene.route.page !=  this.props.scene.route.page){
        //     this.props.refs.tabBar.goToPage(props.scene.route.page)
        // }
        // console.log('test:',this.refs)
    }
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

    render(): ReactElement<any> {

        const page = this.props.scene && this.props.scene.route.page || 0

        const loadStatu = this.props.data && this.props.data.get('loadStatu')
        let listData = this.props.data && this.props.data.get('listData')
        listData = listData && listData.toJS()
        return (
            <View style={[this.props.style,styles.wrap]}>
                <ScrollableTabView
                    ref={(scrollView) => { this.scrollView = scrollView; }}
                    initialPage={page} renderTabBar={()=><CourseTabBar initialPage={page} ref="tabBar"/>} >
                    <BaseListView
                        tabLabel="全部"
                        //renderHeader={this._renderHeader}
                        style={[this.props.style,styles.list]}
                        loadStatu='LIST_LOAD_DATA'
                        loadData={this.props.load}
                        dataSource={['1','2']}
                        loadMore={this.props.loadMore}
                        renderRow={renderOrderRow.bind(this)}
                    />
                    <BaseListView
                        tabLabel="待付款"
                        //renderHeader={this._renderHeader}
                        style={[this.props.style,styles.list]}
                        loadStatu={loadStatu}
                        loadData={this.props.load}
                        dataSource={listData}
                        loadMore={this.props.loadMore}
                        renderRow={this.renderRow.bind(this)}
                    />
                    <BaseListView
                        tabLabel="待收货"
                        //renderHeader={this._renderHeader}
                        style={[this.props.style,styles.list]}
                        loadStatu={loadStatu}
                        loadData={this.props.load}
                        dataSource={listData}
                        loadMore={this.props.loadMore}
                        renderRow={this.renderRow.bind(this)}
                    />
                    <BaseListView
                        tabLabel="已收货"
                        //renderHeader={this._renderHeader}
                        style={[this.props.style,styles.list]}
                        loadStatu={loadStatu}
                        loadData={this.props.load}
                        dataSource={listData}
                        loadMore={this.props.loadMore}
                        renderRow={this.renderRow.bind(this)}
                    />

                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        marginBottom:64,
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
        // const user = getState().login.data
        // const param = {
        //     'where': {
        //         'user': {'__type': "Pointer", "className": "_User", "objectId": user.objectId}
        //     }
        // }
        //
        // more ? dispatch(listLoadMore(listKey, listKey, param)) :
        //     dispatch(listLoad(listKey, listKey, param))
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
)(MyComponet)