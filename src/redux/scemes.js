import  * as keys  from './reqKeys'
import {schema} from 'normalizr';


// const notice = new schema.Entity(keys.NOTICE);
// const noticeList = new schema.Object({[keys.NOTICELIST]: new schema.Array(notice)});



//请求识别的key对应的sceme
export const schemas = {
    // [keys.NOTICELIST]: noticeList,

}


//从normalizr 数据库中取得、存入对应值的key
export const listDefouteKey = {
    // [keys.NOTICELIST]: keys.NOTICE,

}