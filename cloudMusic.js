	window.onload = function(){
			var oAudio = document.getElementById("audio");

			var oSong = document.getElementById("song");
			var oMv = document.getElementById("mv");
			var oIndexTxt = document.getElementById("indexTXt");
		
			var oForm = document.getElementById("search");
			var oUl = document.getElementById("ul");
			var oLi = document.getElementById("li");	
			
			oSong.onclick = function () {
				if(oIndexTxt.value == ""){
					alert("空！！！");
					return false;
				}													 				 
				oForm.setAttribute("action","file:///Users/jiangzhou/Desktop/%E4%BA%91%E9%9F%B3%E4%B9%90/cloudMusicSong.html");			
	
			}
			
			oMv.onclick = function () {
				if(oIndexTxt.value == ""){
					alert("空！！！");
					return false;
				}													 				 
				oForm.setAttribute("action","file:///Users/jiangzhou/Desktop/%E4%BA%91%E9%9F%B3%E4%B9%90/cloundMusicMv.html");			
	
			}


			oUl.onclick = function (ev){
				var oEvent = ev||window.event;
				var target = oEvent.target||oEvent.srcElement;
				if(oAudio.paused){
							 if(target.nodeName.toLowerCase() == "img"){
						ajax({
							type: "get",
							url: 'https://api.imjad.cn/cloudmusic/?type=song&id='+target.getAttribute("data-id")+"&br=128000",
							asyn: true,
							success: function (data){
								oAudio.setAttribute('src',data.data[0].url);		
							}
						})
								 
//								 target.parentNode.nextElementSibling.children[0]		
								 
					}
				}else{
						oAudio.pause();
				}

				
				oAudio.onended = function (){
					ajax({
						type: "get",
						url: 'https://api.imjad.cn/cloudmusic/?type=song&id='+target.parentNode.nextElementSibling.children[0].getAttribute("data-id")+"&br=128000",
						asyn: true,
						success: function (data){
							oAudio.setAttribute('src',data.data[0].url);		
						}
					})
				}	
			}
			
			
//		    var sta = 1;
//			oLi.onclick = function (){
//				if(oAudio.paused){
//					ajax({
//					type: "get",
//					url: 'https://api.imjad.cn/cloudmusic/?type=song&id=29947420',
//					asyn: true,
//					success: function (data){
//						oAudio.setAttribute('src',data.data[0].url);	
//					}
//						
//				})
////					alert(oAudio.paused);
////						sta = 0;
//					oAudio.play();
//				}else{
//					oAudio.pause();
////					sta = 1;
////					alert(oAudio.paused);
//					
//				}
//		}
			

		}
	
	
	
	