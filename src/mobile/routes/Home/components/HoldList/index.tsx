import React from "react";
import { request } from "@utils/index";
import "./index.less";

interface IProps {
  data: object[];
  unbind?: (detail: any) => void;
}

export default (props: IProps) => {
  const { unbind, data } = props;

  const unbindRobot = () => {
    request.post("/unbind", data).then((res) => {
      unbind && unbind(data);
    });
  };

  const renderItem = (detail: any) => {
    return (
      <div className="hold-item" key={detail.id}>
        <div className="first-line row buy">
          <div className="left">
            <span className="margin_right_5 direction">买</span>
            <span className="icon">BTC/USDT</span>
          </div>

          <div className="right">
            <span className="margin_right_5">全仓</span>
            <span>20X</span>
          </div>
        </div>

        <div className="second-line row">
          <div className="col">
            <div className="title">待达到目标</div>
            <div className="value">2</div>
          </div>

          <div className="col">
            <div className="title">买入仓位</div>
            <div className="value">20u</div>
          </div>

          <div className="col">
            <div className="title">剩余仓位</div>
            <div className="value">200u</div>
          </div>

          <div className="col">
            <div className="title">止盈/止损</div>
            <div className="value">23/456</div>
          </div>
        </div>

        <div className="third-line row">
          <div className="col">
            <div className="title">买入价钱</div>
            <div className="value">2666</div>
          </div>

          <div className="col">
            <div className="title">强平价钱</div>
            <div className="value">666</div>
          </div>

          <div className="unbind-btn">
            <span className="btn" onClick={unbindRobot}>
              解绑机器人
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="hold-list">
      {Array.isArray(data) &&
        data.map((item) => {
          return renderItem(item);
        })}
    </div>
  );
};
