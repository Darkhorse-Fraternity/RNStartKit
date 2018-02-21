import React from "react";
import styled from "styled-components/native";
import {default as BaseIcon} from 'react-native-vector-icons/Ionicons';


export const Form = styled.View`
    background-color: white;
    flex: 1;
`

export const InnerView = styled.View`
   flex: 1;
   padding: 15px 0px;
`


export const StyledPriceText = styled.Text`
   color: ${props => props.theme.mainColor};
   font-size: 20px;
   margin: 20px;
   font-weight: 600;
   width: 60%;
   background-color: white;
`




