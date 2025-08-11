import{_ as un,h as dn,i as pn,j as bn,k as fn,l as gn,m as mn,n as vn,p as hn,q as yn,s as kn,u as wn,v as Cn,aC as st,ad as xn,aD as _n,aE as at,aF as it,an as Ft,aG as $n,ag as Sn,d as w,a3 as F,E as _,o as i,A as f,w as p,a6 as v,b as d,aH as Ln,c as b,a as m,I as S,Z as z,y as g,aI as En,g as D,D as $t,aJ as Dn,F as I,f as H,t as B,C as E,Q as zn,W as T,ak as mt,aK as ft,S as Bn,aL as N,z as A,X as Rt,al as Pn,ac as C,ab as Q,aM as In,aN as G,aO as Y,aP as On,aQ as St,aa as jt,aR as Mn,aS as Tn,aT as U,aU as Ht,aV as An,aW as Lt,aX as Fn,aY as Kt,aZ as Rn,a_ as jn,a$ as Hn,b0 as Gt,b1 as vt,b2 as Vt,a9 as ct,r as Z,ae as ht,b3 as Ut,J as ut,b4 as Wt,e as j,b5 as Kn,b6 as yt,b7 as Nt,b8 as gt,b9 as Et,ba as Dt,bb as zt,bc as Gn,bd as Vn,be as Un,bf as Wn,aq as Nn}from"./index-DAJZ_K5C.js";import{C as Yn,B as Zn,_ as Xn}from"./Graph.vue_vue_type_script_setup_true_lang-yly3OVGE.js";import{_ as Yt,t as qn}from"./Button.vue_vue_type_script_setup_true_lang-CmEZyfCP.js";import{_ as P}from"./Icon.vue_vue_type_script_setup_true_lang-DAu7wrLs.js";import{_ as Jn}from"./TutorialHint.vue_vue_type_script_setup_true_lang-CroZVOt1.js";import{u as Qn}from"./ResponsiveCanvas.vue_vue_type_script_setup_true_lang-BcNxhsJR.js";const te=Object.assign({"/src/menu/info.ts":un,"/src/playground/graph/info.ts":dn,"/src/playground/shape/info.ts":pn,"/src/products/basic-search/info.ts":bn,"/src/products/binary-trees/info.ts":fn,"/src/products/dijkstras/info.ts":gn,"/src/products/graph-sandbox/info.ts":mn,"/src/products/markov-chains-legacy/info.ts":vn,"/src/products/markov-chains/info.ts":hn,"/src/products/min-spanning-tree/info.ts":yn,"/src/products/network-flow/info.ts":kn,"/src/products/search-visualizer/info.ts":wn,"/src/products/set-visualizer/info.ts":Cn}),tt=Object.values(te).flatMap(e=>e.default);tt.map(e=>e.route);const Uo=tt.reduce((e,n)=>(e[n.productId]=n,e),{}),kt=tt.reduce((e,n)=>(e[n.route.path]=n,e),{}),ne=e=>tt.map(o=>o.simulations).filter(Boolean).map(o=>o(e)).flat(),ee=(e,n)=>{const t=st();if(!n){const a=kt[t.path];if(!a)throw new Error(`product not found for ${t.path}`);n=a.simulations}return(n??ne)(e)},oe=()=>{const e=st(),n=xn(),t=a=>{const r=e.query.rid;return typeof r=="string"&&r.length>0?`${a}?rid=${r}`:a};return{navigate:a=>{var c,l;const r=(l=(c=a.route)==null?void 0:c.redirect)==null?void 0:l.toString(),u=r==null?void 0:r.startsWith("http");if(r&&u)return window.open(r,"_blank");n.push(t(a.route.path))},productLink:t}},Bt=["sandbox","algorithms","data structures","math","developer tools"],re=()=>{const e=st();return kt[e.path]},ae=e=>"redirect"in e.route,ie=(e,n)=>{const t=st();if(!n){const c=kt[t.path];if(!c)throw new Error(`no product found for route ${t.path}`);n=c}const{connectToRoom:o}=Sn,a=t.query.rid,{productId:r,name:u}=n;document.title=`${u} - Magic Algorithms`,_n.value=e,setTimeout(()=>{at.value&&(e.load(at.value),at.value=void 0)},5),setTimeout(()=>{it.value&&(e.annotation.load(it.value),it.value=void 0)},5),Ft(()=>{if(a){if(typeof a!="string")return console.error("room id must be a string");o({graph:e,roomId:a,productId:r})}}),$n(()=>{var c;(c=n.state)==null||c.reset()})},O=w({__name:"GButton",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1},contrast:{type:Boolean,default:!1}},setup(e){const n=F(),t=e,o=_(()=>t.secondary?n.value.secondary:t.tertiary?n.value.tertiary:t.contrast?n.value.contrast:n.value.primary);return(a,r)=>(i(),f(Yt,{color:o.value},{default:p(()=>[v(a.$slots,"default")]),_:3},8,["color"]))}}),ot=w({__name:"PlaybackButton",props:{icon:{}},setup(e){return(n,t)=>(i(),f(O,{style:{"border-radius":"40px"}},{default:p(()=>[d(P,{class:"py-1 px-6 text-5xl",icon:n.icon},null,8,["icon"])]),_:1}))}}),le={transitionTimeMs:250,transitionEasing:"ease-in-out"},se=w({__name:"Progressbar",props:Ln({range:{},progress:{},previewProgress:{},transitionTimeMs:{},transitionEasing:{},color:{},onProgressSet:{type:Function},onHover:{type:Function}},le),setup(e){const n=F(),t=e,o=_(()=>{const[l,s]=t.range;return s-l}),a=l=>{const[s]=t.range;return Math.min(Math.max(l-s,0),o.value)/o.value*100},r=l=>{const s=l.currentTarget;if(!(s instanceof HTMLElement))throw new Error("Invalid target");const h=l.offsetX,y=s.offsetWidth,k=h/y,L=t.range[0]+k*o.value;return Math.round(L)},u=l=>{var h;const s=r(l);(h=t.onProgressSet)==null||h.call(t,s)},c=l=>{var h;const s=r(l);(h=t.onHover)==null||h.call(t,s)};return(l,s)=>(i(),b("div",{onMousemove:c,onClick:u,class:"relative overflow-hidden h-4 w-full z-1"},[m("div",{class:S("absolute top-0 left-0 h-full z-0"),style:z({backgroundColor:t.color??g(n).tertiary,width:`${a(l.progress)}%`,transition:`width ${t.transitionTimeMs}ms ${t.transitionEasing}`})},null,4),m("div",{class:S("absolute top-0 left-0 h-full z-10"),style:z({backgroundColor:g(n).primary+"90",width:`${a(l.previewProgress??t.range[0])}%`,transition:`width ${t.transitionTimeMs}ms ${t.transitionEasing}`})},null,4)],32))}}),ce={class:"w-full flex justify-center"},ue={class:"w-12"},de={class:"w-12"},pe=w({__name:"GSpreadSelect",props:En({items:{},initialItemIndex:{default:0}},{modelValue:{},modelModifiers:{},open:{default:!1},openModifiers:{}}),emits:["update:modelValue","update:open"],setup(e){const n=D(),t=e,o=$t(e,"modelValue");if(o.value=t.items[t.initialItemIndex].value,o.value===void 0)throw new Error("invalid initialItemIndex");const a=_(()=>{var s;return(s=t.items.find(h=>h.value===o.value))==null?void 0:s.label}),r=$t(e,"open"),u=()=>r.value=!r.value;Dn(n,()=>r.value=!1);const c=s=>{o.value=s.value,r.value=!1},l=s=>s.value===o.value;return(s,h)=>(i(),b("div",ce,[r.value?(i(),b("div",{key:0,ref_key:"target",ref:n,class:"flex gap-2 justify-center"},[(i(!0),b(I,null,H(s.items,y=>(i(),f(O,{key:y.label,onClick:k=>c(y),class:S(["rounded-full",l(y)?"opacity-100 ring-white ring-2 ring-inset":"opacity-75"])},{default:p(()=>[m("span",ue,B(y.label),1)]),_:2},1032,["onClick","class"]))),128))],512)):a.value?(i(),f(O,{key:1,onClick:u,class:"rounded-full"},{default:p(()=>[m("span",de,B(a.value),1)]),_:1})):E("",!0)]))}}),be={class:"flex flex-col gap-5 items-center justify-center"},fe={class:"flex gap-2 justify-between"},ge={class:"w-12"},me={class:"flex gap-4 fill-white dark:fill-black"},ve=w({__name:"SimulationPlaybackControls",props:{controls:{}},setup(e){const n=F(),t=e,{isOver:o,paused:a,step:r,hasBegun:u,lastStep:c,playbackSpeed:l}=zn(t.controls),{nextStep:s,prevStep:h,setStep:y,start:k,stop:L}=t.controls,$=()=>{h(),a.value=!0},x=()=>{s(),a.value=!0},W=M=>{y(M),a.value=!0},nt=()=>{a.value=!a.value},Ct=()=>{L(),k()},dt=D(-1),ln=M=>{dt.value=M},sn=()=>{dt.value=-1},xt=()=>{a.value=!0};T.value.subscribe("onStructureChange",xt),mt(()=>{T.value.unsubscribe("onStructureChange",xt)});const _t=[{label:"0.25x",value:N/.25},{label:"0.5x",value:N/.5},{label:"1x",value:N},{label:"2x",value:N/2},{label:"4x",value:N/4}],pt=D(!1),cn=_t.findIndex(M=>M.value===l.value)??2;return ft([" ","Spacebar"],M=>{M.preventDefault(),o.value?Ct():nt()}),ft("ArrowLeft",M=>{M.preventDefault(),$()}),ft("ArrowRight",M=>{M.preventDefault(),x()}),(M,et)=>(i(),b("div",be,[m("div",fe,[d(pe,{modelValue:g(l),"onUpdate:modelValue":et[0]||(et[0]=bt=>Bn(l)?l.value=bt:null),open:pt.value,"onUpdate:open":et[1]||(et[1]=bt=>pt.value=bt),items:_t,"initial-item-index":g(cn)},null,8,["modelValue","open","initial-item-index"]),pt.value?E("",!0):(i(),f(O,{key:0,class:"rounded-full"},{default:p(()=>[m("span",ge,B(g(r)),1)]),_:1}))]),g(c)!==1/0?(i(),f(se,{key:0,onMouseleave:sn,range:[0,g(c)],progress:g(r),"on-progress-set":W,"preview-progress":dt.value,"on-hover":ln,class:"w-full border-2 rounded-lg",style:z({borderColor:g(n).tertiary})},null,8,["range","progress","preview-progress","style"])):E("",!0),m("div",me,[d(ot,{onClick:$,disabled:!g(u),icon:"chevron-left"},null,8,["disabled"]),g(o)?(i(),f(ot,{key:0,onClick:Ct,icon:"restart"})):(i(),f(ot,{key:1,onClick:nt,icon:g(a)?"play":"pause"},null,8,["icon"])),d(ot,{onClick:x,disabled:g(o),icon:"chevron-right"},null,8,["disabled"])])]))}}),Zt=w({__name:"ToolbarHint",props:{color:{default:A.WHITE+"75"},tutorial:{}},setup(e){return(n,t)=>(i(),f(Jn,{tutorial:n.tutorial},{default:p(({hint:o})=>[m("h5",{style:z({color:n.color}),class:"text-sm"},B(o),5)]),_:1},8,["tutorial"]))}}),he={class:"flex flex-col gap-2"},ye=w({__name:"ToolbarBase",props:{color:{default:A.GRAY_800},hint:{default:void 0}},setup(e){return(n,t)=>(i(),b("div",he,[m("div",{style:z({backgroundColor:n.color}),class:"flex items-center gap-2 py-1 px-1 rounded-lg"},[v(n.$slots,"default")],4),v(n.$slots,"hint",{},()=>[n.hint?(i(),f(Zt,{key:0,tutorial:n.hint},null,8,["tutorial"])):E("",!0)])]))}}),ke=w({__name:"GToolbarHint",props:{tutorial:{}},setup(e){const n=F();return(t,o)=>(i(),f(Zt,{tutorial:t.tutorial,color:g(n).text+"75"},null,8,["tutorial","color"]))}}),Xt=w({__name:"GToolbarBase",props:{hint:{}},setup(e){const n=F();return(t,o)=>(i(),f(ye,{hint:t.hint,color:g(n).primary},{hint:p(()=>[t.hint?(i(),f(ke,{key:0,tutorial:t.hint},null,8,["tutorial"])):E("",!0)]),default:p(()=>[v(t.$slots,"default")]),_:3},8,["hint","color"]))}}),we=e=>_(()=>{const n=Rt(e.value);if(!n.isValid())throw new Error("invalid color");return n}),Ce=["disabled"],xe=w({__name:"ToolbarButton",props:{color:{default:A.GRAY_800},active:{type:Boolean,default:!1},activeColor:{},disabled:{type:Boolean,default:!1},icon:{default:""}},setup(e){const n=e,t=Pn(n,"color"),o=we(t),a=_(()=>o.value.darken(5).toHexString()),r=_(()=>n.activeColor?n.activeColor:o.value.darken(10).toHexString()),u=_(()=>{if(!n.disabled)return n.active?r.value:h.value?a.value:n.color}),c=_(()=>{const y=o.value.isDark()?A.WHITE:A.BLACK;return n.disabled?y+"80":y}),l=_(()=>({color:c.value,backgroundColor:u.value,cursor:n.disabled?"not-allowed":"pointer"})),s=["p-1","rounded-md","grid","place-items-center","w-10","h-10","outline-none"],h=D(!1);return(y,k)=>(i(),b("button",{onMouseenter:k[0]||(k[0]=L=>h.value=!0),onMouseleave:k[1]||(k[1]=L=>h.value=!1),disabled:y.disabled,class:S(s),style:z(l.value)},[v(y.$slots,"default",{},()=>[d(P,{icon:y.icon},null,8,["icon"])])],44,Ce))}}),V=w({__name:"GToolbarButton",setup(e){const n=F(),t=_(()=>T.value.themeName.value==="dark"?n.value.tertiary:n.value.secondary);return(o,a)=>(i(),f(xe,C(o.$props,{color:g(n).primary,"active-color":t.value}),{default:p(()=>[v(o.$slots,"default")]),_:3},16,["color","active-color"]))}}),_e=w({__name:"ToolbarDivider",props:{color:{default:A.GRAY_100+"20"}},setup(e){return(n,t)=>(i(),b("div",{style:z({backgroundColor:n.color}),class:"w-[1px] h-6 mx-1"},null,4))}}),Pt=w({__name:"GToolbarDivider",setup(e){const n=F();return(t,o)=>(i(),f(_e,C(t.$props,{color:g(n).text+"30"}),null,16,["color"]))}}),lt=w({__name:"ToolbarButtonGroup",setup(e){const n=Qn(),t=["flex","items-center","relative","gap-1"],o=_(()=>qn(t,n.value));return(a,r)=>(i(),b("div",{class:S(o.value)},[v(a.$slots,"default")],2))}}),$e={class:S(["rounded-full","p-[3px]"])},Se=w({__name:"AnnotationToolbar",setup(e){const{clear:n,brushWeight:t,isErasing:o,color:a,isLaserPointing:r}=T.value.annotation,u=k=>{a.value=k,o.value=!1,r.value=!1},c=k=>{t.value=k,o.value=!1,r.value=!1},l=k=>o.value||r.value?!1:a.value===k,s=k=>o.value?!1:t.value===k,h=()=>{o.value=!o.value,r.value=!1},y=()=>{r.value=!r.value,o.value=!1};return(k,L)=>(i(),f(Xt,null,{default:p(()=>[d(lt,null,{default:p(()=>[(i(!0),b(I,null,H(g(Yn),$=>(i(),f(V,{key:$,onClick:x=>u($),active:l($)},{default:p(()=>[m("div",$e,[m("div",{style:z({backgroundColor:$}),class:S(["w-6","h-6","rounded-full"])},null,4)])]),_:2},1032,["onClick","active"]))),128))]),_:1}),d(Pt),d(lt,null,{default:p(()=>[(i(!0),b(I,null,H(g(Zn),($,x)=>(i(),f(V,{key:$,onClick:W=>c($),active:s($)},{default:p(()=>[m("div",{class:S(["bg-gray-400","rounded-md","w-[15px]"]),style:z({height:`${x*5+1}px`})},null,4)]),_:2},1032,["onClick","active"]))),128))]),_:1}),d(Pt),d(lt,null,{default:p(()=>[d(V,{onClick:y,active:g(r),icon:"laser-pointer"},null,8,["active"]),d(V,{onClick:h,active:g(o),icon:"eraser"},null,8,["active"]),d(V,{onClick:g(n),icon:"delete-outline"},null,8,["onClick"])]),_:1})]),_:1}))}});var Le=Q.extend({name:"focustrap-directive"}),Ee=In.extend({style:Le});function X(e){"@babel/helpers - typeof";return X=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},X(e)}function It(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,o)}return t}function Ot(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?It(Object(t),!0).forEach(function(o){De(e,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):It(Object(t)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))})}return e}function De(e,n,t){return(n=ze(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function ze(e){var n=Be(e,"string");return X(n)=="symbol"?n:n+""}function Be(e,n){if(X(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var o=t.call(e,n||"default");if(X(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var qt=Ee.extend("focustrap",{mounted:function(n,t){var o=t.value||{},a=o.disabled;a||(this.createHiddenFocusableElements(n,t),this.bind(n,t),this.autoElementFocus(n,t)),n.setAttribute("data-pd-focustrap",!0),this.$el=n},updated:function(n,t){var o=t.value||{},a=o.disabled;a&&this.unbind(n)},unmounted:function(n){this.unbind(n)},methods:{getComputedSelector:function(n){return':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])'.concat(n??"")},bind:function(n,t){var o=this,a=t.value||{},r=a.onFocusIn,u=a.onFocusOut;n.$_pfocustrap_mutationobserver=new MutationObserver(function(c){c.forEach(function(l){if(l.type==="childList"&&!n.contains(document.activeElement)){var s=function(y){var k=St(y)?St(y,o.getComputedSelector(n.$_pfocustrap_focusableselector))?y:Y(n,o.getComputedSelector(n.$_pfocustrap_focusableselector)):Y(y);return jt(k)?k:y.nextSibling&&s(y.nextSibling)};G(s(l.nextSibling))}})}),n.$_pfocustrap_mutationobserver.disconnect(),n.$_pfocustrap_mutationobserver.observe(n,{childList:!0}),n.$_pfocustrap_focusinlistener=function(c){return r&&r(c)},n.$_pfocustrap_focusoutlistener=function(c){return u&&u(c)},n.addEventListener("focusin",n.$_pfocustrap_focusinlistener),n.addEventListener("focusout",n.$_pfocustrap_focusoutlistener)},unbind:function(n){n.$_pfocustrap_mutationobserver&&n.$_pfocustrap_mutationobserver.disconnect(),n.$_pfocustrap_focusinlistener&&n.removeEventListener("focusin",n.$_pfocustrap_focusinlistener)&&(n.$_pfocustrap_focusinlistener=null),n.$_pfocustrap_focusoutlistener&&n.removeEventListener("focusout",n.$_pfocustrap_focusoutlistener)&&(n.$_pfocustrap_focusoutlistener=null)},autoFocus:function(n){this.autoElementFocus(this.$el,{value:Ot(Ot({},n),{},{autoFocus:!0})})},autoElementFocus:function(n,t){var o=t.value||{},a=o.autoFocusSelector,r=a===void 0?"":a,u=o.firstFocusableSelector,c=u===void 0?"":u,l=o.autoFocus,s=l===void 0?!1:l,h=Y(n,"[autofocus]".concat(this.getComputedSelector(r)));s&&!h&&(h=Y(n,this.getComputedSelector(c))),G(h)},onFirstHiddenElementFocus:function(n){var t,o=n.currentTarget,a=n.relatedTarget,r=a===o.$_pfocustrap_lasthiddenfocusableelement||!((t=this.$el)!==null&&t!==void 0&&t.contains(a))?Y(o.parentElement,this.getComputedSelector(o.$_pfocustrap_focusableselector)):o.$_pfocustrap_lasthiddenfocusableelement;G(r)},onLastHiddenElementFocus:function(n){var t,o=n.currentTarget,a=n.relatedTarget,r=a===o.$_pfocustrap_firsthiddenfocusableelement||!((t=this.$el)!==null&&t!==void 0&&t.contains(a))?On(o.parentElement,this.getComputedSelector(o.$_pfocustrap_focusableselector)):o.$_pfocustrap_firsthiddenfocusableelement;G(r)},createHiddenFocusableElements:function(n,t){var o=this,a=t.value||{},r=a.tabIndex,u=r===void 0?0:r,c=a.firstFocusableSelector,l=c===void 0?"":c,s=a.lastFocusableSelector,h=s===void 0?"":s,y=function(x){return Mn("span",{class:"p-hidden-accessible p-hidden-focusable",tabIndex:u,role:"presentation","aria-hidden":!0,"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0,onFocus:x==null?void 0:x.bind(o)})},k=y(this.onFirstHiddenElementFocus),L=y(this.onLastHiddenElementFocus);k.$_pfocustrap_lasthiddenfocusableelement=L,k.$_pfocustrap_focusableselector=l,k.setAttribute("data-pc-section","firstfocusableelement"),L.$_pfocustrap_firsthiddenfocusableelement=k,L.$_pfocustrap_focusableselector=h,L.setAttribute("data-pc-section","lastfocusableelement"),n.prepend(k),n.append(L)}}}),rt=Tn(),Pe=function(n){var t=n.dt;return`
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
`)},Ie={root:"p-popover p-component",content:"p-popover-content"},Oe=Q.extend({name:"popover",theme:Pe,classes:Ie}),Me={name:"BasePopover",extends:ct,props:{dismissable:{type:Boolean,default:!0},appendTo:{type:[String,Object],default:"body"},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},breakpoints:{type:Object,default:null},closeOnEscape:{type:Boolean,default:!0}},style:Oe,provide:function(){return{$pcPopover:this,$parentInstance:this}}},Jt={name:"Popover",extends:Me,inheritAttrs:!1,emits:["show","hide"],data:function(){return{visible:!1}},watch:{dismissable:{immediate:!0,handler:function(n){n?this.bindOutsideClickListener():this.unbindOutsideClickListener()}}},selfClick:!1,target:null,eventTarget:null,outsideClickListener:null,scrollHandler:null,resizeListener:null,container:null,styleElement:null,overlayEventListener:null,documentKeydownListener:null,beforeUnmount:function(){this.dismissable&&this.unbindOutsideClickListener(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.destroyStyle(),this.unbindResizeListener(),this.target=null,this.container&&this.autoZIndex&&U.clear(this.container),this.overlayEventListener&&(rt.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null),this.container=null},mounted:function(){this.breakpoints&&this.createStyle()},methods:{toggle:function(n,t){this.visible?this.hide():this.show(n,t)},show:function(n,t){this.visible=!0,this.eventTarget=n.currentTarget,this.target=t||n.currentTarget},hide:function(){this.visible=!1},onContentClick:function(){this.selfClick=!0},onEnter:function(n){var t=this;Ht(n,{position:"absolute",top:"0",left:"0"}),this.alignOverlay(),this.dismissable&&this.bindOutsideClickListener(),this.bindScrollListener(),this.bindResizeListener(),this.autoZIndex&&U.set("overlay",n,this.baseZIndex+this.$primevue.config.zIndex.overlay),this.overlayEventListener=function(o){t.container.contains(o.target)&&(t.selfClick=!0)},this.focus(),rt.on("overlay-click",this.overlayEventListener),this.$emit("show"),this.closeOnEscape&&this.bindDocumentKeyDownListener()},onLeave:function(){this.unbindOutsideClickListener(),this.unbindScrollListener(),this.unbindResizeListener(),this.unbindDocumentKeyDownListener(),rt.off("overlay-click",this.overlayEventListener),this.overlayEventListener=null,this.$emit("hide")},onAfterLeave:function(n){this.autoZIndex&&U.clear(n)},alignOverlay:function(){An(this.container,this.target,!1);var n=Lt(this.container),t=Lt(this.target),o=0;n.left<t.left&&(o=t.left-n.left),this.container.style.setProperty(Fn("popover.arrow.left").name,"".concat(o,"px")),n.top<t.top&&(this.container.setAttribute("data-p-popover-flipped","true"),!this.isUnstyled&&Kt(this.container,"p-popover-flipped"))},onContentKeydown:function(n){n.code==="Escape"&&this.closeOnEscape&&(this.hide(),G(this.target))},onButtonKeydown:function(n){switch(n.code){case"ArrowDown":case"ArrowUp":case"ArrowLeft":case"ArrowRight":n.preventDefault()}},focus:function(){var n=this.container.querySelector("[autofocus]");n&&n.focus()},onKeyDown:function(n){n.code==="Escape"&&this.closeOnEscape&&(this.visible=!1)},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},bindOutsideClickListener:function(){var n=this;!this.outsideClickListener&&Rn()&&(this.outsideClickListener=function(t){n.visible&&!n.selfClick&&!n.isTargetClicked(t)&&(n.visible=!1),n.selfClick=!1},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener:function(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null,this.selfClick=!1)},bindScrollListener:function(){var n=this;this.scrollHandler||(this.scrollHandler=new jn(this.target,function(){n.visible&&(n.visible=!1)})),this.scrollHandler.bindScrollListener()},unbindScrollListener:function(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()},bindResizeListener:function(){var n=this;this.resizeListener||(this.resizeListener=function(){n.visible&&!Hn()&&(n.visible=!1)},window.addEventListener("resize",this.resizeListener))},unbindResizeListener:function(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)},isTargetClicked:function(n){return this.eventTarget&&(this.eventTarget===n.target||this.eventTarget.contains(n.target))},containerRef:function(n){this.container=n},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var n;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",Gt(this.styleElement,"nonce",(n=this.$primevue)===null||n===void 0||(n=n.config)===null||n===void 0||(n=n.csp)===null||n===void 0?void 0:n.nonce),document.head.appendChild(this.styleElement);var t="";for(var o in this.breakpoints)t+=`
                        @media screen and (max-width: `.concat(o,`) {
                            .p-popover[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[o],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=t}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},onOverlayClick:function(n){rt.emit("overlay-click",{originalEvent:n,target:this.target})}},directives:{focustrap:qt,ripple:vt},components:{Portal:Vt}},Te=["aria-modal"];function Ae(e,n,t,o,a,r){var u=Z("Portal"),c=ht("focustrap");return i(),f(u,{appendTo:e.appendTo},{default:p(function(){return[d(Ut,C({name:"p-popover",onEnter:r.onEnter,onLeave:r.onLeave,onAfterLeave:r.onAfterLeave},e.ptm("transition")),{default:p(function(){return[a.visible?ut((i(),b("div",C({key:0,ref:r.containerRef,role:"dialog","aria-modal":a.visible,onClick:n[3]||(n[3]=function(){return r.onOverlayClick&&r.onOverlayClick.apply(r,arguments)}),class:e.cx("root")},e.ptmi("root")),[e.$slots.container?v(e.$slots,"container",{key:0,closeCallback:r.hide,keydownCallback:function(s){return r.onButtonKeydown(s)}}):(i(),b("div",C({key:1,class:e.cx("content"),onClick:n[0]||(n[0]=function(){return r.onContentClick&&r.onContentClick.apply(r,arguments)}),onMousedown:n[1]||(n[1]=function(){return r.onContentClick&&r.onContentClick.apply(r,arguments)}),onKeydown:n[2]||(n[2]=function(){return r.onContentKeydown&&r.onContentKeydown.apply(r,arguments)})},e.ptm("content")),[v(e.$slots,"default")],16))],16,Te)),[[c]]):E("",!0)]}),_:3},16,["onEnter","onLeave","onAfterLeave"])]}),_:3},8,["appendTo"])}Jt.render=Ae;const wt=w({__name:"Popover",props:{offset:{default:12}},setup(e){const n=D(),t=a=>{n.value.toggle(a)},o=D(!1);return(a,r)=>(i(),b(I,null,[v(a.$slots,"activator",{toggle:t,isOpen:o.value}),d(g(Jt),{unstyled:"",ref_key:"op",ref:n,onShow:r[0]||(r[0]=u=>o.value=!0),onHide:r[1]||(r[1]=u=>o.value=!1)},{default:p(()=>[m("div",{style:z({transform:`translateY(${a.offset}px)`})},[v(a.$slots,"default")],4)]),_:3},512)],64))}}),Fe=w({__name:"Well",props:{color:{default:A.GRAY_800},textColor:{default:A.WHITE}},setup(e){return(n,t)=>(i(),b("div",{style:z({backgroundColor:n.color,color:n.textColor})},[v(n.$slots,"default")],4))}}),K=w({__name:"GWell",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1}},setup(e){const n=F(),t=e,o=_(()=>t.secondary?n.value.secondary:t.tertiary?n.value.tertiary:n.value.primary);return(a,r)=>(i(),f(Fe,C(a.$attrs,{color:o.value,"text-color":g(n).text}),{default:p(()=>[v(a.$slots,"default")]),_:3},16,["color","text-color"]))}}),Re={class:"min-w-20 min-h-20 max-w-20 max-h-20 rounded-md"},je=["src"],He={class:"flex flex-col gap-1"},Ke={class:"text-lg font-bold"},Ge={class:"text-sm opacity-80"},Ve=w({__name:"VerticalCardButton",props:{imageSrc:{},color:{default:A.GRAY_800},hoverColor:{},title:{},description:{}},setup(e){const n=e,t=_(()=>{if(n.hoverColor)return n.hoverColor;const r=Rt(n.color);return(r.isDark()?r.lighten(10):r.darken(10)).toHexString()}),o=_(()=>a.value?t.value:n.color),a=D(!1);return(r,u)=>(i(),b("button",{onMouseenter:u[0]||(u[0]=c=>a.value=!0),onMouseleave:u[1]||(u[1]=c=>a.value=!1),style:z({backgroundColor:o.value}),class:"p-2 cursor-pointer text-left flex gap-4"},[m("div",Re,[r.imageSrc?(i(),b("img",{key:0,src:r.imageSrc,class:"object-cover aspect-square rounded-md"},null,8,je)):E("",!0)]),m("div",He,[m("h1",Ke,B(r.title),1),m("p",Ge,B(r.description),1)])],36))}}),Qt=w({__name:"GVerticalCardButton",setup(e){const n=F();return(t,o)=>(i(),f(Ve,C(t.$attrs,{color:g(n).primary,"hover-color":g(n).secondary}),null,16,["color","hover-color"]))}}),Ue={key:0,class:"flex items-center gap-3"},We=w({__name:"ProductItem",props:{product:{}},setup(e){const{navigate:n}=oe(),t=re(),o=l=>{at.value={nodes:T.value.nodes.value,edges:T.value.edges.value},it.value=T.value.annotation.annotations.value,n(l)},a=e,r=D(!1),u=D("");setTimeout(()=>{u.value=a.product.menu.thumbnail},Wt(0,100));const c=_(()=>{const l=a.product.menu.allowGoWithGraph??!0;return!ae(a.product)&&l});return(l,s)=>(i(),b("div",{onMouseenter:s[2]||(s[2]=h=>r.value=!0),onMouseleave:s[3]||(s[3]=h=>r.value=!1),class:"relative"},[m("div",{class:"absolute w-full h-full z-10 grid place-items-center transition duration-200",style:z({opacity:r.value?1:0})},[g(t).productId!==l.product.productId?(i(),b("div",Ue,[d(O,{onClick:s[0]||(s[0]=h=>g(n)(l.product)),tertiary:"",class:"grid place-items-center w-[120px] text-sm"},{default:p(()=>[d(P,{icon:"arrow-right"}),s[4]||(s[4]=j(" go "))]),_:1}),c.value?(i(),f(O,{key:0,onClick:s[1]||(s[1]=h=>o(l.product)),tertiary:"",class:"grid place-items-center w-[120px] text-sm"},{default:p(()=>[d(P,{icon:"debug-step-over"}),s[5]||(s[5]=j(" go with graph "))]),_:1})):E("",!0)])):(i(),f(K,{key:1,tertiary:"",class:"flex items-center gap-2 px-2 py-1 rounded-md text-xl font-bold overflow-hidden"},{default:p(()=>[d(P,{icon:"star",class:"text-xl"}),s[6]||(s[6]=j(" you are here ")),d(P,{icon:"star",class:"text-xl"})]),_:1}))],4),d(Qt,{"image-src":u.value,title:l.product.menu.name,description:l.product.menu.description,class:"rounded-md",style:z({opacity:r.value?.5:1})},null,8,["image-src","title","description","style"])],32))}}),Ne={class:"flex flex-col gap-2"},Ye=w({__name:"ProductDropdownMenu",setup(e){const n=tt.filter(o=>o==null?void 0:o.menu),t=Bt.reduce((o,a)=>(o[a]=[],o),{});return n.forEach(o=>{t[o.menu.category].push(o)}),(o,a)=>(i(),f(K,{class:"flex flex-col p-2 w-[400px] h-[500px] overflow-auto rounded-lg"},{default:p(()=>[(i(!0),b(I,null,H(g(Bt),r=>(i(),b("div",{key:r},[g(t)[r].length>0?(i(),f(K,{key:0,tertiary:"",class:"text-xl font-bold capitalize my-2 text-center p-1 rounded-md"},{default:p(()=>[j(B(r),1)]),_:2},1024)):E("",!0),m("div",Ne,[(i(!0),b(I,null,H(g(t)[r],u=>(i(),f(We,{key:u.productId,product:u},null,8,["product"]))),128))])]))),128))]),_:1}))}}),Ze=w({__name:"ProductDropdown",setup(e){const n=F();return(t,o)=>(i(),f(wt,null,{activator:p(({toggle:a})=>[d(O,{onClick:a,class:"px-4 py-2 text-xl rounded-lg"},{default:p(()=>[m("span",{class:S(`text-${g(n).brand}`)},"Magic Algorithms",2)]),_:2},1032,["onClick"])]),default:p(()=>[d(Ye)]),_:1}))}}),Xe=["onMouseenter","onMouseleave"],qe=w({__name:"PopoverTooltip",props:{offset:{default:4}},setup(e){return(n,t)=>(i(),f(wt,{offset:n.offset},{activator:p(({toggle:o})=>[m("div",{onMouseenter:o,onMouseleave:o},[v(n.$slots,"default")],40,Xe)]),default:p(()=>[v(n.$slots,"content")]),_:3},8,["offset"]))}}),Je={key:0,class:"absolute bg-black w-full h-full z-10 rounded-md bg-opacity-50 grid place-items-center"},Qe=["innerHTML"],to=w({__name:"SelectSimGuard",props:{simulation:{}},setup(e){const n=e,t=_(()=>{var o;return(o=n.simulation.canRun)==null?void 0:o.check()});return(o,a)=>t.value?(i(),b("div",Je,[d(qe,null,{content:p(()=>[d(K,{tertiary:"",class:"max-w-72 rounded-lg p-2"},{default:p(()=>[m("span",{innerHTML:t.value.description,class:"font-bold"},null,8,Qe)]),_:1})]),default:p(()=>[d(Yt,{onMouseenter:a[0]||(a[0]=r=>{var u;return(u=t.value.themer)==null?void 0:u.theme()}),onMouseleave:a[1]||(a[1]=r=>{var u;return(u=t.value.themer)==null?void 0:u.untheme()}),color:g(A).GRAY_900,"text-color":g(A).RED_500,class:"text-lg rounded-lg px-2 py-1"},{default:p(()=>[j(B(t.value.title),1)]),_:1},8,["color","text-color"])]),_:1})])):E("",!0)}}),no=w({__name:"SimCard",props:{simulation:{}},setup(e){const n=e,t=D("");return setTimeout(()=>{t.value=n.simulation.thumbnail},Wt(0,100)),(o,a)=>(i(),f(Qt,{"image-src":t.value,title:o.simulation.name,description:o.simulation.description,class:"rounded-md"},null,8,["image-src","title","description"]))}}),eo=w({__name:"SelectSim",props:{simulations:{},disabled:{type:Boolean}},emits:["simulation-selected"],setup(e,{emit:n}){const t=e,o=n,a=_(()=>{const r=t.simulations,u=r.filter(l=>{var s;return(s=l.canRun)==null?void 0:s.check()});return[...r.filter(l=>{var s;return!((s=l.canRun)!=null&&s.check())}),...u]});return(r,u)=>(i(),f(wt,null,{activator:p(({toggle:c})=>[d(O,{onClick:c,disabled:r.disabled,class:"h-14 w-14 rounded-full"},{default:p(()=>[d(P,{class:"text-3xl",icon:"play"})]),_:2},1032,["onClick","disabled"])]),default:p(()=>[d(K,{class:"flex flex-col p-2 w-[400px] max-h-[500px] overflow-auto gap-1 rounded-lg"},{default:p(()=>[(i(!0),b(I,null,H(a.value,c=>(i(),b("div",{key:c.name,class:"relative"},[d(to,{simulation:c},null,8,["simulation"]),d(no,{onClick:l=>o("simulation-selected",c),simulation:c},null,8,["onClick","simulation"])]))),128))]),_:1})]),_:1}))}}),oo=w({__name:"StopSimButton",setup(e){return(n,t)=>(i(),f(O,{color:g(A).RED_500,class:"h-14 w-14 rounded-full"},{default:p(()=>[d(P,{class:"text-3xl",icon:"stop"})]),_:1},8,["color"]))}}),ro=w({__name:"FullscreenButton",setup(e){const{toggle:n,isFullscreen:t}=Kn(),o=a=>{a.key.toLowerCase()==="f"&&n()};return T.value.subscribe("onKeyDown",o),mt(()=>T.value.unsubscribe("onKeyDown",o)),(a,r)=>(i(),f(O,{onClick:g(n),class:"h-12 w-12"},{default:p(()=>[d(P,{class:"text-3xl",icon:g(t)?"fullscreen-exit":"fullscreen"},null,8,["icon"])]),_:1},8,["onClick"]))}}),ao=w({__name:"ThemeToolbar",setup(e){const n={auto:"cog-outline",light:"weather-sunny",dark:"weather-night",girl:"flower-tulip-outline"};return(t,o)=>(i(),f(Xt,null,{default:p(()=>[d(lt,null,{default:p(()=>[(i(),b(I,null,H(n,(a,r)=>d(V,{key:r,onClick:u=>g(T).preferredTheme.value=r,icon:a,active:r===g(T).preferredTheme.value},null,8,["onClick","icon","active"])),64))]),_:1})]),_:1}))}});var tn={name:"WindowMaximizeIcon",extends:yt};function io(e,n,t,o,a,r){return i(),b("svg",C({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),n[0]||(n[0]=[m("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14ZM9.77805 7.42192C9.89013 7.534 10.0415 7.59788 10.2 7.59995C10.3585 7.59788 10.5099 7.534 10.622 7.42192C10.7341 7.30985 10.798 7.15844 10.8 6.99995V3.94242C10.8066 3.90505 10.8096 3.86689 10.8089 3.82843C10.8079 3.77159 10.7988 3.7157 10.7824 3.6623C10.756 3.55552 10.701 3.45698 10.622 3.37798C10.5099 3.2659 10.3585 3.20202 10.2 3.19995H7.00002C6.84089 3.19995 6.68828 3.26317 6.57576 3.37569C6.46324 3.48821 6.40002 3.64082 6.40002 3.79995C6.40002 3.95908 6.46324 4.11169 6.57576 4.22422C6.68828 4.33674 6.84089 4.39995 7.00002 4.39995H8.80006L6.19997 7.00005C6.10158 7.11005 6.04718 7.25246 6.04718 7.40005C6.04718 7.54763 6.10158 7.69004 6.19997 7.80005C6.30202 7.91645 6.44561 7.98824 6.59997 8.00005C6.75432 7.98824 6.89791 7.91645 6.99997 7.80005L9.60002 5.26841V6.99995C9.6021 7.15844 9.66598 7.30985 9.77805 7.42192ZM1.4 14H3.8C4.17066 13.9979 4.52553 13.8498 4.78763 13.5877C5.04973 13.3256 5.1979 12.9707 5.2 12.6V10.2C5.1979 9.82939 5.04973 9.47452 4.78763 9.21242C4.52553 8.95032 4.17066 8.80215 3.8 8.80005H1.4C1.02934 8.80215 0.674468 8.95032 0.412371 9.21242C0.150274 9.47452 0.00210008 9.82939 0 10.2V12.6C0.00210008 12.9707 0.150274 13.3256 0.412371 13.5877C0.674468 13.8498 1.02934 13.9979 1.4 14ZM1.25858 10.0586C1.29609 10.0211 1.34696 10 1.4 10H3.8C3.85304 10 3.90391 10.0211 3.94142 10.0586C3.97893 10.0961 4 10.147 4 10.2V12.6C4 12.6531 3.97893 12.704 3.94142 12.7415C3.90391 12.779 3.85304 12.8 3.8 12.8H1.4C1.34696 12.8 1.29609 12.779 1.25858 12.7415C1.22107 12.704 1.2 12.6531 1.2 12.6V10.2C1.2 10.147 1.22107 10.0961 1.25858 10.0586Z",fill:"currentColor"},null,-1)]),16)}tn.render=io;var nn={name:"WindowMinimizeIcon",extends:yt};function lo(e,n,t,o,a,r){return i(),b("svg",C({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),n[0]||(n[0]=[m("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0ZM6.368 7.952C6.44137 7.98326 6.52025 7.99958 6.6 8H9.8C9.95913 8 10.1117 7.93678 10.2243 7.82426C10.3368 7.71174 10.4 7.55913 10.4 7.4C10.4 7.24087 10.3368 7.08826 10.2243 6.97574C10.1117 6.86321 9.95913 6.8 9.8 6.8H8.048L10.624 4.224C10.73 4.11026 10.7877 3.95982 10.7849 3.80438C10.7822 3.64894 10.7192 3.50063 10.6093 3.3907C10.4994 3.28077 10.3511 3.2178 10.1956 3.21506C10.0402 3.21232 9.88974 3.27002 9.776 3.376L7.2 5.952V4.2C7.2 4.04087 7.13679 3.88826 7.02426 3.77574C6.91174 3.66321 6.75913 3.6 6.6 3.6C6.44087 3.6 6.28826 3.66321 6.17574 3.77574C6.06321 3.88826 6 4.04087 6 4.2V7.4C6.00042 7.47975 6.01674 7.55862 6.048 7.632C6.07656 7.70442 6.11971 7.7702 6.17475 7.82524C6.2298 7.88029 6.29558 7.92344 6.368 7.952ZM1.4 8.80005H3.8C4.17066 8.80215 4.52553 8.95032 4.78763 9.21242C5.04973 9.47452 5.1979 9.82939 5.2 10.2V12.6C5.1979 12.9707 5.04973 13.3256 4.78763 13.5877C4.52553 13.8498 4.17066 13.9979 3.8 14H1.4C1.02934 13.9979 0.674468 13.8498 0.412371 13.5877C0.150274 13.3256 0.00210008 12.9707 0 12.6V10.2C0.00210008 9.82939 0.150274 9.47452 0.412371 9.21242C0.674468 8.95032 1.02934 8.80215 1.4 8.80005ZM3.94142 12.7415C3.97893 12.704 4 12.6531 4 12.6V10.2C4 10.147 3.97893 10.0961 3.94142 10.0586C3.90391 10.0211 3.85304 10 3.8 10H1.4C1.34696 10 1.29609 10.0211 1.25858 10.0586C1.22107 10.0961 1.2 10.147 1.2 10.2V12.6C1.2 12.6531 1.22107 12.704 1.25858 12.7415C1.29609 12.779 1.34696 12.8 1.4 12.8H3.8C3.85304 12.8 3.90391 12.779 3.94142 12.7415Z",fill:"currentColor"},null,-1)]),16)}nn.render=lo;var en={name:"SpinnerIcon",extends:yt};function so(e,n,t,o,a,r){return i(),b("svg",C({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),n[0]||(n[0]=[m("path",{d:"M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",fill:"currentColor"},null,-1)]),16)}en.render=so;var co=function(n){var t=n.dt;return`
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
`)},uo={root:function(n){var t=n.props,o=n.instance;return["p-badge p-component",{"p-badge-circle":jt(t.value)&&String(t.value).length===1,"p-badge-dot":Nt(t.value)&&!o.$slots.default,"p-badge-sm":t.size==="small","p-badge-lg":t.size==="large","p-badge-xl":t.size==="xlarge","p-badge-info":t.severity==="info","p-badge-success":t.severity==="success","p-badge-warn":t.severity==="warn","p-badge-danger":t.severity==="danger","p-badge-secondary":t.severity==="secondary","p-badge-contrast":t.severity==="contrast"}]}},po=Q.extend({name:"badge",theme:co,classes:uo}),bo={name:"BaseBadge",extends:ct,props:{value:{type:[String,Number],default:null},severity:{type:String,default:null},size:{type:String,default:null}},style:po,provide:function(){return{$pcBadge:this,$parentInstance:this}}},on={name:"Badge",extends:bo,inheritAttrs:!1};function fo(e,n,t,o,a,r){return i(),b("span",C({class:e.cx("root")},e.ptmi("root")),[v(e.$slots,"default",{},function(){return[j(B(e.value),1)]})],16)}on.render=fo;function q(e){"@babel/helpers - typeof";return q=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},q(e)}function R(e,n,t){return(n=go(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function go(e){var n=mo(e,"string");return q(n)=="symbol"?n:n+""}function mo(e,n){if(q(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var o=t.call(e,n||"default");if(q(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var vo=function(n){var t=n.dt;return`
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
`)},ho={root:function(n){var t=n.instance,o=n.props;return["p-button p-component",R(R(R(R(R(R(R(R(R({"p-button-icon-only":t.hasIcon&&!o.label&&!o.badge,"p-button-vertical":(o.iconPos==="top"||o.iconPos==="bottom")&&o.label,"p-button-loading":o.loading,"p-button-link":o.link||o.variant==="link"},"p-button-".concat(o.severity),o.severity),"p-button-raised",o.raised),"p-button-rounded",o.rounded),"p-button-text",o.text||o.variant==="text"),"p-button-outlined",o.outlined||o.variant==="outlined"),"p-button-sm",o.size==="small"),"p-button-lg",o.size==="large"),"p-button-plain",o.plain),"p-button-fluid",t.hasFluid)]},loadingIcon:"p-button-loading-icon",icon:function(n){var t=n.props;return["p-button-icon",R({},"p-button-icon-".concat(t.iconPos),t.label)]},label:"p-button-label"},yo=Q.extend({name:"button",theme:vo,classes:ho}),ko={name:"BaseButton",extends:ct,props:{label:{type:String,default:null},icon:{type:String,default:null},iconPos:{type:String,default:"left"},iconClass:{type:[String,Object],default:null},badge:{type:String,default:null},badgeClass:{type:[String,Object],default:null},badgeSeverity:{type:String,default:"secondary"},loading:{type:Boolean,default:!1},loadingIcon:{type:String,default:void 0},as:{type:[String,Object],default:"BUTTON"},asChild:{type:Boolean,default:!1},link:{type:Boolean,default:!1},severity:{type:String,default:null},raised:{type:Boolean,default:!1},rounded:{type:Boolean,default:!1},text:{type:Boolean,default:!1},outlined:{type:Boolean,default:!1},size:{type:String,default:null},variant:{type:String,default:null},plain:{type:Boolean,default:!1},fluid:{type:Boolean,default:null}},style:yo,provide:function(){return{$pcButton:this,$parentInstance:this}}},rn={name:"Button",extends:ko,inheritAttrs:!1,inject:{$pcFluid:{default:null}},methods:{getPTOptions:function(n){var t=n==="root"?this.ptmi:this.ptm;return t(n,{context:{disabled:this.disabled}})}},computed:{disabled:function(){return this.$attrs.disabled||this.$attrs.disabled===""||this.loading},defaultAriaLabel:function(){return this.label?this.label+(this.badge?" "+this.badge:""):this.$attrs.ariaLabel},hasIcon:function(){return this.icon||this.$slots.icon},attrs:function(){return C(this.asAttrs,this.a11yAttrs,this.getPTOptions("root"))},asAttrs:function(){return this.as==="BUTTON"?{type:"button",disabled:this.disabled}:void 0},a11yAttrs:function(){return{"aria-label":this.defaultAriaLabel,"data-pc-name":"button","data-p-disabled":this.disabled,"data-p-severity":this.severity}},hasFluid:function(){return Nt(this.fluid)?!!this.$pcFluid:this.fluid}},components:{SpinnerIcon:en,Badge:on},directives:{ripple:vt}};function wo(e,n,t,o,a,r){var u=Z("SpinnerIcon"),c=Z("Badge"),l=ht("ripple");return e.asChild?v(e.$slots,"default",{key:1,class:S(e.cx("root")),a11yAttrs:r.a11yAttrs}):ut((i(),f(gt(e.as),C({key:0,class:e.cx("root")},r.attrs),{default:p(function(){return[v(e.$slots,"default",{},function(){return[e.loading?v(e.$slots,"loadingicon",C({key:0,class:[e.cx("loadingIcon"),e.cx("icon")]},e.ptm("loadingIcon")),function(){return[e.loadingIcon?(i(),b("span",C({key:0,class:[e.cx("loadingIcon"),e.cx("icon"),e.loadingIcon]},e.ptm("loadingIcon")),null,16)):(i(),f(u,C({key:1,class:[e.cx("loadingIcon"),e.cx("icon")],spin:""},e.ptm("loadingIcon")),null,16,["class"]))]}):v(e.$slots,"icon",C({key:1,class:[e.cx("icon")]},e.ptm("icon")),function(){return[e.icon?(i(),b("span",C({key:0,class:[e.cx("icon"),e.icon,e.iconClass]},e.ptm("icon")),null,16)):E("",!0)]}),m("span",C({class:e.cx("label")},e.ptm("label")),B(e.label||" "),17),e.badge?(i(),f(c,{key:2,value:e.badge,class:S(e.badgeClass),severity:e.badgeSeverity,unstyled:e.unstyled,pt:e.ptm("pcBadge")},null,8,["value","class","severity","unstyled","pt"])):E("",!0)]})]}),_:3},16,["class"])),[[l]])}rn.render=wo;var Co=function(n){var t=n.dt;return`
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
`)},xo={mask:function(n){var t=n.position,o=n.modal;return{position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",justifyContent:t==="left"||t==="topleft"||t==="bottomleft"?"flex-start":t==="right"||t==="topright"||t==="bottomright"?"flex-end":"center",alignItems:t==="top"||t==="topleft"||t==="topright"?"flex-start":t==="bottom"||t==="bottomleft"||t==="bottomright"?"flex-end":"center",pointerEvents:o?"auto":"none"}},root:{display:"flex",flexDirection:"column",pointerEvents:"auto"}},_o={mask:function(n){var t=n.props,o=["left","right","top","topleft","topright","bottom","bottomleft","bottomright"],a=o.find(function(r){return r===t.position});return["p-dialog-mask",{"p-overlay-mask p-overlay-mask-enter":t.modal},a?"p-dialog-".concat(a):""]},root:function(n){var t=n.props,o=n.instance;return["p-dialog p-component",{"p-dialog-maximized":t.maximizable&&o.maximized}]},header:"p-dialog-header",title:"p-dialog-title",headerActions:"p-dialog-header-actions",pcMaximizeButton:"p-dialog-maximize-button",pcCloseButton:"p-dialog-close-button",content:"p-dialog-content",footer:"p-dialog-footer"},$o=Q.extend({name:"dialog",theme:Co,classes:_o,inlineStyles:xo}),So={name:"BaseDialog",extends:ct,props:{header:{type:null,default:null},footer:{type:null,default:null},visible:{type:Boolean,default:!1},modal:{type:Boolean,default:null},contentStyle:{type:null,default:null},contentClass:{type:String,default:null},contentProps:{type:null,default:null},maximizable:{type:Boolean,default:!1},dismissableMask:{type:Boolean,default:!1},closable:{type:Boolean,default:!0},closeOnEscape:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!1},baseZIndex:{type:Number,default:0},autoZIndex:{type:Boolean,default:!0},position:{type:String,default:"center"},breakpoints:{type:Object,default:null},draggable:{type:Boolean,default:!0},keepInViewport:{type:Boolean,default:!0},minX:{type:Number,default:0},minY:{type:Number,default:0},appendTo:{type:[String,Object],default:"body"},closeIcon:{type:String,default:void 0},maximizeIcon:{type:String,default:void 0},minimizeIcon:{type:String,default:void 0},closeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},maximizeButtonProps:{type:Object,default:function(){return{severity:"secondary",text:!0,rounded:!0}}},_instance:null},style:$o,provide:function(){return{$pcDialog:this,$parentInstance:this}}},an={name:"Dialog",extends:So,inheritAttrs:!1,emits:["update:visible","show","hide","after-hide","maximize","unmaximize","dragstart","dragend"],provide:function(){var n=this;return{dialogRef:_(function(){return n._instance})}},data:function(){return{id:this.$attrs.id,containerVisible:this.visible,maximized:!1,focusableMax:null,focusableClose:null,target:null}},watch:{"$attrs.id":function(n){this.id=n||Et()}},documentKeydownListener:null,container:null,mask:null,content:null,headerContainer:null,footerContainer:null,maximizableButton:null,closeButton:null,styleElement:null,dragging:null,documentDragListener:null,documentDragEndListener:null,lastPageX:null,lastPageY:null,maskMouseDownTarget:null,updated:function(){this.visible&&(this.containerVisible=this.visible)},beforeUnmount:function(){this.unbindDocumentState(),this.unbindGlobalListeners(),this.destroyStyle(),this.mask&&this.autoZIndex&&U.clear(this.mask),this.container=null,this.mask=null},mounted:function(){this.id=this.id||Et(),this.breakpoints&&this.createStyle()},methods:{close:function(){this.$emit("update:visible",!1)},onEnter:function(){this.$emit("show"),this.target=document.activeElement,this.enableDocumentSettings(),this.bindGlobalListeners(),this.autoZIndex&&U.set("modal",this.mask,this.baseZIndex+this.$primevue.config.zIndex.modal)},onAfterEnter:function(){this.focus()},onBeforeLeave:function(){this.modal&&!this.isUnstyled&&Kt(this.mask,"p-overlay-mask-leave"),this.dragging&&this.documentDragEndListener&&this.documentDragEndListener()},onLeave:function(){this.$emit("hide"),G(this.target),this.target=null,this.focusableClose=null,this.focusableMax=null},onAfterLeave:function(){this.autoZIndex&&U.clear(this.mask),this.containerVisible=!1,this.unbindDocumentState(),this.unbindGlobalListeners(),this.$emit("after-hide")},onMaskMouseDown:function(n){this.maskMouseDownTarget=n.target},onMaskMouseUp:function(){this.dismissableMask&&this.modal&&this.mask===this.maskMouseDownTarget&&this.close()},focus:function(){var n=function(a){return a&&a.querySelector("[autofocus]")},t=this.$slots.footer&&n(this.footerContainer);t||(t=this.$slots.header&&n(this.headerContainer),t||(t=this.$slots.default&&n(this.content),t||(this.maximizable?(this.focusableMax=!0,t=this.maximizableButton):(this.focusableClose=!0,t=this.closeButton)))),t&&G(t,{focusVisible:!0})},maximize:function(n){this.maximized?(this.maximized=!1,this.$emit("unmaximize",n)):(this.maximized=!0,this.$emit("maximize",n)),this.modal||(this.maximized?Dt():zt())},enableDocumentSettings:function(){(this.modal||!this.modal&&this.blockScroll||this.maximizable&&this.maximized)&&Dt()},unbindDocumentState:function(){(this.modal||!this.modal&&this.blockScroll||this.maximizable&&this.maximized)&&zt()},onKeyDown:function(n){n.code==="Escape"&&this.closeOnEscape&&this.close()},bindDocumentKeyDownListener:function(){this.documentKeydownListener||(this.documentKeydownListener=this.onKeyDown.bind(this),window.document.addEventListener("keydown",this.documentKeydownListener))},unbindDocumentKeyDownListener:function(){this.documentKeydownListener&&(window.document.removeEventListener("keydown",this.documentKeydownListener),this.documentKeydownListener=null)},containerRef:function(n){this.container=n},maskRef:function(n){this.mask=n},contentRef:function(n){this.content=n},headerContainerRef:function(n){this.headerContainer=n},footerContainerRef:function(n){this.footerContainer=n},maximizableRef:function(n){this.maximizableButton=n?n.$el:void 0},closeButtonRef:function(n){this.closeButton=n?n.$el:void 0},createStyle:function(){if(!this.styleElement&&!this.isUnstyled){var n;this.styleElement=document.createElement("style"),this.styleElement.type="text/css",Gt(this.styleElement,"nonce",(n=this.$primevue)===null||n===void 0||(n=n.config)===null||n===void 0||(n=n.csp)===null||n===void 0?void 0:n.nonce),document.head.appendChild(this.styleElement);var t="";for(var o in this.breakpoints)t+=`
                        @media screen and (max-width: `.concat(o,`) {
                            .p-dialog[`).concat(this.$attrSelector,`] {
                                width: `).concat(this.breakpoints[o],` !important;
                            }
                        }
                    `);this.styleElement.innerHTML=t}},destroyStyle:function(){this.styleElement&&(document.head.removeChild(this.styleElement),this.styleElement=null)},initDrag:function(n){n.target.closest("div").getAttribute("data-pc-section")!=="headeractions"&&this.draggable&&(this.dragging=!0,this.lastPageX=n.pageX,this.lastPageY=n.pageY,this.container.style.margin="0",document.body.setAttribute("data-p-unselectable-text","true"),!this.isUnstyled&&Ht(document.body,{"user-select":"none"}),this.$emit("dragstart",n))},bindGlobalListeners:function(){this.draggable&&(this.bindDocumentDragListener(),this.bindDocumentDragEndListener()),this.closeOnEscape&&this.closable&&this.bindDocumentKeyDownListener()},unbindGlobalListeners:function(){this.unbindDocumentDragListener(),this.unbindDocumentDragEndListener(),this.unbindDocumentKeyDownListener()},bindDocumentDragListener:function(){var n=this;this.documentDragListener=function(t){if(n.dragging){var o=Gn(n.container),a=Vn(n.container),r=t.pageX-n.lastPageX,u=t.pageY-n.lastPageY,c=n.container.getBoundingClientRect(),l=c.left+r,s=c.top+u,h=Un(),y=getComputedStyle(n.container),k=parseFloat(y.marginLeft),L=parseFloat(y.marginTop);n.container.style.position="fixed",n.keepInViewport?(l>=n.minX&&l+o<h.width&&(n.lastPageX=t.pageX,n.container.style.left=l-k+"px"),s>=n.minY&&s+a<h.height&&(n.lastPageY=t.pageY,n.container.style.top=s-L+"px")):(n.lastPageX=t.pageX,n.container.style.left=l-k+"px",n.lastPageY=t.pageY,n.container.style.top=s-L+"px")}},window.document.addEventListener("mousemove",this.documentDragListener)},unbindDocumentDragListener:function(){this.documentDragListener&&(window.document.removeEventListener("mousemove",this.documentDragListener),this.documentDragListener=null)},bindDocumentDragEndListener:function(){var n=this;this.documentDragEndListener=function(t){n.dragging&&(n.dragging=!1,document.body.removeAttribute("data-p-unselectable-text"),!n.isUnstyled&&(document.body.style["user-select"]=""),n.$emit("dragend",t))},window.document.addEventListener("mouseup",this.documentDragEndListener)},unbindDocumentDragEndListener:function(){this.documentDragEndListener&&(window.document.removeEventListener("mouseup",this.documentDragEndListener),this.documentDragEndListener=null)}},computed:{maximizeIconComponent:function(){return this.maximized?this.minimizeIcon?"span":"WindowMinimizeIcon":this.maximizeIcon?"span":"WindowMaximizeIcon"},ariaLabelledById:function(){return this.header!=null||this.$attrs["aria-labelledby"]!==null?this.id+"_header":null},closeAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.close:void 0}},directives:{ripple:vt,focustrap:qt},components:{Button:rn,Portal:Vt,WindowMinimizeIcon:nn,WindowMaximizeIcon:tn,TimesIcon:Wn}};function J(e){"@babel/helpers - typeof";return J=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},J(e)}function Mt(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,o)}return t}function Tt(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?Mt(Object(t),!0).forEach(function(o){Lo(e,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):Mt(Object(t)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(t,o))})}return e}function Lo(e,n,t){return(n=Eo(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function Eo(e){var n=Do(e,"string");return J(n)=="symbol"?n:n+""}function Do(e,n){if(J(e)!="object"||!e)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var o=t.call(e,n||"default");if(J(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}var zo=["aria-labelledby","aria-modal"],Bo=["id"];function Po(e,n,t,o,a,r){var u=Z("Button"),c=Z("Portal"),l=ht("focustrap");return i(),f(c,{appendTo:e.appendTo},{default:p(function(){return[a.containerVisible?(i(),b("div",C({key:0,ref:r.maskRef,class:e.cx("mask"),style:e.sx("mask",!0,{position:e.position,modal:e.modal}),onMousedown:n[1]||(n[1]=function(){return r.onMaskMouseDown&&r.onMaskMouseDown.apply(r,arguments)}),onMouseup:n[2]||(n[2]=function(){return r.onMaskMouseUp&&r.onMaskMouseUp.apply(r,arguments)})},e.ptm("mask")),[d(Ut,C({name:"p-dialog",onEnter:r.onEnter,onAfterEnter:r.onAfterEnter,onBeforeLeave:r.onBeforeLeave,onLeave:r.onLeave,onAfterLeave:r.onAfterLeave,appear:""},e.ptm("transition")),{default:p(function(){return[e.visible?ut((i(),b("div",C({key:0,ref:r.containerRef,class:e.cx("root"),style:e.sx("root"),role:"dialog","aria-labelledby":r.ariaLabelledById,"aria-modal":e.modal},e.ptmi("root")),[e.$slots.container?v(e.$slots,"container",{key:0,closeCallback:r.close,maximizeCallback:function(h){return r.maximize(h)}}):(i(),b(I,{key:1},[e.showHeader?(i(),b("div",C({key:0,ref:r.headerContainerRef,class:e.cx("header"),onMousedown:n[0]||(n[0]=function(){return r.initDrag&&r.initDrag.apply(r,arguments)})},e.ptm("header")),[v(e.$slots,"header",{class:S(e.cx("title"))},function(){return[e.header?(i(),b("span",C({key:0,id:r.ariaLabelledById,class:e.cx("title")},e.ptm("title")),B(e.header),17,Bo)):E("",!0)]}),m("div",C({class:e.cx("headerActions")},e.ptm("headerActions")),[e.maximizable?(i(),f(u,C({key:0,ref:r.maximizableRef,autofocus:a.focusableMax,class:e.cx("pcMaximizeButton"),onClick:r.maximize,tabindex:e.maximizable?"0":"-1",unstyled:e.unstyled},e.maximizeButtonProps,{pt:e.ptm("pcMaximizeButton"),"data-pc-group-section":"headericon"}),{icon:p(function(s){return[v(e.$slots,"maximizeicon",{maximized:a.maximized},function(){return[(i(),f(gt(r.maximizeIconComponent),C({class:[s.class,a.maximized?e.minimizeIcon:e.maximizeIcon]},e.ptm("pcMaximizeButton").icon),null,16,["class"]))]})]}),_:3},16,["autofocus","class","onClick","tabindex","unstyled","pt"])):E("",!0),e.closable?(i(),f(u,C({key:1,ref:r.closeButtonRef,autofocus:a.focusableClose,class:e.cx("pcCloseButton"),onClick:r.close,"aria-label":r.closeAriaLabel,unstyled:e.unstyled},e.closeButtonProps,{pt:e.ptm("pcCloseButton"),"data-pc-group-section":"headericon"}),{icon:p(function(s){return[v(e.$slots,"closeicon",{},function(){return[(i(),f(gt(e.closeIcon?"span":"TimesIcon"),C({class:[e.closeIcon,s.class]},e.ptm("pcCloseButton").icon),null,16,["class"]))]})]}),_:3},16,["autofocus","class","onClick","aria-label","unstyled","pt"])):E("",!0)],16)],16)):E("",!0),m("div",C({ref:r.contentRef,class:[e.cx("content"),e.contentClass],style:e.contentStyle},Tt(Tt({},e.contentProps),e.ptm("content"))),[v(e.$slots,"default")],16),e.footer||e.$slots.footer?(i(),b("div",C({key:1,ref:r.footerContainerRef,class:e.cx("footer")},e.ptm("footer")),[v(e.$slots,"footer",{},function(){return[j(B(e.footer),1)]})],16)):E("",!0)],64))],16,zo)),[[l,{disabled:!e.modal}]]):E("",!0)]}),_:3},16,["onEnter","onAfterEnter","onBeforeLeave","onLeave","onAfterLeave"])],16)):E("",!0)]}),_:3},8,["appendTo"])}an.render=Po;const Io=w({__name:"GDialog",props:{secondary:{type:Boolean,default:!1},tertiary:{type:Boolean,default:!1},contrast:{type:Boolean,default:!1}},setup(e){const n=F(),t=e,o=_(()=>t.secondary?n.value.secondary:t.tertiary?n.value.tertiary:n.value.primary);return(a,r)=>(i(),f(g(an),C(a.$attrs,{style:{backgroundColor:o.value,color:g(n).text,borderColor:g(n).text}}),{default:p(()=>[v(a.$slots,"header"),v(a.$slots,"default"),v(a.$slots,"footer")]),_:3},16,["style"]))}}),Oo={class:"flex py-1"},Mo={key:1},At="https://github.com/Yonava/magic-graphs",To=w({__name:"CommandPalette",setup(e){const n=D(!1),{nameToBindingKeys:t}=T.value.shortcut,o=_(()=>({...t.value,Fullscreen:"F","Pause/Play Simulation":"Space","Simulation Step Forward":"mdi-arrow-right","Simulation Step Backward":"mdi-arrow-left"})),a=u=>u.split("+").map(l=>l.trim()).filter(l=>l!==""),r=u=>{window.open(u,"_blank")};return(u,c)=>(i(),b(I,null,[d(O,{onClick:c[0]||(c[0]=l=>n.value=!n.value),class:"aspect-square"},{default:p(()=>[d(P,{icon:"help"})]),_:1}),d(Io,{visible:n.value,"onUpdate:visible":c[3]||(c[3]=l=>n.value=l),header:"Help"},{default:p(()=>[d(K,{class:"mb-6"},{default:p(()=>[d(O,{onClick:c[1]||(c[1]=l=>r(`${At}/issues/new?template=Blank%20issue`)),class:"flex justify-center mb-1",secondary:""},{default:p(()=>[d(P,{icon:"bug"}),c[4]||(c[4]=j(" Find an Issue? "))]),_:1}),d(O,{onClick:c[2]||(c[2]=l=>r(At)),secondary:"",class:"flex justify-center"},{default:p(()=>[d(P,{icon:"star-outline"}),c[5]||(c[5]=j(" Like the project? Give it a star! "))]),_:1})]),_:1}),c[6]||(c[6]=m("h1",{class:"font-bold text-md"},"Commands",-1)),d(K,{class:"flex-col w-[500px]"},{default:p(()=>[(i(!0),b(I,null,H(Object.keys(o.value),l=>(i(),b("div",{key:l,class:"flex justify-between py-1 items-center"},[j(B(l)+" ",1),m("div",Oo,[(i(!0),b(I,null,H(a(o.value[l]),s=>(i(),f(K,{key:s,class:S(["border-[1px]","rounded-md","px-2","mx-[1px]","text-xs"])},{default:p(()=>[s.startsWith("mdi-")?(i(),f(P,{key:0,icon:s.slice(4),class:"text-xs"},null,8,["icon"])):(i(),b("p",Mo,B(s),1))]),_:2},1024))),128))])]))),128))]),_:1})]),_:1},8,["visible"])],64))}}),Ao={class:"relative max-h-3/4 w-full grid place-items-center overflow-auto"},Fo={class:"relative max-h-3/4 w-full grid place-items-center overflow-auto"},Wo=w({__name:"GraphProduct",props:{graph:{}},emits:["graph-ref","simulation-started","simulation-stopped"],setup(e,{emit:n}){const t=e,o=n,a=ee(t.graph),r=D(a[0]),u=D(!1),c=_(()=>r.value.runner),l=_(()=>c.value.simControls.isActive),s=async()=>{u.value=!0,o("simulation-started",r.value),await c.value.start()},h=async()=>{await c.value.stop(),u.value=!1,o("simulation-stopped")},y=x=>{r.value=x,s()},k=D();ie(t.graph);const L=D(!1),$=_(()=>L.value?"pointer-events-none":"");return Ft(()=>{o("graph-ref",k.value),t.graph.subscribe("onMouseDown",()=>{L.value=!0}),t.graph.subscribe("onMouseUp",()=>{L.value=!1})}),mt(()=>{t.graph.unsubscribe("onMouseDown",()=>{}),t.graph.unsubscribe("onMouseUp",()=>{})}),(x,W)=>(i(),b(I,null,[d(Xn,{onGraphRef:W[0]||(W[0]=nt=>k.value=nt),graph:x.graph},null,8,["graph"]),m("div",{class:S(["absolute","top-6","w-full","flex","flex-col","justify-center","items-center","gap-2",$.value])},[u.value?v(x.$slots,"top-center-sim",{key:0}):v(x.$slots,"top-center",{key:1})],2),m("div",{class:S(["absolute","grid","place-items-center","left-4","top-0","h-full","max-w-96",$.value])},[m("div",Ao,[u.value?v(x.$slots,"center-left-sim",{key:0}):v(x.$slots,"center-left",{key:1})])],2),m("div",{class:S(["absolute","grid","place-items-center","right-4","top-0","h-full","max-w-96",$.value])},[m("div",Fo,[u.value?v(x.$slots,"center-right-sim",{key:0}):v(x.$slots,"center-right",{key:1})])],2),m("div",{class:S(["absolute","top-6","left-6",$.value])},[d(Ze)],2),m("div",{class:S(["absolute","top-6","right-6",$.value])},[u.value?v(x.$slots,"top-right-sim",{key:0},()=>[d(oo,{onClick:h})]):v(x.$slots,"top-right",{key:1},()=>[d(eo,{onSimulationSelected:y,simulations:g(a),disabled:x.graph.annotation.isActive.value},null,8,["simulations","disabled"])])],2),m("div",{class:S(["absolute","bottom-8","gap-4","w-full","flex","flex-col","justify-center","items-center",$.value])},[u.value&&l.value?v(x.$slots,"bottom-center-sim",{key:0},()=>[d(ve,{controls:c.value.simControls},null,8,["controls"])]):v(x.$slots,"bottom-center",{key:1},()=>[ut(m("div",null,[d(Se)],512),[[Nn,x.graph.annotation.isActive.value]])])],2),m("div",{class:S(["absolute","flex","gap-2","bottom-8","left-8",$.value])},[d(To)],2),m("div",{class:S(["absolute","flex","gap-2","bottom-8","right-8",$.value])},[d(ao),d(ro)],2)],64))}});export{Wo as _,O as a,K as b,qe as c,wt as d,tt as e,V as f,Pt as g,lt as h,Xt as i,we as j,Uo as p,oe as u};
