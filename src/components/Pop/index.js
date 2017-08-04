/**
 * Created by lintong on 2017/2/25.
 * @flow
 */
'use strict';

import React from 'react';
import topView from 'rn-topview';
import PopContainer from './PopContainer';
import configureStore from '../../redux/configureStore'
let popupInstance;
let mContent;
export default {
    show(content,  {
        animationType= 'fade',
        maskClosable=true,
        wrapStyle={},
        maskStyle,
        onMaskClose=()=> {},
    }={}) {
        if(!content && mContent == content)return
        mContent = content
        topView.set(
            <PopContainer
                maskStyle={maskStyle}
                store={configureStore}
                ref={i => popupInstance = i}
                animationType={animationType}
                maskClosable={maskClosable}
                onMaskClose={onMaskClose}
                wrapStyle={wrapStyle}
                onAnimationEnd={visible => { if (!visible) { topView.remove(); } }}
                visible
            >
                {content}
            </PopContainer>,
        );
    },
    hide() {
        if (popupInstance) {
            popupInstance.hide();
            mContent = null;
        }
    },
};