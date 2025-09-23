<template>
  <Popup
    :show="visible"
    @click-overlay="cancel"
    @click-close-icon="cancel"
    position="bottom"
    round
    closeable
  >
    <div class="point-popup">
      <img
        class="illus"
        src="https://static.chengxinxingqiu.cn/mp/points/illus.png"
      />
      <div class="title">是否兑换为诚信积分？</div>
      <div class="desc">兑换后不可撤回，可用于下单抵扣、积分商城福利换购</div>
      <div class="amount-wrap">
        <div class="cash-desc">
          <span>即将把</span>
          <span class="cash"> {{ amount.toFixed(2) }}元 </span>
          <span>兑换为</span>
        </div>
        <div class="point-amount">{{ (amount * 100).toFixed(0) }}积分</div>
      </div>
      <div class="btn-wrap">
        <div class="cancel-btn" @click="cancel">暂不兑换</div>
        <div class="confirm-btn" @click="exchange">确认兑换</div>
      </div>
      <div class="agreement" @click="agree = !agree">
        <img
          class="check-icon"
          v-if="!agree"
          src="https://static.chengxinxingqiu.cn/mp/live/explain_goods/unselected.png"
        />
        <img
          class="check-icon"
          v-if="agree"
          src="https://static.chengxinxingqiu.cn/mp/live/explain_goods/selected.png"
        />
        <span>阅读并同意</span>
        <span style="color: #f5701d" @click.stop="checkService">
          《诚信星球积分兑换协议》
        </span>
      </div>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, showToast } from "vant";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { applyExchangePoint } from "../utils/api";

const props = defineProps<{ visible: boolean; amount: number }>();
const emit = defineEmits(["success", "cancel"]);

const router = useRouter();
const agree = ref(false);

const exchange = async () => {
  if (props.amount === 0) {
    return;
  }

  if (!agree.value) {
    showToast("请阅读并同意积分兑换协议");
    return;
  }

  await applyExchangePoint(props.amount);
  showToast("兑换成功");

  setTimeout(() => {
    emit("success");
  }, 2000);
};

const checkService = () => {
  router.push("/agreements/point_service");
};

const cancel = () => emit("cancel");
</script>

<style lang="scss" scoped>
.point-popup {
  padding: 0.6rem 0.32rem 0;
  height: 8rem;
  background-image: url("https://static.chengxinxingqiu.cn/mp/points/bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .illus {
    display: block;
    margin: 0 auto;
    width: 1.4rem;
    height: 1.3rem;
  }
  .title {
    margin-top: 0.24rem;
    padding-left: 0.12rem;
    color: #333;
    font-size: 0.32rem;
    font-weight: bold;
    text-align: center;
  }
  .desc {
    margin-top: 0.32rem;
    color: #666;
    font-size: 0.26rem;
    text-align: center;
  }

  .amount-wrap {
    margin-top: 0.24rem;
    padding: 0.24rem 0 0.2rem;
    text-align: center;
    background: #fdf6f0;
    border-radius: 0.24rem;
    .cash-desc {
      color: #666;
      font-size: 0.26rem;
      .cash {
        color: #333;
        font-size: 0.28rem;
        font-weight: bold;
      }
    }
    .point-amount {
      margin-top: 0.12rem;
      color: #a75300;
      font-size: 0.36rem;
      font-weight: bolder;
    }
  }

  .btn-wrap {
    display: flex;
    margin-top: 1rem;
    .cancel-btn,
    .confirm-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 0.8rem;
      font-size: 0.28rem;
      font-weight: bold;
      border-radius: 0.24rem;
    }
    .cancel-btn {
      margin-right: 0.12rem;
      color: #666;
      background: #f1f1f1;
    }
    .confirm-btn {
      margin-left: 0.12rem;
      color: #fff;
      background: linear-gradient(
        135deg,
        #ffa266 0%,
        #ff3d39 64%,
        #ff3636 100%
      );
    }
  }

  .agreement {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.24rem;
    color: #333;
    font-size: 0.22rem;
    font-weight: 400;
    text-align: center;
    .check-icon {
      margin-right: 0.08rem;
      width: 0.28rem;
      height: 0.28rem;
    }
  }
}
</style>
