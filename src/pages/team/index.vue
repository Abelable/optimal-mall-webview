<template>
  <div class="container">
    <!-- <div class="user-info-wrap">
      <img class="avatar" :src="userInfo?.avatar" />
      <div class="user-info">
        <div class="user-name">
          {{ userInfo?.nickname }}
        </div>
        <div class="user-mobile">{{ mobile }}</div>
        <div class="user-identity">
          诚信星球第{{ userInfo?.promoterId }}号乡村振兴{{
            userInfo?.level === 1 ? "推广员" : "服务商"
          }}
        </div>
      </div>
    </div> -->
    <div
      class="upgradation-wrap"
      v-if="userInfo"
      :style="{
        'background-image': `url(${require(`./images/upgradation_bg_c${userInfo?.level}.png`)})`,
      }"
    >
      <div class="progress-desc">
        <span>距离C{{ userInfo?.level }}，仅差</span>
        <span style="color: #f5701d"> 20%</span>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-tips">涨分进度</div>
        <div class="progress-bar">
          <div
            class="progress-bar-inner"
            :style="{ width: `${achievementInfo?.percent}%` }"
          ></div>
        </div>
        <div class="progress-bar-tips">{{ achievementInfo?.percent }}%</div>
        <div class="upgrade-btn" @click="upgrade">
          {{ achievementInfo?.percent === 100 ? "去升级" : "去查看" }}
        </div>
      </div>
    </div>
    <div class="account-amount">
      <div class="account-amount-header">
        <div class="account-amount-title">我的账户</div>
        <div class="withdraw-btn" @click="withdraw">提现</div>
      </div>
      <div class="amount-list">
        <div class="amount-item">
          <div class="amount">
            {{ commissionSumInfo?.cashAmount || "0.00" }}
          </div>
          <div class="amount-desc">可提现金额</div>
        </div>
        <div class="amount-item">
          <div class="amount">
            {{ commissionSumInfo?.pendingAmount || "0.00" }}
          </div>
          <div class="amount-desc">待结算金额</div>
        </div>
        <div class="amount-item">
          <div class="amount">
            {{ commissionSumInfo?.settledAmount || "0.00" }}
          </div>
          <div class="amount-desc">累积已结算金额</div>
        </div>
      </div>
    </div>
    <div class="promoter-data-wrap" @click="checkMyPromoters">
      <div class="promoter-title-wrap">
        <div class="promoter-title">我的推广员</div>
        <img class="more-icon" src="./images/arrow.png" alt="" />
      </div>
      <div class="promoter-data-list">
        <div class="promoter-data-item">
          <div class="promoter-data-desc">今日新增推广员数</div>
          <div class="promoter-data">
            {{ promoterData?.todayNewCount || "-" }}
          </div>
        </div>
        <div class="promoter-data-item">
          <div class="promoter-data-desc">今日下单推广员数</div>
          <div class="promoter-data">
            {{ promoterData?.todayOrderingCount || "-" }}
          </div>
        </div>
        <div class="promoter-data-item">
          <div class="promoter-data-desc">累积推广员总数</div>
          <div class="promoter-data">{{ promoterData?.totalCount || "-" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  getCommissionSumInfo,
  getPromoterAchievement,
  getPromoterData,
  getUserInfo,
} from "./utils/api";

import type {
  CommissionSumInfo,
  PromoterData,
  UserInfo,
  Achievement,
} from "./utils/type";

const router = useRouter();

const userInfo = ref<UserInfo>();
const achievementInfo = ref<Achievement>();
const commissionSumInfo = ref<CommissionSumInfo>();
const promoterData = ref<PromoterData>();

onMounted(() => {
  setUserInfo();
  setAchievementInfo();
  setCommissionSumInfo();
  setPromoterData();
});

// const mobile = computed(
//   () =>
//     userInfo.value &&
//     `${userInfo.value?.mobile.slice(0, 3)}****${userInfo.value?.mobile.slice(
//       -4
//     )}`
// );

const setUserInfo = async () => {
  userInfo.value = await getUserInfo();
};
const setAchievementInfo = async () => {
  achievementInfo.value = await getPromoterAchievement();
};
const setCommissionSumInfo = async () => {
  commissionSumInfo.value = await getCommissionSumInfo();
};
const setPromoterData = async () => {
  promoterData.value = await getPromoterData();
};

const withdraw = () =>
  router.push(`/team/account?level=${userInfo.value?.level}`);

const checkMyPromoters = () => router.push("/team/promoter");
const upgrade = () => {
  router.push("/team/performance");
};
</script>

<style lang="scss" scoped>
.upgrade-btn,
.withdraw-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.06rem;
  height: 0.48rem;
  color: #fff;
  font-size: 0.24rem;
  background: linear-gradient(135deg, #ffa266 0%, #ff3d39 64%, #ff3636 100%);
  border-radius: 0.24rem;
}
.container {
  padding: 0.24rem;
  min-height: 100vh;
  background-image: url("https://static.youbozhenxuan.cn/mp/mine_bg_default.png");
  background-size: 100%;
  background-repeat: no-repeat;
  .user-info-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }
    .user-info {
      margin-left: 0.16rem;
      .user-name {
        color: #14191f;
        font-size: 0.28rem;
        font-weight: bold;
      }
      .user-mobile,
      .user-identity {
        color: #3c3f42;
        font-size: 0.24rem;
      }
      .user-identity {
        margin-top: 0.02rem;
      }
    }
  }
  .upgradation-wrap {
    padding: 0 0.24rem;
    height: 2rem;
    background-size: calc(100% + 0.32rem) calc(100% + 0.24rem);
    background-position: -0.16rem -0.12rem;
    background-repeat: no-repeat;
    overflow: hidden;
    .progress-desc {
      margin-top: 0.76rem;
      color: #14191f;
      font-size: 0.24rem;
    }
    .progress-bar-wrap {
      display: flex;
      align-items: center;
      margin-top: 0.06rem;
      .progress-bar-tips {
        color: #6a6f75;
        font-size: 0.2rem;
      }
      .progress-bar {
        position: relative;
        margin: 0 0.1rem;
        flex: 1;
        height: 0.24rem;
        background: #fff;
        border-radius: 0.12rem;
        .progress-bar-inner {
          position: absolute;
          top: 0;
          left: 0;
          height: 0.24rem;
          background: linear-gradient(
            135deg,
            #ffa266 0%,
            #ff3d39 64%,
            #ff3636 100%
          );
          border-radius: 0.12rem;
        }
      }
      .upgrade-btn {
        margin-left: 0.4rem;
      }
    }
  }
  .account-amount {
    margin-top: 0.24rem;
    padding: 0.24rem;
    padding-bottom: 0.48rem;
    background: #fff;
    border-radius: 0.16rem;
    .account-amount-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .account-amount-title {
        color: #111;
        font-size: 0.28rem;
        font-weight: 550;
      }
    }
    .amount-list {
      display: flex;
      margin-top: 0.24rem;
      .amount-item {
        flex: 2;
        text-align: center;
        &:last-child {
          flex: 3;
        }
        .amount {
          color: #14191f;
          font-size: 0.44rem;
          font-weight: 550;
        }
        .amount-desc {
          margin-top: 0.16rem;
          color: #3c3f42;
          font-size: 0.24rem;
        }
      }
    }
  }
  .promoter-data-wrap {
    margin-top: 0.24rem;
    padding: 0.24rem;
    border-radius: 0.16rem;
    background: #fff;
    .promoter-title-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .promoter-title {
        color: #111;
        font-size: 0.28rem;
        font-weight: 550;
      }
      .more-icon {
        width: 0.24rem;
        height: 0.24rem;
      }
    }
    .promoter-data-list {
      display: flex;
      justify-content: space-between;
      margin-top: 0.28rem;
      padding: 0 0.2rem;
      .promoter-data-desc {
        color: #6a6f75;
        font-size: 0.24rem;
      }
      .promoter-data {
        margin-top: 0.16rem;
        color: #000;
        font-size: 0.32rem;
        font-weight: 550;
      }
    }
  }
}
</style>
