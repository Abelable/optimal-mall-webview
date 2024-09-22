<template>
  <div class="promoter-item">
    <div class="info-wrap">
      <img class="avatar" :src="item.avatar" alt="" />
      <div class="info">
        <div class="name">{{ item.nickname }}</div>
        <div class="mobile">
          <span>{{
            mobileVisible
              ? item.mobile
              : `${item.mobile.slice(0, 3)}****${item.mobile.slice(-4)}`
          }}</span>
          <img
            class="visible-icon"
            :src="require(`../images/${mobileVisible ? 'show' : 'hide'}.png`)"
            alt=""
          />
        </div>
        <div class="num-desc">诚信星球第{{ item.id }}号乡村振兴推广员</div>
      </div>
    </div>
    <div class="data-wrap">
      <div class="gmv">GMV: ¥{{ item.GMV }}</div>
      <div class="time">
        提交时间: {{ dayjs(item.createdAt).format("YYYY.MM.DD") }}
      </div>
    </div>
    <div
      class="identity-tag"
      :class="{
        promoter: item.level === 1,
        c1: item.level === 2,
        c2: item.level === 3,
        c3: item.level === 4,
      }"
    >
      {{ ["推广员", "c1", "c2", "c3"][item.level - 1] }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Promoter } from "../utils/type";
import dayjs from "dayjs";

defineProps<{ item: Promoter }>();

const mobileVisible = ref(false);
</script>

<style lang="scss" scoped>
.promoter-item {
  position: relative;
  margin-bottom: 0.24rem;
  background: #fff;
  border-radius: 0.16rem;
  .info-wrap {
    display: flex;
    align-items: center;
    padding: 0.24rem;
    .avatar {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      background: #f5f6f8;
    }
    .info {
      margin-left: 0.16rem;
      .name {
        color: #14191f;
        font-size: 0.28rem;
        font-weight: 500;
      }
      .mobile {
        display: flex;
        align-items: center;
        margin-top: 0.08rem;
        color: #3c3f42;
        font-size: 0.24rem;
        .visible-icon {
          margin-left: 0.08rem;
          width: 0.28rem;
          height: 0.2rem;
        }
      }
      .num-desc {
        margin-top: 0.02rem;
        color: #3c3f42;
        font-size: 0.24rem;
      }
    }
  }
  .data-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0.24rem;
    border-top: 1px solid #f0f3f7;
    .gmv,
    .time {
      color: #3c3f42;
      font-size: 0.24rem;
    }
  }
  .identity-tag {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0.92rem;
    height: 0.44rem;
    font-size: 0.2rem;
    border-radius: 0 0.16rem 0 0.16rem;
    &.promoter {
      color: #f5701d;
      background: #fff7e6;
    }
    &.c1 {
      color: #0dc1e2;
      background: #ebfcff;
    }
    &.c2 {
      color: #00aa5a;
      background: #dff7ec;
    }
    &.c3 {
      color: #ff4747;
      background: #ffebeb;
    }
  }
}
</style>
