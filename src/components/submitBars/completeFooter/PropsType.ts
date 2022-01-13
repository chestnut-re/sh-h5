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
  
  CenterLinkTitle?:string
  //点击选项时触发
  onSelect?: (val) => void;
  leftBtnGroups?:any[];
  btnGroups?: any[];
  onPopoverAction?: (val) => void;
}
