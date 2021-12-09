import React, { useState, useCallback } from 'react'
import { Tag, Tabs } from 'react-vant'
import ReactECharts from 'echarts-for-react'
import 'echarts/i18n/langFR'
import './index.less'
/**
 * 销售业绩
 */

const SalesPerformancePage: React.FC = () => {
  const [num, setNum] = useState(1)
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
    <div className="performance__root">
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
              <Tabs type="card" color="#32D0C6" titleActiveColor="#ffffff" titleInactiveColor="#32D0C6">
                <Tabs.TabPane title="今天">
                  <div className="tabs-con">
                    <ReactECharts option={option} style={{ height: 300, color: '#32D0C6' }} opts={{ locale: 'FR' }} />
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane title="近7天">
                  <ReactECharts option={option1} style={{ height: 300 }} opts={{ renderer: 'svg' }} />;
                </Tabs.TabPane>
                <Tabs.TabPane title="近30天">
                  <ReactECharts option={option1} style={{ height: 300 }} opts={{ renderer: 'svg' }} />;
                </Tabs.TabPane>
                <Tabs.TabPane title="全部">
                  <ReactECharts option={option1} style={{ height: 300 }} opts={{ renderer: 'svg' }} />;
                </Tabs.TabPane>
              </Tabs>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane title="订单数" name="b">
          2
        </Tabs.TabPane>
        <Tabs.TabPane title="收益" name="c">
          3
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}
export default SalesPerformancePage
