/**
 * Created by lintong on 2016/12/12.
 * @flow
 */
'use strict';


import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native'
import {connect} from 'react-redux'
import {mainColor} from '../../configure'
import {dataStorage} from '../../redux/actions/util'
import {Toast} from '../../util'
import {placeholder} from '../../../source'
import {renderRedPocketRow} from '../../components/Row'
import RedModal, {modalKey} from '../../components/ReaPocketModal'
class MyComponet extends Component {
    constructor(props: Object) {
        super(props);

    }

    static propTypes = {};
    static defaultProps = {};





    __lotteryDraw = ()=> {
        let increase = this.props.raffle || -1
        var self = this;

        const time = 200 + 5
        const x = 1.2
        const interval = increase < time / x ? time / x - (increase * x) : time / x + (increase * x)
        console.log('interval:', interval)
        this.time = setInterval(()=> {
            increase = increase + 1
            self.props.start(increase)
            if (increase == time) {
                Toast.show('抽奖结束，您抽到的奖品是 ', increase % 10 + '')
                clearInterval(self.time)
                this.props.start(increase % 10)
                // this.props.start(-1)
            } else if (increase % 10 == 9) {
                clearInterval(self.time)
                self.__lotteryDraw()
            }
        }, interval > 10 ? interval : 10)
    }

    componentWillUnmount() {
        this.time && clearInterval(this.time)
        this.props.start(-1)
    }



    __renderHead(): ReactElement<any> {
        const item = (num, image)=> {
            const raffle = this.props.raffle % 10
            const flag = num == raffle
            const color = {backgroundColor: flag ? 'black' : 'white'}
            return (
                <View style={[styles.item,color]}>
                    {/*<Image source={}/>*/}
                </View>
            )
        }

        const btn = ()=> {
            return (
                <TouchableOpacity onPress={this.__lotteryDraw} style={styles.touch}>

                </TouchableOpacity>
            )
        }
        return (
            <View style={styles.head}>
                {item(0)}
                {item(1)}
                {item(2)}
                {item(3)}
                {item(9)}
                {btn()}
                {item(4)}
                {item(8)}
                {item(7)}
                {item(6)}
                {item(5)}
            </View>
        )
    }

    render(): ReactElement<any> {
        return (
            <View style={[this.props.style,styles.wrap]}>
                <RedModal/>
                <ScrollView refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={()=>{}}
                />}>

                    {this.__renderHead()}
                    <Image style={{width:Dimensions.get('window').width,height:30}} source={placeholder}/>
                    {renderRedPocketRow.bind(this)()}

                </ScrollView>
                <TouchableOpacity style={styles.btn} onPress={this.props.showModal}>
                    <Image style={{width:100,height:100}} source={placeholder}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    head: {
        backgroundColor: mainColor,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    item: {
        marginTop: 10,
        //marginBottom:15,
        height: (Dimensions.get('window').width - 60) / 4,
        width: (Dimensions.get('window').width - 60) / 4,
        borderRadius: 10,
        backgroundColor: 'white',
        //padding:5,
    },
    touch: {
        marginTop: 10,
        height: (Dimensions.get('window').width - 60) / 4,
        width: (Dimensions.get('window').width - 40) / 2,
        borderRadius: 10,
        backgroundColor: 'blue',
    },
    btn: {
        position: 'absolute',
        bottom: 50,
        right: 0,
    }

})
const RedPock_Raffle = 'RedPock_Raffle'

const mapStateToProps = (state) => {
    return {
        raffle: state.util.get(RedPock_Raffle),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        start: (num)=> {

            dispatch(dataStorage(RedPock_Raffle, num))

        },
        showModal:()=>dispatch(dataStorage(modalKey,true))

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyComponet)