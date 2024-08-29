<template>
<div id="loginPage" class="bg-yellow">
  <div class="conatiner loginPage vhContainer ">
    <div class="side">
      <a href="#"><img class="logoImg" src="../../public/logo.png" alt=""></a>
      <img class="d-m-n" src="../../public/workImg.png" alt="workImg">
    </div>
    <div>
      <form class="formControls" action="index.html">
        <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
        <label class="formControls_label" for="email">Email</label>
        <input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" v-model="account" required>
        <label class="formControls_label" for="pwd">密碼</label>
        <input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" v-model="password" required>
        <button class="formControls_btnSubmit"  @click.prevent="signIn">登入</button>
        <RouterLink class="formControls_btnLink" to="/register">註冊帳號</RouterLink>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
import axios from 'axios'
import showAlert from '@/utils/alert.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const account = ref('')
const password = ref('')

const url = 'https://todolist-api.hexschool.io';

const signIn = async () => {
    if(account.value && password.value){
      try{
        const res = await axios.post(`${url}/users/sign_in`, {
        email: account.value,
        password: password.value
      })
    
      if(res.data.status){
        let date = new Date();
        date.setTime(date.getTime()+60*60*1*1000);
        date = date.toUTCString();
        document.cookie = `hexschoolTodo=${res.data.token}`+"expires="+date+";";
        showAlert("登入成功","","success","確認")

        setTimeout(()=>{
          router.push(`/todo?name=${res.data.nickname}`)
        }, 1000)
      }
      }catch(err){
        showAlert("登入失敗","帳號密碼驗證錯誤","error","確認");
        console.log("Error: ", err)
      }
    }else{
      showAlert("輸入錯誤","資料不得為空","error","確認");
    }
}
</script>