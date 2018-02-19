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

export const StyledItem = styled.TouchableOpacity`
  width: 48%;
  padding: 30px 0px ;
  flex-direction: row;
  background-color: white;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  margin-right: ${props => props.insert ? '2%' : '0%'};  
`


export const StyledLeftImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`

export const StyledRight = styled.View`
  width: 50%;
`

export const StyledItemTitle = styled.Text`
  color: ${props => props.color || 'red'};
  font-size:19px;
`

export const StyledItemDiscrib = styled.Text`
  color: #9ea1a1;
  font-size: 15px;
  margin-top: 5px;
`