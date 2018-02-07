import React from 'react'

import {StyleAutoGrowingTextInput} from '../Cunstom/style'

const createInputs = inputCreator => {
  const renderInput = ({ input: { onChange, ...restInput }, ...rest}) => (
    <StyleAutoGrowingTextInput onChangeText={onChange} {...rest} {...restInput} />
  )
  const AutoGrowingInput = inputCreator('Input', renderInput, {}, {})

  return {
      AutoGrowingInput,
  }
}

export default createInputs
