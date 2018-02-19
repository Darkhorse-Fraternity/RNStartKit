/**
 * Created by lintong on 2018/2/16.
 * @flow
 */
'use strict';

import styled from "styled-components/native";

export const StyledContent = styled.View`
    flex: 1;
    background-color: white;
`

export const StyledLine = styled.View`
  background-color: ${props => props.theme.hairlineColor};
  height: ${props => props.theme.hairlineWidth};
  width: 100%;
`