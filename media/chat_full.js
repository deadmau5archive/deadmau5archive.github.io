var chat;window.onload=function(){(chat=document.getElementById("chat")).innerHTML='<img src="/media/loading.gif" height="18px"> Loading...';var e=new URL(window.location.href).searchParams.get("v");null!=e?getVideo(e,a=>{var t=a.video_data.type;if("mixer"==t){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",i.href="/media/style_mixer.css",document.head.appendChild(i)}displayChat(e.trim(),chat,!0,t)}):window.location.href="/page?p=1"};