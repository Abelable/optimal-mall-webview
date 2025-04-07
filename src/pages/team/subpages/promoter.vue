<template>
  <div class="header">
    <div class="search-bar">
      <img class="search-icon" src="../images/search.png" alt="" />
      <input
        class="search-input"
        v-model="keywords"
        placeholder="请输入昵称或手机号"
      />
      <img
        class="clear-icon"
        v-if="keywords"
        @click="clearSearch"
        src="../images/close.png"
        alt=""
      />
      <div class="search-btn" @click="search">搜索</div>
    </div>
    <div class="menu" v-if="!searching">
      <div
        class="menu-item"
        :class="{ selected: curMenuIdx === index }"
        v-for="(item, index) in ['今日新增', '今日下单', '累计所有']"
        :key="index"
        @click="selectMenu(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
  <div class="container" :class="{ searching }">
    <div v-if="!searching">
      <div v-if="curMenuIdx === 0">
        <div class="promoter-list" v-if="newList.length">
          <PromoterItem
            v-for="(item, index) in newList"
            :key="index"
            :item="item"
          />
        </div>
        <Empty v-if="!newList.length" description="暂无新增推荐官" />
      </div>

      <div v-if="curMenuIdx === 1">
        <div class="promoter-list" v-if="orderingList.length">
          <PromoterItem
            v-for="(item, index) in orderingList"
            :key="index"
            :item="item"
          />
        </div>
        <Empty v-if="!orderingList.length" description="暂无下单推荐官" />
      </div>
    </div>
    <div v-if="curMenuIdx === 2 || searching">
      <PullRefresh v-model="refreshing" @refresh="onRefresh">
        <List
          class="sales-record-list"
          v-model="loading"
          :finished="finished"
          @load="onLoadMore"
          :finished-text="allList.length ? '没有更多了' : ''"
        >
          <PromoterItem
            v-for="(item, index) in allList"
            :key="index"
            :item="item"
          />
        </List>
        <Empty v-if="!allList.length" description="暂无推荐官" />
      </PullRefresh>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  showToast,
  Empty,
  PullRefresh,
  List,
  showLoadingToast,
  closeToast,
} from "vant";
import PromoterItem from "../components/promoter-item.vue";

import { onMounted, ref } from "vue";
import {
  getPromoterList,
  getTodayNewPromoterList,
  getTodayOrderingPromoterList,
} from "../utils/api";

import type { Promoter } from "../utils/type";
import { useRoute } from "vue-router";

const route = useRoute();

const keywords = ref("");
const searching = ref(false);
const curMenuIdx = ref(0);
const newList = ref<Promoter[]>([]);
const orderingList = ref<Promoter[]>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const allList = ref<Promoter[]>([]);

onMounted(() => {
  selectMenu(
    route.query?.type && route.query?.type !== "0" ? +route.query?.type - 1 : 0
  );
  setAllList();
});

const onRefresh = () => setAllList(true);
const onLoadMore = () => {
  if (curMenuIdx.value === 2 || searching.value) {
    setAllList();
  }
};

const selectMenu = (index: number) => {
  curMenuIdx.value = index;
  if (index === 0) {
    setNewList();
  }
  if (index === 1) {
    setOrderingList();
  }
};

const clearSearch = () => {
  keywords.value = "";
  searching.value = false;
  setAllList(true);
};
const search = () => {
  if (!keywords.value) {
    showToast("请输入昵称或手机号");
    return;
  }
  searching.value = true;
  setAllList(true);
};

const setNewList = async () => {
  showLoadingToast({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  newList.value = await getTodayNewPromoterList();
  closeToast();
};
const setOrderingList = async () => {
  showLoadingToast({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  orderingList.value = await getTodayOrderingPromoterList();
  closeToast();
};

let page = 0;
const setAllList = async (init = false) => {
  showLoadingToast({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  if (init) {
    page = 0;
    finished.value = false;
  }
  const list = await getPromoterList({
    keywords: keywords.value,
    page: ++page,
    limit: 10,
  });
  allList.value = init ? list : [...allList.value, ...list];
  if (!list.length) {
    finished.value = true;
  }
  loading.value = false;
  refreshing.value = false;
  closeToast();
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: #fff;
  z-index: 100;
  .search-bar {
    display: flex;
    align-items: center;
    margin: 0.16rem 0.24rem;
    height: 0.64rem;
    background: #f7f7fa;
    border-radius: 0.32rem;
    .search-icon {
      margin-left: 0.2rem;
      width: 0.32rem;
      height: 0.32rem;
    }
    .search-input {
      margin: 0 0.12rem;
      flex: 1;
      font-size: 0.28rem;
    }
    .clear-icon {
      width: 0.28rem;
      height: 0.28rem;
    }
    .search-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.12rem;
      margin-right: 0.08rem;
      width: 1.06rem;
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
  }
  .menu {
    display: flex;
    align-items: center;
    width: 100%;
    border-top: 1px solid #f5f6f8;
    .menu-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 0.8rem;
      color: #666;
      font-size: 0.28rem;
      &.selected {
        position: relative;
        color: #f5701d;
        font-size: 0.3rem;
        font-weight: bold;
        &::after {
          position: absolute;
          bottom: 0.04rem;
          left: 50%;
          transform: translateX(-50%);
          width: 0.3rem;
          height: 0.06rem;
          content: "";
          border-radius: 0.15rem;
          background: #f5701d;
        }
      }
    }
  }
}
.container {
  margin-top: 2rem;
  padding: 0.01rem 0.24rem 0.24rem;
  &.searching {
    margin-top: 1.2rem;
  }
}
</style>
