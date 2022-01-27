import { Personal } from '@/service/Personal'
/**
 * 验证姓名合法性
 * @param cardNo
 * @returns
 */
export const rulesName = (name: string) => {
  const reg = /^[\u4E00-\u9FA5]{2,20}$/
  if (reg.test(name)) {
    return true
  }
}

/**
 * 验证身份证号码合法
 */
export const rulesCardNo = (cardNo: string) => {
  const reg =
    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
  if (reg.test(cardNo)) {
    return true
  }
}

/**
 * 验证身份证和姓名是否匹配
 */

export const realNameAuth = async (cardNo, name) => {
  if (!rulesCardNo(cardNo)) return { isok: false }
  const params = {
    idCardNo: cardNo,
    name: name,
  }
  const { data } = await Personal.realNameAuth(params)
  if (data.error_code == 0) {
    return data.result
  } else {
    return { isok: false }
  }
}
