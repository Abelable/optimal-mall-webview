<template>
  <div class="header">
    <img class="bg" src="./images/bg.png" alt="" />
    <div class="content-wrap">
      <div class="card">
        <div class="card-title">
          <img class="leaf" src="./images/left_leaf.png" alt="" />
          <div>乡村振兴推荐官的权益</div>
          <img class="leaf" src="./images/right_leaf.png" alt="" />
        </div>
        <div class="rights-wrap">
          <div
            class="rights-item"
            v-for="(item, index) in rightsList.slice(0, 4)"
            :key="index"
          >
            <img
              class="rights-icon"
              :src="require(`./images/rights_${index + 1}.png`)"
              alt=""
            />
            <div class="rights-name">{{ item }}</div>
          </div>
        </div>
        <div class="rights-wrap">
          <div
            class="rights-item"
            v-for="(item, index) in rightsList.slice(4)"
            :key="index"
          >
            <img
              class="rights-icon"
              :src="require(`./images/rights_${index + 5}.png`)"
              alt=""
            />
            <div class="rights-name">{{ item }}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="notice-title">活动期间</div>
        <div class="notice-content">
          任意购买一款下方产品即可成为乡村振兴推荐官
        </div>
      </div>
    </div>
    <img class="left-illus" src="./images/left_illus.png" alt="" />
    <img class="right-illus" src="./images/right_illus.png" alt="" />
  </div>

  <div class="menu-wrap">
    <div class="menu">
      <div
        class="menu-item"
        :class="{ selected: curMenuIdx === index }"
        v-for="(item, index) in menuList"
        :key="index"
        @click="selectMenu(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <img
      class="all-menu"
      @click="menuPickerModalVisible = true"
      src="./images/menu.png"
    />
  </div>

  <div class="goods-list">
    <div
      class="goods-item"
      v-for="(item, index) in goodsList"
      :key="index"
      @click="checkGoods(item.id)"
    >
      <img class="goods-cover" :src="item.cover" alt="" />
      <div class="goods-content">
        <div class="goods-name">{{ item.name }}</div>
        <div class="goods-price-wrap">
          <div class="goods-price">
            <span class="price-unit">¥</span>
            <span>{{ item.price }}</span>
          </div>
          <img
            class="add-icon"
            @click.stop="add(item.id)"
            src="./images/add.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>

  <div class="no-more-tips" v-if="goodsList.length">～没有更多了～</div>

  <div
    class="modal-mask"
    v-if="menuPickerModalVisible"
    @click="menuPickerModalVisible = false"
  >
    <div class="menu-picker-modal" @click.stop="">
      <div class="modal-title">选择分类</div>
      <div class="menu-options">
        <div
          class="menu-option"
          :class="{ picked: curMenuIdx === index }"
          v-for="(item, index) in menuList"
          :key="index"
          @click="selectMenu(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="confirm-btn" @click="menuPickerModalVisible = false">
        确定
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { closeToast, showLoadingToast, showToast } from "vant";
import { addCart } from "@/utils/api";
import { getCategoryOptions, getGoodsList } from "./utils/api";

import type { CategoryOption, Goods } from "./utils/type";

const rightsList = [
  "自买省心",
  "分享放心",
  "社区团购",
  "IP赋能",
  "专属社群",
  "专属身份标识",
  "1V1服务",
  "政府背书",
];
const menuList = ref<CategoryOption[]>([]);
const curMenuIdx = ref(0);
const goodsList = ref<Goods[]>([]);
const menuPickerModalVisible = ref(false);

onMounted(async () => {
  await setMenuList();
  setGoodsList();
});

const selectMenu = (index: number) => {
  curMenuIdx.value = index;
  setGoodsList();
};

const setMenuList = async () => {
  menuList.value = await getCategoryOptions();
};
const setGoodsList = async () => {
  showLoadingToast({
    message: "加载中...",
    duration: 0,
    forbidClick: true,
  });
  goodsList.value = await getGoodsList(menuList.value[curMenuIdx.value].id);
  closeToast();
};

const add = async (id: number) => {
  await addCart(id);
  showToast("成功添加购物车");
};

