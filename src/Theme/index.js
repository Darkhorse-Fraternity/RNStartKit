import {Theme as FormTheme} from 'react-native-clean-form'
import {StyleSheet, Dimensions} from 'react-native'

export default {
    ...FormTheme,
    hairlineWidth: StyleSheet.hairlineWidth,
    hairlineColor: 'rgb(200,200,200)',
    contentColor: '#ececec',
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    mainColor: '#fd8d87',
    normalBtn: {
        color: 'black',
        disabledColor: 'rgb(150,150,150)',
        fontSize: 15,
        activityIndicatorColor: 'grey'
    },
    Button: {
        ...FormTheme.Button,
        backgroundColor: '#19b605',
        fontSize: 19,
        disabledBackgroundColor: 'rgb(200,200,200)',
        fontWeight: '500',
    },
    BaseInput: {
        ...FormTheme.BaseInput,
        fontSize: 19
    },
    mainFont: {
        color: 'rgb(100,100,100)',
        fontSize: 14,
        lineHeight: 20,
    },
    //一般用作title
    h1: {
        color: 'rgb(100,100,100)',
        fontSize: 17,
        lineHeight: 20,
    }
}