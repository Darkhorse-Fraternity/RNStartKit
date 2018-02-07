/**
 * Created by lintong on 2018/1/31.
 * @flow
 */
'use strict';

import { Field } from 'redux-form/immutable'



const createInputCreator = ReduxFormFieldComponent => (name, renderFunction, PropTypesOverrides = {}, defaultProps = {}) => {
    const Component = render(renderFunction)
    Component.displayName = name

    const FieldWrapper = props => {
        const { component, name, ...rest } = props

        return <ReduxFormFieldComponent name={name} component={Component} {...rest} />
    }

    FieldWrapper.displayName = 'FieldWrapper'
    FieldWrapper.PropTypes = Object.assign({
        border: PropTypes.bool,
        inlineLabel: PropTypes.bool,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }, PropTypesOverrides)
    FieldWrapper.defaultProps = Object.assign({
        border: FormGroup.defaultProps.border,
        inlineLabel: FormGroup.defaultProps.inlineLabel
    }, defaultProps)

    return FieldWrapper
}