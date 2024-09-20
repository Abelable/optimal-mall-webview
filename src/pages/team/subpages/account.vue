<template>
  <div class="container">
    <div class="amount-card">
      <div class="amount-total">
        <div class="amount-title-wrap row between">
          <div class="amount-title">
            {{ level > 1 ? "可提现金额" : "分享奖励" }}
          </div>
          <div class="withdraw-record-btn" @click="checkWithdrawRecord">
            提现明细
          </div>
        </div>
        <div class="amount-wrap row">
          <div class="amount">
            <span style="font-size: 0.32rem">¥</span>
            <span>{{
              cashInfo
                ? (+cashInfo?.share + +cashInfo?.team).toFixed(2)
                : "0.00"
            }}</span>
          </div>
          <div class="type-withdraw-btn" @click="withdraw">提现</div>
        </div>
      </div>
      <div class="amount-type-wrap row" v-if="level > 1">
        <div class="amount-type-item">
          <div class="amount-type-name">分享奖励</div>
          <div class="type-amount">
            <span style="font-size: 0.28rem">¥</span>
            <span>{{ cashInfo ? cashInfo.share : "0.00" }}</span>
          </div>
        </div>
        <div class="amount-type-item">
          <div class="amount-type-name">团队奖励</div>
          <div class="type-amount">
            <span style="font-size: 0.28rem">¥</span>
            <span>{{ cashInfo ? cashInfo.team : "0.00" }}</span>
          </div>
        </div>
      </div>
      <div class="withdraw-tips-wrap row">
        <div class="withdraw-time-tips">每月25～31号可提现上月的结算收益</div>
        <div class="withdraw-rules-btn">
          <div>提现规则</div>
          <img class="more-arrow" src="../images/more.png" />
        </div>
      </div>
    </div>
    <div class="menu-tabs">
      <div
        class="menu-tab"
        :class="{ active: curMenuIdx === index }"
        v-for="(item, index) in level > 1
          ? ['分享奖励', '团队奖励']
          : ['分享奖励']"
        :key="index"
        @click="selectMenu(index)"
      >
        <div>{{ item }}</div>
        <img
          class="active-tag"
          v-if="curMenuIdx === index"
          src="../images/selected_icon.png"
        />
      </div>
    </div>
    <div class="daily-data-wrap">
      <div class="date-menu">
        <div
          class="date"
          :class="{ selected: curDateIdx === index }"
          v-for="(item, index) in ['今日', '昨日', '本月', '上月', '全部']"
          :key="index"
          @click="selectDate(index)"
        >
          {{ item }}
        </div>
      </div>
      <div class="daily-data-list">
        <div class="daily-data-item">
          <div class="daily-data">{{ timeData ? timeData.orderCount : 0 }}</div>
          <div class="daily-data-desc">订单量</div>
        </div>
        <div class="daily-data-item">
          <div class="daily-data">
            {{ timeData ? (+timeData.salesVolume).toFixed(2) : "0.00" }}
          </div>
          <div class="daily-data-desc">销售额</div>
        </div>
        <div class="daily-data-item">
          <div class="daily-data">
            {{ timeData ? timeData.pendingAmount : "0.00" }}
          </div>
          <div class="daily-data-desc">待结算金额</div>
        </div>
        <div class="daily-data-item">
          <div class="daily-data">
            {{ timeData ? timeData.settledAmount : "0.00" }}
          </div>
          <div class="daily-data-desc">已结算金额</div>
        </div>
      </div>
    </div>
    <div class="sales-record-list" v-if="orderList.length">
      <div
        class="sales-record-item"
        v-for="(item, index) in orderList"
        :key="index"
      >
        <div class="order-info">
          <div class="order-sn-wrap">
            <div class="order-sn" @click="checkOrderDetail(item.orderSn)">
              <div>订单编号：{{ item.orderSn }}</div>
              <img class="order-sn-arrow" src="../images/arrow.png" />
            </div>
            <div class="order-status-wrap">
              <div class="order-status">
                {{ ["待结算", "待提现", "已结算"][item.status - 1] }}
              </div>
              <div class="order-time">
                下单时间：{{ dayjs(item.createdAt).format("YYYY.MM.DD") }}
              </div>
            </div>
          </div>
          <div class="order-commission-wrap">
            <div class="order-commission">+{{ item.commission }}</div>
            <div class="order-type">
              {{ item.scene === 1 ? "团队" : "分享" }}
            </div>
          </div>
        </div>
        <div class="goods-list">
          <div
            class="goods-info-wrap"
            v-for="(goods, goodsIdx) in item.goodsList"
            :key="goodsIdx"
          >
            <img class="goods-cover" :src="goods.cover" />
            <div class="goods-info">
              <div class="goods-name omit">{{ goods.name }}</div>
              <div class="goods-spec">{{ goods.selectedSkuName }}</div>
              <div class="goods-commission">返现¥{{ goods.commission }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Empty v-if="!orderList.length" description="暂无订单记录" />
  </div>
</template>

<script setup lang="ts">
import { Empty } from "vant";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import {
  getCommissionCashInfo,
  getGiftCommissionTimeData,
  getTeamCommissionTimeData,
} from "../utils/api";

import type {
  CommissionCashInfo,
  Order,
  CommissionTimeData,
} from "../utils/type";

const route = useRoute();

const level = ref(1);
const cashInfo = ref<CommissionCashInfo>();
const curMenuIdx = ref(0);
const curDateIdx = ref(0);
const timeData = ref<CommissionTimeData>();

const orderList = ref<Order[]>([]);

onMounted(() => {
  level.value = +(route.query?.level as string);
  setCommissionCashInfo();
  setTimeData();
});

const setCommissionCashInfo = async () => {
  cashInfo.value = await getCommissionCashInfo();
};

const withdraw = () => {
  console.log("withdraw");
};
const checkWithdrawRecord = () => {
  console.log("checkWithdrawRecord");
};
const selectMenu = (index: number) => {
  curMenuIdx.value = index;
  setTimeData();
};
const selectDate = (index: number) => {
  curDateIdx.value = index;
  setTimeData();
};
const setTimeData = async () => {
  if (curMenuIdx.value === 0) {
    timeData.value = await getGiftCommissionTimeData(curDateIdx.value + 1);
  } else {
    timeData.value = await getTeamCommissionTimeData(curDateIdx.value + 1);
  }
};
const checkOrderDetail = (orderSn: string) => {
  console.log("orderSn", orderSn);
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  &.between {
    justify-content: space-between;
  }
}
.container {
  padding: 0.24rem;
  .amount-card {
    background: linear-gradient(90deg, #fff8f7 0%, #ffebe6 100%);
    border-radius: 0.2rem;
    overflow: hidden;
    .amount-total {
      position: relative;
      padding: 0.32rem;
      height: 1.8rem;
      background-image: url("https://static.youbozhenxuan.cn/mp/account_amount_bg.png");
      background-position: -0.2rem -0.2rem;
      background-size: calc(100% + 0.4rem) calc(100% + 0.4rem);
      background-repeat: no-repeat;
    }
    .amount-title {
      color: #14191f;
      font-size: 0.28rem;
    }
    .withdraw-record-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.3rem;
      height: 0.48rem;
      color: #ff4747;
      font-size: 0.24rem;
      background: #fdf8f7;
      border-radius: 0.24rem;
    }
    .amount-wrap {
      margin-top: 0.12rem;
      .amount {
        color: #14191f;
        font-size: 0.44rem;
        font-weight: bold;
      }
    }
    .amount-type-wrap {
      padding: 0.32rem 0.4rem;
      background: #fff;
      border-radius: 0 0 0.2rem 0.2rem;
    }
    .amount-type-item:first-child {
      margin-right: 1.52rem;
    }
    .amount-type-name {
      color: #3c3f42;
      font-size: 0.24rem;
    }
    .type-amount {
      margin-top: 0.2rem;
      color: #14191f;
      font-size: 0.4rem;
      font-weight: bold;
    }
    .type-withdraw-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.24rem;
      width: 1.16rem;
      height: 0.48rem;
      color: #fff;
      font-size: 0.24rem;
      background: linear-gradient(
        135deg,
        #ffa266 0%,
        #ff3d39 64%,
        #ff3636 100%
      );
      border-radius: 0.24rem;
    }
    .withdraw-tips-wrap {
      padding: 0.24rem 0.2rem;
    }
    .withdraw-time-tips {
      flex: 1;
      color: #6a6f75;
      font-size: 0.24rem;
    }
    .withdraw-rules-btn {
      display: flex;
      align-items: center;
      color: #f5701d;
      font-size: 0.24rem;
      .more-arrow {
        width: 0.32rem;
        height: 0.32rem;
      }
    }
  }
  .menu-tabs {
    display: flex;
    .menu-tab {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 1.4rem;
      color: #6a6f75;
      font-size: 0.28rem;
      &.active {
        position: relative;
        color: #14191f;
        font-size: 0.32rem;
        font-weight: 550;
      }
      .active-tag {
        position: absolute;
        left: 50%;
        bottom: 0.28rem;
        transform: translateX(-50%);
        width: 0.4rem;
        height: 0.16rem;
      }
    }
  }
  .daily-data-wrap {
    padding: 0.28rem;
    padding-bottom: 0.32rem;
    background: #fff;
    border-radius: 0.16rem;
    .date-menu {
      display: flex;
      justify-content: space-between;
    }
    .date {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.16rem;
      height: 0.56rem;
      color: #6a6f75;
      font-size: 0.28rem;
      border-radius: 0.28rem;
      border: 1px solid transparent;
    }
    .date.selected {
      color: #f5701d;
      background: #fff3ec;
      border: 1px solid #f5701d;
    }

    .daily-data-list {
      display: flex;
      margin-top: 0.46rem;
    }
    .daily-data-item {
      flex: 3;
      text-align: center;
    }
    .daily-data-item:first-child {
      flex: 2;
    }
    .daily-data {
      color: #000;
      font-size: 0.32rem;
      font-weight: 550;
    }
    .daily-data-desc {
      margin-top: 0.16rem;
      color: #6a6f75;
      font-size: 0.24rem;
    }
  }
  .sales-record-list {
    margin-top: 0.24rem;
    .sales-record-item {
      margin-bottom: 0.24rem;
      padding: 0.24rem;
      background: #fff;
      border-radius: 0.16rem;
    }
    .order-info {
      display: flex;
      align-items: center;
      padding: 0.24rem;
      background: #f8f8f8;
      border-radius: 0.16rem;
    }
    .order-sn-wrap {
      flex: 1;
      color: #6a6f75;
      font-size: 0.24rem;
    }
    .order-sn {
      display: flex;
      align-items: center;
    }
    .order-sn-arrow {
      width: 0.24rem;
      height: 0.24rem;
    }
    .order-status-wrap {
      display: flex;
      margin-top: 0.12rem;
    }
    .order-time {
      margin-left: 0.48rem;
    }
    .order-commission-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .order-commission {
      color: #14191f;
      font-size: 0.32rem;
      font-weight: 550;
    }
    .order-type {
      margin-top: 0.08rem;
      padding: 0.06rem 0.1rem;
      width: fit-content;
      color: #a1a9b3;
      font-size: 0.2rem;
      line-height: 1;
      border: 1px solid #a1a9b3;
      border-radius: 0.08rem;
    }
    .goods-info-wrap {
      display: flex;
      align-items: center;
      margin-top: 0.24rem;
    }
    .goods-cover {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 0.16rem;
    }
    .goods-info {
      display: flex;
      flex-direction: column;
      margin-left: 0.16rem;
      flex: 1;
      height: 1.5rem;
    }
    .goods-name {
      color: #14191f;
      font-size: 0.26rem;
      font-weight: 550;
    }
    .goods-spec {
      margin: 0.04rem;
      flex: 1;
      color: #6a6f75;
      font-size: 0.22rem;
    }
    .goods-commission {
      color: #f5701d;
      font-size: 0.24rem;
    }
  }
}
</style>
