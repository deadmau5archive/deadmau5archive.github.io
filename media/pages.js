var itemsPerPage=50;function load(e,a){var n=new XMLHttpRequest;n.open("GET",e,!0),n.responseType="json",n.onload=function(){200===n.status&&a(n.response)},n.send()}window.onload=function(){var e=new URL(window.location.href).searchParams.get("p");null!=e?load("/page/pages.txt?nc="+Date.now(),function(a){var n=Math.ceil(a.length/itemsPerPage),i=0,s=0,t=0,l=!1;if("all"==e){l=!0,s=a.length;var r=document.getElementById("pagesAllToggle");r.innerHTML="Show pages",r.href="/page?p=1"}else isNaN(e)||(i=(t=parseInt(e)-1)*itemsPerPage,s=Math.min(a.length,i+itemsPerPage));if(i>=0&&i<a.length){for(var o=a.slice(i,s),d="",c=0;c<o.length;c++){var g=o[c],v="";"T"==g.t?v='<img src="/media/twitch.png" class="icon" title="streamed on twitch">':"M"==g.t&&(v='<img src="/media/mixer.png" class="icon" title="streamed on mixer">');var p='<span class="title">'+g.h+"</span>";p+='<span class="vidno">'+v+" "+g.n+"</span><br>",p+='<span class="game">'+g.c+"</span>";var m="/thumb/"+g.s+".jpg",h='<div class="thumbnailContainer thumbnailContainerShade"></div>';1==g.b&&(h='<div class="thumbnailContainer"><div class="thumbnail thumbnailAnimated"><img src="/storyboard/'+g.s+'.jpg" /></div></div>');var b='<div class="preview">'+('<div class="thumbnail"><div class="previewImg" style="background: url(\''+m+"');\"></div></div>"+h+'<div class="overlaybox timecontainer"><img src="/media/play.png"> '+g.r+'</div><div class="overlaybox datecontainer">'+g.d+"</div>"+g.g)+'</div><div class="textbox">'+p+"</div>";d+='<a href="/videos/'+g.s+'"><div class="vidbox">'+b+"</div></a>"}document.getElementById("page_videos").innerHTML=d}var u="";if(!l)for(c=0;c<n;c++)u+='<a href="/page?p='+(c+1)+'" class="btn'+(c==t?" active":"")+'">'+(c+1)+"</a> ";document.getElementById("page_buttons").innerHTML=u;var f="";f=l?"All videos":(t-1>=0?'<a href="/page?p='+t+'" class="btn">&#9664;</a>&emsp;':"")+"Page <b>"+(t+1)+"</b> of <b>"+n+"</b>&emsp;"+(t+1<n?'<a href="/page?p='+(t+2)+'" class="btn">&#9654;</a>':""),document.getElementById("page_info").innerHTML=f}):window.location.href="/page?p=1"};