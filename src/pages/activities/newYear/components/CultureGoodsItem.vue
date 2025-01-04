<template>
  <div class="goods-item" @click="checkGoods(info.id)">
    <img class="goods-cover" :src="info.activityCover || info.cover" alt="" />
    <div class="goods-name">{{ info.name }}</div>
    <div class="goods-intro">{{ info.introduction }}</div>
    <div class="price-wrap">
      <img class="price-bg" src="../images/price_bg.png" alt="" />
      <div class="price">
        <span class="price-unit">¥</span>
        <span>{{ info.price }}</span>
      </div>
      <div class="add-btn" @click="addCart(info.id)">加入选购</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addCart } from "../utils/api";
import type { Goods } from "../utils/type";

defineProps<{ info: Goods }>();

const checkGoods = (id: number) => {
  window.wx.miniProgram.navigateTo({
    url: `/pages/home/subpages/goods-detail/index?id=${id}`,
  });
};
</script>

<style lang="scss" scoped>
.goods-item {
  position: relative;
  margin-bottom: 0.32rem;
  padding: 0.24rem;
  height: 4.4rem;
  background: #e6be90;
  border-radius: 0.2rem;
  .goods-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .goods-cover {
    width: 100%;
    height: 2.8rem;
    object-fit: cover;
    border-radius: 0.12rem;
  }
  .goods-name {
    margin-top: 0.26rem;
    width: 3rem;
    color: #691e13;
    font-size: 0.36rem;
    font-weight: 900;
    font-family: STSongti-SC, STSongti-SC;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .goods-intro {
    margin-top: 0.04rem;
    width: 3rem;
    color: #691e13;
    font-size: 0.26rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .price-wrap {
    position: absolute;
    right: 0.18rem;
    bottom: -0.14rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.24rem;
    width: 3.2rem;
    height: 1.2rem;
    .price-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .price {
      color: #fdfde8;
      font-size: 0.48rem;
      font-weight: 600;
      font-family: PingFangSC, PingFang SC;
      .price-unit {
        font-size: 0.3rem;
        font-weight: 300;
      }
    }
    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.2rem;
      height: 0.4rem;
      color: #691e13;
      font-size: 0.2rem;
      font-weight: 900;
      font-family: STSongti-SC, STSongti-SC;
      border-radius: 0.26rem;
      background: linear-gradient(106deg, #fcf8df 0%, #edc090 100%);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
