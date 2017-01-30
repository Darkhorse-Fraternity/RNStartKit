/*@flow*/
'use strict'


/**
 * 和page 分开写是为了避免循环引用，所以这边需要记得保持key的一致性。
 */



export const pageConfig = {
    'TabView': {
        title: '巧惠团', hideBackBtn: true, gestureResponseDistance: 0.0001,
    },
    'LoginView': {
        title: '登录', hideNavBar: true, gestureResponseDistance: 0.0001,
        direction: 'vertical'
    },

    "PersonCenter": {hideNavBar: true},
    "BaseWebView": {title: "加载中。。", gestureResponseDistance: 0.0001},
    "CourseInfoView": {title: "课程详情",},
    "LessonEvaluateView": {title: "课程评价",},
    "PersonInfo": {title: "个人资料",},
    "MyOrder": {title: "我的订单",},
    "Setting": {title: "设置",},
    "FindPwd": {title: "找回密码",},
    'Feedback': {title: "意见反馈",},
    "ClassRecord": {title: "课时流水",},
    "AlterPwd": {title: "修改密码",},
    "NickName": {title: "修改昵称",},
    "PhoneContacts": {title: "修改手机号",},
    'RegPhone': {title: '注册'},
    'Contribute': {title: '创意服务'},
    'Intro': {title: '介绍', hideNavBar: true, gestureResponseDistance: 100},
    'IdeaList': {title: '创意列表'},
    'iShowList': {title: '我的发布'},
    'iShowDetail': {title: ''},
    'Comment': {title: '评论'},
    'AddComment': {title: '写评论'},
    'Submit': {title: '选择类型'},
    'Normal': {title: '创意服务'},
    'iCommit': {title: '购买'},
    'iServe': {title: '我的服务'},
    'iPurchase': {title: ''},
    'iReply': {title: '回复'},
    'iRate': {title: '评价'},
    'introDetail': {title: '回复'},
    'About': {title: '关于我们'},
    'Buy': {title: '巧惠团',hideNavBar: false},
    'RedPocket': {title: '红包',hideNavBar: true,gestureResponseDistance: 100},
    'Order': {title: '订单',hideNavBar: false,gestureResponseDistance: 100},
    'Search':{title: '查询'},
    'BuyList':{},
    'RedPocketDetail':{title: '红包详情'},
    'RedPockList':{title: '抢红包'},
    'RedPocketInfo':{title: '签到抽奖'},
    'ChangePhone':{title:'修改手机'},
    'Service':{title:'客服中心'},
    'Bill':{title:'账单'},
    'Invite':{title:'邀请'},
    'RedPocketRecord':{title:'红包'},
    'SpecialBuy':{title:'返现购'},
    'AdvanceAlipay':{title:'绑定支付宝'},
    'AdvanceRecord':{title:'提现记录'},
    'AdvanceWay':{title:'提现方式'},
    'Product':{title:'商品详情'},
}

export function config(key: string): Object {

    return {
        key: key,
        ...(pageConfig[key] || {title: key}),
    }
}

function defaultConfig() {
    return {}
}