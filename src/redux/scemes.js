import  {registerListKeys}  from './reqKeys'
import {schema} from 'normalizr';

const code = 'results'

function auto(key) {
    const item = new schema.Entity(key,{},{ idAttribute: 'objectId' });
    const list = new schema.Object({[code]: new schema.Array(item)});
    return list
}
function autoKeys(keys) {
    const schemas = {}
    keys.forEach( key =>{
        schemas[key] = auto(key)
    })
    return schemas
}

//请求识别的key对应的sceme
export const schemas = {
    ...autoKeys(registerListKeys),
}


//从normalizr 数据库中取得、存入对应值的key
export const listDefouteKey = {

}