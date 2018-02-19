import styled from "styled-components/native";

export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: ${props => props.theme.contentColor};
`

export const StyledAccountInfo = styled.View`
   width: 100%;
   justify-content: space-between;
   align-items: center;
   flex-direction: row;
   padding: 15px;
   background-color: ${props => props.theme.mainColor};;
`

export const StyledAcountText = styled.Text`
  font-size: 16px;
  color: white;
`

export const StyledBodyRow = styled.View`
  padding: 15px;
  background-color: white;
  margin-bottom: 10px;
 
`

export const StyledBodyText = styled.Text`
  font-size: ${props => props.fontSize||props.theme.mainFont.fontSize};
  line-height: ${props => props.theme.mainFont.lineHeight};
  color: ${props => props.theme.mainFont.color};
`

export const StyledBodyLowText = styled.Text`
  font-size: ${props => props.theme.mainFont.fontSize};
  line-height: ${props => props.theme.mainFont.lineHeight};
  color: #cbcfcf;
  margin: 10px 0px 20px 20px;
`

export const StyledTouch = styled.TouchableOpacity`
  border-color: ${props => props.theme.mainColor};
  border-width:  ${props => props.theme.hairlineWidth};
  border-radius: 5px;
  width: 80%;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 10px 0px;
`

