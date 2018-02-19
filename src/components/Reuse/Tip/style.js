/**
 * Created by lintong on 2018/2/16.
 * @flow
 */
'use strict';

import styled from "styled-components/native";


export const StyledTipView = styled.View`
  align-items: center;
  flex-direction: row;
`
export const StyledTipLine = styled.View`
  background:${props => props.theme.mainColor};
  width: ${props => props.size/4 || 4};;
  height:25px;
  margin-right: 10px;
`

export const StyledTipText = styled.Text`
  font-size: ${props => props.size || props.theme.mainFont.fontSize};
  line-height: ${props => props.theme.mainFont.lineHeight};
  color: ${props => props.theme.mainColor};
`