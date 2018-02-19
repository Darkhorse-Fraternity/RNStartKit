import React from "react";
import styled from "styled-components/native";
import {default as BaseIcon} from 'react-native-vector-icons/Ionicons';


export const Form = styled.View`
    background-color: white;
    margin-top: 10px;
    flex: 1;
    justify-content: space-between;
`

export const InnerView = styled.ScrollView`
   flex: 1;
   padding: 15px 0px;
`

export const StyledBottomView = styled.View`
    width: 100%;
    height: 50px;
    background: black;
    flex-direction: row;
    align-items: center;
`
export const StyledPriceText = styled.Text`
   color: white;
   font-size: 20px;
   margin: 20px;
   font-weight: 600;
   width: 60%;
`

export const StyleRadio = styled.View`
   width: 100%;
   border-bottom-width: ${props => props.theme.hairlineWidth};
   border-bottom-color: ${props => props.theme.hairlineColor};
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding:15px;
`
export const StyleRadioText = styled.Text`
   font-size: ${props => props.theme.mainFont.fontSize};
   color: ${props => props.theme.mainFont.color};
   width: 100px;
   text-align: center;
`

export const StyledRaioColorText = StyleRadioText.extend`
  color:${props => props.theme.mainColor};
`

export const RadioIcon = styled(BaseIcon)`
  height:29px;
  width: 30px;
`
export const StyledPlaceView = styled.View`
  width: 30px;
`