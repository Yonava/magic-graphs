import{u as F,g as P,C as X,a as K,b as ee,c as te,_ as oe,i as le}from"./Graph.vue_vue_type_script_setup_true_lang-C5zCb5_5.js";import{f as T,p as se,q as x,s as V,d as S,o as r,c as u,a as c,u as A,F as $,t as N,v as ne,x as W,y as ae,b as I,z as re,A as L,B as v,C as R,D as ie,E as de,G as ue,e as _}from"./index-Bp3RRWka.js";import{P as ce,R as ge,c as C,g as H,u as be}from"./ResponsiveCanvas.vue_vue_type_script_setup_true_lang-fStDz_tM.js";import{u as ve}from"./useAdjacencyList-DWlzQ4M7.js";import{_ as j,a as q,b as me}from"./CollabControls.vue_vue_type_script_setup_true_lang-C254fUbQ.js";import{_ as pe}from"./InputRange.vue_vue_type_script_setup_true_lang-D6xC2JTo.js";import"./Button.vue_vue_type_script_setup_true_lang-Xq58lCod.js";const he="element-highlight",fe=1e3,Ee=1e3,_e="tutorial",ye=(e,t)=>{const o=T(0),s=se(t);let l,n;const i=a=>{const{event:m,predicate:d}=typeof a.dismiss=="string"?{event:a.dismiss,predicate:()=>!0}:a.dismiss;if(m==="onInterval"){const y="interval"in a?a.interval:fe;let k=0;const U=setInterval(()=>{d(++k)&&o.value++},y);return()=>clearInterval(U)}const b=(...y)=>{(d==null?void 0:d(...y))&&o.value++};return e.subscribe(m,b),()=>e.unsubscribe(m,b)},g=()=>{var m,d;const a=s.value[o.value];if(a){if((m=a.onInit)==null||m.call(a),(d=a.precondition)!=null&&d.call(a,e)){o.value++;return}a!=null&&a.highlightElement&&(l=Ce(a)),n=i(a.dismiss!=="onTimeout"?a:{hint:a.hint,dismiss:"onInterval",interval:a.after})}},h=(a,m)=>{var b;if(a<0)return o.value=0;if(a>s.value.length)return o.value=s.value.length;const d=s.value[m];(b=d==null?void 0:d.onDismiss)==null||b.call(d),n==null||n(),l==null||l(),g()};return x(o,h),x(s,()=>h(o.value,o.value)),g(),{currentStepIndex:o,currentStep:V(()=>s.value[o.value]),sequence:s,nextStep:()=>o.value++,previousStep:()=>o.value--,endTutorial:()=>o.value=s.value.length,restartTutorial:()=>o.value=0,isTutorialOver:V(()=>o.value>=s.value.length)}},Ce=e=>{const{highlightElement:t}=e;if(!t)return()=>{};const{id:o,className:s}={id:typeof t=="string"?t:t.id,className:typeof t=="string"||!(t!=null&&t.className)?he:t.className};if(!o)return()=>{};const l=document.getElementById(o);if(!l)throw new Error(`element with id ${o} not found`);return l.classList.add(s),()=>l.classList.remove(s)},p={reset:"reset",draggable:"draggable",nodeAnchors:"node-anchors",edgeLabels:"edge-labels",edgeLabelsEditable:"edge-labels-editable",userEditable:"user-editable",edgeType:"edge-type",edgeWeight:"edge-weight",nodeSize:"node-size",storageKey:"storage-key",clearLocalStorage:"clear-local-storage",persistentGraphClone:"persistent-graph-clone",testRoom:"test-room",log:"log",bfsColorize:"toggle-bfs-colorize"},Se=e=>({greeting:{hint:"Welcome to the graph editor tutorial",dismiss:"onClick"},goodbye:{hint:"Have fun editing graphs!",dismiss:"onTimeout",after:3e3},createNode:{hint:"Double click anywhere to add a node",dismiss:"onNodeAdded"},moveNode:{hint:"Drag a node to move it",dismiss:"onNodeDrop"},createEdge:{hint:"Create an edge by dragging an anchor onto another node",dismiss:"onEdgeAdded"},createUndirectedEdge:{hint:"Now create an undirected edge by toggling the edge type",highlightElement:p.edgeType,dismiss:{event:"onEdgeAdded",predicate:t=>t.type==="undirected"}},createSelfDirectedEdge:{hint:'You can even create self directed edges! Make sure you are in "directed" mode and drag an anchor inwards',highlightElement:p.edgeType,dismiss:{event:"onEdgeAdded",predicate:t=>t.to===t.from}},editEdgeWeight:{hint:"Edit the edge weight by clicking on it and typing a number",dismiss:"onEdgeLabelChange"},removeElement:Le(e)}),Le=e=>{let t=!1;const o=()=>t=!0,{setTheme:s,removeAllThemes:l}=F(e,_e);return{hint:"Remove an edge or node by clicking on it and hitting backspace/delete",dismiss:{event:"onInterval",predicate:()=>t},onInit:()=>{t=!1,s("nodeAnchorColor",n=>n.label==="1"?ce:ge),e.subscribe("onEdgeRemoved",o),e.subscribe("onNodeRemoved",o)},onDismiss:()=>{l(),e.unsubscribe("onEdgeRemoved",o),e.unsubscribe("onNodeRemoved",o)}}},Te=e=>{const{greeting:t,createNode:o,moveNode:s,createEdge:l,createUndirectedEdge:n,editEdgeWeight:i,removeElement:g,goodbye:h}=Se(e);return[t,o,s,l,n,i,g,h]},Ne=e=>({basics:Te(e)}),Ae=e=>ye(e,Ne(e).basics),Re=S({__name:"TutorialControls",props:{tutorial:{}},setup(e){return V(()=>`${e.tutorial.currentStepIndex.value+1} / ${e.tutorial.sequence.value.length}`),(t,o)=>(r(),u($,null,[c("button",{onClick:o[0]||(o[0]=(...s)=>t.tutorial.previousStep&&t.tutorial.previousStep(...s)),class:A("bg-blue-600 text-white px-3 py-1 rounded-lg font-bold")},o[4]||(o[4]=[c("span",{class:"select-none"},"Previous Step",-1)])),c("button",{onClick:o[1]||(o[1]=(...s)=>t.tutorial.nextStep&&t.tutorial.nextStep(...s)),class:A("bg-blue-600 text-white px-3 py-1 rounded-lg font-bold")},o[5]||(o[5]=[c("span",{class:"select-none"},"Next Step",-1)])),c("button",{onClick:o[2]||(o[2]=(...s)=>t.tutorial.endTutorial&&t.tutorial.endTutorial(...s)),class:A("bg-blue-600 text-white px-3 py-1 rounded-lg font-bold")},o[6]||(o[6]=[c("span",{class:"select-none"},"End Tutorial",-1)])),c("button",{onClick:o[3]||(o[3]=(...s)=>t.tutorial.restartTutorial&&t.tutorial.restartTutorial(...s)),class:A("bg-blue-600 text-white px-3 py-1 rounded-lg font-bold")},o[7]||(o[7]=[c("span",{class:"select-none"},"Restart Tutorial",-1)]))],64))}}),we={class:"text-3xl font-bold"},M=300,xe=S({__name:"TutorialHint",props:{tutorial:{}},setup(e){const t=T(0),o=V(()=>{var n;return((n=e.tutorial.currentStep.value)==null?void 0:n.hint)??""}),s=T("");let l;return x(o,()=>{t.value=0,clearTimeout(l),l=setTimeout(()=>{s.value=o.value,t.value=1},M+Ee)},{immediate:!0}),(n,i)=>(r(),u("div",{class:A(["transition-opacity",`duration-[${M}ms]`,"select-none","text-center"]),style:ne({opacity:t.value})},[c("h1",we,N(s.value),1)],6))}}),$e="product/search-visualizer",ke=(e,t)=>{const o=T({}),s=T(t),{adjacencyList:l}=ve(e),n=()=>{if(o.value={},!s.value||!l.value[s.value])return;let i=[s.value];const g=new Set(i);let h=0;for(;i.length>0;){const a=[];for(const m of i){o.value[m]=h;for(const d of l.value[m])g.has(d)||(g.add(d),a.push(d))}i=[],i.push(...a),h++}};return e.subscribe("onStructureChange",n),W(()=>e.unsubscribe("onStructureChange",n)),x(s,n),{bfsLevelRecord:ae(o),startNode:s}},Ve=[C.RED_600,C.ORANGE_600,C.YELLOW_600,C.GREEN_600,C.TEAL_600,C.BLUE_600,C.INDIGO_600,C.PURPLE_600],Ie=e=>{var m;const t=T(!1),{setTheme:o,removeTheme:s}=F(e,$e),{bfsLevelRecord:l,startNode:n}=ke(e,(m=e.nodes.value[0])==null?void 0:m.id),i=()=>{if(n.value===void 0){const[b]=e.nodes.value;b&&(n.value=b.id)}if(!e.nodes.value.find(b=>b.id===n.value)){const[b]=e.nodes.value;n.value=b?b.id:void 0}},g=d=>{if(e.isHighlighted(d.id))return;const b=l.value[d.id];if(b===void 0)return;const y=Ve;return y[b%y.length]},h=()=>{o("nodeBorderColor",g),o("nodeAnchorColor",g),t.value=!0},a=()=>{s("nodeBorderColor"),s("nodeAnchorColor"),t.value=!1};return x(t,()=>{t.value?h():a()}),e.subscribe("onNodeRemoved",i),e.subscribe("onNodeAdded",i),W(()=>{e.unsubscribe("onNodeRemoved",i),e.unsubscribe("onNodeAdded",i)}),{isColorized:t,colorize:h,decolorize:a,toggleColorize:()=>t.value=!t.value,bfsLevelRecord:l,startNode:n}},D=e=>e.charAt(0).toUpperCase()+e.slice(1),J=e=>{const t=e.replace(/([A-Z])/g," $1");return D(t)},Ue=e=>{const t={label:()=>"Reset",action:()=>e.reset(),color:()=>"red",id:p.reset},o={label:()=>e.settings.value.draggable?"Draggable":"Not Draggable",action:()=>e.settings.value.draggable=!e.settings.value.draggable,color:()=>e.settings.value.draggable?"green":"orange",id:p.draggable},s={label:()=>e.settings.value.nodeAnchors?"Anchors":"No Anchors",action:()=>e.settings.value.nodeAnchors=!e.settings.value.nodeAnchors,color:()=>e.settings.value.nodeAnchors?"green":"orange",id:p.nodeAnchors},l={label:()=>e.settings.value.displayEdgeLabels?"Edge Labels":"No Edge Labels",action:()=>e.settings.value.displayEdgeLabels=!e.settings.value.displayEdgeLabels,color:()=>e.settings.value.displayEdgeLabels?"green":"orange",id:p.edgeLabels},n={label:()=>e.settings.value.edgeLabelsEditable?"Edge Labels Editable":"Edge Labels Not Editable",action:()=>e.settings.value.edgeLabelsEditable=!e.settings.value.edgeLabelsEditable,color:()=>e.settings.value.edgeLabelsEditable?"green":"orange",id:p.edgeLabelsEditable},i={label:()=>e.settings.value.userEditable?"Editable":"Not Editable",action:()=>e.settings.value.userEditable=!e.settings.value.userEditable,color:()=>e.settings.value.userEditable?"green":"orange",id:p.userEditable},g={cond:()=>!!e.settings.value.userEditable,label:()=>D(e.settings.value.userEditableAddedEdgeType),action:()=>{e.settings.value.userEditableAddedEdgeType==="directed"?e.settings.value.userEditableAddedEdgeType="undirected":e.settings.value.userEditableAddedEdgeType="directed"},color:()=>{const{userEditableAddedEdgeType:f}=e.settings.value;return f==="directed"?"blue":"purple"},id:p.edgeType},h={cond:()=>!!e.settings.value.userEditable,label:()=>{const{userEditableAddedEdgeLabel:f}=e.settings.value;return`Change Added Edge Weight (${f})`},action:()=>{e.settings.value.userEditableAddedEdgeLabel=H(1,10).toString()},color:()=>"green",id:p.edgeWeight},a={label:()=>`Change Node Size (${e.theme.value.nodeSize})`,action:()=>e.theme.value.nodeSize=H(20,50),color:()=>"pink",id:p.nodeSize},m={label:()=>{const{persistentStorageKey:f}=e.settings.value;return`Change Storage Key (${f})`},action:()=>{const{persistentStorageKey:f}=e.settings.value,E=f==="graph"?"graph2":"graph";e.settings.value.persistentStorageKey=E},color:()=>"blue",id:p.storageKey},d={label:()=>"Clear Local Storage",action:()=>localStorage.clear(),color:()=>"red",id:p.clearLocalStorage},b={label:()=>"Clone Search Visualizer Graph",action:()=>{e.settings.value.persistentStorageKey="search-visualizer-graph"},color:()=>"amber",id:p.persistentGraphClone},y={label:()=>{const{collaborativeRoomId:f,collaboratorCount:E,inCollaborativeRoom:w}=e,z=`Leave ${f.value} Room (${E.value+1} In Room)`;return w.value?z:"Join Test Room"},action:()=>{const f=P(X),E=P(K);e.meAsACollaborator.value.name=f,e.meAsACollaborator.value.color=E;const{joinCollaborativeRoom:w,leaveCollaborativeRoom:z,inCollaborativeRoom:O}=e;O.value?z():w("Test")},color:()=>e.inCollaborativeRoom.value?"red":"green",id:p.testRoom},k={label:()=>"Log",action:()=>{console.log(JSON.stringify(e.collaborators.value,null,2)),console.log(JSON.stringify(e.collaboratorCount.value,null,2)),console.log(JSON.stringify(e.meAsACollaborator.value,null,2))},color:()=>"blue",id:p.log},{toggleColorize:U,isColorized:B,startNode:Y}=Ie(e),G={reset:t,clearLocalStorage:d,changeNodeSize:a,toggleEdgeLabelDisplay:l,toggleEdgeLabelsEditable:n,toggleDraggable:o,toggleNodeAnchors:s,toggleUserEditable:i,toggleEdgeType:g,changeEdgeWeight:h,changeStorageKey:m,persistentGraphClone:b,toggleTestRoom:y,bfsColorize:{label:()=>{const f="Colorize",E=e.getNode(Y.value),w=`Stop Colorizing (${E==null?void 0:E.label})`;return B.value?w:f},color:()=>B.value?"red":"pink",action:U,id:"toggle-bfs-colorize"},log:k},Z=Object.values(G);return{...G,btnArr:Z}},ze=["onClick","id"],De={class:"select-none"},Be=S({__name:"GraphBtns",props:{btns:{}},setup(e){const t=o=>o?o():!0;return(o,s)=>(r(!0),u($,null,I(o.btns,l=>(r(),u("div",null,[t(l.cond)?(r(),u("button",{key:0,onClick:re(l.action,["stop"]),class:A(`bg-${l.color()}-600 text-white px-3 py-1 rounded-lg font-bold`),id:l.id},[c("span",De,N(l.label()),1)],10,ze)):L("",!0)]))),256))}}),Ge={class:"my-2 px-4"},Oe={class:"text-white mb-2"},Pe={class:"font-bold text-lg"},He={class:"text-md"},Me={key:3,class:"text-red-500 font-bold"},Fe=S({__name:"ThemeControls",props:{graph:{}},setup(e){return(t,o)=>(r(!0),u($,null,I(t.graph.theme.value,(s,l)=>(r(),u("div",Ge,[c("div",Oe,[c("h3",Pe,N(v(J)(l)),1),c("h4",He,N(s),1)]),typeof s=="string"&&l.toLowerCase().includes("color")?(r(),R(j,{key:0,modelValue:t.graph.theme.value[l],"onUpdate:modelValue":n=>t.graph.theme.value[l]=n,style:{width:"100px",height:"30px"}},null,8,["modelValue","onUpdate:modelValue"])):typeof s=="string"?(r(),R(q,{key:1,modelValue:t.graph.theme.value[l],"onUpdate:modelValue":n=>t.graph.theme.value[l]=n},null,8,["modelValue","onUpdate:modelValue"])):typeof s=="number"?(r(),R(pe,{key:2,modelValue:t.graph.theme.value[l],"onUpdate:modelValue":n=>t.graph.theme.value[l]=n,style:{width:"100%"},min:0,max:100},null,8,["modelValue","onUpdate:modelValue"])):(r(),u("h5",Me," Not Supported "))]))),256))}}),Q=S({__name:"InputCheckbox",props:{modelValue:{type:Boolean},modelModifiers:{}},emits:["update:modelValue"],setup(e){const t=ie(e,"modelValue");return(o,s)=>de((r(),u("input",{"onUpdate:modelValue":s[0]||(s[0]=l=>t.value=l),type:"checkbox"},null,512)),[[ue,t.value]])}}),We=["onClick"],je={class:"text-white font-bold"},qe=S({__name:"GraphPlaygroundControls",props:{playgroundControls:{}},setup(e){return(t,o)=>(r(!0),u($,null,I(t.playgroundControls,(s,l)=>(r(),u("div",{class:"flex gap-3 items-center pl-3 py-2 hover:bg-gray-800 cursor-pointer",onClick:n=>t.playgroundControls[l]=!t.playgroundControls[l]},[_(Q,{modelValue:t.playgroundControls[l],"onUpdate:modelValue":n=>t.playgroundControls[l]=n,class:"h-6 w-6 rounded-xl cursor-pointer"},null,8,["modelValue","onUpdate:modelValue"]),c("h2",je,N(v(D)(l)),1)],8,We))),256))}}),Je={class:"my-2 px-4"},Qe={class:"text-white mb-2"},Ye={class:"font-bold text-lg"},Ze={class:"text-md"},Xe={key:3,class:"text-red-500 font-bold"},Ke=S({__name:"SettingsControls",props:{graph:{}},setup(e){return(t,o)=>(r(!0),u($,null,I(t.graph.settings.value,(s,l)=>(r(),u("div",Je,[c("div",Qe,[c("h3",Ye,N(v(J)(l)),1),c("h4",Ze,N(s),1)]),typeof s=="string"&&l.toLowerCase().includes("color")?(r(),R(j,{key:0,modelValue:t.graph.settings.value[l],"onUpdate:modelValue":n=>t.graph.settings.value[l]=n,style:{width:"100px",height:"30px"}},null,8,["modelValue","onUpdate:modelValue"])):typeof s=="string"?(r(),R(q,{key:1,modelValue:t.graph.settings.value[l],"onUpdate:modelValue":n=>t.graph.settings.value[l]=n},null,8,["modelValue","onUpdate:modelValue"])):typeof s=="boolean"?(r(),R(Q,{key:2,modelValue:t.graph.settings.value[l],"onUpdate:modelValue":n=>t.graph.settings.value[l]=n,class:"h-6 w-6 rounded-xl cursor-pointer"},null,8,["modelValue","onUpdate:modelValue"])):(r(),u("h5",Xe," Not Supported "))]))),256))}}),et={class:"relative w-full h-full"},tt={class:"w-full h-full absolute"},ot={key:0,class:"absolute flex gap-2 m-2 flex flex-wrap w-[85%]"},lt={key:1,class:"absolute bottom-0 right-0 flex gap-2 h-8 m-2"},st={key:2,class:"bottom-0 absolute flex gap-2 m-2"},nt={key:3,class:"absolute w-full dark:text-white bottom-[10%] grid place-items-center pointer-events-none"},at={class:"absolute h-3/4 top-[100px] right-0"},rt={key:0,class:"w-[325px] h-1/2 overflow-auto bg-gray-800 bg-opacity-80 rounded-l-xl mb-3"},it={key:1,class:"w-[325px] h-1/2 overflow-auto bg-gray-800 bg-opacity-80 rounded-l-xl"},dt={class:"absolute w-[150px] top-1/4 overflow-auto bg-gray-800 bg-opacity-80 rounded-r-xl"},ft=S({__name:"GraphPlayground",setup(e){const t=T(),o=ee(t,{settings:{edgeInputToLabel:g=>{if(le(g))return g;if(!isNaN(Number(g)))return g}}}),s=te(o.nodes,"abc".split(""));o.settings.value.newNodeLabelGetter=s;const l=Ae(o),{btnArr:n}=Ue(o),i=be("graph-playground-controls",{tutorial:!0,theme:!0,settings:!0,collab:!0,buttons:!0});return(g,h)=>(r(),u("div",et,[c("div",tt,[_(oe,{onGraphRef:h[0]||(h[0]=a=>t.value=a),graph:v(o)},null,8,["graph"])]),v(i).buttons?(r(),u("div",ot,[_(Be,{btns:v(n)},null,8,["btns"])])):L("",!0),v(i).collab?(r(),u("div",lt,[_(me,{graph:v(o)},null,8,["graph"])])):L("",!0),v(i).tutorial?(r(),u("div",st,[_(Re,{tutorial:v(l)},null,8,["tutorial"])])):L("",!0),v(i).tutorial?(r(),u("div",nt,[_(xe,{tutorial:v(l)},null,8,["tutorial"])])):L("",!0),c("div",at,[v(i).theme?(r(),u("div",rt,[_(Fe,{graph:v(o)},null,8,["graph"])])):L("",!0),v(i).settings?(r(),u("div",it,[_(Ke,{graph:v(o)},null,8,["graph"])])):L("",!0)]),c("div",dt,[_(qe,{playgroundControls:v(i)},null,8,["playgroundControls"])])]))}});export{ft as default};