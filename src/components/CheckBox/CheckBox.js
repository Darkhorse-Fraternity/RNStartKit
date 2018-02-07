import React from 'react';
import {TouchableWithoutFeedback, Image, View, Text} from 'react-native';
import CheckboxStyle from './style';

export default class Checkbox extends React.Component< any> {
    static CheckboxItem: any;

    static defaultProps = {
        styles: CheckboxStyle,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            checked: props.checked || props.defaultChecked || false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.checked === 'boolean') {
            this.setState({
                checked: !!nextProps.checked,
            });
        }


    }

    handleClick = () => {
        if (this.props.disabled) {
            return;
        }
        const checked = !this.state.checked;
        if (!(typeof this.props.checked === 'boolean')) {
            this.setState({
                checked,
            });
        }
        if (this.props.onChange) {
            this.props.onChange({target: {checked}});
        }
    }

    render() {
        let {style, disabled, children, styles} = this.props;
        let checked = this.state.checked;
        let imgSrc;
        if (checked) {
            if (disabled) {
                imgSrc = require('../../../source/img/visitor/visitor_choose.png');
            } else {
                imgSrc = require('../../../source/img/visitor/visitor_choose_in.png');
            }
        } else {
            if (disabled) {
                imgSrc = require('../../../source/img/visitor/visitor_choose.png');
            } else {
                imgSrc = require('../../../source/img/visitor/visitor_choose.png');
            }
        }

        return (
            <TouchableWithoutFeedback onPress={this.handleClick}>
                <View style={[{marginLeft:15},styles.wrapper]}>
                    <Image source={imgSrc} style={[styles.icon, style]}/>
                    {typeof children === 'string' ? ( <Text style={styles.iconRight}>{this.props.children}</Text>)
                        : children}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}