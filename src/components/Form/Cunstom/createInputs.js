import React from 'react'

import {
    StyleAutoGrowingTextInput,
    StyleTextInput
} from '../Cunstom/style'

const createInputs = inputCreator => {


    const renderInput = ({input: {onChange, ...restInput}, ...rest}) => (
        <StyleAutoGrowingTextInput onChangeText={onChange} {...rest} {...restInput} />
    )
    const AutoGrowingInput = inputCreator('Input', renderInput, {}, {})

    const renderTextInput = ({input: {onChange, ...restInput}, ...rest}) => (
        <StyleTextInput onChangeText={onChange} {...rest} {...restInput} />
    )
    const TextInput = inputCreator('Input', renderTextInput, {}, {})

    return {
        AutoGrowingInput,
        TextInput
    }
}

export default createInputs
