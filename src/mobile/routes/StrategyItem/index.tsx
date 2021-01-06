import React, { useEffect, useState } from "react";

import "./index.less";

import IProps from "@typings/react.d";

import { pageUrlsMap } from "@src/mobile/config/routes";

import { Detail } from "@src/mobile/components/index";

import { IRow } from "@src/mobile/components/Detail/interface";

import { marginType, openType } from "@src/mobile/utils/constants";

import { User, fetch } from "@utils/index";

import { api } from "@src/mobile/config";

export default (props: IProps) => {
  const [detail, setDetail] = useState({});
  const { history } = props;
  const userInfo = User.getUserInfo();

  const { entry_present = [], take_profit_present = [] } = detail as any;

  const goTo = (url: string) => {
    return () => {
      history.push(url);
    };
  };

  const entry_presentRowData = entry_present.map(
    (it: string, index: number) => {
      return {
        name: `entry_present@${index}`,
        label: `第${index + 1}批`,
        render: () => {
          return <span>{it}$</span>;
        },
      };
    }
  );

  const take_profit_presentRowData = take_profit_present.map(
    (it: string, index: number) => {
      return {
        name: `take_profit_present@${index}`,
        label: `第${index + 1}目标`,
        render: () => {
          return <span>{it}$</span>;
        },
      };
    }
  );

  const getRowData = () => {
    const rowData: IRow[] = [
      {
        name: "margin_type",
        label: "开仓模式",
        type: "select",
        data: marginType,
      },
      {
        label: "开仓倍数",
        name: "leverage",
        afterDOM: "倍",
      },

      {
        label: "每单保证金",
        name: "open_margin",
        afterDOM: "$",
      },
      {
        label: "是否限制开单数量",
        name: "is_limit_num",
      },
      {
        label: "开单方式",
        name: "entry_type",
        type: "select",
        data: openType,
        children: entry_presentRowData,
      },
      {
        label: "止盈方式",
        name: "profit_type",
        type: "select",
        data: openType,
        render: (detail: any) => {
          if (detail.move_take_profit) {
            return "移动止盈";
          }
          return "非移动止盈";
        },
        children: take_profit_presentRowData,
      },
      {
        label: "止损方式",
        name: "stop_order",
        render: (detail: any) => {
          if (detail.stop_order) {
            return "跟随系统";
          }
          return "手动止损";
        },
      },
    ];

    return rowData;
  };
  const goDetail = (key: string) => {
    return () => {
      history.push({
        pathname: pageUrlsMap.order,
        key,
      });
    };
  };

  const getData = () => {
    fetch
      .get(api.getOrderOpenSettingData, { user_id: userInfo.id, set_type: 3 })
      .then((res) => {
        if (res.data) {
          const [item] = res.data || [{}];
          setDetail(item);
        }
      });
  };

  useEffect(() => {
    getData();
  }, [userInfo.id]);

  return (
    <div className="strategy-item">
      <Detail detail={detail} rowData={getRowData()} />
      <div className="btn-container" onClick={goTo(pageUrlsMap.home)}>
        <span className="btn back-btn" onClick={goTo(pageUrlsMap.strategyList)}>
          返回
        </span>
        <span className="btn" onClick={goDetail("1")}>
          编辑
        </span>
      </div>
    </div>
  );
};
