window.onload = function(){
	var oBtn = document.getElementById("btnSong");
	var oTxt = document.getElementById("inpSong");
	var oAudio = document.getElementById("audio");
	var oRoundPic = document.getElementById("round-pic");
	var oSpan1 = document.getElementById("span1");
	var oSpan2 = document.getElementById("span2");
	var oSpan3 = document.getElementById("span3");
	var oParent  = document.getElementById("box");
	
	var str = window.location.search;
	var loc = str.substring(str.lastIndexOf('=')+1, str.length); 
	
	
	var oBack  = document.getElementById("back");
	var timer = null;
	
//	alert(loc)
	
//	oTxt.value = loc;
//	loc = oTxt.value;
//	alert(oTxt.value);
		(function (){
		if(oTxt.value){
			oParent.innerHTML = "";
			setTimeout(function (){
				ajax({
				type: "get",
				url: 'https://api.imjad.cn/cloudmusic/?type=search&limit=60&s='+loc,
				asyn: true,
				success: function (data){
					news(data);
				}
			})
			},0)
		}
	})()
	
	
	imgLocation("box","cen");
	oBtn.onclick = function (){
		if(oTxt.value == ""){
					alert("空！！！");
					return false;
				}
		oParent.innerHTML = "";
				ajax({
						type: "get",
						url: 'https://api.imjad.cn/cloudmusic/?type=search&limit=50&s='+oTxt.value,
						asyn: true,
						success: function (data){
							news(data);
						}
					})

			var num =0;
			window.onscroll = function (){
				if(checkFlag ()){
					num += 1;
					ajax({
						type: "get",
						url: 'https://api.imjad.cn/cloudmusic/?type=search&limit=30&offset='+num+'&s='+oTxt.value,
						asyn: true,
						success: function (data){
							news(data);
						}
				})
			}
				
				
//				if(scrollTop >= viewHeight){
//					oBack.style.display = "block";
//				}else{
//					oBack.style.display = "none";
//				}
		}
	}
	
	
	
	
	
			window.onscroll = function (){
				var viewHeight1 = document.documentElement.clientHeight||document.body.clientHeight;
	var scrollTop1 = document.documentElement.scrollTop||document.body.scrollTop;
				console.log(viewHeight1,scrollTop1);
				if(scrollTop1 >= viewHeight1){
					oBack.style.display = "block";
				}else{
					oBack.style.display = "none";
				}
				
			}
			
			oBack.onclick = function (){
				timer=setInterval(function (){
					var scrollTop1 = document.documentElement.scrollTop||document.body.scrollTop;
					var speed = scrollTop1/5;
					document.body.scrollTop -= speed;
					if(scrollTop1 == 0){
						clearInterval(timer);
					}
				},30)
			}
	
	
	
	
	
	if(loc){
		 oParent.innerHTML = "";
		
		ajax({
				type: "get",
				url: 'https://api.imjad.cn/cloudmusic/?type=search&limit=60&s='+loc,
				asyn: true,
				success: function (data){
					news(data);
				}
			})

		 var num =0;
			window.onscroll = function (){
				if(checkFlag ()){
					num += 1;
					ajax({
						type: "get",
						url: 'https://api.imjad.cn/cloudmusic/?type=search&limit=40&offset='+num+'&s='+loc,
						asyn: true,
						success: function (data){
							news(data);
						}
				})
			}
		}
	}
	
			
	

		oParent.onclick = function (ev){
		var oEvent = ev||window.event;
		var target = oEvent.target||oEvent.srcElement;
		if(target.nodeName.toLowerCase() == "img"){
			ajax({
				type: "get",
				url: 'https://api.imjad.cn/cloudmusic/?type=song&id='+target.getAttribute("data-id")+"&br=128000",
				asyn: true,
				success: function (data){
					oAudio.setAttribute('src',data.data[0].url);		
				}
			})
		}
			oRoundPic.setAttribute("src",target.getAttribute("src"));
			oRoundPic.style.animation = "ringDown 8s linear infinite";
			oSpan1.innerHTML = target.getAttribute("title");
			oSpan2.innerHTML = target.getAttribute("artist");
			oSpan3.innerHTML = target.getAttribute("album");
			
			setInterval(function (){
				if(oAudio.paused){
//						console.log("暂停！！");
					oRoundPic.style.animation = "ringDown 8s linear infinite paused";
					}
			},500)
			
			setInterval(function (){
					if(!oAudio.paused){
//						console.log("bu暂停！！");
						oRoundPic.style.animation = "ringDown 8s linear infinite";
						}
				},500)

	}
		
		
}



