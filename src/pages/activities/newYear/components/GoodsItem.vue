<template>
  <div class="goods-item" @click="checkGoods(info.id)">
    <img class="goods-bg" src="../images/goods_item_bg.png" alt="" />
    <img class="goods-cover" :src="info.cover" alt="" />
    <div class="goods-name">{{ info.name }}</div>
    <div class="goods-intro">{{ info.introduction }}</div>
    <div class="price-wrap">
      <img class="price-bg" src="../images/price_bg.png" alt="" />
      <div class="price">
        <span class="price-unit">¥</span>
        <span>{{ info.price }}</span>
      </div>
      <div class="add-btn">加入选购</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Goods } from "../utils/type";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 2.18rem;
  height: 3.5rem;
  margin-right: 0.14rem;
  margin-bottom: 0.2rem;
  padding: 0.12rem;
  font-size: 0;
  .goods-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .goods-cover {
    width: 2rem;
    height: 2rem;
    border-radius: 0.12rem;
  }
  .goods-name {
    margin-top: 0.1rem;
    color: #691e13;
    font-size: 0.24rem;
    font-family: STSongti-SC, STSongti-SC;
    font-weight: 900;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .goods-intro {
    margin-top: 0.04rem;
    color: #691e13;
    font-size: 0.16rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .price-wrap {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.12rem;
    width: 2rem;
    height: 0.6rem;
    .price-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .price {
      color: #fdfde8;
      font-size: 0.28rem;
      font-weight: 600;
      font-family: PingFangSC, PingFang SC;
      .price-unit {
        font-size: 0.16rem;
        font-weight: 300;
      }
    }
    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 0.8rem;
      height: 0.26rem;
      color: #691e13;
      font-size: 0.14rem;
      font-weight: 900;
      font-family: STSongti-SC, STSongti-SC;
      border-radius: 0.13rem;
      background: linear-gradient(106deg, #fcf8df 0%, #edc090 100%);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
