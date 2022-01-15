import React, { useEffect, useState } from 'react'
import { Toast,List } from 'react-vant'
import { MyTokenService } from '@/service/MyTokenService'
import './index.less'
/**
 * 收支明细
 */
let currentIndex=1;
const PAGE_SIZE = 10;

const listMap = {
    1:"#FD7D81",
    2:"#4DCFC5",
    3:"#FD7D81"
}

const DetailedPage: React.FC = () => {
  //列表数据
  const [details, setDetails] = useState<any[]>([])
  //加载状态
  const [finished,setFinished] = useState(false)

  const onLoadList = async () => {
    const {code,msg,data} = await MyTokenService.getWalletPage({
      size:PAGE_SIZE,
      current:currentIndex
    });

    if (code==="200"&&data) {
      const records = data['records'];
      currentIndex++;
      setDetails((v) => {
        const newList = [...v, ...records];
        if (PAGE_SIZE>records.length) {
          setFinished(true);
        }
        return newList;
      });
    } else {
      Toast(msg)
    }
  };

  return (
    <div className="DetailedPage__root">
      <div className="list">
          <List finished={finished} finishedText="没有了" errorText="请求失败，点击重试" onLoad={onLoadList}>
          {details.map((item, index) => {
            return (
              <div className="item" key={index}>
                <div className="counter">
                  <div className="text">{item.typeName}</div>
                  <div className="money">
                    {item.amount}
                  </div>
                </div>
                <div className='goods-name'>{item.title}</div>
                <div className="under">
                  
                  <div className="time">{item.billDate}</div>
                  {item.stsName ? (
                    <div className="title" style={{ color: listMap[item.sts] }}>
                      {item.stsName}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
          </List>

        </div>
    </div>
  )
}

export default DetailedPage
