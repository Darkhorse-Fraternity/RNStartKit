import  {registerListKeys,ICARD,USER,IUSE}  from './reqKeys'

import {schema} from 'normalizr';

export const code = 'results'


const entity = (key,config={})=> new schema.Entity(key,config,{ idAttribute: 'objectId' });
const list = (item) => new schema.Object({[code]: new schema.Array(item)})



export const user = entity(USER)
const iCard = entity(ICARD,{user})
const iUse = entity(IUSE,{user,iCard})

//
// const config = {
//     [IUSE]:{USER,ICARD},
//     [ICARD]:{USER}
// }
//
// const getConfig = (key)=>{
//     const cf = config[key]
//     //如果
//     if(cf){
//         const nfc = {}
//         Object.keys(cf).forEach(key=>{
//             nfc[key] = entity(key,getConfig(key)||{})
//         })
//         console.log('nfc:', nfc);
//         return nfc
//     }
// }
//
// const entitys = (key)=>{
//     return entity(key,getConfig(key)||{})
// }

const entitys = {
    [ICARD]:iCard,
    [IUSE]:iUse
}

const auto = (key)=> list(entitys[key]||entity(key))
function autoKeys(keys) {
    const schemas = {}
    keys.forEach( key =>{ schemas[key] = auto(key) })
    return schemas
}

//请求识别的key对应的sceme
export const schemas = {
    ...autoKeys(registerListKeys),
}


//从normalizr 数据库中取得、存入对应值的key
export const listDefouteKey = {

}