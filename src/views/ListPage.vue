<template>
  <div class="list-page">
    <header class="page-header">
      <h1>股票龙虎榜</h1>
      <p class="date">{{ currentDate }}</p>
    </header>
    
    <div class="list-container">
      <div 
        v-for="stock in stockList" 
        :key="stock.id"
        class="stock-item"
        @click="goToDetail(stock.id)"
      >
        <div class="stock-header">
          <div class="stock-info">
            <span class="stock-name">{{ stock.name }}</span>
            <span class="stock-code">{{ stock.code }}</span>
          </div>
          <div class="stock-price" :class="stock.changePercent >= 0 ? 'up' : 'down'">
            <span class="price">¥{{ stock.price.toFixed(2) }}</span>
            <span class="change">{{ stock.changePercent >= 0 ? '+' : '' }}{{ stock.changePercent.toFixed(2) }}%</span>
          </div>
        </div>
        
        <div class="stock-details">
          <div class="detail-item">
            <span class="label">上榜原因：</span>
            <span class="value">{{ stock.reason }}</span>
          </div>
          <div class="detail-item">
            <span class="label">成交额：</span>
            <span class="value">{{ formatAmount(stock.turnover) }}</span>
          </div>
          <div class="detail-item">
            <span class="label">净买入：</span>
            <span class="value" :class="stock.netAmount >= 0 ? 'up' : 'down'">
              {{ stock.netAmount >= 0 ? '+' : '' }}{{ formatAmount(stock.netAmount) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { stockList } from '../data/mockData.js'

const router = useRouter()
const currentDate = ref('')

onMounted(() => {
  const date = new Date()
  currentDate.value = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
})

const goToDetail = (id) => {
  router.push(`/detail/${id}`)
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
.list-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  background: #667eea;
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.page-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.page-header .date {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.list-container {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.stock-item {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  position: relative;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
}

.stock-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stock-name {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.stock-code {
  font-size: 0.85rem;
  color: #999;
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}

.stock-price {
  text-align: right;
}

.stock-price .price {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
}

.stock-price .change {
  display: block;
  font-size: 0.9rem;
}

.stock-price.up .price,
.stock-price.up .change {
  color: #f56c6c;
}

.stock-price.down .price,
.stock-price.down .change {
  color: #67c23a;
}

.stock-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
}

.detail-item .label {
  color: #666;
}

.detail-item .value {
  color: #333;
  font-weight: 500;
}

.detail-item .value.up {
  color: #f56c6c;
}

.detail-item .value.down {
  color: #67c23a;
}

.arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 1.2rem;
}

@media (max-width: 600px) {
  .stock-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .stock-price {
    text-align: left;
  }
}
</style>

