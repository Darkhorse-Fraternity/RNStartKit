/**
 * Created by lintong on 2018/2/21.
 * @flow
 */
'use strict';

import styled from "styled-components/native";

export const StyledContent = styled.View`
    flex: 1;
    background-color: ${props => props.theme.contentColor};
`

export const StyledRow = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 15px;
`

export const StyledRowInner = styled.View`
  background-color: white;
  align-items: center;
  border-width: 1px;
  border-color: ${props => props.theme.mainColor};
  border-radius: 10px;
  flex-direction: row;
  height: 100px;
  width: 95%;
  padding:15px 0px;
 
`

export const StyledRowLeft = styled.View`
  align-items: center;
  justify-content: center;
  flex: 0.4;
`

export const StyledRowPrice = styled.Text`
  font-size: 25px;
  color: ${props => props.theme.mainColor};;
  font-weight: bold;
`

export const StyledRowLine = styled.View`
  height: 100%;
  background-color: ${props => props.theme.hairlineColor};
  width: ${props => props.theme.hairlineWidth};;
`

export const StyledRowRight = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const StyledRowTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`

export const StyledRowDiscrib = styled.Text`
  font-size: 14px;
  margin-top: 10px;
  color: lightgray;
  
`