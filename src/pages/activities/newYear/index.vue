<template>
  <div class="container">
    <img class="header" src="./images/header_bg.png" alt="" />
    <div class="part">
      <img class="frame" src="./images/frame_1.png" alt="" />
      <div class="content">
        <div class="title">年货满满归家路，不论成就如何，生活总要满载欢笑</div>
      </div>
    </div>
    <div class="part">
      <img class="frame" src="./images/frame_2.png" alt="" />
      <div class="content">
        <div class="title">探寻文化创意，迎接年货新花样</div>
      </div>
    </div>
    <div class="part">
      <img class="frame" src="./images/frame_3.png" alt="" />
      <div class="content">
        <div class="title">乡愁是一段归家的思念，更是一种无法形容的味道</div>
      </div>
    </div>
    <div class="footer">
      <img class="footer-bg" src="./images/footer_bg.png" alt="" />
      <div class="content">
        <p>活动时间：大年初八截止</p>
        <p style="margin-top: 0.48rem">活动玩法：</p>
        <p>
          1.在视频号上传一张或者一段，在自己家乡过年的照片或者短视频，里面包含在诚信星球上购买的任意一款产品！
        </p>
        <p>2.编辑文案：我在（自己所在的城市）与诚信星球一起过大年</p>
        <p>3.@（诚信星球）官方视频号</p>
        <p style="margin-top: 0.48rem">活动奖励：</p>
        <p>一等奖（1名）：乡村振兴农产品3份</p>
        <p>二等奖（2名）：乡村振兴农产品2份</p>
        <p>三等奖（3名）：乡村振兴农产品1份</p>
        <p>参与奖：每个人获得5块钱无门槛优惠券</p>
        <div class="award-list">
          <div
            class="award-item"
            v-for="(item, index) in awardList"
            :key="index"
          >
            <img
              class="award-cover"
              :src="require(`./images/award_${index + 1}.png`)"
              alt=""
            />
            <div class="award-name">{{ item }}</div>
          </div>
        </div>
        <div class="qrcode-wrap">
          <img class="qrcode" src="./images/qrcode.png" alt="" />
          <div class="qrcode-desc">添加诚信星球官方客服号领取奖品</div>
        </div>
        <div class="note">活动解释权归诚信星球所有</div>
      </div>
    </div>
  </div>

  <div class="bag-wrap">
    <img class="bag" src="./images/bag.png" alt="" />
    <div class="bag-num">99</div>
  </div>
</template>

<script setup lang="ts">
const awardList = [
  "赤峰小米区域公共品牌内蒙古赤峰大庙镇歆谷乡黄小米5斤",
  "内蒙古赤峰大庙草莓番茄孕妇水果西红柿5斤",
  "湖北宜昌秭归县秭归脐橙1箱/9斤国家地理标志产品",
];
</script>

<style lang="scss" scoped>
.container {
  padding-bottom: 1rem;
  font-size: 0;
  background: #821e0f;
  .header {
    width: 100%;
  }
  .part {
    position: relative;
    margin-top: 0.22rem;
    .frame {
      margin-left: -0.04rem;
      width: 100%;
    }
    .content {
      position: absolute;
      left: 50%;
      top: 1.06rem;
      transform: translateX(-50%);
      width: 7.1rem;
      .title {
        color: #fcfbd2;
        font-size: 0.24rem;
        text-align: center;
      }
    }
  }
  .footer {
    position: relative;
    .footer-bg {
      width: 100%;
    }
    .content {
      position: absolute;
      left: 50%;
      top: 2.2rem;
      transform: translateX(-50%);
      padding: 0.32rem;
      width: 7.1rem;
      color: #fcfbd2;
      font-size: 0.24rem;
      font-weight: 300;
      .award-list {
        display: flex;
        justify-content: space-between;
        margin-top: 0.48rem;
        .award-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 2rem;
          .award-cover {
            width: 1.6rem;
            height: 1.6rem;
            border-radius: 50%;
          }
          .award-name {
            margin-top: 0.2rem;
            color: #fcfbd2;
            font-size: 0.24rem;
            font-weight: 300;
          }
        }
      }
      .qrcode-wrap {
        margin-top: 0.6rem;
        text-align: center;
        .qrcode {
          width: 2rem;
          height: 2rem;
        }
        .qrcode-desc {
          margin-top: 0.3rem;
        }
      }
      .note {
        margin-top: 0.5rem;
        color: #bfbd7d;
        font-size: 0.2rem;
        text-align: right;
      }
    }
  }
}

.bag-wrap {
  position: fixed;
  right: 0.24rem;
  bottom: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  .bag {
    width: 1.9rem;
    height: 1.74rem;
  }
  .bag-num {
    display: flex;
    align-items: center;
    margin-top: -0.16rem;
    padding: 0 0.16rem;
    width: fit-content;
    height: 0.4rem;
    color: #fff;
    font-size: 0.24rem;
    line-height: 1;
    background: linear-gradient(180deg, #f66b46 0%, #e33825 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    border-radius: 0.2rem;
  }
}
</style>
