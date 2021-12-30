/**
 * jump 参数
 */
export interface JumpParams {
  /**url */
  url: string
  /**标题 */
  title?: string
  /**是否新开页面 */
  newWebView?: boolean
  /**是否替换当前页面 */
  replace?: boolean
  needLogin?: boolean
}

export enum UiType {
  default,
}

export enum ActionType {
  text = 'text',
  img = 'img',
}
