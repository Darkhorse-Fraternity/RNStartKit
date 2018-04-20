/**
 * Created by lintong on 2017/6/14.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import * as immutable from 'immutable';
import BaseSectionView from './BaseSectionView'
import { bindActionCreators } from 'redux';
import { listReq } from '../../redux/actions/list'
//static displayName = ReqListView
import { listDefouteKey, schemas } from '../../redux/scemes'
import { search } from '../../redux/module/leancloud'
import { denormalize } from 'normalizr'

@connect(
    (state, props) => ({
        data: state.list.get(props.sKey || props.reqKey),
        normalizrData: state.normalizr.get(props.reqKey)
    }),
    (dispatch, props) => {
        const mSearch = props.search || search
        return {
            //...bindActionCreators({},dispatch),
            load: (...args) => dispatch(mSearch(...args)),
            loadMore: (...args) => dispatch(mSearch(...args)),
        }
    }
)

export default class LCList extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        reqParam: PropTypes.object.isRequired,
        reqKey: PropTypes.string.isRequired,
        sKey: PropTypes.string,
        load: PropTypes.func.isRequired,
        loadMore: PropTypes.func,
        callPath: PropTypes.string //不为空则表示走leancloud 的云函数
    };

    static defaultProps = {
        data: immutable.fromJS({
            listData: [],
            //loadStatu: 'LIST_NORMAL',
        }),
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    componentWillReceiveProps(nextProps: Object) {

        //只进行值比较
        if (JSON.stringify(nextProps.reqParam) !== JSON.stringify(this.props.reqParam)) {
            this.loadData(nextProps.reqParam)
        }

    }


    __renderItem({ item, index }: { item: Item, index: number }): ReactElement<any> {
        const data = typeof item === 'object' ? item :
            this.props.normalizrData.get(item + '').toJS()
        return this.props.renderItem({ item: data, index })
    }


    loadData: Function

    render(): ReactElement<any> {
        if (!this.props.data.get('listData' || !this.props.reqParam)) {
            return (<BaseSectionView
                {...this.props}
                loadData={() => {
                }}
                renderHeader={this.props.ListHeaderComponent}
            />)
        }


        const loadStatu = this.props.data.get('loadStatu')

        // console.log('this.props.loadStatu:', loadStatu);


        let listDataKey = this.props.data.get('listData').toJS()
        // listData = listData && listData.toJS()
        // console.log('listDataKey:', listDataKey);

        const data = !this.props.afterDataMap
            ? listDataKey
            : this.props.afterDataMap(listDataKey) || listDataKey

        const key = this.props.reqKey
        if (!key) {
            console.error('ReqListView传入的reqKey 不能为空~');
        }

        //  const sckeyData = { [key]: listDataKey }
        //  const mySchema =  schemas[key]
        //  const normalizrData = {[key]:this.props.normalizrData.toJS()}
        //  const listData = denormalize(sckeyData,mySchema,normalizrData)[key];
        //  console.log('sckeyData:',sckeyData);
        //  console.log('mySchema:', mySchema);
        //  console.log('normalizrData:', normalizrData);
        // console.log('listData:', listData);

        const reqParam = this.props.reqParam
        const dataMap = this.props.dataMap
        const sKey = this.props.sKey //指定存入redux store 的key
        const loadData = (param) => this.props.load(false, param, key, {
            sKey,
            dataMap
        }, this.props.callPath)
        const loadMore = () => this.props.loadMore(true, reqParam, key, {
            sKey,
            dataMap
        }, this.props.callPath)
        this.loadData = loadData


        return (
            <BaseSectionView
                {...this.props}
                renderHeader={this.props.ListHeaderComponent}
                loadData={() => loadData(reqParam)}
                loadMore={loadMore}
                data={data}
                loadStatu={loadStatu}
                renderItem={this.__renderItem.bind(this)}
            />

        );
    }
}


