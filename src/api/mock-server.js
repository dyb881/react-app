const mockServer = require('@dyb881/mock-server').default;
const ip = require('ip');

console.log('模拟数据环境：', `http://localhost:3000/?host=http://${ip.address()}`);

const tableInfo = {
  id: '@id',
  Batch: '@id',
  Description: '@ctitle(50)',
};

// 数据统一返回处理
mockServer(data => ({
  code: 0,
  msg: '模拟数据',
  data,
}))
  .get('/api/getTableList', req => {
    const { pageSize = 10, pageNum = 1 } = req.query;
    return {
      [`list|${pageSize}`]: [tableInfo],
      total: 100,
      pageNum,
    };
  })
  .get('/api/getTableInfo', tableInfo)
  .delay(300, 1000) // 延迟时间
  .init(); // 启动服务
