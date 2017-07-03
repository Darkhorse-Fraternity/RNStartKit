import React from 'react';
import Checkbox from './CheckBox';
import CheckboxItemStyle from './style';
import {TouchableWithoutFeedback, Image, View, Text} from 'react-native';
const refCheckbox = 'checkbox';

export default class CheckboxItem extends React.Component< any> {
    static defaultProps = {
        styles: CheckboxItemStyle,
    };
    handleClick = () => {
        let checkBox = this.refs[refCheckbox];
        console.log('test:', '1111');
        checkBox.handleClick();

        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        let {
            style, checkboxStyle, defaultChecked, checked, disabled, children, onChange, styles,
        } = this.props;

        return (
            <View style={style}>
                <TouchableWithoutFeedback
                    onPress={disabled ? undefined : this.handleClick}
                >
                    <View style={[style,{flexDirection:'row',alignItems:'center'}]}>
                        <Checkbox
                            ref={refCheckbox}
                            style={[styles.checkboxItemCheckbox, checkboxStyle]}
                            defaultChecked={defaultChecked}
                            checked={checked}
                            onChange={onChange}
                            disabled={disabled}
                        />
                        {typeof children === 'string' ? ( <Text style={styles.iconRight}>{children}</Text>)
                            : children}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}