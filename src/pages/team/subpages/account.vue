<template>
  <div class="container">
    <div class="amount-card">
      <div class="amount-total">
        <div class="amount-title-wrap row between">
          <div class="amount-title">可提现金额</div>
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
          <div
            class="type-withdraw-btn"
            :class="btnActive ? 'active' : ''"
            @click="withdraw"
          >
            提现
          </div>
        </div>
      </div>
      <div class="points-exchange row">
        <div class="points-info">
          <div class="points-title row">
            <img
              class="point-icon"
              src="https://static.chengxinxingqiu.cn/mp/points/icon.png"
            />
            <div>
              兑换为{{
                cashInfo
                  ? ((+cashInfo?.share + +cashInfo?.team) * 100).toFixed(0)
                  : 0
              }}积分
            </div>
          </div>
          <div class="points-desc">可用于下单抵扣，积分商城福利换购</div>
        </div>
        <div
          class="exchange-btn"
          :class="btnActive ? 'active' : ''"
          @click="showPointPopup"
        >
          兑换
        </div>
      </div>
      <div class="amount-type-wrap row">
        <div class="amount-type-item">
          <div class="amount-type-name">分享奖励</div>
          <div class="type-amount">
            <span style="font-size: 0.28rem">¥</span>
            <span>{{ cashInfo ? cashInfo.share : "0.00" }}</span>
          </div>
        </div>
        <div class="amount-type-item" v-if="level > 1">
          <div class="amount-type-name">团队奖励</div>
          <div class="type-amount">
            <span style="font-size: 0.28rem">¥</span>
            <span>{{ cashInfo ? (+cashInfo.team).toFixed(2) : "0.00" }}</span>
          </div>
        </div>
      </div>
      <div class="withdraw-tips-wrap row">
        <div class="withdraw-time-tips">每月25～31号可提现上月的结算收益</div>
        <div class="withdraw-rules-btn" @click="checkWithdrawRule">
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
          v-for="(item, index) in dateList"
          :key="index"
          @click="selectDate(index)"
        >
          {{ item.text }}
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
            {{ timeData ? (+timeData.pendingAmount).toFixed(2) : "0.00" }}
          </div>
          <div class="daily-data-desc">待结算金额</div>
        </div>
        <div class="daily-data-item">
          <div class="daily-data">
            {{ timeData ? (+timeData.settledAmount).toFixed(2) : "0.00" }}
          </div>
          <div class="daily-data-desc">已结算金额</div>
        </div>
      </div>
    </div>

    <PullRefresh v-model="refreshing" @refresh="onRefresh">
      <List
        class="sales-record-list"
        v-model="loading"
        :finished="finished"
        @load="onLoadMore"
        :finished-text="orderList.length ? '没有更多了' : ''"
      >
        <div
          class="sales-record-item"
          v-for="(item, index) in orderList"
          :key="index"
        >
          <div class="order-info">
            <div class="order-sn-wrap">
              <div class="order-sn">订单编号：{{ item.orderSn }}</div>
              <div class="order-status-wrap">
                <div class="order-status">
                  {{ item.status === 1 ? "待结算" : "已结算" }}
                </div>
                <div class="order-time">
                  下单时间：{{ dayjs(item.createdAt).format("YYYY.MM.DD") }}
                </div>
              </div>
            </div>
            <div class="order-commission-wrap">
              <div class="order-commission">
                +{{
                  curMenuIdx === 0 ? item.commission : item.commissionAmount
                }}
              </div>
              <div class="order-type">
                {{ curMenuIdx === 0 ? "分享" : "团队" }}
              </div>
            </div>
          </div>
          <div class="goods-list" v-if="curMenuIdx === 0">
            <div class="goods-info-wrap">
              <img class="goods-cover" :src="item.goods?.cover" />
              <div class="goods-info">
                <div class="goods-name omit">{{ item.goods?.name }}</div>
                <div class="goods-spec">{{ item.goods?.selectedSkuName }}</div>
                <div class="goods-commission">返现¥{{ item?.commission }}</div>
              </div>
            </div>
          </div>
          <div class="goods-list" v-if="curMenuIdx === 1">
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
      </List>
      <Empty v-if="!orderList.length" description="暂无订单记录" />
    </PullRefresh>
  </div>

  <PointPopup
    :visible="pointPopupVisible"
    :amount="cashInfo ? +cashInfo?.share + +cashInfo?.team : 0"
    @success="exchangeSuccess"
    @cancel="pointPopupVisible = false"
  />
</template>

<script setup lang="ts">
import { PullRefresh, List, Empty, closeToast, showLoadingToast } from "vant";
import PointPopup from "../components/PointPopup.vue";

import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import {
  getCommissionCashInfo,
  getGiftCommissionTimeData,
  getGiftOrderList,
  getTeamCommissionTimeData,
  getTeamOrderList,
} from "../utils/api";

