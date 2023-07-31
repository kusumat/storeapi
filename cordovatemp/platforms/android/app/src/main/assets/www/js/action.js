var konyapi = function() {
    var arr = [];
    arr.push("one");
    arr.push("two");
	kony.evaluateJavaScriptInNativeContext("alert",JSON.stringify(arr));
};

var userdefined = function() {
      var arr = [];
  	kony.evaluateJavaScriptInNativeContext("userdefined",arr);
};

var invalid = function() {
	kony.evaluateJavaScriptInNativeContext("invalid","");
};

var arrayasargs = function() {
	var arr = [];
  	arr.push("one");
    arr.push("two");
	kony.evaluateJavaScriptInNativeContext("arrayasargs",JSON.stringify(arr));
};

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "200px";
    viewport.style.left = "50px";
    document.getElementById("test_img").src = data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50
    });
}

function showMsg(){
	alert("hello world ");
}

function showUA(){
	alert("userAgent "+navigator.userAgent);
}
	
