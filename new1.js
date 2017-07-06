window.onload = function(){
	var oBtn = document.getElementById("btn");
	var oTxt = document.getElementById("txt");
	var oBox = document.getElementById("box");
	var oVideo = document.getElementById("video");

	imgLocation("box","cen");

	window.onscroll = function (){

	}
}
	
	
function checkFlag (){
	var oParent  = document.getElementById(parent);
	var aContent = getChildElements (oParent,content);
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
	oParent.style.cssText = "width:"+imgWidth*num+"px;margin: 0 auto";
	//动态设置wrap的宽度 并 让其居中
	var oWrap = document.getElementById("wrap");
	oWrap.style.cssText = "width:"+imgWidth*num+"px;margin: 0 auto";
	
	var boxHeightAll = [];
	for(var i=0; i<aContent.length; i++){
//		alert(aContent.length);
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