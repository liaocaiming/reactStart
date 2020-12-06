import React from 'react';

import Order from './orderMange';

import OrderList from './OrderList';


export default [
  {
    tab: '下单',
    key: 'order',
    component: (props: any) =>  <Order {...props}/>
  },
  {
    tab: '下单列表',
    key: 'orderList',
    component: (props: any) =>  <OrderList {...props}/>
  }
]