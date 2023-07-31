//The below function is the call back for onSuccess event
function onSuccessCallBck(browser)
{
    alert("onSuccess event triggered");
}

//The below function is the call back for onFailure event
function onFailureCallBck(browser)
{
    alert("onFailure event triggered");
}

function onProgressChangedCallBck46(progress){
  frmCB046.progress.text = "onProgressChanged: "+progress;
}

function onProgressChangedCallBck47(progress){
 frmCB047.progress.text = "onProgressChanged: "+progress;
}

function onProgressChangedCallBck48(progress){
 frmCB048.progress.text = "onProgressChanged: "+progress;
}

//The below function is the call back for handleRequest event
function handleRequestCallBck(browserWidget,params)
{
   alert("handleRequest event triggered");
	return true; //If false is returned, platform will load the originalurl in the browser widget.
}

function onTouchStart(eventobject, x, y){
   alert("onTouchStart event triggered");
}

function onTouchMove(eventobject, x, y){
   alert("onTouchMove event triggered");
}

function onTouchEnd(eventobject, x, y){
   alert("onTouchEnd event triggered");
}

function evalJSAsyncCallBack(result, konyError ){
alert("evalJSAsyncCallBack "+result);
};