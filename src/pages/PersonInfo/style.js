/**
 * Created by lintong on 2018/2/13.
 * @flow
 */
'use strict';

import styled from "styled-components/native";
import Button from '../../components/Button'


export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: ${props => props.theme.contentColor};
`

export const StyledAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`

export const StyledAccountInfo = styled.View`
   width: 100%;
   margin-top: 20px;
   align-items: center;
   flex-direction: row;
   padding: 15px;
   background-color: white;
`

export const StyledAcountText = styled.Text`
  font-size: 17px;
  color: black;
  margin-left: 15px;
`




export const StyledTouch = styled(Button)`
  margin-top: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
   padding: 15px;
   background-color: white;
`

export const StyledRow = styled.View`
  margin-top: 15px;


`

export const StyledTouchInner = styled.View`
  flex-direction: row;
  align-items: center;
   background-color: white;
     justify-content: space-between;
`

export const StyledTouchImg = styled.Image`
  width: 30px;
  height: 30px;
  margin-left: 5px;
`

export const StyledTouchText = styled.Text`
  color:black;
  font-size: 17px;
  margin-left: 10px;
`

export const StyledArrow = styled.View`
  border-bottom-width: ${props => props.theme.hairlineWidth * 2};
  border-right-width: ${props => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
  margin-left: 5px;
`


export const StyledSwitch =styled.Switch`

`

export const StyledBottonText = styled.Text`
  padding: 15px;
  color: #939393;
`

export const StyledBanner = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  background-color: #d0d0d0;
  align-self: center;
  margin-top: 60px;
  border-radius: 20px;
   margin-bottom: 30px;
`

export const StyledBannerImage = styled.Image`
  width: 15px;
  height: 15px;

`

export const StyledBannerText = styled.Text`
  color: #757575;
  margin-left: 10px;
  font-size: 12px;
  
`