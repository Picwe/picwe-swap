(self.webpackChunk=self.webpackChunk||[]).push([[278],{85108:function(e,n,t){"use strict";t.d(n,{Vd:function(){return l},lM:function(){return i}});var s=t(20009),a=t(30202),c=t(54727),r=t(85893),i="https://aptos.testnet.porto.movementlabs.xyz/v1",o=new s.S;function l(e){var n=e.children;return(0,r.jsx)(c.Ay,{autoConnect:!0,onError:function(e){console.log("error",e)},children:(0,r.jsx)(a.aH,{client:o,children:n})})}},2291:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return R}});var s=t(97857),a=t.n(s),c=t(15009),r=t.n(c),i=t(99289),o=t.n(i),l=t(5574),u=t.n(l),d=t(67294),m=t(85856),f=t(72585),x=t(257),v=t(55955),p=t(82841),h=t(90933);function g(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:8;if(!j(e)||!j(n))return"0";var s=new h.Z(e),a=new h.Z(n),c=s.multiply(a);return y(c.value,t)}function b(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:8;if(!j(e)||!j(n)||0===n)return"0";var s=new h.Z(e),a=new h.Z(n),c=s.divide(a);return y(c.value,t)}function j(e){return"number"==typeof e||"string"==typeof e||"bigint"==typeof e}function y(e,n){var t=parseFloat(e).toFixed(n);return 0===n?t:t.replace(/(\.\d*?[1-9])0+$/,"$1").replace(/\.0$/,"").replace(/\.0+$/,"")}var N=t(96486),k=t.n(N),w=t(55452),C=t(85108),A=new w.ScN({network:w.ZcK.CUSTOM,fullnode:C.lM}),S=new w.gZG(A),M=function(){var e=o()(r()().mark((function e(n,t){var s,a;return r()().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("transaction",n),e.next=3,t(n);case 3:return s=e.sent,console.log("response",s),e.next=7,S.waitForTransaction({transactionHash:s.hash});case 7:return a=e.sent,console.log("res",a),e.abrupt("return",a);case 10:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),O=function(){var e=o()(r()().mark((function e(n){var t,s,a,c;return r()().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.accountAddress,s=n.coinType,a=n.faMetadataAddress,e.next=3,S.getAccountCoinAmount({accountAddress:t,coinType:s,faMetadataAddress:a});case 3:return c=e.sent,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),T=t(54727),F=function(e){var n=e.toString();return n.includes("User rejected the request")?"User rejected the request":n.includes("Account not found")?"Account not found":n.includes("is already initialized as a coin")?"CoinType is already initialized as a coin":n.includes("Not enough coins to complete transaction")?"Not enough coins to complete transaction":n},I=t(96974),E=t(70856),Z=t(85893);function R(){var e=(0,I.bx)().setIsModalOpen,n=(0,T.Os)(),t=n.account,s=n.connected,c=(n.wallet,n.network,n.changeNetwork,n.connect,n.signAndSubmitTransaction),i=(0,d.useState)(0),l=u()(i,2),h=l[0],j=l[1],y=(0,d.useState)(0),N=u()(y,2),w=N[0],C=N[1],A=(0,d.useState)(0),S=u()(A,2),R=S[0],z=S[1],B=(0,d.useState)(!1),P=u()(B,2),_=P[0],U=(P[1],(0,d.useState)([])),W=u()(U,2),$=W[0],q=W[1],V=(0,d.useState)([]),H=u()(V,2),K=H[0],X=H[1],Y=(0,d.useState)([]),G=u()(Y,2),D=G[0],J=G[1],L=(0,d.useState)(!1),Q=u()(L,2),ee=Q[0],ne=Q[1],te=(0,d.useState)({}),se=u()(te,2),ae=se[0],ce=se[1],re=(0,d.useState)({}),ie=u()(re,2),oe=ie[0],le=ie[1],ue=(0,d.useState)(""),de=u()(ue,2),me=de[0],fe=de[1],xe=(0,E.tE)(E.Zc.Porto),ve=new E.W7({client:xe,network:E.Zc.Porto}),pe=(0,d.useState)({}),he=u()(pe,2),ge=he[0],be=he[1],je=(0,d.useState)(0),ye=u()(je,2),Ne=ye[0],ke=ye[1],we=(0,d.useState)(0),Ce=u()(we,2),Ae=Ce[0],Se=Ce[1],Me=(0,d.useState)(!1),Oe=u()(Me,2),Te=Oe[0],Fe=Oe[1];(0,d.useEffect)((function(){Ie(),Ee()}),[s,ae,oe]);var Ie=function(){var e=o()(r()().mark((function e(){var n,a;return r()().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s){e.next=2;break}return e.abrupt("return","0");case 2:if("FA"!=ae.type){e.next=9;break}return e.next=5,O({accountAddress:t.address,faMetadataAddress:ae.address});case 5:n=e.sent,ke(b(n,Math.pow(10,ae.decimal))),e.next=14;break;case 9:if(!ae.type){e.next=14;break}return e.next=12,O({accountAddress:t.address,coinType:ae.address});case 12:a=e.sent,ke(b(a,Math.pow(10,ae.decimal)));case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ee=function(){var e=o()(r()().mark((function e(){var n;return r()().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s){e.next=2;break}return e.abrupt("return","0");case 2:if(!ae.type){e.next=7;break}return e.next=5,O({accountAddress:t.address,faMetadataAddress:oe.address});case 5:n=e.sent,Se(b(n,Math.pow(10,oe.decimal)));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ze=function(e){j(e),C(0),z(0),be({}),ce(0==e?K[0]:$[0])},Re=function(){var e=o()(r()().mark((function e(n){var t;return r()().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Fe(!0),C(n),console.log(ae.address),console.log(oe.address),console.log(BigInt(g(n,Math.pow(10,ae.decimal)))),e.next=7,ve.getRouting(ae.address,oe.address,BigInt(g(n,Math.pow(10,ae.decimal))));case 7:t=e.sent,console.log("routeInfo",t),be(t),z(b(t.amount_out,Math.pow(10,oe.decimal))),Fe(!1);case 12:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),ze=(0,d.useCallback)(k().debounce(Re,200),[C,ae,oe]);(0,d.useEffect)((function(){Be()}),[]);var Be=function(){var e=o()(r()().mark((function e(){var n,t,s,c;return r()().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ve.getFungibleAssets();case 2:return n=e.sent,t=n.map((function(e){return a()(a()({},e),{},{address:e.address.toString(),type:"FA"})})),q(t),console.log("Available FA tokens:",t),e.next=8,ve.getCoins();case 8:s=e.sent,c=s.map((function(e){return a()(a()({},e),{},{address:e.type_,type:e.type_.includes("0x1::aptos_coin::AptosCoin")?"MOVE":"COIN"})})),X(c),ce(c[0]),le(t[0]),console.log("Available Coin tokens:",c);case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Pe=function(e){"pay"==e&&J(0==h?K:$),"receic"==e&&J($),fe(e),ne(!0)},_e=function(){var e=o()(r()().mark((function e(){var n,t;return r()().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,ve.swapWithRouting(ge,5);case 3:return n=e.sent,console.log("txnPayload",n),t={data:n},e.next=8,M(t,c);case 8:e.sent,m.sX.success("swap success",3e3),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),m.sX.error(F(e.t0),3e3);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}();return(0,Z.jsxs)("div",{className:"swap-wrap primary-font",children:[(0,Z.jsxs)("div",{className:"d-flex",children:[(0,Z.jsx)("div",{className:"pipi-img bg-center"}),(0,Z.jsxs)("div",{className:"page-content",children:[(0,Z.jsx)("div",{className:"page-title primary-font-black white-shadow-text",children:"PicWe swap"}),(0,Z.jsxs)("div",{className:"flex-center",children:[(0,Z.jsxs)("div",{className:"common-card",children:[(0,Z.jsx)("div",{className:"card-title primary-font-black",children:"Coin Token"}),(0,Z.jsx)("div",{className:"text",children:"Native coins on Movement, including MOvE and other coins"})]}),(0,Z.jsxs)("div",{className:"common-card c-2",children:[(0,Z.jsx)("div",{className:"card-title primary-font-black",children:"FA Token"}),(0,Z.jsx)("div",{className:"text",children:"Fungible Asset tokens on Aptos, similar to ERC-20 tokens on Ethereum"})]})]}),(0,Z.jsxs)("div",{className:"form-box",children:[(0,Z.jsxs)("div",{className:"flex-center tabs justify-content-start primary-font-black",children:[(0,Z.jsx)("div",{className:"tab-item ".concat(0==h&&"active"),onClick:function(){Ze(0)},children:"COIN"}),(0,Z.jsx)("div",{className:"tab-item ".concat(1==h&&"active"),onClick:function(){Ze(1)},children:"FA"})]}),(0,Z.jsxs)("div",{className:"position-relative",children:[(0,Z.jsxs)("div",{className:"action-box mb-12",children:[(0,Z.jsx)("div",{className:"primary-font-black action-box-title",children:"You pay"}),(0,Z.jsxs)("div",{className:"flex-center justify-content-start action-cell",children:[(0,Z.jsxs)("div",{className:"coin-select flex-center",onClick:function(){Pe("pay")},children:[(0,Z.jsx)("div",{className:"bg-center coin-img",style:{backgroundImage:"url(".concat(null==ae?void 0:ae.logo,")")}}),(0,Z.jsx)("div",{className:"coin-name",children:null==ae?void 0:ae.symbol})]}),(0,Z.jsx)("div",{className:"select-icon bg-center"}),(0,Z.jsx)(f.R,{onChange:function(e){return ze(e)},theme:"normal",className:"my-input flex-1 primary-font",value:w,align:"right"})]}),(0,Z.jsxs)("div",{className:"computed-num",children:["Balance: ",Ne]})]}),(0,Z.jsxs)("div",{className:"action-box mb-lg",children:[(0,Z.jsx)("div",{className:"primary-font-black action-box-title",children:"You receic"}),(0,Z.jsxs)("div",{className:"flex-center justify-content-start action-cell",children:[(0,Z.jsxs)("div",{className:"coin-select flex-center",onClick:function(){Pe("receic")},children:[(0,Z.jsx)("div",{className:"bg-center coin-img",style:{backgroundImage:"url(".concat(null==oe?void 0:oe.logo,")")}}),(0,Z.jsx)("div",{className:"coin-name",children:null==oe?void 0:oe.symbol})]}),(0,Z.jsx)("div",{className:"select-icon bg-center"}),Te?(0,Z.jsx)("div",{className:"flex-1 d-flex",style:{justifyContent:"flex-end"},children:(0,Z.jsx)(x.gb,{indicator:!0,loading:!0,preventScrollThrough:!0,showOverlay:!0})}):(0,Z.jsx)(f.R,{theme:"normal",className:"my-input flex-1 primary-font",value:R,align:"right",disabled:!0})]}),(0,Z.jsxs)("div",{className:"computed-num",children:["Balance: ",Ae]})]}),1==h&&(0,Z.jsx)("div",{className:"exchange-img bg-center position-absolute",onClick:function(){ce(oe),le(ae),C(0),z(0),be({})}})]}),(0,Z.jsxs)("div",{className:"route-box flex-center justify-content-start",children:[(0,Z.jsx)("div",{className:"text primary-font-black",children:"ROUTE"}),(0,Z.jsxs)("div",{className:"r-item flex-center flex-column",children:[(0,Z.jsx)("div",{className:"img bg-center rounded-circle",style:{backgroundImage:"url(".concat(ae.logo,")")}}),(0,Z.jsxs)("div",{className:"val",children:[w," ",ae.symbol]})]}),(0,Z.jsx)("div",{className:"next-arrow bg-center"}),Te?(0,Z.jsxs)("div",{className:"flex-center",children:[(0,Z.jsx)(x.gb,{indicator:!0,loading:!0,preventScrollThrough:!0,showOverlay:!0}),(0,Z.jsx)("div",{className:"next-arrow bg-center"})]}):ge.routers&&ge.routers.map((function(e){return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)("div",{className:"r-item flex-center flex-column",children:[(0,Z.jsx)("div",{className:"img bg-center rounded-circle",style:{backgroundImage:"url(".concat(e.logo,")")}}),(0,Z.jsx)("div",{className:"val",children:e.name})]}),(0,Z.jsx)("div",{className:"next-arrow bg-center"})]})})),(0,Z.jsxs)("div",{className:"r-item flex-center flex-column",children:[(0,Z.jsx)("div",{className:"img bg-center rounded-circle",style:{backgroundImage:"url(".concat(oe.logo,")")}}),(0,Z.jsxs)("div",{className:"val",children:[b(ge.amount_out,Math.pow(10,oe.decimal))," ",oe.symbol]})]})]}),s?(0,Z.jsx)(v.z,{className:"primary-btn mr-lg primary-font-black",block:!0,onClick:function(){_e()},loading:_||Te,children:"SWAP"}):(0,Z.jsx)(v.z,{className:"primary-btn mr-lg primary-font-black",block:!0,onClick:function(){e(!0)},loading:_,children:"CONNECT"})]})]})]}),(0,Z.jsx)(p.Vq,{closeBtn:!1,closeOnEscKeydown:!0,closeOnOverlayClick:!0,footer:!1,header:!1,mode:"modal",onClose:function(){ne(!1)},placement:"top",preventScrollThrough:!0,showOverlay:!0,theme:"default",visible:ee,className:"moveFun-modal",children:(0,Z.jsx)("div",{className:'modal-content primary-font"',children:D.map((function(e){return(0,Z.jsxs)("div",{className:"flex-center justify-content-start coin-item",onClick:function(){!function(e,n){console.log("item",e),"pay"==n&&ce(e),"receic"==n&&le(e),C(0),z(0),be({}),ne(!1)}(e,me)},children:[(0,Z.jsx)("div",{className:"coin-img bg-center",style:{backgroundImage:"url(".concat(e.logo,")")}}),(0,Z.jsx)("div",{className:"coin-name flex-1",children:e.symbol}),(0,Z.jsx)("div",{className:"text",children:"1"})]},e.address)}))})})]})}},55024:function(){}}]);