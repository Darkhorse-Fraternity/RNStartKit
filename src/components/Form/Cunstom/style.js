import React from "react";
import styled from "styled-components/native";
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';


export const StyleAutoGrowingTextInput = styled(AutoGrowingTextInput)`
    flex: 1;
    margin: 10px 10px 10px 0px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left:10px;
    font-size: 16px;
    background: white;
    border-width:  ${props => props.theme.hairlineWidth};
    border-color: ${props => props.theme.hairlineColor};;
    border-radius: 18px;
`