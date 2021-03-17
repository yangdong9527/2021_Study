<template>
  <div class="wrapper">
    <img class="wrapper__img" src='http://www.dell-lee.com/imgs/vue3/user.png' />
    <div class="wrapper__input">
      <input 
        type="text" 
        v-model="username"
        class="wrapper__input__content" 
        placeholder="请输入用户名"
      />
    </div>
    <div class="wrapper__input">
      <input 
        type="password" 
        v-model="password"
        class="wrapper__input__content" 
        placeholder="请输入密码"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLoginClick">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
  </div>
  <Toast v-if="show" :message="message" />
</template>

<script>
import {useRouter} from 'vue-router'
import {reactive, toRefs} from 'vue'
import {post} from '@/utils/request'
import Toast, {useToastEffect} from '../../components/Toast'
// 前往注册页面
const useRegisterEffect = () => {
  let router = useRouter()
  const handleRegisterClick = () => {
    router.push({name: 'Register'})
  }
  return {handleRegisterClick}
}

// 登录逻辑
const userLoginEffect = (showToast) => {
  let router = useRouter()
  let data = reactive({username: '', password: ''})
  const handleLoginClick = async () => {
    try {
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if(result?.errno === 0) {
        localStorage.setItem('isLogin', true)
        router.replace({name: 'Home'})
      } else {
        showToast('登录失败')
      }
    } catch (error) {
      showToast('请求失败')
    }
  }
  let {username, password} = toRefs(data)
  return {
    username, password,
    handleLoginClick
  }
}

export default {
  name: 'Login',
  components: {
    Toast
  },
  setup() {
    const {handleRegisterClick} = useRegisterEffect()
    const {show, message, showToast} = useToastEffect()
    const {username, password, handleLoginClick} = userLoginEffect(showToast)
    return {
      username, password,
      handleRegisterClick,
      handleLoginClick,
      show, message
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  padding: 0 .4rem;
  box-sizing: border-box;
  .wrapper__img {
    width: .66rem;
    height: .66rem;
    display: block;
    margin: 0 auto;
    margin-bottom: .4rem
  }
  &__input {
    margin-bottom: .16rem;
    height: .48rem;
    background-color: #f9f9f9;
    border: 1px solid rgba($color: #000, $alpha: .1);
    border-radius: .06rem;
    &__content {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background-color: transparent;
      padding: 0 .16rem;
      line-height: .24rem;
      font-size: .16rem;
      &::placeholder {
        color: rgba($color: #000000, $alpha: .5);
      }
    }
  }
  &__login-button {
    margin: .32rem 0 .16rem;
    height: .48rem;
    background-color:#0091FF;
    box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
    border-radius: .04rem;
    font-size: .16rem;
    text-align: center;
    color: #fff;
    line-height: .48rem;
  }
  &__login-link {
    font-size: .14rem;
    color: rgba($color: #000000, $alpha: .5);
    text-align: center;
  }
}
</style>