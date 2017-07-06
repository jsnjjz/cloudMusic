window.onload = function(){
	imgLocation("container","box");
	var imgData = {"data":[{"src":"images/1.jpg"},{"src":"images/2.jpg"},{"src":"images/3.jpg"},{"src":"images/4.jpg"},{"src":"images/5.jpg"},{"src":"images/6.jpg"}]}
	
	window.onresize = function (){

			imgLocation("container","box");
	
	}
	
	window.onscroll = function(){
		if(checkFlag ()){
			var oParent = document.getElementById("container");
			for(var i = 0; i<imgData.data.length; i++){
				var aContent = document.createElement("div");
				aContent.className = "box";
				oParent.appendChild(aContent);
				var oBoxing = document.createElement("div");
				oBoxing.className = "pic";
				aContent.appendChild(oBoxing);
				var oImg = document.createElement("img");
				oImg.src = imgData.data[i].src;
				oBoxing.appendChild(oImg);
			}
			imgLocation("container","box");
		}
		
	}
	
	
	
}
function checkFlag(){
	var oParent = document.getElementById("container");
	var aContent = getChildElement(oParent,"box");
	var lastContentHeight = aContent[aContent.length - 1].offsetTop;
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
	if(lastContentHeight<scrollTop+pageHeight){
		return true;
	}
}

function imgLocation(parent,content){
	//将parent下的所有内容（content）全部取出 
	var oParent = document.getElementById(parent);
	var aContent = getChildElement(oParent,content);
	var imgWidth = aContent[0].offsetWidth;
	var num = Math.floor(document.documentElement.clientWidth / imgWidth);
	oParent.style.cssText = "width:"+imgWidth*num+"px;margin:0 auto";
	
	var boxHeightArr = [];
	for(var i=0; i<aContent.length; i++){
		if(i<num){
			boxHeightArr[i] = aContent[i].offsetHeight;
		}else{
			var minHeight = Math.min.apply(null,boxHeightArr);
			var minIndex = getMinHeightLocation(boxHeightArr,minHeight);
			aContent[i].style.position = "absolute";
			aContent[i].style.top = minHeight+"px";
			aContent[i].style.left = aContent[minIndex].offsetLeft+"px";
			boxHeightArr[minIndex] = boxHeightArr[minIndex]+aContent[i].offsetHeight;
		}
	}
	
}


function getMinHeightLocation(boxHeightArr,minHeight){
	for(var i in boxHeightArr){
		if(boxHeightArr[i] == minHeight){
			return i;
		}
	}
}


function getChildElement(parent,content){
	var contentArr = [];
	var allcontent = parent.getElementsByTagName("*");
	for(var i=0; i<allcontent.length; i++){
		if(allcontent[i].className == content){
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}