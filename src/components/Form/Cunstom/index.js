import createInputs from './createInputs'
import createInputCreator from './createInputCreator'
import { Field } from 'redux-form/immutable'

const {
    AutoGrowingInput,
    TextInput
} = createInputs(createInputCreator(Field))

export {
    TextInput,
    AutoGrowingInput,
}
