import useQuery from '@/hooks/useQuery'
import React, { useEffect } from 'react'

/**
 * 跳转页面
 * 测试地址: https://travel.mountainseas.cn/miniapp?action=go&data=%7B%22path%22%3A%22https%3A%2F%2Ftravel.mountainseas.cn%2Fgoods-detail%3Fid%3D1473544142729728000%26goodsPriceId%3D1476429118139760644%26userId%3D1478274355669729280%26isRebate%3D1%26isPurchase%3D1%26isPurchaseAdd%3D1%22%2C%22type%22%3A%22web%22%7D
 */
const MiniAppPage: React.FC = () => {
  const query = useQuery()
  useEffect(() => {
    const data = query.get('data')
    if (!data) return
    try {
      const d = JSON.parse(decodeURIComponent(data))
      if (d.type === 'web') {
        window.location.replace(d.path)
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  return <div className="MiniAppPage__root">...</div>
}

export default MiniAppPage
