var videoObject,videoPart,paramId,paramPart,paramCue,paramEdition,isMultipart,player,playerContainer,boundingRect,playerChat,vidId,theatreModeToggleBtn,descBarToggleBtn,descBarToggleBtn2,videoBox,navBox,descBox,timelineBox,progressInfo,localTimeInfo,videoStartTime,chatTabs,markersPane,vidIdMrk,vSigValue,progressInfo2=null,progressInfoVidDurationFormatted="",progressInfoStreamDurationFormatted="",videoDuration=0,nPartId=0,nPartNum=0,hasChat=!1;function loadPageContent(){if(void 0!==videoObject){var e="title"in videoObject&&null!=videoObject.title?escapeHtml(videoObject.title):'<i style="opactiy:0.5;" title="no original title">deadmau5 livestream</i>',a="game"in videoObject&&null!=videoObject.game?escapeHtml(videoObject.game):'<span title="no category">--</span>';document.getElementById("desc_title").innerHTML=(isMultipart?'<span class="partLbl">Part '+(paramPart+1)+" of "+videoObject.parts.length+"</span>&ensp;":"")+e,document.getElementById("desc_game").innerHTML=a;var i="";if("isTimeApprox"in videoObject&&videoObject.isTimeApprox&&(i='<span title="approx.">~</span>'),"formattedTime"in videoObject){var r=videoObject.formattedTime,n=r.date_str+"&emsp;"+i+r.time_str;"tz_str"in r&&(n+=" "+r.tz_str),document.getElementById("desc_time_et").innerHTML=n}if("formattedTimeUTC"in videoObject){var r=videoObject.formattedTimeUTC,n=r.date_str+"&emsp;"+i+r.time_str;"tz_str"in r&&(n+=" "+r.tz_str),document.getElementById("desc_time_utc").innerHTML=n}stSource="","twitch"==videoObject.type?stSource+='<img src="/media/twitch.png"> Twitch':"mixer"==videoObject.type?stSource+='<img src="/media/mixer.png"> Mixer':"mau5trap.tv"==videoObject.type&&(stSource='<img src="/media/favicon.png"> mau5trap.tv'),"streamNumber"in videoObject&&null!=videoObject.streamNumber&&(stSource+=' <b title="Stream Number\n\nthis is more of an approximative quantity than a fixed number. it means as much as: this is the N-th recorded stream on the archive for this platform. it does NOT mean that this was necessarily exactly the N-th stream on that platform!">#'+videoObject.streamNumber+"</b>"),document.getElementById("desc_source").innerHTML=stSource,progressInfoStreamDurationFormatted=toTimestamp(videoObject.length),hasChat="hasChat"in videoObject&&!0===videoObject.hasChat;var o="";if(isMultipart){partLinkList="";for(var s=0;s<nPartNum;s++)partLinkList+='<a href="/videos?v='+paramId+"&p="+(s+1)+'" class="btn">Part '+(s+1)+"</a> ";o+='<div class="partInfo"><div><img src="/media/info.png" class="infoIcon" /> <b>This stream has multiple parts!</b><br><i>Currently watching: Part '+(paramPart+1)+'</i><br><span class="partLinks">'+partLinkList+"</span></div></div>"}if("info"in videoPart)for(var l of videoPart.info)"length_mismatch"==l.type?o+='<div class="partInfo"><div><img src="/media/length.png" class="infoIcon" /> <b>The length of this video does not match the length of the original VOD.</b>&emsp;<span style="color: #555;">('+l.data.diff+' seconds difference)</span><br><i>This most likely happened because there was an empty section in the VOD that then got removed when converting. So no actual content should be missing. If you do find a problem, please use the report problem link below. Thanks!<br><span style="color: #ff8b08;">This does however mean that chat and link timestamps for this video after a certain point are incorrect.</span></i></div></div>':"missing_start"==l.type?o+='<div class="partInfo"><div><img src="/media/length.png" class="infoIcon" /> <b>Missing start</b><br>The stream recording started late, therefore the beginning of this stream is missing.</div></div>':"missing_end"==l.type?o+='<div class="partInfo"><div><img src="/media/length.png" class="infoIcon" /> <b>Missing end</b><br>The stream recording ended before the stream ended, therefore the end of this stream is missing.</div></div>':"manual_recording"==l.type&&(o+='<div class="partInfo"><div> \uD83D\uDDA5️\uD83C\uDFA5 <b>Manual recording</b><br>This stream recording was done manually by using screen recording software.<br><i>This means that sometimes UI elements from the recording system might pop up, the stream might go out of frame or you see some user interaction with the system. Sorry about that.</i></div></div>');"unblocked"==paramEdition?o+='<div class="partInfo"><div> <img src="/media/info.png" class="infoIcon" /> <b>This is an unblocked version of this video.</b><br><i>Some audio has been muted to prevent a block in certain countries. You can try to watch the original version with less mutes, but it might not be available in your area:</i><br><a href="/videos/?v='+paramId+(isMultipart?"&p="+(paramPart+1):"")+'" class="btn">Normal version</a> </div></div>':"unblocked"in videoPart.editions&&(o+='<div class="partInfo"><div> <img src="/media/ytb-some.png" class="infoIcon" /> <b>This video is blocked in some countries.</b><br><i>If you cannot play the video below, try this unblocked version where some copyrighted audio was removed:</i><br><a href="/videos/?v='+paramId+(isMultipart?"&p="+(paramPart+1):"")+'&e=unblocked" class="btn">Unblocked version</a> </div></div>'),document.getElementById("partInfoContainer").innerHTML=o;var d='<b>Community tags</b> (public)<br> <div id="videotags"></div> <br>',c="";for(var p of[{field:"muted",desctitle:"<b>Muted segments:</b>",background:"rgba(212,73,73,0.9)"},{field:"unmuted",desctitle:"<b>Unmuted segments:</b>",background:"#8fa"}])if(p.field in videoPart&&videoPart[p.field].length>0){var m=[];for(var g of videoPart[p.field]){var v=g[0],h=g[1],y=h-v,u=v/videoPart.length,b=y/videoPart.length;c+='<div class="tlmuteseg" style="background: '+p.background+"; left: "+100*u+"%; width: "+100*b+'%;"></div>',m.push('<a class="shade" href="?v='+paramId+(isMultipart?"&p="+(nPartId+1):"")+"&t="+v+'" onclick="return jumpTo('+v+');">'+toTimestamp(v)+'</a> - <a class="shade" href="?v='+paramId+(isMultipart?"&p="+(nPartId+1):"")+"&t="+h+'" onclick="return jumpTo('+h+');">'+toTimestamp(h)+"</a>")}d+=p.desctitle+"&emsp;"+m.join("&ensp;")+"<br><br>"}if("discontinuity"in videoPart&&videoPart.discontinuity.length>0){var f="",k=[];for(var T of videoPart.discontinuity)f+='<div class="tlDiscoMarker" style="left: '+100*(T/videoPart.length)+'%;"></div>',k.push('<a class="shade" href="?v='+paramId+(isMultipart?"&p="+(nPartId+1):"")+"&t="+T+'" onclick="return jumpTo('+T+');">'+toTimestamp(T)+"</a>");document.getElementById("tl_markers").innerHTML=f,d+="<b>Discontinuity:</b>&emsp;"+k.join("&ensp;")+"<br><br>"}for(var I of[{field:"contentid_removed",desctitle:"<b>Songs removed to prevent YouTube block:</b>",background:"#ff3"},{field:"contentid_matched",desctitle:"<b>Songs in this video</b> (recognized via YouTube Content ID):",background:"rgba(255,255,255,0.45)"}])if(I.field in videoPart&&videoPart[I.field].length>0){var $=[];for(var B of videoPart[I.field]){var v=B.t[0],h=B.t[1],y=h-v,u=v/videoPart.length,b=y/videoPart.length;c+='<div class="tlmuteseg" style="background: '+I.background+"; left: "+100*u+"%; width: "+100*b+'%;"></div>';var w="???";"text"in B&&null!==B.text?w=B.text:("title"in B&&null!==B.title&&(w=B.title),"artist"in B&&null!==B.artist&&(w+=" - "+B.artist),"label"in B&&null!==B.label&&(w+=" ("+B.label+")"));var M='<a class="shade" href="?v='+paramId+(isMultipart?"&p="+(nPartId+1):"")+"&t="+v+'" onclick="return jumpTo('+v+');">'+toTimestamp(v)+'</a> - <a class="shade" href="?v='+paramId+(isMultipart?"&p="+(nPartId+1):"")+"&t="+h+'" onclick="return jumpTo('+h+');">'+toTimestamp(h)+"</a>&ensp;"+w;$.push(M)}d+=I.desctitle+"<br>"+$.join("<br>")+"<br><br>"}d+='<div class="links">',null!=videoPart.ytid&&"uploaded"==videoPart.state&&(d+='<a href="https://www.youtube.com/watch?v='+videoPart.ytid+'" target="_blank" class="btn"><img src="/media/yt.png" class="icon"> Watch on YouTube</a> '),videoObject.originalAvailable&&"twitch"==videoObject.type&&(d+='<a href="https://www.twitch.tv/videos/'+paramId+'" target="_blank" class="btn"><img src="/media/twitch.png" class="icon"> Watch on Twitch (original)</a> '),d+="</div>";var x=[];if("hlsUrls"in videoObject&&x.push('<a href="#!" onclick="showHlsUrls()" class="shade">HLS playlist links (m3u8)</a>'),x.push('<a href="/version_history/#'+paramId+"-"+paramPart+'" class="shade">Video version history</a>'),x.push('<a href="/chat?v='+paramId+'" class="shade">\uD83D\uDCAC Full chat log</a>'),"twitch"==videoObject.type&&x.push('<span id="vodChatLbl"><a href="?v='+paramId+(isMultipart?"&p="+(nPartId+1):"")+'&vodchat=1" class="shade">Include VOD chat</a></span>'),x.push('<a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfs60U7bxaLJcsJs3UnFJlzmdWNZ-3NRXgRdOZse_0apDhM9Q/viewform?entry.454230727='+paramId+'" class="shade"> <img src="/media/report.png" class="icon">Report a problem with this video </a>'),d+=x.join(" &emsp; "),"hlsUrls"in videoObject){var C="";for(var E in videoObject.hlsUrls){var _=videoObject.hlsUrls[E];C+="<b>"+E+'</b>: <a href="'+_+'" target="_blank" class="shade">'+escapeHtml(_)+"</a> <br>"}C+='<br><a href="#!" onclick="infoPopup(\'about-hlsurls\')" class="shade" style="opacity: 0.6;"><i>(What is this?)</i></a>',d+='<br><div id="hlsurls_container" style="display:none;"><br>'+C+"</div>"}""!=c&&(document.getElementById("tl_sections").innerHTML=c),document.getElementById("desc_post").innerHTML=d}}function showHlsUrls(){document.getElementById("hlsurls_container").style.display="block",document.getElementById("hlsurls_container").scrollIntoView()}function infoPopup(e){var a="";"about-hlsurls"==e?a='These are links to <a class="shade" href="https://en.wikipedia.org/wiki/M3U" target="_blank">HLS playlist</a> files <i>(HLS = HTTP Live Streaming)</i> that Twitch uses to host VODs.<br>Basically, Twitch cuts up videos in small chunks and these links point to text files that contain information where to find all these chunks.<br>This is the resource the Twitch player uses to play your VOD. But you can use any other player that supports HLS.<br><i>For example:</i> In VLC media player, go to Media &#9654; Open Network Stream (Ctrl + N) and put one of the HLS URLs in there. It will play your video, directly from Twitch\'s VOD servers.':"why-discord"==e&&(a="access control is handled via discord <br> roles you have on the discord server correspond to user groups on this site"),a="<b>Info</b> <button onclick=\"clWindow('info-popup')\">&nbsp;x&nbsp;</button><br><br>"+a;var i=event.clientX+12,r=event.clientY-12;clWindow("info-popup"),mkWindow("info-popup",i,r,a)}function reloadTagAndMarkerList(){reloadMarkerList(),reloadTagList()}function initPage(){if("mixer"==videoObject.type){var e=document.createElement("link");e.rel="stylesheet",e.type="text/css",e.href="/media/style_mixer.css",document.head.appendChild(e)}vidId=paramId,nPartId=paramPart,nPartNum=videoObject.parts.length,videoStartTime=videoPart.timestamp,vSigValue=videoObject.vsig,loadPageContent();var a=null;if("uploaded"==videoPart.state&&null!=videoPart.ytid)a=videoPart.ytid;else if("abandoned_processing"==videoPart.state)document.getElementById("playerbox_abandoned").style.display="block",videoObject.originalAvailable&&(document.getElementById("abandoned_original").style.display="inline");else if("not_yet_uploaded"==videoPart.state)document.getElementById("playerbox_notuploaded").style.display="block";else if("no_recording"==videoPart.state)document.getElementById("playerbox_norecording").style.display="block";else if("access_restricted"==videoPart.state){waitforSession(()=>{getVideoAccess(videoPart.access_control.video_id,e=>{if(e.granted&&null!=e.video_data){a=e.video_data.ytid;var i=e.groups[0];document.getElementById("partInfoContainer").innerHTML+='<b style="color:#0a0;">\uD83D\uDD13 access restricted video &mdash; access granted to <span style="color:#fff;">'+username+'</span> with privilege <span style="color:#'+i.color+';">'+escapeHtml(i.name)+"</span></b> <br><br>"}else if(e.exists){document.getElementById("accessrestriction_state_login").innerHTML=e.gate.login?"✔️":"❌",document.getElementById("accessrestriction_state_connection").innerHTML=e.gate.account_connected?"✔️":"❌",document.getElementById("accessrestriction_state_group").innerHTML=e.gate.group_member?"✔️":"❌",e.gate.login&&(document.getElementById("accessrestriction_helplinks_login").style.display="none"),e.gate.account_connected&&(document.getElementById("accessrestriction_helplinks_connection").style.display="none");var r="";for(var i of e.groups)r+='<span style="display: inline-block; padding:5px 10px; border-radius: 20px; border: 1px solid #'+i.color+';">'+escapeHtml(i.name)+"</span> ";document.getElementById("accessrestriction_group_list").innerHTML=r,document.getElementById("playerbox_accessrestriction").style.display="block"}else document.getElementById("playerbox_notfound").style.display="block";postInit(a)})}),registerReloadUserStateCallback(()=>{location.reload()});return}postInit(a)}function postInit(e){videoDuration=videoPart.length;var a=!1;null!=e&&(loadPlayer(e),a=!0),registerReloadUserStateCallback(reloadTagAndMarkerList),waitforSession(reloadTagAndMarkerList),playerContainer=document.getElementById("playerContainer"),videoBox=document.getElementById("videoBox"),navBox=document.getElementsByClassName("navbox")[0],playerChat=document.getElementById("player_chat"),timelineBox=document.getElementsByClassName("videoTimelineInfoBox")[0],vidIdMrk=vidId,isMultipart&&(vidIdMrk=vidId+"/"+nPartId),descBox=document.getElementById("desc"),(theatreModeToggleBtn=document.createElement("div")).setAttribute("id","toggleTheatreBtn"),theatreModeToggleBtn.className="descBtn",theatreModeToggleBtn.innerHTML='<div onclick="toggleTheatre()"><img src="/media/theatre.png" class="icon"></div>',a&&descBox.appendChild(theatreModeToggleBtn),(descBarToggleBtn=document.createElement("div")).className="descBtn",descBarToggleBtn.innerHTML='<div onclick="toggleDescBar()"><img src="/media/descbtn.png" class="icon"></div>',a&&(descBarToggleBtn.style.right="50px"),descBox.appendChild(descBarToggleBtn),(descBarToggleBtn2=descBarToggleBtn.cloneNode(!0)).innerHTML='<div onclick="toggleDescBar()"><img src="/media/descbtn2.png" class="icon"></div>',descBarToggleBtn2.style.top="20px",descBarToggleBtn2.style.right="28px",descBarToggleBtn2.style.zIndex="1",descBarToggleBtn2.style.display="none",(descBarToggleBtn2Cnt=document.createElement("div")).style.position="relative",descBarToggleBtn2Cnt.style.width="100%",descBarToggleBtn2Cnt.style.height=0,descBarToggleBtn2Cnt.appendChild(descBarToggleBtn2),videoBox.appendChild(descBarToggleBtn2Cnt);var i=10;(progressInfoC=document.createElement("div")).className="descRight",progressInfoC.innerHTML=isMultipart?'<b title="part progress">P</b> ':"",progressInfoC.style.top=i+"px",(progressInfo=document.createElement("span")).innerHTML="--:--:-- / --:--:--",progressInfoC.appendChild(progressInfo),descBox.appendChild(progressInfoC),i+=18,isMultipart&&((progressInfo2C=document.createElement("div")).className="descRight",progressInfo2C.innerHTML='<b title="stream progress">S</b> ',progressInfo2C.style.top=i+"px",progressInfo2C.style.opacity="0.6",(progressInfo2=document.createElement("span")).innerHTML="--:--:-- / --:--:--",progressInfo2C.appendChild(progressInfo2),descBox.appendChild(progressInfo2C),i+=18),(localTimeInfo=document.createElement("div")).className="descRight localTime",localTimeInfo.title="JoelTime™",localTimeInfo.innerHTML="--:--",localTimeInfo.style.display="none",localTimeInfo.style.top=i+"px",localTimeInfo.onclick=function(){timeFormat24h=!timeFormat24h,updateTimestamp()},descBox.appendChild(localTimeInfo),chatTabs=document.getElementById("chat_tabs"),recalculateSizes(),window.onresize=function(){recalculateSizes()};var r=document.getElementById("prevNextLinks");load("/data/pages.json",e=>{for(var a=e.length,i=null,n=null,o=-1,s=0;s<a;s++)if(e[s].s==paramId){o=a-s,s+1<a&&(i=e[s+1].s),s-1>=0&&(n=e[s-1].s);break}if(-1!=o){var l="",d="";null!=i&&(l='<a href="/videos?v='+i+'" class="btn">&#9664; Previous</a>'),null!=n&&(d='<a href="/videos?v='+n+'" class="btn">Next &#9654;</a>'),r.innerHTML=l+" &emsp; <b>"+o+" / "+a+"</b> &emsp; "+d,r.title="video number in archive catalog"}})}window.addEventListener("load",function(e){var a=new URL(window.location.href),i=a.searchParams.get("v");null!=i?load("/data/videos/"+(i=i.trim())+".json",function(e){videoObject=e,paramId=i,paramPart=0;var r=a.searchParams.get("p");if(null!=r&&/^\d+$/.test(r)){var n=parseInt(r)-1;n>=0&&n<videoObject.parts.length&&(paramPart=n)}videoPart=videoObject.parts[paramPart],isMultipart=videoObject.parts.length>1;var o=a.searchParams.get("t"),s=readTimeFromUrl();-1!=s&&(paramCue=s);var l=0,d=0;if(0==paramPart&&-1!=s)for(var c=0;c<videoObject.parts.length;c++){var p=videoObject.parts[c];if(s>=p.start&&s<p.start+p.length){l=c,d=s-p.start;break}}var m=a.searchParams.get("e");if(null!=m&&(paramEdition=m.trim().toLowerCase()),null!=paramEdition&&paramEdition in videoPart.editions){var g=videoPart.editions[paramEdition];for(var v in g)videoPart[v]=g[v]}l>0?(a.searchParams.set("v",paramId),a.searchParams.set("p",l+1),a.searchParams.set("t",d),a.searchParams.set("ot",o),window.location.href=a.toString()):initPage()},function(){document.getElementById("playerbox_notfound").style.display="block"}):window.location.href="/page?p=1"});var timeFormat24h=!0;function updateTimestamp(){if(null!=player&&!isNaN(player.getCurrentTime())){progressInfo.innerHTML=toTimestamp(player.getCurrentTime())+" / "+progressInfoVidDurationFormatted,isMultipart&&(progressInfo2.innerHTML=toTimestamp(videoPart.start+player.getCurrentTime())+" / "+progressInfoStreamDurationFormatted);var e=Math.floor(videoStartTime+player.getCurrentTime()),a=new Date(1e3*e).toLocaleString("en-US",{timeZone:"America/Toronto"}),i=new Date(a),r=i.getHours(),n=i.getMinutes();timeFormat24h?localTimeInfo.innerHTML=(r<10?"0"+r:r)+":"+(n<10?"0"+n:n):localTimeInfo.innerHTML=(r%12==0?12:r%12)+":"+(n<10?"0"+n:n)+" "+(r<12?"AM":"PM"),localTimeInfo.style.display="block"}}var descBarVisible=!0,descBarHidingAvailable=!0;function toggleDescBar(){showDescBar(descBarVisible=!descBarVisible),recalculateSizes()}function showDescBar(e){e?(descBox.style.display="block",timelineBox.style.display="block",descBarToggleBtn.style.display="block",descBarToggleBtn2.style.display="none",null!=chatTabs&&(chatTabs.style.display="block")):(descBox.style.display="none",timelineBox.style.display="none",descBarToggleBtn.style.display="none",descBarToggleBtn2.style.display="block",null!=chatTabs&&(chatTabs.style.display="none"))}var chatInit=!1,theatreMode=!1,bodyScrollTop=0;function toggleTheatre(){(theatreMode=!theatreMode)?(bodyScrollTop=window.pageYOffset||document.documentElement.scrollTop,playerContainer.className="theatre",playerChat.className="theatre",theatreModeToggleBtn.className="descBtn theatre",document.body.style.overflow="hidden"):(playerContainer.className="",theatreModeToggleBtn.className="descBtn",recalculateSizes(),document.body.style.overflow="",window.scrollTo(0,bodyScrollTop))}function playerChatModeChange(e){(descBarHidingAvailable=!e)?showDescBar(descBarVisible):(showDescBar(!0),descBarToggleBtn.style.display="none",descBarToggleBtn2.style.display="none")}function recalculateSizes(){if(!theatreMode){var e=window.innerWidth-18;if(e>=960){descBarHidingAvailable&&playerChatModeChange(!0);var a=Math.min(1024,1024-(1436-e));videoBox.style.width=a+"px",navBox.style.width=a+"px",setTimeout(()=>{boundingRect=videoBox.getBoundingClientRect(),boundingRect.y+=window.scrollY,playerChat.style.left=a+20+"px",playerChat.style.top=boundingRect.y+0+"px",playerChat.className="right";var e=2;"mixer"==videoObject.type&&(e=0),playerChat.style.height=boundingRect.height-e-0+"px",chatTabs.className="right",chatTabs.style.left=a+20+"px",chatTabs.style.top=boundingRect.y-52+0+"px"},1)}else descBarHidingAvailable||playerChatModeChange(!1),videoBox.style.width="100%",navBox.style.width="100%",setTimeout(()=>{playerChat.className="",playerChat.style.left=0,playerChat.style.top=0,playerChat.style.height=Math.min(.5*playerContainer.clientWidth,260)+"px",chatTabs.className="",chatTabs.style.left=0,chatTabs.style.top=0},1);playerContainer.style.height=playerContainer.clientWidth/16*9+"px",chatInit||(playerChat.style.display="block",chatInit=!0)}}function loadPlayer(e){player=new YT.Player("youtube-player",{height:"100%",width:"100%",videoId:e,playerVars:{autoplay:1},events:{onReady:function(a){var i=a.target.getDuration();i>0&&(videoDuration=i),progressInfoVidDurationFormatted=toTimestamp(videoDuration),void 0!==paramCue&&(a.target.cueVideoById({videoId:e,startSeconds:paramCue}),a.target.playVideo()),updateTimestamp(),setInterval(updateTimestamp,200),loadMarkers(),loadTags(),loadChat()}}})}function loadChat(){var e=document.getElementById("chat");if(recalculateSizes(),!hasChat){e.innerHTML='<span style="opacity:0.6;">\uD83D\uDCAC\uD83D\uDEAB Chat replay unavailable.</span>';return}var a=paramId,i=videoPart.start,r=videoObject.type,n=0,o=!1;"full"==i?o=!0:n=parseInt(i),dontShowChatHeader=!0,displayChat(a,e,o,r,n)}function markerColorChange(e,a){var i=document.getElementById("mcol-"+a);i&&(i.style.fill=e.value)}function btnMarkerDiscard(e,a,i){e||(delete markers[a],reloadMarkerList()),rmMarkerElem(e?null:a,i)}function rmMarkerElem(e,a){if(e){var i=document.getElementById("marker-"+e);i&&(i.outerHTML="")}clWindow(a)}function clWindow(e){if(e){var a=document.getElementById(e);a&&(a.outerHTML="")}}function delMarker(e){confirm("Delete marker '"+markers[e].name+"' @ '"+toTimestamp(markers[e].time)+"'?")&&markerDestory(e,a=>{btnMarkerDiscard(!1,e,null)})}function editMarker(e){mkMarkerEditWindow(!0,e,event.clientX+12,event.clientY-12)}function btnMarkerSave(e,a,i){var r=JSON.parse(JSON.stringify(markers[a]));delete r.temp,r.name=document.getElementById("editMarkerName").value.trim(),r.color=document.getElementById("editMarkerColor").value;var n=-1,o=document.getElementById("editMarkerTime").value;if(/^(\d+\:)?(\d+\:)?\d+$/.test(o)){var s=o.split(":").reverse(),l=1,d=0;for(t of s)d+=parseInt(t)*l,l*=60;d<0||d>videoDuration?mkToast("invalid timecode (must be within video time span)!","f55"):n=d}else mkToast("invalid timecode (syntax)! please use hh:mm:ss","f55");-1!=n&&(r.time=n,e?markerUpdate(a,r,e=>{rmMarkerElem(a,i),loadMarkersFromApi(()=>{})}):markerCreate(vidIdMrk,r,e=>{loadMarkersFromApi(()=>{rmMarkerElem(a,i)})}))}function loadMarkersFromApi(e=null){getMarkersVideo(vidIdMrk,a=>{var i={};if(vidIdMrk in a)for(let r of a[vidIdMrk])i[r.id]={color:"#"+r.color,time:r.offset,name:r.text,user:r.by};markers=i,reloadMarkerList(),e&&e()})}function editMarkerKeypress(e,a,i){"Enter"===event.key?btnMarkerSave(e,a,i):"Escape"===event.key&&btnMarkerDiscard(e,a,i)}function loadMarkers(){if(0!=videoDuration){var e=document.getElementById("tl_markers"),a=document.createElement("div");a.style.color="white",a.style.background="rgba(0,0,0,0.8)",a.style.padding="5px",a.style.display="none",a.style.position="fixed",a.style.fontSize="smaller",a.innerHTML="click to add a marker",document.body.appendChild(a);var i=document.createElement("div");i.style.background="yellow",i.style.width="1px",i.style.height="32px",i.style.position="absolute",i.style.display="none",i.style.pointerEvents="none",e.style.cursor="pointer",e.addEventListener("mouseleave",e=>{i.style.display="none",a.style.display="none"}),e.addEventListener("click",a=>{if(!session){showLoginPane("you need to login to create markers");return}var i=a.clientX,r=e.getBoundingClientRect().left,n=e.getBoundingClientRect().top,o=(i-r)/parseFloat(e.clientWidth);if(o>=0&&o<=1){var s="#"+Math.random().toString(16).substr(2,6);markers.tmp={color:s,time:parseInt(o*videoDuration),name:"(new marker)",user:"local",temp:!0},mkMarkerEditWindow(!1,"tmp",i+10,n+6)}}),e.addEventListener("mousemove",r=>{var n=r.clientX,o=e.getBoundingClientRect().left,s=n-o,l=e.clientWidth,d="";if(s>=0){i.style.display="block";var c=s/parseFloat(l);i.style.left=100*c+"%",d="click to add a marker at <b>"+toTimestamp(parseInt(c*videoDuration))+"</b>"}else i.style.display="none";for(var p="",m=r.target,g=null;null!=m;)"markerId"in m.dataset&&(g=m.dataset.markerId),m=m.parentElement;if(null!=g&&g in markers){var v=markers[g];p=colDot(v.color)+" <b>"+toTimestamp(v.time)+"</b>&emsp;"+escapeHtml(v.name)+"<br>"}""!=(markerText=p+d)&&(a.innerHTML=markerText,a.style.display="block");var h=a.clientWidth,y=o-12,u=o+l+12-h;a.style.top=e.getBoundingClientRect().bottom+"px";var b=o+s;(b-=h/2)<y&&(b=y),b>u&&(b=u),a.style.left=b+"px"}),e.appendChild(i),chatTabs.innerHTML+='<a id="tabheader-chat" onclick="openTab(\'chat\')" class="active'+(hasChat?"":" strike")+'" href="#!">Chat</a>',chatTabs.innerHTML+='<a id="tabheader-markers" onclick="openTab(\'markers\')" href="#!">Markers</a>',(markersPane=document.createElement("div")).style.padding="10px",markersPane.style.display="none",markersPane.innerHTML='<div id="markerlist"></div><br><div id="markersettings" style="diplay: none;"><b>Marker settings</b><br><label><input onclick="toggleMarkers(\'mine\')" checked type="checkbox"></input> show mine</label>&emsp;<label><input onclick="toggleMarkers(\'community\')" checked type="checkbox"></input> show community</label></div>',playerChat.appendChild(markersPane),hasChat||openTab("markers"),loadMarkersFromApi()}}markers={};var markersEnabledMine=!0,markersEnabledCommunity=!0;function toggleMarkers(e){"mine"==e?markersEnabledMine=!markersEnabledMine:"community"==e&&(markersEnabledCommunity=!markersEnabledCommunity),reloadMarkerList()}function mkMarkerEditWindow(e,a,i,r){var n="win-edit-marker";rmMarkerElem("tmp",n),e||reloadMarkerList();var o="",s="editMarkerKeypress("+e+", '"+a+"', '"+n+"')",l="markerColorChange(this, '"+a+"')";e&&(o=escapeHtml(markers[a].name),l="");var d=markers[a].color,c=toTimestamp(markers[a].time),p='<input type="text" id="editMarkerName" placeholder="marker name" value="'+o+'" onkeydown="'+s+'"> ';p+='<button title="[esc]" onclick="'+("btnMarkerDiscard("+e+", '"+a+"', '")+n+"')\">&nbsp;x&nbsp;</button><br>",p+='<b>@</b><input type="text" id="editMarkerTime" placeholder="timecode" value="'+c+'" onkeydown="'+s+'"><br>',p+='<input onchange="'+l+'" style="border:none;padding:0;margin-top:6px;width:16px;height:16px;" type="color" id="editMarkerColor" value="'+d+'"> ',p+='<button title="[enter]" onclick="'+("btnMarkerSave("+e+", '"+a+"', '")+n+"')\">save</button>",mkWindow(n,i,r,p+='<br><i style="font-size:smaller;opacity:0.6;"><img title="info" src="/media/info.png" height="18px" style="vertical-align:bottom;">markers are public</i>'),document.getElementById("editMarkerName").focus()}function mkWindow(e,a,i,r){var n=document.createElement("div");n.style.color="white",n.style.background="#334455",n.style.border="1px solid #112233",n.style.padding="5px",n.style.display="block",n.style.position="fixed",n.style.minWidth="250px",n.style.top=i+"px",n.style.left=a+"px",n.innerHTML=r,n.id=e,document.body.appendChild(n),windowJustify(e)}function windowJustify(e){var a=document.getElementById(e);if(a){var i=a.getBoundingClientRect(),r=i.top,n=i.left,o=i.width,s=i.height,l=window.innerWidth,d=window.innerHeight;n<0&&(n=0),r<0&&(r=0),n>l-o&&(n=l-o),r>d-s&&(r=d-s),a.style.top=r+"px",a.style.left=n+"px"}}function reloadMarkerList(){var e=document.getElementById("markerlist");if(null!=e){var a=document.getElementById("tl_markers"),i=[];for(var r in markers)i.push(r);i.sort((e,a)=>markers[e].time-markers[a].time);var n="";for(var r of i){var o=markers[r],s=o.user==username,l="marker-"+r,d=document.getElementById(l);if(null==d){var c=getNode("svg",{width:20,height:20}),p=getNode("rect",{x:9.142,y:-5,width:10,height:10,transform:"rotate(45)",rx:2,ry:2,fill:o.color,stroke:"black",strokeWidth:2});p.dataset.markerId=r,p.id="mcol-"+r,c.appendChild(p),c.style.position="absolute",c.style.marginLeft="-10px",c.style.top="6px";var m=o.time/parseFloat(videoDuration);c.style.left=100*m+"%",c.id=l,a.appendChild(c),d=c}var g="initial";if(s&&!markersEnabledMine&&(g="none"),s||markersEnabledCommunity||(g="none"),d.style.display=g,!("temp"in o&&o.temp)){var v=escapeHtml(o.name),h="",y=o.user;if(s){if(!markersEnabledMine)continue;h+='<a class="markerEditLink" onclick="editMarker('+r+')" href="#!">edit</a> ',h+='<a class="markerEditLink del" onclick="delMarker('+r+')" href="#!">x</a> ',y='<span title="you" style="color:#47f;">'+y+"</span>"}else if(!markersEnabledCommunity)continue;""==o.name&&(v='<span style="color:#555;">[unnamed]</span>'),n+='<div><a class="timestamp" href="?t='+o.time+'" onclick="return jumpTo('+o.time+');">'+toTimestamp(o.time)+"</a>&ensp;"+colDot(o.color)+"&emsp;"+v+'&emsp;<i style="color:gray;">by '+y+"</i> "+h+"</div>"}}e.innerHTML=n,document.getElementById("markersettings").style.display=session?"block":"none"}}function getNode(e,a){for(var i in e=document.createElementNS("http://www.w3.org/2000/svg",e),a)e.setAttributeNS(null,i.replace(/[A-Z]/g,function(e,a,i,r){return"-"+e.toLowerCase()}),a[i]);return e}function openTab(e){var a=document.getElementById("tabheader-chat"),i=document.getElementById("tabheader-markers");null!=a&&(a.className=a.className.replace("active","")),null!=i&&(i.className=i.className.replace("active",""));var r=null==chatElement?document.getElementById("chat"):chatElement;"chat"==e?(r.style.display="block",null!=markersPane&&(markersPane.style.display="none"),null!=a&&(a.className+=" active")):"markers"==e&&(r.style.display="none",null!=markersPane&&(markersPane.style.display="block"),null!=i&&(i.className+=" active"))}var globalCategoryList=[],videoTags=[];function loadTags(){reloadCategoryList(()=>{document.getElementById("videotags").dataset.enabled="1",loadVideoTagsFromApi()})}function loadVideoTagsFromApi(e=null){getTagsVideo(vidId,a=>{videoTags=vidId in a?a[vidId]:[],reloadTagList(),e&&e()})}function reloadCategoryList(e=null){getCategories(a=>{var i={};for(var r in a){var n=a[r];n.color="#"+n.color,i[r]=n}globalCategoryList=i,e&&e()})}function reloadTagList(){var e=document.getElementById("videotags");if("1"!=!e.dataset.enabled){var a=videoTags;a.sort((e,a)=>{var i=e in globalCategoryList?globalCategoryList[e].count:0;return(a in globalCategoryList?globalCategoryList[a].count:0)-i});var i="";for(var r of a)if(r in globalCategoryList){var n=globalCategoryList[r],o="";session&&(o=' <a class="markerEditLink del" href="#!" onclick="videoUntag('+r+')">x</a>'),i+='<span class="videotag">'+colDot(n.color)+" "+escapeHtml(n.text)+o+"</span> "}e.innerHTML=i+'<span class="videotag add" onclick="videoAddTag()">&nbsp;+&nbsp;</span'}}function videoAddTag(){if(!session){showLoginPane("you need to login to add tags");return}var e=event.clientX+12,a=event.clientY-12,i="win-add-tag";clWindow(i);var r='<input type="text" id="tagSearchField" placeholder="search tags" value="" onkeydown="tagSearchKeypress(false)" onkeyup="tagSearch()"> ';r+='<button title="[esc]" onclick="clWindow(\''+i+"')\">&nbsp;x&nbsp;</button><br>",r+='<div id="tagSearchResults" style="max-width: 500px;"></div>',r+='<span style="font-size: smaller;"><a href="#!" class="shade" onclick="showNewTagForm()">Create a new tag</a></span>',mkWindow(i,e,a,r+='<br><div id="newTag" style="display:none;"><input type="text" id="newTagName" placeholder="new tag name" value="" onkeydown="tagSearchKeypress(true)"> <input style="border:none;padding:0;width:16px;height:16px;" type="color" id="newTagColor" value="#'+Math.random().toString(16).substr(2,6)+'"> <button onclick="createNewTag()">add</button></div>'),tagSearch(),document.getElementById("tagSearchField").focus()}function tagSearchKeypress(e){if("Enter"===event.key){if(e)createNewTag();else{var a=document.getElementById("tagSearchResults").dataset;if(a.hasOwnProperty("first")){var i=a.first;-1!=i&&videoTag(i)}}}else"Escape"===event.key&&clWindow("win-add-tag")}function tagSearch(){var e="",a=document.getElementById("tagSearchField").value.trim(),i=0,r=[];for(var n in globalCategoryList){if(i>=20)break;var o=globalCategoryList[n];(""==a||-1!==o.text.indexOf(a))&&!videoTags.includes(parseInt(n))&&(r.push({id:n,obj:o}),i++)}r.sort((e,a)=>a.obj.count-e.obj.count);var s=-1;for(res of r){var n=res.id,o=res.obj;-1==s&&(s=n),e+='<span class="videotag clickable" onclick="videoTag('+n+')" title="click to add">'+colDot(o.color)+" "+escapeHtml(o.text)+' <span class="count">'+o.count+"</span></span> "}document.getElementById("tagSearchResults").innerHTML=e,document.getElementById("tagSearchResults").dataset.first=s,windowJustify("win-add-tag")}function showNewTagForm(){document.getElementById("newTag").style.display="block",document.getElementById("newTagName").value=document.getElementById("tagSearchField").value,document.getElementById("newTagName").focus(),windowJustify("win-add-tag")}function setTagsVideoAdjustCount(e,a,i,r){setTagsVideo(e,a,i,e=>{a in globalCategoryList&&(globalCategoryList[a].count=e.new_count),r&&r(e)})}function videoTag(e){clWindow("win-add-tag"),videoTags.includes(e)||setTagsVideo(vidId,e,!0,e=>{loadVideoTagsFromApi()})}function videoUntag(e){clWindow("win-add-tag"),setTagsVideoAdjustCount(vidId,e,!1,a=>{loadVideoTagsFromApi(()=>{if(e in globalCategoryList){var a=globalCategoryList[e];0==a.count&&confirm("The tag '"+a.text+"' isn't being used on any video anymore.\nDo you want to delete it now?")&&tagDestroy(e,()=>{reloadCategoryList()})}})})}function createNewTag(){var e=document.getElementById("newTagName").value.trim(),a=document.getElementById("newTagColor").value;if(0==e.length){mkToast("please enter a tag name","f55");return}tagCreate(vidId,{name:e,color:a},e=>{clWindow("win-add-tag"),reloadCategoryList(()=>{videoTag(e.id)})})}function colDot(e){return'<div style="vertical-align:baseline;display:inline-block;width:10px;height:10px;background:'+e+';border-radius:6px;"></div>'}function readTimeFromUrl(){var e=new URL(window.location.href).searchParams.get("t");if(null!=e){var e=e.trim();if(0==e.length)return -1;if(/^(\d+h)?(\d+m)?(\d+s?)?$/.test(e)){var a=/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/.exec(e);return console.log(a),(void 0==a[1]?0:3600*parseInt(a[1]))+(void 0==a[2]?0:60*parseInt(a[2]))+(void 0==a[3]?0:parseInt(a[3]))}if(/^(\d+\:){0,2}\d+$/.test(e)){var a=/^(?:(?:(\d+)\:)?(\d+)\:)?(\d+)$/.exec(e);return console.log(a),(void 0==a[1]?0:3600*parseInt(a[1]))+(void 0==a[2]?0:60*parseInt(a[2]))+parseInt(a[3])}}return -1}function ar_login(){showLoginPane("log in to view video")}function ar_connecthelptext(){infoPopup("why-discord")}