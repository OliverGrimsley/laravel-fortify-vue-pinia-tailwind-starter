import{d as u,u as p,a as c,o as r,c as n,f as o,g as l,e as i,t as f,j as _,w as b}from"./app-4efa1d98.js";import{_ as a}from"./textInput.vue_vue_type_script_setup_true_lang-e1740d91.js";const V={class:"flex self-center w-1/2 rounded border bg-slate-300 border-slate-400"},w=["onSubmit"],x=o("div",{class:"text-center text-3xl text-slate-500 mt-4"},"Register",-1),y={class:"mb-4"},g={class:"mb-4"},v={class:"mb-4"},k={class:"mb-4"},S={class:"mb-4"},h=o("div",{class:"mb-4 flex justify-end"},[o("button",{type:"submit",class:"mx-4 rounded bg-blue-500 px-4 py-2 font-medium text-white"},"Register")],-1),U={key:0,class:"text-red-500 text-center"},M=u({__name:"register",setup(N){const d=p(),e=c({name:"",email:"",password:"",password_confirmation:"",regkey:""}),m=async()=>{await d.register(e)};return(j,s)=>(r(),n("div",V,[o("form",{onSubmit:b(m,["prevent"]),class:"flex w-full flex-col justify-items-center"},[x,o("div",y,[l(a,{modelValue:e.name,"onUpdate:modelValue":s[0]||(s[0]=t=>e.name=t),label:"Name"},null,8,["modelValue"])]),o("div",g,[l(a,{modelValue:e.email,"onUpdate:modelValue":s[1]||(s[1]=t=>e.email=t),label:"Email"},null,8,["modelValue"])]),o("div",v,[l(a,{modelValue:e.password,"onUpdate:modelValue":s[2]||(s[2]=t=>e.password=t),label:"Password",type:"password"},null,8,["modelValue"])]),o("div",k,[l(a,{modelValue:e.password_confirmation,"onUpdate:modelValue":s[3]||(s[3]=t=>e.password_confirmation=t),label:"Confirm Password",type:"password"},null,8,["modelValue"])]),o("div",S,[l(a,{modelValue:e.regkey,"onUpdate:modelValue":s[4]||(s[4]=t=>e.regkey=t),label:"Registration Key"},null,8,["modelValue"])]),h,i(d).errorMSG?(r(),n("div",U,f(i(d).errorMSG),1)):_("",!0)],40,w)]))}});export{M as default};