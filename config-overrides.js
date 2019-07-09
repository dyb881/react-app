const Merge = require('webpack-merge');
const { override, fixBabelImports, addLessLoader, addPostcssPlugins, useEslintRc } = require('customize-cra');

// 插件
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = override(
  // 按需加载
  fixBabelImports('antd', { libraryDirectory: 'es', style: true }),
  fixBabelImports('antd-mobile', { libraryDirectory: 'es', style: true }),
  fixBabelImports('lodash', { libraryDirectory: '' }),
  // 添加 less-loader
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {}, // 全局 less 变量，会覆盖项目内同名变量，可用于主题定制
  }),
  // 添加 postcss 插件 - 根据实际情况手动清除注释
  // addPostcssPlugins([
  //   // 添加 postcss-pxtorem
  //   require('postcss-pxtorem')({
  //     rootValue: 100,
  //     propList: ['*'],
  //   }),
  // ]),
  // 允许二次配置 eslint
  useEslintRc(),
  config => {
    // 自定义配置
    config = Merge(config, {});

    if (process.env.NODE_ENV === 'production') {
      // 生产模式下的配置
      config = Merge(config, {
        optimization: {
          minimizer: [
            // 多进程压缩
            new ParallelUglifyPlugin({
              // 缓存压缩后的结果
              cacheDir: '.cache/',
              uglifyJS: {
                output: {
                  // 最紧凑的输出
                  beautify: false,
                  // 删除所有的注释
                  comments: false,
                },
                compress: {
                  // 删除所有的 `console` 语句，可以兼容ie浏览器
                  drop_console: true,
                  // 内嵌定义了但是只用到一次的变量
                  collapse_vars: true,
                  // 提取出出现多次但是没有定义成变量去引用的静态值
                  reduce_vars: true,
                },
              },
            }),
          ],
        },
      });
    } else {
      // 开发模式下的配置
      config = Merge(config, {});
    }

    // 返回更改后的配置
    return config;
  }
);
