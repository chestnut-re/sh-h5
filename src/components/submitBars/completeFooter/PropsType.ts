export type PopoverAction = {
  /** 选项文字	 */
  text: string
  /** 文字左侧的图标，支持传入图标名称或图片链接	 */
  icon?: string
  /** 选项文字颜色	 */
  color?: string
  /** 是否为禁用状态	 */
  disabled?: boolean
  /** 为对应选项添加额外的类名	 */
  className?: string
}

export interface FooterProps {
  //是否显示左侧折叠按钮
  showLeftLinkBtn: boolean
  //折叠按钮打开选项列表内容
  LeftLinkActions?: PopoverAction[]
  //左边第一个按钮文案
  barLeftTitle?: string
  //右侧按钮文案
  barRightTitle?: string
  //是否显示最右侧按钮
  showRightLinkBtn?: boolean
  //右侧按钮文案
  RightLinkTitle?: string
  //点击选项时触发
  onSelect: (type?: string, item?: PopoverAction) => void
}
