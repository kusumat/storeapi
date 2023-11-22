define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      	this.view.radioRescheduleReasons.onSelection = this.onSelectProgramDescription;
        this.initCalendar();
		this.loadPortalIssueQuestions();   
      	gblPortalReasons =[];
      
        
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    
    initCalendar:function() {
      var currentDate = new Date();
      var currentDay = currentDate.getUTCDate();
      var currentMonth = currentDate.getMonth()+1;
      var currentYear = currentDate.getFullYear();
     
      this.view.calendarNoticeDate.onSelection = this.onSelectDate;
      this.view.calendarNoticeDate.enableRangeOfDates([currentDay,currentMonth,currentYear-1], 
                                                         [currentDay,currentMonth,currentYear], "sknCalendarNormal", true);
    },    

    loadPortalIssueQuestions:function() {
      //"KNYMobileFabric" is the current instance of the Kony Fabric auto initialized by Visualizer
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      //Code to invoke parent integration service should be present to use below code.
      operationName =  "getReschedulePortalReasons";
      var data= {};
      var headers= {};
      integrationObj.invokeOperation(operationName, headers, data, this.loadPortalIssueQuestionsSuccess, this.loadPortalIssueQuestionsFailure);
      //this.loadPortalIssueQuestionsSuccess("{\"opstatus\":0,\"PortalReasons\":[{\"ReasonText\":\"The agency has fixed my case and I am satisfied with the outcome. The agency has notified me by mailing a notice of action (via USPS).\"},{\"ReasonText\":\"The agency has fixed my case and I am satisfied with the outcome. The agency has notified me by verbally discussing the changes to my case.\"},{\"ReasonText\":\"The agency has contacted me and I now understand that I am over income.\"},{\"ReasonText\":\"The agency has contacted me and I now understand that I am not eligible.\"},{\"ReasonText\":\"The agency has contacted me and I now understand that I am sanctioned.\"},{\"ReasonText\":\"I am no longer interested in pursuing my state hearing without verifying any of the above.\"}],\"httpStatusCode\":200,\"httpresponse\":{\"headers\":{\"access-control-allow-credentials\":\"true\",\"access-control-allow-methods\":\"GET, HEAD, POST, TRACE, OPTIONS, PUT, DELETE, PATCH\",\"access-control-allow-origin\":\"https://mobile-dev.jfs.ohio.gov\",\"cache-control\":\"no-store, no-cache, must-revalidate\",\"content-length\":\"737\",\"content-type\":\"text/plain;charset=UTF-8\",\"date\":\"Tue, 04 Dec 2018 17:12:37 GMT\",\"pragma\":\"no-cache\",\"server\":\"Kony\",\"vary\":\"Origin\",\"x-kony-requestid\":\"d8cac9e7-5a87-461b-9624-c71487d84cf6\",\"x-kony-service-message\":\"\",\"x-kony-service-opstatus\":\"0\"},\"url\":\"https://mobile-dev.jfs.ohio.gov/services/appellantServices/getPortalReasons\",\"responsecode\":200}}");
    },

    loadPortalIssueQuestionsSuccess:function(response) {
      kony.print("Questions Response: " + JSON.stringify(response));

      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errReasonsRescheduleList;
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
          if(response !== undefined && response.PortalReasons !== undefined) {
            var questionlength = response.PortalReasons.length;

            if(questionlength > 0) {

              var radioButtonData = [];
              for(var j = 0; j < questionlength; j++) {
                var descriptionChoice = [];
                descriptionChoice.push(response.PortalReasons[j].requestNoticeDateInd+":"+response.PortalReasons[j].requestReasonFieldInd+":"+response.PortalReasons[j].ReasonCode);
                descriptionChoice.push(response.PortalReasons[j].ReasonText);
                radioButtonData.push(descriptionChoice);
              }

              this.view.radioRescheduleReasons.masterData = radioButtonData;
              this.view.radioRescheduleReasons.selectedKey = "";

            }
          }
        }
      }
    },
    loadPortalIssueQuestionsFailure:function(error) {
      //kony.ui.Alert({ message: "Failed to fetch Issue Questions: " + error.errmsg, alertType:constants.ALERT_TYPE_ERROR, alertTitle:"Service Error", yesLabel:"OK"}, {});
      alert('Unable to access data!');
    },
    
    onSelectDate:function() {
        var date_value = this.view.calendarNoticeDate.formattedDate;
//         gblWithdrawDateValue = date_value;
      rescheduleHearingRequest.noticeOfActionDate = date_value;
    },
  	onSelectProgramDescription:function() {
      	var reasons_key = this.view.radioRescheduleReasons.selectedKey;
      	gblPortalReasons_key = reasons_key.substring(4); 
        rescheduleHearingRequest.rescheduleReasonCode = gblPortalReasons_key;
      	rescheduleHearingRequest.rescheduleReasonText = gblPortalReasons_key[1];
      	var reasons_value = this.view.radioRescheduleReasons.selectedKeyValue;
      	gblPortalReasons_value = reasons_value[1];   
      
      	if(reasons_key.substring(0,1) === 'Y' ) {
      		this.view.dateNotice.setVisibility(true);
          	gblWithdrawDate = true;

         }
      	else {
          	this.view.dateNotice.setVisibility(false);
          	gblWithdrawDate = false;
        }
      
        if(reasons_key.substring(2,3) === 'Y' ) {
      		this.view.fieldNotice.setVisibility(true);
          	gblWithdrawText = true;
      	}
        else {
          this.view.fieldNotice.setVisibility(false);
          gblWithdrawText = false;
        }
    
      
  	},    
 
  };
  
});
