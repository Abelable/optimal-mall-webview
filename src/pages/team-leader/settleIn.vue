<template>
  <div class="container">
    <div class="settle-in" v-if="!statusInfo">
      <div class="home" v-if="step === 0">
        <div class="main">
          <div class="title">欢迎加入有播甄选</div>
          <div class="sub-title">- 团长入驻 -</div>
          <div
            class="btn confirm"
            :class="{ active: agreementsChecked }"
            @click="nextStep"
          >
            下一步
          </div>
          <div class="agreements">
            <Checkbox v-model="agreementsChecked" icon-size="16px" />
            <div style="margin-left: 0.1rem">
              我已阅读并同意
              <span style="color: #1b89fa" @click="checkAgreement"
                >《有播甄选团长服务协议》</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="information-filling" v-else>
        <div class="header">
          <div class="title">信息填写</div>
          <div class="sub-title">真实有效的信息有助于您快速通过审核</div>
        </div>
        <div class="main">
          <div class="form-wrap" v-show="step === 1">
            <div class="title">个人信息</div>
            <div class="form-item">
              <div class="form-title">姓名</div>
              <input
                class="input"
                v-model="teamLeaderInfo.name"
                type="text"
                placeholder="例：小明"
              />
            </div>
            <div class="form-item">
              <div class="form-title">身份证号</div>
              <input
                class="input"
                v-model="teamLeaderInfo.idCardNumber"
                type="text"
                placeholder="请输入18位身份证号"
              />
            </div>
            <div class="form-item">
              <div class="form-title">上传身份证照片</div>
              <div class="uploader-wrap">
                <CustomUploader
                  :default-img="require('./images/front.png')"
                  @finish="uploadIdCardFrontPhoto"
                />
                <CustomUploader
                  :default-img="require('./images/behind.png')"
                  @finish="uploadIdCardBackPhoto"
                />
              </div>
            </div>
            <div class="form-item">
              <div class="form-title">上传手持身份证照片</div>
              <div class="uploader-wrap">
                <Uploader max-count="1" :after-read="uploadHoldIdCardPhoto">
                  <img
                    class="photo"
                    v-if="
                      !uploadHoldIdCardPhotoLoading &&
                      teamLeaderInfo.holdIdCardPhoto
                    "
                    :src="teamLeaderInfo.holdIdCardPhoto"
                    alt=""
                  />
                  <div
                    class="default-img"
                    v-if="
                      !uploadHoldIdCardPhotoLoading &&
                      !teamLeaderInfo.holdIdCardPhoto
                    "
                  >
                    <div class="img-wrap">
                      <img
                        style="width: 0.5rem; height: 0.5rem"
                        src="./images/camera.png"
                        alt=""
                      />
                    </div>
                    <div class="desc">手持身份证照片</div>
                  </div>
                  <div class="loading-wrap" v-if="uploadHoldIdCardPhotoLoading">
                    <Loading vertical color="#fff">上传中...</Loading>
                  </div>
                </Uploader>
                <img class="photo" src="./images/person-example.png" alt="" />
              </div>
            </div>
            <div class="title">联系方式</div>
            <div class="form-item">
              <div class="form-title">手机号</div>
              <input
                class="input"
                v-model="teamLeaderInfo.mobile"
                type="tel"
                placeholder="请输入手机号"
              />
            </div>
            <div class="form-item">
              <div class="form-title">电子邮箱</div>
              <input
                class="input"
                v-model="teamLeaderInfo.email"
                type="email"
                placeholder="请输入电子邮箱"
              />
            </div>
            <div class="title">团长资质</div>
            <div class="form-item">
              <div class="form-title">可上传微信群截图等资质照片</div>
              <Uploader
                v-model="teamLeaderInfo.qualificationPhoto"
                :after-read="uploadFile"
                style="margin-top: 0.32rem"
              />
            </div>
          </div>
          <div class="btns">
            <div class="btn previous-step" @click="step = step - 1">上一步</div>
            <div class="btn next-step" @click="nextStep">提交审核</div>
          </div>
        </div>
      </div>
    </div>
    <div class="status" v-else>
      <div class="status-illus" v-if="statusInfo.status !== 1">
        <img
          class="illus"
          :src="
            statusInfo.status === 0
              ? require('@/assets/images/wait.png')
              : statusInfo.status === 2
              ? require('@/assets/images/success.png')
              : require('@/assets/images/fail.png')
          "
          alt=""
        />
        <div class="title">
          {{
            statusInfo.status === 0
              ? "等待审核"
              : statusInfo.status === 2
              ? "申请成功"
              : "审核失败"
          }}
        </div>
        <div class="desc" :class="{ err: statusInfo.status === 3 }">
          {{
            statusInfo.status === 0
              ? "已提交申请，请耐心等待平台人员处理"
              : statusInfo.status === 2
              ? "恭喜您已成为有播甄选团长"
              : `失败原因：${statusInfo.failureReason}`
          }}
        </div>
        <div class="btn back" v-if="statusInfo.status !== 3" @click="back">
          返回
        </div>
        <div class="btn back" v-if="statusInfo.status === 3" @click="reApply">
          重新申请
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Checkbox, showToast, Uploader } from "vant";
import CustomUploader from "@/components/Uploader.vue";

