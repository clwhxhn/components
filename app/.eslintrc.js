/*
 * @Author: wangxiaohui clwhxhn@163.com
 * @Date: 2023-04-14 10:59:05
 * @LastEditors: wangxiaohui clwhxhn@163.com
 * @LastEditTime: 2023-04-14 11:00:13
 * @FilePath: \components\app\.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  extends: [
    'eslint-config-prettier',
    'plugin:vue/recommended',
    'plugin:prettier-vue/recommended',
    'prettier/vue'
  ],
  plugins: ['eslint-plugin-prettier'],
  rules: {
    'prettier/prettier': 'warn',
    'vue/multi-word-component-names': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
