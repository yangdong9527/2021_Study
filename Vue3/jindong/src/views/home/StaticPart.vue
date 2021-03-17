<template>
    <div class="position">
      <span class="iconfont position__icon">&#xe64f;</span>
      北京现代水水京现代水水京现代水水京现代水水京现代水水水水水水
      <span class="iconfont position__notice">&#xe7e5;</span>
    </div>
    <div class="search">
      <span class="iconfont search__icon">&#xe67d;</span>
      <span class="search__text">山姆会员商店优惠商品</span>
    </div>
    <div class="banner">
      <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
    </div>
    <div class="icons">
      <div class="icons__item" v-for="(item, index) in iconList" :key="index">
        <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" class="icons__item__img">
        <div class="icons__item_desc">{{item.desc}}</div>
      </div>
    </div>
    <div class="gap"></div>
</template>

<script>
export default {
  setup() {
    const iconList = [
      { imgName: "超市", desc: "超市便利"},
      { imgName: "菜市场", desc: "菜市场"},
      { imgName: "水果店", desc: "水果店"},
      { imgName: "鲜花", desc: "鲜花绿植"},
      { imgName: "医药健康", desc: "医药健康"},
      { imgName: "家居", desc: "家居时尚"},
      { imgName: "蛋糕", desc: "烘培蛋糕"},
      { imgName: "签到", desc: "签到"},
      { imgName: "大牌免运", desc: "大牌免运"},
      { imgName: "红包", desc: "红包套餐"},
    ]
    return {iconList}
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variable.scss';
.position {
  position: relative;
  padding: .16rem .24rem .16rem 0;
  font-size: .16rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .position__icon {
    position: relative;
    font-size: .2rem;
    top: .01rem;
  }
  .position__notice {
    position: absolute;
    top: .16rem;
    right: 0rem;
    font-size: .2rem;
  }
}
.search {
  width: 100%;
  height: .32rem;
  background: #f5f5f5;
  border-radius: .16rem;
  font-size: .14rem;
  color: #b7b7b7;
  line-height: 16px;
  padding: .08rem .16rem;
  box-sizing: border-box;
  margin-bottom: .12rem;
  .search__icon {
    margin-right: .12rem;
  }
}
.banner {
  height: 0;
  padding-bottom: 25.4%;
  .banner__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  font-size: .12rem;
  margin-top: .16rem;
  .icons__item {
    width: 20%;
    margin-bottom: .16rem;
    text-align: center;
    .icons__item__img {
      width: .4rem;
      height: .4rem;
      margin-bottom: .06rem;
    }
  }
}
.gap {
  height: .1rem;
  margin: 0 -.18rem;
  background-color: $content-color;
}
</style>