import type {
  CommissionCashInfo,
  Order,
  CommissionTimeData,
} from "../utils/type";

const route = useRoute();
const router = useRouter();

const level = ref(1);
const cashInfo = ref<CommissionCashInfo>();
const curMenuIdx = ref(0);
const dateList = [
  { text: "今日", value: 1 },
  { text: "昨日", value: 2 },
  { text: "本月", value: 3 },
  { text: "上月", value: 4 },
  { text: "全部", value: 0 },
];
const curDateIdx = ref(0);
const timeData = ref<CommissionTimeData>();

const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const orderList = ref<Order[]>([]);
const btnActive = ref(false);
const pointPopupVisible = ref(false);

onMounted(() => {
  level.value = +(route.query?.level as string);
  setCommissionCashInfo();
  setTimeData();

  const date = new Date().getDate();
  if (date >= 25) {
    btnActive.value = true;
  }
});

const init = () => {
  setCommissionCashInfo();
  setTimeData();
  setOrderList(true);
};
const onRefresh = () => setOrderList(true);
const onLoadMore = () => setOrderList();

const setCommissionCashInfo = async () => {
  cashInfo.value = await getCommissionCashInfo();
};

const showPointPopup = () => {
  if (!btnActive.value) {
    return;
  }
  pointPopupVisible.value = true;
};
const exchangeSuccess = () => {
  init();
  pointPopupVisible.value = false;
};

const withdraw = () => {
  if (!btnActive.value) {
    return;
  }
  const { share, team } = cashInfo.value || {};
  window.wx.miniProgram.navigateTo({
    url: `/pages/mine/subpages/account/subpages/withdraw/index?scene=3&amount=${
      Number(share) + Number(team)
    }`,
  });
};
const checkWithdrawRecord = () => {
  window.wx.miniProgram.navigateTo({
    url: "/pages/mine/subpages/account/subpages/withdraw-record/index",
  });
};
const checkWithdrawRule = () => {
  router.push("/agreements/withdraw_rules");
};

const selectMenu = (index: number) => {
  curMenuIdx.value = index;
  setTimeData();
  setOrderList(true);
};
const selectDate = (index: number) => {
  curDateIdx.value = index;
  setTimeData();
  setOrderList(true);
};

const setTimeData = async () => {
  if (curMenuIdx.value === 0) {
    timeData.value = await getGiftCommissionTimeData(
      dateList[curDateIdx.value].value
    );
  } else {
    timeData.value = await getTeamCommissionTimeData(
      dateList[curDateIdx.value].value
    );
  }
};

const setOrderList = (init = false) => {
  if (init) {
    orderList.value = [];
  }
  if (curMenuIdx.value === 0) {
    setGiftOrderList(init);
  } else {
    setTeamOrderList(init);
  }
};
let gitPage = 0;
const setGiftOrderList = async (init = false) => {
  showLoadingToast({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  if (init) {
    gitPage = 0;
    finished.value = false;
  }
  const list = await getGiftOrderList(
    dateList[curDateIdx.value].value,
    ++gitPage
  );
  orderList.value = init ? list : [...orderList.value, ...list];
  if (!list.length) finished.value = true;
  loading.value = false;
  refreshing.value = false;
  closeToast();
};

let teamPage = 0;
const setTeamOrderList = async (init = false) => {
  showLoadingToast({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  if (init) {
    teamPage = 0;
    finished.value = false;
  }
  const list = await getTeamOrderList(
    dateList[curDateIdx.value].value,
    [1, 2, 3],
    ++teamPage
  );
  orderList.value = init ? list : [...orderList.value, ...list];
  if (!list.length) finished.value = true;
  loading.value = false;
  refreshing.value = false;
  closeToast();
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
.omit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
      background-image: url("https://static.chengxinxingqiu.cn/mp/account_amount_bg.png");
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
    .points-exchange {
      padding: 0.32rem;
      .points-info {
        flex: 1;
        .points-title {
          color: #333;
          font-size: 0.3rem;
          font-weight: bold;
          .point-icon {
            margin-right: 0.06rem;
            width: 0.36rem;
            height: 0.36rem;
          }
        }
        .points-desc {
          margin-top: 0.08rem;
          color: #666;
          font-size: 0.24rem;
          font-weight: 300;
        }
      }
      .exchange-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.16rem;
        height: 0.48rem;
        color: #999;
        font-size: 0.24rem;
        background: #e9e9e9;
        border-radius: 0.24rem;
        &.active {
          color: #fff;
          background: linear-gradient(
            135deg,
            #ffa266 0%,
            #ff3d39 64%,
            #ff3636 100%
          );
        }
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
      color: #999;
      font-size: 0.24rem;
      background: #e9e9e9;
      border-radius: 0.24rem;
      &.active {
        color: #fff;
        background: linear-gradient(
          135deg,
          #ffa266 0%,
          #ff3d39 64%,
          #ff3636 100%
        );
      }
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
      font-weight: bold;
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
