var apiUrl="https://dm5a.mau5cord.cc/api/",session=null,username=null,sessionLoaded=!1,hcaptchaSiteKey="df633e96-6d53-441f-9061-374d557e8a1e";function escapeHtml(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var toTimestamp=b=>{var a=parseInt(b,10),c=Math.floor(a/3600)%24,d=Math.floor(a/60)%60,e=a%60;return[c,d,e].map(a=>a<10?"0"+a:a).join(":")};function load(b,c,d=null){var a=new XMLHttpRequest;a.open("GET",b,!0),a.responseType="json",a.onload=function(){200===a.status?c(a.response):null!=d&&d()},a.send()}function getCookie(b){let c=`; ${document.cookie}`,a=c.split(`; ${b}=`);return 2===a.length?a.pop().split(";").shift():null}function initSession(){var b=getCookie("d5a_session");if(b&&"expired"!==b){var a=JSON.parse(atob(b));a&&"username"in a&&"sessionid"in a&&(username=a.username,session=a.sessionid,reloadUserState())}sessionLoaded=!0}function waitforSession(a){window.setTimeout(function(){window.sessionLoaded?a():waitforSession(a)},50)}function login(){showLoginPane()}function logout(){localSessionDestroy(),closeLoginPane(),mkToast("logged out successfully. bye!","0a0"),reloadUserState()}function registerReloadUserStateCallback(a){reloadUserStateCallbacks.push(a)}function reloadUserState(){if(document.getElementById("username").innerHTML=session?"<i>"+username+"</i>":"Login",sessionLoaded)for(cb of reloadUserStateCallbacks)cb()}function localSessionDestroy(){username=null,session=null,document.cookie="d5a_session=expired; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"}function localSessionCreate(c,d,e){var b="";if(e){var a=new Date,f=3650;a.setTime(a.getTime()+864e5*f),b="expires="+a.toUTCString()+"; "}document.cookie="d5a_session="+btoa(JSON.stringify({username:c,sessionid:d}))+"; "+b+"path=/",initSession()}function closeLoginPane(a=!1){document.getElementById("loginPane").outerHTML="",null!=loginPaneCallback&&(loginPaneCallback(a),loginPaneCallback=null)}function btnFormLogin(){var b=document.getElementById("loginUsername").value.toLowerCase(),c=document.getElementById("loginPassword").value,e=document.getElementById("loginRemember").checked,d=document.getElementById("loginCaptcha").dataset.widgetId,a=hcaptcha.getResponse(d);b.length>0&&c.length>0?null!=a&&""!=a&&a.length>0?sessionCreate(b,c,a,a=>{"logged_in"in a&&(a.logged_in?(localSessionCreate(b,a.session_id,e),closeLoginPane(!0),mkToast("login successful! welcome, "+b,"0a0")):mkToast("login failed"+("reason"in a?": "+a.reason:""),"f55"))}):mkToast("please complete the captcha","f55"):mkToast("please enter a username and password","f55")}function btnFormRegister(){var c=document.getElementById("registerUsername").value.toLowerCase(),b=document.getElementById("registerPassword").value,d=document.getElementById("registerPassword2").value,e=document.getElementById("registerCaptcha").dataset.widgetId,a=hcaptcha.getResponse(e);c.length>0&&b.length>0&&d.length>0?d==b?null!=a&&""!=a&&a.length>0?accountCreate(c,b,a,a=>{"created"in a&&(a.created?(localSessionCreate(c,a.session_id,!1),closeLoginPane(!0),mkToast("registered successfully! welcome, "+c,"0a0")):mkToast("failed to create account"+("reason"in a?": "+a.reason:""),"f55"))}):mkToast("please complete the captcha","f55"):mkToast("passwords do not match","f55"):mkToast("please fill out all fields","f55")}function mkToast(b,c="47f"){var a=document.createElement("div");a.innerHTML=escapeHtml(b),a.className="toast",a.style.background="#"+c,document.body.appendChild(a),setTimeout(()=>{a.outerHTML=""},5e3),a.addEventListener("click",b=>{a.outerHTML=""})}function openPane(){var a=document.createElement("div");return a.className="pane",a.id="loginPane",document.body.appendChild(a),a}function exportStuff(a,b,c,d){var e="";"M"==a?(c=function(g){for(var f in data2={},g){for(var a of(vObj=g[f],vObjListNew=[],vObj))console.log(a),(c|| void 0!==window.username&&window.username==a.by)&&vObjListNew.push({name:a.text,offset:a.offset,color:a.color,user:a.by});vObjListNew.length>0&&(data2[f]=vObjListNew)}if("json"==d)e=JSON.stringify({all_videos:b,all_users:c,data:data2});else if("txt"==d)for(var f in e="MARKERS on "+(b?"all videos":"video "+vidId)+" by "+(c?"all users":window.username)+"\n",e+="==========================\n",data2)for(var a of(e+="\nvideo "+f+"\n",e+="------------------\n",data2[f]))e+="("+toTimestamp(a.offset)+") "+a.name+" -- by "+a.user+"\n";exportShow(e)},void 0===window.vidId&&(b=!0),data=b?getMarkers(c):getMarkersVideo(window.vidId,c)):"T"==a&&getCategories(a=>{c=function(c){for(var f in console.log(a),console.log(c),categories2={},c)for(var g of c[f]){var h=a[g];categories2[g]={name:h.text,color:h.color}}var i={video_tags:c,tag_list:categories2};if("json"==d)e=JSON.stringify({all_videos:b,data:i});else if("txt"==d)for(var f in e="TAGS on "+(b?"all videos":"video "+vidId)+"\n",e+="==========================\n",c)for(var g of(e+="\nvideo "+f+"\n",e+="------------------\n",c[f]))e+=a[g].text+"\n";exportShow(e)},void 0===window.vidId&&(b=!0),data=b?getTags(c):getTagsVideo(window.vidId,c)})}function exportShow(a){document.getElementById("exportTf").value=a,document.getElementById("exportBox").style.display="block"}function whenAvailable(a,b){window.setTimeout(function(){window[a]?b():whenAvailable(a,b)},100)}window.addEventListener("load",function(a){initSession()},!1),reloadUserStateCallbacks=[];var loginPaneCallback=null;function showLoginPane(f=null,g=null){var k=openPane(),c=null!==session;null!=g&&(loginPaneCallback=g);var b=document.createElement("div");b.className="modal",b.id="loginModal";var a='<div class="modalTitle"><h3>'+(c?"User options":"Login")+'</h3></div><div class="modalX"><button onclick="closeLoginPane()">&nbsp;x&nbsp;</button></div>';if(a+='<div style="clear:both;"></div><br>',c){a+="<h4>Export</h4>";var l={M:"Markers",T:"Tags"},m={txt:"text",json:"json"},h=[!1,!0];for(var d of(void 0===window.vidId&&(h=[!0]),["M","T"]))for(var i of(a+="<hr>",a+="<b>"+l[d]+"</b><br>",h)){a+="<i>"+(i?"All videos":"This video")+"</i><br>";var n="T"==d?[!0]:[!1,!0];for(var e of n){for(var j of(a+=(e?"all":"my")+": ",["txt","json"]))a+="<button onclick=\"exportStuff('"+d+"',"+i+","+e+",'"+j+"')\">as "+m[j]+"</button> ";e||(a+="&mdash; ")}a+="<br>"}a+="<hr>",a+='<div style="display:none;" id="exportBox"><b>Export contents</b><br><i>copy/paste the text from this text field:</i><br><textarea style="width:100%;resize:none;" rows=5 id="exportTf"></textarea><hr></div>',a+="<br><br>",a+="<h4>Manage account connections</h4> <hr>",a+='<a href="/connect_discord" class="shade">Discord</a><br>',a+="<hr>",a+="<br><br>",a+='<a href="#!" onclick="logout()" class="shade" style="color:#f55;"><b>Logout</b></a>'}else f&&(a+='<div class="loginNote">'+f+"</div><br>"),a+='<input type="text" id="loginUsername" placeholder="username"></input><br>',a+='<input type="password" id="loginPassword" placeholder="password"></input><br>',a+='<label><input type="checkbox" id="loginRemember"></input> remember me</label><br><br>',a+='<div id="loginCaptcha"></div><br>',a+='<button onclick="btnFormLogin()" disabled id="btnLoginSubmit">Login</button><br><br>',a+='&#8594; Don\'t have an account? <a href="#!" onclick="showRegisterForm()" class="shade">Register</a><br>',a+='&#8594; <a href="#!" onclick="forgotPassword()" class="shade" id="forgotPasswordLink">I forgot my password</a>';b.innerHTML=a,k.appendChild(b),c||(document.getElementById("loginUsername").focus(),whenAvailable("hcaptcha",()=>{var a=hcaptcha.render("loginCaptcha",{sitekey:hcaptchaSiteKey,theme:"dark"});document.getElementById("loginCaptcha").dataset.widgetId=a,document.getElementById("btnLoginSubmit").disabled=!1}))}function showRegisterForm(){var a='<div class="modalTitle"><h3>Register</h3></div><div class="modalX"><button onclick="closeLoginPane()">&nbsp;x&nbsp;</button></div>';a+='<div style="clear:both;"></div><br>',a+='<input type="text" id="registerUsername" placeholder="username"></input><br>',a+='<input type="password" id="registerPassword" placeholder="password"></input><br>',a+='<input type="password" id="registerPassword2" placeholder="repeat password"></input><br><br>',a+='<div id="registerCaptcha"></div><br>',a+='<button onclick="btnFormRegister()" disabled id="btnRegisterSubmit">Create account</button><br>',document.getElementById("loginModal").innerHTML=a,document.getElementById("registerUsername").focus(),whenAvailable("hcaptcha",()=>{var a=hcaptcha.render("registerCaptcha",{sitekey:hcaptchaSiteKey,theme:"dark"});document.getElementById("registerCaptcha").dataset.widgetId=a,document.getElementById("btnRegisterSubmit").disabled=!1})}function forgotPassword(){mkToast("sucks to suck (message me on discord)","000")}function sessionCreate(a,b,c,d){apiPost({t:"session_create"},{username:a,password:b,captcha:c},d)}function accountCreate(a,b,c,d){apiPost({t:"account_create"},{username:a,password:b,captcha:c},d)}function markerCreate(b,a,c){if(!session)return!1;apiPost({t:"marker_create"},{video:b,text:a.name,color:a.color,offset:a.time,vsig:window.vSigValue},c)}function markerUpdate(b,a,c){if(!session)return!1;apiPost({t:"marker_update",i:b},{text:a.name,color:a.color,offset:a.time},c)}function markerDestory(a,b){apiGet({t:"marker_destroy",i:a},b)}function tagCreate(c,a,b){if(!session)return!1;apiPost({t:"tag_create"},{text:a.name,color:a.color},b)}function tagDestroy(a,b){apiGet({t:"tag_destroy",i:a},b)}function apiGet(a,b){apiRequest(a,null,b)}function apiPost(a,b,c){apiRequest(a,b,c)}function apiRequest(c,d,e){session&&(c.a=session);var b=apiUrl+"?"+obj2QueryString(c);console.info("[api] "+b);var a=new XMLHttpRequest;a.onreadystatechange=function(){if(4==a.readyState&&200==a.status){var b=JSON.parse(a.responseText);"status"in b?1==b.status?"data"in b?e(b.data):e(null):0==b.status&&"error"in b?mkToast("ERROR: "+b.error,"f55"):console.error("invalid response"):console.error("no response status")}},d?(a.open("POST",b,!0),a.setRequestHeader("Content-type","application/x-www-form-urlencoded"),a.send(obj2QueryString(d))):(a.open("GET",b,!0),a.send(null))}function getMarkers(a){apiGet({t:"get_markers"},a)}function getMarkersVideo(a,b){apiGet({t:"get_markers",v:a},b)}function getCategories(a){apiGet({t:"list_tags"},a)}function setTagsVideo(a,b,c,d){apiGet({t:"tag_set",s:c?1:0,v:a,i:b,vsig:window.vSigValue},d)}function getTags(a){apiGet({t:"get_tags"},a)}function getTagsVideo(a,b){apiGet({t:"get_tags",v:a},b)}function obj2QueryString(a){var c=[];for(var b in a)a.hasOwnProperty(b)&&c.push(encodeURIComponent(b)+"="+encodeURIComponent(a[b]));return c.join("&")}function discordAccountGet(a){apiGet({t:"discord_connection",type:"get"},a)}function discordAccountConnect(a,b){apiGet({t:"discord_connection",type:"connect",token:a},b)}function discordAccountDisconnect(a){apiGet({t:"discord_connection",type:"disconnect"},a)}function discordAccountResync(a){apiGet({t:"discord_connection",type:"resync"},a)}function getVideoAccess(a,b){apiGet({t:"get_video",video_id:a},b)}function getReverseVideo(a,b){apiGet({t:"route_video",ytid:a},b)}