(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,n,t){e.exports=t(41)},41:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(16),u=t.n(o),c=t(17),l=t(2),m=t(3),i=t.n(m),d="/api/persons",s=function(){return i.a.get(d).then(function(e){return e.data})},f=function(e){return i.a.post(d,e).then(function(e){return e.data})},g=function(e){return i.a.delete("".concat(d,"/").concat(e)).then(function(e){return e.data})},h=function(e,n){return i.a.put("".concat(d,"/").concat(e),n).then(function(e){return e.data})},p=function(e){var n=e.handleChange;return r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{onChange:n}))},b=function(e){var n=e.searchResults,t=e.removeItem;return r.a.createElement("div",null,n.map(function(e){return r.a.createElement("p",{key:e.id},e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return t(e.id)}},"delete"))}))},v=function(e){var n=e.addNewItem,t=e.newName,a=e.newNumber,o=e.handleNameChange,u=e.handleNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:o})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:a,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},y=function(e){var n=e.message;return null===n.msgType?null:"success"===n.msgType?r.a.createElement("div",{style:{color:"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"}},n.msg):"error"===n.msgType?r.a.createElement("div",{style:{color:"red",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"}},n.msg):void 0},E=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),m=Object(l.a)(u,2),i=m[0],d=m[1],E=Object(a.useState)(""),w=Object(l.a)(E,2),j=w[0],O=w[1],T=Object(a.useState)([]),C=Object(l.a)(T,2),N=C[0],S=C[1],k=Object(a.useState)({msg:null,msgType:null}),x=Object(l.a)(k,2),I=x[0],R=x[1];Object(a.useEffect)(function(){s().then(function(e){o(e)})},[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{handleChange:function(e){try{var n=t.filter(function(n){return n.name.toLowerCase().includes(e.target.value)});S(n)}catch(a){console.log("=== error App.js [165] === "+a)}}}),r.a.createElement(y,{message:I}),r.a.createElement("h3",null,"add a new"),r.a.createElement(v,{addNewItem:function(e){e.preventDefault();var n=t.map(function(e){return e.name}),a=t.find(function(e){return e.name===i});if(n.includes(i)&&window.confirm("".concat(i," is already in the phonebook, do you want to replace the old number with new one?"))){var r=Object(c.a)({},a,{number:j});h(a.id,r).then(function(e){o(t.map(function(n){return n.id!==a.id?n:e})),R({msg:"".concat(a.name," phone number updated"),msgType:"success"})}).catch(function(){R({msg:"Information of ".concat(i," has already removed from server"),msgType:"error"})})}else f({name:i,number:j}).then(function(e){o(t.concat(e)),R({msg:"".concat(e.name," added to the phonebook"),msgType:"success"})});setTimeout(function(){R({msg:null,msgType:null})},5e3),d(""),O("")},newName:i,newNumber:j,handleNameChange:function(e){d(e.target.value)},handleNumberChange:function(e){O(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(b,{searchResults:N,removeItem:function(e){var n=t.find(function(n){return n.id===e});window.confirm("Do you really want to delete "+n.name)&&(g(e).then().catch(function(){R({msg:"Information of ".concat(n.name," has already removed from server"),msgType:"error"})}),o(t.filter(function(n){return n.id!==e})),S([]),setTimeout(function(){R({msg:null,msgType:null})},5e3))}}))};u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))}},[[18,2,1]]]);
//# sourceMappingURL=main.ee748fbe.chunk.js.map