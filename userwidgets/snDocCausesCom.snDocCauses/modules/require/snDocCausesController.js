var docToUpload = "";

define(function() {

  var fileTypes = ["image/jpeg", "image/tiff", "application/pdf"];
  var fileType = "";

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      if (this.view.mgIconDel.src === "edit.png") {
        this.view.btnDeleteDoc.setVisibility(false);
        this.view.btnEditAttachedDoc.setVisibility(true);
      }else{
        this.view.btnDeleteDoc.setVisibility(true);
        this.view.btnEditAttachedDoc.setVisibility(false);
      }
        
      this.view.btnBrowse.onClick = this.browseDocuments;
      this.view.flxUploadedFile.isVisible = false;
      this.view.flxBtnDel.onTouchEnd = this.removeDocument;
      var checkBoxObject = [["I attest that the document that I am uploading is true, accurate, and complete only to the appellant associated with this appeal(s).","I attest that the document that I am uploading is true, accurate, and complete only to the appellant associated with this appeal(s).",accessibilityConfig={"a11yHidden": false, "a11yLabel": "Attestation", "a11yHint": "","a11yIndex": 0}]];
      this.view.checkBoxAttestation.masterData = checkBoxObject;
//       this.view.buttonTest.onClick = this.onTouchEndtxtBoxMoreInfo;
      this.view.txtBoxMoreInfo.onTextChange = this.onTextChange;
      this.view.checkBoxAttestation.onSelection = this.selection;
      this.view.radioButtonContainsHipaaData.onSelection = this.selectHipaaData;
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1); 

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    onTextChange: function () {
      var invalidChars = ["<", ">", "\\", "/","*", ":", "?", "\"" ,"|"];
      var testString = this.view.txtBoxMoreInfo.text;

      if (invalidChars.some(function(v) { return testString.indexOf(v) >= 0; })) {
        currentFrm.view.puInformationDialog.flxContainerInfoHeight = '200px';
        currentFrm.view.puInformationDialog.lblTitleText = "Invalid document title";
        currentFrm.view.puInformationDialog.lblDescText = "A document title can't contain any of the following characters:\n\n\\ / : * ? \" < > |"; 
        currentFrm.view.puInformationDialog.isVisible = true; 
        addEventListener('keydown',this.preventTabMsg);
        currentFrm.view.forceLayout();
      }
    },
    setComponentData: function(contButton) {
      gblAttestationAgree = false;
      gblDocContainsHipaaData = this.view.radioButtonContainsHipaaData.selectedKey;
      this.view.checkBoxAttestation.selectedKeys = null;
      this.continueButton = contButton;
    },

    selection: function() {
      if(this.view.checkBoxAttestation.selectedKeys !== null)
        gblAttestationAgree = true; //this.continueButton.btnContinueSetEnabled(true);
      else
        gblAttestationAgree = false; //this.continueButton.btnContinueSetEnabled(false);
    },
    selectHipaaData: function() {
      gblDocContainsHipaaData = this.view.radioButtonContainsHipaaData.selectedKey;
    },
    onBreakpointChange: function(form, width){
      try{
      this.view.lblDocTypesToUpload.isVisible = flowName === "Upload Hearing Document" && currentFrm.viewId === "frmUploadDocment2";
      if(width <= gblBreakPoint) {
        this.view.lblTitle1.skin   = 'sknLblGrayishDark115Mobile';
        this.view.lblTextDesc.skin = 'sknLblBlackModerate100Mobile';
        this.view.lblDateUpl.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        this.view.lblTextDesc.left = '0%';
        this.view.lblDateUpl.right = '60px';
        this.view.imgToUpload.isVisible = false;
        this.view.flxMainContainer.height = '300px';
        this.view.checkBoxAttestation.height = '100px';

        if (this.view.radioButtonContainsHipaaData.isVisible === true || flowName === "Compliance" || flowName === "Request - CR"){
          this.view.flxMainContainer.height = '450px';
        }
        if (gblFrmCurrentName === "frmRescheduleHearing4") {
          this.view.lblGoodCauseNote.isVisible = true;
        }
        else{
          this.view.lblGoodCauseNote.isVisible = false;
        }
      }
      else {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        this.view.lblTextDesc.skin = 'sknLblBlackModerate100';
        this.view.lblDateUpl.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.lblTextDesc.left = '7%';
        this.view.lblDateUpl.right = '7%';        
        this.view.imgToUpload.isVisible = true;
        this.view.flxMainContainer.height = '400px';
        this.view.checkBoxAttestation.height = '65px';
        if (gblFrmCurrentName === "frmRescheduleHearing4") {
          this.view.lblGoodCauseNote.isVisible = true;
        }
        else{
          this.view.lblGoodCauseNote.isVisible = false;
        }

      }
      this.view.forceLayout();
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },     

    browseDocuments:function() {
      var config = {
		selectMultipleFiles: false,        
        filter: fileTypes
      };
	  kony.io.FileSystem.browse(config, this.handleDocumentUpload);          
    },
    
    removeDocument:function() {
      if (this.view.mgIconDel.src !== "edit.png" || gblCancelClckd === true ) {
        this.view.checkBoxAttestation.isVisible = false;
        this.view.lblHipaaText.isVisible = false;
        this.view.radioButtonContainsHipaaData.isVisible = false;

        this.view.lblTextDesc.text = "";
        this.view.lblDateUpl = "Added";
        gblUploadedFileName = "";
        rescheduleHearingRequest.goodCauseDocument = "";
        this.view.flxUploadedFile.setVisibility(false); 
        this.view.flxMainContainer.forceLayout();   
        docToUpload = "";
        gblCancelClckd = false;
      }
    },
    
    previewDocument:function() {
      displayDocument(this.getDocument(), "Document Preview", fileType);  
    },    
    
    handleDocumentUpload:function(event, filesList) {
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
            if (fileSize > gblFileMaxUploadSize){
              currentFrm.view.puInformationDialog.flxContainerInfoHeight = '200px';
              currentFrm.view.puInformationDialog.lblTitleText = "File size too large";
              currentFrm.view.puInformationDialog.lblDescText = "Adding this document: "+'"'+fileName+ '"'+", with a file size of " + bytesToSize(fileSize) + 
                ", would exceed the allowable file size of "+ bytesToSize(gblFileMaxUploadSize, true) + ".\n\nPlease reduce file size to be lesser than "+ bytesToSize(gblFileMaxUploadSize, true)+"."; 
              currentFrm.view.puInformationDialog.isVisible = true; 
              addEventListener('keydown',this.preventTabMsg);
              currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
              currentFrm.view.forceLayout();
              return;
            }  
            rescheduleHearingRequest.goodCauseDocument = readResult;
            
            docToUpload = readResult;
            self.setFileName(fileName, fileSize);
            self.setAttestionalHippa();
                       
          }
        });
      } else {
        alert("Upload a document whose file type is PDF, JPEG, or TIFF.");
      }
      if (file) {
        reader.readAsDataURL(file);
      } 
    },
    preventTabHam: function(e){ 
      e = e || window.event; 
      if (currentFrm.view.puInformationDialog.isVisible === true){
        if (e.keyCode === 9)  // If tab key is pressed
        { 
          e.preventDefault(); // stop event from its action 
          currentFrm.view.puInformationDialog.onBreakpointChange(this, width);
        } 
      }else{
        removeEventListener('keydown',this.preventTabHam);
      }
    },
    setAttestionalHippa:function() {
      if (flowName === "Compliance" || flowName === "Request - CR") {
        this.view.checkBoxAttestation.isVisible = (flowName === "Compliance" || flowName === "Request - CR") && gblIsTPMUser === true;
        this.view.lblHipaaText.isVisible = (flowName === "Compliance" || flowName === "Request - CR") && gblIsTPMUser === true;    
        this.view.radioButtonContainsHipaaData.isVisible = (flowName === "Compliance" || flowName === "Request - CR") && gblIsTPMUser === true; 
      }
      this.view.forceLayout();
    },
    setFileName:function(fileName, fileSize) {
      gblUploadedFileName = fileName;
      this.view.lblTextDesc.text = fileName;// + " " + bytesToSize(fileSize);
      this.view.flxUploadedFile.setVisibility(true); 
      
      this.view.forceLayout();          
    },
    setAchievedDate:function(achievedDate) {
      this.view.lblAchievedDate.text = achievedDate; 
      this.view.forceLayout();
    },
    getDocument:function() {
      return docToUpload;
    }
  };
});