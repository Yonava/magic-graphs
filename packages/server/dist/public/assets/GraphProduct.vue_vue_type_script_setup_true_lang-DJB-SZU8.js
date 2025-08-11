import{_ as bn,h as fn,i as gn,j as mn,k as vn,l as hn,m as yn,n as kn,p as _n,q as wn,s as Cn,u as xn,v as Sn,aE as ct,ae as $n,aF as Ln,aG as lt,aH as st,ap as Kt,aI as En,ah as Bn,d as h,a4 as R,E as C,o as i,A as m,w as p,a7 as v,b as d,aJ as Dn,c as g,a as b,I as x,Z as I,y as f,aK as zn,g as B,D as Et,aL as jt,F as P,f as j,t as D,C as S,Q as In,W as A,al as ht,aM as gt,S as On,aN as W,z as H,X as Gt,am as Pn,ad as w,ac as nt,aO as Tn,aP as V,aQ as Z,aR as Mn,aS as Bt,ab as Vt,aT as An,aU as Hn,aV as U,aW as Ut,aX as Rn,aY as Dt,aZ as Fn,a_ as Yt,a$ as Kn,b0 as jn,b1 as Gn,b2 as Nt,b3 as yt,b4 as Wt,aa as ut,r as q,af as kt,b5 as Zt,J as dt,b6 as Xt,e as K,b7 as Vn,b8 as _t,b9 as qt,ba as vt,bb as zt,bc as It,bd as Ot,be as Un,bf as Yn,bg as Nn,bh as Wn,bi as Zn,as as Xn}from"./index-BBtyRjRC.js";import{C as qn,B as Jn,_ as Qn}from"./Graph.vue_vue_type_script_setup_true_lang-TUCcCEGm.js";import{_ as Jt,t as te}from"./Button.vue_vue_type_script_setup_true_lang-8adz9tzV.js";import{_ as O}from"./Icon.vue_vue_type_script_setup_true_lang-pasRu3mZ.js";import{_ as ne}from"./TutorialHint.vue_vue_type_script_setup_true_lang-CQBZy_mF.js";import{u as ee,a as mt,z as oe,M as re,b as ae,e as ie}from"./ResponsiveCanvas.vue_vue_type_script_setup_true_lang-CAYqa9Pu.js";const le=Object.assign({"/src/menu/info.ts":bn,"/src/playground/graph/info.ts":fn,"/src/playground/shape/info.ts":gn,"/src/products/basic-search/info.ts":mn,"/src/products/binary-trees/info.ts":vn,"/src/products/dijkstras/info.ts":hn,"/src/products/graph-sandbox/info.ts":yn,"/src/products/markov-chains-legacy/info.ts":kn,"/src/products/markov-chains/info.ts":_n,"/src/products/min-spanning-tree/info.ts":wn,"/src/products/network-flow/info.ts":Cn,"/src/products/search-visualizer/info.ts":xn,"/src/products/set-visualizer/info.ts":Sn}),et=Object.values(le).flatMap(e=>e.default);et.map(e=>e.route);const dr=et.reduce((e,n)=>(e[n.productId]=n,e),{}),wt=et.reduce((e,n)=>(e[n.route.path]=n,e),{}),se=e=>et.map(o=>o.simulations).filter(Boolean).map(o=>o(e)).flat(),ce=(e,n)=>{const t=ct();if(!n){const a=wt[t.path];if(!a)throw new Error(`product not found for ${t.path}`);n=a.simulations}return(n??se)(e)},ue=()=>{const e=ct(),n=$n(),t=a=>{const r=e.query.rid;return typeof r=="string"&&r.length>0?`${a}?rid=${r}`:a};return{navigate:a=>{var u,c;const r=(c=(u=a.route)==null?void 0:u.redirect)==null?void 0:c.toString(),s=r==null?void 0:r.startsWith("http");if(r&&s)return window.open(r,"_blank");n.push(t(a.route.path))},productLink:t}},Pt=["sandbox","algorithms","data structures","math","developer tools"],de=()=>{const e=ct();return wt[e.path]},pe=e=>"redirect"in e.route,be=(e,n)=>{const t=ct();if(!n){const u=wt[t.path];if(!u)throw new Error(`no product found for route ${t.path}`);n=u}const{connectToRoom:o}=Bn,a=t.query.rid,{productId:r,name:s}=n;document.title=`${s} - Magic Algorithms`,Ln.value=e,setTimeout(()=>{lt.value&&(e.load(lt.value),lt.value=void 0)},5),setTimeout(()=>{st.value&&(e.annotation.load(st.value),st.value=void 0)},5),Kt(()=>{if(a){if(typeof a!="string")return console.error("room id must be a string");o({graph:e,roomId:a,productId:r})}}),En(()=>{var u;(u=n.state)==null||u.reset()})},T=h({__name:"GButton",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1},contrast:{type:Boolean,default:!1}},setup(e){const n=R(),t=e,o=C(()=>t.secondary?n.value.secondary:t.tertiary?n.value.tertiary:t.contrast?n.value.contrast:n.value.primary);return(a,r)=>(i(),m(Jt,{color:o.value},{default:p(()=>[v(a.$slots,"default")]),_:3},8,["color"]))}}),at=h({__name:"PlaybackButton",props:{icon:{}},setup(e){return(n,t)=>(i(),m(T,{style:{"border-radius":"40px"}},{default:p(()=>[d(O,{class:"py-1 px-6 text-5xl",icon:n.icon},null,8,["icon"])]),_:1}))}}),fe={transitionTimeMs:250,transitionEasing:"ease-in-out"},ge=h({__name:"Progressbar",props:Dn({range:{},progress:{},previewProgress:{},transitionTimeMs:{},transitionEasing:{},color:{},onProgressSet:{type:Function},onHover:{type:Function}},fe),setup(e){const n=R(),t=e,o=C(()=>{const[c,l]=t.range;return l-c}),a=c=>{const[l]=t.range;return Math.min(Math.max(c-l,0),o.value)/o.value*100},r=c=>{const l=c.currentTarget;if(!(l instanceof HTMLElement))throw new Error("Invalid target");const y=c.offsetX,k=l.offsetWidth,_=y/k,$=t.range[0]+_*o.value;return Math.round($)},s=c=>{var y;const l=r(c);(y=t.onProgressSet)==null||y.call(t,l)},u=c=>{var y;const l=r(c);(y=t.onHover)==null||y.call(t,l)};return(c,l)=>(i(),g("div",{onMousemove:u,onClick:s,class:"relative overflow-hidden h-4 w-full z-1"},[b("div",{class:x("absolute top-0 left-0 h-full z-0"),style:I({backgroundColor:t.color??f(n).tertiary,width:`${a(c.progress)}%`,transition:`width ${t.transitionTimeMs}ms ${t.transitionEasing}`})},null,4),b("div",{class:x("absolute top-0 left-0 h-full z-10"),style:I({backgroundColor:f(n).primary+"90",width:`${a(c.previewProgress??t.range[0])}%`,transition:`width ${t.transitionTimeMs}ms ${t.transitionEasing}`})},null,4)],32))}}),me={class:"w-full flex justify-center"},ve={class:"w-12"},he={class:"w-12"},ye=h({__name:"GSpreadSelect",props:zn({items:{},initialItemIndex:{default:0}},{modelValue:{},modelModifiers:{},open:{default:!1},openModifiers:{}}),emits:["update:modelValue","update:open"],setup(e){const n=B(),t=e,o=Et(e,"modelValue");if(o.value=t.items[t.initialItemIndex].value,o.value===void 0)throw new Error("invalid initialItemIndex");const a=C(()=>{var l;return(l=t.items.find(y=>y.value===o.value))==null?void 0:l.label}),r=Et(e,"open"),s=()=>r.value=!r.value;jt(n,()=>r.value=!1);const u=l=>{o.value=l.value,r.value=!1},c=l=>l.value===o.value;return(l,y)=>(i(),g("div",me,[r.value?(i(),g("div",{key:0,ref_key:"target",ref:n,class:"flex gap-2 justify-center"},[(i(!0),g(P,null,j(l.items,k=>(i(),m(T,{key:k.label,onClick:_=>u(k),class:x(["rounded-full",c(k)?"opacity-100 ring-white ring-2 ring-inset":"opacity-75"])},{default:p(()=>[b("span",ve,D(k.label),1)]),_:2},1032,["onClick","class"]))),128))],512)):a.value?(i(),m(T,{key:1,onClick:s,class:"rounded-full"},{default:p(()=>[b("span",he,D(a.value),1)]),_:1})):S("",!0)]))}}),ke={class:"flex flex-col gap-5 items-center justify-center"},_e={class:"flex gap-2 justify-between"},we={class:"w-12"},Ce={class:"flex gap-4 fill-white dark:fill-black"},xe=h({__name:"SimulationPlaybackControls",props:{controls:{}},setup(e){const n=R(),t=e,{isOver:o,paused:a,step:r,hasBegun:s,lastStep:u,playbackSpeed:c}=In(t.controls),{nextStep:l,prevStep:y,setStep:k,start:_,stop:$}=t.controls,z=()=>{y(),a.value=!0},L=()=>{l(),a.value=!0},E=M=>{k(M),a.value=!0},N=()=>{a.value=!a.value},ot=()=>{$(),_()},pt=B(-1),un=M=>{pt.value=M},dn=()=>{pt.value=-1},$t=()=>{a.value=!0};A.value.subscribe("onStructureChange",$t),ht(()=>{A.value.unsubscribe("onStructureChange",$t)});const Lt=[{label:"0.25x",value:W/.25},{label:"0.5x",value:W/.5},{label:"1x",value:W},{label:"2x",value:W/2},{label:"4x",value:W/4}],bt=B(!1),pn=Lt.findIndex(M=>M.value===c.value)??2;return gt([" ","Spacebar"],M=>{M.preventDefault(),o.value?ot():N()}),gt("ArrowLeft",M=>{M.preventDefault(),z()}),gt("ArrowRight",M=>{M.preventDefault(),L()}),(M,rt)=>(i(),g("div",ke,[b("div",_e,[d(ye,{modelValue:f(c),"onUpdate:modelValue":rt[0]||(rt[0]=ft=>On(c)?c.value=ft:null),open:bt.value,"onUpdate:open":rt[1]||(rt[1]=ft=>bt.value=ft),items:Lt,"initial-item-index":f(pn)},null,8,["modelValue","open","initial-item-index"]),bt.value?S("",!0):(i(),m(T,{key:0,class:"rounded-full"},{default:p(()=>[b("span",we,D(f(r)),1)]),_:1}))]),f(u)!==1/0?(i(),m(ge,{key:0,onMouseleave:dn,range:[0,f(u)],progress:f(r),"on-progress-set":E,"preview-progress":pt.value,"on-hover":un,class:"w-full border-2 rounded-lg",style:I({borderColor:f(n).tertiary})},null,8,["range","progress","preview-progress","style"])):S("",!0),b("div",Ce,[d(at,{onClick:z,disabled:!f(s),icon:"chevron-left"},null,8,["disabled"]),f(o)?(i(),m(at,{key:0,onClick:ot,icon:"restart"})):(i(),m(at,{key:1,onClick:N,icon:f(a)?"play":"pause"},null,8,["icon"])),d(at,{onClick:L,disabled:f(o),icon:"chevron-right"},null,8,["disabled"])])]))}}),Qt=h({__name:"ToolbarHint",props:{color:{default:H.WHITE+"75"},tutorial:{}},setup(e){return(n,t)=>(i(),m(ne,{tutorial:n.tutorial},{default:p(({hint:o})=>[b("h5",{style:I({color:n.color}),class:"text-sm"},D(o),5)]),_:1},8,["tutorial"]))}}),Se={class:"flex flex-col gap-2"},$e=h({__name:"ToolbarBase",props:{color:{default:H.GRAY_800},hint:{default:void 0}},setup(e){return(n,t)=>(i(),g("div",Se,[b("div",{style:I({backgroundColor:n.color}),class:"flex items-center gap-2 py-1 px-1 rounded-lg"},[v(n.$slots,"default")],4),v(n.$slots,"hint",{},()=>[n.hint?(i(),m(Qt,{key:0,tutorial:n.hint},null,8,["tutorial"])):S("",!0)])]))}}),Le=h({__name:"GToolbarHint",props:{tutorial:{}},setup(e){const n=R();return(t,o)=>(i(),m(Qt,{tutorial:t.tutorial,color:f(n).text+"75"},null,8,["tutorial","color"]))}}),Ct=h({__name:"GToolbarBase",props:{hint:{}},setup(e){const n=R();return(t,o)=>(i(),m($e,{hint:t.hint,color:f(n).primary},{hint:p(()=>[t.hint?(i(),m(Le,{key:0,tutorial:t.hint},null,8,["tutorial"])):S("",!0)]),default:p(()=>[v(t.$slots,"default")]),_:3},8,["hint","color"]))}}),Ee=e=>C(()=>{const n=Gt(e.value);if(!n.isValid())throw new Error("invalid color");return n}),Be=["disabled"],De=h({__name:"ToolbarButton",props:{color:{default:H.GRAY_800},active:{type:Boolean,default:!1},activeColor:{},disabled:{type:Boolean,default:!1},icon:{default:""}},setup(e){const n=e,t=Pn(n,"color"),o=Ee(t),a=C(()=>o.value.darken(5).toHexString()),r=C(()=>n.activeColor?n.activeColor:o.value.darken(10).toHexString()),s=C(()=>{if(!n.disabled)return n.active?r.value:y.value?a.value:n.color}),u=C(()=>{const k=o.value.isDark()?H.WHITE:H.BLACK;return n.disabled?k+"80":k}),c=C(()=>({color:u.value,backgroundColor:s.value,cursor:n.disabled?"not-allowed":"pointer"})),l=["p-1","rounded-md","grid","place-items-center","w-10","h-10","outline-none"],y=B(!1);return(k,_)=>(i(),g("button",{onMouseenter:_[0]||(_[0]=$=>y.value=!0),onMouseleave:_[1]||(_[1]=$=>y.value=!1),disabled:k.disabled,class:x(l),style:I(c.value)},[v(k.$slots,"default",{},()=>[d(O,{icon:k.icon},null,8,["icon"])])],44,Be))}}),G=h({__name:"GToolbarButton",setup(e){const n=R(),t=C(()=>A.value.themeName.value==="dark"?n.value.tertiary:n.value.secondary);return(o,a)=>(i(),m(De,w(o.$props,{color:f(n).primary,"active-color":t.value}),{default:p(()=>[v(o.$slots,"default")]),_:3},16,["color","active-color"]))}}),ze=h({__name:"ToolbarDivider",props:{color:{default:H.GRAY_100+"20"}},setup(e){return(n,t)=>(i(),g("div",{style:I({backgroundColor:n.color}),class:"w-[1px] h-6 mx-1"},null,4))}}),Tt=h({__name:"GToolbarDivider",setup(e){const n=R();return(t,o)=>(i(),m(ze,w(t.$props,{color:f(n).text+"30"}),null,16,["color"]))}}),X=h({__name:"ToolbarButtonGroup",setup(e){const n=ee(),t=["flex","items-center","relative","gap-1"],o=C(()=>te(t,n.value));return(a,r)=>(i(),g("div",{class:x(o.value)},[v(a.$slots,"default")],2))}}),Ie={class:x(["rounded-full","p-[3px]"])},Oe=h({__name:"AnnotationToolbar",setup(e){const{clear:n,brushWeight:t,isErasing:o,color:a,isLaserPointing:r}=A.value.annotation,s=_=>{a.value=_,o.value=!1,r.value=!1},u=_=>{t.value=_,o.value=!1,r.value=!1},c=_=>o.value||r.value?!1:a.value===_,l=_=>o.value?!1:t.value===_,y=()=>{o.value=!o.value,r.value=!1},k=()=>{r.value=!r.value,o.value=!1};return(_,$)=>(i(),m(Ct,null,{default:p(()=>[d(X,null,{default:p(()=>[(i(!0),g(P,null,j(f(qn),z=>(i(),m(G,{key:z,onClick:L=>s(z),active:c(z)},{default:p(()=>[b("div",Ie,[b("div",{style:I({backgroundColor:z}),class:x(["w-6","h-6","rounded-full"])},null,4)])]),_:2},1032,["onClick","active"]))),128))]),_:1}),d(Tt),d(X,null,{default:p(()=>[(i(!0),g(P,null,j(f(Jn),(z,L)=>(i(),m(G,{key:z,onClick:E=>u(z),active:l(z)},{default:p(()=>[b("div",{class:x(["bg-gray-400","rounded-md","w-[15px]"]),style:I({height:`${L*5+1}px`})},null,4)]),_:2},1032,["onClick","active"]))),128))]),_:1}),d(Tt),d(X,null,{default:p(()=>[d(G,{onClick:k,active:f(r),icon:"laser-pointer"},null,8,["active"]),d(G,{onClick:y,active:f(o),icon:"eraser"},null,8,["active"]),d(G,{onClick:f(n),icon:"delete-outline"},null,8,["onClick"])]),_:1})]),_:1}))}});var Pe=nt.extend({name:"focustrap-directive"}),Te=Tn.extend({style:Pe});function J(e){"@babel/helpers - typeof";return J=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},J(e)}function Mt(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,o)}return t}function At(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?Mt(Object(t),!0).forEach(function(o){Me(e,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Mt(Object(t)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))})}return e}function Me(e,n,t){return(n=Ae(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function Ae(e){var n=He(e,"string");return J(n)=="symbol"?n:n+""}function He(e,n){if(J(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var o=t.call(e,n||"default");if(J(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var tn=Te.extend("focustrap",{mounted:function(n,t){var o=t.value||{},a=o.disabled;a||(this.createHiddenFocusableElements(n,t),this.bind(n,t),this.autoElementFocus(n,t)),n.setAttribute("data-pd-focustrap",!0),this.$el=n},updated:function(n,t){var o=t.value||{},a=o.disabled;a&&this.unbind(n)},unmounted:function(n){this.unbind(n)},methods:{getComputedSelector:function(n){return':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])'.concat(n??"")},bind:function(n,t){var o=this,a=t.value||{},r=a.onFocusIn,s=a.onFocusOut;n.$_pfocustrap_mutationobserver=new MutationObserver(function(u){u.forEach(function(c){if(c.type==="childList"&&!n.contains(document.activeElement)){var l=function(k){var _=Bt(k)?Bt(k,o.getComputedSelector(n.$_pfocustrap_focusableselector))?k:Z(n,o.getComputedSelector(n.$_pfocustrap_focusableselector)):Z(k);return Vt(_)?_:k.nextSibling&&l(k.nextSibling)};V(l(c.nextSibling))}})}),n.$_pfocustrap_mutationobserver.disconnect(),n.$_pfocustrap_mutationobserver.observe(n,{childList:!0}),n.$_pfocustrap_focusinlistener=function(u){return r&&r(u)},n.$_pfocustrap_focusoutlistener=function(u){return s&&s(u)},n.addEventListener("focusin",n.$_pfocustrap_focusinlistener),n.addEventListener("focusout",n.$_pfocustrap_focusoutlistener)},unbind:function(n){n.$_pfocustrap_mutationobserver&&n.$_pfocustrap_mutationobserver.disconnect(),n.$_pfocustrap_focusinlistener&&n.removeEventListener("focusin",n.$_pfocustrap_focusinlistener)&&(n.$_pfocustrap_focusinlistener=null),n.$_pfocustrap_focusoutlistener&&n.removeEventListener("focusout",n.$_pfocustrap_focusoutlistener)&&(n.$_pfocustrap_focusoutlistener=null)},autoFocus:function(n){this.autoElementFocus(this.$el,{value:At(At({},n),{},{autoFocus:!0})})},autoElementFocus:function(n,t){var o=t.value||{},a=o.autoFocusSelector,r=a===void 0?"":a,s=o.firstFocusableSelector,u=s===void 0?"":s,c=o.autoFocus,l=c===void 0?!1:c,y=Z(n,"[autofocus]".concat(this.getComputedSelector(r)));l&&!y&&(y=Z(n,this.getComputedSelector(u))),V(y)},onFirstHiddenElementFocus:function(n){var t,o=n.currentTarget,a=n.relatedTarget,r=a===o.$_pfocustrap_lasthiddenfocusableelement||!((t=this.$el)!==null&&t!==void 0&&t.contains(a))?Z(o.parentElement,this.getComputedSelector(o.$_pfocustrap_focusableselector)):o.$_pfocustrap_lasthiddenfocusableelement;V(r)},onLastHiddenElementFocus:function(n){var t,o=n.currentTarget,a=n.relatedTarget,r=a===o.$_pfocustrap_firsthiddenfocusableelement||!((t=this.$el)!==null&&t!==void 0&&t.contains(a))?Mn(o.parentElement,this.getComputedSelector(o.$_pfocustrap_focusableselector)):o.$_pfocustrap_firsthiddenfocusableelement;V(r)},createHiddenFocusableElements:function(n,t){var o=this,a=t.value||{},r=a.tabIndex,s=r===void 0?0:r,u=a.firstFocusableSelector,c=u===void 0?"":u,l=a.lastFocusableSelector,y=l===void 0?"":l,k=function(L){return An("span",{class:"p-hidden-accessible p-hidden-focusable",tabIndex:s,role:"presentation","aria-hidden":!0,"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0,onFocus:L==null?void 0:L.bind(o)})},_=k(this.onFirstHiddenElementFocus),$=k(this.onLastHiddenElementFocus);_.$_pfocustrap_lasthiddenfocusableelement=$,_.$_pfocustrap_focusableselector=c,_.setAttribute("data-pc-section","firstfocusableelement"),$.$_pfocustrap_firsthiddenfocusableelement=_,$.$_pfocustrap_focusableselector=y,$.setAttribute("data-pc-section","lastfocusableelement"),n.prepend(_),n.append($)}}}),it=Hn(),Re=function(n){var t=n.dt;return`
.p-popover {
    margin-block-start: `.concat(t("popover.gutter"),`;
    background: `).concat(t("popover.background"),`;
    color: `).concat(t("popover.color"),`;
    border: 1px solid `).concat(t("popover.border.color"),`;
    border-radius: `).concat(t("popover.border.radius"),`;
    box-shadow: `).concat(t("popover.shadow"),`;
}

.p-popover-content {
    padding: `).concat(t("popover.content.padding"),`;
}

.p-popover-flipped {
    margin-block-start: calc(`).concat(t("popover.gutter"),` * -1);
    margin-block-end: `).concat(t("popover.gutter"),`;
}

.p-popover-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-popover-leave-to {
    opacity: 0;
}

.p-popover-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-popover-leave-active {
    transition: opacity 0.1s linear;
}

.p-popover:after,
.p-popover:before {
    bottom: 100%;
    left: calc(`).concat(t("popover.arrow.offset")," + ").concat(t("popover.arrow.left"),`);
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.p-popover:after {
    border-width: calc(`).concat(t("popover.gutter"),` - 2px);
    margin-left: calc(-1 * (`).concat(t("popover.gutter"),` - 2px));
    border-style: solid;
    border-color: transparent;
    border-bottom-color: `).concat(t("popover.background"),`;
}

.p-popover:before {
    border-width: `).concat(t("popover.gutter"),`;
    margin-left: calc(-1 * `).concat(t("popover.gutter"),`);
    border-style: solid;
    border-color: transparent;
    border-bottom-color: `).concat(t("popover.border.color"),`;
}

.p-popover-flipped:after,
.p-popover-flipped:before {
    bottom: auto;
    top: 100%;
}

.p-popover.p-popover-flipped:after {
    border-bottom-color: transparent;
    border-top-color: `).concat(t("popover.background"),`;
}

.p-popover.p-popover-flipped:before {
    border-bottom-color: transparent;
    border-top-color: `).concat(t("popover.border.color"),`;
}
`)},Fe={root:"p-popover p-component",content:"p-popover-content"},Ke=nt.extend({name:"popover",theme:Re,classes:Fe}),je={name:"BasePopover",extends:ut,props:{dismissable:{type:Boolean,default:!0},appendTo:{type:[String,Object],default:"body"},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},breakpoints:{type:Object,default:null},closeOnEscape:{type:Boolean,default:!0}},style:Ke,provide:function(){return{$pcPopover:this,$parentInstance:this}}},nn={name:"Popover",extends:je,inheritAttrs:!1,emits:["show","hide"],data:function(){return{visible:!1}},watch:{dismissable:{immediate:!0,handler:function(n){n?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},selfClick:!1,target:null,eventTarget:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,styleElement:null,overlayEventListener:null,documentKeydownListener:null,beforeUnmount:function(){this.dismissable&&this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.destroyStyle(),this.unbindResizeListener(),this.target=null,this.container&&this.autoZIndex&&U.clear(this.container),this.overlayEventListener&&(it.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null),this.container=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{toggle:function(n,t){this.visible?this.hide():this.show(n,t)},show:function(n,t){this.visible=!0,this.eventTarget=n.currentTarget,this.target=t||n.currentTarget},hide:function(){this.visible=!1},onContentClick:function(){this.selfClick=!0},onEnter:function(n){var t=this;Ut(n,{position:"absolute",top:"0",left:"0"}),this.alignOverlay(),this.dismissable&&this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&U.set("overlay",n,this.baseZIndex+this.$primevue.config.zIndex.overlay),this.overlayEventListener=function(o){t.container.contains(o.target)&&(t.selfClick=!0)},this.focus(),it.on("overlay-click",this.overlayEventListener),this.$emit("show"),this.closeOnEscape&&this.bindDocumentKeyDownListener()},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.unbindDocumentKeyDownListener(),it.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null,this.$emit("hide")},onAfterLeave:function(n){this.autoZIndex&&U.clear(n)},alignOverlay:function(){Rn(this.container,this.target,!1);var n=Dt(this.container),t=Dt(this.target),o=0;n.left<t.left&&(o=t.left-n.left),this.container.style.setProperty(Fn("popover.arrow.left").name,"".concat(o,"px")),n.top<t.top&&(this.container.setAttribute("data-p-popover-flipped","true"),!this.isUnstyled&&Yt(this.container,"p-popover-flipped"))},onContentKeydown:function(n){n.code==="Escape"&&this.closeOnEscape&&(this.hide(),V(this.target))},onButtonKeydown:function(n){switch(n.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":n.preventDefault()}},focus:function(){var n=this.container.querySelector("[autofocus]");n&&n.focus()},onKeyDown:function(n){n.code==="Escape"&&this.closeOnEscape&&(this.visible=!1)},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var n=this;!this.outsideClickListener&&Kn()&&(this.outsideClickListener=function(t){n.visible&&!n.selfClick&&!n.isTargetClicked(t)&&(n.visible=!1),n.selfClick=!1},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null,this.selfClick=!1)},bindScrollListener:function(){var n=this;this.scrollHandler||(this.scrollHandler=new jn(this.target,function(){n.visible&&(n.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var n=this;this.resizeListener||(this.resizeListener=function(){n.visible&&!Gn()&&(n.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isTargetClicked:function(n){return this.eventTarget&&(this.eventTarget===n.target||this.eventTarget.contains(n.target))},containerRef:function(n){this.container=n},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var n;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",Nt(this.styleElement,"nonce",(n=this.$primevue)===null||n===void 0||(n=n.config)===null||n===void 0||(n=n.csp)===null||n===void 0?void 0:n.nonce),document.head.appendChild(this.styleElement);var t="";for(var o in this.breakpoints)t+=`
                        @media screen and (max-width: `.concat(o,`) {
                            .p-popover[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[o],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=t}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},onOverlayClick:function(n){it.emit("overlay-click",{originalEvent:n,target:this.target})}},directives:{focustrap:tn,ripple:yt},components:{Portal:Wt}},Ge=["aria-modal"];function Ve(e,n,t,o,a,r){var s=q("Portal"),u=kt("focustrap");return i(),m(s,{appendTo:e.appendTo},{default:p(function(){return[d(Zt,w({name:"p-popover",onEnter:r.onEnter,onLeave:r.onLeave,onAfterLeave:r.onAfterLeave},e.ptm("transition")),{default:p(function(){return[a.visible?dt((i(),g("div",w({key:0,ref:r.containerRef,role:"dialog","aria-modal":a.visible,onClick:n[3]||(n[3]=function(){return r.onOverlayClick&&r.onOverlayClick.apply(r,arguments)}),class:e.cx("root")},e.ptmi("root")),[e.$slots.container?v(e.$slots,"container",{key:0,closeCallback:r.hide,keydownCallback:function(l){return r.onButtonKeydown(l)}}):(i(),g("div",w({key:1,class:e.cx("content"),onClick:n[0]||(n[0]=function(){return r.onContentClick&&r.onContentClick.apply(r,arguments)}),onMousedown:n[1]||(n[1]=function(){return r.onContentClick&&r.onContentClick.apply(r,arguments)}),onKeydown:n[2]||(n[2]=function(){return r.onContentKeydown&&r.onContentKeydown.apply(r,arguments)})},e.ptm("content")),[v(e.$slots,"default")],16))],16,Ge)),[[u]]):S("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])}nn.render=Ve;const xt=h({__name:"Popover",props:{offset:{default:12}},setup(e){const n=B(),t=a=>{n.value.toggle(a)},o=B(!1);return(a,r)=>(i(),g(P,null,[v(a.$slots,"activator",{toggle:t,isOpen:o.value}),d(f(nn),{ref_key:"op",ref:n,onShow:r[0]||(r[0]=s=>o.value=!0),onHide:r[1]||(r[1]=s=>o.value=!1),unstyled:""},{default:p(()=>[b("div",{style:I({transform:`translateY(${a.offset}px)`})},[v(a.$slots,"default")],4)]),_:3},512)],64))}}),Ue=h({__name:"Well",props:{color:{default:H.GRAY_800},textColor:{default:H.WHITE}},setup(e){return(n,t)=>(i(),g("div",{style:I({backgroundColor:n.color,color:n.textColor})},[v(n.$slots,"default")],4))}}),Y=h({__name:"GWell",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1}},setup(e){const n=R(),t=e,o=C(()=>t.secondary?n.value.secondary:t.tertiary?n.value.tertiary:n.value.primary);return(a,r)=>(i(),m(Ue,w(a.$attrs,{color:o.value,"text-color":f(n).text}),{default:p(()=>[v(a.$slots,"default")]),_:3},16,["color","text-color"]))}}),Ye={class:"min-w-20 min-h-20 max-w-20 max-h-20 rounded-md"},Ne=["src"],We={class:"flex flex-col gap-1"},Ze={class:"text-lg font-bold"},Xe={class:"text-sm opacity-80"},qe=h({__name:"VerticalCardButton",props:{imageSrc:{},color:{default:H.GRAY_800},hoverColor:{},title:{},description:{}},setup(e){const n=e,t=C(()=>{if(n.hoverColor)return n.hoverColor;const r=Gt(n.color);return(r.isDark()?r.lighten(10):r.darken(10)).toHexString()}),o=C(()=>a.value?t.value:n.color),a=B(!1);return(r,s)=>(i(),g("button",{onMouseenter:s[0]||(s[0]=u=>a.value=!0),onMouseleave:s[1]||(s[1]=u=>a.value=!1),style:I({backgroundColor:o.value}),class:"p-2 cursor-pointer text-left flex gap-4"},[b("div",Ye,[r.imageSrc?(i(),g("img",{key:0,src:r.imageSrc,class:"object-cover aspect-square rounded-md"},null,8,Ne)):S("",!0)]),b("div",We,[b("h1",Ze,D(r.title),1),b("p",Xe,D(r.description),1)])],36))}}),en=h({__name:"GVerticalCardButton",setup(e){const n=R();return(t,o)=>(i(),m(qe,w(t.$attrs,{color:f(n).primary,"hover-color":f(n).secondary}),null,16,["color","hover-color"]))}}),Je={key:0,class:"flex items-center gap-3"},Qe=h({__name:"ProductItem",props:{product:{}},setup(e){const{navigate:n}=ue(),t=de(),o=c=>{lt.value={nodes:A.value.nodes.value,edges:A.value.edges.value},st.value=A.value.annotation.annotations.value,n(c)},a=e,r=B(!1),s=B("");setTimeout(()=>{s.value=a.product.menu.thumbnail},Xt(0,100));const u=C(()=>{const c=a.product.menu.allowGoWithGraph??!0;return!pe(a.product)&&c});return(c,l)=>(i(),g("div",{onMouseenter:l[2]||(l[2]=y=>r.value=!0),onMouseleave:l[3]||(l[3]=y=>r.value=!1),class:"relative"},[b("div",{class:"absolute w-full h-full z-10 grid place-items-center transition duration-200",style:I({opacity:r.value?1:0})},[f(t).productId!==c.product.productId?(i(),g("div",Je,[d(T,{onClick:l[0]||(l[0]=y=>f(n)(c.product)),tertiary:"",class:"grid place-items-center w-[120px] text-sm"},{default:p(()=>[d(O,{icon:"arrow-right"}),l[4]||(l[4]=K(" go "))]),_:1}),u.value?(i(),m(T,{key:0,onClick:l[1]||(l[1]=y=>o(c.product)),tertiary:"",class:"grid place-items-center w-[120px] text-sm"},{default:p(()=>[d(O,{icon:"debug-step-over"}),l[5]||(l[5]=K(" go with graph "))]),_:1})):S("",!0)])):(i(),m(Y,{key:1,tertiary:"",class:"flex items-center gap-2 px-2 py-1 rounded-md text-xl font-bold overflow-hidden"},{default:p(()=>[d(O,{icon:"star",class:"text-xl"}),l[6]||(l[6]=K(" you are here ")),d(O,{icon:"star",class:"text-xl"})]),_:1}))],4),d(en,{"image-src":s.value,title:c.product.menu.name,description:c.product.menu.description,class:"rounded-md",style:I({opacity:r.value?.5:1})},null,8,["image-src","title","description","style"])],32))}}),to={class:"flex flex-col gap-2"},no=h({__name:"ProductDropdownMenu",setup(e){const n=et.filter(o=>o==null?void 0:o.menu),t=Pt.reduce((o,a)=>(o[a]=[],o),{});return n.forEach(o=>{t[o.menu.category].push(o)}),(o,a)=>(i(),m(Y,{class:"flex flex-col p-2 w-[400px] h-[500px] overflow-auto rounded-lg"},{default:p(()=>[(i(!0),g(P,null,j(f(Pt),r=>(i(),g("div",{key:r},[f(t)[r].length>0?(i(),m(Y,{key:0,tertiary:"",class:"text-xl font-bold capitalize my-2 text-center p-1 rounded-md"},{default:p(()=>[K(D(r),1)]),_:2},1024)):S("",!0),b("div",to,[(i(!0),g(P,null,j(f(t)[r],s=>(i(),m(Qe,{key:s.productId,product:s},null,8,["product"]))),128))])]))),128))]),_:1}))}}),eo=h({__name:"ProductDropdown",setup(e){const n=R();return(t,o)=>(i(),m(xt,null,{activator:p(({toggle:a})=>[d(T,{onClick:a,class:"px-4 py-2 text-xl rounded-lg"},{default:p(()=>[b("span",{class:x(`text-${f(n).brand}`)},"Magic Algorithms",2)]),_:2},1032,["onClick"])]),default:p(()=>[d(no)]),_:1}))}}),oo=["onMouseenter","onMouseleave"],ro=h({__name:"PopoverTooltip",props:{offset:{default:4}},setup(e){return(n,t)=>(i(),m(xt,{offset:n.offset},{activator:p(({toggle:o})=>[b("div",{onMouseenter:o,onMouseleave:o},[v(n.$slots,"default")],40,oo)]),default:p(()=>[v(n.$slots,"content")]),_:3},8,["offset"]))}}),ao={key:0,class:"absolute bg-black w-full h-full z-10 rounded-md bg-opacity-50 grid place-items-center"},io=["innerHTML"],lo=h({__name:"SelectSimGuard",props:{simulation:{}},setup(e){const n=e,t=C(()=>{var o;return(o=n.simulation.canRun)==null?void 0:o.check()});return(o,a)=>t.value?(i(),g("div",ao,[d(ro,null,{content:p(()=>[d(Y,{tertiary:"",class:"max-w-72 rounded-lg p-2"},{default:p(()=>[b("span",{innerHTML:t.value.description,class:"font-bold"},null,8,io)]),_:1})]),default:p(()=>[d(Jt,{onMouseenter:a[0]||(a[0]=r=>{var s;return(s=t.value.themer)==null?void 0:s.theme()}),onMouseleave:a[1]||(a[1]=r=>{var s;return(s=t.value.themer)==null?void 0:s.untheme()}),color:f(H).GRAY_900,"text-color":f(H).RED_500,class:"text-lg rounded-lg px-2 py-1"},{default:p(()=>[K(D(t.value.title),1)]),_:1},8,["color","text-color"])]),_:1})])):S("",!0)}}),so=h({__name:"SimCard",props:{simulation:{}},setup(e){const n=e,t=B("");return setTimeout(()=>{t.value=n.simulation.thumbnail},Xt(0,100)),(o,a)=>(i(),m(en,{"image-src":t.value,title:o.simulation.name,description:o.simulation.description,class:"rounded-md"},null,8,["image-src","title","description"]))}}),co=h({__name:"SelectSim",props:{simulations:{},disabled:{type:Boolean}},emits:["simulation-selected"],setup(e,{emit:n}){const t=e,o=n,a=C(()=>{const r=t.simulations,s=r.filter(c=>{var l;return(l=c.canRun)==null?void 0:l.check()});return[...r.filter(c=>{var l;return!((l=c.canRun)!=null&&l.check())}),...s]});return(r,s)=>(i(),m(xt,null,{activator:p(({toggle:u})=>[d(T,{onClick:u,disabled:r.disabled,class:"h-14 w-14 rounded-full"},{default:p(()=>[d(O,{class:"text-3xl",icon:"play"})]),_:2},1032,["onClick","disabled"])]),default:p(()=>[d(Y,{class:"flex flex-col p-2 w-[400px] max-h-[500px] overflow-auto gap-1 rounded-lg"},{default:p(()=>[(i(!0),g(P,null,j(a.value,u=>(i(),g("div",{key:u.name,class:"relative"},[d(lo,{simulation:u},null,8,["simulation"]),d(so,{onClick:c=>o("simulation-selected",u),simulation:u},null,8,["onClick","simulation"])]))),128))]),_:1})]),_:1}))}}),uo=h({__name:"StopSimButton",setup(e){return(n,t)=>(i(),m(T,{color:f(H).RED_500,class:"h-14 w-14 rounded-full"},{default:p(()=>[d(O,{class:"text-3xl",icon:"stop"})]),_:1},8,["color"]))}}),po=h({__name:"FullscreenButton",setup(e){const{toggle:n,isFullscreen:t}=Vn(),o=a=>{a.key.toLowerCase()==="f"&&n()};return A.value.subscribe("onKeyDown",o),ht(()=>A.value.unsubscribe("onKeyDown",o)),(a,r)=>(i(),m(T,{onClick:f(n),class:"h-12 w-12"},{default:p(()=>[d(O,{class:"text-3xl",icon:f(t)?"fullscreen-exit":"fullscreen"},null,8,["icon"])]),_:1},8,["onClick"]))}}),bo=h({__name:"ThemeToolbar",setup(e){const n={auto:"cog-outline",light:"weather-sunny",dark:"weather-night",girl:"flower-tulip-outline"};return(t,o)=>(i(),m(Ct,null,{default:p(()=>[d(X,null,{default:p(()=>[(i(),g(P,null,j(n,(a,r)=>d(G,{key:r,onClick:s=>f(A).preferredTheme.value=r,icon:a,active:r===f(A).preferredTheme.value},null,8,["onClick","icon","active"])),64))]),_:1})]),_:1}))}}),fo={class:"text-sm font-semibold"},go=h({__name:"ZoomButtons",setup(e){const n=C(()=>(mt.value*100).toFixed(0));return(t,o)=>(i(),m(Ct,null,{default:p(()=>[d(X,null,{default:p(()=>[d(G,{onClick:o[0]||(o[0]=a=>f(oe)()),disabled:f(mt)<=f(re),icon:"minus"},null,8,["disabled"]),d(Y,{class:"w-12 text-center"},{default:p(()=>[b("p",fo,D(n.value)+"%",1)]),_:1}),d(G,{onClick:o[1]||(o[1]=a=>f(ae)()),disabled:f(mt)>=f(ie),icon:"plus"},null,8,["disabled"])]),_:1})]),_:1}))}});var on={name:"WindowMaximizeIcon",extends:_t};function mo(e,n,t,o,a,r){return i(),g("svg",w({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),n[0]||(n[0]=[b("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14ZM9.77805 7.42192C9.89013 7.534 10.0415 7.59788 10.2 7.59995C10.3585 7.59788 10.5099 7.534 10.622 7.42192C10.7341 7.30985 10.798 7.15844 10.8 6.99995V3.94242C10.8066 3.90505 10.8096 3.86689 10.8089 3.82843C10.8079 3.77159 10.7988 3.7157 10.7824 3.6623C10.756 3.55552 10.701 3.45698 10.622 3.37798C10.5099 3.2659 10.3585 3.20202 10.2 3.19995H7.00002C6.84089 3.19995 6.68828 3.26317 6.57576 3.37569C6.46324 3.48821 6.40002 3.64082 6.40002 3.79995C6.40002 3.95908 6.46324 4.11169 6.57576 4.22422C6.68828 4.33674 6.84089 4.39995 7.00002 4.39995H8.80006L6.19997 7.00005C6.10158 7.11005 6.04718 7.25246 6.04718 7.40005C6.04718 7.54763 6.10158 7.69004 6.19997 7.80005C6.30202 7.91645 6.44561 7.98824 6.59997 8.00005C6.75432 7.98824 6.89791 7.91645 6.99997 7.80005L9.60002 5.26841V6.99995C9.6021 7.15844 9.66598 7.30985 9.77805 7.42192ZM1.4 14H3.8C4.17066 13.9979 4.52553 13.8498 4.78763 13.5877C5.04973 13.3256 5.1979 12.9707 5.2 12.6V10.2C5.1979 9.82939 5.04973 9.47452 4.78763 9.21242C4.52553 8.95032 4.17066 8.80215 3.8 8.80005H1.4C1.02934 8.80215 0.674468 8.95032 0.412371 9.21242C0.150274 9.47452 0.00210008 9.82939 0 10.2V12.6C0.00210008 12.9707 0.150274 13.3256 0.412371 13.5877C0.674468 13.8498 1.02934 13.9979 1.4 14ZM1.25858 10.0586C1.29609 10.0211 1.34696 10 1.4 10H3.8C3.85304 10 3.90391 10.0211 3.94142 10.0586C3.97893 10.0961 4 10.147 4 10.2V12.6C4 12.6531 3.97893 12.704 3.94142 12.7415C3.90391 12.779 3.85304 12.8 3.8 12.8H1.4C1.34696 12.8 1.29609 12.779 1.25858 12.7415C1.22107 12.704 1.2 12.6531 1.2 12.6V10.2C1.2 10.147 1.22107 10.0961 1.25858 10.0586Z",fill:"currentColor"},null,-1)]),16)}on.render=mo;var rn={name:"WindowMinimizeIcon",extends:_t};function vo(e,n,t,o,a,r){return i(),g("svg",w({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),n[0]||(n[0]=[b("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0ZM6.368 7.952C6.44137 7.98326 6.52025 7.99958 6.6 8H9.8C9.95913 8 10.1117 7.93678 10.2243 7.82426C10.3368 7.71174 10.4 7.55913 10.4 7.4C10.4 7.24087 10.3368 7.08826 10.2243 6.97574C10.1117 6.86321 9.95913 6.8 9.8 6.8H8.048L10.624 4.224C10.73 4.11026 10.7877 3.95982 10.7849 3.80438C10.7822 3.64894 10.7192 3.50063 10.6093 3.3907C10.4994 3.28077 10.3511 3.2178 10.1956 3.21506C10.0402 3.21232 9.88974 3.27002 9.776 3.376L7.2 5.952V4.2C7.2 4.04087 7.13679 3.88826 7.02426 3.77574C6.91174 3.66321 6.75913 3.6 6.6 3.6C6.44087 3.6 6.28826 3.66321 6.17574 3.77574C6.06321 3.88826 6 4.04087 6 4.2V7.4C6.00042 7.47975 6.01674 7.55862 6.048 7.632C6.07656 7.70442 6.11971 7.7702 6.17475 7.82524C6.2298 7.88029 6.29558 7.92344 6.368 7.952ZM1.4 8.80005H3.8C4.17066 8.80215 4.52553 8.95032 4.78763 9.21242C5.04973 9.47452 5.1979 9.82939 5.2 10.2V12.6C5.1979 12.9707 5.04973 13.3256 4.78763 13.5877C4.52553 13.8498 4.17066 13.9979 3.8 14H1.4C1.02934 13.9979 0.674468 13.8498 0.412371 13.5877C0.150274 13.3256 0.00210008 12.9707 0 12.6V10.2C0.00210008 9.82939 0.150274 9.47452 0.412371 9.21242C0.674468 8.95032 1.02934 8.80215 1.4 8.80005ZM3.94142 12.7415C3.97893 12.704 4 12.6531 4 12.6V10.2C4 10.147 3.97893 10.0961 3.94142 10.0586C3.90391 10.0211 3.85304 10 3.8 10H1.4C1.34696 10 1.29609 10.0211 1.25858 10.0586C1.22107 10.0961 1.2 10.147 1.2 10.2V12.6C1.2 12.6531 1.22107 12.704 1.25858 12.7415C1.29609 12.779 1.34696 12.8 1.4 12.8H3.8C3.85304 12.8 3.90391 12.779 3.94142 12.7415Z",fill:"currentColor"},null,-1)]),16)}rn.render=vo;var an={name:"SpinnerIcon",extends:_t};function ho(e,n,t,o,a,r){return i(),g("svg",w({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),n[0]||(n[0]=[b("path",{d:"M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",fill:"currentColor"},null,-1)]),16)}an.render=ho;var yo=function(n){var t=n.dt;return`
.p-badge {
    display: inline-flex;
    border-radius: `.concat(t("badge.border.radius"),`;
    align-items: center;
    justify-content: center;
    padding: `).concat(t("badge.padding"),`;
    background: `).concat(t("badge.primary.background"),`;
    color: `).concat(t("badge.primary.color"),`;
    font-size: `).concat(t("badge.font.size"),`;
    font-weight: `).concat(t("badge.font.weight"),`;
    min-width: `).concat(t("badge.min.width"),`;
    height: `).concat(t("badge.height"),`;
}

.p-badge-dot {
    width: `).concat(t("badge.dot.size"),`;
    min-width: `).concat(t("badge.dot.size"),`;
    height: `).concat(t("badge.dot.size"),`;
    border-radius: 50%;
    padding: 0;
}

.p-badge-circle {
    padding: 0;
    border-radius: 50%;
}

.p-badge-secondary {
    background: `).concat(t("badge.secondary.background"),`;
    color: `).concat(t("badge.secondary.color"),`;
}

.p-badge-success {
    background: `).concat(t("badge.success.background"),`;
    color: `).concat(t("badge.success.color"),`;
}

.p-badge-info {
    background: `).concat(t("badge.info.background"),`;
    color: `).concat(t("badge.info.color"),`;
}

.p-badge-warn {
    background: `).concat(t("badge.warn.background"),`;
    color: `).concat(t("badge.warn.color"),`;
}

.p-badge-danger {
    background: `).concat(t("badge.danger.background"),`;
    color: `).concat(t("badge.danger.color"),`;
}

.p-badge-contrast {
    background: `).concat(t("badge.contrast.background"),`;
    color: `).concat(t("badge.contrast.color"),`;
}

.p-badge-sm {
    font-size: `).concat(t("badge.sm.font.size"),`;
    min-width: `).concat(t("badge.sm.min.width"),`;
    height: `).concat(t("badge.sm.height"),`;
}

.p-badge-lg {
    font-size: `).concat(t("badge.lg.font.size"),`;
    min-width: `).concat(t("badge.lg.min.width"),`;
    height: `).concat(t("badge.lg.height"),`;
}

.p-badge-xl {
    font-size: `).concat(t("badge.xl.font.size"),`;
    min-width: `).concat(t("badge.xl.min.width"),`;
    height: `).concat(t("badge.xl.height"),`;
}
`)},ko={root:function(n){var t=n.props,o=n.instance;return["p-badge p-component",{"p-badge-circle":Vt(t.value)&&String(t.value).length===1,"p-badge-dot":qt(t.value)&&!o.$slots.default,"p-badge-sm":t.size==="small","p-badge-lg":t.size==="large","p-badge-xl":t.size==="xlarge","p-badge-info":t.severity==="info","p-badge-success":t.severity==="success","p-badge-warn":t.severity==="warn","p-badge-danger":t.severity==="danger","p-badge-secondary":t.severity==="secondary","p-badge-contrast":t.severity==="contrast"}]}},_o=nt.extend({name:"badge",theme:yo,classes:ko}),wo={name:"BaseBadge",extends:ut,props:{value:{type:[String,Number],default:null},severity:{type:String,default:null},size:{type:String,default:null}},style:_o,provide:function(){return{$pcBadge:this,$parentInstance:this}}},ln={name:"Badge",extends:wo,inheritAttrs:!1};function Co(e,n,t,o,a,r){return i(),g("span",w({class:e.cx("root")},e.ptmi("root")),[v(e.$slots,"default",{},function(){return[K(D(e.value),1)]})],16)}ln.render=Co;function Q(e){"@babel/helpers - typeof";return Q=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},Q(e)}function F(e,n,t){return(n=xo(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function xo(e){var n=So(e,"string");return Q(n)=="symbol"?n:n+""}function So(e,n){if(Q(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var o=t.call(e,n||"default");if(Q(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var $o=function(n){var t=n.dt;return`
.p-button {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    color: `.concat(t("button.primary.color"),`;
    background: `).concat(t("button.primary.background"),`;
    border: 1px solid `).concat(t("button.primary.border.color"),`;
    padding: `).concat(t("button.padding.y")," ").concat(t("button.padding.x"),`;
    font-size: 1rem;
    font-family: inherit;
    font-feature-settings: inherit;
    transition: background `).concat(t("button.transition.duration"),", color ").concat(t("button.transition.duration"),", border-color ").concat(t("button.transition.duration"),`,
            outline-color `).concat(t("button.transition.duration"),", box-shadow ").concat(t("button.transition.duration"),`;
    border-radius: `).concat(t("button.border.radius"),`;
    outline-color: transparent;
    gap: `).concat(t("button.gap"),`;
}

.p-button:disabled {
    cursor: default;
}

.p-button-icon-right {
    order: 1;
}

.p-button-icon-right:dir(rtl) {
    order: -1;
}

.p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
    order: 1;
}

.p-button-icon-bottom {
    order: 2;
}

.p-button-icon-only {
    width: `).concat(t("button.icon.only.width"),`;
    padding-inline-start: 0;
    padding-inline-end: 0;
    gap: 0;
}

.p-button-icon-only.p-button-rounded {
    border-radius: 50%;
    height: `).concat(t("button.icon.only.width"),`;
}

.p-button-icon-only .p-button-label {
    visibility: hidden;
    width: 0;
}

.p-button-sm {
    font-size: `).concat(t("button.sm.font.size"),`;
    padding: `).concat(t("button.sm.padding.y")," ").concat(t("button.sm.padding.x"),`;
}

.p-button-sm .p-button-icon {
    font-size: `).concat(t("button.sm.font.size"),`;
}

.p-button-lg {
    font-size: `).concat(t("button.lg.font.size"),`;
    padding: `).concat(t("button.lg.padding.y")," ").concat(t("button.lg.padding.x"),`;
}

.p-button-lg .p-button-icon {
    font-size: `).concat(t("button.lg.font.size"),`;
}

.p-button-vertical {
    flex-direction: column;
}

.p-button-label {
    font-weight: `).concat(t("button.label.font.weight"),`;
}

.p-button-fluid {
    width: 100%;
}

.p-button-fluid.p-button-icon-only {
    width: `).concat(t("button.icon.only.width"),`;
}

.p-button:not(:disabled):hover {
    background: `).concat(t("button.primary.hover.background"),`;
    border: 1px solid `).concat(t("button.primary.hover.border.color"),`;
    color: `).concat(t("button.primary.hover.color"),`;
}

.p-button:not(:disabled):active {
    background: `).concat(t("button.primary.active.background"),`;
    border: 1px solid `).concat(t("button.primary.active.border.color"),`;
    color: `).concat(t("button.primary.active.color"),`;
}

.p-button:focus-visible {
    box-shadow: `).concat(t("button.primary.focus.ring.shadow"),`;
    outline: `).concat(t("button.focus.ring.width")," ").concat(t("button.focus.ring.style")," ").concat(t("button.primary.focus.ring.color"),`;
    outline-offset: `).concat(t("button.focus.ring.offset"),`;
}

.p-button .p-badge {
    min-width: `).concat(t("button.badge.size"),`;
    height: `).concat(t("button.badge.size"),`;
    line-height: `).concat(t("button.badge.size"),`;
}

.p-button-raised {
    box-shadow: `).concat(t("button.raised.shadow"),`;
}

.p-button-rounded {
    border-radius: `).concat(t("button.rounded.border.radius"),`;
}

.p-button-secondary {
    background: `).concat(t("button.secondary.background"),`;
    border: 1px solid `).concat(t("button.secondary.border.color"),`;
    color: `).concat(t("button.secondary.color"),`;
}

.p-button-secondary:not(:disabled):hover {
    background: `).concat(t("button.secondary.hover.background"),`;
    border: 1px solid `).concat(t("button.secondary.hover.border.color"),`;
    color: `).concat(t("button.secondary.hover.color"),`;
}

.p-button-secondary:not(:disabled):active {
    background: `).concat(t("button.secondary.active.background"),`;
    border: 1px solid `).concat(t("button.secondary.active.border.color"),`;
    color: `).concat(t("button.secondary.active.color"),`;
}

.p-button-secondary:focus-visible {
    outline-color: `).concat(t("button.secondary.focus.ring.color"),`;
    box-shadow: `).concat(t("button.secondary.focus.ring.shadow"),`;
}

.p-button-success {
    background: `).concat(t("button.success.background"),`;
    border: 1px solid `).concat(t("button.success.border.color"),`;
    color: `).concat(t("button.success.color"),`;
}

.p-button-success:not(:disabled):hover {
    background: `).concat(t("button.success.hover.background"),`;
    border: 1px solid `).concat(t("button.success.hover.border.color"),`;
    color: `).concat(t("button.success.hover.color"),`;
}

.p-button-success:not(:disabled):active {
    background: `).concat(t("button.success.active.background"),`;
    border: 1px solid `).concat(t("button.success.active.border.color"),`;
    color: `).concat(t("button.success.active.color"),`;
}

.p-button-success:focus-visible {
    outline-color: `).concat(t("button.success.focus.ring.color"),`;
    box-shadow: `).concat(t("button.success.focus.ring.shadow"),`;
}

.p-button-info {
    background: `).concat(t("button.info.background"),`;
    border: 1px solid `).concat(t("button.info.border.color"),`;
    color: `).concat(t("button.info.color"),`;
}

.p-button-info:not(:disabled):hover {
    background: `).concat(t("button.info.hover.background"),`;
    border: 1px solid `).concat(t("button.info.hover.border.color"),`;
    color: `).concat(t("button.info.hover.color"),`;
}

.p-button-info:not(:disabled):active {
    background: `).concat(t("button.info.active.background"),`;
    border: 1px solid `).concat(t("button.info.active.border.color"),`;
    color: `).concat(t("button.info.active.color"),`;
}

.p-button-info:focus-visible {
    outline-color: `).concat(t("button.info.focus.ring.color"),`;
    box-shadow: `).concat(t("button.info.focus.ring.shadow"),`;
}

.p-button-warn {
    background: `).concat(t("button.warn.background"),`;
    border: 1px solid `).concat(t("button.warn.border.color"),`;
    color: `).concat(t("button.warn.color"),`;
}

.p-button-warn:not(:disabled):hover {
    background: `).concat(t("button.warn.hover.background"),`;
    border: 1px solid `).concat(t("button.warn.hover.border.color"),`;
    color: `).concat(t("button.warn.hover.color"),`;
}

.p-button-warn:not(:disabled):active {
    background: `).concat(t("button.warn.active.background"),`;
    border: 1px solid `).concat(t("button.warn.active.border.color"),`;
    color: `).concat(t("button.warn.active.color"),`;
}

.p-button-warn:focus-visible {
    outline-color: `).concat(t("button.warn.focus.ring.color"),`;
    box-shadow: `).concat(t("button.warn.focus.ring.shadow"),`;
}

.p-button-help {
    background: `).concat(t("button.help.background"),`;
    border: 1px solid `).concat(t("button.help.border.color"),`;
    color: `).concat(t("button.help.color"),`;
}

.p-button-help:not(:disabled):hover {
    background: `).concat(t("button.help.hover.background"),`;
    border: 1px solid `).concat(t("button.help.hover.border.color"),`;
    color: `).concat(t("button.help.hover.color"),`;
}

.p-button-help:not(:disabled):active {
    background: `).concat(t("button.help.active.background"),`;
    border: 1px solid `).concat(t("button.help.active.border.color"),`;
    color: `).concat(t("button.help.active.color"),`;
}

.p-button-help:focus-visible {
    outline-color: `).concat(t("button.help.focus.ring.color"),`;
    box-shadow: `).concat(t("button.help.focus.ring.shadow"),`;
}

.p-button-danger {
    background: `).concat(t("button.danger.background"),`;
    border: 1px solid `).concat(t("button.danger.border.color"),`;
    color: `).concat(t("button.danger.color"),`;
}

.p-button-danger:not(:disabled):hover {
    background: `).concat(t("button.danger.hover.background"),`;
    border: 1px solid `).concat(t("button.danger.hover.border.color"),`;
    color: `).concat(t("button.danger.hover.color"),`;
}

.p-button-danger:not(:disabled):active {
    background: `).concat(t("button.danger.active.background"),`;
    border: 1px solid `).concat(t("button.danger.active.border.color"),`;
    color: `).concat(t("button.danger.active.color"),`;
}

.p-button-danger:focus-visible {
    outline-color: `).concat(t("button.danger.focus.ring.color"),`;
    box-shadow: `).concat(t("button.danger.focus.ring.shadow"),`;
}

.p-button-contrast {
    background: `).concat(t("button.contrast.background"),`;
    border: 1px solid `).concat(t("button.contrast.border.color"),`;
    color: `).concat(t("button.contrast.color"),`;
}

.p-button-contrast:not(:disabled):hover {
    background: `).concat(t("button.contrast.hover.background"),`;
    border: 1px solid `).concat(t("button.contrast.hover.border.color"),`;
    color: `).concat(t("button.contrast.hover.color"),`;
}

.p-button-contrast:not(:disabled):active {
    background: `).concat(t("button.contrast.active.background"),`;
    border: 1px solid `).concat(t("button.contrast.active.border.color"),`;
    color: `).concat(t("button.contrast.active.color"),`;
}

.p-button-contrast:focus-visible {
    outline-color: `).concat(t("button.contrast.focus.ring.color"),`;
    box-shadow: `).concat(t("button.contrast.focus.ring.shadow"),`;
}

.p-button-outlined {
    background: transparent;
    border-color: `).concat(t("button.outlined.primary.border.color"),`;
    color: `).concat(t("button.outlined.primary.color"),`;
}

.p-button-outlined:not(:disabled):hover {
    background: `).concat(t("button.outlined.primary.hover.background"),`;
    border-color: `).concat(t("button.outlined.primary.border.color"),`;
    color: `).concat(t("button.outlined.primary.color"),`;
}

.p-button-outlined:not(:disabled):active {
    background: `).concat(t("button.outlined.primary.active.background"),`;
    border-color: `).concat(t("button.outlined.primary.border.color"),`;
    color: `).concat(t("button.outlined.primary.color"),`;
}

.p-button-outlined.p-button-secondary {
    border-color: `).concat(t("button.outlined.secondary.border.color"),`;
    color: `).concat(t("button.outlined.secondary.color"),`;
}

.p-button-outlined.p-button-secondary:not(:disabled):hover {
    background: `).concat(t("button.outlined.secondary.hover.background"),`;
    border-color: `).concat(t("button.outlined.secondary.border.color"),`;
    color: `).concat(t("button.outlined.secondary.color"),`;
}

.p-button-outlined.p-button-secondary:not(:disabled):active {
    background: `).concat(t("button.outlined.secondary.active.background"),`;
    border-color: `).concat(t("button.outlined.secondary.border.color"),`;
    color: `).concat(t("button.outlined.secondary.color"),`;
}

.p-button-outlined.p-button-success {
    border-color: `).concat(t("button.outlined.success.border.color"),`;
    color: `).concat(t("button.outlined.success.color"),`;
}

.p-button-outlined.p-button-success:not(:disabled):hover {
    background: `).concat(t("button.outlined.success.hover.background"),`;
    border-color: `).concat(t("button.outlined.success.border.color"),`;
    color: `).concat(t("button.outlined.success.color"),`;
}

.p-button-outlined.p-button-success:not(:disabled):active {
    background: `).concat(t("button.outlined.success.active.background"),`;
    border-color: `).concat(t("button.outlined.success.border.color"),`;
    color: `).concat(t("button.outlined.success.color"),`;
}

.p-button-outlined.p-button-info {
    border-color: `).concat(t("button.outlined.info.border.color"),`;
    color: `).concat(t("button.outlined.info.color"),`;
}

.p-button-outlined.p-button-info:not(:disabled):hover {
    background: `).concat(t("button.outlined.info.hover.background"),`;
    border-color: `).concat(t("button.outlined.info.border.color"),`;
    color: `).concat(t("button.outlined.info.color"),`;
}

.p-button-outlined.p-button-info:not(:disabled):active {
    background: `).concat(t("button.outlined.info.active.background"),`;
    border-color: `).concat(t("button.outlined.info.border.color"),`;
    color: `).concat(t("button.outlined.info.color"),`;
}

.p-button-outlined.p-button-warn {
    border-color: `).concat(t("button.outlined.warn.border.color"),`;
    color: `).concat(t("button.outlined.warn.color"),`;
}

.p-button-outlined.p-button-warn:not(:disabled):hover {
    background: `).concat(t("button.outlined.warn.hover.background"),`;
    border-color: `).concat(t("button.outlined.warn.border.color"),`;
    color: `).concat(t("button.outlined.warn.color"),`;
}

.p-button-outlined.p-button-warn:not(:disabled):active {
    background: `).concat(t("button.outlined.warn.active.background"),`;
    border-color: `).concat(t("button.outlined.warn.border.color"),`;
    color: `).concat(t("button.outlined.warn.color"),`;
}

.p-button-outlined.p-button-help {
    border-color: `).concat(t("button.outlined.help.border.color"),`;
    color: `).concat(t("button.outlined.help.color"),`;
}

.p-button-outlined.p-button-help:not(:disabled):hover {
    background: `).concat(t("button.outlined.help.hover.background"),`;
    border-color: `).concat(t("button.outlined.help.border.color"),`;
    color: `).concat(t("button.outlined.help.color"),`;
}

.p-button-outlined.p-button-help:not(:disabled):active {
    background: `).concat(t("button.outlined.help.active.background"),`;
    border-color: `).concat(t("button.outlined.help.border.color"),`;
    color: `).concat(t("button.outlined.help.color"),`;
}

.p-button-outlined.p-button-danger {
    border-color: `).concat(t("button.outlined.danger.border.color"),`;
    color: `).concat(t("button.outlined.danger.color"),`;
}

.p-button-outlined.p-button-danger:not(:disabled):hover {
    background: `).concat(t("button.outlined.danger.hover.background"),`;
    border-color: `).concat(t("button.outlined.danger.border.color"),`;
    color: `).concat(t("button.outlined.danger.color"),`;
}

.p-button-outlined.p-button-danger:not(:disabled):active {
    background: `).concat(t("button.outlined.danger.active.background"),`;
    border-color: `).concat(t("button.outlined.danger.border.color"),`;
    color: `).concat(t("button.outlined.danger.color"),`;
}

.p-button-outlined.p-button-contrast {
    border-color: `).concat(t("button.outlined.contrast.border.color"),`;
    color: `).concat(t("button.outlined.contrast.color"),`;
}

.p-button-outlined.p-button-contrast:not(:disabled):hover {
    background: `).concat(t("button.outlined.contrast.hover.background"),`;
    border-color: `).concat(t("button.outlined.contrast.border.color"),`;
    color: `).concat(t("button.outlined.contrast.color"),`;
}

.p-button-outlined.p-button-contrast:not(:disabled):active {
    background: `).concat(t("button.outlined.contrast.active.background"),`;
    border-color: `).concat(t("button.outlined.contrast.border.color"),`;
    color: `).concat(t("button.outlined.contrast.color"),`;
}

.p-button-outlined.p-button-plain {
    border-color: `).concat(t("button.outlined.plain.border.color"),`;
    color: `).concat(t("button.outlined.plain.color"),`;
}

.p-button-outlined.p-button-plain:not(:disabled):hover {
    background: `).concat(t("button.outlined.plain.hover.background"),`;
    border-color: `).concat(t("button.outlined.plain.border.color"),`;
    color: `).concat(t("button.outlined.plain.color"),`;
}

.p-button-outlined.p-button-plain:not(:disabled):active {
    background: `).concat(t("button.outlined.plain.active.background"),`;
    border-color: `).concat(t("button.outlined.plain.border.color"),`;
    color: `).concat(t("button.outlined.plain.color"),`;
}

.p-button-text {
    background: transparent;
    border-color: transparent;
    color: `).concat(t("button.text.primary.color"),`;
}

.p-button-text:not(:disabled):hover {
    background: `).concat(t("button.text.primary.hover.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.primary.color"),`;
}

.p-button-text:not(:disabled):active {
    background: `).concat(t("button.text.primary.active.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.primary.color"),`;
}

.p-button-text.p-button-secondary {
    background: transparent;
    border-color: transparent;
    color: `).concat(t("button.text.secondary.color"),`;
}

.p-button-text.p-button-secondary:not(:disabled):hover {
    background: `).concat(t("button.text.secondary.hover.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.secondary.color"),`;
}

.p-button-text.p-button-secondary:not(:disabled):active {
    background: `).concat(t("button.text.secondary.active.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.secondary.color"),`;
}

.p-button-text.p-button-success {
    background: transparent;
    border-color: transparent;
    color: `).concat(t("button.text.success.color"),`;
}

.p-button-text.p-button-success:not(:disabled):hover {
    background: `).concat(t("button.text.success.hover.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.success.color"),`;
}

.p-button-text.p-button-success:not(:disabled):active {
    background: `).concat(t("button.text.success.active.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.success.color"),`;
}

.p-button-text.p-button-info {
    background: transparent;
    border-color: transparent;
    color: `).concat(t("button.text.info.color"),`;
}

.p-button-text.p-button-info:not(:disabled):hover {
    background: `).concat(t("button.text.info.hover.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.info.color"),`;
}

.p-button-text.p-button-info:not(:disabled):active {
    background: `).concat(t("button.text.info.active.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.info.color"),`;
}

.p-button-text.p-button-warn {
    background: transparent;
    border-color: transparent;
    color: `).concat(t("button.text.warn.color"),`;
}

.p-button-text.p-button-warn:not(:disabled):hover {
    background: `).concat(t("button.text.warn.hover.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.warn.color"),`;
}

.p-button-text.p-button-warn:not(:disabled):active {
    background: `).concat(t("button.text.warn.active.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.warn.color"),`;
}

.p-button-text.p-button-help {
    background: transparent;
    border-color: transparent;
    color: `).concat(t("button.text.help.color"),`;
}

.p-button-text.p-button-help:not(:disabled):hover {
    background: `).concat(t("button.text.help.hover.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.help.color"),`;
}

.p-button-text.p-button-help:not(:disabled):active {
    background: `).concat(t("button.text.help.active.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.help.color"),`;
}

.p-button-text.p-button-danger {
    background: transparent;
    border-color: transparent;
    color: `).concat(t("button.text.danger.color"),`;
}

.p-button-text.p-button-danger:not(:disabled):hover {
    background: `).concat(t("button.text.danger.hover.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.danger.color"),`;
}

.p-button-text.p-button-danger:not(:disabled):active {
    background: `).concat(t("button.text.danger.active.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.danger.color"),`;
}

.p-button-text.p-button-contrast {
    background: transparent;
    border-color: transparent;
    color: `).concat(t("button.text.contrast.color"),`;
}

.p-button-text.p-button-contrast:not(:disabled):hover {
    background: `).concat(t("button.text.contrast.hover.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.contrast.color"),`;
}

.p-button-text.p-button-contrast:not(:disabled):active {
    background: `).concat(t("button.text.contrast.active.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.contrast.color"),`;
}

.p-button-text.p-button-plain {
    background: transparent;
    border-color: transparent;
    color: `).concat(t("button.text.plain.color"),`;
}

.p-button-text.p-button-plain:not(:disabled):hover {
    background: `).concat(t("button.text.plain.hover.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.plain.color"),`;
}

.p-button-text.p-button-plain:not(:disabled):active {
    background: `).concat(t("button.text.plain.active.background"),`;
    border-color: transparent;
    color: `).concat(t("button.text.plain.color"),`;
}

.p-button-link {
    background: transparent;
    border-color: transparent;
    color: `).concat(t("button.link.color"),`;
}

.p-button-link:not(:disabled):hover {
    background: transparent;
    border-color: transparent;
    color: `).concat(t("button.link.hover.color"),`;
}

.p-button-link:not(:disabled):hover .p-button-label {
    text-decoration: underline;
}

.p-button-link:not(:disabled):active {
    background: transparent;
    border-color: transparent;
    color: `).concat(t("button.link.active.color"),`;
}
`)},Lo={root:function(n){var t=n.instance,o=n.props;return["p-button p-component",F(F(F(F(F(F(F(F(F({"p-button-icon-only":t.hasIcon&&!o.label&&!o.badge,"p-button-vertical":(o.iconPos==="top"||o.iconPos==="bottom")&&o.label,"p-button-loading":o.loading,"p-button-link":o.link||o.variant==="link"},"p-button-".concat(o.severity),o.severity),"p-button-raised",o.raised),"p-button-rounded",o.rounded),"p-button-text",o.text||o.variant==="text"),"p-button-outlined",o.outlined||o.variant==="outlined"),"p-button-sm",o.size==="small"),"p-button-lg",o.size==="large"),"p-button-plain",o.plain),"p-button-fluid",t.hasFluid)]},loadingIcon:"p-button-loading-icon",icon:function(n){var t=n.props;return["p-button-icon",F({},"p-button-icon-".concat(t.iconPos),t.label)]},label:"p-button-label"},Eo=nt.extend({name:"button",theme:$o,classes:Lo}),Bo={name:"BaseButton",extends:ut,props:{label:{type:String,default:null},icon:{type:String,default:null},iconPos:{type:String,default:"left"},iconClass:{type:[String,Object],default:null},badge:{type:String,default:null},badgeClass:{type:[String,Object],default:null},badgeSeverity:{type:String,default:"secondary"},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1},link:{type:Boolean,default:!1},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},variant:{type:String,default:null},plain:{type:Boolean,default:!1},fluid:{type:Boolean,default:null}},style:Eo,provide:function(){return{$pcButton:this,$parentInstance:this}}},sn={name:"Button",extends:Bo,inheritAttrs:!1,inject:{$pcFluid:{default:null}},methods:{getPTOptions:function(n){var t=n==="root"?this.ptmi:this.ptm;return t(n,{context:{disabled:this.disabled}})}},computed:{disabled:function(){return this.$attrs.disabled||this.$attrs.disabled===""||this.loading},defaultAriaLabel:function(){return this.label?this.label+(this.badge?" "+this.badge:""):this.$attrs.ariaLabel},hasIcon:function(){return this.icon||this.$slots.icon},attrs:function(){return w(this.asAttrs,this.a11yAttrs,this.getPTOptions("root"))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{"aria-label":this.defaultAriaLabel,"data-pc-name":"button","data-p-disabled":this.disabled,"data-p-severity":this.severity}},hasFluid:function(){return qt(this.fluid)?!!this.$pcFluid:this.fluid}},components:{SpinnerIcon:an,Badge:ln},directives:{ripple:yt}};function Do(e,n,t,o,a,r){var s=q("SpinnerIcon"),u=q("Badge"),c=kt("ripple");return e.asChild?v(e.$slots,"default",{key:1,class:x(e.cx("root")),a11yAttrs:r.a11yAttrs}):dt((i(),m(vt(e.as),w({key:0,class:e.cx("root")},r.attrs),{default:p(function(){return[v(e.$slots,"default",{},function(){return[e.loading?v(e.$slots,"loadingicon",w({key:0,class:[e.cx("loadingIcon"),e.cx("icon")]},e.ptm("loadingIcon")),function(){return[e.loadingIcon?(i(),g("span",w({key:0,class:[e.cx("loadingIcon"),e.cx("icon"),e.loadingIcon]},e.ptm("loadingIcon")),null,16)):(i(),m(s,w({key:1,class:[e.cx("loadingIcon"),e.cx("icon")],spin:""},e.ptm("loadingIcon")),null,16,["class"]))]}):v(e.$slots,"icon",w({key:1,class:[e.cx("icon")]},e.ptm("icon")),function(){return[e.icon?(i(),g("span",w({key:0,class:[e.cx("icon"),e.icon,e.iconClass]},e.ptm("icon")),null,16)):S("",!0)]}),b("span",w({class:e.cx("label")},e.ptm("label")),D(e.label||" "),17),e.badge?(i(),m(u,{key:2,value:e.badge,class:x(e.badgeClass),severity:e.badgeSeverity,unstyled:e.unstyled,pt:e.ptm("pcBadge")},null,8,["value","class","severity","unstyled","pt"])):S("",!0)]})]}),_:3},16,["class"])),[[c]])}sn.render=Do;var zo=function(n){var t=n.dt;return`
.p-dialog {
    max-height: 90%;
    transform: scale(1);
    border-radius: `.concat(t("dialog.border.radius"),`;
    box-shadow: `).concat(t("dialog.shadow"),`;
    background: `).concat(t("dialog.background"),`;
    border: 1px solid `).concat(t("dialog.border.color"),`;
    color: `).concat(t("dialog.color"),`;
}

.p-dialog-content {
    overflow-y: auto;
    padding: `).concat(t("dialog.content.padding"),`;
}

.p-dialog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    padding: `).concat(t("dialog.header.padding"),`;
}

.p-dialog-title {
    font-weight: `).concat(t("dialog.title.font.weight"),`;
    font-size: `).concat(t("dialog.title.font.size"),`;
}

.p-dialog-footer {
    flex-shrink: 0;
    padding: `).concat(t("dialog.footer.padding"),`;
    display: flex;
    justify-content: flex-end;
    gap: `).concat(t("dialog.footer.gap"),`;
}

.p-dialog-header-actions {
    display: flex;
    align-items: center;
    gap: `).concat(t("dialog.header.gap"),`;
}

.p-dialog-enter-active {
    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);
}

.p-dialog-leave-active {
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.p-dialog-enter-from,
.p-dialog-leave-to {
    opacity: 0;
    transform: scale(0.7);
}

.p-dialog-top .p-dialog,
.p-dialog-bottom .p-dialog,
.p-dialog-left .p-dialog,
.p-dialog-right .p-dialog,
.p-dialog-topleft .p-dialog,
.p-dialog-topright .p-dialog,
.p-dialog-bottomleft .p-dialog,
.p-dialog-bottomright .p-dialog {
    margin: 0.75rem;
    transform: translate3d(0px, 0px, 0px);
}

.p-dialog-top .p-dialog-enter-active,
.p-dialog-top .p-dialog-leave-active,
.p-dialog-bottom .p-dialog-enter-active,
.p-dialog-bottom .p-dialog-leave-active,
.p-dialog-left .p-dialog-enter-active,
.p-dialog-left .p-dialog-leave-active,
.p-dialog-right .p-dialog-enter-active,
.p-dialog-right .p-dialog-leave-active,
.p-dialog-topleft .p-dialog-enter-active,
.p-dialog-topleft .p-dialog-leave-active,
.p-dialog-topright .p-dialog-enter-active,
.p-dialog-topright .p-dialog-leave-active,
.p-dialog-bottomleft .p-dialog-enter-active,
.p-dialog-bottomleft .p-dialog-leave-active,
.p-dialog-bottomright .p-dialog-enter-active,
.p-dialog-bottomright .p-dialog-leave-active {
    transition: all 0.3s ease-out;
}

.p-dialog-top .p-dialog-enter-from,
.p-dialog-top .p-dialog-leave-to {
    transform: translate3d(0px, -100%, 0px);
}

.p-dialog-bottom .p-dialog-enter-from,
.p-dialog-bottom .p-dialog-leave-to {
    transform: translate3d(0px, 100%, 0px);
}

.p-dialog-left .p-dialog-enter-from,
.p-dialog-left .p-dialog-leave-to,
.p-dialog-topleft .p-dialog-enter-from,
.p-dialog-topleft .p-dialog-leave-to,
.p-dialog-bottomleft .p-dialog-enter-from,
.p-dialog-bottomleft .p-dialog-leave-to {
    transform: translate3d(-100%, 0px, 0px);
}

.p-dialog-right .p-dialog-enter-from,
.p-dialog-right .p-dialog-leave-to,
.p-dialog-topright .p-dialog-enter-from,
.p-dialog-topright .p-dialog-leave-to,
.p-dialog-bottomright .p-dialog-enter-from,
.p-dialog-bottomright .p-dialog-leave-to {
    transform: translate3d(100%, 0px, 0px);
}

.p-dialog-left:dir(rtl) .p-dialog-enter-from,
.p-dialog-left:dir(rtl) .p-dialog-leave-to,
.p-dialog-topleft:dir(rtl) .p-dialog-enter-from,
.p-dialog-topleft:dir(rtl) .p-dialog-leave-to,
.p-dialog-bottomleft:dir(rtl) .p-dialog-enter-from,
.p-dialog-bottomleft:dir(rtl) .p-dialog-leave-to {
    transform: translate3d(100%, 0px, 0px);
}

.p-dialog-right:dir(rtl) .p-dialog-enter-from,
.p-dialog-right:dir(rtl) .p-dialog-leave-to,
.p-dialog-topright:dir(rtl) .p-dialog-enter-from,
.p-dialog-topright:dir(rtl) .p-dialog-leave-to,
.p-dialog-bottomright:dir(rtl) .p-dialog-enter-from,
.p-dialog-bottomright:dir(rtl) .p-dialog-leave-to {
    transform: translate3d(-100%, 0px, 0px);
}

.p-dialog-maximized {
    width: 100vw !important;
    height: 100vh !important;
    top: 0px !important;
    left: 0px !important;
    max-height: 100%;
    height: 100%;
    border-radius: 0;
}

.p-dialog-maximized .p-dialog-content {
    flex-grow: 1;
}
`)},Io={mask:function(n){var t=n.position,o=n.modal;return{position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",justifyContent:t==="left"||t==="topleft"||t==="bottomleft"?"flex-start":t==="right"||t==="topright"||t==="bottomright"?"flex-end":"center",alignItems:t==="top"||t==="topleft"||t==="topright"?"flex-start":t==="bottom"||t==="bottomleft"||t==="bottomright"?"flex-end":"center",pointerEvents:o?"auto":"none"}},root:{display:"flex",flexDirection:"column",pointerEvents:"auto"}},Oo={mask:function(n){var t=n.props,o=["left","right","top","topleft","topright","bottom","bottomleft","bottomright"],a=o.find(function(r){return r===t.position});return["p-dialog-mask",{"p-overlay-mask p-overlay-mask-enter":t.modal},a?"p-dialog-".concat(a):""]},root:function(n){var t=n.props,o=n.instance;return["p-dialog p-component",{"p-dialog-maximized":t.maximizable&&o.maximized}]},header:"p-dialog-header",title:"p-dialog-title",headerActions:"p-dialog-header-actions",pcMaximizeButton:"p-dialog-maximize-button",pcCloseButton:"p-dialog-close-button",content:"p-dialog-content",footer:"p-dialog-footer"},Po=nt.extend({name:"dialog",theme:zo,classes:Oo,inlineStyles:Io}),To={name:"BaseDialog",extends:ut,props:{header:{type:null,default:null},footer:{type:null,default:null},visible:{type:Boolean,default:!1},modal:{type:Boolean,default:null},contentStyle:{type:null,default:null},contentClass:{type:String,default:null},contentProps:{type:null,default:null},maximizable:{type:Boolean,default:!1},dismissableMask:{type:Boolean,default:!1},closable:{type:Boolean,default:!0},closeOnEscape:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!1},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},position:{type:String,default:"center"},breakpoints:{type:Object,default:null},draggable:{type:Boolean,default:!0},keepInViewport:{type:Boolean,default:!0},minX:{type:Number,default:0},minY:{type:Number,default:0},appendTo:{type:[String,Object],default:"body"},closeIcon:{type:String,default:void 0},maximizeIcon:{type:String,default:void 0},minimizeIcon:{type:String,default:void 0},closeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},maximizeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},_instance:null},style:Po,provide:function(){return{$pcDialog:this,$parentInstance:this}}},cn={name:"Dialog",extends:To,inheritAttrs:!1,emits:["update:visible","show","hide","after-hide","maximize","unmaximize","dragstart","dragend"],provide:function(){var n=this;return{dialogRef:C(function(){return n._instance})}},data:function(){return{id:this.$attrs.id,containerVisible:this.visible,maximized:!1,focusableMax:null,focusableClose:null,target:null}},watch:{"$attrs.id":function(n){this.id=n||zt()}},documentKeydownListener:null,container:null,mask:null,content:null,headerContainer:null,footerContainer:null,maximizableButton:null,closeButton:null,styleElement:null,dragging:null,documentDragListener:null,documentDragEndListener:null,lastPageX:null,lastPageY:null,maskMouseDownTarget:null,updated:function(){this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.unbindDocumentState(),this.unbindGlobalListeners(),this.destroyStyle(),this.mask&&this.autoZIndex&&U.clear(this.mask),this.container=null,this.mask=null},mounted:function(){this.id=this.id||zt(),this.breakpoints&&this.createStyle()},methods:{close:function(){this.$emit("update:visible",!1)},onEnter:function(){this.$emit("show"),this.target=document.activeElement,this.enableDocumentSettings(),this.bindGlobalListeners(),this.autoZIndex&&U.set("modal",this.mask,this.baseZIndex+this.$primevue.config.zIndex.modal)},onAfterEnter:function(){this.focus()},onBeforeLeave:function(){this.modal&&!this.isUnstyled&&Yt(this.mask,"p-overlay-mask-leave"),this.dragging&&this.documentDragEndListener&&this.documentDragEndListener()},onLeave:function(){this.$emit("hide"),V(this.target),this.target=null,this.focusableClose=null,this.focusableMax=null},onAfterLeave:function(){this.autoZIndex&&U.clear(this.mask),this.containerVisible=!1,this.unbindDocumentState(),this.unbindGlobalListeners(),this.$emit("after-hide")},onMaskMouseDown:function(n){this.maskMouseDownTarget=n.target},onMaskMouseUp:function(){this.dismissableMask&&this.modal&&this.mask===this.maskMouseDownTarget&&this.close()},focus:function(){var n=function(a){return a&&a.querySelector("[autofocus]")},t=this.$slots.footer&&n(this.footerContainer);t||(t=this.$slots.header&&n(this.headerContainer),t||(t=this.$slots.default&&n(this.content),t||(this.maximizable?(this.focusableMax=!0,t=this.maximizableButton):(this.focusableClose=!0,t=this.closeButton)))),t&&V(t,{focusVisible:!0})},maximize:function(n){this.maximized?(this.maximized=!1,this.$emit("unmaximize",n)):(this.maximized=!0,this.$emit("maximize",n)),this.modal||(this.maximized?It():Ot())},enableDocumentSettings:function(){(this.modal||!this.modal&&this.blockScroll||this.maximizable&&this.maximized)&&It()},unbindDocumentState:function(){(this.modal||!this.modal&&this.blockScroll||this.maximizable&&this.maximized)&&Ot()},onKeyDown:function(n){n.code==="Escape"&&this.closeOnEscape&&this.close()},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},containerRef:function(n){this.container=n},maskRef:function(n){this.mask=n},contentRef:function(n){this.content=n},headerContainerRef:function(n){this.headerContainer=n},footerContainerRef:function(n){this.footerContainer=n},maximizableRef:function(n){this.maximizableButton=n?n.$el:void 0},closeButtonRef:function(n){this.closeButton=n?n.$el:void 0},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var n;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",Nt(this.styleElement,"nonce",(n=this.$primevue)===null||n===void 0||(n=n.config)===null||n===void 0||(n=n.csp)===null||n===void 0?void 0:n.nonce),document.head.appendChild(this.styleElement);var t="";for(var o in this.breakpoints)t+=`
                        @media screen and (max-width: `.concat(o,`) {
                            .p-dialog[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[o],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=t}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},initDrag:function(n){n.target.closest("div").getAttribute("data-pc-section")!=="headeractions"&&this.draggable&&(this.dragging=!0,this.lastPageX=n.pageX,this.lastPageY=n.pageY,this.container.style.margin="0",document.body.setAttribute("data-p-unselectable-text","true"),!this.isUnstyled&&Ut(document.body,{"user-select":"none"}),this.$emit("dragstart",n))},bindGlobalListeners:function(){this.draggable&&(this.bindDocumentDragListener(),this.bindDocumentDragEndListener()),this.closeOnEscape&&this.closable&&this.bindDocumentKeyDownListener()},unbindGlobalListeners:function(){this.unbindDocumentDragListener(),this.unbindDocumentDragEndListener(),this.unbindDocumentKeyDownListener()},bindDocumentDragListener:function(){var n=this;this.documentDragListener=function(t){if(n.dragging){var o=Un(n.container),a=Yn(n.container),r=t.pageX-n.lastPageX,s=t.pageY-n.lastPageY,u=n.container.getBoundingClientRect(),c=u.left+r,l=u.top+s,y=Nn(),k=getComputedStyle(n.container),_=parseFloat(k.marginLeft),$=parseFloat(k.marginTop);n.container.style.position="fixed",n.keepInViewport?(c>=n.minX&&c+o<y.width&&(n.lastPageX=t.pageX,n.container.style.left=c-_+"px"),l>=n.minY&&l+a<y.height&&(n.lastPageY=t.pageY,n.container.style.top=l-$+"px")):(n.lastPageX=t.pageX,n.container.style.left=c-_+"px",n.lastPageY=t.pageY,n.container.style.top=l-$+"px")}},window.document.addEventListener("mousemove",this.documentDragListener)},unbindDocumentDragListener:function(){this.documentDragListener&&(window.document.removeEventListener("mousemove",this.documentDragListener),this.documentDragListener=null)},bindDocumentDragEndListener:function(){var n=this;this.documentDragEndListener=function(t){n.dragging&&(n.dragging=!1,document.body.removeAttribute("data-p-unselectable-text"),!n.isUnstyled&&(document.body.style["user-select"]=""),n.$emit("dragend",t))},window.document.addEventListener("mouseup",this.documentDragEndListener)},unbindDocumentDragEndListener:function(){this.documentDragEndListener&&(window.document.removeEventListener("mouseup",this.documentDragEndListener),this.documentDragEndListener=null)}},computed:{maximizeIconComponent:function(){return this.maximized?this.minimizeIcon?"span":"WindowMinimizeIcon":this.maximizeIcon?"span":"WindowMaximizeIcon"},ariaLabelledById:function(){return this.header!=null||this.$attrs["aria-labelledby"]!==null?this.id+"_header":null},closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},directives:{ripple:yt,focustrap:tn},components:{Button:sn,Portal:Wt,WindowMinimizeIcon:rn,WindowMaximizeIcon:on,TimesIcon:Wn}};function tt(e){"@babel/helpers - typeof";return tt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},tt(e)}function Ht(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,o)}return t}function Rt(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?Ht(Object(t),!0).forEach(function(o){Mo(e,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Ht(Object(t)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))})}return e}function Mo(e,n,t){return(n=Ao(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function Ao(e){var n=Ho(e,"string");return tt(n)=="symbol"?n:n+""}function Ho(e,n){if(tt(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var o=t.call(e,n||"default");if(tt(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var Ro=["aria-labelledby","aria-modal"],Fo=["id"];function Ko(e,n,t,o,a,r){var s=q("Button"),u=q("Portal"),c=kt("focustrap");return i(),m(u,{appendTo:e.appendTo},{default:p(function(){return[a.containerVisible?(i(),g("div",w({key:0,ref:r.maskRef,class:e.cx("mask"),style:e.sx("mask",!0,{position:e.position,modal:e.modal}),onMousedown:n[1]||(n[1]=function(){return r.onMaskMouseDown&&r.onMaskMouseDown.apply(r,arguments)}),onMouseup:n[2]||(n[2]=function(){return r.onMaskMouseUp&&r.onMaskMouseUp.apply(r,arguments)})},e.ptm("mask")),[d(Zt,w({name:"p-dialog",onEnter:r.onEnter,onAfterEnter:r.onAfterEnter,onBeforeLeave:r.onBeforeLeave,onLeave:r.onLeave,onAfterLeave:r.onAfterLeave,appear:""},e.ptm("transition")),{default:p(function(){return[e.visible?dt((i(),g("div",w({key:0,ref:r.containerRef,class:e.cx("root"),style:e.sx("root"),role:"dialog","aria-labelledby":r.ariaLabelledById,"aria-modal":e.modal},e.ptmi("root")),[e.$slots.container?v(e.$slots,"container",{key:0,closeCallback:r.close,maximizeCallback:function(y){return r.maximize(y)}}):(i(),g(P,{key:1},[e.showHeader?(i(),g("div",w({key:0,ref:r.headerContainerRef,class:e.cx("header"),onMousedown:n[0]||(n[0]=function(){return r.initDrag&&r.initDrag.apply(r,arguments)})},e.ptm("header")),[v(e.$slots,"header",{class:x(e.cx("title"))},function(){return[e.header?(i(),g("span",w({key:0,id:r.ariaLabelledById,class:e.cx("title")},e.ptm("title")),D(e.header),17,Fo)):S("",!0)]}),b("div",w({class:e.cx("headerActions")},e.ptm("headerActions")),[e.maximizable?(i(),m(s,w({key:0,ref:r.maximizableRef,autofocus:a.focusableMax,class:e.cx("pcMaximizeButton"),onClick:r.maximize,tabindex:e.maximizable?"0":"-1",unstyled:e.unstyled},e.maximizeButtonProps,{pt:e.ptm("pcMaximizeButton"),"data-pc-group-section":"headericon"}),{icon:p(function(l){return[v(e.$slots,"maximizeicon",{maximized:a.maximized},function(){return[(i(),m(vt(r.maximizeIconComponent),w({class:[l.class,a.maximized?e.minimizeIcon:e.maximizeIcon]},e.ptm("pcMaximizeButton").icon),null,16,["class"]))]})]}),_:3},16,["autofocus","class","onClick","tabindex","unstyled","pt"])):S("",!0),e.closable?(i(),m(s,w({key:1,ref:r.closeButtonRef,autofocus:a.focusableClose,class:e.cx("pcCloseButton"),onClick:r.close,"aria-label":r.closeAriaLabel,unstyled:e.unstyled},e.closeButtonProps,{pt:e.ptm("pcCloseButton"),"data-pc-group-section":"headericon"}),{icon:p(function(l){return[v(e.$slots,"closeicon",{},function(){return[(i(),m(vt(e.closeIcon?"span":"TimesIcon"),w({class:[e.closeIcon,l.class]},e.ptm("pcCloseButton").icon),null,16,["class"]))]})]}),_:3},16,["autofocus","class","onClick","aria-label","unstyled","pt"])):S("",!0)],16)],16)):S("",!0),b("div",w({ref:r.contentRef,class:[e.cx("content"),e.contentClass],style:e.contentStyle},Rt(Rt({},e.contentProps),e.ptm("content"))),[v(e.$slots,"default")],16),e.footer||e.$slots.footer?(i(),g("div",w({key:1,ref:r.footerContainerRef,class:e.cx("footer")},e.ptm("footer")),[v(e.$slots,"footer",{},function(){return[K(D(e.footer),1)]})],16)):S("",!0)],64))],16,Ro)),[[c,{disabled:!e.modal}]]):S("",!0)]}),_:3},16,["onEnter","onAfterEnter","onBeforeLeave","onLeave","onAfterLeave"])],16)):S("",!0)]}),_:3},8,["appendTo"])}cn.render=Ko;const jo=h({__name:"GDialog",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1},contrast:{type:Boolean,default:!1},header:{},footer:{},visible:{type:Boolean},modal:{type:Boolean},contentStyle:{},contentClass:{},contentProps:{},closable:{type:Boolean},dismissableMask:{type:Boolean},closeOnEscape:{type:Boolean},showHeader:{type:Boolean},blockScroll:{type:Boolean},baseZIndex:{},autoZIndex:{type:Boolean},position:{},maximizable:{type:Boolean},breakpoints:{},draggable:{type:Boolean},keepInViewPort:{type:Boolean},minX:{},minY:{},appendTo:{},style:{},closeIcon:{},maximizeIcon:{},minimizeIcon:{},closeButtonProps:{},maximizeButtonProps:{},dt:{},pt:{},ptOptions:{},unstyled:{type:Boolean}},setup(e){const n=R(),t=e,o=Zn(),a=C(()=>({...o,...t})),r=C(()=>t.secondary?n.value.secondary:t.tertiary?n.value.tertiary:n.value.primary);return(s,u)=>(i(),m(f(cn),w(a.value,{style:{backgroundColor:r.value,color:f(n).text,borderColor:f(n).text},"pt:root:class":"!border-0"}),{default:p(()=>[v(s.$slots,"header"),v(s.$slots,"default"),v(s.$slots,"footer")]),_:3},16,["style"]))}}),Go={class:"font-bold text-lg text-md mb-1"},St=h({__name:"HelpSection",props:{title:{}},setup(e){return(n,t)=>(i(),g("div",null,[b("h2",Go,D(n.title),1),b("div",null,[v(n.$slots,"default")])]))}}),Vo={class:"flex gap-2 text-sm"},Ft="https://github.com/Yonava/magic-graphs",Uo=h({__name:"HelpLinks",setup(e){const n=o=>window.open(o,"_blank"),t=`${Ft}/issues/new?template=Blank%20issue`;return(o,a)=>(i(),m(St,{title:"Links To Have Handy"},{default:p(()=>[b("div",Vo,[d(T,{onClick:a[0]||(a[0]=r=>n(t)),class:"flex gap-2",tertiary:""},{default:p(()=>[d(O,{icon:"bug"}),a[2]||(a[2]=K(" I Found An Issue "))]),_:1}),d(T,{onClick:a[1]||(a[1]=r=>n(Ft)),class:"flex gap-2",tertiary:""},{default:p(()=>[d(O,{icon:"github"}),a[3]||(a[3]=K(" Star Us On GitHub "))]),_:1})])]),_:1}))}}),Yo={class:x(["border-[1px]","rounded-md","px-2","mx-[1px]","text-xs","capitalize"])},No={key:1},Wo={key:2},Zo=h({__name:"HelpShortcutKey",props:{keyboardKey:{}},setup(e){const n=e,t={meta:"⌘"},o=Object.keys(t),a={rightArrow:"arrow-right",leftArrow:"arrow-left"},r=Object.keys(a),s=C(()=>r.includes(n.keyboardKey)),u=C(()=>o.includes(n.keyboardKey));return(c,l)=>(i(),g("div",Yo,[s.value?(i(),m(O,{key:0,icon:a[c.keyboardKey],class:"text-xs"},null,8,["icon"])):u.value?(i(),g("p",No,D(t[c.keyboardKey]),1)):(i(),g("p",Wo,D(c.keyboardKey),1))]))}}),Xo={class:"flex flex-col gap-1"},qo={class:"flex"},Jo=h({__name:"HelpShortcuts",setup(e){const n=r=>r.split("+").map(s=>s.trim()).filter(s=>s!==""),{activeShortcuts:t}=A.value.shortcut,o={Fullscreen:{binding:"F"},"Pause/Play Simulation":{binding:"Space"},"Simulation Step Forward":{binding:"rightArrow"},"Simulation Step Backward":{binding:"leftArrow"}},a=C(()=>Object.assign(t,o));return(r,s)=>(i(),m(St,{title:"Useful Shortcuts"},{default:p(()=>[b("div",Xo,[(i(!0),g(P,null,j(a.value,(u,c)=>(i(),g("div",{key:c,class:"flex justify-between items-center"},[K(D(c)+" ",1),b("div",qo,[(i(!0),g(P,null,j(n(u.binding),l=>(i(),g("div",{key:l},[d(Zo,{"keyboard-key":l},null,8,["keyboard-key"])]))),128))])]))),128))])]),_:1}))}}),Qo=h({__name:"HelpVideos",setup(e){return(n,t)=>(i(),m(St,{title:"Hungry For More? Watch Our Tutorials"},{default:p(()=>t[0]||(t[0]=[b("iframe",{width:"560",height:"315",src:"https://www.youtube.com/embed/MvLXdpvDh90?si=y62b2TUkGWIZkDG8",title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",referrerpolicy:"strict-origin-when-cross-origin",allowfullscreen:""},null,-1)])),_:1}))}}),tr={class:"flex flex-col gap-4 h-[500px] overflow-auto"},nr=h({__name:"HelpContent",setup(e){return(n,t)=>(i(),g("div",null,[t[0]||(t[0]=b("h1",{class:"text-2xl font-bold mb-3 mt-4"},"Here's Some Help 👇",-1)),b("div",tr,[d(Jo),d(Uo),d(Qo)])]))}}),er=h({__name:"HelpMenu",setup(e){const n=B(!1),t=B();jt(t,()=>{n.value=!1});const o=()=>{n.value=!n.value};return(a,r)=>(i(),g(P,null,[d(T,{onClick:o,class:"aspect-square w-[45px]"},{default:p(()=>[d(O,{icon:"help"})]),_:1}),d(jo,{visible:n.value,"onUpdate:visible":r[0]||(r[0]=s=>n.value=s)},{default:p(()=>[b("div",{ref_key:"dialogContent",ref:t},[d(nr)],512)]),_:1},8,["visible"])],64))}}),or={class:"relative max-h-3/4 w-full grid place-items-center overflow-auto"},rr={class:"relative max-h-3/4 w-full grid place-items-center overflow-auto"},pr=h({__name:"GraphProduct",props:{graph:{}},emits:["graph-ref","simulation-started","simulation-stopped"],setup(e,{emit:n}){const t=e,o=B(!1),a=n,r=ce(t.graph),s=B(r[0]),u=B(!1),c=C(()=>s.value.runner),l=C(()=>c.value.simControls.isActive),y=async()=>{u.value=!0,a("simulation-started",s.value),await c.value.start()},k=async()=>{await c.value.stop(),u.value=!1,a("simulation-stopped"),o.value&&t.graph.annotation.activate(),o.value=!1},_=E=>{o.value=t.graph.annotation.isActive.value,t.graph.annotation.deactivate(),s.value=E,y()},$=B();be(t.graph);const z=B(!1),L=C(()=>z.value?"pointer-events-none":"");return Kt(()=>{a("graph-ref",$.value),t.graph.subscribe("onMouseDown",()=>{z.value=!0}),t.graph.subscribe("onMouseUp",()=>{z.value=!1})}),ht(()=>{t.graph.unsubscribe("onMouseDown",()=>{}),t.graph.unsubscribe("onMouseUp",()=>{})}),(E,N)=>(i(),g(P,null,[d(Qn,{onGraphRef:N[0]||(N[0]=ot=>$.value=ot),graph:E.graph},null,8,["graph"]),b("div",{class:x(["absolute","top-6","w-full","flex","flex-col","justify-center","items-center","gap-2",L.value])},[u.value?v(E.$slots,"top-center-sim",{key:0}):v(E.$slots,"top-center",{key:1})],2),b("div",{class:x(["absolute","grid","place-items-center","left-4","top-0","h-full","max-w-96",L.value])},[b("div",or,[u.value?v(E.$slots,"center-left-sim",{key:0}):v(E.$slots,"center-left",{key:1})])],2),b("div",{class:x(["absolute","grid","place-items-center","right-4","top-0","h-full","max-w-96",L.value])},[b("div",rr,[u.value?v(E.$slots,"center-right-sim",{key:0}):v(E.$slots,"center-right",{key:1})])],2),b("div",{class:x(["absolute","top-6","left-6",L.value])},[d(eo)],2),b("div",{class:x(["absolute","top-6","right-6",L.value])},[u.value?v(E.$slots,"top-right-sim",{key:0},()=>[d(uo,{onClick:k})]):v(E.$slots,"top-right",{key:1},()=>[d(co,{onSimulationSelected:_,simulations:f(r)},null,8,["simulations"])])],2),b("div",{class:x(["absolute","bottom-8","gap-4","w-full","flex","flex-col","justify-center","items-center",L.value])},[u.value&&l.value?v(E.$slots,"bottom-center-sim",{key:0},()=>[d(xe,{controls:c.value.simControls},null,8,["controls"])]):v(E.$slots,"bottom-center",{key:1},()=>[dt(b("div",null,[d(Oe)],512),[[Xn,E.graph.annotation.isActive.value]])])],2),b("div",{class:x(["absolute","flex","gap-2","bottom-8","left-8",L.value])},[d(er),d(go)],2),b("div",{class:x(["absolute","flex","gap-2","bottom-8","right-8",L.value])},[d(bo),d(po)],2)],64))}});export{pr as _,T as a,Y as b,ro as c,xt as d,et as e,G as f,Tt as g,X as h,Ct as i,Ee as j,dr as p,ue as u};
