const mockServer = require('@dyb881/mock-server').default;
const ip = require('ip');

console.log('模拟数据环境：', `http://localhost:3000/?host=http://${ip.address()}`);

// 数据统一返回处理
mockServer(data => ({
  code: 0,
  msg: '模拟数据',
  data,
}))
  .get('/api/login', {})
  .delay(300, 1000) // 延迟时间
  .init(); // 启动服务