import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { upload, uploadFile } from "@/utils/upload";
import {
  uploadTeamLeaderInfo,
  getTeamLeaderStatusInfo,
  reapplyTeamLeader,
} from "./utils/api";

import type { UploaderAfterRead } from "vant/lib/uploader/types";
import type { TeamLeaderInfo, TeamLeaderStatusInfo } from "./utils/type";

const router = useRouter();

const step = ref(0);
const agreementsChecked = ref(false);
const teamLeaderInfo = reactive<TeamLeaderInfo>({
  name: "",
  mobile: "",
  email: "",
  idCardNumber: "",
  idCardFrontPhoto: "",
  idCardBackPhoto: "",
  holdIdCardPhoto: "",
  qualificationPhoto: [],
});
const statusInfo = ref<TeamLeaderStatusInfo | undefined>();
const uploadHoldIdCardPhotoLoading = ref(false);

onMounted(async () => {
  await setStatusInfo();
});

const nextStep = () => {
  switch (step.value) {
    case 0:
      if (!agreementsChecked.value) {
        showToast("请阅读并同意团长服务协议");
        return;
      }
      step.value = 1;
      break;
    case 1:
      if (!teamLeaderInfo.name) {
        showToast("请输入姓名");
        return;
      }
      if (
        !teamLeaderInfo.idCardNumber ||
        !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(
          teamLeaderInfo.idCardNumber
        )
      ) {
        showToast("请输入正确身份证号");
        return;
      }
      if (!teamLeaderInfo.idCardFrontPhoto) {
        showToast("请上传身份证正面照片");
        return;
      }
      if (!teamLeaderInfo.idCardBackPhoto) {
        showToast("请上传身份证反面照片");
        return;
      }
      if (!teamLeaderInfo.holdIdCardPhoto) {
        showToast("请上传手持身份证照片");
        return;
      }
      if (
        !teamLeaderInfo.mobile ||
        !/^1[345789][0-9]{9}$/.test(teamLeaderInfo.mobile)
      ) {
        showToast("请输入正确手机号");
        return;
      }
      if (
        !teamLeaderInfo.email ||
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          teamLeaderInfo.email
        )
      ) {
        showToast("请输入正确电子邮箱");
        return;
      }
      submit();
      break;
  }
};

const setStatusInfo = async () => {
  statusInfo.value = await getTeamLeaderStatusInfo();
};

const submit = async () => {
  try {
    await uploadTeamLeaderInfo(teamLeaderInfo);
    setStatusInfo();
  } catch (error) {
    showToast("审核提交失败，请重试");
  }
};

const uploadIdCardFrontPhoto = (photo: string) => {
  teamLeaderInfo.idCardFrontPhoto = photo;
};
const uploadIdCardBackPhoto = (photo: string) => {
  teamLeaderInfo.idCardBackPhoto = photo;
};
const uploadHoldIdCardPhoto = (async ({ file }: { file: File }) => {
  uploadHoldIdCardPhotoLoading.value = true;
  teamLeaderInfo.holdIdCardPhoto = await upload(file);
  uploadHoldIdCardPhotoLoading.value = false;
}) as UploaderAfterRead;

const checkAgreement = () => router.push("/agreements/team_leader_service");

