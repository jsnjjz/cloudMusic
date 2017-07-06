function ajax(option){
	var type = option.type;
	var url = option.url;
	var asyn = option.asyn;
	var success = option.success;
	

		var xml = null;
	if(window.XMLHttpRequest){
		 xml = new XMLHttpRequest();
	}else {
		 xml = new ActiveXObject("Microsoft.XMLHttp");
	}
	xml.open(type,url,asyn);

	xml.send();

	xml.onreadystatechange = function (){
		if(xml.readyState == 4){
			if(xml.status == 200){
				success&&success(JSON.parse(xml.responseText));
			}
		}

	}
}