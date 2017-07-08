window.onload = function(){
	var oBtn = document.getElementById("btnMv");
	var oTxt = document.getElementById("inpMv");
	var oVideo = document.getElementById("video");
	var oParent  = document.getElementById("box");
	var oMvInfo = document.getElementById("MvInfo");
	var oSource = document.getElementById("source");
	var timer = null;
	var set = null;
	
	var str = window.location.search;
	var loc = str.substring(str.lastIndexOf('=')+1, str.length); 
	
	var oBack  = document.getElementById("back");
	
	
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
						url: 'https://api.imjad.cn/cloudmusic/?type=search&limit=100&s='+oTxt.value,
						asyn: true,
						success: function (data){
							news(data);
						}
					})
			var num =0;
			window.addEventListener("scroll",function (){
						if(checkFlag ()){
							num += 1;
							ajax({
								type: "get",
								url: 'https://api.imjad.cn/cloudmusic/?type=search&limit=100&offset='+num+'&s='+oTxt.value,
								asyn: true,
								success: function (data){
									news(data);
								}
						})
					}
			},false)
	}

	oParent.onclick = function (ev){
		oSource.innerHTML = "";
				var oEvent = ev||window.event;
				var target = oEvent.target||oEvent.srcElement;
				if(target.nodeName.toLowerCase() == "img"){
					ajax({
						type: "get",
						url: 'https://api.imjad.cn/cloudmusic/?type=mv&id='+target.getAttribute("data-id"),
						asyn: true,
						success: function (data){
							oVideo.setAttribute('src',data.data.brs["240"]);
							for(var i in data.data.brs){
//										console.log(i);
								var oLi = document.createElement("li");
								if(i == "240"){
									oLi.innerHTML = "标清";
								}
								if(i == "480"){
									oLi.innerHTML = "高清";
								}
								if(i == "720"){
									oLi.innerHTML = "超清";
								}
								if(i == "1080"){
									oLi.innerHTML = "1080P";
								}
								oSource.appendChild(oLi);
							}
							
						var oLiL = oSource.getElementsByTagName("li");
							for(var j=0; j<oLiL.length; j++){
								oLiL[0].style.background = "#ccc";
								oLiL[j].onclick = function (){
									for(var j=0; j<oLiL.length; j++){
										oLiL[j].style.background = "";
									}
									var centr = this.innerHTML;
									if(centr == "标清"){
										oVideo.setAttribute('src',data.data.brs["240"]);
										this.style.background = "#ccc";
									}
									if(centr == "高清"){
										oVideo.setAttribute('src',data.data.brs["480"]);
										this.style.background = "#ccc";
									}
									if(centr == "超清"){
										oVideo.setAttribute('src',data.data.brs["720"]);
										this.style.background = "#ccc";
									}
									if(centr == "1080P"){
										oVideo.setAttribute('src',data.data.brs["1080"]);
										this.style.background = "#ccc";
									}
								}
							}
							
						}
					})
				}
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
						url: 'https://api.imjad.cn/cloudmusic/?type=search&limit=100&offset='+num+'&s='+loc,
						asyn: true,
						success: function (data){
							news(data);
						}
				})
			}
		}
	}
	
			
	
	
	
	//视频源切换弹出框
	oSource.onmouseover = oVideo.onmouseover=function(){
			 clearInterval(timer);
			 timer=setInterval(function(){
					if(oSource.offsetLeft<720){
						 oSource.style.left = oSource.offsetLeft+10+'px'; 
					}
			},30)
	}
            
	 oSource.onmouseout = oVideo.onmouseout=function(){
				 clearInterval(timer);
			 timer = setInterval(function(){
					if(oSource.offsetLeft>660){
						 oSource.style.left = oSource.offsetLeft-10+'px'; 
					}
			},30)
	}
	 
	 	//回到顶部部分
		
		window.addEventListener("scroll",function (){
				var viewHeight = document.documentElement.clientHeight||document.body.clientHeight;
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
				if(scrollTop >= viewHeight){
					oBack.style.display = "block";
				}else{
					oBack.style.display = "none";
				}
			},false)
	
			oBack.onclick = function (){
				set=setInterval(function (){
					var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
					var speed = scrollTop/5;
					document.body.scrollTop -= speed;
					if(scrollTop == 0){
						clearInterval(set);
					}
				},30)
			}
	 
}


// 自定义函数部分


			function news(data){
				var oParent  = document.getElementById("box");
				for(var i=0; i<data.result.songs.length; i++){
					if(data.result.songs[i].mv != 0){
							var oDiv = document.createElement("div");
							oDiv.className = "pic-box";
							var oLi = document.createElement("li");
							oLi.className = "cen";
							var oImg = document.createElement("img");			
							var oP = document.createElement("p");
							oP.innerHTML = data.result.songs[i].name;
							oImg.setAttribute('src',data.result.songs[i].al.picUrl);
							oImg.setAttribute('data-id',data.result.songs[i].mv);
							oDiv.appendChild(oImg);
							oDiv.appendChild(oP);
							oLi.appendChild(oDiv);
							oParent.appendChild(oLi);
						}
					}
				imgLocation("box","cen");
			}


function checkFlag (){
	var oParent  = document.getElementById("box");
	var aContent = getChildElements (oParent,"cen");
	var lastContentHeight = aContent[aContent.length-1].offsetTop;
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	var viewHeight = document.documentElement.clientHeight||document.body.clientHeight;
	
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
	var oWrap = document.getElementById("wrapMv");
	var oMvInfo = document.getElementById("MvInfo");
	oWrap.style.cssText = "width:"+imgWidth*num+"px;margin: 0 auto";
	oMvInfo.style.cssText = "width:"+imgWidth*num+"px;margin: 0 auto";
	
	
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