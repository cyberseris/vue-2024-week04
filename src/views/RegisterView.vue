<template>
<!-- sign up -->
<div id="signUpPage" class="bg-yellow y-scroll">
  <div class="conatiner signUpPage vhContainer">
    <div class="side">
      <a href="#"><img class="logoImg" src="../../public/logo.png" alt=""></a>
      <img class="d-m-n" src="../../public/workImg.png" alt="workImg">
    </div>
    <div>
      <form class="formControls" action="index.html">
        <h2 class="formControls_txt">註冊帳號</h2>
        <label class="formControls_label" for="email">Email</label>
        <input class="formControls_input" type="email" id="email" name="email" placeholder="請輸入 email, ex: test@test.com" v-model="account" required>
        <label class="formControls_label" for="name">您的暱稱</label>
        <input class="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" v-model="nickname">
        <label class="formControls_label" for="pwd">密碼</label>
        <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="至少包含數字、英文大小寫、特殊符號" v-model="password" required>
        <label class="formControls_label" for="pwd">再次輸入密碼</label>
        <input class="formControls_input" type="password" name="confirmPassword" id="confirmPassword" placeholder="至少包含數字、英文大小寫、特殊符號" v-model="confirmPassword" required>
        
        <input class="formControls_btnSubmit" type="button" @click.prevent="signUp" value="註冊帳號">
        <!-- <a class="formControls_btnLink" href="#/">登入</a> -->
        <RouterLink class="formControls_btnLink" to="/">登入</RouterLink>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
  import axios from 'axios'
  import validator from 'validator'
  import showAlert from '@/utils/alert.js'
  import { ref } from 'vue'
  import { useRouter, RouterLink } from 'vue-router'

  const router = useRouter()
  const account = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const nickname = ref('')

  let flag = true

  const url = 'https://todolist-api.hexschool.io';
  
  const checkPasswordStrength = (password) => {
    let strength = 0;

    if(password.length >= 9){
      strength += 1;
    }

    if(password.match(/[a-z]/) && password.match(/[A-Z]/)){
      strength += 1;
    }

    if(password.match(/\d/)){
      strength += 1;
    }

    if(password.match(/[^a-zA-Z\d]/)){
      strength += 1;
    }

    return strength
  }

  const signUp = async () => {
    console.log("password.value!=confirmPassword.value",password.value,confirmPassword.value)
    if(!account.value || !password.value || !nickname.value){
      showAlert("註冊失敗","欄位不得為空","error","確認")
    }else if(!validator.isEmail(account.value)){
      flag = false
      console.log("isEmail", flag)
      showAlert("註冊失敗","帳號格式不符","error","確認")
    }else if(password.value != confirmPassword.value){
      flag = false
      console.log("兩次密碼輸入不同")
      showAlert("註冊失敗","兩次密碼輸入不同","error","確認")
    }else if(account.value == password.value || account.value == nickname.value || password.value == nickname.value){
      flag = false
      showAlert("註冊失敗","帳號、密碼或暱稱不能相同","error","確認")
    }else if(checkPasswordStrength(password.value)<4){
      flag = false
      showAlert("註冊失敗","密碼至少包含數字、英文大小寫、特殊符號，且密碼長度大於 8 位數","error","確認")
    }else if(flag){
      try{
        const res =await axios.post(`${url}/users/sign_up`, {
          email: account.value,
          password: password.value,
          nickname: nickname.value
        })

        if(res.data.status){
        showAlert("註冊成功","恭喜您註冊成功","success","確認")
        setTimeout(()=>{
          router.push("/");
        }, 1000)  
        }
      }catch(err){
        flag = true
        if(err.response.data.message=="用戶已存在"){
          flag = true
          showAlert("註冊失敗","用戶已存在","error","確認")
        }else if(err.response.data.message=="email 格式錯誤"){
          flag = true
          showAlert("註冊失敗","email 格式錯誤","error","確認")
        }else{
          flag = true
          showAlert("註冊失敗","輸入錯誤","error","確認")
          console.log("Error: ", err)
        }
      }
    }else{
      flag = true
      showAlert("輸入錯誤","資料輸入錯誤，請重新輸入。帳號、密碼或暱稱不能相同。密碼至少包含數字、英文大小寫、特殊符號，且密碼長度請大於 8 位數。","error","確認")           
    }
  }
</script>

<style>
.y-scroll{
  height: 100vh;
  overflow-y: scroll;
}

</style>