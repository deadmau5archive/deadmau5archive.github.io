var chatElement,chatMessages,numChatMessages,messageIndex,badgeIndex=null,chatTimestampLink="?t=";function renderSingleMessage(e){content="<div>";var a=Math.floor(e.t)-chatOffset;return content+='<a class="timestamp" href="'+chatTimestampLink+a+'" onclick="return jumpTo('+a+');">'+toTimestamp(a)+"</a>&ensp;","twitch"==chatType?(void 0!=e.b&&null!=badgeIndex&&(void 0!=e.l&&0==e.l&&(content+='<img title="message was posted after live recording" alt="VOD" src="/media/vodBadge.png"> '),e.b.forEach(e=>{var a=badgeIndex[e.i][e.v];content+='<img title="'+a.title+'" alt="'+a.title+'" src="'+a.img+'"> '})),content+='<a target="_blank" href="https://www.twitch.tv/'+e.n.toLowerCase()+'" style="text-decoration: none; color:#'+(void 0!=e.s?e.s:"aaa")+';"><b>'+e.n+"</b></a>:&ensp;",e.c.forEach(e=>{void 0!=e.t?content+=escapeHtml(e.t):void 0!=e.e?content+='<img title="'+e.a+'" alt="'+e.a+'" src="https://static-cdn.jtvnw.net/emoticons/v1/'+e.e+'/1.0">':void 0!=e.m&&(content+='<a class="shade" target="_blank" href="https://www.twitch.tv/'+e.m.toLowerCase()+'">@'+e.m+"</a>")})):"mixer"==chatType&&("system"==e.e?content+='<span style="color:#aaa;">'+e.m+"</span>":"c"==e.e&&(content+='<a target="_blank" onclick="return false" href="https://mixer.com/'+e.u.toLowerCase()+'" style="text-decoration: none; color:#'+(void 0!=e.s?e.s:"37aad5")+';"><b>'+e.u+"</b></a>"+(void 0==e.a?"":' <span class="mxrUsrLvl">'+e.a+"</span>")+":&ensp;",e.c.forEach(e=>{if("t"==e.t)content+=e.m;else if("@"==e.t)content+='<a class="shade" target="_blank" onclick="return false" href="https://mixer.com/'+e.u.toLowerCase()+'">@'+e.u+"</a>";else if("e"==e.t){var a="";"builtin"==e.s?a="https://mixer.com/_latest/assets/emoticons/"+e.p+".png":"external"==e.s&&(a=e.p),content+='<div class="mxrEmote" alt="'+(void 0!=e.a?e.a:e.m)+'" style="background-image: url(\''+a+"'); background-position: -"+e.b[0]+"px -"+e.b[1]+"px; width: "+e.b[2]+"px; height: "+e.b[3]+'px;" title="'+e.m+'"></div>'}else"i"==e.t?content+='<img class="mxrImg" alt="'+e.m+'" title="'+e.m+'" src="'+e.i+'">':"a"==e.t&&(content+='<a class="shade" target="_blank" href="'+e.h+'">'+e.m+"</a>")}))),content+="</div>"}function jumpTo(e){return(console.log("seekTo: "+e),null!=player)?(player.seekTo(e),!1):null!=cplayer?(cplayer.skipTo(e),!1):null!=onedrivePlayerEmbed?(onedrivePlayerEmbed.src=onedriveGenerateEmbedLink(onedriveVideoObject,e),!1):void 0}var chatType="twitch";function displayChat(e,a,t,s,l=0){chatType=s,load(staticUrl+"comments/"+e+".txt",function(s){if(t&&(chatTimestampLink="/videos/"+e+"?t="),load("/data/badges.json",function(e){badgeIndex=e;var n=new URL(window.location.href).searchParams.get("vodchat"),r=!1;if(null!=n&&"1"==n&&(r=!0),!t&&r&&null!=document.getElementById("vodChatLbl")&&(document.getElementById("vodChatLbl").innerHTML='<i style="color: #666;">(VOD chat is enabled)</i>'),t)displayChatFull(a,s,r);else{chatElement=a,chatMessages=[];for(var o=0;o<s.length;o++){var i=s[o];(void 0==i.l||0!=i.l||r)&&chatMessages.push(i)}numChatMessages=chatMessages.length,chatOffset=l,null!=player&&(chatPlayback(),setInterval(chatPlayback,500))}}),t){var n=document.getElementById("topBtn");n.href="/videos/"+e,n.innerHTML="Go to video"}})}var lastSeekPos=-1e3,chatOffset=0,htmlMessages=[],loadBack=100,maxOnScreen=150,numDeleteOnOverflow=20;function chatPlayback(){var e=player.getCurrentTime()+chatOffset;(e<lastSeekPos-.1||e>lastSeekPos+12)&&(messageIndex=initChatAtPoint(e)),lastSeekPos=e;for(var a="";messageIndex<numChatMessages&&chatMessages[messageIndex].t<=e;){var t=renderSingleMessage(chatMessages[messageIndex]);htmlMessages.push(t),a+=t,messageIndex++}if(htmlMessages.length>maxOnScreen){htmlMessages=htmlMessages.slice(numDeleteOnOverflow);for(var s="",l=0;l<htmlMessages.length;l++)s+=htmlMessages[l];chatElement.innerHTML=s,scrollDn()}else""!=a&&(chatElement.innerHTML+=a,scrollDn())}function scrollDn(e=!1){setTimeout(()=>{var a=chatElement.parentElement;a.scrollTop=a.scrollHeight+100,e&&setTimeout(()=>{scrollDn(!1)},50)},5)}var loadAheadSecs=1;function initChatAtPoint(e){for(var a=0,t=numChatMessages;a<t;){var s=Math.floor((a+t)/2);chatMessages[s].t<e+loadAheadSecs?a=s+1:t=s}var l=Math.max(0,a-loadBack),n=chatMessages.slice(l,a);console.log("load "+n.length+" msg ["+l+" "+a+"]"),htmlMessages=[];for(var r="",o=0;o<n.length;o++)if(!(n[o].t-chatOffset<0)){var i=renderSingleMessage(n[o]);htmlMessages.push(i),r+=i}return chatElement.innerHTML=r,scrollDn(!0),a}var dontShowChatHeader=!1;function displayChatFull(e,a,t){var s="";dontShowChatHeader||(s+="<h3>"+(t?"All":"Live")+" chat messages</h3>",t||"twitch"!=chatType||(s+='<a class="shade" href="'+window.location.href+'&vodchat=1">Click here to also include messages posted after the live broadcast</a><br><br>'));for(var l=0,n=0;n<a.length;n++){var r=a[n];(void 0==r.l||0!=r.l||t)&&(s+=renderSingleMessage(r),l++)}0==l&&(s+='<i style="color: #444;">(no chat messages to display)</i>'),e.innerHTML=s}