const reApply = async () => {
  try {
    const {
      name,
      mobile,
      email,
      idCardNumber,
      idCardFrontPhoto,
      idCardBackPhoto,
      holdIdCardPhoto,
      qualificationPhoto,
    } = await reapplyTeamLeader();
    teamLeaderInfo.name = name;
    teamLeaderInfo.mobile = mobile;
    teamLeaderInfo.email = email;
    teamLeaderInfo.idCardNumber = idCardNumber;
    teamLeaderInfo.idCardFrontPhoto = idCardFrontPhoto;
    teamLeaderInfo.idCardBackPhoto = idCardBackPhoto;
    teamLeaderInfo.holdIdCardPhoto = holdIdCardPhoto;
    teamLeaderInfo.qualificationPhoto = qualificationPhoto;
    setStatusInfo();
  } catch (error) {
    showToast("操作失败请重试");
  }
};

const back = () => {
  window.wx.miniProgram.navigateBack();
};
</script>

<style lang="scss" scoped>
.container {
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.88rem;
    font-size: 0.3rem;
    font-weight: 550;
    border-radius: 0.18rem;
  }
  .settle-in {
    .home {
      position: relative;
      height: 100vh;
      background-image: url("./images/bg.jpeg");
      background-repeat: no-repeat;
      background-size: cover;
      .main {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 0.64rem 0.32rem;
        width: 100%;
        background: linear-gradient(
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 68) 100%
        );
        .title {
          color: #fff;
          font-size: 0.5rem;
          font-weight: 550;
        }
        .sub-title {
          margin-top: 0.06rem;
          color: #fff;
          font-size: 0.28rem;
        }
        .confirm {
          margin-top: 0.88rem;
          color: #fff;
          background: #e6e6e6;
          &.active {
            background: #1b89fa;
          }
        }
        .agreements {
          display: flex;
          justify-content: center;
          margin-top: 0.36rem;
          color: #fff;
          font-size: 0.24rem;
        }
      }
    }
    .information-filling {
      display: flex;
      flex-direction: column;
      height: 100vh;
      .header {
        padding-top: 0.24rem;
        .title {
          padding: 0 0.24rem;
          color: #222;
          font-size: 0.42rem;
          font-weight: 550;
        }
        .sub-title {
          margin-top: 0.05rem;
          padding: 0 0.24rem;
          color: #999;
          font-size: 0.24rem;
        }
      }
      .main {
        position: relative;
        margin-top: 0.32rem;
        padding-bottom: 1.52rem;
        flex: 1;
        border-radius: 0.32rem 0.32rem 0 0;
        overflow: hidden;
        background: #fff;
        .form-wrap {
          padding: 0.32rem;
          height: 100%;
          overflow-y: scroll;
          .title {
            margin-bottom: 0.32rem;
            color: #333;
            font-size: 0.32rem;
            font-weight: 550;
            background: #fff;
          }
          .form-item {
            margin-bottom: 0.42rem;
            font-size: 0;
            .form-title {
              padding-left: 0.12rem;
              color: #a3a3a3;
              font-size: 0.26rem;
              font-weight: 550;
            }
            .input,
            .picker {
              margin-top: 0.12rem;
              padding: 0 0.24rem;
              height: 1rem;
              font-size: 0.26rem;
              border-radius: 0.24rem;
              background: #eaf6ff;
            }
            .input {
              width: 100%;
            }
            .picker {
              display: flex;
              align-items: center;
              color: #999;
              &.active {
                color: #333;
              }
            }
            .uploader-wrap {
              margin-top: 0.2rem;
              display: flex;
              justify-content: space-between;
              .photo {
                width: 3.3rem;
                height: 2.14rem;
                box-shadow: 0 0 10px 0 #e6e6e6;
                border-radius: 0.24rem;
              }
            }
          }
        }
        .btns {
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          padding: 0.32rem;
          width: 100%;
          .previous-step {
            margin-right: 0.32rem;
            flex: 1;
            color: #333;
            font-weight: 550;
            border: 1px solid #ddd;
          }
          .next-step {
            flex: 3;
            color: #fff;
            font-weight: 550;
            background: #212121;
          }
        }
      }
    }
  }
  .status {
    padding: 0.32rem;
    height: 100vh;
    background: #fff;
    .back,
    .pay {
      margin-top: 0.8rem;
      width: 100%;
      color: #fff;
      background: #212121;
    }
    .status-illus {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding-bottom: 3rem;
      .illus {
        width: 3.2rem;
        height: 3.2rem;
      }
      .title {
        margin-top: 0.32rem;
        color: #333;
        font-size: 0.36rem;
        font-weight: 550;
      }
      .desc {
        margin-top: 0.2rem;
        color: #666;
        font-size: 0.24rem;
        &.err {
          color: #f22237;
        }
      }
    }
  }
}
</style>
