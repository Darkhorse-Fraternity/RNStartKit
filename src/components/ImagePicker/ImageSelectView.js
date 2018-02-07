/*@flow*/
'use strict'


import React, {Component} from 'react';
import  {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    LayoutAnimation,
} from 'react-native';
import imagePicker from './imagePicker'
import Button from 'react-native-button'
import PropTypes from 'prop-types';
// const source = require('../../source/img/pic_upload/pic_upload.png');
import * as immutable from 'immutable';

export default class ImageSelectView extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            files: []
        };
    }

    state: {
        files:[],
    }

    static propTypes = {
        maxImage: PropTypes.number,
        files: PropTypes.array,
        onChange: PropTypes.func,
    };
    static defaultProps = {
        maxImage: 8,
        files:[]
    };

    _selectImage = ()=> {

        const opt = {
            title: '添加图片',
            maxWidth: 2000, // photos only
            maxHeight: 2000, // photos only
        }
        imagePicker(opt, (response)=> {

            // console.log('response:', response);
            if(response.uri){
                // LayoutAnimation.spring();
                const files = this.state.files.concat(response)
                this.props.onChange && this.props.onChange(files);
            }

        })
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.files && nextProps.files != this.props.files) {
            this.setState({files: nextProps.files})
        }
    }

    _renderLastButton() {
        if (this.props.files.length < this.props.maxImage) {
            return (
                <TouchableOpacity style={styles.addBtn} onPress={this._selectImage}>
                    {/*<Image style={styles.image} source={source}/>*/}
                    <Text style={styles.add}>+</Text>
                </TouchableOpacity>
            );
        }
    }

    shouldComponentUpdate(nextProps: Object, nextState: Object): bool {
        return this.state !== nextState || !immutable.is(this.props, nextProps);
    }

    render() {
        const files = this.state.files;
        // console.log('files:', files);
        return (
            <View style={[styles.imageBackView,this.props.style]}>
                {
                    files && files.map((file, i)=> {
                        if (i < this.props.maxImage) {
                            return (
                                <Button key={i}>
                                    <Image style={[styles.image]}
                                           source={{uri:file.uri}}/>
                                    <TouchableOpacity
                                        hitSlop={{top: 15, left: 25, bottom: 25, right: 15}}
                                        onPress={()=>{
                                        const n = files.filter((f)=>f != file)
                                        this.props.onChange &&  this.props.onChange(n)
                                 }}
                                        style={styles.delete}>
                                        <Text style={styles.deleteText}>x</Text>
                                    </TouchableOpacity>
                                </Button>
                            )
                        } else {
                            return null;
                        }
                    })
                }
                {this._renderLastButton()}
            </View>
        );
    }

}

const styles = StyleSheet.create({

    imageBackView: {
        marginTop: 30,
        height: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: -15
        // backgroundColor:'red',
    },
    image: {
        height: 80,
        width: 80,
        marginLeft: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgb(200,200,200)",
    },
    add: {
        fontSize: 60,
        color: "rgb(200,200,200)",
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginTop: -10
    },
    addBtn: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgb(200,200,200)",
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        marginLeft: 15,
    },
    delete:{
        backgroundColor:'rgba(0,0,0,0.5)',
        zIndex:5,
        position:'absolute',
        right:5,
        top:5,
        width:15,
        height:15,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7.5,
    },
    deleteText:{
        color:'white',
        marginTop:-2,
    }
});
