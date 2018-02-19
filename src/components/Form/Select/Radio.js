import React, {Component} from 'react'
import {
    Modal,
    Picker,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import {default as BaseIcon} from 'react-native-vector-icons/Ionicons';
import defaultTheme from '../../../Theme'

// TODO: FIXME
const HaveNoIdeaWhyThisIsNeeded = 3

const SelectLabel = styled.Text`
  font-size: ${props => props.theme.BaseInput.fontSize};
  flex:1;
`

SelectLabel.defaultProps = {
    theme: defaultTheme
}

const LabelIconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction:row;
  height: ${props => props.inlineLabel ? props.theme.FormGroup.height - props.theme.FormGroup.borderWidth * 2 : props.theme.FormGroup.height - HaveNoIdeaWhyThisIsNeeded};
`

LabelIconWrapper.defaultProps = {
    theme: defaultTheme
}

const SelectWrapper = styled.View`
  flex: 1;
`

SelectWrapper.defaultProps = {
    theme: defaultTheme
}

const Icon = styled(BaseIcon)`
  height:10;
  width:10;
`


class Radio extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: props.value
        }

        this.onValueChange = this.onValueChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.onValueChange(nextProps.value)
        }
    }


    onValueChange(newValue) {
        this.setState({
            value: newValue
        }, () => {
            this.props.onValueChange(newValue)
        })
    }


    __renderItem = (item) => {
        const {
            keyName,
        } = this.props
        return (
            <TouchableOpacity key ={item[keyName]+''} onPress={() => {
               this.onValueChange(item)
            }}>
                {this.props.renderItem(item,this.state.value)}
            </TouchableOpacity>
        )

    }

    render() {
        const {
            inlineLabel,
            options,
            theme,
            style,
            ...rest
        } = this.props
        const {value} = this.state


        return (
            <SelectWrapper style={style}  theme={theme}>
                {options.map(option =>this.__renderItem(option))}
            </SelectWrapper>
        )
    }
}

Radio.PropTypes = {
    onValueChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    renderItem: PropTypes.element.isRequired,
    keyName: PropTypes.string,
    value: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.number
    ])
}

Radio.defaultProps = {
    componentName: 'Radio',
    onValueChange: () => {
    },
    keyName: 'id',
    value: ''
}

export default Radio
