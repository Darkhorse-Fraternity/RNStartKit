/**
 * Created by lintong on 2017/1/24.
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Text
} from 'react-native'

export default class CountDown extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            time: 0,
        }
    }

    state: {};
    static propTypes = {
        time:PropTypes.number
    };
    static defaultProps = {
        time:0
    };



    componentWillReceiveProps(props) {
        if(props.time > 0){
            this.setState({time:props.time})
            const self = this
            if(!this.time){
                this.time = setInterval(()=> {
                    this.setState({time: self.state.time - 1})
                    if (self.state.time == 0) clearInterval(this.time)
                }, 1000)
            }
        }

    }


    componentWillUnmount() {
        this.time && clearInterval(this.time)
    }

    render() {

        const time = this.state.time
        const hour = Math.floor(time / 3600)
        const min = Math.floor((time - hour * 3600) / 60)
        const mm = min >= 10 ?"":"0"
        const s = (time - hour * 3600 - min * 60 )
        const t = s >= 10 ? "" : "0"
        const date = hour + ':' + mm + min + ":" + t + s
        const textArray = date.split("").map((str, tag)=> {
            if (str == ':') {
                return (
                    <Text key={tag} style={{color:'black',marginRight:-5,}}>{str}</Text>
                )
            }
            return (
                <Text key={tag} style={styles.topDateText}>{str}</Text>
            )
        })

        return (
            <View style={{flexDirection:'row'}}>{textArray}</View>
        );
    }
}
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    topDateText: {
        textAlign: 'center',
        backgroundColor: 'black',
        width: 10,
        color: 'white',
        marginLeft: 5
    },
})