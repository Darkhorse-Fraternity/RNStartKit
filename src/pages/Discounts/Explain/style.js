/**
 * Created by lintong on 2018/2/22.
 * @flow
 */
'use strict';

import styled from "styled-components/native";

export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`

export const StyledText = styled.Text`
  font-size: ${props => props.size || props.theme.mainFont.fontSize};
  line-height: ${props => props.theme.mainFont.lineHeight};
  color: ${props => props.theme.mainFont.color};
  padding: 20px;
`