/*@flow*/
'use strict'



import TabView  from './TabView'
import LoginView from '../../pages/Setting/LoginView';
import PersonCenter from '../../pages/PersonInfo/PersonCenter';
import PersonInfo from '../../pages/PersonInfo';
import BaseWebView from '../../components/Base/BaseWebView';
import Setting from '../../pages/Setting';
import FindPwd from '../../pages/Setting/FindPwd';
import RegPhone from '../../pages/Setting/RegPhone'
import Feedback from '../../pages/Setting/Feedback'
import AlterPwd from '../../pages/PersonInfo/AlterPwd'
import NickName from '../../pages/PersonInfo/NickName'

import Buy from '../../pages/JiuBuy/Buy'
import Order from '../../pages/JiuBuy/Order'
import RedPocket from '../../pages/JiuBuy/RedPocket'
import Search from '../../pages/JiuBuy/Search'
import BuyList from '../../pages/JiuBuy/BuyList'
import RedPocketDetail  from '../../pages/JiuBuy/RedPocketDetail'
import RedPockList  from '../../pages/JiuBuy/RedPockList'
import RedPocketInfo from '../../pages/JiuBuy/RedPocketInfo'
import ChangePhone from '../../pages/Setting/ChangePhone'
import Service from '../../pages/JiuBuy/Service'
import About from '../../pages/Setting/About'
import Bill from '../../pages/JiuBuy/Bill'
import RedPocketRecord from '../../pages/JiuBuy/RedPocketRecord'
import Invite from '../../pages/JiuBuy/Invite'
import SpecialBuy from '../../pages/JiuBuy/SpecialBuy'
import AdvanceAlipay from '../../pages/JiuBuy/AdvanceAlipay'
import AdvanceRecord from '../../pages/JiuBuy/AdvanceRecord'
import AdvanceWay from '../../pages/JiuBuy/AdvanceWay'
import Product from '../../pages/JiuBuy/Product'
import WidgetForm from '../../components/WidgetForm/WidgetForm'
export  const PageMap =
{
  WidgetForm,
  Product,
  AdvanceWay,
  AdvanceRecord,
  AdvanceAlipay,
  Bill,
  RedPocketRecord,
  Invite,
  SpecialBuy,
  About,
  Service,
  ChangePhone,
  RedPocketInfo,
  RedPockList,
  RedPocketDetail,
  BuyList,
  Search,
  Buy,
  Order,
  RedPocket,
  "WebView"             : BaseWebView,
  'TabView'             : TabView,

  'LoginView'           : LoginView,
  "PersonCenter"        : PersonCenter,
  "PersonInfo"          : PersonInfo,
  "Setting"             : Setting,
  "FindPwd"             : FindPwd,
  'Feedback'            : Feedback,
  "AlterPwd"            : AlterPwd,
  "NickName"            : NickName,
  // "PhoneContacts"       : PhoneContacts,
  'RegPhone'            : RegPhone,

}
