import{e as p,H as o,ae as u,o as d,c as g,X as i,v as f,af as m}from"./index-B3kCtg6Q.js";const h=p({__name:"Button",props:{color:{},textColor:{}},setup(a){const r=a,n=o(()=>{const t=[];if(r.color){t.push(`bg-[${r.color}]`),t.push(`dark:bg-[${r.color}]`);const s=m(r.color,30);t.push(`hover:!bg-[${s}]`),t.push(`dark:hover:!bg-[${s}]`)}return r.textColor&&(t.push(`text-[${r.textColor}]`),t.push(`dark:text-[${r.textColor}]`)),t}),{class:e}=u(),l=o(()=>e?typeof e!="string"?[]:e.split(" ").map(t=>"!"+t.trim()):[]),c=o(()=>["px-2","py-1","bg-gray-800","text-gray-200","dark:bg-gray-200","dark:text-gray-800","hover:bg-gray-700","dark:hover:bg-gray-300","rounded-md","cursor-pointer","font-bold","flex","items-center","justify-center",...l.value,...n.value]);return(t,s)=>(d(),g("button",{class:f(c.value)},[i(t.$slots,"default")],2))}});export{h as _};