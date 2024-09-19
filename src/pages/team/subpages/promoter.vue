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
  </div>
  <div class="container">
    <div class="title">今日新增</div>
    <div class="promoter-list" v-if="newList.length">
      <PromoterItem
        v-for="(item, index) in newList"
        :key="index"
        :item="item"
      />
    </div>
    <Empty v-if="!newList.length" description="暂无新增推广员" />

    <div class="title">今日下单</div>
    <div class="promoter-list" v-if="orderingList.length">
      <PromoterItem
        v-for="(item, index) in orderingList"
        :key="index"
        :item="item"
      />
    </div>
    <Empty v-if="!orderingList.length" description="暂无下单推广员" />

    <div class="title">累计所有</div>
    <div class="promoter-list" v-if="allList.length">
      <PromoterItem
        v-for="(item, index) in allList"
        :key="index"
        :item="item"
      />
    </div>
    <Empty v-if="!allList.length" description="暂无推广员" />
  </div>
</template>

<script setup lang="ts">
import { showToast, Empty } from "vant";
import PromoterItem from "../components/promoter-item.vue";

import { ref } from "vue";

const keywords = ref("");
const searching = ref(false);
const newList = ref([]);
const orderingList = ref([]);
const allList = ref([]);

const clearSearch = () => {
  keywords.value = "";
  searching.value = false;
};
const search = () => {
  if (!keywords.value) {
    showToast("请输入昵称或手机号");
    return;
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  padding: 0.16rem 0.24rem;
  width: 100vw;
  background: #fff;
  z-index: 100;
  .search-bar {
    display: flex;
    align-items: center;
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
}
.container {
  margin-top: 0.96rem;
  padding: 0.01rem 0.24rem 0.24rem;
  .title {
    margin: 0.24rem 0;
    color: #333;
    font-size: 0.32rem;
    font-weight: 550;
  }
}
</style>
