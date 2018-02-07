import React, {Component} from 'react'
import {reduxForm} from 'redux-form/immutable'
import {AutoGrowingInput} from '../Cunstom'
import PropTypes from 'prop-types';
import {Form} from './style'

import CleanBtn from '../../../components/Button/CleanBtn'

import {connect} from 'react-redux'

import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import {formValueSelector} from 'redux-form/immutable'
// import {getFormValues} from 'redux-form/immutable' //获取全部

export const FormID = 'ChatSendForm'
const selector = formValueSelector(FormID) // <-- same as form name

import {dataStorage} from '../../../redux/actions/util'

@connect(
    (state, props) => {
        const text = selector(state, props.name)
        return {
            enableSumbmit: text && text.length > 0,
            initialValues: props.localSaveEnable && state.util.get(FormID + props.localSaveID),
            // initialValues:{text:"123"},
            inputText:props.localSaveEnable && text,
        }
    },
    (dispatch, props) => ({

        localSave:  (text) => {
            dispatch(dataStorage(FormID + props.localSaveID,{text}))
        }
    })
)

@reduxForm({
    form: FormID,
})

@immutableRenderDecorator

export default class ChatSendForm extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
    };
    static defaultProps = {};



    componentWillUnmount() {
       this.props.localSaveEnable && this.props.localSave(this.props.inputText)
    }


    render() {
        // pristine 是否是初始化
        const {handleSubmit, onSubmit, disabled, pristine, enableSumbmit, ...rest} = this.props
        const {submitting, invalid} = rest
        return (
            <Form>
                <AutoGrowingInput underlineColorAndroid="transparent"
                                  {...rest} />
                <CleanBtn
                    {...rest}
                    disabled={ !enableSumbmit  || submitting || invalid || disabled}
                    style={{width: 31}}
                    text='发送'
                    hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                    onPress={onSubmit && handleSubmit(onSubmit)}
                />
            </Form>
        )
    }
}


