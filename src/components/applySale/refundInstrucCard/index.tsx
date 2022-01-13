import React, { useState, useEffect, FC } from 'react'

import { Field, ConfigProvider, Uploader } from 'react-vant'
import photographIcon from '@/assets/img/photograph_icon@3x.png'
import { FileService } from '@/service/FileService'
import { SHBridge } from '@/jsbridge'
import { generateUrl } from '@/utils'
import './index.less'
/**
 * 退款说明/凭证卡片
 */
const themeVars = {
  '--rv-cell-background-color': '#fafafa',
  '--rv-field-word-limit-color': '#cccccc',
}
interface RefundInstrucType {
  refundInsChange: (val) => void
}
const RefundInstrucCard: FC<RefundInstrucType> = ({ refundInsChange }) => {
  const [remarks, setRemarks] = useState('')

  const [imgFileList, setImgFileList] = useState([])
  const afterRead = (index) => {
    const file = {
      status: 'uploading',
      message: '上传中...'
    };
    const newValue = [...imgFileList]
    newValue[index] = file
    setImgFileList(newValue)
    SHBridge.getImage((data) => {
      if (data) {
        const { ossServerUrl, fileUrl } = data
        const imgUrl = `${ossServerUrl}${fileUrl}`
        file.status = 'success'
        file.message = '上传成功'
        file.content = imgUrl
        setImgFileList((v) => {
          const nv = [...v]
          nv[index] = file
          return nv
        })
      } else {
        file.status = 'failed'
        file.message = '上传失败'
        file.content = ''
        setImgFileList((v) => {
          const nv = [...v]
          nv[index] = file
          return nv
        })
      }
    })
  }

  useEffect(() => {
    const imgString = imgFileList
      .map((item) => {
        if (item.status === 'success') {
          return item.content
        }
      })
      .toString()

    refundInsChange({
      remarks: remarks.trim(),
      credentialImageUrl: imgString,
    })
  }, [remarks, imgFileList])
  const setDemo2 = (v) => {
    console.log('v :>> ', v)
  }
  const detailDemo = (v, info) => {
    const newFilelist = [...imgFileList]
    newFilelist.splice(info.index, 1)

    setImgFileList(newFilelist)
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
              value={remarks}
              type="textarea"
              maxlength={170}
              placeholder="退款说明请详细填写，有助于处理"
              showWordLimit
              onChange={setRemarks}
            />
          </ConfigProvider>
        </div>
        <div className="refuinstruc-files">
          <Uploader
            maxCount={6}
            value={imgFileList}
            onDelete={(v, index) => detailDemo(v, index)}
            onChange={(v) => setDemo2(v)}
          >
            <div className="files-box rv-hairline--surround" onClick={()=>{afterRead(imgFileList.length)}}>
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
