import { methodType } from './'
// import {LeanCloud_APP_ID,LeanCloud_APP_KEY} from '../configure/leancloud'

export function cardList():Object{
    return {
        path : '/call/cardList',
        method :methodType.get,
        params :{
        }
    }
}