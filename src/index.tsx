import * as React from "react";

import * as ReactDOM from "react-dom";

import { ConfigProvider } from "antd";

import zhCN from "antd/lib/locale-provider/zh_CN";

import App from "./@shared/components/AppRoot/index";

import { HashRouter as Router } from 'react-router-dom';

import "./index.css";

import { reducers, routes } from "./config/boss/index";

import { Provider } from "react-redux";

import { createStore, applyMiddleware, combineReducers } from "redux";


import reduxThunk from "redux-thunk";


const remoteActionMiddleware = applyMiddleware(
  reduxThunk
)(createStore);

const mountNode: HTMLElement = document.getElementById("app") as HTMLElement;

// Store
const store = remoteActionMiddleware(
    combineReducers({
      ...reducers,
    }),

  // 支持 chrome 插件 Redux DevTools
  // tslint:disable-next-line:no-string-literal
  window["devToolsExtension"] ? window["devToolsExtension"]() : (f: any) => f
);

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ConfigProvider locale={zhCN}>
          <App config={{ routes }} />
        </ConfigProvider>
      </Router>
    </Provider>,
  mountNode
);
