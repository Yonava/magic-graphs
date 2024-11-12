import{u as Z,a as se,g as F,C as ne,b as ae,c as re,_ as ie,i as de}from"./Graph.vue_vue_type_script_setup_true_lang-Ckdaak9v.js";import{f as A,l as ue,m as k,n as $,d as y,o as r,c as i,a as c,p as R,F as V,t as N,q as ce,s as X,u as ge,b as U,v as me,x as L,y as B,z as G,A as K,e as E,B as T,w as j,C as g,D as J,E as ve}from"./index-BsceA08-.js";import{P as be,R as pe,c as C,g as q,u as he}from"./ResponsiveCanvas.vue_vue_type_script_setup_true_lang-DhCpPeR4.js";import{_ as Y,a as fe}from"./InputRange.vue_vue_type_script_setup_true_lang-Dz-nuxkf.js";const Ee="element-highlight",ye=1e3,Ce=1e3,_e="tutorial",Se=(e,o)=>{const t=A(0),l=ue(o);let s,n;const d=a=>{const{event:v,predicate:u}=typeof a.dismiss=="string"?{event:a.dismiss,predicate:()=>!0}:a.dismiss;if(v==="onInterval"){const S="interval"in a?a.interval:ye;let x=0;const z=setInterval(()=>{u(++x)&&t.value++},S);return()=>clearInterval(z)}const m=(...S)=>{(u==null?void 0:u(...S))&&t.value++};return e.subscribe(v,m),()=>e.unsubscribe(v,m)},p=()=>{var v,u;const a=l.value[t.value];if(a){if((v=a.onInit)==null||v.call(a),(u=a.precondition)!=null&&u.call(a,e)){t.value++;return}a!=null&&a.highlightElement&&(s=Te(a)),n=d(a.dismiss!=="onTimeout"?a:{hint:a.hint,dismiss:"onInterval",interval:a.after})}},h=(a,v)=>{var m;if(a<0)return t.value=0;if(a>l.value.length)return t.value=l.value.length;const u=l.value[v];(m=u==null?void 0:u.onDismiss)==null||m.call(u),n==null||n(),s==null||s(),p()};return k(t,h),k(l,()=>h(t.value,t.value)),p(),{currentStepIndex:t,currentStep:$(()=>l.value[t.value]),sequence:l,nextStep:()=>t.value++,previousStep:()=>t.value--,endTutorial:()=>t.value=l.value.length,restartTutorial:()=>t.value=0,isTutorialOver:$(()=>t.value>=l.value.length)}},Te=e=>{const{highlightElement:o}=e;if(!o)return()=>{};const{id:t,className:l}={id:typeof o=="string"?o:o.id,className:typeof o=="string"||!(o!=null&&o.className)?Ee:o.className};if(!t)return()=>{};const s=document.getElementById(t);if(!s)throw new Error(`element with id ${t} not found`);return s.classList.add(l),()=>s.classList.remove(l)},b={reset:"reset",draggable:"draggable",nodeAnchors:"node-anchors",edgeLabels:"edge-labels",edgeLabelsEditable:"edge-labels-editable",userEditable:"user-editable",edgeType:"edge-type",edgeWeight:"edge-weight",nodeSize:"node-size",storageKey:"storage-key",clearLocalStorage:"clear-local-storage",persistentGraphClone:"persistent-graph-clone",testRoom:"test-room",log:"log",bfsColorize:"toggle-bfs-colorize"},Ae=e=>({greeting:{hint:"Welcome to the graph editor tutorial",dismiss:"onClick"},goodbye:{hint:"Have fun editing graphs!",dismiss:"onTimeout",after:3e3},createNode:{hint:"Double click anywhere to add a node",dismiss:"onNodeAdded"},moveNode:{hint:"Drag a node to move it",dismiss:"onNodeDrop"},createEdge:{hint:"Create an edge by dragging an anchor onto another node",dismiss:"onEdgeAdded"},createUndirectedEdge:{hint:"Now create an undirected edge by toggling the edge type",highlightElement:b.edgeType,dismiss:{event:"onEdgeAdded",predicate:o=>o.type==="undirected"}},createSelfDirectedEdge:{hint:'You can even create self directed edges! Make sure you are in "directed" mode and drag an anchor inwards',highlightElement:b.edgeType,dismiss:{event:"onEdgeAdded",predicate:o=>o.to===o.from}},editEdgeWeight:{hint:"Edit the edge weight by clicking on it and typing a number",dismiss:"onEdgeLabelChange"},removeElement:Le(e)}),Le=e=>{let o=!1;const t=()=>o=!0,{setTheme:l,removeAllThemes:s}=Z(e,_e);return{hint:"Remove an edge or node by clicking on it and hitting backspace/delete",dismiss:{event:"onInterval",predicate:()=>o},onInit:()=>{o=!1,l("nodeAnchorColor",n=>n.label==="1"?be:pe),e.subscribe("onEdgeRemoved",t),e.subscribe("onNodeRemoved",t)},onDismiss:()=>{s(),e.unsubscribe("onEdgeRemoved",t),e.unsubscribe("onNodeRemoved",t)}}},Re=e=>{const{greeting:o,createNode:t,moveNode:l,createEdge:s,createUndirectedEdge:n,editEdgeWeight:d,removeElement:p,goodbye:h}=Ae(e);return[o,t,l,s,n,d,p,h]},Ne=e=>({basics:Re(e)}),Ve=e=>Se(e,Ne(e).basics),we=y({__name:"TutorialControls",props:{tutorial:{}},setup(e){return $(()=>`${e.tutorial.currentStepIndex.value+1} / ${e.tutorial.sequence.value.length}`),(o,t)=>(r(),i(V,null,[c("button",{onClick:t[0]||(t[0]=(...l)=>o.tutorial.previousStep&&o.tutorial.previousStep(...l)),class:R("bg-blue-600 text-white px-3 py-1 rounded-lg font-bold")},t[4]||(t[4]=[c("span",{class:"select-none"},"Previous Step",-1)])),c("button",{onClick:t[1]||(t[1]=(...l)=>o.tutorial.nextStep&&o.tutorial.nextStep(...l)),class:R("bg-blue-600 text-white px-3 py-1 rounded-lg font-bold")},t[5]||(t[5]=[c("span",{class:"select-none"},"Next Step",-1)])),c("button",{onClick:t[2]||(t[2]=(...l)=>o.tutorial.endTutorial&&o.tutorial.endTutorial(...l)),class:R("bg-blue-600 text-white px-3 py-1 rounded-lg font-bold")},t[6]||(t[6]=[c("span",{class:"select-none"},"End Tutorial",-1)])),c("button",{onClick:t[3]||(t[3]=(...l)=>o.tutorial.restartTutorial&&o.tutorial.restartTutorial(...l)),class:R("bg-blue-600 text-white px-3 py-1 rounded-lg font-bold")},t[7]||(t[7]=[c("span",{class:"select-none"},"Restart Tutorial",-1)]))],64))}}),ke={class:"text-3xl font-bold"},Q=300,xe=y({__name:"TutorialHint",props:{tutorial:{}},setup(e){const o=A(0),t=$(()=>{var n;return((n=e.tutorial.currentStep.value)==null?void 0:n.hint)??""}),l=A("");let s;return k(t,()=>{o.value=0,clearTimeout(s),s=setTimeout(()=>{l.value=t.value,o.value=1},Q+Ce)},{immediate:!0}),(n,d)=>(r(),i("div",{class:R(["transition-opacity",`duration-[${Q}ms]`,"select-none","text-center"]),style:ce({opacity:o.value})},[c("h1",ke,N(l.value),1)],6))}}),$e="product/search-visualizer",Ie=(e,o)=>{const t=A({}),l=A(o),{adjacencyList:s}=se(e),n=()=>{if(t.value={},!l.value||!s.value[l.value])return;let d=[l.value];const p=new Set(d);let h=0;for(;d.length>0;){const a=[];for(const v of d){t.value[v]=h;for(const u of s.value[v])p.has(u)||(p.add(u),a.push(u))}d=[],d.push(...a),h++}};return e.subscribe("onStructureChange",n),X(()=>e.unsubscribe("onStructureChange",n)),k(l,n),{bfsLevelRecord:ge(t),startNode:l}},Ue=[C.RED_600,C.ORANGE_600,C.YELLOW_600,C.GREEN_600,C.TEAL_600,C.BLUE_600,C.INDIGO_600,C.PURPLE_600],ze=e=>{var v;const o=A(!1),{setTheme:t,removeTheme:l}=Z(e,$e),{bfsLevelRecord:s,startNode:n}=Ie(e,(v=e.nodes.value[0])==null?void 0:v.id),d=()=>{if(n.value===void 0){const[m]=e.nodes.value;m&&(n.value=m.id)}if(!e.nodes.value.find(m=>m.id===n.value)){const[m]=e.nodes.value;n.value=m?m.id:void 0}},p=u=>{if(e.isHighlighted(u.id))return;const m=s.value[u.id];if(m===void 0)return;const S=Ue;return S[m%S.length]},h=()=>{t("nodeBorderColor",p),t("nodeAnchorColor",p),o.value=!0},a=()=>{l("nodeBorderColor"),l("nodeAnchorColor"),o.value=!1};return k(o,()=>{o.value?h():a()}),e.subscribe("onNodeRemoved",d),e.subscribe("onNodeAdded",d),X(()=>{e.unsubscribe("onNodeRemoved",d),e.unsubscribe("onNodeAdded",d)}),{isColorized:o,colorize:h,decolorize:a,toggleColorize:()=>o.value=!o.value,bfsLevelRecord:s,startNode:n}},O=e=>e.charAt(0).toUpperCase()+e.slice(1),ee=e=>{const o=e.replace(/([A-Z])/g," $1");return O(o)},De=e=>{const o={label:()=>"Reset",action:()=>e.reset(),color:()=>"red",id:b.reset},t={label:()=>e.settings.value.draggable?"Draggable":"Not Draggable",action:()=>e.settings.value.draggable=!e.settings.value.draggable,color:()=>e.settings.value.draggable?"green":"orange",id:b.draggable},l={label:()=>e.settings.value.nodeAnchors?"Anchors":"No Anchors",action:()=>e.settings.value.nodeAnchors=!e.settings.value.nodeAnchors,color:()=>e.settings.value.nodeAnchors?"green":"orange",id:b.nodeAnchors},s={label:()=>e.settings.value.displayEdgeLabels?"Edge Labels":"No Edge Labels",action:()=>e.settings.value.displayEdgeLabels=!e.settings.value.displayEdgeLabels,color:()=>e.settings.value.displayEdgeLabels?"green":"orange",id:b.edgeLabels},n={label:()=>e.settings.value.edgeLabelsEditable?"Edge Labels Editable":"Edge Labels Not Editable",action:()=>e.settings.value.edgeLabelsEditable=!e.settings.value.edgeLabelsEditable,color:()=>e.settings.value.edgeLabelsEditable?"green":"orange",id:b.edgeLabelsEditable},d={label:()=>e.settings.value.userEditable?"Editable":"Not Editable",action:()=>e.settings.value.userEditable=!e.settings.value.userEditable,color:()=>e.settings.value.userEditable?"green":"orange",id:b.userEditable},p={cond:()=>!!e.settings.value.userEditable,label:()=>O(e.settings.value.userEditableAddedEdgeType),action:()=>{e.settings.value.userEditableAddedEdgeType==="directed"?e.settings.value.userEditableAddedEdgeType="undirected":e.settings.value.userEditableAddedEdgeType="directed"},color:()=>{const{userEditableAddedEdgeType:f}=e.settings.value;return f==="directed"?"blue":"purple"},id:b.edgeType},h={cond:()=>!!e.settings.value.userEditable,label:()=>{const{userEditableAddedEdgeLabel:f}=e.settings.value;return`Change Added Edge Weight (${f})`},action:()=>{e.settings.value.userEditableAddedEdgeLabel=q(1,10).toString()},color:()=>"green",id:b.edgeWeight},a={label:()=>`Change Node Size (${e.theme.value.nodeSize})`,action:()=>e.theme.value.nodeSize=q(20,50),color:()=>"pink",id:b.nodeSize},v={label:()=>{const{persistentStorageKey:f}=e.settings.value;return`Change Storage Key (${f})`},action:()=>{const{persistentStorageKey:f}=e.settings.value,_=f==="graph"?"graph2":"graph";e.settings.value.persistentStorageKey=_},color:()=>"blue",id:b.storageKey},u={label:()=>"Clear Local Storage",action:()=>localStorage.clear(),color:()=>"red",id:b.clearLocalStorage},m={label:()=>"Clone Search Visualizer Graph",action:()=>{e.settings.value.persistentStorageKey="search-visualizer-graph"},color:()=>"amber",id:b.persistentGraphClone},S={label:()=>{const{collaborativeRoomId:f,collaboratorCount:_,inCollaborativeRoom:w}=e,D=`Leave ${f.value} Room (${_.value+1} In Room)`;return w.value?D:"Join Test Room"},action:()=>{const f=F(ne),_=F(ae);e.meAsACollaborator.value.name=f,e.meAsACollaborator.value.color=_;const{joinCollaborativeRoom:w,leaveCollaborativeRoom:D,inCollaborativeRoom:W}=e;W.value?D():w("Test")},color:()=>e.inCollaborativeRoom.value?"red":"green",id:b.testRoom},x={label:()=>"Log",action:()=>{console.log(JSON.stringify(e.collaborators.value,null,2)),console.log(JSON.stringify(e.collaboratorCount.value,null,2)),console.log(JSON.stringify(e.meAsACollaborator.value,null,2))},color:()=>"blue",id:b.log},{toggleColorize:z,isColorized:M,startNode:te}=ze(e),P={reset:o,clearLocalStorage:u,changeNodeSize:a,toggleEdgeLabelDisplay:s,toggleEdgeLabelsEditable:n,toggleDraggable:t,toggleNodeAnchors:l,toggleUserEditable:d,toggleEdgeType:p,changeEdgeWeight:h,changeStorageKey:v,persistentGraphClone:m,toggleTestRoom:S,bfsColorize:{label:()=>{const f="Colorize",_=e.getNode(te.value),w=`Stop Colorizing (${_==null?void 0:_.label})`;return M.value?w:f},color:()=>M.value?"red":"pink",action:z,id:"toggle-bfs-colorize"},log:x},le=Object.values(P);return{...P,btnArr:le}},Be=["onClick","id"],Ge={class:"select-none"},Oe=y({__name:"GraphBtns",props:{btns:{}},setup(e){const o=t=>t?t():!0;return(t,l)=>(r(!0),i(V,null,U(t.btns,s=>(r(),i("div",null,[o(s.cond)?(r(),i("button",{key:0,onClick:me(s.action,["stop"]),class:R(`bg-${s.color()}-600 text-white px-3 py-1 rounded-lg font-bold`),id:s.id},[c("span",Ge,N(s.label()),1)],10,Be)):L("",!0)]))),256))}}),I=y({__name:"InputText",props:{modelValue:{},modelModifiers:{}},emits:["update:modelValue"],setup(e){const o=B(e,"modelValue");return(t,l)=>G((r(),i("input",{"onUpdate:modelValue":l[0]||(l[0]=s=>o.value=s),type:"text",class:"p-1 border border-gray-300 rounded-md"},null,512)),[[K,o.value]])}}),H=y({__name:"InputColor",props:{modelValue:{},modelModifiers:{}},emits:["update:modelValue"],setup(e){const o=B(e,"modelValue");return(t,l)=>G((r(),i("input",{"onUpdate:modelValue":l[0]||(l[0]=s=>o.value=s),type:"color",class:R("p-1 w-10 h-full rounded-md appearance-none")},null,512)),[[K,o.value]])}}),He=y({__name:"CollabControls",props:{graph:{}},setup(e){const o=A("graph-playground");return(t,l)=>(r(),i(V,null,[E(I,{modelValue:t.graph.meAsACollaborator.value.name,"onUpdate:modelValue":l[0]||(l[0]=s=>t.graph.meAsACollaborator.value.name=s),disabled:t.graph.inCollaborativeRoom.value,placeholder:"Your Name"},null,8,["modelValue","disabled"]),E(H,{modelValue:t.graph.meAsACollaborator.value.color,"onUpdate:modelValue":l[1]||(l[1]=s=>t.graph.meAsACollaborator.value.color=s),disabled:t.graph.inCollaborativeRoom.value},null,8,["modelValue","disabled"]),E(I,{modelValue:o.value,"onUpdate:modelValue":l[2]||(l[2]=s=>o.value=s),disabled:t.graph.inCollaborativeRoom.value,placeholder:"Collaborative Room ID"},null,8,["modelValue","disabled"]),t.graph.inCollaborativeRoom.value?(r(),T(Y,{key:1,onClick:l[4]||(l[4]=s=>t.graph.leaveCollaborativeRoom()),color:g(C).RED_500,textColor:g(C).WHITE},{default:j(()=>l[6]||(l[6]=[J(" Leave Room ")])),_:1},8,["color","textColor"])):(r(),T(Y,{key:0,onClick:l[3]||(l[3]=s=>t.graph.joinCollaborativeRoom(o.value))},{default:j(()=>l[5]||(l[5]=[J(" Join Room ")])),_:1}))],64))}}),Me={class:"my-2 px-4"},Pe={class:"text-white mb-2"},We={class:"font-bold text-lg"},Fe={class:"text-md"},je={key:3,class:"text-red-500 font-bold"},Je=y({__name:"ThemeControls",props:{graph:{}},setup(e){return(o,t)=>(r(!0),i(V,null,U(o.graph.theme.value,(l,s)=>(r(),i("div",Me,[c("div",Pe,[c("h3",We,N(g(ee)(s)),1),c("h4",Fe,N(l),1)]),typeof l=="string"&&s.toLowerCase().includes("color")?(r(),T(H,{key:0,modelValue:o.graph.theme.value[s],"onUpdate:modelValue":n=>o.graph.theme.value[s]=n,style:{width:"100px",height:"30px"}},null,8,["modelValue","onUpdate:modelValue"])):typeof l=="string"?(r(),T(I,{key:1,modelValue:o.graph.theme.value[s],"onUpdate:modelValue":n=>o.graph.theme.value[s]=n},null,8,["modelValue","onUpdate:modelValue"])):typeof l=="number"?(r(),T(fe,{key:2,modelValue:o.graph.theme.value[s],"onUpdate:modelValue":n=>o.graph.theme.value[s]=n,style:{width:"100%"},min:0,max:100},null,8,["modelValue","onUpdate:modelValue"])):(r(),i("h5",je," Not Supported "))]))),256))}}),oe=y({__name:"InputCheckbox",props:{modelValue:{type:Boolean},modelModifiers:{}},emits:["update:modelValue"],setup(e){const o=B(e,"modelValue");return(t,l)=>G((r(),i("input",{"onUpdate:modelValue":l[0]||(l[0]=s=>o.value=s),type:"checkbox"},null,512)),[[ve,o.value]])}}),qe=["onClick"],Ye={class:"text-white font-bold"},Qe=y({__name:"GraphPlaygroundControls",props:{playgroundControls:{}},setup(e){return(o,t)=>(r(!0),i(V,null,U(o.playgroundControls,(l,s)=>(r(),i("div",{class:"flex gap-3 items-center pl-3 py-2 hover:bg-gray-800 cursor-pointer",onClick:n=>o.playgroundControls[s]=!o.playgroundControls[s]},[E(oe,{modelValue:o.playgroundControls[s],"onUpdate:modelValue":n=>o.playgroundControls[s]=n,class:"h-6 w-6 rounded-xl cursor-pointer"},null,8,["modelValue","onUpdate:modelValue"]),c("h2",Ye,N(g(O)(s)),1)],8,qe))),256))}}),Ze={class:"my-2 px-4"},Xe={class:"text-white mb-2"},Ke={class:"font-bold text-lg"},eo={class:"text-md"},oo={key:3,class:"text-red-500 font-bold"},to=y({__name:"SettingsControls",props:{graph:{}},setup(e){return(o,t)=>(r(!0),i(V,null,U(o.graph.settings.value,(l,s)=>(r(),i("div",Ze,[c("div",Xe,[c("h3",Ke,N(g(ee)(s)),1),c("h4",eo,N(l),1)]),typeof l=="string"&&s.toLowerCase().includes("color")?(r(),T(H,{key:0,modelValue:o.graph.settings.value[s],"onUpdate:modelValue":n=>o.graph.settings.value[s]=n,style:{width:"100px",height:"30px"}},null,8,["modelValue","onUpdate:modelValue"])):typeof l=="string"?(r(),T(I,{key:1,modelValue:o.graph.settings.value[s],"onUpdate:modelValue":n=>o.graph.settings.value[s]=n},null,8,["modelValue","onUpdate:modelValue"])):typeof l=="boolean"?(r(),T(oe,{key:2,modelValue:o.graph.settings.value[s],"onUpdate:modelValue":n=>o.graph.settings.value[s]=n,class:"h-6 w-6 rounded-xl cursor-pointer"},null,8,["modelValue","onUpdate:modelValue"])):(r(),i("h5",oo," Not Supported "))]))),256))}}),lo={class:"relative w-full h-full"},so={class:"w-full h-full absolute"},no={key:0,class:"absolute flex gap-2 m-2 flex flex-wrap w-[85%]"},ao={key:1,class:"absolute bottom-0 right-0 flex gap-2 h-8 m-2"},ro={key:2,class:"bottom-0 absolute flex gap-2 m-2"},io={key:3,class:"absolute w-full dark:text-white bottom-[10%] grid place-items-center pointer-events-none"},uo={class:"absolute h-3/4 top-[100px] right-0"},co={key:0,class:"w-[325px] h-1/2 overflow-auto bg-gray-800 bg-opacity-80 rounded-l-xl mb-3"},go={key:1,class:"w-[325px] h-1/2 overflow-auto bg-gray-800 bg-opacity-80 rounded-l-xl"},mo={class:"absolute w-[150px] top-1/4 overflow-auto bg-gray-800 bg-opacity-80 rounded-r-xl"},Eo=y({__name:"GraphPlayground",setup(e){const o=A(),t=re(o,{settings:{edgeInputToLabel:d=>{if(de(d))return d;if(!isNaN(Number(d)))return d}}}),l=Ve(t),{btnArr:s}=De(t),n=he("graph-playground-controls",{tutorial:!0,theme:!0,settings:!0,collab:!0,buttons:!0});return(d,p)=>(r(),i("div",lo,[c("div",so,[E(ie,{onGraphRef:p[0]||(p[0]=h=>o.value=h),graph:g(t)},null,8,["graph"])]),g(n).buttons?(r(),i("div",no,[E(Oe,{btns:g(s)},null,8,["btns"])])):L("",!0),g(n).collab?(r(),i("div",ao,[E(He,{graph:g(t)},null,8,["graph"])])):L("",!0),g(n).tutorial?(r(),i("div",ro,[E(we,{tutorial:g(l)},null,8,["tutorial"])])):L("",!0),g(n).tutorial?(r(),i("div",io,[E(xe,{tutorial:g(l)},null,8,["tutorial"])])):L("",!0),c("div",uo,[g(n).theme?(r(),i("div",co,[E(Je,{graph:g(t)},null,8,["graph"])])):L("",!0),g(n).settings?(r(),i("div",go,[E(to,{graph:g(t)},null,8,["graph"])])):L("",!0)]),c("div",mo,[E(Qe,{playgroundControls:g(n)},null,8,["playgroundControls"])])]))}});export{Eo as default};