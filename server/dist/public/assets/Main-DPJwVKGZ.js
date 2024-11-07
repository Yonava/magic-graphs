import{d as i,o as s,c as n,a as t,t as d,r as p,F as _,b as f,e as l,w as g,f as m,_ as v,g as h,h as b,i as x,j as y,k}from"./index-CQQOVkFF.js";const w={class:"group hover:scale-110 transition-all duration-500 ease-out relative flex items-center justify-center"},j={class:"relative w-60 h-60 flex items-center justify-center"},C=["src","alt"],B={class:"absolute top-0 w-full h-full opacity-0 group-hover:opacity-100 transition duration-500 bg-gray-900 bg-opacity-90 rounded-2xl p-4"},M={class:"text-white font-bold"},$={class:"text-center font-bold text-2xl mt-4 transition duration-500"},z=i({__name:"ProductItem",props:{product:{}},setup(u){return(o,r)=>(s(),n("div",w,[t("div",null,[t("div",j,[t("img",{src:o.product.menu.thumbnail,alt:o.product.menu.name,class:"w-full h-full object-cover rounded-2xl"},null,8,C),t("div",B,[t("p",M,d(o.product.menu.description),1)])]),t("h2",$,d(o.product.menu.name),1)]),r[0]||(r[0]=t("div",{class:"absolute top-[-20%] -z-10 w-[150%] h-[150%] pointer-events-none"},[t("div",{class:"absolute inset-0 group-hover:bg-purple-500 blur-2xl opacity-30 rounded-full transition duration-500"}),t("div",{class:"relative text-yellow-500 text-6xl font-bold group-hover:w-full group-hover:h-full transition duration-500"})],-1))]))}}),S={class:"flex items-center justify-center gap-10"},E=i({__name:"ProductCatalog",props:{products:{}},setup(u){return(o,r)=>{const a=p("router-link");return s(),n("div",S,[(s(!0),n(_,null,f(o.products,e=>(s(),n("div",null,[l(a,{to:e.route.path},{default:g(()=>[l(z,{product:e},null,8,["product"])]),_:2},1032,["to"])]))),256))])}}}),F={class:"w-full h-full relative flex items-center justify-center flex-col bg-gradient-to-tl to-purple-100 from-gray-50 dark:to-gray-900 dark:via-gray-900 dark:from-purple-900 text-gray-800 dark:text-gray-50"},N=i({__name:"Main",setup(u){const r=Object.values(Object.assign({"/src/menu/info.ts":v,"/src/playground/graph/info.ts":h,"/src/playground/shape/info.ts":b,"/src/products/markov-chains/info.ts":x,"/src/products/search-visualizer/info.ts":y,"/src/products/set-visualizer/info.ts":k})).map(e=>e.default),a=m(r.filter(e=>e==null?void 0:e.menu));return(e,c)=>(s(),n("div",F,[c[0]||(c[0]=t("div",{class:"mb-10 text-center"},[t("h1",{class:"font-black text-7xl bg-gradient-to-tr dark:from-purple-700 dark:to-orange-600 from-purple-500 to-orange-500 text-transparent bg-clip-text p-4"}," Magic Computer Science "),t("h3",{class:"font-bold text-2xl"}," Select An Experience To Begin ")],-1)),l(E,{products:a.value},null,8,["products"])]))}});export{N as default};