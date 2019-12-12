module.exports = {
  lintOnSave: false,
  publicPath:'/server/',  //根据www.xxx.com/后面的路径写入（比如www.xxx.com/tool）
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
    },  // 配置多个代理
  }
};