// 自定义函数部分


	function news(data){		
			var oParent  = document.getElementById("box");
		for(var i=0; i<data.result.songs.length; i++){
			var oDiv = document.createElement("div");
			oDiv.className = "pic-box";
			var oLi = document.createElement("li");
			oLi.className = "cen";
			var oImg = document.createElement("img");			
			var oP = document.createElement("p");
			oP.innerHTML = data.result.songs[i].name;
			oImg.setAttribute('src',data.result.songs[i].al.picUrl);
			oImg.setAttribute('data-id',data.result.songs[i].id);
			oImg.setAttribute('title',data.result.songs[i].name);
			oImg.setAttribute('artist',data.result.songs[i].ar[0].name);
			oImg.setAttribute('album',data.result.songs[i].al.name);
			oDiv.appendChild(oImg);
			oDiv.appendChild(oP);
			oLi.appendChild(oDiv);
			oParent.appendChild(oLi);
		}
		imgLocation("box","cen");
	}


function checkFlag (){
	var oParent  = document.getElementById("box");
	var aContent = getChildElements (oParent,"cen");
	var lastContentHeight = aContent[aContent.length-1].offsetTop;
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	var viewHeight = document.documentElement.clientHeight||document.body.clientHeight;
//	console.error(viewHeight,scrollTop);
	if(lastContentHeight<scrollTop+viewHeight){
		return true;
	}
}	
	
	

//获取所有的图片
function imgLocation (parent,content){
	//将parent下所有content取出
	var oParent  = document.getElementById(parent);
	var aContent = getChildElements (oParent,content);
	var imgWidth = aContent[0].offsetWidth;
	var num = Math.floor(document.documentElement.clientWidth/imgWidth);
	//动态设置box的宽度 并 让其居中
//	oParent.style.cssText = "width:"+imgWidth*num+"px;margin: 0 auto";
	//动态设置wrap的宽度 并 让其居中
	var oWrap = document.getElementById("wrapSong");
	oWrap.style.cssText = "width:"+imgWidth*num+"px;margin: 0 auto";
	
	var boxHeightAll = [];
	for(var i=0; i<aContent.length; i++){
//		console.log(aContent.length);
		if(i<num){                           //i的值从零开始，取到num,并将值存到boxall
			boxHeightAll[i] = aContent[i].offsetHeight;
		}else{    //当循环过了 num的值，取出 boxHeightAll里的最小值
			var minHeight = Math.min.apply(null,boxHeightAll);
			var minIndex = getMinHeightLocation(boxHeightAll,minHeight);
			aContent[i].style.position = "absolute";
			aContent[i].style.top = minHeight + "px";
			aContent[i].style.left = aContent[minIndex].offsetLeft + "px";
			boxHeightAll[minIndex] = boxHeightAll[minIndex] + aContent[i].offsetHeight;
		}
	}
}
	
//找出最小高度在boxHeightAll中的位置
	function getMinHeightLocation(boxHeightAll,minHeight){
		for(var i in boxHeightAll){
			if(boxHeightAll[i] == minHeight){
				return i;
			}
		}
	}
	
//获取将parent下所有content
function getChildElements (parent,content){
	var contentArr = [];
	var allContent = parent.getElementsByTagName("*");
	for(var i=0; i<allContent.length; i++){
		if(allContent[i].className == content){
			contentArr.push(allContent[i]);
		}
	}
	return contentArr;
}

//$(function (){
//		$(window).scroll(function (){
//		if($(this).scrollTop()>300){
//			$("#back").fadeIn(200);
//		}else{
//			$("#back").fadeOut(200);
//		}
//	})
//	$("#back").click(function (){
//		$("html,body").animate({scrollTop:"0"},1000);
//	});
//})