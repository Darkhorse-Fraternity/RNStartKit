import Pop from '../Pop'
import {
    ActivityIndicator,
} from 'react-native';
import React  from 'react';
export function PopIndicator(show:bool = true) {
    if(show){
        const mainView = (
            <ActivityIndicator size="large" color="white" />
        )

        Pop.show(mainView, {
            maskClosable: false,
            onMaskClose() {
            },
        })
    }else {
        Pop.hide()
    }
}