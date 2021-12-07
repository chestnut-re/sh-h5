import React, { useState, FC } from 'react'

import { Field, ConfigProvider, Uploader } from 'react-vant'
import photographIcon from '@/assets/img/photograph_icon@3x.png'
import './index.less'
/**
 * 退款说明/凭证卡片
 */
const themeVars = {
  '--rv-cell-background-color': '#fafafa',
  '--rv-field-word-limit-color': '#cccccc',
}
const RefundInstrucCard: FC = (props) => {
  const [demo, setDemo] = useState([
    {
      url: 'https://img.yzcdn.cn/vant/leaf.jpg',
      status: 'uploading',
      message: '上传中...',
    },
    {
      url: 'https://img.yzcdn.cn/vant/tree.jpg',
      status: 'failed',
      message: '上传失败',
    },
  ])
  const afterRead = (file, { index }) => {
    file.status = 'uploading'
    file.message = '上传中...'
    const newValue = [...demo]
    newValue[index] = file
    setDemo(newValue)

    setTimeout(() => {
      file.status = 'failed'
      file.message = '上传失败'
      file.content = 'xxxx.jpg'

      setDemo((v) => {
        const nv = [...v]
        nv[index] = file
        return nv
      })
    }, 1000)
  }
  const setDemo2 = (v) => {
    console.log('v :>> ', v)
  }
  const detailDemo = (v,info) => {
    const newFilelist = [...demo]
    newFilelist.splice(info.index, 1);
    
    setDemo(newFilelist)
    
  }
  return (
    <div className="refuinstruc-card">
      <div className="refuinstruc-name">退款说明/凭证</div>
      <div className="refuinstruc-content">
        <div className="refuinstruc-text">
          <ConfigProvider themeVars={themeVars}>
            <Field
              rows={2}
              autosize
              label=""
              type="textarea"
              maxlength={170}
              placeholder="退款说明请详细填写，有助于处理"
              showWordLimit
            />
          </ConfigProvider>
        </div>
        <div className="refuinstruc-files">
          <Uploader multiple maxCount={6} value={demo} afterRead={afterRead} onDelete={(v,index) => detailDemo(v,index)} onChange={(v) => setDemo2(v)}>
            <div className="files-box rv-hairline--surround">
              <img className="photograph" src={photographIcon} />
              <p className="update-name">上传图片</p>
            </div>
          </Uploader>
        </div>
      </div>
    </div>
  )
}

export default RefundInstrucCard
