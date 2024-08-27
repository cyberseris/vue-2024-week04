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
            <!-- <a class="formControls_btnLink" href="#/register">註冊帳號</a> -->
            <RouterLink class="formControls_btnLink" to="/register">註冊帳號</RouterLink>
          </form>
        </div>
      </div>
    </div>
</template>
    
<script setup>

</script>