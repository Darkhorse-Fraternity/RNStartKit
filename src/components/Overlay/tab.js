// /* @noflow */
//
// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
// } from 'react-native';
// import {
//     Link,
// } from 'react-router-native';
//
//
// const FeedSwitcher = () => (
//     <View style={[styles.switcher, styles.feedSwitcher]}>
//         <Link
//             to="/"
//             style={styles.switcherLink}
//             activeStyle={styles.switcherLinkActive}
//             underlayColor="transparent"
//         >
//             <View style={[styles.switcherTabLinkTextWrapper]}><Text>Public</Text></View>
//         </Link>
//         <Link
//             to="/home/user/private"
//             style={styles.switcherLink}
//             activeStyle={styles.switcherLinkActive}
//             underlayColor="transparent"
//         >
//             <View style={[styles.switcherTabLinkTextWrapper]}><Text>Private</Text></View>
//         </Link>
//     </View>
// );
//
// export default () => (
//     <View style={styles.userOverlay}>
//         <FeedSwitcher />
//     </View>
// );
//
// const styles = StyleSheet.create({
//
//     userOverlay: {
//         position: 'absolute',
//         bottom: 50,
//         right: 0,
//         left: 0,
//         paddingRight: 100,
//         paddingLeft: 100,
//     },
//     feedSwitcher: {
//         height: 28,
//     },
//     switcherTabLinkTextWrapper: {
//         flex: 1,
//         height: 28,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     switcherLink: {
//         flex: 1,
//     },
//     switcherLinkActive: {
//         backgroundColor: '#CECAFE',
//     },
// })