define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.radioRescheduleReasons.onSelection = this.onSelectProgramDescription;
      this.view.calendarNoticeDate.onTouchEnd = this.alignCalendar.bind(this);
      this.initCalendar();
      this.loadPortalIssueQuestions();   
      gblPortalReasons =[];


    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    
    alignCalendar: function() {
      //you can use: "right","left","top" or "bottom"
      try {
        this.view.calendarNoticeDate.setContext({
          "widget": this.view.calendarNoticeDate,
          "anchor": "bottom"
        });
      } catch (ex) {
        kony.print("Exception found in alignCalendar: " + ex);
      }
    },    

    initCalendar:function() {
      var currentDate = new Date();
      var currentDay = currentDate.getUTCDate();
      var currentMonth = currentDate.getMonth()+1;
      var currentYear = currentDate.getFullYear();
      this.view.calendarNoticeDate.enableRangeOfDates([currentDay,currentMonth,currentYear-1], 
                                                      [currentDay,currentMonth,currentYear], "sknCalendarNormal", true);
    },  
    
    getNoticeDate:function() {
      var date = "";
      var month = this.view.calendarNoticeDate.month;
      var day   = this.view.calendarNoticeDate.day;
      var year  = this.view.calendarNoticeDate.year;
      if(month !== null && day !== null && year !== null) {
      	date = month + "/" + day + "/" + year;  
      }
	  return date;      
    },    

    loadPortalIssueQuestions:function() {
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      operationName =  "getReschedulePortalReasons";
      var data= {};
      var headers= {};
      integrationObj.invokeOperation(operationName, headers, data, this.loadPortalIssueQuestionsSuccess, this.loadPortalIssueQuestionsFailure);
    },

    loadPortalIssueQuestionsSuccess:function(response) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errQuestionsList;
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
      alert('Unable to access Questions');
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