<template>
  <div class="performance-data-wrap">
    <div
      class="month-picker"
      v-if="timeOptions.length"
      @click="timePickerPopupVisible = true"
    >
      <span>{{ timeOptions[curTimeIdx].text }}</span>
      <img class="picker-arrow" src="../images/down.png" alt="" />
    </div>
    <div class="month-data">
      <span style="font-size: 0.24rem">¥</span>
      <span>{{
        [
          achievementInfo?.curMonthGMV.toFixed(2),
          achievementInfo?.lastMonthGMV.toFixed(2),
          achievementInfo?.beforeLastMonthGMV.toFixed(2),
        ][curTimeIdx]
      }}</span>
    </div>
    <div class="total-data">
      <span>近三月累计</span>
      <span style="font-weight: bold">{{
        achievementInfo
          ? (
              +achievementInfo?.beforeLastMonthGMV +
              +achievementInfo?.lastMonthGMV +
              +achievementInfo?.curMonthGMV
            ).toFixed(2)
          : "0.00"
      }}</span>
      <span>元</span>
    </div>
  </div>
  <div class="menu">
    <div
      class="menu-item"
      :class="{ active: curMenuIdx === index }"
      v-for="(item, index) in ['个人业绩', '团队业绩']"
      :key="index"
      @click="selectMenu(index)"
    >
      <div class="menu-name">{{ item }}</div>
      <img
        class="selected-icon"
        v-if="curMenuIdx === index"
        src="../images/selected_icon.png"
        alt=""
      />
    </div>
  </div>
  <div class="record-list" v-if="recordList.length">
    <div class="record-item">
      <div class="order-info">
        <div>订单编号</div>
        <div class="order-sn">77667889900998777778</div>
        <img class="check-icon" src="../images/arrow.png" alt="" />
      </div>
      <div class="record-amount">+14.50</div>
    </div>
  </div>
  <Empty v-if="!recordList.length" description="暂无业绩记录" />

  <PickerPopup
    v-if="timeOptions.length"
    :visible="timePickerPopupVisible"
    :options="timeOptions"
    @confirm="setCurTime"
    @cancel="timePickerPopupVisible = false"
  />
</template>

<script setup lang="ts">
import PickerPopup from "@/components/PickerPopup.vue";

import dayjs from "dayjs";
import { Empty } from "vant";
import { onMounted, ref } from "vue";
import { getPromoterAchievement } from "../utils/api";

import type { Option } from "@/utils/type";
import type { Achievement } from "../utils/type";

const achievementInfo = ref<Achievement>();
const curMenuIdx = ref(0);
const recordList = ref([]);
const timePickerPopupVisible = ref(false);
const timeOptions = ref<Option[]>([]);
const curTimeIdx = ref(0);

onMounted(() => {
  const curYear = dayjs().year();
  const curMount = dayjs().month();
  timeOptions.value = [
    {
      text: `${curYear}年${curMount + 1}月`,
      value: 3,
    },

    {
      text: `${curYear}年${curMount}月`,
      value: 4,
    },
    {
      text: `${curYear}年${curMount - 1}月`,
      value: 5,
    },
  ];
  setAchievementInfo();
});

const setAchievementInfo = async () => {
  achievementInfo.value = await getPromoterAchievement();
};

const setCurTime = ({ selectedValues }: { selectedValues: number[] }) => {
  curTimeIdx.value = timeOptions.value.findIndex(
    (item) => item.value === selectedValues[0]
  );
  timePickerPopupVisible.value = false;
};
const selectMenu = (index: number) => {
  curMenuIdx.value = index;
};
</script>

<style lang="scss" scoped>
.performance-data-wrap {
  position: relative;
  margin-top: 0.16rem;
  height: 3.06rem;
  background-image: url("../images//performance_bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
  overflow: hidden;
  .month-picker {
    display: flex;
    align-items: center;
    margin-top: 0.88rem;
    margin-left: 0.68rem;
    color: #6a6f75;
    font-size: 0.24rem;
    .picker-arrow {
      margin-left: 0.06rem;
      width: 0.24rem;
      height: 0.24rem;
    }
  }
  .month-data {
    margin-top: 0.08rem;
    margin-left: 0.64rem;
    color: #110e4b;
    font-size: 0.56rem;
    font-weight: bold;
    font-family: DINAlternate, DINAlternate;
  }
  .total-data {
    position: absolute;
    top: 0.52rem;
    right: 0.6rem;
    padding: 0.02rem 0.12rem;
    color: #110e4b;
    font-size: 0.24rem;
    border: 1px solid #110e4b;
    border-radius: 0.08rem;
  }
}
.menu {
  display: flex;
  margin-top: -0.3rem;
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 1rem;
    color: #6a6f75;
    font-size: 0.28rem;
    &.active {
      position: relative;
      color: #14191f;
      font-size: 0.32rem;
      font-weight: bold;
      .selected-icon {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 0.4rem;
        height: 0.16rem;
      }
    }
  }
}
.record-list {
  margin: 0.24rem;
  padding: 0.24rem;
  background: #fff;
  border-radius: 0.16rem;
  .record-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.24rem;
    height: 0.8rem;
    background: #f8f8f8;
    border-radius: 0.16rem;
    .order-info {
      display: flex;
      align-items: center;
      color: #6a6f75;
      font-size: 0.24rem;
      .order-sn {
        margin-left: 0.2rem;
      }
      .check-icon {
        margin-left: 0.04rem;
        width: 0.24rem;
        height: 0.24rem;
      }
    }
    .record-amount {
      color: #14191f;
      font-size: 0.32rem;
      font-weight: 500;
    }
  }
}
</style>
