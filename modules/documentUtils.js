function displayPDF(documentData, documentTitle){
  var base64PDFData = documentData;
  var title = documentTitle === undefined ? documentTitle.text : documentTitle;
  var datauri = 'data:application/pdf;base64,' + base64PDFData;
  var winHTML = '<html><body><head><title>' + title + '</title></head><object width="100%" height="100%" type="application/pdf" data="' + datauri + '"><embed src="' + datauri + '" type="application/pdf" /></object></body></html>';
 
  //do this condition for the Edge browser
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    var blob = converBase64toBlob(base64PDFData, "application/pdf");
    window.navigator.msSaveOrOpenBlob(blob, title + ".pdf");
  }
  else {
    var win = window.open("", "_blank", "");
    win.document.write(winHTML);
  }   
}

function displayPDFWindow(documentData, documentType, documentTitle, winx, mimeType){
  var base64PDFData = documentData;
  var title = documentTitle === undefined ? documentTitle.text : documentTitle;
  var winHTML = "";
  var a = document.createElement('a');
  
  if (mimeType.includes('pdf', 0) || mimeType.includes('PDF', 0))
  { 
    const binary = atob(base64PDFData.replace(/\s/g, ''));
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i += 1) 
    { 
      view[i] = binary.charCodeAt(i); 
    }
    var ua = kony.os.deviceInfo().userAgent;
    const blob = new Blob([view], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    if (ua.includes("iPhone")||ua.includes("iPad")||ua.includes("OS X")){
      let pdfWindow = window.open();

      pdfWindow.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(base64PDFData) + "'></iframe>"
      );
      pdfWindow.document.title = title;
      return;
    } else {
      if (ua.includes("Android") || (ua.includes("Edg/") && !ua.includes("Windows"))) {
        vDataMIME = "data:application/pdf;base64,";
    	vFileExtension = ".pdf";    
        a.href = vDataMIME + base64PDFData; //Image Base64 Goes here
        a.download = title + vFileExtension; //File name Here
        a.click(); //Downloaded file
        return;
      }
      else {
        winHTML = '<html><body><head><title>' + title + '</title></head><object width="100%" height="100%" type="application/pdf" data="' + url + '"><embed src="' + url + '"/></object></body></html>';
        winx = window.open("", "_blank", "");
        winx.document.write(winHTML);
        return;
      }
    }
  }
  var vDataMIME = 'none';
  var vFileExtension  = 'none';
  if (mimeType.includes('mp3', 0) || mimeType.includes('mpeg', 0)){
    vDataMIME = "data:audio/mp3;base64,";
    vFileExtension = ".mp3";
  }
  if (mimeType.includes('pdf', 0) || mimeType.includes('PDF', 0)){
    vDataMIME = "data:application/pdf;base64,";
    vFileExtension = ".pdf";    
  }
  if (mimeType.includes('audio/mpeg', 0)){
    vDataMIME = "data:audio/mpeg;base64,";
    vFileExtension = ".mpeg";
  }

  if (mimeType.includes('video/mpeg', 0)){
    vDataMIME = "data:video/mpeg;base64,";
    vFileExtension = ".mpeg";
  }
  if (mimeType.includes('tiff', 0))
    {
      vDataMIME = "data:image/tiff;base64,";
      vFileExtension = ".tiff";
    }
  if (mimeType.includes('wav', 0))
  {
    vDataMIME = "data:audio/wav;base64,";
    vFileExtension = ".wav";
  }
  if (mimeType.includes('wma', 0))
  {
    vDataMIME = "data:audio/x-ms-wma;base64,";
    vFileExtension = ".wma";
  }
  if (mimeType.includes('wmv', 0))
  {
    vDataMIME = "data:video/x-ms-wmv;base64,";
    vFileExtension = ".wmv";
  }
  if (mimeType.includes('mp4', 0))
  {
    vDataMIME = "data:video/mp4;base64,";
    vFileExtension = ".mp4";
  }
  if (mimeType.includes('quicktime', 0))
  {
    vDataMIME = "data:video/quicktime;base64,";
    vFileExtension = ".mov";
  }
  if (vDataMIME !== 'none'){
    a.href = vDataMIME + base64PDFData; //Image Base64 Goes here
    a.download = title + vFileExtension; //File name Here
    a.click(); //Downloaded file
  }
}

function AndroidDownloadURI(uri, name) 
{
  var link = document.createElement("a");
  downloadname = name;
  link.setAttribute('download', downloadname);
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();  

  var callSpecificMsg = name + ".pdf Downloaded to your device...";
  currentFrm.view.puInformationDialog.flxContainerInfoHeight = '175px';
  currentFrm.view.puInformationDialog.lblTitleText = "SHARE Document Download";
  currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg; 
  currentFrm.view.puInformationDialog.isVisible = true; 
  currentFrm.view.forceLayout();  
}

function displayDocument(documentData, documentTitle, documentType){
  var base64PDFData = documentData;
  var title = documentTitle === undefined ? "" : documentTitle;
  var datauri = 'data:' + documentType + ';base64,' + base64PDFData;
  var winHTML = '<html><body><head><title>' + title + '</title></head><object width="100%" height="100%" type="' + documentType + '" data="' + datauri + '"><embed src="' + datauri + '" type="' + documentType + '" /></object></body></html>';
  //do this condition for the Edge browser
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    var blob = converBase64toBlob(base64PDFData, "application/pdf");
    window.navigator.msSaveOrOpenBlob(blob, title + ".pdf");
  }
  else {
    var win = window.open("", "_blank", "");
    win.document.write(winHTML);
  }  
}

function converBase64toBlob(content, contentType) {
  contentType = contentType || '';
  var sliceSize = 512;
  var byteCharacters = window.atob(content); //method which converts base64 to binary
  var byteArrays = [
  ];
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  var blob = new Blob(byteArrays, {
    type: contentType
  }); //statement which creates the blob
  return blob;
}