<template>
  <div class="container" v-if="status === 0">
    <div class="title">成为乡村振兴服务商</div>
    <div class="form">
      <div class="form-item">
        <div class="form-input-wrap">
          <div class="form-label">姓名：</div>
          <input class="form-input" v-model="name" placeholder="请输入姓名" />
        </div>
      </div>
      <div class="form-item">
        <div class="form-input-wrap">
          <div class="form-label">银行名称：</div>
          <input
            class="form-input"
            v-model="bankName"
            placeholder="请输入银行名称"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-input-wrap">
          <div class="form-label">银行卡号：</div>
          <input
            class="form-input"
            v-model="bankCode"
            placeholder="请输入银行卡号"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-input-wrap">
          <div class="form-label">银行地址：</div>
          <input
            class="form-input"
            v-model="bankAddress"
            placeholder="请输入银行地址"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="form-label" style="margin-bottom: 0.2rem">
          请上传营业执照
        </div>
        <Uploader
          width="2.4rem"
          height="1.6rem"
          @finish="uploadBusinessLicense"
        />
        <div class="form-label" style="margin: 0.2rem 0">请上传法人信息</div>
        <div class="uploader-wrap">
          <Uploader
            width="2.4rem"
            height="1.6rem"
            title="法人身份证正面"
            @finish="uploadIdCardFront"
          />
          <Uploader
            width="2.4rem"
            height="1.6rem"
            title="法人身份证反面"
            @finish="uploadIdCardBack"
          />
        </div>
      </div>
      <div class="submit-btn" :class="{ active: btnActive }" @click="submit">
        提交
      </div>
    </div>
  </div>
  <div class="review-status" v-if="status === 1">
    <img class="review-illus" src="../images/review_illus.png" alt="" />
    <div class="illus-desc">信息已提交，审核中</div>
  </div>
</template>

<script setup lang="ts">
import Uploader from "@/components/Uploader.vue";
import { showToast } from "vant";
import { computed, ref } from "vue";

const status = ref(1);

const name = ref("");
const bankName = ref("");
const bankCode = ref("");
const bankAddress = ref("");
const businessLicense = ref("");
const idCardFront = ref("");
const idCardBack = ref("");

const btnActive = computed(
  () =>
    name.value &&
    bankName.value &&
    bankCode.value &&
    bankAddress.value &&
    businessLicense.value &&
    idCardFront.value &&
    idCardBack.value
);

const uploadBusinessLicense = (photo: string) => {
  businessLicense.value = photo;
};
const uploadIdCardFront = (photo: string) => {
  idCardFront.value = photo;
};
const uploadIdCardBack = (photo: string) => {
  idCardBack.value = photo;
};

const submit = () => {
  if (!name.value) {
    showToast("请输入姓名");
    return;
  }
  if (!bankName.value) {
    showToast("请输入银行名称");
    return;
  }
  if (!bankCode.value) {
    showToast("请输入银行卡号");
    return;
  }
  if (!bankAddress.value) {
    showToast("请输入银行地址");
    return;
  }
  if (!businessLicense.value) {
    showToast("请上传营业执照");
    return;
  }
  if (!idCardFront.value) {
    showToast("请上传正面身份证照片");
    return;
  }
  if (!idCardBack.value) {
    showToast("请上传反面身份证照片");
    return;
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 0.6rem;
  min-height: 100vh;
  background-image: url("../images/certification_bg.png");
  background-size: 100% calc(100% + 1.2rem);
  background-position: 0 -1.2rem;
  background-repeat: no-repeat;
  overflow: hidden;
  .title {
    margin-top: 2rem;
    color: #633800;
    font-size: 0.44rem;
    text-align: center;
  }
  .form {
    margin: 0.68rem auto 0;
    padding: 0.32rem;
    width: 6.46rem;
    background: #fff;
    border-radius: 0.24rem;
    .form-item {
      margin-bottom: 0.16rem;
      padding: 0.32rem;
      background: #f8f8f8;
      border-radius: 0.24rem;
      .form-label {
        color: #14191f;
        font-size: 0.24rem;
      }
      .form-input-wrap {
        display: flex;
        align-items: center;
        .form-input {
          flex: 1;
          font-size: 0.24rem;
        }
      }
      .uploader-wrap {
        display: flex;
        justify-content: space-between;
      }
    }
    .submit-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.94rem;
      color: #fff;
      font-size: 0.36rem;
      background: #ff7621;
      border-radius: 0.47rem;
      opacity: 0.5;
      &.active {
        opacity: 1;
      }
    }
  }
}
.review-status {
  height: 100vh;
  background: #fff;
  overflow: hidden;
  .review-illus {
    display: block;
    margin: 2rem auto 0;
    width: 4rem;
    height: 3.4rem;
  }
  .illus-desc {
    margin-top: 0.8rem;
    color: #283e5a;
    font-size: 0.28rem;
    text-align: center;
  }
}
</style>
