/* @flow */

'use strict';

import {defaultHost, httpHeaders} from '../configure';
import {addParams} from './useMeth';


export const schemeType = {
    http: 'http',
    https: 'https',
}

export const methodType = {
    get: 'GET',
    post: 'POST',
    head: 'HEAD',
    put: 'PUT',
    delete: 'DELETE',
}



function throwIfMissing(paramName: string = ''): string {
    throw new Error('Missing parameter' + paramName);
    // return '';
}


export function send({
    scheme = schemeType.https,
    host = defaultHost,
    path = throwIfMissing('send/path'),
    method = 'GET',
    timeout = 20000,
    params,
    head,
    needSession = false,
    ...otherParams,
}:Object): Promise<any> {

    const urlpath = scheme + '://' + host + path;
    const httpHeader = head ? head : httpHeaders(needSession);

    const body = httpHeader["Content-Type"] === "application/x-www-form-urlencoded"
        ? toQueryString(params) :
        JSON.stringify(params)

    const request = method == 'GET' ? new Request(addParams(urlpath, params), {
        method: method,
        headers: httpHeader
    }) : new Request(urlpath, {method: method, headers: httpHeader, body: body});
    const requestPromise = Promise.race([
        fetch(request, {credentials: 'include'}),
        new Promise(function (resolve, reject) {
            var reason = __DEV__ ? '网络请求超时' + urlpath : '网络请求超时'
            setTimeout(() => reject(new Error(reason)), timeout);
        })
    ]);
    return requestPromise.then((response)=> {
        if (__DEV__&& !response.ok) {
            const message = __DEV__ ?'接口请求错误:\n' + 'URL:\n' + urlpath + '\n参数:\n' + JSON.stringify(params) + ' \n回值:\n'
            + response._bodyInit:response._bodyInit
            console.log('test:', message);
        }
        return response;
    })
}