const checkGoods = (id: number) => {
  window.wx.miniProgram.navigateTo({
    url: `/pages/home/subpages/goods-detail/index?id=${id}`,
  });
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  padding-bottom: 1.5rem;
  background: #f0d4ad;
  .bg {
    width: 100%;
  }
  .content-wrap {
    position: absolute;
    top: 8rem;
    left: 50%;
    transform: translateX(-50%);
    .card {
      margin-bottom: 0.12rem;
      padding: 0.36rem;
      width: 6.9rem;
      background: #fffaf1;
      border-radius: 0.32rem;
      .card-title {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3c3f42;
        font-size: 0.32rem;
        font-weight: 600;
        .leaf {
          margin: 0 0.08rem;
          width: 0.16rem;
          height: 0.3rem;
        }
      }
      .rights-wrap {
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
        padding: 0 0.12rem;
        .rights-item {
          font-size: 0;
          text-align: center;
          .rights-icon {
            width: 0.52rem;
            height: 0.52rem;
          }
          .rights-name {
            margin-top: 0.12rem;
            color: #3c3f42;
            font-size: 0.2rem;
          }
        }
      }
      .notice-title {
        color: #f5701d;
        font-size: 0.24rem;
        font-weight: 600;
      }
      .notice-content {
        margin-top: 0.08rem;
        color: #14191f;
        font-size: 0.24rem;
        font-weight: 600;
      }
    }
  }
  .left-illus,
  .right-illus {
    position: absolute;
    top: 6.3rem;
    width: 1.66rem;
    height: 2.76rem;
  }
  .left-illus {
    top: 6.3rem;
    left: 0;
  }
  .right-illus {
    top: 6.2rem;
    right: 0;
  }
}

.menu-wrap {
  display: flex;
  align-items: center;
  padding: 0.24rem 0.2rem;
  .menu {
    font-size: 0;
    flex: 1;
    white-space: nowrap;
    overflow-x: scroll;
    .menu-item {
      display: inline-block;
      margin-right: 0.14rem;
      padding: 0 0.46rem;
      height: 0.56rem;
      color: #6a6f75;
      font-size: 0.28rem;
      line-height: 0.54rem;
      background: #fff;
      border-radius: 0.28rem;
      border: 1px solid #fff;
      &.selected {
        color: #f5701d;
        background: #fff3ec;
        border: 1px solid #f5701d;
      }
    }
  }
  .all-menu {
    margin-left: 0.24rem;
    width: 0.56rem;
    height: 0.56rem;
  }
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0.24rem;
  .goods-item {
    margin-bottom: 0.2rem;
    margin-right: 0.2rem;
    width: 2.2rem;
    height: 3.16rem;
    font-size: 0;
    background: #fff;
    border-radius: 0.06rem;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .goods-cover {
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 0.06rem;
    }
    .goods-content {
      padding: 0.1rem;
      .goods-name {
        color: #111111;
        font-size: 0.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .goods-price-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.1rem;
        .goods-price {
          color: #eb2240;
          font-size: 0.2rem;
          .price-unit {
            font-size: 0.14rem;
          }
        }
        .add-icon {
          width: 0.32rem;
          height: 0.32rem;
        }
      }
    }
  }
}
.no-more-tips {
  padding: 0.1rem 0 0.36rem;
  color: #999;
  font-size: 0.24rem;
  text-align: center;
}

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  .menu-picker-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-bottom: 39px;
    width: 300px;
    min-height: 320px;
    background: #fff;
    border-radius: 15px;
    z-index: 100;
    .modal-title {
      margin-top: 15px;
      color: #333;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
    }
    .menu-options {
      display: flex;
      flex-wrap: wrap;
      padding: 15px;
      padding-right: 0;
      .menu-option {
        margin-right: 0.3rem;
        margin-bottom: 0.2rem;
        padding: 0 0.46rem;
        height: 0.56rem;
        width: fit-content;
        color: #6a6f75;
        font-size: 0.28rem;
        line-height: 0.54rem;
        background: #f1f5f7;
        border-radius: 0.28rem;
        border: 1px solid #f1f5f7;
        &.picked {
          color: #f5701d;
          background: #fff3ec;
          border: 1px solid #f5701d;
        }
      }
    }
    .confirm-btn {
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 43px;
      color: #1a2040;
      font-size: 14px;
      font-weight: 500;
      border-top: 1px solid #eaecef;
    }
  }
}
</style>
