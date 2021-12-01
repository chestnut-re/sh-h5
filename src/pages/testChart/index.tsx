import { clearAllCookie, printCookie } from '@/utils/cookie'
import { observer } from 'mobx-react-lite'
import React from 'react'
import ReactECharts from 'echarts-for-react'
import './index.less'

const TestChartPage = observer(() => {
  const getOption = () => {
    return {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
  }

  return (
    <div className="TestChartPage__root">
      <ReactECharts option={getOption()} />
    </div>
  )
})

export default TestChartPage