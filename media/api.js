var apiUrl="https://api.deadmau5archive.cc/api/",staticUrl="https://static.deadmau5archive.cc/",captchaRequired=!0,session=null,username=null,uuidstr=null,sessionLoaded=!1,captchaInitialized=0;function initCaptcha(e){if(2==captchaInitialized)e();else if(1==captchaInitialized)whenXthenY(()=>2==captchaInitialized,e);else{captchaInitialized=1;var t=document.createElement("script");t.onload=function(){captchaInitialized=2,e()},t.src="https://felixcaptcha.2n.cx/fc.js",document.head.appendChild(t)}}function escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var toTimestamp=e=>{var t,o,n,i=parseInt(e,10);return[Math.floor(i/3600)%24,Math.floor(i/60)%60,i%60].map(e=>e<10?"0"+e:e).join(":")};function load(e,t,o=null){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="json",n.onload=function(){200===n.status?t(n.response):null!=o&&o()},n.send()}function getCookie(e){let t=`; ${document.cookie}`,o=t.split(`; ${e}=`);return 2===o.length?o.pop().split(";").shift():null}function initSession(){if(null!==sessionStorage.getItem("welcomeMessage")){try{var e=JSON.parse(sessionStorage.getItem("welcomeMessage"));mkToast(e.message,e.color)}catch(t){}sessionStorage.removeItem("welcomeMessage")}var o=getCookie("d5a_session"),n=null;o&&"expired"!==o&&(n=o),null!==n?sessionVerify(n,e=>{e.auth&&(username=e.username,uuidstr=e.uuidstr,session=n,reloadUserState()),window.sessionLoaded=!0},()=>{window.sessionLoaded=!0}):window.sessionLoaded=!0}function waitforSession(e){window.setTimeout(function(){window.sessionLoaded?e():waitforSession(e)},50)}function login(){showLoginPane()}function logout(){localSessionDestroy(),sessionDestory(e=>{}),closeLoginPane(),sessionStorage.setItem("welcomeMessage",JSON.stringify({message:"logged out successfully. bye!",color:"0a0"})),location.reload()}function registerReloadUserStateCallback(e){reloadUserStateCallbacks.push(e)}function reloadUserState(){if(document.getElementById("username").innerHTML=session?"<i>"+username+"</i>":"Login",sessionLoaded)for(cb of reloadUserStateCallbacks)cb()}function localSessionDestroy(){username=null,uuidstr=null,session=null,document.cookie="d5a_session=expired; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"}function localSessionCreate(e,t=null){var o="";null!==t&&(t=parseInt(t),o="expires="+new Date(1e3*t).toUTCString()+"; "),document.cookie="d5a_session="+e+"; "+o+"path=/"}function closeLoginPane(e=!1){document.getElementById("loginPane").outerHTML="",null!=quickLoginInterval&&(clearInterval(quickLoginInterval),quickLoginInterval=null),null!=loginPaneCallback&&(loginPaneCallback(e),loginPaneCallback=null)}function btnFormLogin(){var e=document.getElementById("loginUsername").value.toLowerCase(),t=document.getElementById("loginPassword").value,o=document.getElementById("loginRemember").checked,n=null,i=document.getElementById("loginCaptcha"),a="1"==i.dataset.active,s=null;a&&(s=document.getElementById("loginCaptcha").dataset.widgetId,n=FelixCaptcha.getResponseCodeById(s)),e.length>0&&t.length>0?null==n&&a&&captchaRequired?mkToast("please complete the captcha","f55"):sessionCreate(e,t,o,n,t=>{if("logged_in"in t){if(t.logged_in)localSessionCreate(t.session.session_token,o?t.session.expires_at:null),closeLoginPane(!0),sessionStorage.setItem("welcomeMessage",JSON.stringify({message:"login successful! welcome, "+e,color:"0a0"})),location.reload();else if(null==n&&t.captcha_required){mkToast("please complete this captcha to verify that you're not a bot","888");var r=document.getElementById("btnLoginSubmit");r.disabled=!0,initCaptcha(()=>{s=FelixCaptcha.createWidget("loginCaptcha"),i.dataset.widgetId=s,i.dataset.active="1",i.style.marginTop="16px",r.disabled=!1})}else mkToast("login failed"+("reason"in t?": "+t.reason:""),"f55"),a&&FelixCaptcha.resetWidgetById(s),"clear_username"in t&&t.clear_username&&(document.getElementById("loginUsername").value=""),"clear_password"in t&&t.clear_password&&(document.getElementById("loginPassword").value=""),document.getElementById("loginUsername").focus()}}):mkToast("please enter a username and password","f55")}function btnFormRegister(){var e=document.getElementById("registerUsername").value.toLowerCase(),t=document.getElementById("registerPassword").value,o=document.getElementById("registerPassword2").value,n=document.getElementById("registerCaptcha").dataset.widgetId,i=FelixCaptcha.getResponseCodeById(n);e.length>0&&t.length>0&&o.length>0?o==t?null==i&&captchaRequired?mkToast("please complete the captcha","f55"):accountCreate(e,t,i,t=>{"created"in t&&(t.created?(localSessionCreate(t.session.session_token,null),closeLoginPane(!0),sessionStorage.setItem("welcomeMessage",JSON.stringify({message:"registered successfully! welcome, "+e,color:"0a0"})),location.reload()):mkToast("failed to create account"+("reason"in t?": "+t.reason:""),"f55"))}):mkToast("passwords do not match","f55"):mkToast("please fill out all fields","f55")}function mkToast(e,t="47f"){var o=document.createElement("div");o.innerHTML=escapeHtml(e),o.className="toast",o.style.background="#"+t,document.body.appendChild(o),setTimeout(()=>{o.outerHTML=""},5e3),o.addEventListener("click",e=>{o.outerHTML=""})}function openPane(){var e=document.createElement("div");return e.className="pane",e.id="loginPane",document.body.appendChild(e),e}function exportStuff(e,t,o,n){var i="";"M"==e?(c=function(e){for(var a in data2={},e){for(var s of(vObj=e[a],vObjListNew=[],vObj))console.log(s),(o||void 0!==window.username&&window.username==s.by)&&vObjListNew.push({name:s.text,offset:s.offset,color:s.color,user:s.by});vObjListNew.length>0&&(data2[a]=vObjListNew)}if("json"==n)i=JSON.stringify({all_videos:t,all_users:o,data:data2});else if("txt"==n)for(var a in i="MARKERS on "+(t?"all videos":"video "+vidId)+" by "+(o?"all users":window.username)+"\n",i+="==========================\n",data2)for(var s of(i+="\nvideo "+a+"\n",i+="------------------\n",data2[a]))i+="("+toTimestamp(s.offset)+") "+s.name+" -- by "+s.user+"\n";exportShow(i)},void 0===window.vidId&&(t=!0),data=t?getMarkers(c):getMarkersVideo(window.vidId,c)):"T"==e&&getCategories(e=>{c=function(o){for(var a in console.log(e),console.log(o),categories2={},o)for(var s of o[a]){var r=e[s];categories2[s]={name:r.text,color:r.color}}var l={video_tags:o,tag_list:categories2};if("json"==n)i=JSON.stringify({all_videos:t,data:l});else if("txt"==n)for(var a in i="TAGS on "+(t?"all videos":"video "+vidId)+"\n",i+="==========================\n",o)for(var s of(i+="\nvideo "+a+"\n",i+="------------------\n",o[a]))i+=e[s].text+"\n";exportShow(i)},void 0===window.vidId&&(t=!0),data=t?getTags(c):getTagsVideo(window.vidId,c)})}function exportShow(e){document.getElementById("exportTf").value=e,document.getElementById("exportBox").style.display="block"}function whenXthenY(e,t,o=100,n=100){e()?t():n>1&&window.setTimeout(function(){whenXthenY(e,t,o,n-1)},o)}window.addEventListener("load",function(e){initSession()},!1),reloadUserStateCallbacks=[];var loginPaneCallback=null,quickLoginInterval=null;function showLoginPane(e=null,t=null){var o=openPane(),n=null!==session;null!=t&&(loginPaneCallback=t);var i=document.createElement("div");i.className="modal",i.id="loginModal";var a='<div class="modalTitle"><h3>'+(n?"User options":"Login")+'</h3></div><div class="modalX"><button onclick="closeLoginPane()">&nbsp;x&nbsp;</button></div>';if(a+='<div style="clear:both;"></div><br>',n){a+="<h4>Export</h4>";var s={M:"Markers",T:"Tags"},r={txt:"text",json:"json"},l=[!1,!0];for(var d of(void 0===window.vidId&&(l=[!0]),["M","T"]))for(var u of(a+="<hr>",a+="<b>"+s[d]+"</b><br>",l)){a+="<i>"+(u?"All videos":"This video")+"</i><br>";var p="T"==d?[!0]:[!1,!0];for(var g of p){for(var f of(a+=(g?"all":"my")+": ",["txt","json"]))a+="<button onclick=\"exportStuff('"+d+"',"+u+","+g+",'"+f+"')\">as "+r[f]+"</button> ";g||(a+="&mdash; ")}a+="<br>"}a+="<hr>",a+='<div style="display:none;" id="exportBox"><b>Export contents</b><br><i>copy/paste the text from this text field:</i><br><textarea style="width:100%;resize:none;" rows=5 id="exportTf"></textarea><hr></div>',a+="<br><br>",a+="<h4>Manage account connections</h4> <hr>",a+='<a href="/connect_discord" class="shade">Discord</a><br>',a+='<a href="/onedrive_verification" class="shade">OneDrive</a><br>',a+="<hr>",a+="<br><br>",a+='<a href="#!" onclick="logout()" class="shade" style="color:#f55;"><b>Logout</b></a>'}else e&&(a+='<div class="loginNote">'+e+"</div><br>"),a+='<div style="padding:10px;border:1px solid #888; border-radius:5px;">',a+='<input type="text" id="loginUsername" placeholder="username"></input><br>',a+='<input type="password" id="loginPassword" placeholder="password"></input><br>',a+='<label><input type="checkbox" id="loginRemember"></input> remember me</label><br>',a+='<div id="loginCaptcha" data-active="0"></div><br>',a+='<button onclick="btnFormLogin()" id="btnLoginSubmit">Login</button>',a+="</div><br>",a+='<div id="quickLoginContainer" style="display: none; padding:10px;border:1px solid #888; border-radius:5px;">',a+="<b>quickLogin</b> via discord<br>",a+='<input id="quickLoginCode" type="text" style="font-size:large;border:none;font-weight:bold;font-family:monospace;color:#ddd;background:#333;padding:6px;border-radius:5px;display:inline-block;" value="XXXX XXXX XXXX XXXX"></input> ',a+='<button onclick="copyQuickLoginCode()">copy</button> <br>',a+='<span style="opacity:0.6;font-size:smaller;">dm this code to <code style="font-size:medium;background:#333;">dm5abot#0804</code> which will automatically log you in. requires <a href="/connect_discord" class="shade">connected discord account</a></span>',a+="</div><br>",a+='&#8594; Don\'t have an account? <a href="#!" onclick="showRegisterForm()" class="shade">Register</a><br>',a+='&#8594; <a href="#!" onclick="forgotPassword()" class="shade" id="forgotPasswordLink">I forgot my password</a>';i.innerHTML=a,o.appendChild(i),n||(document.getElementById("loginUsername").focus(),quickLoginCreate(e=>{document.getElementById("quickLoginContainer").style.display="block";var t=e.code.toUpperCase().match(/.{1,4}/g).join(" ");document.getElementById("quickLoginCode").value=t,quickLoginInterval=setInterval(()=>{quickLoginCheck(e.code,e=>{e.success&&(localSessionCreate(e.session.session_token,null),closeLoginPane(!0),sessionStorage.setItem("welcomeMessage",JSON.stringify({message:"login successful! welcome, "+e.username,color:"0a0"})),location.reload())})},1e3)}))}function showRegisterForm(){var e='<div class="modalTitle"><h3>Register</h3></div><div class="modalX"><button onclick="closeLoginPane()">&nbsp;x&nbsp;</button></div>';e+='<div style="clear:both;"></div><br>',e+='<input type="text" id="registerUsername" placeholder="username"></input><br>',e+='<input type="password" id="registerPassword" placeholder="password"></input><br>',e+='<input type="password" id="registerPassword2" placeholder="repeat password"></input><br><br>',e+='<div id="registerCaptcha"></div><br>',e+='<button onclick="btnFormRegister()" disabled id="btnRegisterSubmit">Create account</button><br>',document.getElementById("loginModal").innerHTML=e,document.getElementById("registerUsername").focus(),initCaptcha(()=>{var e=FelixCaptcha.createWidget("registerCaptcha");document.getElementById("registerCaptcha").dataset.widgetId=e,document.getElementById("btnRegisterSubmit").disabled=!1})}function forgotPassword(){mkToast("please contact me on discord; there is no automatic password reset","000")}function sessionCreate(e,t,o,n,i){apiPost({t:"session_create"},{username:e,password:t,remember:o?1:0,captcha:n},i)}function sessionVerify(e,t,o=null){apiPost({t:"session_verify"},{auth_token:e},t,o)}function sessionDestory(e){apiGet({t:"session_destory"},e)}function accountCreate(e,t,o,n){apiPost({t:"account_create"},{username:e,password:t,captcha:o},n)}function markerCreate(e,t,o){if(!session)return!1;apiPost({t:"marker_create"},{video:e,text:t.name,color:t.color,offset:t.time,vsig:window.vSigValue},o)}function markerUpdate(e,t,o){if(!session)return!1;apiPost({t:"marker_update",i:e},{text:t.name,color:t.color,offset:t.time},o)}function markerDestory(e,t){apiGet({t:"marker_destroy",i:e},t)}function tagCreate(e,t,o){if(!session)return!1;apiPost({t:"tag_create"},{text:t.name,color:t.color},o)}function tagDestroy(e,t){apiGet({t:"tag_destroy",i:e},t)}function apiGet(e,t,o=null){apiRequest(e,null,t,o)}function apiPost(e,t,o,n=null){apiRequest(e,t,o,n)}function apiRequest(e,t,o,n=null){var i=apiUrl+"?"+obj2QueryString(e),a=new XMLHttpRequest;a.onreadystatechange=function(){if(4==a.readyState){if(200==a.status){var e=null;try{e=JSON.parse(a.responseText)}catch(t){console.error("invalid json"),null!==n&&n()}null!==e&&("status"in e?1==e.status?"data"in e?o(e.data):o(null):0==e.status&&"error"in e?(mkToast("ERROR: "+e.error,"f55"),null!==n&&n()):(console.error("invalid response"),null!==n&&n()):(console.error("no response status"),null!==n&&n()))}else null!==n&&n()}},a.open(t?"POST":"GET",i,!0),t&&(a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),t=obj2QueryString(t)),session&&a.setRequestHeader("Authorization","Bearer "+session),a.send(t)}function getMarkers(e){apiGet({t:"get_markers"},e)}function getMarkersVideo(e,t){apiGet({t:"get_markers",v:e},t)}function getCategories(e){apiGet({t:"list_tags"},e)}function setTagsVideo(e,t,o,n){apiGet({t:"tag_set",s:o?1:0,v:e,i:t,vsig:window.vSigValue},n)}function getTags(e){apiGet({t:"get_tags"},e)}function getTagsVideo(e,t){apiGet({t:"get_tags",v:e},t)}function obj2QueryString(e){var t=[];for(var o in e)e.hasOwnProperty(o)&&t.push(encodeURIComponent(o)+"="+encodeURIComponent(e[o]));return t.join("&")}function discordAccountGet(e){apiGet({t:"discord_connection",type:"get"},e)}function discordAccountConnect(e,t){apiGet({t:"discord_connection",type:"connect",token:e},t)}function discordAccountDisconnect(e){apiGet({t:"discord_connection",type:"disconnect"},e)}function discordAccountResync(e){apiGet({t:"discord_connection",type:"resync"},e)}function getVideoAccess(e,t){apiGet({t:"get_video",video_id:e},t)}function getFolderShareLink(e,t){apiGet({t:"get_folder_share_link",folder_name:e},t)}function getReverseVideo(e,t){apiGet({t:"route_video",ytid:e},t)}function getUserGroups(e){apiGet({t:"get_user_groups"},e)}function quickLoginCreate(e){apiGet({t:"quicklogin_create"},e)}function quickLoginCheck(e,t){apiGet({t:"quicklogin_check",code:e},t)}function onedriveVerificationCreate(e){apiGet({t:"onedrive_verification",type:"create"},e)}function onedriveVerificationGetCode(e){apiGet({t:"onedrive_verification",type:"get_code"},e)}function copyQuickLoginCode(){copyTextToClipboard(document.getElementById("quickLoginCode").value),mkToast("copied!")}function fallbackCopyTextToClipboard(e){var t=document.createElement("textarea");t.value=e,t.style.top="0",t.style.left="0",t.style.position="fixed",document.body.appendChild(t),t.focus(),t.select();try{var o=document.execCommand("copy");console.log("Fallback: Copying text command was "+(o?"successful":"unsuccessful"))}catch(n){console.error("Fallback: Oops, unable to copy",n)}document.body.removeChild(t)}function copyTextToClipboard(e){if(!navigator.clipboard){fallbackCopyTextToClipboard(e);return}navigator.clipboard.writeText(e).then(function(){console.log("Async: Copying to clipboard was successful!")},function(e){console.error("Async: Could not copy text: ",e)})}