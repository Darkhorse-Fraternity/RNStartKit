import styled from "styled-components/native";
import Button from '../../components/Button'

export const StyledContent = styled.ScrollView`
    flex: 1;
    background-color: ${props => props.theme.contentColor};
`


export const StyledItem = styled(Button)`
  padding: 15px  ;
  margin: 15px;
  border-radius: 5px;
  background-color: white;
  justify-content: center;
  margin-bottom: 5px;
`


export const StyledTopView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`

export const StyledItemTitle = styled.Text`
  color: ${props => props.theme.titleColor || 'red'};'
  font-size:19px;
  font-weight: 700;
  line-height: 25px;
`

export const StyledItemButton1 = styled(Button)`
  background-color: ${props => props.theme.mainColor };
  padding: 5px 10px 5px 10px;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
`

export const StyledItemButton2 = styled(Button)`
  padding: 5px 12px 5px 12px;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  border-width: ${props => props.theme.hairlineWidth };
  border-color: ${props => props.theme.buttonBorderColor };
`
export const StyledItemButtonText = styled.Text`
  color: white;
  font-size: 17px;
  font-weight: 600;
  
`

export const StyledItemButtonText2 = styled.Text`
  color: black;
  font-size: 17px;
  font-weight: 500;
  
`


export const StyledItemDiscrib = styled.Text`
  color: #696969;
  font-size: 14px;
  margin-top: 10px;
  line-height: 20px;
  letter-spacing: 1px;
`

export const StyledBottom = styled.View`
    margin-top: 15px;
    flex-direction: row;
    justify-content: space-between;
    border-top-color: #a3a3a3;
    border-top-width:${props => props.theme.hairlineWidth };
    padding-top: 15px;

`
export const StyledBottomText = styled.Text`
  color: #9ea1a1;
  font-size: 12px;

`

export const StyledArrow = styled.View`
  border-bottom-width: ${props => props.theme.hairlineWidth * 2};
  border-right-width: ${props => props.theme.hairlineWidth * 2};
  border-color: #8c8c85;
  transform: rotate(315deg);
  width: 10px;
  height: 10px;
  margin-left: 5px;
  margin-right: 5px;
`

