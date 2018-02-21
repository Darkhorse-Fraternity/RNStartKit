import React, {Component} from 'react'
import {reduxForm} from 'redux-form/immutable'
import {TextInput} from '../Cunstom'
import PropTypes from 'prop-types';
import {
    Form,
    InnerView,
    StyledPriceText
} from './style'

import {connect} from 'react-redux'

import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import {formValueSelector} from 'redux-form/immutable'
// import {getFormValues} from 'redux-form/immutable' //获取全部

import Tip from '../../../components/Reuse/Tip'
import {Line} from '../../../components/Reuse'


import Button from '../../../components/Button/BCButton'

import {Select} from '../../../components/Form/Select'

export const FormID = 'Withdraw'
const selector = formValueSelector(FormID) // <-- same as form name


@connect(
    (state, props) => {
        const account = selector(state, 'account')
        const name = selector(state, 'name')
        const money = selector(state, 'money')
        return {
            enableSumbmit: account && name && money,
            // initialValues: props.localSaveEnable && state.util.get(FormID + props.localSaveID),
            // initialValues:{text:"123"},
        }
    },
    (dispatch, props) => ({

        localSave: (text) => {
            // dispatch(dataStorage(FormID + props.localSaveID, {text}))
        }
    })
)

@reduxForm({
    form: FormID,
})

@immutableRenderDecorator

export default class WithdrawForm extends Component {

    static propTypes = {};
    static defaultProps = {};


    componentWillUnmount() {
        // this.props.localSaveEnable && this.props.localSave(this.props.inputText)
    }





    render() {
        // pristine 是否是初始化
        const {handleSubmit, onSubmit, disabled, pristine, enableSumbmit, ...rest} = this.props
        const {submitting, invalid} = rest
        return (
            <Form
                keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps='handled'>
                <InnerView>
                    <StyledPriceText>
                        账户余额：15元
                    </StyledPriceText>
                    <Tip text='支付宝' size={18}
                         style={{marginBottom: 15, marginLeft: 15}}/>
                    <Line/>

                    <TextInput
                        name='account'
                        style={{paddingHorizontal: 15}}
                        placeholder='支付宝账号'
                        underlineColorAndroid="transparent" {...rest} />
                    <Line/>
                    <TextInput
                        name='name'
                        style={{paddingHorizontal: 15}}
                        placeholder='支付宝姓名'
                        underlineColorAndroid="transparent" {...rest} />
                    <Line/>
                    <TextInput
                        name='money'
                        style={{paddingHorizontal: 15}}
                        placeholder='提现金额'
                        keyboardType='numeric'
                        underlineColorAndroid="transparent" {...rest} />
                    <Line/>

                    <Button
                        {...rest}
                        style={{height: 50,margin:15}}
                        disabled={!enableSumbmit || submitting || invalid || disabled}
                        hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                        onPress={onSubmit && handleSubmit(onSubmit)}
                    >
                        提现
                    </Button>
                </InnerView>
            </Form>
        )
    }
}


