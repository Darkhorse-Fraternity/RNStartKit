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


export const StyledBanner = styled.Image`
   width: 100%;
   height: 200px;
`

export const StyledSmallBanner = styled.Image `
   width: 100%;
   height: 100px;
   margin: 10px 10px 10px 10px; 
`

export const StyledItemsView = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  padding: 5px;
  justify-content: center;
  align-items: center;
`

export const StyledItem = styled(Button)`
  padding: 15px  ;
  margin: 15px;
  border-radius: 5px;
  background-color: white;
  justify-content: center;
  margin-bottom: 5px;
`


export const StyledLeftImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`



export const StyledItemTitle = styled.Text`
  color: ${props => props.theme.titleColor || 'red'};
  font-size:17px;
  font-weight: 500;
  line-height: 25px;
`

export const StyledItemDiscrib = styled.Text`
  color: #9ea1a1;
  font-size: 14px;
  margin-top: 10px;
  line-height: 20px;
  letter-spacing: 1px;
`

export const StyledBottom = styled.View`
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
`
export const StyledBottomText = styled.Text`
  color: #9ea1a1;
  font-size: 12px;

`