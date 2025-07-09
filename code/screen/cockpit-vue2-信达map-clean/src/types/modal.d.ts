
/**
 * 弹窗参数
 */
export interface ModalOptions {
  /**
   * 弹窗标题
   */
  title: string;
  /**
   * 弹窗内容宽度，默认800px
   */
  width: string | number;
  /**
   * 弹窗位置，目前仅支持center
   */
  position: 'center';
  /**
   * 弹窗内容组件
   */
  component: any;
  /**
   * 弹窗内容组件的参数 通过v-bind="params"绑定
   */
  params: any;
}