import{_ as dn,h as pn,i as bn,j as fn,k as gn,l as mn,m as vn,n as hn,p as yn,q as kn,s as wn,u as Cn,v as xn,aC as ut,ad as _n,aD as $n,aE as st,aF as ct,an as jt,aG as Sn,ag as Ln,d as y,a3 as R,E as x,o as i,A as f,w as p,a6 as v,b as d,aH as En,c as g,a as m,I as _,Z as I,y as b,aI as Dn,g as B,D as Lt,aJ as Bn,F as O,f as G,t as z,C as $,Q as zn,W as A,ak as ht,aK as mt,S as In,aL as Z,z as F,X as Ht,al as Pn,ac as C,ab as et,aM as On,aN as U,aO as Y,aP as Mn,aQ as Et,aa as Kt,aR as Tn,aS as An,aT as W,aU as Gt,aV as Fn,aW as Dt,aX as Rn,aY as Vt,aZ as jn,a_ as Hn,a$ as Kn,b0 as Ut,b1 as yt,b2 as Wt,a9 as dt,r as J,ae as kt,b3 as Nt,J as pt,b4 as Zt,e as H,b5 as Gn,b6 as wt,b7 as Yt,b8 as vt,b9 as Bt,ba as zt,bb as It,bc as Vn,bd as Un,be as Wn,bf as Nn,aq as Zn}from"./index-ChF9fs9q.js";import{C as Yn,B as Xn,_ as qn}from"./Graph.vue_vue_type_script_setup_true_lang-N34b0Wvx.js";import{_ as Xt,t as Jn}from"./Button.vue_vue_type_script_setup_true_lang-DAyKB53e.js";import{_ as P}from"./Icon.vue_vue_type_script_setup_true_lang-rhaDdO84.js";import{_ as Qn}from"./TutorialHint.vue_vue_type_script_setup_true_lang-dwSU5-Dp.js";import{u as te,a as X,M as ne,b as ee}from"./ResponsiveCanvas.vue_vue_type_script_setup_true_lang-Xsf6q3bT.js";const oe=Object.assign({"/src/menu/info.ts":dn,"/src/playground/graph/info.ts":pn,"/src/playground/shape/info.ts":bn,"/src/products/basic-search/info.ts":fn,"/src/products/binary-trees/info.ts":gn,"/src/products/dijkstras/info.ts":mn,"/src/products/graph-sandbox/info.ts":vn,"/src/products/markov-chains-legacy/info.ts":hn,"/src/products/markov-chains/info.ts":yn,"/src/products/min-spanning-tree/info.ts":kn,"/src/products/network-flow/info.ts":wn,"/src/products/search-visualizer/info.ts":Cn,"/src/products/set-visualizer/info.ts":xn}),ot=Object.values(oe).flatMap(e=>e.default);ot.map(e=>e.route);const Xo=ot.reduce((e,n)=>(e[n.productId]=n,e),{}),Ct=ot.reduce((e,n)=>(e[n.route.path]=n,e),{}),re=e=>ot.map(o=>o.simulations).filter(Boolean).map(o=>o(e)).flat(),ae=(e,n)=>{const t=ut();if(!n){const a=Ct[t.path];if(!a)throw new Error(`product not found for ${t.path}`);n=a.simulations}return(n??re)(e)},ie=()=>{const e=ut(),n=_n(),t=a=>{const r=e.query.rid;return typeof r=="string"&&r.length>0?`${a}?rid=${r}`:a};return{navigate:a=>{var s,l;const r=(l=(s=a.route)==null?void 0:s.redirect)==null?void 0:l.toString(),u=r==null?void 0:r.startsWith("http");if(r&&u)return window.open(r,"_blank");n.push(t(a.route.path))},productLink:t}},Pt=["sandbox","algorithms","data structures","math","developer tools"],le=()=>{const e=ut();return Ct[e.path]},se=e=>"redirect"in e.route,ce=(e,n)=>{const t=ut();if(!n){const s=Ct[t.path];if(!s)throw new Error(`no product found for route ${t.path}`);n=s}const{connectToRoom:o}=Ln,a=t.query.rid,{productId:r,name:u}=n;document.title=`${u} - Magic Algorithms`,$n.value=e,setTimeout(()=>{st.value&&(e.load(st.value),st.value=void 0)},5),setTimeout(()=>{ct.value&&(e.annotation.load(ct.value),ct.value=void 0)},5),jt(()=>{if(a){if(typeof a!="string")return console.error("room id must be a string");o({graph:e,roomId:a,productId:r})}}),Sn(()=>{var s;(s=n.state)==null||s.reset()})},M=y({__name:"GButton",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1},contrast:{type:Boolean,default:!1}},setup(e){const n=R(),t=e,o=x(()=>t.secondary?n.value.secondary:t.tertiary?n.value.tertiary:t.contrast?n.value.contrast:n.value.primary);return(a,r)=>(i(),f(Xt,{color:o.value},{default:p(()=>[v(a.$slots,"default")]),_:3},8,["color"]))}}),it=y({__name:"PlaybackButton",props:{icon:{}},setup(e){return(n,t)=>(i(),f(M,{style:{"border-radius":"40px"}},{default:p(()=>[d(P,{class:"py-1 px-6 text-5xl",icon:n.icon},null,8,["icon"])]),_:1}))}}),ue={transitionTimeMs:250,transitionEasing:"ease-in-out"},de=y({__name:"Progressbar",props:En({range:{},progress:{},previewProgress:{},transitionTimeMs:{},transitionEasing:{},color:{},onProgressSet:{type:Function},onHover:{type:Function}},ue),setup(e){const n=R(),t=e,o=x(()=>{const[l,c]=t.range;return c-l}),a=l=>{const[c]=t.range;return Math.min(Math.max(l-c,0),o.value)/o.value*100},r=l=>{const c=l.currentTarget;if(!(c instanceof HTMLElement))throw new Error("Invalid target");const h=l.offsetX,k=c.offsetWidth,w=h/k,S=t.range[0]+w*o.value;return Math.round(S)},u=l=>{var h;const c=r(l);(h=t.onProgressSet)==null||h.call(t,c)},s=l=>{var h;const c=r(l);(h=t.onHover)==null||h.call(t,c)};return(l,c)=>(i(),g("div",{onMousemove:s,onClick:u,class:"relative overflow-hidden h-4 w-full z-1"},[m("div",{class:_("absolute top-0 left-0 h-full z-0"),style:I({backgroundColor:t.color??b(n).tertiary,width:`${a(l.progress)}%`,transition:`width ${t.transitionTimeMs}ms ${t.transitionEasing}`})},null,4),m("div",{class:_("absolute top-0 left-0 h-full z-10"),style:I({backgroundColor:b(n).primary+"90",width:`${a(l.previewProgress??t.range[0])}%`,transition:`width ${t.transitionTimeMs}ms ${t.transitionEasing}`})},null,4)],32))}}),pe={class:"w-full flex justify-center"},be={class:"w-12"},fe={class:"w-12"},ge=y({__name:"GSpreadSelect",props:Dn({items:{},initialItemIndex:{default:0}},{modelValue:{},modelModifiers:{},open:{default:!1},openModifiers:{}}),emits:["update:modelValue","update:open"],setup(e){const n=B(),t=e,o=Lt(e,"modelValue");if(o.value=t.items[t.initialItemIndex].value,o.value===void 0)throw new Error("invalid initialItemIndex");const a=x(()=>{var c;return(c=t.items.find(h=>h.value===o.value))==null?void 0:c.label}),r=Lt(e,"open"),u=()=>r.value=!r.value;Bn(n,()=>r.value=!1);const s=c=>{o.value=c.value,r.value=!1},l=c=>c.value===o.value;return(c,h)=>(i(),g("div",pe,[r.value?(i(),g("div",{key:0,ref_key:"target",ref:n,class:"flex gap-2 justify-center"},[(i(!0),g(O,null,G(c.items,k=>(i(),f(M,{key:k.label,onClick:w=>s(k),class:_(["rounded-full",l(k)?"opacity-100 ring-white ring-2 ring-inset":"opacity-75"])},{default:p(()=>[m("span",be,z(k.label),1)]),_:2},1032,["onClick","class"]))),128))],512)):a.value?(i(),f(M,{key:1,onClick:u,class:"rounded-full"},{default:p(()=>[m("span",fe,z(a.value),1)]),_:1})):$("",!0)]))}}),me={class:"flex flex-col gap-5 items-center justify-center"},ve={class:"flex gap-2 justify-between"},he={class:"w-12"},ye={class:"flex gap-4 fill-white dark:fill-black"},ke=y({__name:"SimulationPlaybackControls",props:{controls:{}},setup(e){const n=R(),t=e,{isOver:o,paused:a,step:r,hasBegun:u,lastStep:s,playbackSpeed:l}=zn(t.controls),{nextStep:c,prevStep:h,setStep:k,start:w,stop:S}=t.controls,D=()=>{h(),a.value=!0},L=()=>{c(),a.value=!0},E=T=>{k(T),a.value=!0},N=()=>{a.value=!a.value},rt=()=>{S(),w()},bt=B(-1),sn=T=>{bt.value=T},cn=()=>{bt.value=-1},$t=()=>{a.value=!0};A.value.subscribe("onStructureChange",$t),ht(()=>{A.value.unsubscribe("onStructureChange",$t)});const St=[{label:"0.25x",value:Z/.25},{label:"0.5x",value:Z/.5},{label:"1x",value:Z},{label:"2x",value:Z/2},{label:"4x",value:Z/4}],ft=B(!1),un=St.findIndex(T=>T.value===l.value)??2;return mt([" ","Spacebar"],T=>{T.preventDefault(),o.value?rt():N()}),mt("ArrowLeft",T=>{T.preventDefault(),D()}),mt("ArrowRight",T=>{T.preventDefault(),L()}),(T,at)=>(i(),g("div",me,[m("div",ve,[d(ge,{modelValue:b(l),"onUpdate:modelValue":at[0]||(at[0]=gt=>In(l)?l.value=gt:null),open:ft.value,"onUpdate:open":at[1]||(at[1]=gt=>ft.value=gt),items:St,"initial-item-index":b(un)},null,8,["modelValue","open","initial-item-index"]),ft.value?$("",!0):(i(),f(M,{key:0,class:"rounded-full"},{default:p(()=>[m("span",he,z(b(r)),1)]),_:1}))]),b(s)!==1/0?(i(),f(de,{key:0,onMouseleave:cn,range:[0,b(s)],progress:b(r),"on-progress-set":E,"preview-progress":bt.value,"on-hover":sn,class:"w-full border-2 rounded-lg",style:I({borderColor:b(n).tertiary})},null,8,["range","progress","preview-progress","style"])):$("",!0),m("div",ye,[d(it,{onClick:D,disabled:!b(u),icon:"chevron-left"},null,8,["disabled"]),b(o)?(i(),f(it,{key:0,onClick:rt,icon:"restart"})):(i(),f(it,{key:1,onClick:N,icon:b(a)?"play":"pause"},null,8,["icon"])),d(it,{onClick:L,disabled:b(o),icon:"chevron-right"},null,8,["disabled"])])]))}}),qt=y({__name:"ToolbarHint",props:{color:{default:F.WHITE+"75"},tutorial:{}},setup(e){return(n,t)=>(i(),f(Qn,{tutorial:n.tutorial},{default:p(({hint:o})=>[m("h5",{style:I({color:n.color}),class:"text-sm"},z(o),5)]),_:1},8,["tutorial"]))}}),we={class:"flex flex-col gap-2"},Ce=y({__name:"ToolbarBase",props:{color:{default:F.GRAY_800},hint:{default:void 0}},setup(e){return(n,t)=>(i(),g("div",we,[m("div",{style:I({backgroundColor:n.color}),class:"flex items-center gap-2 py-1 px-1 rounded-lg"},[v(n.$slots,"default")],4),v(n.$slots,"hint",{},()=>[n.hint?(i(),f(qt,{key:0,tutorial:n.hint},null,8,["tutorial"])):$("",!0)])]))}}),xe=y({__name:"GToolbarHint",props:{tutorial:{}},setup(e){const n=R();return(t,o)=>(i(),f(qt,{tutorial:t.tutorial,color:b(n).text+"75"},null,8,["tutorial","color"]))}}),xt=y({__name:"GToolbarBase",props:{hint:{}},setup(e){const n=R();return(t,o)=>(i(),f(Ce,{hint:t.hint,color:b(n).primary},{hint:p(()=>[t.hint?(i(),f(xe,{key:0,tutorial:t.hint},null,8,["tutorial"])):$("",!0)]),default:p(()=>[v(t.$slots,"default")]),_:3},8,["hint","color"]))}}),_e=e=>x(()=>{const n=Ht(e.value);if(!n.isValid())throw new Error("invalid color");return n}),$e=["disabled"],Se=y({__name:"ToolbarButton",props:{color:{default:F.GRAY_800},active:{type:Boolean,default:!1},activeColor:{},disabled:{type:Boolean,default:!1},icon:{default:""}},setup(e){const n=e,t=Pn(n,"color"),o=_e(t),a=x(()=>o.value.darken(5).toHexString()),r=x(()=>n.activeColor?n.activeColor:o.value.darken(10).toHexString()),u=x(()=>{if(!n.disabled)return n.active?r.value:h.value?a.value:n.color}),s=x(()=>{const k=o.value.isDark()?F.WHITE:F.BLACK;return n.disabled?k+"80":k}),l=x(()=>({color:s.value,backgroundColor:u.value,cursor:n.disabled?"not-allowed":"pointer"})),c=["p-1","rounded-md","grid","place-items-center","w-10","h-10","outline-none"],h=B(!1);return(k,w)=>(i(),g("button",{onMouseenter:w[0]||(w[0]=S=>h.value=!0),onMouseleave:w[1]||(w[1]=S=>h.value=!1),disabled:k.disabled,class:_(c),style:I(l.value)},[v(k.$slots,"default",{},()=>[d(P,{icon:k.icon},null,8,["icon"])])],44,$e))}}),V=y({__name:"GToolbarButton",setup(e){const n=R(),t=x(()=>A.value.themeName.value==="dark"?n.value.tertiary:n.value.secondary);return(o,a)=>(i(),f(Se,C(o.$props,{color:b(n).primary,"active-color":t.value}),{default:p(()=>[v(o.$slots,"default")]),_:3},16,["color","active-color"]))}}),Le=y({__name:"ToolbarDivider",props:{color:{default:F.GRAY_100+"20"}},setup(e){return(n,t)=>(i(),g("div",{style:I({backgroundColor:n.color}),class:"w-[1px] h-6 mx-1"},null,4))}}),Ot=y({__name:"GToolbarDivider",setup(e){const n=R();return(t,o)=>(i(),f(Le,C(t.$props,{color:b(n).text+"30"}),null,16,["color"]))}}),q=y({__name:"ToolbarButtonGroup",setup(e){const n=te(),t=["flex","items-center","relative","gap-1"],o=x(()=>Jn(t,n.value));return(a,r)=>(i(),g("div",{class:_(o.value)},[v(a.$slots,"default")],2))}}),Ee={class:_(["rounded-full","p-[3px]"])},De=y({__name:"AnnotationToolbar",setup(e){const{clear:n,brushWeight:t,isErasing:o,color:a,isLaserPointing:r}=A.value.annotation,u=w=>{a.value=w,o.value=!1,r.value=!1},s=w=>{t.value=w,o.value=!1,r.value=!1},l=w=>o.value||r.value?!1:a.value===w,c=w=>o.value?!1:t.value===w,h=()=>{o.value=!o.value,r.value=!1},k=()=>{r.value=!r.value,o.value=!1};return(w,S)=>(i(),f(xt,null,{default:p(()=>[d(q,null,{default:p(()=>[(i(!0),g(O,null,G(b(Yn),D=>(i(),f(V,{key:D,onClick:L=>u(D),active:l(D)},{default:p(()=>[m("div",Ee,[m("div",{style:I({backgroundColor:D}),class:_(["w-6","h-6","rounded-full"])},null,4)])]),_:2},1032,["onClick","active"]))),128))]),_:1}),d(Ot),d(q,null,{default:p(()=>[(i(!0),g(O,null,G(b(Xn),(D,L)=>(i(),f(V,{key:D,onClick:E=>s(D),active:c(D)},{default:p(()=>[m("div",{class:_(["bg-gray-400","rounded-md","w-[15px]"]),style:I({height:`${L*5+1}px`})},null,4)]),_:2},1032,["onClick","active"]))),128))]),_:1}),d(Ot),d(q,null,{default:p(()=>[d(V,{onClick:k,active:b(r),icon:"laser-pointer"},null,8,["active"]),d(V,{onClick:h,active:b(o),icon:"eraser"},null,8,["active"]),d(V,{onClick:b(n),icon:"delete-outline"},null,8,["onClick"])]),_:1})]),_:1}))}});var Be=et.extend({name:"focustrap-directive"}),ze=On.extend({style:Be});function Q(e){"@babel/helpers - typeof";return Q=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},Q(e)}function Mt(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,o)}return t}function Tt(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?Mt(Object(t),!0).forEach(function(o){Ie(e,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Mt(Object(t)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))})}return e}function Ie(e,n,t){return(n=Pe(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function Pe(e){var n=Oe(e,"string");return Q(n)=="symbol"?n:n+""}function Oe(e,n){if(Q(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var o=t.call(e,n||"default");if(Q(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var Jt=ze.extend("focustrap",{mounted:function(n,t){var o=t.value||{},a=o.disabled;a||(this.createHiddenFocusableElements(n,t),this.bind(n,t),this.autoElementFocus(n,t)),n.setAttribute("data-pd-focustrap",!0),this.$el=n},updated:function(n,t){var o=t.value||{},a=o.disabled;a&&this.unbind(n)},unmounted:function(n){this.unbind(n)},methods:{getComputedSelector:function(n){return':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])'.concat(n??"")},bind:function(n,t){var o=this,a=t.value||{},r=a.onFocusIn,u=a.onFocusOut;n.$_pfocustrap_mutationobserver=new MutationObserver(function(s){s.forEach(function(l){if(l.type==="childList"&&!n.contains(document.activeElement)){var c=function(k){var w=Et(k)?Et(k,o.getComputedSelector(n.$_pfocustrap_focusableselector))?k:Y(n,o.getComputedSelector(n.$_pfocustrap_focusableselector)):Y(k);return Kt(w)?w:k.nextSibling&&c(k.nextSibling)};U(c(l.nextSibling))}})}),n.$_pfocustrap_mutationobserver.disconnect(),n.$_pfocustrap_mutationobserver.observe(n,{childList:!0}),n.$_pfocustrap_focusinlistener=function(s){return r&&r(s)},n.$_pfocustrap_focusoutlistener=function(s){return u&&u(s)},n.addEventListener("focusin",n.$_pfocustrap_focusinlistener),n.addEventListener("focusout",n.$_pfocustrap_focusoutlistener)},unbind:function(n){n.$_pfocustrap_mutationobserver&&n.$_pfocustrap_mutationobserver.disconnect(),n.$_pfocustrap_focusinlistener&&n.removeEventListener("focusin",n.$_pfocustrap_focusinlistener)&&(n.$_pfocustrap_focusinlistener=null),n.$_pfocustrap_focusoutlistener&&n.removeEventListener("focusout",n.$_pfocustrap_focusoutlistener)&&(n.$_pfocustrap_focusoutlistener=null)},autoFocus:function(n){this.autoElementFocus(this.$el,{value:Tt(Tt({},n),{},{autoFocus:!0})})},autoElementFocus:function(n,t){var o=t.value||{},a=o.autoFocusSelector,r=a===void 0?"":a,u=o.firstFocusableSelector,s=u===void 0?"":u,l=o.autoFocus,c=l===void 0?!1:l,h=Y(n,"[autofocus]".concat(this.getComputedSelector(r)));c&&!h&&(h=Y(n,this.getComputedSelector(s))),U(h)},onFirstHiddenElementFocus:function(n){var t,o=n.currentTarget,a=n.relatedTarget,r=a===o.$_pfocustrap_lasthiddenfocusableelement||!((t=this.$el)!==null&&t!==void 0&&t.contains(a))?Y(o.parentElement,this.getComputedSelector(o.$_pfocustrap_focusableselector)):o.$_pfocustrap_lasthiddenfocusableelement;U(r)},onLastHiddenElementFocus:function(n){var t,o=n.currentTarget,a=n.relatedTarget,r=a===o.$_pfocustrap_firsthiddenfocusableelement||!((t=this.$el)!==null&&t!==void 0&&t.contains(a))?Mn(o.parentElement,this.getComputedSelector(o.$_pfocustrap_focusableselector)):o.$_pfocustrap_firsthiddenfocusableelement;U(r)},createHiddenFocusableElements:function(n,t){var o=this,a=t.value||{},r=a.tabIndex,u=r===void 0?0:r,s=a.firstFocusableSelector,l=s===void 0?"":s,c=a.lastFocusableSelector,h=c===void 0?"":c,k=function(L){return Tn("span",{class:"p-hidden-accessible p-hidden-focusable",tabIndex:u,role:"presentation","aria-hidden":!0,"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0,onFocus:L==null?void 0:L.bind(o)})},w=k(this.onFirstHiddenElementFocus),S=k(this.onLastHiddenElementFocus);w.$_pfocustrap_lasthiddenfocusableelement=S,w.$_pfocustrap_focusableselector=l,w.setAttribute("data-pc-section","firstfocusableelement"),S.$_pfocustrap_firsthiddenfocusableelement=w,S.$_pfocustrap_focusableselector=h,S.setAttribute("data-pc-section","lastfocusableelement"),n.prepend(w),n.append(S)}}}),lt=An(),Me=function(n){var t=n.dt;return`
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
`)},Te={root:"p-popover p-component",content:"p-popover-content"},Ae=et.extend({name:"popover",theme:Me,classes:Te}),Fe={name:"BasePopover",extends:dt,props:{dismissable:{type:Boolean,default:!0},appendTo:{type:[String,Object],default:"body"},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},breakpoints:{type:Object,default:null},closeOnEscape:{type:Boolean,default:!0}},style:Ae,provide:function(){return{$pcPopover:this,$parentInstance:this}}},Qt={name:"Popover",extends:Fe,inheritAttrs:!1,emits:["show","hide"],data:function(){return{visible:!1}},watch:{dismissable:{immediate:!0,handler:function(n){n?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},selfClick:!1,target:null,eventTarget:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,styleElement:null,overlayEventListener:null,documentKeydownListener:null,beforeUnmount:function(){this.dismissable&&this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.destroyStyle(),this.unbindResizeListener(),this.target=null,this.container&&this.autoZIndex&&W.clear(this.container),this.overlayEventListener&&(lt.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null),this.container=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{toggle:function(n,t){this.visible?this.hide():this.show(n,t)},show:function(n,t){this.visible=!0,this.eventTarget=n.currentTarget,this.target=t||n.currentTarget},hide:function(){this.visible=!1},onContentClick:function(){this.selfClick=!0},onEnter:function(n){var t=this;Gt(n,{position:"absolute",top:"0",left:"0"}),this.alignOverlay(),this.dismissable&&this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&W.set("overlay",n,this.baseZIndex+this.$primevue.config.zIndex.overlay),this.overlayEventListener=function(o){t.container.contains(o.target)&&(t.selfClick=!0)},this.focus(),lt.on("overlay-click",this.overlayEventListener),this.$emit("show"),this.closeOnEscape&&this.bindDocumentKeyDownListener()},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.unbindDocumentKeyDownListener(),lt.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null,this.$emit("hide")},onAfterLeave:function(n){this.autoZIndex&&W.clear(n)},alignOverlay:function(){Fn(this.container,this.target,!1);var n=Dt(this.container),t=Dt(this.target),o=0;n.left<t.left&&(o=t.left-n.left),this.container.style.setProperty(Rn("popover.arrow.left").name,"".concat(o,"px")),n.top<t.top&&(this.container.setAttribute("data-p-popover-flipped","true"),!this.isUnstyled&&Vt(this.container,"p-popover-flipped"))},onContentKeydown:function(n){n.code==="Escape"&&this.closeOnEscape&&(this.hide(),U(this.target))},onButtonKeydown:function(n){switch(n.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":n.preventDefault()}},focus:function(){var n=this.container.querySelector("[autofocus]");n&&n.focus()},onKeyDown:function(n){n.code==="Escape"&&this.closeOnEscape&&(this.visible=!1)},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var n=this;!this.outsideClickListener&&jn()&&(this.outsideClickListener=function(t){n.visible&&!n.selfClick&&!n.isTargetClicked(t)&&(n.visible=!1),n.selfClick=!1},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null,this.selfClick=!1)},bindScrollListener:function(){var n=this;this.scrollHandler||(this.scrollHandler=new Hn(this.target,function(){n.visible&&(n.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var n=this;this.resizeListener||(this.resizeListener=function(){n.visible&&!Kn()&&(n.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isTargetClicked:function(n){return this.eventTarget&&(this.eventTarget===n.target||this.eventTarget.contains(n.target))},containerRef:function(n){this.container=n},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var n;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",Ut(this.styleElement,"nonce",(n=this.$primevue)===null||n===void 0||(n=n.config)===null||n===void 0||(n=n.csp)===null||n===void 0?void 0:n.nonce),document.head.appendChild(this.styleElement);var t="";for(var o in this.breakpoints)t+=`
                        @media screen and (max-width: `.concat(o,`) {
                            .p-popover[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[o],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=t}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},onOverlayClick:function(n){lt.emit("overlay-click",{originalEvent:n,target:this.target})}},directives:{focustrap:Jt,ripple:yt},components:{Portal:Wt}},Re=["aria-modal"];function je(e,n,t,o,a,r){var u=J("Portal"),s=kt("focustrap");return i(),f(u,{appendTo:e.appendTo},{default:p(function(){return[d(Nt,C({name:"p-popover",onEnter:r.onEnter,onLeave:r.onLeave,onAfterLeave:r.onAfterLeave},e.ptm("transition")),{default:p(function(){return[a.visible?pt((i(),g("div",C({key:0,ref:r.containerRef,role:"dialog","aria-modal":a.visible,onClick:n[3]||(n[3]=function(){return r.onOverlayClick&&r.onOverlayClick.apply(r,arguments)}),class:e.cx("root")},e.ptmi("root")),[e.$slots.container?v(e.$slots,"container",{key:0,closeCallback:r.hide,keydownCallback:function(c){return r.onButtonKeydown(c)}}):(i(),g("div",C({key:1,class:e.cx("content"),onClick:n[0]||(n[0]=function(){return r.onContentClick&&r.onContentClick.apply(r,arguments)}),onMousedown:n[1]||(n[1]=function(){return r.onContentClick&&r.onContentClick.apply(r,arguments)}),onKeydown:n[2]||(n[2]=function(){return r.onContentKeydown&&r.onContentKeydown.apply(r,arguments)})},e.ptm("content")),[v(e.$slots,"default")],16))],16,Re)),[[s]]):$("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])}Qt.render=je;const _t=y({__name:"Popover",props:{offset:{default:12}},setup(e){const n=B(),t=a=>{n.value.toggle(a)},o=B(!1);return(a,r)=>(i(),g(O,null,[v(a.$slots,"activator",{toggle:t,isOpen:o.value}),d(b(Qt),{unstyled:"",ref_key:"op",ref:n,onShow:r[0]||(r[0]=u=>o.value=!0),onHide:r[1]||(r[1]=u=>o.value=!1)},{default:p(()=>[m("div",{style:I({transform:`translateY(${a.offset}px)`})},[v(a.$slots,"default")],4)]),_:3},512)],64))}}),He=y({__name:"Well",props:{color:{default:F.GRAY_800},textColor:{default:F.WHITE}},setup(e){return(n,t)=>(i(),g("div",{style:I({backgroundColor:n.color,color:n.textColor})},[v(n.$slots,"default")],4))}}),K=y({__name:"GWell",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1}},setup(e){const n=R(),t=e,o=x(()=>t.secondary?n.value.secondary:t.tertiary?n.value.tertiary:n.value.primary);return(a,r)=>(i(),f(He,C(a.$attrs,{color:o.value,"text-color":b(n).text}),{default:p(()=>[v(a.$slots,"default")]),_:3},16,["color","text-color"]))}}),Ke={class:"min-w-20 min-h-20 max-w-20 max-h-20 rounded-md"},Ge=["src"],Ve={class:"flex flex-col gap-1"},Ue={class:"text-lg font-bold"},We={class:"text-sm opacity-80"},Ne=y({__name:"VerticalCardButton",props:{imageSrc:{},color:{default:F.GRAY_800},hoverColor:{},title:{},description:{}},setup(e){const n=e,t=x(()=>{if(n.hoverColor)return n.hoverColor;const r=Ht(n.color);return(r.isDark()?r.lighten(10):r.darken(10)).toHexString()}),o=x(()=>a.value?t.value:n.color),a=B(!1);return(r,u)=>(i(),g("button",{onMouseenter:u[0]||(u[0]=s=>a.value=!0),onMouseleave:u[1]||(u[1]=s=>a.value=!1),style:I({backgroundColor:o.value}),class:"p-2 cursor-pointer text-left flex gap-4"},[m("div",Ke,[r.imageSrc?(i(),g("img",{key:0,src:r.imageSrc,class:"object-cover aspect-square rounded-md"},null,8,Ge)):$("",!0)]),m("div",Ve,[m("h1",Ue,z(r.title),1),m("p",We,z(r.description),1)])],36))}}),tn=y({__name:"GVerticalCardButton",setup(e){const n=R();return(t,o)=>(i(),f(Ne,C(t.$attrs,{color:b(n).primary,"hover-color":b(n).secondary}),null,16,["color","hover-color"]))}}),Ze={key:0,class:"flex items-center gap-3"},Ye=y({__name:"ProductItem",props:{product:{}},setup(e){const{navigate:n}=ie(),t=le(),o=l=>{st.value={nodes:A.value.nodes.value,edges:A.value.edges.value},ct.value=A.value.annotation.annotations.value,n(l)},a=e,r=B(!1),u=B("");setTimeout(()=>{u.value=a.product.menu.thumbnail},Zt(0,100));const s=x(()=>{const l=a.product.menu.allowGoWithGraph??!0;return!se(a.product)&&l});return(l,c)=>(i(),g("div",{onMouseenter:c[2]||(c[2]=h=>r.value=!0),onMouseleave:c[3]||(c[3]=h=>r.value=!1),class:"relative"},[m("div",{class:"absolute w-full h-full z-10 grid place-items-center transition duration-200",style:I({opacity:r.value?1:0})},[b(t).productId!==l.product.productId?(i(),g("div",Ze,[d(M,{onClick:c[0]||(c[0]=h=>b(n)(l.product)),tertiary:"",class:"grid place-items-center w-[120px] text-sm"},{default:p(()=>[d(P,{icon:"arrow-right"}),c[4]||(c[4]=H(" go "))]),_:1}),s.value?(i(),f(M,{key:0,onClick:c[1]||(c[1]=h=>o(l.product)),tertiary:"",class:"grid place-items-center w-[120px] text-sm"},{default:p(()=>[d(P,{icon:"debug-step-over"}),c[5]||(c[5]=H(" go with graph "))]),_:1})):$("",!0)])):(i(),f(K,{key:1,tertiary:"",class:"flex items-center gap-2 px-2 py-1 rounded-md text-xl font-bold overflow-hidden"},{default:p(()=>[d(P,{icon:"star",class:"text-xl"}),c[6]||(c[6]=H(" you are here ")),d(P,{icon:"star",class:"text-xl"})]),_:1}))],4),d(tn,{"image-src":u.value,title:l.product.menu.name,description:l.product.menu.description,class:"rounded-md",style:I({opacity:r.value?.5:1})},null,8,["image-src","title","description","style"])],32))}}),Xe={class:"flex flex-col gap-2"},qe=y({__name:"ProductDropdownMenu",setup(e){const n=ot.filter(o=>o==null?void 0:o.menu),t=Pt.reduce((o,a)=>(o[a]=[],o),{});return n.forEach(o=>{t[o.menu.category].push(o)}),(o,a)=>(i(),f(K,{class:"flex flex-col p-2 w-[400px] h-[500px] overflow-auto rounded-lg"},{default:p(()=>[(i(!0),g(O,null,G(b(Pt),r=>(i(),g("div",{key:r},[b(t)[r].length>0?(i(),f(K,{key:0,tertiary:"",class:"text-xl font-bold capitalize my-2 text-center p-1 rounded-md"},{default:p(()=>[H(z(r),1)]),_:2},1024)):$("",!0),m("div",Xe,[(i(!0),g(O,null,G(b(t)[r],u=>(i(),f(Ye,{key:u.productId,product:u},null,8,["product"]))),128))])]))),128))]),_:1}))}}),Je=y({__name:"ProductDropdown",setup(e){const n=R();return(t,o)=>(i(),f(_t,null,{activator:p(({toggle:a})=>[d(M,{onClick:a,class:"px-4 py-2 text-xl rounded-lg"},{default:p(()=>[m("span",{class:_(`text-${b(n).brand}`)},"Magic Algorithms",2)]),_:2},1032,["onClick"])]),default:p(()=>[d(qe)]),_:1}))}}),Qe=["onMouseenter","onMouseleave"],to=y({__name:"PopoverTooltip",props:{offset:{default:4}},setup(e){return(n,t)=>(i(),f(_t,{offset:n.offset},{activator:p(({toggle:o})=>[m("div",{onMouseenter:o,onMouseleave:o},[v(n.$slots,"default")],40,Qe)]),default:p(()=>[v(n.$slots,"content")]),_:3},8,["offset"]))}}),no={key:0,class:"absolute bg-black w-full h-full z-10 rounded-md bg-opacity-50 grid place-items-center"},eo=["innerHTML"],oo=y({__name:"SelectSimGuard",props:{simulation:{}},setup(e){const n=e,t=x(()=>{var o;return(o=n.simulation.canRun)==null?void 0:o.check()});return(o,a)=>t.value?(i(),g("div",no,[d(to,null,{content:p(()=>[d(K,{tertiary:"",class:"max-w-72 rounded-lg p-2"},{default:p(()=>[m("span",{innerHTML:t.value.description,class:"font-bold"},null,8,eo)]),_:1})]),default:p(()=>[d(Xt,{onMouseenter:a[0]||(a[0]=r=>{var u;return(u=t.value.themer)==null?void 0:u.theme()}),onMouseleave:a[1]||(a[1]=r=>{var u;return(u=t.value.themer)==null?void 0:u.untheme()}),color:b(F).GRAY_900,"text-color":b(F).RED_500,class:"text-lg rounded-lg px-2 py-1"},{default:p(()=>[H(z(t.value.title),1)]),_:1},8,["color","text-color"])]),_:1})])):$("",!0)}}),ro=y({__name:"SimCard",props:{simulation:{}},setup(e){const n=e,t=B("");return setTimeout(()=>{t.value=n.simulation.thumbnail},Zt(0,100)),(o,a)=>(i(),f(tn,{"image-src":t.value,title:o.simulation.name,description:o.simulation.description,class:"rounded-md"},null,8,["image-src","title","description"]))}}),ao=y({__name:"SelectSim",props:{simulations:{},disabled:{type:Boolean}},emits:["simulation-selected"],setup(e,{emit:n}){const t=e,o=n,a=x(()=>{const r=t.simulations,u=r.filter(l=>{var c;return(c=l.canRun)==null?void 0:c.check()});return[...r.filter(l=>{var c;return!((c=l.canRun)!=null&&c.check())}),...u]});return(r,u)=>(i(),f(_t,null,{activator:p(({toggle:s})=>[d(M,{onClick:s,disabled:r.disabled,class:"h-14 w-14 rounded-full"},{default:p(()=>[d(P,{class:"text-3xl",icon:"play"})]),_:2},1032,["onClick","disabled"])]),default:p(()=>[d(K,{class:"flex flex-col p-2 w-[400px] max-h-[500px] overflow-auto gap-1 rounded-lg"},{default:p(()=>[(i(!0),g(O,null,G(a.value,s=>(i(),g("div",{key:s.name,class:"relative"},[d(oo,{simulation:s},null,8,["simulation"]),d(ro,{onClick:l=>o("simulation-selected",s),simulation:s},null,8,["onClick","simulation"])]))),128))]),_:1})]),_:1}))}}),io=y({__name:"StopSimButton",setup(e){return(n,t)=>(i(),f(M,{color:b(F).RED_500,class:"h-14 w-14 rounded-full"},{default:p(()=>[d(P,{class:"text-3xl",icon:"stop"})]),_:1},8,["color"]))}}),lo=y({__name:"FullscreenButton",setup(e){const{toggle:n,isFullscreen:t}=Gn(),o=a=>{a.key.toLowerCase()==="f"&&n()};return A.value.subscribe("onKeyDown",o),ht(()=>A.value.unsubscribe("onKeyDown",o)),(a,r)=>(i(),f(M,{onClick:b(n),class:"h-12 w-12"},{default:p(()=>[d(P,{class:"text-3xl",icon:b(t)?"fullscreen-exit":"fullscreen"},null,8,["icon"])]),_:1},8,["onClick"]))}}),so=y({__name:"ThemeToolbar",setup(e){const n={auto:"cog-outline",light:"weather-sunny",dark:"weather-night",girl:"flower-tulip-outline"};return(t,o)=>(i(),f(xt,null,{default:p(()=>[d(q,null,{default:p(()=>[(i(),g(O,null,G(n,(a,r)=>d(V,{key:r,onClick:u=>b(A).preferredTheme.value=r,icon:a,active:r===b(A).preferredTheme.value},null,8,["onClick","icon","active"])),64))]),_:1})]),_:1}))}});var nn={name:"WindowMaximizeIcon",extends:wt};function co(e,n,t,o,a,r){return i(),g("svg",C({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),n[0]||(n[0]=[m("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14ZM9.77805 7.42192C9.89013 7.534 10.0415 7.59788 10.2 7.59995C10.3585 7.59788 10.5099 7.534 10.622 7.42192C10.7341 7.30985 10.798 7.15844 10.8 6.99995V3.94242C10.8066 3.90505 10.8096 3.86689 10.8089 3.82843C10.8079 3.77159 10.7988 3.7157 10.7824 3.6623C10.756 3.55552 10.701 3.45698 10.622 3.37798C10.5099 3.2659 10.3585 3.20202 10.2 3.19995H7.00002C6.84089 3.19995 6.68828 3.26317 6.57576 3.37569C6.46324 3.48821 6.40002 3.64082 6.40002 3.79995C6.40002 3.95908 6.46324 4.11169 6.57576 4.22422C6.68828 4.33674 6.84089 4.39995 7.00002 4.39995H8.80006L6.19997 7.00005C6.10158 7.11005 6.04718 7.25246 6.04718 7.40005C6.04718 7.54763 6.10158 7.69004 6.19997 7.80005C6.30202 7.91645 6.44561 7.98824 6.59997 8.00005C6.75432 7.98824 6.89791 7.91645 6.99997 7.80005L9.60002 5.26841V6.99995C9.6021 7.15844 9.66598 7.30985 9.77805 7.42192ZM1.4 14H3.8C4.17066 13.9979 4.52553 13.8498 4.78763 13.5877C5.04973 13.3256 5.1979 12.9707 5.2 12.6V10.2C5.1979 9.82939 5.04973 9.47452 4.78763 9.21242C4.52553 8.95032 4.17066 8.80215 3.8 8.80005H1.4C1.02934 8.80215 0.674468 8.95032 0.412371 9.21242C0.150274 9.47452 0.00210008 9.82939 0 10.2V12.6C0.00210008 12.9707 0.150274 13.3256 0.412371 13.5877C0.674468 13.8498 1.02934 13.9979 1.4 14ZM1.25858 10.0586C1.29609 10.0211 1.34696 10 1.4 10H3.8C3.85304 10 3.90391 10.0211 3.94142 10.0586C3.97893 10.0961 4 10.147 4 10.2V12.6C4 12.6531 3.97893 12.704 3.94142 12.7415C3.90391 12.779 3.85304 12.8 3.8 12.8H1.4C1.34696 12.8 1.29609 12.779 1.25858 12.7415C1.22107 12.704 1.2 12.6531 1.2 12.6V10.2C1.2 10.147 1.22107 10.0961 1.25858 10.0586Z",fill:"currentColor"},null,-1)]),16)}nn.render=co;var en={name:"WindowMinimizeIcon",extends:wt};function uo(e,n,t,o,a,r){return i(),g("svg",C({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),n[0]||(n[0]=[m("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0ZM6.368 7.952C6.44137 7.98326 6.52025 7.99958 6.6 8H9.8C9.95913 8 10.1117 7.93678 10.2243 7.82426C10.3368 7.71174 10.4 7.55913 10.4 7.4C10.4 7.24087 10.3368 7.08826 10.2243 6.97574C10.1117 6.86321 9.95913 6.8 9.8 6.8H8.048L10.624 4.224C10.73 4.11026 10.7877 3.95982 10.7849 3.80438C10.7822 3.64894 10.7192 3.50063 10.6093 3.3907C10.4994 3.28077 10.3511 3.2178 10.1956 3.21506C10.0402 3.21232 9.88974 3.27002 9.776 3.376L7.2 5.952V4.2C7.2 4.04087 7.13679 3.88826 7.02426 3.77574C6.91174 3.66321 6.75913 3.6 6.6 3.6C6.44087 3.6 6.28826 3.66321 6.17574 3.77574C6.06321 3.88826 6 4.04087 6 4.2V7.4C6.00042 7.47975 6.01674 7.55862 6.048 7.632C6.07656 7.70442 6.11971 7.7702 6.17475 7.82524C6.2298 7.88029 6.29558 7.92344 6.368 7.952ZM1.4 8.80005H3.8C4.17066 8.80215 4.52553 8.95032 4.78763 9.21242C5.04973 9.47452 5.1979 9.82939 5.2 10.2V12.6C5.1979 12.9707 5.04973 13.3256 4.78763 13.5877C4.52553 13.8498 4.17066 13.9979 3.8 14H1.4C1.02934 13.9979 0.674468 13.8498 0.412371 13.5877C0.150274 13.3256 0.00210008 12.9707 0 12.6V10.2C0.00210008 9.82939 0.150274 9.47452 0.412371 9.21242C0.674468 8.95032 1.02934 8.80215 1.4 8.80005ZM3.94142 12.7415C3.97893 12.704 4 12.6531 4 12.6V10.2C4 10.147 3.97893 10.0961 3.94142 10.0586C3.90391 10.0211 3.85304 10 3.8 10H1.4C1.34696 10 1.29609 10.0211 1.25858 10.0586C1.22107 10.0961 1.2 10.147 1.2 10.2V12.6C1.2 12.6531 1.22107 12.704 1.25858 12.7415C1.29609 12.779 1.34696 12.8 1.4 12.8H3.8C3.85304 12.8 3.90391 12.779 3.94142 12.7415Z",fill:"currentColor"},null,-1)]),16)}en.render=uo;var on={name:"SpinnerIcon",extends:wt};function po(e,n,t,o,a,r){return i(),g("svg",C({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),n[0]||(n[0]=[m("path",{d:"M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",fill:"currentColor"},null,-1)]),16)}on.render=po;var bo=function(n){var t=n.dt;return`
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
`)},fo={root:function(n){var t=n.props,o=n.instance;return["p-badge p-component",{"p-badge-circle":Kt(t.value)&&String(t.value).length===1,"p-badge-dot":Yt(t.value)&&!o.$slots.default,"p-badge-sm":t.size==="small","p-badge-lg":t.size==="large","p-badge-xl":t.size==="xlarge","p-badge-info":t.severity==="info","p-badge-success":t.severity==="success","p-badge-warn":t.severity==="warn","p-badge-danger":t.severity==="danger","p-badge-secondary":t.severity==="secondary","p-badge-contrast":t.severity==="contrast"}]}},go=et.extend({name:"badge",theme:bo,classes:fo}),mo={name:"BaseBadge",extends:dt,props:{value:{type:[String,Number],default:null},severity:{type:String,default:null},size:{type:String,default:null}},style:go,provide:function(){return{$pcBadge:this,$parentInstance:this}}},rn={name:"Badge",extends:mo,inheritAttrs:!1};function vo(e,n,t,o,a,r){return i(),g("span",C({class:e.cx("root")},e.ptmi("root")),[v(e.$slots,"default",{},function(){return[H(z(e.value),1)]})],16)}rn.render=vo;function tt(e){"@babel/helpers - typeof";return tt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},tt(e)}function j(e,n,t){return(n=ho(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function ho(e){var n=yo(e,"string");return tt(n)=="symbol"?n:n+""}function yo(e,n){if(tt(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var o=t.call(e,n||"default");if(tt(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var ko=function(n){var t=n.dt;return`
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
`)},wo={root:function(n){var t=n.instance,o=n.props;return["p-button p-component",j(j(j(j(j(j(j(j(j({"p-button-icon-only":t.hasIcon&&!o.label&&!o.badge,"p-button-vertical":(o.iconPos==="top"||o.iconPos==="bottom")&&o.label,"p-button-loading":o.loading,"p-button-link":o.link||o.variant==="link"},"p-button-".concat(o.severity),o.severity),"p-button-raised",o.raised),"p-button-rounded",o.rounded),"p-button-text",o.text||o.variant==="text"),"p-button-outlined",o.outlined||o.variant==="outlined"),"p-button-sm",o.size==="small"),"p-button-lg",o.size==="large"),"p-button-plain",o.plain),"p-button-fluid",t.hasFluid)]},loadingIcon:"p-button-loading-icon",icon:function(n){var t=n.props;return["p-button-icon",j({},"p-button-icon-".concat(t.iconPos),t.label)]},label:"p-button-label"},Co=et.extend({name:"button",theme:ko,classes:wo}),xo={name:"BaseButton",extends:dt,props:{label:{type:String,default:null},icon:{type:String,default:null},iconPos:{type:String,default:"left"},iconClass:{type:[String,Object],default:null},badge:{type:String,default:null},badgeClass:{type:[String,Object],default:null},badgeSeverity:{type:String,default:"secondary"},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1},link:{type:Boolean,default:!1},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},variant:{type:String,default:null},plain:{type:Boolean,default:!1},fluid:{type:Boolean,default:null}},style:Co,provide:function(){return{$pcButton:this,$parentInstance:this}}},an={name:"Button",extends:xo,inheritAttrs:!1,inject:{$pcFluid:{default:null}},methods:{getPTOptions:function(n){var t=n==="root"?this.ptmi:this.ptm;return t(n,{context:{disabled:this.disabled}})}},computed:{disabled:function(){return this.$attrs.disabled||this.$attrs.disabled===""||this.loading},defaultAriaLabel:function(){return this.label?this.label+(this.badge?" "+this.badge:""):this.$attrs.ariaLabel},hasIcon:function(){return this.icon||this.$slots.icon},attrs:function(){return C(this.asAttrs,this.a11yAttrs,this.getPTOptions("root"))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{"aria-label":this.defaultAriaLabel,"data-pc-name":"button","data-p-disabled":this.disabled,"data-p-severity":this.severity}},hasFluid:function(){return Yt(this.fluid)?!!this.$pcFluid:this.fluid}},components:{SpinnerIcon:on,Badge:rn},directives:{ripple:yt}};function _o(e,n,t,o,a,r){var u=J("SpinnerIcon"),s=J("Badge"),l=kt("ripple");return e.asChild?v(e.$slots,"default",{key:1,class:_(e.cx("root")),a11yAttrs:r.a11yAttrs}):pt((i(),f(vt(e.as),C({key:0,class:e.cx("root")},r.attrs),{default:p(function(){return[v(e.$slots,"default",{},function(){return[e.loading?v(e.$slots,"loadingicon",C({key:0,class:[e.cx("loadingIcon"),e.cx("icon")]},e.ptm("loadingIcon")),function(){return[e.loadingIcon?(i(),g("span",C({key:0,class:[e.cx("loadingIcon"),e.cx("icon"),e.loadingIcon]},e.ptm("loadingIcon")),null,16)):(i(),f(u,C({key:1,class:[e.cx("loadingIcon"),e.cx("icon")],spin:""},e.ptm("loadingIcon")),null,16,["class"]))]}):v(e.$slots,"icon",C({key:1,class:[e.cx("icon")]},e.ptm("icon")),function(){return[e.icon?(i(),g("span",C({key:0,class:[e.cx("icon"),e.icon,e.iconClass]},e.ptm("icon")),null,16)):$("",!0)]}),m("span",C({class:e.cx("label")},e.ptm("label")),z(e.label||" "),17),e.badge?(i(),f(s,{key:2,value:e.badge,class:_(e.badgeClass),severity:e.badgeSeverity,unstyled:e.unstyled,pt:e.ptm("pcBadge")},null,8,["value","class","severity","unstyled","pt"])):$("",!0)]})]}),_:3},16,["class"])),[[l]])}an.render=_o;var $o=function(n){var t=n.dt;return`
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
`)},So={mask:function(n){var t=n.position,o=n.modal;return{position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",justifyContent:t==="left"||t==="topleft"||t==="bottomleft"?"flex-start":t==="right"||t==="topright"||t==="bottomright"?"flex-end":"center",alignItems:t==="top"||t==="topleft"||t==="topright"?"flex-start":t==="bottom"||t==="bottomleft"||t==="bottomright"?"flex-end":"center",pointerEvents:o?"auto":"none"}},root:{display:"flex",flexDirection:"column",pointerEvents:"auto"}},Lo={mask:function(n){var t=n.props,o=["left","right","top","topleft","topright","bottom","bottomleft","bottomright"],a=o.find(function(r){return r===t.position});return["p-dialog-mask",{"p-overlay-mask p-overlay-mask-enter":t.modal},a?"p-dialog-".concat(a):""]},root:function(n){var t=n.props,o=n.instance;return["p-dialog p-component",{"p-dialog-maximized":t.maximizable&&o.maximized}]},header:"p-dialog-header",title:"p-dialog-title",headerActions:"p-dialog-header-actions",pcMaximizeButton:"p-dialog-maximize-button",pcCloseButton:"p-dialog-close-button",content:"p-dialog-content",footer:"p-dialog-footer"},Eo=et.extend({name:"dialog",theme:$o,classes:Lo,inlineStyles:So}),Do={name:"BaseDialog",extends:dt,props:{header:{type:null,default:null},footer:{type:null,default:null},visible:{type:Boolean,default:!1},modal:{type:Boolean,default:null},contentStyle:{type:null,default:null},contentClass:{type:String,default:null},contentProps:{type:null,default:null},maximizable:{type:Boolean,default:!1},dismissableMask:{type:Boolean,default:!1},closable:{type:Boolean,default:!0},closeOnEscape:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!1},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},position:{type:String,default:"center"},breakpoints:{type:Object,default:null},draggable:{type:Boolean,default:!0},keepInViewport:{type:Boolean,default:!0},minX:{type:Number,default:0},minY:{type:Number,default:0},appendTo:{type:[String,Object],default:"body"},closeIcon:{type:String,default:void 0},maximizeIcon:{type:String,default:void 0},minimizeIcon:{type:String,default:void 0},closeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},maximizeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},_instance:null},style:Eo,provide:function(){return{$pcDialog:this,$parentInstance:this}}},ln={name:"Dialog",extends:Do,inheritAttrs:!1,emits:["update:visible","show","hide","after-hide","maximize","unmaximize","dragstart","dragend"],provide:function(){var n=this;return{dialogRef:x(function(){return n._instance})}},data:function(){return{id:this.$attrs.id,containerVisible:this.visible,maximized:!1,focusableMax:null,focusableClose:null,target:null}},watch:{"$attrs.id":function(n){this.id=n||Bt()}},documentKeydownListener:null,container:null,mask:null,content:null,headerContainer:null,footerContainer:null,maximizableButton:null,closeButton:null,styleElement:null,dragging:null,documentDragListener:null,documentDragEndListener:null,lastPageX:null,lastPageY:null,maskMouseDownTarget:null,updated:function(){this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.unbindDocumentState(),this.unbindGlobalListeners(),this.destroyStyle(),this.mask&&this.autoZIndex&&W.clear(this.mask),this.container=null,this.mask=null},mounted:function(){this.id=this.id||Bt(),this.breakpoints&&this.createStyle()},methods:{close:function(){this.$emit("update:visible",!1)},onEnter:function(){this.$emit("show"),this.target=document.activeElement,this.enableDocumentSettings(),this.bindGlobalListeners(),this.autoZIndex&&W.set("modal",this.mask,this.baseZIndex+this.$primevue.config.zIndex.modal)},onAfterEnter:function(){this.focus()},onBeforeLeave:function(){this.modal&&!this.isUnstyled&&Vt(this.mask,"p-overlay-mask-leave"),this.dragging&&this.documentDragEndListener&&this.documentDragEndListener()},onLeave:function(){this.$emit("hide"),U(this.target),this.target=null,this.focusableClose=null,this.focusableMax=null},onAfterLeave:function(){this.autoZIndex&&W.clear(this.mask),this.containerVisible=!1,this.unbindDocumentState(),this.unbindGlobalListeners(),this.$emit("after-hide")},onMaskMouseDown:function(n){this.maskMouseDownTarget=n.target},onMaskMouseUp:function(){this.dismissableMask&&this.modal&&this.mask===this.maskMouseDownTarget&&this.close()},focus:function(){var n=function(a){return a&&a.querySelector("[autofocus]")},t=this.$slots.footer&&n(this.footerContainer);t||(t=this.$slots.header&&n(this.headerContainer),t||(t=this.$slots.default&&n(this.content),t||(this.maximizable?(this.focusableMax=!0,t=this.maximizableButton):(this.focusableClose=!0,t=this.closeButton)))),t&&U(t,{focusVisible:!0})},maximize:function(n){this.maximized?(this.maximized=!1,this.$emit("unmaximize",n)):(this.maximized=!0,this.$emit("maximize",n)),this.modal||(this.maximized?zt():It())},enableDocumentSettings:function(){(this.modal||!this.modal&&this.blockScroll||this.maximizable&&this.maximized)&&zt()},unbindDocumentState:function(){(this.modal||!this.modal&&this.blockScroll||this.maximizable&&this.maximized)&&It()},onKeyDown:function(n){n.code==="Escape"&&this.closeOnEscape&&this.close()},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},containerRef:function(n){this.container=n},maskRef:function(n){this.mask=n},contentRef:function(n){this.content=n},headerContainerRef:function(n){this.headerContainer=n},footerContainerRef:function(n){this.footerContainer=n},maximizableRef:function(n){this.maximizableButton=n?n.$el:void 0},closeButtonRef:function(n){this.closeButton=n?n.$el:void 0},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var n;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",Ut(this.styleElement,"nonce",(n=this.$primevue)===null||n===void 0||(n=n.config)===null||n===void 0||(n=n.csp)===null||n===void 0?void 0:n.nonce),document.head.appendChild(this.styleElement);var t="";for(var o in this.breakpoints)t+=`
                        @media screen and (max-width: `.concat(o,`) {
                            .p-dialog[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[o],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=t}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},initDrag:function(n){n.target.closest("div").getAttribute("data-pc-section")!=="headeractions"&&this.draggable&&(this.dragging=!0,this.lastPageX=n.pageX,this.lastPageY=n.pageY,this.container.style.margin="0",document.body.setAttribute("data-p-unselectable-text","true"),!this.isUnstyled&&Gt(document.body,{"user-select":"none"}),this.$emit("dragstart",n))},bindGlobalListeners:function(){this.draggable&&(this.bindDocumentDragListener(),this.bindDocumentDragEndListener()),this.closeOnEscape&&this.closable&&this.bindDocumentKeyDownListener()},unbindGlobalListeners:function(){this.unbindDocumentDragListener(),this.unbindDocumentDragEndListener(),this.unbindDocumentKeyDownListener()},bindDocumentDragListener:function(){var n=this;this.documentDragListener=function(t){if(n.dragging){var o=Vn(n.container),a=Un(n.container),r=t.pageX-n.lastPageX,u=t.pageY-n.lastPageY,s=n.container.getBoundingClientRect(),l=s.left+r,c=s.top+u,h=Wn(),k=getComputedStyle(n.container),w=parseFloat(k.marginLeft),S=parseFloat(k.marginTop);n.container.style.position="fixed",n.keepInViewport?(l>=n.minX&&l+o<h.width&&(n.lastPageX=t.pageX,n.container.style.left=l-w+"px"),c>=n.minY&&c+a<h.height&&(n.lastPageY=t.pageY,n.container.style.top=c-S+"px")):(n.lastPageX=t.pageX,n.container.style.left=l-w+"px",n.lastPageY=t.pageY,n.container.style.top=c-S+"px")}},window.document.addEventListener("mousemove",this.documentDragListener)},unbindDocumentDragListener:function(){this.documentDragListener&&(window.document.removeEventListener("mousemove",this.documentDragListener),this.documentDragListener=null)},bindDocumentDragEndListener:function(){var n=this;this.documentDragEndListener=function(t){n.dragging&&(n.dragging=!1,document.body.removeAttribute("data-p-unselectable-text"),!n.isUnstyled&&(document.body.style["user-select"]=""),n.$emit("dragend",t))},window.document.addEventListener("mouseup",this.documentDragEndListener)},unbindDocumentDragEndListener:function(){this.documentDragEndListener&&(window.document.removeEventListener("mouseup",this.documentDragEndListener),this.documentDragEndListener=null)}},computed:{maximizeIconComponent:function(){return this.maximized?this.minimizeIcon?"span":"WindowMinimizeIcon":this.maximizeIcon?"span":"WindowMaximizeIcon"},ariaLabelledById:function(){return this.header!=null||this.$attrs["aria-labelledby"]!==null?this.id+"_header":null},closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},directives:{ripple:yt,focustrap:Jt},components:{Button:an,Portal:Wt,WindowMinimizeIcon:en,WindowMaximizeIcon:nn,TimesIcon:Nn}};function nt(e){"@babel/helpers - typeof";return nt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},nt(e)}function At(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,o)}return t}function Ft(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?At(Object(t),!0).forEach(function(o){Bo(e,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):At(Object(t)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))})}return e}function Bo(e,n,t){return(n=zo(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function zo(e){var n=Io(e,"string");return nt(n)=="symbol"?n:n+""}function Io(e,n){if(nt(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var o=t.call(e,n||"default");if(nt(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var Po=["aria-labelledby","aria-modal"],Oo=["id"];function Mo(e,n,t,o,a,r){var u=J("Button"),s=J("Portal"),l=kt("focustrap");return i(),f(s,{appendTo:e.appendTo},{default:p(function(){return[a.containerVisible?(i(),g("div",C({key:0,ref:r.maskRef,class:e.cx("mask"),style:e.sx("mask",!0,{position:e.position,modal:e.modal}),onMousedown:n[1]||(n[1]=function(){return r.onMaskMouseDown&&r.onMaskMouseDown.apply(r,arguments)}),onMouseup:n[2]||(n[2]=function(){return r.onMaskMouseUp&&r.onMaskMouseUp.apply(r,arguments)})},e.ptm("mask")),[d(Nt,C({name:"p-dialog",onEnter:r.onEnter,onAfterEnter:r.onAfterEnter,onBeforeLeave:r.onBeforeLeave,onLeave:r.onLeave,onAfterLeave:r.onAfterLeave,appear:""},e.ptm("transition")),{default:p(function(){return[e.visible?pt((i(),g("div",C({key:0,ref:r.containerRef,class:e.cx("root"),style:e.sx("root"),role:"dialog","aria-labelledby":r.ariaLabelledById,"aria-modal":e.modal},e.ptmi("root")),[e.$slots.container?v(e.$slots,"container",{key:0,closeCallback:r.close,maximizeCallback:function(h){return r.maximize(h)}}):(i(),g(O,{key:1},[e.showHeader?(i(),g("div",C({key:0,ref:r.headerContainerRef,class:e.cx("header"),onMousedown:n[0]||(n[0]=function(){return r.initDrag&&r.initDrag.apply(r,arguments)})},e.ptm("header")),[v(e.$slots,"header",{class:_(e.cx("title"))},function(){return[e.header?(i(),g("span",C({key:0,id:r.ariaLabelledById,class:e.cx("title")},e.ptm("title")),z(e.header),17,Oo)):$("",!0)]}),m("div",C({class:e.cx("headerActions")},e.ptm("headerActions")),[e.maximizable?(i(),f(u,C({key:0,ref:r.maximizableRef,autofocus:a.focusableMax,class:e.cx("pcMaximizeButton"),onClick:r.maximize,tabindex:e.maximizable?"0":"-1",unstyled:e.unstyled},e.maximizeButtonProps,{pt:e.ptm("pcMaximizeButton"),"data-pc-group-section":"headericon"}),{icon:p(function(c){return[v(e.$slots,"maximizeicon",{maximized:a.maximized},function(){return[(i(),f(vt(r.maximizeIconComponent),C({class:[c.class,a.maximized?e.minimizeIcon:e.maximizeIcon]},e.ptm("pcMaximizeButton").icon),null,16,["class"]))]})]}),_:3},16,["autofocus","class","onClick","tabindex","unstyled","pt"])):$("",!0),e.closable?(i(),f(u,C({key:1,ref:r.closeButtonRef,autofocus:a.focusableClose,class:e.cx("pcCloseButton"),onClick:r.close,"aria-label":r.closeAriaLabel,unstyled:e.unstyled},e.closeButtonProps,{pt:e.ptm("pcCloseButton"),"data-pc-group-section":"headericon"}),{icon:p(function(c){return[v(e.$slots,"closeicon",{},function(){return[(i(),f(vt(e.closeIcon?"span":"TimesIcon"),C({class:[e.closeIcon,c.class]},e.ptm("pcCloseButton").icon),null,16,["class"]))]})]}),_:3},16,["autofocus","class","onClick","aria-label","unstyled","pt"])):$("",!0)],16)],16)):$("",!0),m("div",C({ref:r.contentRef,class:[e.cx("content"),e.contentClass],style:e.contentStyle},Ft(Ft({},e.contentProps),e.ptm("content"))),[v(e.$slots,"default")],16),e.footer||e.$slots.footer?(i(),g("div",C({key:1,ref:r.footerContainerRef,class:e.cx("footer")},e.ptm("footer")),[v(e.$slots,"footer",{},function(){return[H(z(e.footer),1)]})],16)):$("",!0)],64))],16,Po)),[[l,{disabled:!e.modal}]]):$("",!0)]}),_:3},16,["onEnter","onAfterEnter","onBeforeLeave","onLeave","onAfterLeave"])],16)):$("",!0)]}),_:3},8,["appendTo"])}ln.render=Mo;const To=y({__name:"GDialog",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1},contrast:{type:Boolean,default:!1}},setup(e){const n=R(),t=e,o=x(()=>t.secondary?n.value.secondary:t.tertiary?n.value.tertiary:n.value.primary);return(a,r)=>(i(),f(b(ln),C(a.$attrs,{style:{backgroundColor:o.value,color:b(n).text,borderColor:b(n).text}}),{default:p(()=>[v(a.$slots,"header"),v(a.$slots,"default"),v(a.$slots,"footer")]),_:3},16,["style"]))}}),Ao={class:"flex py-1"},Fo={key:1},Rt="https://github.com/Yonava/magic-graphs",Ro=y({__name:"CommandPalette",setup(e){const n=B(!1),{nameToBindingKeys:t}=A.value.shortcut,o=x(()=>({...t.value,Fullscreen:"F","Pause/Play Simulation":"Space","Simulation Step Forward":"mdi-arrow-right","Simulation Step Backward":"mdi-arrow-left"})),a=u=>u.split("+").map(l=>l.trim()).filter(l=>l!==""),r=u=>{window.open(u,"_blank")};return(u,s)=>(i(),g(O,null,[d(M,{onClick:s[0]||(s[0]=l=>n.value=!n.value),class:"aspect-square"},{default:p(()=>[d(P,{icon:"help"})]),_:1}),d(To,{visible:n.value,"onUpdate:visible":s[3]||(s[3]=l=>n.value=l),header:"Help"},{default:p(()=>[d(K,{class:"mb-6"},{default:p(()=>[d(M,{onClick:s[1]||(s[1]=l=>r(`${Rt}/issues/new?template=Blank%20issue`)),class:"flex justify-center mb-1",secondary:""},{default:p(()=>[d(P,{icon:"bug"}),s[4]||(s[4]=H(" Find an Issue? "))]),_:1}),d(M,{onClick:s[2]||(s[2]=l=>r(Rt)),secondary:"",class:"flex justify-center"},{default:p(()=>[d(P,{icon:"star-outline"}),s[5]||(s[5]=H(" Like the project? Give it a star! "))]),_:1})]),_:1}),s[6]||(s[6]=m("h1",{class:"font-bold text-md"},"Commands",-1)),d(K,{class:"flex-col w-[500px]"},{default:p(()=>[(i(!0),g(O,null,G(Object.keys(o.value),l=>(i(),g("div",{key:l,class:"flex justify-between py-1 items-center"},[H(z(l)+" ",1),m("div",Ao,[(i(!0),g(O,null,G(a(o.value[l]),c=>(i(),f(K,{key:c,class:_(["border-[1px]","rounded-md","px-2","mx-[1px]","text-xs"])},{default:p(()=>[c.startsWith("mdi-")?(i(),f(P,{key:0,icon:c.slice(4),class:"text-xs"},null,8,["icon"])):(i(),g("p",Fo,z(c),1))]),_:2},1024))),128))])]))),128))]),_:1})]),_:1},8,["visible"])],64))}}),jo={class:"text-sm w-[2rem] text-center"},Ho=y({__name:"ZoomButtons",setup(e){const n=t=>{X.value=Math.round((X.value+t)*10)/10};return(t,o)=>(i(),f(xt,null,{default:p(()=>[d(q,null,{default:p(()=>[d(V,{onClick:o[0]||(o[0]=a=>n(.1)),disabled:b(X)>=b(ne),icon:"plus"},null,8,["disabled"]),d(K,null,{default:p(()=>[m("p",jo,z((b(X)*100).toFixed(0))+"% ",1)]),_:1}),d(V,{onClick:o[1]||(o[1]=a=>n(-.1)),disabled:b(X)<=b(ee),icon:"minus"},null,8,["disabled"])]),_:1})]),_:1}))}}),Ko={class:"relative max-h-3/4 w-full grid place-items-center overflow-auto"},Go={class:"relative max-h-3/4 w-full grid place-items-center overflow-auto"},qo=y({__name:"GraphProduct",props:{graph:{}},emits:["graph-ref","simulation-started","simulation-stopped"],setup(e,{emit:n}){const t=e,o=B(!1),a=n,r=ae(t.graph),u=B(r[0]),s=B(!1),l=x(()=>u.value.runner),c=x(()=>l.value.simControls.isActive),h=async()=>{s.value=!0,a("simulation-started",u.value),await l.value.start()},k=async()=>{await l.value.stop(),s.value=!1,a("simulation-stopped"),o.value&&t.graph.annotation.activate(),o.value=!1},w=E=>{o.value=t.graph.annotation.isActive.value,t.graph.annotation.deactivate(),u.value=E,h()},S=B();ce(t.graph);const D=B(!1),L=x(()=>D.value?"pointer-events-none":"");return jt(()=>{a("graph-ref",S.value),t.graph.subscribe("onMouseDown",()=>{D.value=!0}),t.graph.subscribe("onMouseUp",()=>{D.value=!1})}),ht(()=>{t.graph.unsubscribe("onMouseDown",()=>{}),t.graph.unsubscribe("onMouseUp",()=>{})}),(E,N)=>(i(),g(O,null,[d(qn,{onGraphRef:N[0]||(N[0]=rt=>S.value=rt),graph:E.graph},null,8,["graph"]),m("div",{class:_(["absolute","top-6","w-full","flex","flex-col","justify-center","items-center","gap-2",L.value])},[s.value?v(E.$slots,"top-center-sim",{key:0}):v(E.$slots,"top-center",{key:1})],2),m("div",{class:_(["absolute","grid","place-items-center","left-4","top-0","h-full","max-w-96",L.value])},[m("div",Ko,[s.value?v(E.$slots,"center-left-sim",{key:0}):v(E.$slots,"center-left",{key:1})])],2),m("div",{class:_(["absolute","grid","place-items-center","right-4","top-0","h-full","max-w-96",L.value])},[m("div",Go,[s.value?v(E.$slots,"center-right-sim",{key:0}):v(E.$slots,"center-right",{key:1})])],2),m("div",{class:_(["absolute","top-6","left-6",L.value])},[d(Je)],2),m("div",{class:_(["absolute","top-6","right-6",L.value])},[s.value?v(E.$slots,"top-right-sim",{key:0},()=>[d(io,{onClick:k})]):v(E.$slots,"top-right",{key:1},()=>[d(ao,{onSimulationSelected:w,simulations:b(r)},null,8,["simulations"])])],2),m("div",{class:_(["absolute","bottom-8","gap-4","w-full","flex","flex-col","justify-center","items-center",L.value])},[s.value&&c.value?v(E.$slots,"bottom-center-sim",{key:0},()=>[d(ke,{controls:l.value.simControls},null,8,["controls"])]):v(E.$slots,"bottom-center",{key:1},()=>[pt(m("div",null,[d(De)],512),[[Zn,E.graph.annotation.isActive.value]])])],2),m("div",{class:_(["absolute","flex","gap-2","bottom-8","left-8",L.value])},[d(Ro),d(Ho)],2),m("div",{class:_(["absolute","flex","gap-2","bottom-8","right-8",L.value])},[d(so),d(lo)],2)],64))}});export{qo as _,M as a,K as b,to as c,_t as d,ot as e,V as f,Ot as g,q as h,xt as i,_e as j,Xo as p,ie as u};
