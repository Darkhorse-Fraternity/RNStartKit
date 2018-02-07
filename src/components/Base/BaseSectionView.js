/**
 * Created by lintong on 8/31/16.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    SectionList,
    InteractionManager,
    RefreshControl,
    ActivityIndicator,
    Text,
    Platform,
    FlatList
} from 'react-native'
import {mainColor, backViewColor} from '../../configure';
import ExceptionView, {ExceptionType} from './ExceptionView';
import {is} from 'immutable';
const delay = () => new Promise((resolve) => InteractionManager.runAfterInteractions(resolve));

export const LIST_FIRST_JOIN = 'LIST_FIRST_JOIN'
export const LIST_NO_DATA = 'LIST_NO_DATA'
export const LIST_LOAD_DATA = 'LIST_LOAD_DATA'
export const LIST_LOAD_MORE = 'LIST_LOAD_MORE'
export const LIST_LOAD_NO_MORE = 'LIST_LOAD_NO_MORE'
export const LIST_LOAD_ERROR = 'LIST_LOAD_ERROR'
export const LIST_NORMAL = 'LIST_NORMAL'

export default class BaseSectionView extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            shouldShowloadMore: false
        };

    }

    static propTypes = {
        loadData: PropTypes.func.isRequired,
        loadMore: PropTypes.func,
        loadStatu: PropTypes.string.isRequired,
        needDelay: PropTypes.bool,
        noDataImg: PropTypes.number,
        noDataPrompt: PropTypes.string,
        noDataTips: PropTypes.string,
        renderHeader: PropTypes.func,
    };

    static defaultProps = {
        loadStatu: LIST_FIRST_JOIN,
        needDelay: true,
        // noDataImg: require('../../../source/img/xy_course/xy_course.png'),
        noDataPrompt: "没有新内容~",
        type: 'list'
    };

    state: {};
    _dataSource: ListView.DataSource;

    onScroll(e: Object) {
        let nativeEvent = e.nativeEvent;
        const shouldShowloadMore = nativeEvent.contentSize.height > nativeEvent.layoutMeasurement.height;
        this.state.shouldShowloadMore !== shouldShowloadMore &&
        this.setState({shouldShowloadMore})
        // console.log('test:', shouldShowloadMore);
        this.props.onScroll && this.props.onScroll(arguments);
    }

    componentDidMount() {
        this._handleRefresh();
    }


    shouldComponentUpdate(nextProps: Object, nextState: Object) {
        return !is(this.props, nextProps) || !is(this.state, nextState)
    }


    _handleRefresh = ()=> {
        if (this.props.loadStatu === LIST_LOAD_DATA) {
            return;
        }
        this.props.loadData && this.props.loadData();
    };

    _handleloadMore = (info: {distanceFromEnd: number})=> {
        if (this.props.loadStatu === LIST_LOAD_MORE
            || this.props.loadStatu === LIST_LOAD_NO_MORE
            || this.props.loadStatu === LIST_LOAD_DATA
            || this.props.loadStatu === LIST_LOAD_ERROR) {
            return;
        }


        // console.log('distanceFromEnd:', info.distanceFromEnd);
        // console.log('loadStatu:', this.props.loadStatu);
        if (this.state.shouldShowloadMore
        ) {
            this.props.loadMore && this.props.loadMore();
        }

    };

    renderNoDataTips() {
        if (this.props.noDataTips) {
            return this.props.noDataTips;
        }
        return (
            <Text style={styles.otherTips}>
            </Text>
        );
    }

    renderFooter() {


        // console.log('this.shouldShowloadMore:', this.props.loadStatu == LIST_LOAD_NO_MORE && this.state.shouldShowloadMore);
        if (this.props.loadStatu == LIST_LOAD_MORE) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator style={{marginTop:8, marginBottom:8}} size='small' animating={true}/>
                </View>
            );
        } else if (this.props.loadStatu == LIST_LOAD_NO_MORE && this.state.shouldShowloadMore) {
            return (
                <View style={styles.footer}>
                    <Text>没有更多了</Text>
                </View>
            );
        } else {
            return null;
        }
    }


    _keyExtractor = (item, index) => {
        const key = item.id || index ;
        return key + '';
    }

    render() {
        // const refreshable = this.props.refreshable && this.props.loadData;
        const type = this.props.type
        // const TableView = type == 'section' ? SectionList : FlatList
        let TableView = FlatList
        const data = this.props.data
        if (data && data[0] && data[0].data) {
            TableView = SectionList
        }

        if (this.props.loadStatu === LIST_FIRST_JOIN) {
            return (
                <ExceptionView
                    renderHeader={this.props.renderHeader}
                    exceptionType={ExceptionType.Loading}
                    style={[styles.list,this.props.style]}
                />
            );
        } else if (this.props.loadStatu === LIST_NO_DATA) {
            return (

                <ExceptionView
                    style={[styles.list,this.props.style]}
                    renderHeader={this.props.renderHeader}
                    exceptionType={ExceptionType.NoData}
                    image={this.props.noDataImg}
                    prompt={this.props.noDataPrompt}
                    otherTips={this.renderNoDataTips()}
                    onRefresh={this._handleRefresh}
                />
            );
        } else if (this.props.loadStatu === LIST_LOAD_ERROR && this.props.dataSource &&
            this.props.dataSource.count == 0) {
            //TODO:先不加，其他状态量判断太麻烦。
        }

        return (
            <TableView
                refreshing={this.props.loadStatu === "LIST_LOAD_DATA"}
                onScroll={this.onScroll.bind(this)}
                sections={this.props.data}
                onRefresh={this._handleRefresh}
                onEndReached={this._handleloadMore}
                keyExtractor={this._keyExtractor}
                ListFooterComponent={this.renderFooter.bind(this)}
                {...this.props}
                style={[styles.list,this.props.style]}
                onEndReachedThreshold={Platform.OS == 'ios' ? 0.1 : 0.1}
            />
        );
    }
}
const styles = StyleSheet.create({
    list: {
        flex: 1,
        backgroundColor: backViewColor,
    },

    otherTips: {
        marginTop: 27,
        marginLeft: 43,
        marginRight: 43,
        fontSize: 13,
        color: '#9e9e9e',
        lineHeight: 26,
        textAlign: 'center'
    },

    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        marginBottom: 12
    },

})
