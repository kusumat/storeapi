//Type your code here for Local Store APIs

function setItem(){
  var setKey   = frmLocalStoreAPI.txtKey1.text;
  var setValue = frmLocalStoreAPI.txtValue1.text;
  if(setKey !== ""){
    kony.store.setItem(setKey, setValue);
  	frmLocalStoreAPI.lblOutput.text = "Set Item complete!";
    frmLocalStoreAPI.txtKey1.text = "";
    frmLocalStoreAPI.txtValue1.text = "";
 
 }
  else
    frmLocalStoreAPI.lblOutput.text = "Couldn't set item. key is void.";
}
function getItem(){
  var getKey = frmLocalStoreAPI.txtKey2.text;
  if(getKey !== ""){
    var outputValue = kony.store.getItem(getKey);
    if(outputValue !== null){
      frmLocalStoreAPI.txtValue2.text = outputValue;
      frmLocalStoreAPI.lblOutput.text = "Get Item complete!";
    }
    else
	  	frmLocalStoreAPI.lblOutput.text = "Couldn't find item "+getKey+" you were looking for.";
  }
  else
    frmLocalStoreAPI.lblOutput.text = "Couldn't get item. key is void.";
}
function removeItem(){
  var removeKey = frmLocalStoreAPI.txtKey3.text;
  if(removeKey !== ""){
    var outputValue = kony.store.getItem(removeKey);
    if(outputValue !== null){
      kony.store.removeItem(removeKey);
      frmLocalStoreAPI.lblOutput.text = "Item "+removeKey+" has been removed.";
    }
    else
	  	frmLocalStoreAPI.lblOutput.text = "Couldn't find item "+removeKey+" you were looking for.";
  }
  else
    frmLocalStoreAPI.lblOutput.text = "Can't remove item. Key is void.";
}
function length(){
	var mylength = kony.store.length();
  	frmLocalStoreAPI.lblOutput.text = "Length of the Store is: "+mylength;

}  
function clear(){
  try {
    kony.store.clear();
    frmLocalStoreAPI.txtKey1.text = "";
    frmLocalStoreAPI.txtKey2.text = "";
    frmLocalStoreAPI.txtKey3.text = "";
    frmLocalStoreAPI.txtKey4.text = "";
    frmLocalStoreAPI.txtValue1.text = "";
    frmLocalStoreAPI.txtValue2.text = "";
    frmLocalStoreAPI.lblOutput.text = "";
    //alert("store is cleared");
    frmLocalStoreAPI.lblOutput.text = "store is cleared";
  } catch (err) {
    alert("error occurred in clear() and the error is :" + err);
  }
}
function key(){
  var index = kony.os.toNumber(frmLocalStoreAPI.txtKey4.text);
  var keyName = kony.store.key(index);
  if(keyName !== null)
  	frmLocalStoreAPI.lblOutput.text = "Key at index: "+ index +" is "+keyName;
  else
    frmLocalStoreAPI.lblOutput.text = "Key not found.";
}