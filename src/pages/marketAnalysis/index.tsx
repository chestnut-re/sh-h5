import React, { useState, FC } from 'react'
import SalesRanking from '@/components/marketAnalysis/salesRanking'
import ButtonGroup from '@/components/marketAnalysis/buttonGroup'
import { ConfigProvider, Tabs, Empty } from 'react-vant'
import './index.less'

/**
 * 市场分析入口页
 */
const themeVars = {
  '--rv-tabs-bottom-bar-color': '#3BD1C4',
  '--rv-tab-font-size': '4.26667vw',
}
const groupBtnData = [
  { text: '今天', id: '1', isactive: false },
  { text: '近7天', id: '2', isactive: false },
  { text: '近30天', id: '3', isactive: true },
  { text: '全部', id: '4', isactive: false },
]
const MarketAnalysisPage: FC = () => {
  return (
    <div className="market-container">
      <div className="market-header">
        <ConfigProvider themeVars={themeVars}>
          <Tabs
            lineWidth="5.6vw"
            titleInactiveColor="#333"
            ellipsis={false}
            titleActiveColor="#333333"
            lineHeight="1.06vw"
            active="a"
          >
            <Tabs.TabPane title="销售额" name="a">
              <div className="market-content">
                <div className="market-box">
                  <div className="market-box-header">
                    <ButtonGroup groupBtnData={[...groupBtnData]} />
                  </div>
                  <div className="market-box-bottom">
                    <SalesRanking />
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane title="订单数" name="b">
              <div className="market-content">
                
                
              </div>
            </Tabs.TabPane>
          </Tabs>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default MarketAnalysisPage
