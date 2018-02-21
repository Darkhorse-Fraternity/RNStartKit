/**
 * Created by lintong on 2018/2/16.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import {default as BaseIcon} from 'react-native-vector-icons/Ionicons';


export const StyledContent = styled.View`
    flex: 1;
    background-color: ${props => props.theme.contentColor};
`


export const StyledRow = styled.View`
   width: 100%;
   background-color: white;
   padding: 5px 15px;
   border-bottom-width: ${props => props.theme.hairlineWidth};
   border-bottom-color: ${props => props.theme.hairlineColor};
`

export const StyledRowInnerView = styled.View`
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   padding: 10px 0px;
   
  
`
export const StyledRowText = styled.Text`
    font-size: ${props => props.theme.mainFont.fontSize};
    color: ${props => props.theme.mainFont.color};
`

export const StyledRowTitleText = styled.Text`
    font-size: 17px;
    color: ${props => props.theme.mainColor};
    font-weight: bold;
`

export const StyledHeaderView = styled.TouchableOpacity`
   background-color: white;
   padding: 15px 15px;
   margin:15px;
   flex-direction: row;
   border-bottom-width: ${props => props.theme.hairlineWidth};
   border-bottom-color: ${props => props.theme.hairlineColor};
`

export const StyledHeaderInnerView = styled.View`
  margin-left: -5px;
`

export const PhoneIcon = styled(BaseIcon)`
  height:50px;
  width: 50px;
`