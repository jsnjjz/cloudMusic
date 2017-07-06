
		var $  = function(id){return document.getElementById(id);};  
		var _video = $("testVideo");  

		//视频列表  
var playList = {  
				current : 0,  
				list : ["画江湖之灵主.ogg","war3.ogg","movie.ogv","trailer.webm","trailer.ogv"]  
		}  

		var videoUtil = {  
				//播放  
				play : function(){  
						_video.play();  
				},  
				//暂停  
				pause : function(){  
						_video.pause();  
				},  
				//停止  
				stop : function(){  
						_video.currentTime = 0;  
						_video.pause();  
				},  
				//下一个视频  
				next : function(){  
						if(playList.current == playList.list.length-1){  
								playList.current = 0;  
						}else{  
								playList.current++;  
						}  
						_video.src=playList.list[playList.current];  
						_video.play();  
				},  
				//前一个视频  
				prev : function(){  
						if(playList.current == 0){  
								playList.current = palyList.list.length-1;  
						}else{  
								playList.current--;  
						}  
						_video.src=playList.list[playList.current];  
						_video.play();  
				},  
				//加大声音,每次加大1/10  
				upVolume : function(){  
						_video.volume += 0.1;  
				},  
				//减小声音，每次减小1/10  
				downVolume : function(){  
						_video.volume -= 0.1;  
				},  
				//翻倍加快播放速度  
				fastFoward : function(){  
						//FF不支持playbackRate  
		if(_video.playbackRate){  
								_video.playbackRate = _video.playbackRate*2;  
						}else{  
								alert("对不起，你的浏览器不支持改变播放速度！");  
						}  

				},  
				//降低播放速度  
				fastBackward : function(){  
						if(_video.playbackRate){  
								_video.playbackRate = _video.playbackRate/2;  
						}else{  
								alert("对不起，你的浏览器不支持改变播放速度！");  
						}  
				},  
				//跳转到指定时间点播放  
				locate : function(){  
						var min = $("min").value;  
						var sec = $("sec").value;  
						var time = parseInt(min)*60+parseInt(sec);  
						_video.currentTime = time;  
						_video.play();  
				},  
				bindEvent : function(){  
						var self = this;  

						//绑定页面上各个按钮的事件  
		var btns = document.getElementsByTagName("button");  
						for(var i = 0 ;i < btns.length ; i++){  
								var el = btns[i];  
								el.onclick = self[el.id];  
						}  

						//播放完毕自动播放下一个  
						_video.onended = function(){  
								 var event = document.createEvent("HTMLEvents");  
								event.initEvent('click', true, true);  
								$("next").dispatchEvent(event);  
						}  

						//循环检查视频的当前状态  
						setInterval(function(){  
								var speed = _video.playbackRate||1;  
								var movie = "movie"+playList.current;  
								var volume = parseInt(_video.volume*100);  
								$("currentMovie").innerHTML = movie;  
								$("currentSpeed").innerHTML = speed+"X";  
								$("currentVolume").innerHTML = volume;  
						},200);  

				}  
		};  

		window.onload = function(){  
				videoUtil.bindEvent();  
		}  
