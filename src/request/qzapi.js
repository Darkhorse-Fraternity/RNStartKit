/* @flow */
'use strict'

import { methodType, cacheType } from './'

export function requestProductZone() {
    return {
        path:'/product/zones.do',
        method:methodType.get,
    }
}

export  function resetProductList(zoneId:string,pageNo:string) {
    return {
        path:'/product/products.do',
        method:methodType.get,
        params:{
            zoneId,
            pageNo,
            pageSize:20,
        },
    }
}


export  function rqProductDetail(id:string) {
    return {
        path:'/product/detail.do',
        method:methodType.get,
        params:{
            id,
        },
    }
}