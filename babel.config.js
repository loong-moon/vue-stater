const presets = [
    [
      '@babel/env',
      {
        targets: '> 0.25%, not dead', // 仅包括浏览器市场份额大于0.25%的用户所需的polyfill和代码转换
        useBuiltIns: 'usage',
      },
    ],
]

const plugins = [
    '@babel/plugin-proposal-class-properties'
]
  
module.exports = { 
    presets, 
    plugins 
}