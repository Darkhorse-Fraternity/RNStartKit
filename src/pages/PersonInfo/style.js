/**
 * Created by lintong on 2018/2/13.
 * @flow
 */
'use strict';

import styled from "styled-components/native";

export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: ${props => props.theme.contentColor};
`

export const StyledAvatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`

export const StyledAccountInfo = styled.View`
   width: 100%;
   align-items: center;
   flex-direction: row;
   padding: 15px;
   background-color: ${props => props.theme.mainColor};;
`

export const StyledAcountText = styled.Text`
  font-size: 16px;
  color: white;
  margin-left: 10px;
`


export const StyledGetRow = styled.View`
  padding: 10px 15px ;
  background-color: white;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const StyledTouch = styled.TouchableOpacity`
  border-color: ${props => props.theme.mainColor};
  border-width:  ${props => props.theme.hairlineWidth};
  border-radius: 5px;
  width: 80px;
  align-self: center;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
`

export const StyledTouchText = styled.Text`
  color:${props => props.theme.mainColor};
`