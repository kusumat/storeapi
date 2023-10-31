define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnShowDetails.onClick = this.showDetails;
      this.view.sgmDataDouble.onRowClick = this.displayAuthorizedRepAppealDetail;     
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    setComponentData:function(appellant) {
      var firstName = appellant.appellantFirstName;
      var lastName = appellant.appellantLastName;
      var phoneNumber = appellant.phoneNumber;
      var address1 = appellant.addrLine1;
      var address2 = appellant.addrLine2;
      var city = appellant.city;
      var state = appellant.state;
      var zipCode = appellant.zipCd;
      var appellantId = appellant.appellantId;

      this.view.lblTitleSectionCard.text = firstName + " " + lastName;
      this.view.lblTextPhoneNumber.text = phoneNumber;
      this.view.lblTextAddress.text = address1 + " " + city + ", " + state;
      if(appellant.homelessIndicator === 'Y')
        this.view.lblTextAddress.text ="Appellant has not provided a residence address.";
      this.view.lblAppellantId.text = appellantId;

    },

    showDetails:function() {
      var appellantId = this.view.lblAppellantId.text;
      gblAppellantId = appellantId;
      var ntf = new kony.mvc.Navigation("frmAppellantDash");
      ntf.navigate();      
      
      /*if(this.view.btnShowDetails.text === "Show Details") {
        this.view.btnShowDetails.text = "Hide Details";
        var appellantId = this.view.lblAppellantId.text;
        this.getAppealsByAppellantIdAndHatsUserId(appellantId, testHatsUserId);
        this.view.flxContainerExpandView.setVisibility(true);
        this.view.flxContainerAllView.forceLayout();
      }
      else {
        this.view.btnShowDetails.text = "Show Details";
        this.view.flxContainerExpandView.setVisibility(false);
        this.view.flxContainerAllView.forceLayout();
      }*/
    },

    getAppealsByAppellantIdAndHatsUserId:function(appellantId, hatsUserId) {
      operationName =  "getAppealsByAppellantIdAndHatsUserId";
      var data= {"appellantId": appellantId,"hatsUserId": hatsUserId};
      var headers= {};
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);    
      integrationObj.invokeOperation(operationName, headers, data, 
                                     this.getAppealsByAppellantIdAndHatsUserIdSuccess, this.getAppealsByAppellantIdAndHatsUserIdFailure);
    },

    getAppealsByAppellantIdAndHatsUserIdSuccess:function(response) {
      if(response !== null && response !== undefined) {
        if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
          response.errorMessage = apiErrors.errServerAppeals;
          response.userAction = apiActions.actionWait;
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
            if(response.appealDetailsByAppellant !== null && response.appealDetailsByAppellant !== undefined) {
              var appealList = response.appealDetailsByAppellant;
              if(appealList !== null && appealList !== undefined) {
                var dataRows = [];
                for(var i = 0; i < appealList.length; i++) {
                  var appealDetail = appealList[i];
                  var appealType = appealDetail.appealTypeDescription;
                  var status = appealDetail.hearingDate;
                  var appealGroupId = appealDetail.appealGroupId;
                  var personName = appealDetail.obPersonName;
                  var appealId = appealDetail.appealId;
                  var dispositionId = appealDetail.dispositionId;
                  var appealNumber = appealDetail.appealNumber;
                  var dataRow = {"imgArrowRight":"arrow_right.png", 
                                 "lblTypeTitle":appealType, 
                                 "lblTextStatus":status,
                                 "lblNumberGroup":appealGroupId,
                                 "imgHashtagIcon":"hashtag_white.png",
                                 "lblAgentName": personName,
                                 "appealId":appealId,
                                 "dispositionId":dispositionId,
                                 "appealNumber":appealNumber
                                };
                  dataRows.push(dataRow);
                }
                this.view.sgmDataDouble.data = dataRows;
                this.view.flxContainerExpandView.setVisibility(true);
                this.view.flxContainerAllView.forceLayout();            
              }
            }
          }
        }
      }
    },

    displayAuthorizedRepAppealDetail:function() {
      var selectedRows = this.view.sgmDataDouble.selectedRowItems[0];
      gblSelectedAppealId = selectedRows.appealId; 
      gblSelectedDispositionId = selectedRows.dispositionId;
      var ntf = new kony.mvc.Navigation("frmGeneralAppealDetails");
      ntf.navigate();      
    },    

    getAppealsByAppellantIdAndHatsUserIdFailure:function(error) {
      alert("Unable to access appeals for appellant");
    },

  };
});