/**
 * Created by lintong on 2018/2/15.
 * @flow
 */
'use strict';

import styled from "styled-components/native";

export const StyledContent = styled.View`
    width:100%;
    background-color: white;
`


export const StyledInnerContent = styled.View`
  background-color:  ${props => props.theme.mainColor};
  margin: 10px 0px;
  padding: 10px;
`

export const StyleInnerTopView = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const StyledInnerText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 21px;
  margin:10px 5px;
  align-self: ${props => props.right? 'flex-end':'flex-start'};
`

export const StyledDateText = styled.Text`
  margin: 5px 0px;
`

export const StyledPriceText = styled.Text`
  align-self: ${props => props.right? 'flex-end':'flex-start'};
  font-size: 20px;
`

export const StyledDiscirbText1 = styled.Text`
  margin: 10px 0px;
`

export const StyledDiscirbText2 = styled.Text`
  margin: 10px 0px; 
`

export const StyledLine = styled.View`
  background-color: ${props => props.theme.hairlineColor};
  height: ${props => props.theme.hairlineWidth};
  width: 100%;
`