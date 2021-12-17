import React, { useState, useRef, useEffect } from 'react'
import { Tabs } from 'react-vant'
import ReactECharts from 'echarts-for-react'
import ButtonGroup from '@/components/employeeData/buttonGroup'
import 'echarts/i18n/langFR'
import './index.less'

/**
 * 消息-员工数据板
 */
const EmployeeDataPage: React.FC = () => {
  const [num, setNum] = useState(1)
  const [checkedValue, setCheckedValue] = useState(0)
  const groupBtnData = [
    { text: '今天', id: '1', isactive: true },
    { text: '近7天', id: '2', isactive: false },
    { text: '近30天', id: '3', isactive: false },
    { text: '全部', id: '4', isactive: false },
  ]
  const option = {
    tooltip: {},
    xAxis: {
      data: ['0时', '6时', '12时', '18时', '24时'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'line',
        symbol: 'circle',
        symbolSize: 0,
        data: [2500, 2500, 5000, 8000, 9500],
        itemStyle: {
          normal: {
            color: '#32D0C6', //折线点的颜色
            lineStyle: {
              color: '#32D0C6', //折线的颜色
            },
          },
        },
        lineStyle: {
          width: 6,
        },
      },
    ],
  }
  const option1 = {
    tooltip: {},
    xAxis: {
      data: ['11/23', '11/24', '11/25', '11/26', '11/27', '11/28'],
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [7500, 6000, 4800, 7800, 6000, 5000],
        backgroundStyle: {
          color: '#00D2C6',
        },
        itemStyle: {
          color: '#00D2C6',
        },
        barWidth: '22px',
      },
    ],
  }

  return (
    <div className="employee__root">
      <Tabs
        active="a"
        color="#32D0C6"
        lineWidth="20px"
        lineHeight="3px"
        titleActiveColor="#333333"
        titleInactiveColor="#333333"
      >
        <Tabs.TabPane title="销售额" name="a">
          <div className="sales">
            <div className="sales-tabs">
              <ButtonGroup groupBtnData={[...groupBtnData]} setCheckedValue={setCheckedValue} />
              {checkedValue == 0 ? (
                <ReactECharts option={option} style={{ height: 300, color: '#32D0C6' }} opts={{ locale: 'FR' }} />
              ) : null}
              {checkedValue == 1 ? (
                <ReactECharts option={option1} style={{ height: 300 }} opts={{ renderer: 'svg' }} />
              ) : null}
              {checkedValue == 2 ? (
                <ReactECharts option={option1} style={{ height: 300 }} opts={{ renderer: 'svg' }} />
              ) : null}
              {checkedValue == 3 ? (
                <ReactECharts option={option1} style={{ height: 300 }} opts={{ renderer: 'svg' }} />
              ) : null}
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane title="订单数" name="b">
          2
        </Tabs.TabPane>
        <Tabs.TabPane title="收益" name="c">
          3
        </Tabs.TabPane>
        <Tabs.TabPane title="KPI目标" name="d">
          <div className="kpi-target">
            <div className="my-target-time">
              <span>2021-11-1</span>
              <span>至</span>
              <span>2021-12-30</span>
            </div>
            <div className="my-target-name">方案名称1占位符</div>
            <div className="my-target-target">
              <div>
                <span>基础目标</span>
                <span>¥1000,000</span>
                <span>绩效佣金</span>
                <span>¥15%</span>
              </div>
              <div>
                <span>二阶目标</span>
                <span>¥2000,000</span>
                <span>绩效佣金</span>
                <span>¥20%</span>
              </div>
              <div>
                <span>三阶目标</span>
                <span>¥3000,000</span>
                <span>绩效佣金</span>
                <span>¥50%</span>
              </div>
            </div>
            <div className="my-target-bottom">
              <div className="bottom-img">
                <span>销售额</span>
              </div>
              <div className="bottom-con">
                <div></div>
                <div className="bottom-progress">
                  <div className="progress-data" style={{ width: 0.6 * 285 }}>
                    <span>2,000,000</span>
                    <span></span>
                  </div>
                </div>
                <div>
                  <span>1,000,000</span>
                  <span>2,000,000</span>
                  <span>3,000,000</span>
                </div>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
export default EmployeeDataPage
