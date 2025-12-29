// 模拟股票龙虎榜数据
export const stockList = [
  {
    id: 1,
    code: '000001',
    name: '平安银行',
    price: 12.58,
    changePercent: 9.98,
    turnover: 1258000000,
    reason: '日涨幅偏离值达7%',
    date: '2024-01-15',
    buyAmount: 850000000,
    sellAmount: 408000000,
    netAmount: 442000000
  },
  {
    id: 2,
    code: '000002',
    name: '万科A',
    price: 8.95,
    changePercent: 7.32,
    turnover: 980000000,
    reason: '日涨幅偏离值达7%',
    date: '2024-01-15',
    buyAmount: 720000000,
    sellAmount: 260000000,
    netAmount: 460000000
  },
  {
    id: 3,
    code: '600519',
    name: '贵州茅台',
    price: 1688.00,
    changePercent: -5.23,
    turnover: 3200000000,
    reason: '日跌幅偏离值达7%',
    date: '2024-01-15',
    buyAmount: 1500000000,
    sellAmount: 1700000000,
    netAmount: -200000000
  },
  {
    id: 4,
    code: '000858',
    name: '五粮液',
    price: 128.50,
    changePercent: 6.45,
    turnover: 1560000000,
    reason: '日涨幅偏离值达7%',
    date: '2024-01-15',
    buyAmount: 980000000,
    sellAmount: 580000000,
    netAmount: 400000000
  },
  {
    id: 5,
    code: '002415',
    name: '海康威视',
    price: 35.68,
    changePercent: 8.92,
    turnover: 2100000000,
    reason: '日涨幅偏离值达7%',
    date: '2024-01-15',
    buyAmount: 1350000000,
    sellAmount: 750000000,
    netAmount: 600000000
  },
  {
    id: 6,
    code: '300750',
    name: '宁德时代',
    price: 185.30,
    changePercent: -4.56,
    turnover: 4500000000,
    reason: '日跌幅偏离值达7%',
    date: '2024-01-15',
    buyAmount: 2200000000,
    sellAmount: 2300000000,
    netAmount: -100000000
  },
  {
    id: 7,
    code: '600036',
    name: '招商银行',
    price: 42.88,
    changePercent: 5.67,
    turnover: 1800000000,
    reason: '日涨幅偏离值达7%',
    date: '2024-01-15',
    buyAmount: 1100000000,
    sellAmount: 700000000,
    netAmount: 400000000
  },
  {
    id: 8,
    code: '000063',
    name: '中兴通讯',
    price: 28.95,
    changePercent: 7.85,
    turnover: 1400000000,
    reason: '日涨幅偏离值达7%',
    date: '2024-01-15',
    buyAmount: 920000000,
    sellAmount: 480000000,
    netAmount: 440000000
  }
]

// 获取股票详情
export const getStockDetail = (id) => {
  return stockList.find(stock => stock.id === Number(id))
}

// 获取买卖席位数据（模拟）
export const getSeatData = (id) => {
  const buySeats = [
    { name: '机构专用', amount: 150000000, percent: 35.2 },
    { name: '中信证券深圳分公司', amount: 98000000, percent: 23.0 },
    { name: '华泰证券上海分公司', amount: 85000000, percent: 20.0 },
    { name: '国泰君安上海分公司', amount: 62000000, percent: 14.5 },
    { name: '招商证券深圳深南大道', amount: 40000000, percent: 9.4 }
  ]
  
  const sellSeats = [
    { name: '机构专用', amount: 120000000, percent: 29.4 },
    { name: '中信证券北京总部', amount: 95000000, percent: 23.3 },
    { name: '海通证券上海分公司', amount: 78000000, percent: 19.1 },
    { name: '广发证券广州分公司', amount: 65000000, percent: 15.9 },
    { name: '申万宏源上海分公司', amount: 50000000, percent: 12.3 }
  ]
  
  return { buySeats, sellSeats }
}

