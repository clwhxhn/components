import { SchintaMapHelp } from "schinta-map";
export const FlyToMixin = {
  mixins: [SchintaMapHelp()],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    customRow(record) {
      return {
        on: {
          click: () => {
            this.rowClick(record);
          },
        },
      };
    },
    rowClick(record) {
      const extent = this.getExtent(this.layerName, record[this.idKey]);
      if (extent) {
        this.flyTo$(extent, {
          duration: 300,
          minZoom: 12,
          maxZoom: 12,
          padding: [350, 700, 250, 650],
        }).then(() => {
          const timer = setTimeout(() => {
            this.setOverlay$(this.layerName, record[this.idKey]);
            clearTimeout(timer);
          }, 100);
        });
      }
    },
    getExtent(layerName, id) {
      const layerController = this.getLayerController$();
      if (!layerController) return;
      const layer = layerController.getLayer(layerName);
      const source = layer.getSource();
      if (!layer) return;

      if (!source) {
        return null;
      }

      // 检查是否为聚合图层
      if (source.getFeatures && typeof source.getFeatures === "function") {
        const features = source.getFeatures();
        for (const feature of features) {
          // 如果是聚合要素，检查其子要素
          if (feature.get("features")) {
            const clusteredFeatures = feature.get("features");
            for (const clusteredFeature of clusteredFeatures) {
              if (clusteredFeature.getId() === id) {
                return clusteredFeature.getGeometry().getExtent();
              }
            }
          } else if (feature.getId() === id) {
            // 非聚合要素直接返回
            return feature.getGeometry().getExtent();
          }
        }
      }

      // 如果未找到匹配的要素
      return null;
    },
  },
};
