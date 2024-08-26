<template>
<!-- sign up -->
<div id="signUpPage" class="bg-yellow">
  <div class="conatiner signUpPage vhContainer">
    <div class="side">
      <a href="#"><img class="logoImg" src="../../public/logo.png" alt=""></a>
      <img class="d-m-n" src="../../public/workImg.png" alt="workImg">
    </div>
    <div>
      <form class="formControls" action="index.html">
        <h2 class="formControls_txt">註冊帳號</h2>
        <label class="formControls_label" for="email">Email</label>
        <input class="formControls_input" type="email" id="email" name="email" placeholder="請輸入 email" v-model="account" required>
        <label class="formControls_label" for="name">您的暱稱</label>
        <input class="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" v-model="nickname">
        <label class="formControls_label" for="pwd">密碼</label>
        <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" v-model="password" required>
        <label class="formControls_label" for="pwd">再次輸入密碼</label>
        <input class="formControls_input" type="password" name="confirmPassword" id="confirmPassword" placeholder="請再次輸入密碼" v-model="confirmPassword" required>
        <input class="formControls_btnSubmit" type="button" @click.prevent="signUp" value="註冊帳號">
        <a class="formControls_btnLink" href="/">登入</a>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import validator from 'validator';
  import { ref } from 'vue'
  import { useRouter } from 'vue-router';

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
    if(password.value!=confirmPassword.value){
      Swal.fire({
        title: "註冊失敗",
        text: "兩次密碼輸入不同",
        icon: "error"
      })
    }

    if(account.value == password.value || account.value == nickname.value || password.value == nickname.value){
      flag = false
      Swal.fire({
        title: "註冊失敗",
        text: "帳號、密碼或暱稱不能相同",
        icon: "error"
      })
    }
    if(!validator.isEmail(account.value)){
      flag = false
      Swal.fire({
        title: "註冊失敗",
        text: "帳號格式不符",
        icon: "error"
      })
    }

    if(checkPasswordStrength(password.value)<4){
      flag = false
      Swal.fire({
        title: "註冊失敗",
        text: "密碼至少包含數字、英文大小寫、特殊符號",
        icon: "error"
      })
    }

    console.log("account.value && password.value && nickname.value && flag", account.value, password.value, nickname.value, flag)
    if(account.value && password.value && nickname.value && flag){
        await axios.post(`${url}/users/sign_up`,{
          email: account.value,
          password: password.value,
          nickname: nickname.value
        })
        .then((res) => {
          if(res.data.status){
            Swal.fire({
              title: "註冊成功",
              text: "恭喜您註冊成功",
              icon: "success"
            })
            setTimeout(()=>{
              router.push("/");
            }, 1000)  
          }
        })
        .catch(error => {
          if(error.response.data.message=="用戶已存在"){
            Swal.fire({
              title: "註冊失敗",
              text: "用戶已存在",
              icon: "error"})
          }else if(error.response.data.message=="email 格式錯誤"){
            Swal.fire({
              title: "註冊失敗",
              text: "email 格式錯誤",
              icon: "error"})
          }else{
            Swal.fire({
              title: "註冊失敗",
              text: "輸入錯誤",
              icon: "error"})
          }
        })
    }else{
        Swal.fire({
        title: "輸入錯誤",
        text: "資料輸入錯誤，請重新輸入",
        icon: "error"
      })           
    }
  }
</script>