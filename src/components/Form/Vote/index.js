import React, {Component} from 'react'
import {reduxForm} from 'redux-form/immutable'
import {TextInput} from '../Cunstom'
import PropTypes from 'prop-types';
import {
    Form,
    InnerView,
    StyledBottomView,
    StyledPriceText,
    StyleRadio,
    StyleRadioText,
    StyledRaioColorText,
    RadioIcon,
    StyledPlaceView
} from './style'

import {connect} from 'react-redux'

import {immutableRenderDecorator} from 'react-immutable-render-mixin';
import {formValueSelector} from 'redux-form/immutable'
// import {getFormValues} from 'redux-form/immutable' //获取全部

import Tip from '../../../components/Reuse/Tip'
import {Line} from '../../../components/Reuse'


import Button from '../../../components/Button/BCButton'

import {dataStorage} from '../../../redux/actions/util'
// import {Select} from 'react-native-clean-form/redux-form-immutable'
import {Select,Radio} from '../../../components/Form/Select'

export const FormID = 'VoteForm'
const selector = formValueSelector(FormID) // <-- same as form name
import {Province} from './Province'

const prices = [
    {id:1,num:'200票',price:'100',speed:'普快',unit:'0.06' },
    {id:2,num:'300票',price:'200',speed:'普快',unit:'0.06' },
    {id:3,num:'500票',price:'300',speed:'普快',unit:'0.06' },
];


@connect(
    (state, props) => {
        const radio = selector(state, 'Radio')
        const province = selector(state, 'province')
        const link = selector(state, 'link')
        const player = selector(state, 'player')
        return {
            enableSumbmit: radio && radio.price > 0 && province && link && player,
            // initialValues: props.localSaveEnable && state.util.get(FormID + props.localSaveID),
            // initialValues:{text:"123"},
            price:radio?radio.price:0
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

export default class VoteForm extends Component {

    static propTypes = {};
    static defaultProps = {};


    componentWillUnmount() {
        // this.props.localSaveEnable && this.props.localSave(this.props.inputText)
    }


    __renderRadioItem = (item,selItem)=>{
        const {num,price,speed,unit,id} = item
        return (
            <StyleRadio >
                <StyleRadioText>
                    {num}/{price}元
                </StyleRadioText>
                <StyleRadioText>
                    {speed}
                </StyleRadioText>
                <StyleRadioText>
                    <StyledRaioColorText>
                        {unit}
                    </StyledRaioColorText>
                    元
                </StyleRadioText>
                <RadioIcon size={27} name={selItem.id===id?"ios-radio-button-on":"ios-radio-button-off"} />
            </StyleRadio>
        )
    }


    render() {
        // pristine 是否是初始化
        const {handleSubmit, onSubmit, disabled,price,pristine, enableSumbmit, ...rest} = this.props
        const {submitting, invalid} = rest
        return (
            <Form>
                <InnerView
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps='handled'>
                    <Tip text='填写内容' size={18}
                         style={{marginBottom: 15, marginLeft: 15}}/>
                    <Line/>
                    <Select
                        // inlineLabel={false}
                        labelKey="name"
                        valueKey="name"
                        style={{paddingHorizontal: 15,marginVertical:8}}
                        name="province"
                        label="Province"
                        options={Province}
                        placeholder="地区"
                    />
                    <Line/>
                    <TextInput
                        name='link'
                        style={{paddingHorizontal: 15}}
                        placeholder='投票链接'
                        underlineColorAndroid="transparent" {...rest} />
                    <Line/>
                    <TextInput
                        name='player'
                        style={{paddingHorizontal: 15}}
                        placeholder='投票选手'
                        underlineColorAndroid="transparent" {...rest} />
                    <Line/>
                    <Tip text='数量选择' size={18}
                         style={{margin: 15}}/>
                    <Line/>
                    <StyleRadio >
                        <StyleRadioText>
                            数量
                        </StyleRadioText>
                        <StyleRadioText>
                            速度
                        </StyleRadioText>
                        <StyleRadioText>
                            单价
                        </StyleRadioText>
                        <StyledPlaceView/>
                    </StyleRadio>
                    <Radio
                        name='Radio'
                        keyName = 'id'
                        options={prices}
                        renderItem={this.__renderRadioItem}/>
                </InnerView>
                <StyledBottomView>
                    <StyledPriceText>
                        总价： {price}元
                    </StyledPriceText>
                    <Button
                        {...rest}
                        style={{height: 50}}
                        disabled={!enableSumbmit || submitting || invalid || disabled}
                        hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                        onPress={onSubmit && handleSubmit(onSubmit)}
                    >
                        提交订单
                    </Button>
                </StyledBottomView>
            </Form>
        )
    }
}


