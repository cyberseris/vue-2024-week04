import{u,r,c as _,a as o,w as n,v as c,b as p,o as f}from"./index-D1Q1qJPL.js";import{_ as h,a as g}from"./workImg-CTHQzf_B.js";import{a as v,S as i}from"./sweetalert2.all-Dj0tyx5V.js";const w={id:"loginPage",class:"bg-yellow"},x={class:"conatiner loginPage vhContainer"},C=o("div",{class:"side"},[o("a",{href:"#"},[o("img",{class:"logoImg",src:h,alt:""})]),o("img",{class:"d-m-n",src:g,alt:"workImg"})],-1),b={class:"formControls",action:"index.html"},k=o("h2",{class:"formControls_txt"},"最實用的線上代辦事項服務",-1),T=o("label",{class:"formControls_label",for:"email"},"Email",-1),y=o("label",{class:"formControls_label",for:"pwd"},"密碼",-1),S=o("a",{class:"formControls_btnLink",href:"./register"},"註冊帳號",-1),V="https://todolist-api.hexschool.io",$={__name:"LoginView",setup(B){const d=u(),s=r(""),a=r(""),m=async()=>{s.value&&a.value?await v.post(`${V}/users/sign_in`,{email:s.value,password:a.value}).then(t=>{if(t.data.status){let e=new Date;e.setTime(e.getTime()+60*60*1*1e3),e=e.toUTCString(),document.cookie=`hexschoolTodo=${t.data.token}expires=`+e+";",i.fire({title:"登入成功",icon:"success"}),setTimeout(()=>{d.push(`/todo?name=${t.data.nickname}`)},1e3)}else i.fire({title:"登入失敗",text:"請重新登入",icon:"error"})}).catch(t=>{console.log("Error: ",t)}):i.fire({title:"輸入錯誤",text:"資料不得為空",icon:"error"})};return(t,e)=>(f(),_("div",w,[o("div",x,[C,o("div",null,[o("form",b,[k,T,n(o("input",{class:"formControls_input",type:"text",id:"email",name:"email",placeholder:"請輸入 email","onUpdate:modelValue":e[0]||(e[0]=l=>s.value=l),required:""},null,512),[[c,s.value]]),y,n(o("input",{class:"formControls_input",type:"password",name:"pwd",id:"pwd",placeholder:"請輸入密碼","onUpdate:modelValue":e[1]||(e[1]=l=>a.value=l),required:""},null,512),[[c,a.value]]),o("button",{class:"formControls_btnSubmit",onClick:p(m,["prevent"])},"登入"),S])])])]))}};export{$ as default};
