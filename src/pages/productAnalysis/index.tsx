import React, { useState, FC } from 'react'
import ProductRanking from '@/components/marketAnalysis/productRanking'
import ButtonGroup from '@/components/marketAnalysis/buttonGroup'
import { ConfigProvider, Tabs, Empty } from 'react-vant'
import './index.less'

/**
 * 商品分析入口页
 */
const themeVars = {
  '--rv-tabs-bottom-bar-color': '#3BD1C4',
  '--rv-tab-font-size': '4.26667vw',
}

const ProductAnalysisPage: FC = () => {
  const groupBtnData = [
    { text: '近7天', id: '1', isactive: true },
    { text: '近30天', id: '2', isactive: false },
  ]
  return (
    <div className="producze-container">
      <div className="producze-header">
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
              <div className="producze-content">
                <div className="producze-box">
                  <div className="producze-box-header">
                    <ButtonGroup groupBtnData={[...groupBtnData]}/>
                  </div>
                  <div className="producze-box-bottom">
                    <ProductRanking />
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane title="订单数" name="b">
              <div className="producze-content">
                
              </div>
            </Tabs.TabPane>
          </Tabs>
        </ConfigProvider>
      </div>
    </div>
  )
}

export default ProductAnalysisPage
