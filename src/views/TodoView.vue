<template>
<div id="todoListPage" class="bg-half y-scroll">
  <nav>
    <h1><a href="#">ONLINE TODO LIST</a></h1>
    <ul> 
      <li class="todo_sm"><a class="btn"><span>{{ nickname }} 您好</span></a></li>
      <li><a class="btn" @click.prevent="signOut">登出</a></li>
    </ul>
  </nav>
  <div class="conatiner todoListPage vhContainer">
    <div class="todoList_Content">
      <div class="inputBox">
        <input type="text" v-model="content" placeholder="新增待辦事項">
        <a class="btn d-flex justify-content-center" @click.prevent="addTodo">
          <i class="fa fa-plus"></i>
        </a>
      </div>
      <div v-if="!todoList.length" class="d-flex flex-column align-items-center mt-99">
        <div class="mb-3 font-style-NotoSans font-weight-400 fs-16 line-height-16">目前尚無待辦事項</div>
        <img class="emptyImg" src="../../public/empty.png" alt="">
      </div>
      <div class="todoList_list" v-else>
        <ul class="todoList_tab">
          <li><a href="#" class="todo-tab active">全部</a></li>
          <li><a href="#" class="todo-tab">待完成</a></li>
          <li><a href="#" class="todo-tab">已完成</a></li>
        </ul>
        <div class="todoList_items all-block">
          <ul class="todoList_item">
            <li class="d-flex justify-content-center" v-for="todo in todoList" :key="todo.id">
              <label class="todoList_label">
                <input class="todoList_input" type="checkbox" :checked="todo.status" @change="updateStatus(todo)">
                <span class="me-auto" v-if=(!todo.isEditable)>{{ todo.content }}</span>
                <input class="me-auto" type="text" v-model="todo.content" v-if=(todo.isEditable)>
              </label>
              <div class="d-flex w-160 pb-15"  v-if=(!isEditable)>
                <button class="btn btn-outline-primary btn-sm ms-auto me-1"  @click.prevent="todo.isEditable = !todo. isEditable; isEditable = !isEditable">編輯</button>
                <button type="button" class="btn btn-outline-danger btn-sm me-3"  @click.prevent="deleteTodo(todo.id)">刪除</button>
              </div>
              <div v-else class="d-flex w-160 pb-15">
                <button class="btn btn-outline-secondary btn-sm me-1"  @click.prevent="todo.isEditable = !todo.isEditable;isEditable = !isEditable;updateTodo(todo);">確認</button>
                <button class="btn btn-outline-secondary btn-sm me-3"  @click.prevent="todo.isEditable = !todo.isEditable;isEditable = !isEditable;">取消</button>
              </div>
            </li>
          </ul>
          <div class="todoList_statistics">
            <p> {{ countTodo }} 個未完成項目</p>
          </div>
        </div>
        <div class="todoList_items todo-block" style="display: none;">
          <ul class="todoList_item">
            <li class="d-flex justify-content-center" v-for="todo in todoList.filter(item=>!item.status)" :key="todo.id">
              <label class="todoList_label">
                <input class="todoList_input" type="checkbox" :checked="todo.status" @change="updateStatus(todo)">
                <span class="me-auto" v-if=(!todo.isEditable)>{{ todo.content }}</span>
                <input class="me-auto" type="text" v-model="todo.content" v-if=(todo.isEditable)>
              </label>
              <div class="d-flex w-160 pb-15"  v-if=(!isEditable)>
                <button class="btn btn-outline-primary btn-sm ms-auto me-1"  @click.prevent="todo.isEditable = !todo. isEditable; isEditable = !isEditable">編輯</button>
                <button type="button" class="btn btn-outline-danger btn-sm me-3"  @click.prevent="deleteTodo(todo.id)">刪除</button>
              </div>
              <div v-else class="d-flex w-160 pb-15">
                <button class="btn btn-outline-secondary btn-sm me-1"  @click.prevent="todo.isEditable = !todo.isEditable;isEditable = !isEditable;updateTodo(todo);">確認</button>
                <button class="btn btn-outline-secondary btn-sm me-3"  @click.prevent="todo.isEditable = !todo.isEditable;isEditable = !isEditable;">取消</button>
              </div>
            </li>
          </ul>
          <div class="todoList_statistics">
            <p> {{todoList.filter(item=>!item.status).length}} 個未完成項目</p>
          </div>
        </div>
        <div class="todoList_items done-block" style="display: none;">
          <ul class="todoList_item">
            <li class="d-flex justify-content-center" v-for="todo in todoList.filter(item=>item.status)" :key="todo.id">
              <label class="todoList_label">
                <input class="todoList_input" type="checkbox" :checked="todo.status" @change="updateStatus(todo)">
                <span class="me-auto" v-if=(!todo.isEditable)>{{ todo.content }}</span>
                <input class="me-auto" type="text" v-model="todo.content" v-if=(todo.isEditable)>
              </label>

              <div class="d-flex w-160 pb-15"  v-if=(!isEditable)>
                <button class="btn btn-outline-primary btn-sm ms-auto me-1"  @click.prevent="todo.isEditable = !todo. isEditable; isEditable = !isEditable">編輯</button>
                <button type="button" class="btn btn-outline-danger btn-sm me-3"  @click.prevent="deleteTodo(todo.id)">刪除</button>
              </div>

              <div v-else class="d-flex w-160 pb-15">
                <button class="btn btn-outline-secondary btn-sm me-1"  @click.prevent="todo.isEditable = !todo.isEditable;isEditable = !isEditable;updateTodo(todo);">確認</button>
                <button class="btn btn-outline-secondary btn-sm me-3"  @click.prevent="todo.isEditable = !todo.isEditable;isEditable = !isEditable;">取消</button>
              </div>
            </li>
          </ul>
          <div class="todoList_statistics">
            <p> {{todoList.filter(item=>item.status).length}} 個已完成項目</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import $ from 'jquery'
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const todoList = ref([])
  const content = ref([])
  const countTodo = ref(0)
  const nickname = ref('')
  const isEditable = ref(false)
  const url = 'https://todolist-api.hexschool.io';
  
  let token = ''

  const getCookie = (name) => {
      let pattern = new RegExp('(?:^|; )' + encodeURIComponent(name) + '=([^;]*)');

      if(document.cookie){
        let match = document.cookie.match(pattern);
        return match[1].split("expires=")[0];
      }else{
        router.push('/');
      }      
  }

  const deleteCookie = (name) => {
    document.cookie = name + '= ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/vue-2024-week04';
    
    //本機測試 "/"
/*     document.cookie = name + '= ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; */
  }

  const signOut = async () => {
  await axios.post(`${url}/users/sign_out`, {}, {
    headers: {
            Authorization: token
    }
  })
  .then(res => {
    if(res.data.status){
      deleteCookie('hexschoolTodo')

      Swal.fire({
        title: "登出成功",
        icon: "success"
      })

      setTimeout(()=>{
        router.push('/');
      }, 1000)
    }
  })
  .catch(err => {
    console.log("Error: ", err)
  })
  }

  const expiresStatus = () => {
    const expiresTime = new Date(getCookie('hexschoolTodo')?.split('expires=')[1])
    const currentTime = new Date()
    if(currentTime > expiresTime){
      deleteCookie('hexschoolTodo')
      Swal.fire({
        title: "驗證失敗",
        text: "登入超時，請重新登入系統",
        icon: "error"
      })
      setTimeout(()=>{
        router.push('/');
      }, 1000)
    }
  }

  const getTodos = async () => {
    if(token){
      await axios.get(`${url}/todos`, {
        headers:{
          Authorization:token
        }
      })
      .then(res => {
        if(res.data.status){
          todoList.value = res.data.data  
          countTodo.value = todoList.value.filter(todo => !todo.status).length
          todoList.value.forEach(todo => {
            todo.isEditable = false
          })
        }
      })
      .catch(err => {
        console.log("Error: ", err)
      })
    }
  }

  const addTodo = async () => {
    await axios.post(`${url}/todos`, {content: content.value} , {
      headers:{
        Authorization:token
      }
    })
    .then(res => {
      if(res.data.status){
        Swal.fire({
          title: "新增成功",
          text: "成功新增待辦事項",
          icon: "success"
        })
        setTimeout(()=>{
          getTodos()
        }, 1000)
      }else{
        Swal.fire({
          title: "新增失敗",
          text: "新增待辦事項失敗",
          icon: "error"
        })
      }
    })
    .catch(error => {
      console.log("Error: ", error)
    })
  }

  const updateTodo = async (todo) => {
    await axios.put(`${url}/todos/${todo.id}`, {content:todo.content}, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      if(res.data.status){
        getTodos() 
        Swal.fire({
          title: "更新成功",
          text: "成功更新待辦事項",
          icon: "success"
        })
        setTimeout(()=>{
          getTodos()
        }, 1000)
      }
    })
    .catch(err => {
      console.log("Error:　", err)
    })
  }

  const deleteTodo = async (id) => {
    Swal.fire({
      title: "確定刪除?",
      text: "你確定要刪除這個待辦事項？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "刪除",
      cancelButtonText: "取消"
    }).then((result) => {
      if(result.isConfirmed){
        axios.delete(`${url}/todos/${id}`,{
            headers:{
              Authorization:token
            }
          })
          .then(res => {
            if(res.data.status){
              Swal.fire({
                title: "刪除成功",
                text: "成功刪除待辦事項",
                icon: "success"
              })
              setTimeout(()=>{
                getTodos()
              }, 1000)
            }
          })
          .catch(err => {
            console.log("Error: ", err)
          })
      }
    });
  }

  const updateStatus = async(todo) => {
    axios.patch(`${url}/todos/${todo.id}/toggle`, {
      status:!todo.status
    }, {
      headers:{
        Authorization:token
      }
    })
    .then(async res=>{
      if(res.status){
        await getTodos()
        countTodo.value = todoList.value.filter(item => !item.status).length
      }
    })
    .catch(err => {
      console.log("Error: ", err)
    })
  }

  onMounted(() => {
    token = getCookie('hexschoolTodo')?.split('expires')[0]
    expiresStatus();
    getTodos();

    const urlParams = new URLSearchParams(window.location.search);
    nickname.value = urlParams.get('name')
  })

  $(document).on("click", ".todo-tab", function(e){
    e.preventDefault();
    getTodos();
    $(".todo-tab").removeClass("active");
    $(this).addClass("active")

    var index = $(this).parent().index();

    $(".all-block, .todo-block, .done-block").hide()

    if(index === 0){
      $(".all-block").show();
    }else if(index === 1){
      $(".todo-block").show();
    }else if(index === 2){
      $(".done-block").show();
    }
  })
</script>

<style>
  .emptyImg{
    width: 240px;
    height: 250px;
  }
  .mt-99{
    margin-top: 99px;
  }

  .font-style-NotoSans{
    font-family: Noto Sans TC;
  }

  .font-weight-400{
    font-weight: 400;
  }

  .fs-16{
    font-size: 16px;
  }

  .line-height-15{
    line-height: 1.5;
  }

  .w-150{
    width: 150px;
  }

  .w-160{
    width: 180px;
  }

  .pb-15{
    padding-bottom: 15px !important;
  }

  .y-scroll{
    height: 100vh;
    overflow-y: auto;
  }
</style>