<template>
  <div class="detail-page">
    <header class="page-header">
      <div class="back-btn" @click="goBack">返回</div>
      <h1>股票详情</h1>
    </header>
    
    <div v-if="stock" class="detail-container">
      <!-- 基本信息 -->
      <div class="info-card">
        <div class="stock-title">
          <span class="stock-name">{{ stock.name }}</span>
          <span class="stock-code">{{ stock.code }}</span>
        </div>
        <div class="price-section">
          <div class="current-price" :class="stock.changePercent >= 0 ? 'up' : 'down'">
            <span class="price">¥{{ stock.price.toFixed(2) }}</span>
            <span class="change">{{ stock.changePercent >= 0 ? '+' : '' }}{{ stock.changePercent.toFixed(2) }}%</span>
          </div>
        </div>
      </div>
      
      <!-- 上榜信息 -->
      <div class="info-card">
        <h3 class="card-title">上榜信息</h3>
        <div class="info-list">
          <div class="info-item">
            <span class="label">上榜日期：</span>
            <span class="value">{{ stock.date }}</span>
          </div>
          <div class="info-item">
            <span class="label">上榜原因：</span>
            <span class="value">{{ stock.reason }}</span>
          </div>
          <div class="info-item">
            <span class="label">成交额：</span>
            <span class="value">{{ formatAmount(stock.turnover) }}</span>
          </div>
        </div>
      </div>
      
      <!-- 资金流向 -->
      <div class="info-card">
        <h3 class="card-title">资金流向</h3>
        <div class="money-flow">
          <div class="flow-item">
            <span class="label">买入金额：</span>
            <span class="value up">{{ formatAmount(stock.buyAmount) }}</span>
          </div>
          <div class="flow-item">
            <span class="label">卖出金额：</span>
            <span class="value down">{{ formatAmount(stock.sellAmount) }}</span>
          </div>
          <div class="flow-item highlight">
            <span class="label">净买入：</span>
            <span class="value" :class="stock.netAmount >= 0 ? 'up' : 'down'">
              {{ stock.netAmount >= 0 ? '+' : '' }}{{ formatAmount(stock.netAmount) }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- 买卖席位 -->
      <div class="info-card">
        <h3 class="card-title">买入席位</h3>
        <div class="seat-list">
          <div 
            v-for="(seat, index) in seatData.buySeats" 
            :key="index"
            class="seat-item"
          >
            <div class="seat-rank">{{ index + 1 }}</div>
            <div class="seat-info">
              <div class="seat-name">{{ seat.name }}</div>
              <div class="seat-amount">{{ formatAmount(seat.amount) }}</div>
            </div>
            <div class="seat-percent">{{ seat.percent }}%</div>
          </div>
        </div>
      </div>
      <!-- 卖出席位 -->
      <div class="info-card">
        <h3 class="card-title">卖出席位</h3>
        <div class="seat-list">
          <div 
            v-for="(seat, index) in seatData.sellSeats" 
            :key="index"
            class="seat-item"
          >
            <div class="seat-rank">{{ index + 1 }}</div>
            <div class="seat-info">
              <div class="seat-name">{{ seat.name }}</div>
              <div class="seat-amount">{{ formatAmount(seat.amount) }}</div>
            </div>
            <div class="seat-percent">{{ seat.percent }}%</div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="loading">
      加载中...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getStockDetail, getSeatData } from '../data/mockData.js'

const router = useRouter()
const route = useRoute()
const stock = ref(null)
const seatData = ref({ buySeats: [], sellSeats: [] })

onMounted(() => {
  const id = route.params.id
  stock.value = getStockDetail(id)
  if (stock.value) {
    seatData.value = getSeatData(id)
  }
})

const goBack = () => {
  router.push('/')
}

const formatAmount = (amount) => {
  if (amount >= 100000000) {
    return (amount / 100000000).toFixed(2) + '亿'
  } else if (amount >= 10000) {
    return (amount / 10000).toFixed(2) + '万'
  }
  return amount.toFixed(2)
}
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  background: #667eea;
  color: white;
  padding: 1rem 1.5rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  cursor: pointer;
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.page-header h1 {
  margin: 0;
  font-size: 1.3rem;
}

.detail-container {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.info-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
}

.card-title {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #333;
  border-left: 3px solid #667eea;
  padding-left: 0.5rem;
}

.stock-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stock-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.stock-code {
  font-size: 0.9rem;
  color: #999;
  background: #f0f0f0;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
}

.price-section {
  margin-top: 1rem;
}

.current-price {
  text-align: center;
}

.current-price .price {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.current-price .change {
  display: block;
  font-size: 1.2rem;
}

.current-price.up .price,
.current-price.up .change {
  color: #f56c6c;
}

.current-price.down .price,
.current-price.down .change {
  color: #67c23a;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  color: #666;
}

.info-item .value {
  color: #333;
  font-weight: 500;
}

.money-flow {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.flow-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f9f9f9;
  border-radius: 4px;
}

.flow-item.highlight {
  background: #f0f7ff;
  border: 1px solid #667eea;
}

.flow-item .label {
  color: #666;
}

.flow-item .value {
  font-weight: bold;
  font-size: 1.1rem;
}

.flow-item .value.up {
  color: #f56c6c;
}

.flow-item .value.down {
  color: #67c23a;
}

.seat-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.seat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f9f9f9;
  border-radius: 4px;
}

.seat-rank {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #667eea;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  flex-shrink: 0;
}

.seat-info {
  flex: 1;
}

.seat-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
}

.seat-amount {
  font-size: 0.85rem;
  color: #666;
}

.seat-percent {
  color: #667eea;
  font-weight: bold;
  flex-shrink: 0;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #999;
}

@media (max-width: 600px) {
  .detail-container {
    padding: 0.5rem;
  }
  
  .info-card {
    padding: 1rem;
  }
}
</style>

