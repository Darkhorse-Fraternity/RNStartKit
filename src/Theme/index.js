import {Theme as FormTheme} from 'react-native-clean-form'
import {StyleSheet} from 'react-native'
export default {
    ...FormTheme,
    hairlineWidth:StyleSheet.hairlineWidth,
    hairlineColor:'rgb(200,200,200)',
    contentColor: 'white',
    normalBtn:{
        color:'black',
        disabledColor:'rgb(150,150,150)',
        fontSize:15,
        activityIndicatorColor:'grey'
    }
}