// import React from 'react';
// import {
//     Route,
//     StackRoute,
//     TabsRoute,
//     Router,
//     nativeHistory,
// } from 'react-router-native';
// import tab from '../components/Overlay/tab'
// import Buy from './JiuBuy/Buy'
// import { syncHistoryWithStore } from 'react-router-redux'
// const routes = (store)=> {
//
//     const history = syncHistoryWithStore(nativeHistory, store)
// // Set current path to '/'
// //     history.push('/')
//     return (
//         <Router history={history} addressBar>
//             <TabsRoute path="master" component={Buy} >
//                 <Route path="/" component={Buy} overlayComponent={tab}/>
//             </TabsRoute>
//         </Router>
//     )
//
// }
// export default routes;