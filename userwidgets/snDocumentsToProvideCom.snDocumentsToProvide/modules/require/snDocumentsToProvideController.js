define(function() {

  var fileTypes = ["image/jpeg", "image/tiff", "application/pdf"]; 
  var fileType = "";
  var gblWidth = "";
  var data = [];
  var TotalFileSize = 0;

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.flxMainContainer.flxScrollGroupDocuments.sgmDocumentsUploaded.setData(data);
      this.view.btnBrowse.onClick = this.browseDocuments;
      this.view.flxUploadedFile.isVisible = false;
      this.view.CheckBoxGroupARFormAttached.onSelection = this.onCheckBoxGroupARFormAttached;
      this.view.lblHint.text = "* This will allow multiple documents (limit 10) to be uploaded (max "+gblFileMaxUploadSize+" MB total) and attached to the hearing request.";
      this.view.flxBtnDel.onTouchEnd = this.removeDocument;
      if(gblIsARUser) {
        this.view.CheckBoxGroupARFormAttached.isVisible = true; 
        var CheckBoxObject = [["cbg1","To proceed with the hearing request, the AR must upload an Authorized Representative Form signed by the Appellant.", accessibilityConfig={"a11yHidden": false, "a11yLabel": "To proceed with the hearing request, the AR must upload an Authorized Representative Form signed by the Appellant.", "a11yHint": "", "a11yIndex": 0}]];
        this.view.CheckBoxGroupARFormAttached.masterData = CheckBoxObject;  
        this.view.btnMissingDocuments.isVisible = false;
      }
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1); 
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    setComponentData: function() {
      gblARFormAttached = false;
      this.view.CheckBoxGroupARFormAttached.selectedKeys = null;
      var data = hearingRequest.uploadDocuments;
      TotalFileSize = 0;
      for(var p = 0; p < data.length; p++) {
        var fileDetail = data[p];
        TotalFileSize = TotalFileSize + fileDetail.fileContent.length;
      }
      this.view.lblAgrreateFileSize.text = "Total file size: " + bytesToSize(TotalFileSize);
      this.view.flxMainContainer.flxScrollGroupDocuments.sgmDocumentsUploaded.setData(data);         
    },
    onCheckBoxGroupARFormAttached: function(){
      gblARFormAttached = this.view.CheckBoxGroupARFormAttached.selectedKeys !== null;
    },
    onBreakpointChange: function(form, width){
      try{
      gblWidth = width;
      if(width <= gblBreakPoint) {
        this.view.lblTitle1.skin   = 'sknLblGrayishDark115Mobile';
        this.view.lblTextDesc.skin = 'sknLblBlackModerate100Mobile';
        this.view.lblDateUpl.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        this.view.lblAgrreateFileSize.skin = 'sknLblBlackReg100Mobile';
        this.view.sgmDocumentsUploaded.rowTemplate = 'flxsgmDocumentsMobile';
        this.view.lblTextDesc.left = '0%';
        this.view.lblDateUpl.right = '45px';
        this.view.imgToUpload.isVisible = false;
        this.view.flxMainContainer.height = '240dp';
        this.view.flxUploadedFile.height = '60px';
        this.view.CheckBoxGroupARFormAttached.height = '75px';
      }
      else {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        this.view.lblTextDesc.skin = 'sknLblBlackModerate100';
        this.view.lblDateUpl.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.lblAgrreateFileSize.skin = 'sknLblBlackReg100';
        this.view.sgmDocumentsUploaded.rowTemplate = 'flxsgmDocuments';
        this.view.lblTextDesc.left = '2px';
        this.view.lblDateUpl.right = '60px';
        this.view.imgToUpload.isVisible = true;
        this.view.flxMainContainer.height = '320dp';
        this.view.flxUploadedFile.height = '50px';
        this.view.CheckBoxGroupARFormAttached.height = '50px';
      }
      this.view.forceLayout();
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },    
    setDocumentTypes:function() {
    if(gblDocumentTypes !== undefined && gblDocumentTypes.length > 0) {
      var questionlength = gblDocumentTypes.length;

      if(questionlength > 0) {

        var radioButtonData = [];
        for(var j = 0; j < questionlength; j++) {
          var descriptionChoice = [];
          descriptionChoice.push(gblDocumentTypes[j].DocumentId);
          descriptionChoice.push(gblDocumentTypes[j].DocumentDescription);
          radioButtonData.push(descriptionChoice);
        }

        this.view.RadioButtonGroup.masterData = radioButtonData;
        this.view.RadioButtonGroup.selectedKey = "";
        if(this.params.Type)
          this.view.RadioButtonGroup.selectedKey= this.params.Type;

      }
    }
    else {
      this.getDocumentsList();
    }

  },

  getDocumentsList :function(){
    operationName = "getComplianceDocumentListByAppealIdAndHatsUserId";
    var data = {"appealId": gblSelectedAppealId,"hatsUserId": testHatsUserId};   
    var headers = {};
    var serviceName = "appellantServices";
    var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    integrationObj.invokeOperation(operationName, headers, data, this.getDocumentsListSuccess, this.getDocumentsListFailure);
  }, 


  getDocumentsListSuccess:function(response){
    if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
      response.errorMessage = apiErrors.errDocumentTypeList;
      response.userAction = apiActions.actionNull;
      navigateToErrorPage(response);  
    }
    else
    {
      if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
        response.errorStatus = response.errorStatus;
        response.userAction = apiActions.actionWait;
        navigateToErrorPage(response);  
      }
      else 
      {    
        if(response !== undefined && response.availableComplianceDocuments !== undefined && response.availableComplianceDocuments.length > 0) {
          gblDocumentTypes = response.availableComplianceDocuments;
          this.setDocumentTypes();
        }
      }
    }
  },

  getDocumentsListFailure:function(error){
    alert("Unable to get Compliance Document Type list");
    resetFlow();
    var ntf = new kony.mvc.Navigation("frmAppealDetails");
    ntf.navigate();
  },
    browseDocuments:function() {
      var browseConfig = {
        selectMultipleFiles: false,        
        filter: fileTypes
      };
      kony.io.FileSystem.browse(browseConfig, this.browseCallBack);
    },
    
    removeDocument:function() {
      hearingRequest.uploadDocument = "";
      this.view.lblTextDesc.text = "";
      gblUploadedFileName = "";
      gblARFormAttached = false;
      hearingRequest.uploadDocument = "";
      this.view.flxUploadedFile.setVisibility(false);
      this.view.btnMissingDocuments.setVisibility(true);
      this.view.forceLayout();      
    },
    
    previewDocument:function() {
      displayDocument(hearingRequest.uploadDocument, "Document Preview", fileType);  
    },
    
    browseCallBack:function(event, filesList) {
      var file = filesList[0].file;
      var fileName = file.name;
      var fileSize = file.size;
      fileType = file.type;
      var prefix = "data:" + fileType + ";base64,";
      var reader = null;
      var self = this;

      var indexOfFileType = fileTypes.indexOf(fileType);
      if(indexOfFileType !== -1) {
        reader = new FileReader();
        reader.addEventListener("load", function() {
          if(reader.result !== null && reader.result !== undefined) {
            var readResult = reader.result;
            if(readResult.includes(prefix)) {
              var splitResult = readResult.split(prefix);
              readResult = splitResult[1];
            }
            hearingRequest.uploadDocument = readResult;
            //alert(hearingRequest.uploadDocument);
            self.setFileName(fileName, readResult);
          }
        });
      }
      else {
        alert("Upload a document whose file type is PDF, JPEG, or TIFF.");
      }

      if (file) {
        reader.readAsDataURL(file);
      } 

    },
    removeSegmentDocument:function(scope, index) {
      var selectedRow = this.view.sgmDocumentsUploaded.selectedRowItems[0];  

      var dataRows = [];
      var hearingData = [];
      lstFiles = this.view.sgmDocumentsUploaded.data;
      TotalFileSize = 0;
      for(var p = 0; p < lstFiles.length; p++) {
        var fileDetail = lstFiles[p];
        // alert(JSON.stringify(fileDetail));
        if (selectedRow !== fileDetail) {
          TotalFileSize = TotalFileSize + fileDetail.fileContent.length;
          var row = {"lblTextFileName": fileDetail.lblTextFileName,
                     "fileName": fileDetail.lblTextFileName,
                     "lblDateUpl": "Added", 
                     "fileContent": fileDetail.fileContent,
                     "lblTextFileSize": fileDetail.lblTextFileSize,
                     "btnMgIconDel": {onClick: this.removeSegmentDocument.bind(this, "index")},
                     "flxBtnDel": {onClick: this.removeSegmentDocument.bind(this, "index")}
                    };
          dataRows.push(row);
          hearingData.push(row);
        }
        
        this.view.lblAgrreateFileSize.text = "Total file size: " + bytesToSize(TotalFileSize);
      }
      if (dataRows.length === 0){
        gblUploadedFileName = "";
      }
      gblARFormAttached = false;
      this.view.CheckBoxGroupARFormAttached.selectedKeys = null;
      this.view.flxMainContainer.flxScrollGroupDocuments.sgmDocumentsUploaded.setData(dataRows);
      hearingRequest.uploadDocuments = hearingData;
      if (gblIsARUser === false) {
        this.view.btnMissingDocuments.isVisible = hearingRequest.uploadDocuments.length === 0 ;
      }
    },
    setFileName:function(fileName, fileContent) {
      if (hearingRequest.uploadDocuments.length === 10) {
        alert("Adding this document: "+'"'+fileName+ '"'+" would exceed the max of 10 files allowed to be uploaded.");
      }
      else {
        if (TotalFileSize + fileContent.length <= gblFileMaxUploadSize * 1024000)
        {
          var data = this.view.flxMainContainer.flxScrollGroupDocuments.sgmDocumentsUploaded.data;
          var row = {"lblTextFileName": fileName,
                     "fileName": fileName,
                     "lblDateUpl": "Added", 
                     "fileContent": fileContent, 
                     "lblTextFileSize": bytesToSize(fileContent.length), 
                     "btnMgIconDel": {onClick: this.removeSegmentDocument.bind(this, "index")}, 
                     "flxBtnDel": {onClick: this.removeSegmentDocument.bind(this, "index")}
                    };

          data.push(row);
          TotalFileSize = TotalFileSize + fileContent.length;
          this.view.lblAgrreateFileSize.text = "Total file size: " + bytesToSize(TotalFileSize);
          this.view.flxMainContainer.flxScrollGroupDocuments.sgmDocumentsUploaded.setData(data);
          hearingRequest.uploadDocuments = data;
          this.view.sgmDocumentsUploaded.setVisibility(true);
          gblUploadedFileName = fileName;
          this.view.lblTextDesc.text = fileName;
        }
        else {
          currentFrm.view.puInformationDialog.flxContainerInfoHeight = '190px';
          currentFrm.view.puInformationDialog.lblTitleText = "Total File size too large";
          currentFrm.view.puInformationDialog.lblDescText = "Adding this document: "+'"'+fileName+ '"'+", with a file size of " + bytesToSize(fileContent.length) + ", would exceed the total allowable file size of "+gblFileMaxUploadSize+" MB.\n\nPlease remove a file uploaded or reduce the file size to be lesser than "+ gblFileMaxUploadSize + " MB.";
          currentFrm.view.puInformationDialog.isVisible = true; 
          currentFrm.view.forceLayout();
        }
      }
      //this.view.flxUploadedFile.setVisibility(true);
      //this.view.btnMissingDocuments.setVisibility(false);
      if (gblIsARUser === false) {
        this.view.btnMissingDocuments.isVisible = hearingRequest.uploadDocuments.length === 0 ;
      }
      this.view.forceLayout();
    },
   };
});