<template>
  <div class="promoter-item">
    <div class="info-wrap">
      <img class="avatar" src="" alt="" />
      <div class="info">
        <div class="name">昵称</div>
        <div class="mobile">
          <span>177****7777</span>
          <img class="visible-icon" src="../images/show.png" alt="" />
        </div>
        <div class="num-desc">诚信星球第x号乡村振兴推广员</div>
      </div>
    </div>
    <div class="data-wrap">
      <div class="gmv">GMV: ¥200.000,000,00</div>
      <div class="time">提交时间: 2024.3.3</div>
    </div>
    <div class="identity-tag">推广员</div>
  </div>
</template>

<script setup lang="ts"></script>

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
    color: #f5701d;
    font-size: 0.2rem;
    background: #fff7e6;
    border-radius: 0 0.16rem 0 0.16rem;
  }
}
</style>
