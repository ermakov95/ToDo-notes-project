!function(){var e,t={728:function(){function e(e,o){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,o){if(!e)return;if("string"==typeof e)return t(e,o);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return t(e,o)}(e))||o&&e&&"number"==typeof e.length){n&&(e=n);var a=0,r=function(){};return{s:r,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return l=e.done,e},e:function(e){s=!0,i=e},f:function(){try{l||null==n.return||n.return()}finally{if(s)throw i}}}}function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var o;o=localStorage.getItem("todo")?JSON.parse(localStorage.getItem("todo")):[[0,"Название заметки",[[!0,"Выполненный todo италиком"],[!1,"Невыполненный todo"],[!0,"Выполненный todo италиком"],[!1,"Невыполненный todo"]]],[1,"Название заметки",[[!1,"Lorem, ipsum dolor sit amet"],[!0,"Сonsectetur adipisicing elit"],[!1,"Autem veniam quam dolorem"]]],[3,"Заметка с длинным названием",[[!0,"Autem veniam quam dolorem"],[!1,"Lorem, ipsum dolor sit amet"],[!0,"Сonsectetur adipisicing elit"]]],[5,"Заметка с очень длинным названием",[[!1,"Сonsectetur adipisicing elit"],[!0,"Autem veniam quam dolorem"],[!1,"Lorem, ipsum dolor sit amet"]]],[6,"Название <span> заметки </span>",[[!1,"Lorem, ipsum <br> dolor sit amet"],[!0,"Сonsectetur adipisicing elit"],[!1,"Autem veniam quam dolorem"]]],[8,"Заметка с длинным названием",[[!0,"Autem veniam quam dolorem"],[!1,"Lorem, ipsum dolor sit amet"],[!0,"Сonsectetur adipisicing elit"]]],[9,"Заметка с очень длинным названием",[[!1,"Сonsectetur adipisicing elit"],[!0,"Autem veniam quam dolorem"],[!1,"Lorem, ipsum dolor sit amet"]]],[12,"<button> Заметка </button>",[[!1,"Lorem, ipsum dolor sit amet"],[!0,"Сonsectetur adipisicing elit"],[!1,"Autem veniam <br> quam dolorem"]]],[14,"Заметка с длинным названием",[[!0,"Autem veniam <br> quam dolorem"],[!1,"Lorem, ipsum dolor sit amet"],[!0,"Сonsectetur adipisicing elit"]]],[15,"Заметка с очень <br> длинным названием",[[!1,"Сonsectetur adipisicing elit"],[!0,"Autem veniam <br> quam dolorem"],[!1,"Lorem, ipsum dolor sit amet"]]]];var n=document.getElementsByClassName("note"),a=document.querySelector(".notes"),r=function(){var t,r=[],i=e(n);try{for(i.s();!(t=i.n()).done;)element=t.value,r.push(element.id)}catch(e){i.e(e)}finally{i.f()}var l,s=e(o);try{for(s.s();!(l=s.n()).done;)if(note=l.value,!0!==r.includes("".concat(note[0],"-note"))){var d=document.createElement("div");d.className="note",d.id="".concat(note[0],"-note");var c=document.createElement("div");c.className="note__title",c.append(note[1]);var u=document.createElement("div");u.className="note__text";var p,m=e(note[2]);try{for(m.s();!(p=m.n()).done;)if(todo=p.value,todo[0]){var f=document.createElement("span");f.className="it",f.append(todo[1]),u.append(f),u.insertAdjacentHTML("beforeend","<br>")}else u.append(todo[1]),u.insertAdjacentHTML("beforeend","<br>")}catch(e){m.e(e)}finally{m.f()}var v=document.createElement("button");v.className="note__delete",v.append("Х"),d.append(c),d.append(u),d.append(v),a.append(d)}}catch(e){s.e(e)}finally{s.f()}localStorage.setItem("todo",JSON.stringify(o))};r();var i,l,s=document.querySelector(".wrap"),d=(document.querySelector(".edit"),document.querySelector(".edit__info")),c=document.querySelector(".edit__title"),u=document.querySelector(".edit__todos"),p=(document.querySelector(".edit__add-todo"),document.getElementsByClassName("edit__todo")),m=document.querySelector(".popup"),f=document.querySelector(".popup-inner"),v=[],h=[],g="main",y="none",b=0,_=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"main",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,r=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,s=arguments.length>6&&void 0!==arguments[6]?arguments[6]:[],d=arguments.length>7&&void 0!==arguments[7]?arguments[7]:[];g=e,c.value=t,u.innerHTML=o,b=n,i=a,l=r,v=s,h=d};document.addEventListener("click",(function(t){if(t.target.closest(".new-note"))s.classList.remove("main-page"),s.classList.add("edit-page"),_("new");else if(t.target.closest(".note")&&!t.target.closest(".note__delete")){var a;s.classList.remove("main-page"),s.classList.add("edit-page"),i=+(i=t.target.closest(".it")||t.target.closest("br")?t.path[2].id:t.target.closest(".note__title")||t.target.closest(".note__text")?t.path[1].id:t.path[0].id).match(/\d+/),l=0;var L,A=e(o);try{for(A.s();!(L=A.n()).done;){if(note=L.value,i===+note[0]){a=note;break}l++}}catch(e){A.e(e)}finally{A.f()}b=0;var S,q="",j=e(a[2]);try{for(j.s();!(S=j.n()).done;)todo=S.value,q+='\n            <div id="'.concat(b,'-todo" class="edit__todo">\n                <input type="checkbox", ').concat(todo[0]?"checked":"",'>\n                <input type="text", placeholder="Название todo ').concat(b++,'", value="').concat(todo[1],'">\n                <button>X</button>\n            </div>')}catch(e){j.e(e)}finally{j.f()}_("old",a[1],q,b,i,l)}else if(t.target.closest(".edit__add-todo"))v.push(["add-todo",b]),u.insertAdjacentHTML("beforeend",'\n        <div id="'.concat(b,'-todo" class="edit__todo">\n            <input type="checkbox">\n            <input type="text", placeholder="Название todo ').concat(b++,'">\n            <button>X</button>\n        </div>'));else if(t.target.closest(".edit__todo button")){for(var E=0;E<t.path[2].children.length;E++)t.path[2].children[E]===t.path[1]&&v.push(["remove-todo",E,p[t.path[1].id]]);p[t.path[1].id].remove()}else if(t.target.closest(".save-note")){var k,N=[],O=e(p);try{for(O.s();!(k=O.n()).done;){todo=k.value;var w=todo.querySelectorAll("input");w[1].value&&N.push([w[0].checked,w[1].value])}}catch(e){O.e(e)}finally{O.f()}if(c.value&&N.length>0){if("new"===g)o.push([o[o.length-1][0]+1,c.value,N]);else if("old"===g){o[l]=[i,c.value,N];var x=n["".concat(i,"-note")];x.firstChild.innerHTML="",x.firstChild.append(c.value),x.childNodes[1].innerHTML="",N.forEach((function(e){if(e[0]){var t=document.createElement("span");t.className="it",t.append(e[1]),x.childNodes[1].append(t),x.childNodes[1].insertAdjacentHTML("beforeend","<br>")}else x.childNodes[1].append(e[1]),x.childNodes[1].insertAdjacentHTML("beforeend","<br>")}))}r(),s.classList.add("main-page"),s.classList.remove("edit-page"),d.style.display="none",_()}else d.style.display="block"}else if(t.target.closest(".cancel-note"))y="cancel",f.querySelectorAll("span")[0].style.display="block",m.classList.add("active"),f.classList.add("active");else if(t.target.closest(".delete-note")||t.target.closest(".note__delete"))y="delete",f.querySelectorAll("span")[1].style.display="block",m.classList.add("active"),f.classList.add("active"),t.target.closest(".note__delete")&&(i=+(i=t.path[1].id).match(/\d+/));else if(t.target.closest(".popup__no")||t.target.closest(".popup__exit")||t.target===m)y="none",m.classList.remove("active"),f.classList.remove("active"),f.querySelectorAll("span")[0].style.display="none",f.querySelectorAll("span")[1].style.display="none",i=null;else if(t.target.closest(".popup__yes")){if("delete"===y&&"old"===g)o.splice(l,1),n["".concat(i,"-note")].remove();else if("delete"===y&&"main"===g){n["".concat(i,"-note")].remove();for(var T=0;T<o.length;T++)if(o[T][0]===i){o.splice(T,1);break}}r(),y="none",m.classList.remove("active"),f.classList.remove("active"),f.querySelectorAll("span")[0].style.display="none",f.querySelectorAll("span")[1].style.display="none","main"!==g&&(s.classList.add("main-page"),s.classList.remove("edit-page")),d.style.display="none",_()}else if(t.target.closest(".edit__cancel")){var M=v.length;if(M>0){var H=v[M-1][1];"add-todo"===v[M-1][0]?(h.push(["remove-todo",H,p["".concat(H,"-todo")]]),p["".concat(H,"-todo")].remove(),v.pop()):"remove-todo"===v[M-1][0]&&(h.push(["add-todo",H]),0===H?u.insertAdjacentElement("afterbegin",v[M-1][2]):H>=p.length?u.insertAdjacentElement("beforeend",v[M-1][2]):p[H-1].insertAdjacentElement("afterend",v[M-1][2]),v.pop())}}else if(t.target.closest(".edit__repeat")){var C=h.length;if(C>0){var I=h[C-1][1];"add-todo"===h[C-1][0]?(v.push(["remove-todo",I,p["".concat(I,"-todo")]]),p["".concat(I,"-todo")].remove(),h.pop()):"remove-todo"===h[C-1][0]&&(v.push(["add-todo",I]),0===I?u.insertAdjacentElement("afterbegin",h[C-1][2]):I>=p.length?u.insertAdjacentElement("beforeend",h[C-1][2]):p[I-1].insertAdjacentElement("afterend",h[C-1][2]),h.pop())}}}))}},o={};function n(e){var a=o[e];if(void 0!==a)return a.exports;var r=o[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=function(t,o,a,r){if(!o){var i=1/0;for(c=0;c<e.length;c++){o=e[c][0],a=e[c][1],r=e[c][2];for(var l=!0,s=0;s<o.length;s++)(!1&r||i>=r)&&Object.keys(n.O).every((function(e){return n.O[e](o[s])}))?o.splice(s--,1):(l=!1,r<i&&(i=r));if(l){e.splice(c--,1);var d=a();void 0!==d&&(t=d)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[o,a,r]},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",function(){n.b=document.baseURI||self.location.href;var e={179:0};n.O.j=function(t){return 0===e[t]};var t=function(t,o){var a,r,i=o[0],l=o[1],s=o[2],d=0;if(i.some((function(t){return 0!==e[t]}))){for(a in l)n.o(l,a)&&(n.m[a]=l[a]);if(s)var c=s(n)}for(t&&t(o);d<i.length;d++)r=i[d],n.o(e,r)&&e[r]&&e[r][0](),e[i[d]]=0;return n.O(c)},o=self.webpackChunkToDo_notes_project=self.webpackChunkToDo_notes_project||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var a={};!function(){"use strict";n(728)}(),a=n.O(a)}();