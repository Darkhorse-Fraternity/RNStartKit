import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    ScrollView,
    Dimensions,
    InteractionManager
} from 'react-native';

import Button from "react-native-button";
import {mainColor, grayFontColor} from '../configure';
const tabWidth = 80;
export default class SCTabBar extends Component {
    static propTypes = {
        goToPage: PropTypes.func,
        activeTab: PropTypes.number,
        tabs: PropTypes.array,
        underlineColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        activeTextColor: PropTypes.string,
        inactiveTextColor: PropTypes.string,
    };

    componentWillReceiveProps(props) {
        this.scroll(props.activeTab)
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.scroll(this.props.activeTab,false)
        });

    }

    scroll = (page, animated = true)=> {
        if (!this.refs.sc) {return;}
        const screenWidth = Dimensions.get('window').width
        if (page != 0) {
            this.refs.sc.scrollTo({x: tabWidth * page - (screenWidth / 2 - 1.5 * tabWidth), y: 0, animated: animated})
        } else {
            this.refs.sc.scrollTo({x: tabWidth, y: 0, animated: animated})
        }
    }
    renderTabOption = (name: any, page: number)=> {
        const isTabActive = this.props.activeTab === page;
        const activeTextColor = this.props.activeTextColor || mainColor;
        const inactiveTextColor = this.props.inactiveTextColor || grayFontColor;
        const textStyle = this.props.textStyle || {};
        if (page == 0) return (<View style={{width:tabWidth}} key={0}/>)
        let time = '...'
        let statu = '..'
        if (typeof name == 'string') {
            time = name
        } else if (typeof name == 'object') {
            time = name.time
            statu = name.statu
        }

        return <Button
            key={page}
            accessible={true}
            accessibilityLabel={time}
            accessibilityTraits='button'
            onPress={() =>{
                this.props.goToPage(page)
            }}>
            <View style={[styles.tab, {width:tabWidth}]}>
                <Text
                    style={[{color: isTabActive ? activeTextColor : inactiveTextColor,
                     fontWeight: isTabActive ? 'bold' : 'normal', fontSize:14 }, textStyle]}>
                    {time}
                </Text>
                <Text
                    style={[{color: isTabActive ? activeTextColor : inactiveTextColor,
                     fontSize:11 }, textStyle]}>
                    {statu}
                </Text>
            </View>
        </Button>;
    }

    renderTop = (name: string, page: number = 0)=> {
        const isTabActive = this.props.activeTab === page;
        const activeTextColor = this.props.activeTextColor || mainColor;
        const inactiveTextColor = this.props.inactiveTextColor || grayFontColor;
        const textStyle = this.props.textStyle || {};

        const lineView = ()=> {
            return (
                <View style={styles.line}/>
            )
        }
        return <Button
            key={page}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() =>{
               this.scroll(0)
                this.props.goToPage(page)}}>
            <View style={[styles.tab, {width:tabWidth,}]}>
                <Text
                    style={[{color: isTabActive ? activeTextColor : inactiveTextColor, fontWeight: isTabActive ? 'bold' : 'normal', fontSize:15 }, textStyle]}>
                    {name}
                </Text>
                {isTabActive && lineView()}
            </View>
        </Button>;
    }

    render() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;

        const tabUnderlineStyle = {
            position: 'absolute',
            width: tabWidth,
            height: 2,
            backgroundColor: this.props.underlineColor || mainColor,
            bottom: 0,
        };

        const left = this.props.scrollValue.interpolate({
            inputRange: [0, 1,], outputRange: [0, tabWidth],
        });

        const animatedView = ()=> {
            return (
                <Animated.View style={[tabUnderlineStyle, { left, }, ]}/>
            )
        }

        return (
            <View style={[styles.tabs,
            {backgroundColor: this.props.backgroundColor || 'white', },
            this.props.style, ]}>
                {this.renderTop(this.props.tabs[0])}
                <ScrollView ref="sc" horizontal={true} showsHorizontalScrollIndicator={false}>
                    {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                    {this.props.activeTab != 0 && animatedView()}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingBottom: 10,

    },
    tabs: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'transparent',
    },
    line: {
        width: tabWidth - 10,
        height: 2,
        backgroundColor: mainColor,
        position: 'absolute',
        bottom: 0,
        left: 5,
    }
});
