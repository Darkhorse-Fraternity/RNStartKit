/**
 * Created by lintong on 2017/6/14.
 * @flow
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native'
import {connect} from 'react-redux'
import * as immutable from 'immutable';
import BaseSectionView from './BaseSectionView'
import {bindActionCreators} from 'redux';
import {listReq} from '../../redux/actions/list'
//static displayName = ReqListView
import {listDefouteKey, schemas} from '../../redux/scemes'

import {denormalize} from 'normalizr'
@connect(
    (state, props) =>({
        data: state.list.get(props.reqKey),
        normalizrData: state.normalizr.get(props.normalizrKey || listDefouteKey[props.reqKey])
    }),
    dispatch =>({
        //...bindActionCreators({},dispatch),
        load: (...args)=>dispatch(listReq(...args)),
        loadMore: (...args)=>dispatch(listReq(...args)),
    })
)

export  default  class ReqListView extends Component {
    constructor(props: Object) {
        super(props);
    }

    static propTypes = {
        reqParam:PropTypes.object.isRequired,
        reqKey:PropTypes.string.isRequired,
        load: PropTypes.func.isRequired,
        loadMore: PropTypes.func,
    };

    static defaultProps = {
        data: immutable.fromJS({
            listData: [],
            //loadStatu: 'LIST_NORMAL',
        })
    };

    shouldComponentUpdate(nextProps: Object) {
        return !immutable.is(this.props, nextProps)
    }

    componentWillReceiveProps(nextProps: Object) {
        // if(nextProps.reqParam != this.props.reqParam){
        //     // console.log('test:', nextProps.reqParam);
        //
        // }

        if(!immutable.is(nextProps.reqParam,this.props.reqParam)){
            this.loadData(nextProps.reqParam)
        }
    }



    __renderItem({item,index}: {item: Item, index: number}):ReactElement<any>{
        const data = typeof item == 'object'? item :
            this.props.normalizrData.get(item+'').toJS()
       return  this.props.renderItem({item:data,index})
    }


    loadData:Function
    render(): ReactElement<any> {

        const loadStatu = this.props.data.get('loadStatu')
        let listDataKey = this.props.data.get('listData').toJS()
        // listData = listData && listData.toJS()
        // console.log('listDataKey:', listDataKey);

        const data = !this.props.afterDataMap
            ? listDataKey
            : this.props.afterDataMap(listDataKey)||listDataKey

        const key = this.props.reqKey
        if(!key){
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

        const loadData = (param)=>this.props.load(key, param, false, dataMap)
        const loadMore = ()=>this.props.loadMore(key, reqParam, true, dataMap)
        this.loadData = loadData
        return (
            <BaseSectionView
                {...this.props}
                loadData={()=>loadData(reqParam)}
                loadMore={loadMore}
                data={data}
                loadStatu={loadStatu}
                renderItem={this.__renderItem.bind(this)}
            />

        );
    }
}


