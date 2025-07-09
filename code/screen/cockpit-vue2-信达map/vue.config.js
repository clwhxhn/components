const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  publicPath: "./",
  productionSourceMap: false,
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        url: false,
        querystring: false,
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("@api", resolve("src/api"))
      .set("@assets", resolve("src/assets"))
      .set("@comp", resolve("src/components"))
      .set("@views", resolve("src/views"));

    if (process.env.NODE_ENV === "production") {
      config.plugin("compressionPlugin").use(
        new CompressionPlugin({
          test: /\.(js|css|less)$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
        })
      );
      config.optimization.splitChunks({
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.(s?css|less|sass)$/,
            chunks: "all",
            priority: 10,
          },
          antd: {
            name: "ant-design-vue",
            test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
            minSize: 0,
            minChunks: 1,
            reuseExistingChunk: true,
            chunks: "all",
          },
          echarts: {
            name: "echarts",
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            minSize: 0,
            minChunks: 1,
            reuseExistingChunk: true,
            chunks: "all",
          },
        },
      });
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    client: {
      overlay: false,
    },
    proxy: {
      "/proxy": {
        target: "https://hzz.nw.mtcsq.com/wrc/gt/", // 测试环境
        // target: "http://10.55.52.208:7000/wrc/gt/",
        logLevel: "debug",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/proxy": "",
        },
      },
      "/wpoled": {
        target: "http://10.55.52.208:7000/wpoled",
        logLevel: "debug",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/wpoled": "",
        },
      },
    },
  },
});
