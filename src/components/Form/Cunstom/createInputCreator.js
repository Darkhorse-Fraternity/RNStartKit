import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import {Theme as defaultTheme} from 'react-native-clean-form'

const ErrorMessage = styled.Text`
  color: ${props => props.theme.ErrorMessage.color};
  fontSize: ${props => props.theme.ErrorMessage.fontSize};
  marginBottom: ${props => props.theme.ErrorMessage.marginBottom};
  textAlign: ${props => props.theme.ErrorMessage.textAlign};
`

ErrorMessage.defaultProps = {
  theme: defaultTheme
}

const render = renderComponent => props => {
  return renderComponent(props)
}


const createInputCreator = ReduxFormFieldComponent => (name, renderFunction, PropTypesOverrides = {}, defaultProps = {}) => {
  const Component = render(renderFunction)
  Component.displayName = name

  const FieldWrapper = props => {
    const { name, ...rest } = props

    return <ReduxFormFieldComponent name={name} component={Component} {...rest} />
  }

  FieldWrapper.displayName = 'FieldWrapper'
  FieldWrapper.PropTypes = Object.assign({
    name: PropTypes.string.isRequired
  }, PropTypesOverrides)
  FieldWrapper.defaultProps = Object.assign({}, defaultProps)

  return FieldWrapper
}

export default createInputCreator
