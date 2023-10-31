define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

          this.view.btnQuickActions.onClick = this.navWithdraw;
         
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

		},
      getAppealDetailByAppealId:function() {
        operationName =  "getAppealDetailByAppealId";
        data= {"appealId": gblSelectedAppealId};
        headers= {};
        var serviceName = "appealDetails";
        var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
        integrationObj.invokeOperation(operationName, headers, data, this.getAppealDetailByAppealIdSuccess, this.getAppealDetailByAppealIdFailure);
      },
      getAppealDetailByAppealIdSuccess:function(response){
        if(response !== null && response !== undefined) {
          if(response.errorCode !== undefined) {
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
              if(response.AppealDetails !== null && response.AppealDetails !== undefined) {
                var details = response.AppealDetails[0];
                var person = details.OhioBenefitsPersonName;
                var program = details.PortalProgramDesc;
                var receivedDate = details.bshReceiveDate !== "null" ? details.bshReceiveDate : gblNotAvailableDataLabel;
                var noticeDate = details.NoticeDate !== "null" ? details.NoticeDate : gblNotAvailableDataLabel;
                var fairHearingBenefitStatus = details.fhbPortalStatusDesc;
                var hearingDate = details.PeppersDate !== "null" ? details.PeppersDate : gblNotAvailableDataLabel;
                var caseNumber = details.CaseNumber;
                var requestDate = details.RequestDate !== "null" ? details.RequestDate : gblNotAvailableDataLabel;
                this.view.lblDescPerson.text = person;
                this.view.lblDescProgram.text = program;
                this.view.lblDescNoticeDate.text = noticeDate;
                this.view.lblDescfhbStatus.text = fairHearingBenefitStatus;
                this.view.lblDescHearingDate.text = hearingDate;
                this.view.lblDescReciveDate2.text = receivedDate;
                this.view.lblDescCaseNumber.text = caseNumber;
                this.view.lblDescRequestDate.text = requestDate;
                this.view.lblNumberGroup.text = details.AppealNumber;
              }
              this.view.flxMainContainer.forceLayout();
            }
          }
        }
      },
      getAppealDetailByAppealIdFailure:function(error){
        alert("Unable to access Appeal info");    
      },
      
      navWithdraw: function(){
      var ntf = new kony.mvc.Navigation("frmWithdrawHearingStep1");
      ntf.navigate();
      },
	};
});