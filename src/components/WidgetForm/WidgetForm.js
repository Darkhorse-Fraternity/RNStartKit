/**
 * Created by lintong on 2016/12/21.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm, Field} from 'redux-form/immutable';
import widgetValidation, {colors} from './widgetValidation';
import * as widgetActions from '../../redux/reducers/widgets';
import {TextField} from '../Form'
import {List, InputItem,DatePicker} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
import {
    View,
    TextInput,
    StyleSheet,
    ScrollView
} from 'react-native'


@connect(
    state => ({
        saveError: state.widgets.saveError
    }),
    dispatch => bindActionCreators(widgetActions, dispatch)
)
@reduxForm({
    form: 'widget',
    validate: widgetValidation
})
export default class WidgetForm extends Component {
    static propTypes = {};


    render() {
        const {
            editStop, fields, formKey, handleSubmit, invalid,
            pristine, save, submitting, saveError: {[formKey]: saveError}, values
        } = this.props;
        // console.log('test:', Picker);
        return (
            <ScrollView>
                <Field
                    name="id"
                    style={styles.textInputStyle}
                    placeholder="请输入手机号码"
                    keyboardType='numeric'
                    underlineColorAndroid='transparent'
                    clearButtonMode='while-editing'
                    enablesReturnKeyAutomatically={true}
                    onSubmitEditing={() => {}}
                    component={TextField}
                />

                <List>
                    <InputItem
                        placeholder="请输入"
                        data-seed="logId"
                    >标题</InputItem>
                    <Item data-seed="logId">标题文字点击无反馈，文字超长则隐藏，文字超长则隐藏</Item>
                    <Item wrap>文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行</Item>
                    <Item extra="箭头向右" arrow="horizontal" onClick={() => {}}>标题文字</Item>
                    <Item extra="箭头向下" arrow="down" onClick={() => {}}>标题文字</Item>
                    <Item extra="箭头向上" arrow="up" onClick={() => {}}>标题文字</Item>
                    <Item extra="内容内容" multipleLine align="top" wrap>
                        多行标题文字，文字可能比较长、文字可能比较长、直接折行
                    </Item>


                    <Item extra="内容内容" multipleLine>
                        垂直居中对齐 <Brief>辅助文字内容</Brief>
                    </Item>
                    <Item extra="没有箭头" arrow="empty" className="spe" wrap>
                        极个别情况下，单行标题文字可能比较长，文字可能比较长、文字可能比较长、靠近右边会折行
                    </Item>
                    <DatePicker mode="datetime">
                        <List.Item arrow="horizontal">
                            选择时间
                        </List.Item>
                    </DatePicker>
                </List>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({

    textInputStyle: {
        height: 40,
        width: 200,
        marginTop: 10,
        marginLeft: 29 / 2,
        // marginRight:29/2,
        color: 'black',
        backgroundColor: '#00000000',
        textAlign: 'left',
    },

})