import createInputs from './createInputs'
import createInputCreator from './createInputCreator'
import { Field } from 'redux-form/immutable'

const {
    AutoGrowingInput,
} = createInputs(createInputCreator(Field))

export {
    AutoGrowingInput,
}
