export type LegendItem = (
  {
    /**
     * 图例项标签名
     */
    label: string
    /**
     * 色块背景色
     */
    color: string;

    /**
     * 色块边框色（不传时没有边框）
     */
    borderColor?: string;
  } | {
    /**
     * 图例项标签名
     */
    label: string
    /**
     * 图标
     */
    icon: string;
  }
)