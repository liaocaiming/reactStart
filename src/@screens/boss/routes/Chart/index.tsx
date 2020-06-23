import * as React from "react";

import { connect } from "@shared/containers/appScreen";

import dateFormat from "@utils/lib/dateFormat";

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
} from "recharts";

import "antd/dist/antd.css";

import { Select } from "antd";

import arr from "./data";

const { Option } = Select;

interface IProps {
  [random: string]: any;
}

interface IList {
  date_time: number;
  close?: number;
  rate?: number;
}

interface IState {
  data: IList[];
  rateData: IList[];
  selected: string;
}

@connect()
export default class App extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      rateData: [],
      selected: 'BTCUSDT'
    };
  }

  public componentDidMount() {
    const { selected } = this.state;
    this.getData(selected);
  }

  public getData = (symbol: string) => {
    const { actions } = this.props;
    actions.get(`/results`, { symbol }).then((res: any) => {
      const { funding_rate = [], k_data } = res || {};
      this.setState({
        data: k_data,
        rateData: funding_rate,
      });
    });
  };

  public renderLineChart = (
    data: any[],
    YDataKey: "rate" | "close" = "rate"
  ) => {
    if (!Array.isArray(data)) {
      return <span>没有数据</span>;
    }
    const res = data.map((item: any) => {
      if (YDataKey === "rate") {
        return {
          ...item,
          date_time: dateFormat("YY-MM-DD hh", item.date_time),
          rate: item.rate * 100,
        };
      }
      return {
        ...item,
        date_time: dateFormat("YY-MM-DD hh", new Date(item.date_time)),
      };
    });
    return (
      <LineChart width={8000} height={400} data={res}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date_time" interval="preserveStart" />
        <YAxis dataKey={YDataKey} interval="preserveStart" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={YDataKey} stroke="#82ca9d" />
      </LineChart>
    );
  };

  public onSelectChange = (value: string) => {
    return () => {
      this.getData(value);
      this.setState({
        selected: value
      })
    }
  };

  public render() {
    const { data = [], rateData = [], selected } = this.state;
    return (
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          paddingTop: 200,
        }}
      >
        <div
          style={{
            marginBottom: 50,
            display: "flex",
            paddingLeft: 50,
            paddingTop: 50,
            position: "fixed",
            top: 20,
            left: 20,
          }}
        >
          <span style={{ marginRight: 20 }}>交易对</span>
          {/* <Select defaultValue="BTCUSDT" onChange={this.onSelectChange} style={{ width: 300 }}>
            {arr.map((item: string) => {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select> */}
          <div>
            {arr.map((it: string) => {
              return (
                <span
                  style={{
                    display: "inline-block",
                    border: "1px solid #ccc",
                    padding: "5px 8px",
                    textAlign: "center",
                    marginRight: '10px',
                    marginBottom: '10px',
                    background: selected === it ? '#a3d8b5' : '#fff',
                    cursor: 'point'
                  }}
                  onClick={this.onSelectChange(it)}
                >
                  {it}
                </span>
              );
            })}
          </div>
        </div>
        <div>{this.renderLineChart(rateData, "rate")}</div>
        <div>{this.renderLineChart(data, "close")}</div>
      </div>
    );
  }
}
