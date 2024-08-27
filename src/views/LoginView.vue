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
        <a class="formControls_btnLink" href="#/register">註冊帳號</a>
      </form>
    </div>
  </div>
</div>
</template>

<script setup>
import axios from 'axios'
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const account = ref('')
const password = ref('')

const url = 'https://todolist-api.hexschool.io';

const signIn = async () => {
    if(account.value && password.value){
      await axios.post(`${url}/users/sign_in`, {
        email: account.value,
        password: password.value
      })
      .then(res => {
        if(res.data.status){
          let date = new Date();
          date.setTime(date.getTime()+60*60*1*1000);
          date = date.toUTCString();
          document.cookie = `hexschoolTodo=${res.data.token}`+"expires="+date+";";
          Swal.fire({
            title: "登入成功",
            icon: "success"
          })

          setTimeout(()=>{
            router.push(`/todo?name=${res.data.nickname}`)
          }, 1000)

        }else{
          Swal.fire({
            title: "登入失敗",
            text: "請重新登入",
            icon: "error"
          })
        }
      })
      .catch(error => {
        console.log("Error: ", error)
      })
    }else{
      Swal.fire({
        title: "輸入錯誤",
        text: "資料不得為空",
        icon: "error"
      })
    }
  }
</script>