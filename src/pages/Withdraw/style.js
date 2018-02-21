/**
 * Created by lintong on 2018/2/16.
 * @flow
 */
'use strict';

import styled from "styled-components/native";

export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: ${props => props.theme.contentColor};
    padding:15px 0px;
`

export const StyleWithdrawTipView = styled.View`
    background-color: white;
   margin: 15px;
   padding: 15px;
`


export const StyledWithdrawText = styled.Text`
  font-size: ${props => props.theme.mainFont.fontSize};
  color: ${props => props.theme.mainFont.color};
  margin-top: 15px;
 
`

export const StyledWithdrawTitleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-align: center;
 
`