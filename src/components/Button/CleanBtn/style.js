import React from "react";
import styled from "styled-components/native";


export const StyleBtnText = styled.Text`
    font-size: ${props => props.theme.normalBtn.fontSize};
    color:  ${props => {
        const {color, disabledColor} = props.theme.normalBtn
        return !props.disabled ? color : disabledColor
    }};
`

export const StyledBtn = styled.TouchableOpacity`
    padding: 10px 10px 10px 10px;
    align-items: center;
    justify-content: center;    
`