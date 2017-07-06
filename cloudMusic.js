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
				
//				alert(oIndexTxt.value);
				oForm.setAttribute("action","file:///Users/jiangzhou/Desktop/%E7%80%91%E5%B8%83%E6%B5%81/cloudMusicSong.html");			
				
				
//				alert(oForm.getAttribute("action"));
				
//				alert(oIndexTxt.value);
//				ajax({
//					type: "get",
//					url: 'https://api.imjad.cn/cloudmusic/?type=search&s='+oTxt.value,
//					asyn: true,
//					success: function (data){
//						news(data);
//					}
//				})
				
				
				
				
			}
			
//			function news(data){		
//						var oParent  = document.getElementById("box");
//					for(var i=0; i<data.result.songs.length; i++){
//						var oDiv = document.createElement("div");
//						oDiv.className = "pic-box";
//						var oLi = document.createElement("li");
//						oLi.className = "cen";
//						var oImg = document.createElement("img");			
//						var oP = document.createElement("p");
//						oP.innerHTML = data.result.songs[i].name;
//						oImg.setAttribute('src',data.result.songs[i].al.picUrl);
//						oImg.setAttribute('data-id',data.result.songs[i].id);
//						oImg.setAttribute('title',data.result.songs[i].name);
//						oImg.setAttribute('artist',data.result.songs[i].ar[0].name);
//						oImg.setAttribute('album',data.result.songs[i].al.name);
//						oDiv.appendChild(oImg);
//						oDiv.appendChild(oP);
//						oLi.appendChild(oDiv);
//						oParent.appendChild(oLi);
//					}
//					imgLocation("box","cen");
//				}
			
		
		
		
		
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
					}
				}else{
						oAudio.pause();
				}
				
			}
			
			
//				oUl.onclick = function (ev){
//				var oEvent = ev||window.event;
//				var target = oEvent.target||oEvent.srcElement;
//				if(target.nodeName.toLowerCase() == "img"){
////					alert(target.getAttribute("data-id"));
//					ajax({
//						type: "get",
//						url: 'https://api.imjad.cn/cloudmusic/?type=mv&id='+target.getAttribute("data-id"),
//						asyn: true,
//						success: function (data){
////							alert(data.data.brs["240"]);
//							oVideo.setAttribute('src',data.data.brs["240"]);
//						}
//					})
//					
//				}
//			}
			
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
			
//			var sta1 = 1;
//				oLi1.onclick = function (){
//				if(oAudio.paused){
//					ajax({
//					type: "get",
//					url: 'https://api.imjad.cn/cloudmusic/?type=song&id=85491',
//					asyn: true,
//					success: function (data){
//						oAudio.setAttribute('src',data.data[0].url);	
//					}
//				})
//						oAudio.play();
//				}else{
//					oAudio.pause();
////					sta = 1;
//				}
//		}
					
					
				
				
		
		}