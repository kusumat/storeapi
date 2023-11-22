define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      	this.view.radioRescheduleReasons.onSelection = this.onSelectProgramDescription;
        this.view.calendarNoticeDate.onTouchEnd = this.alignCalendar.bind(this);
        this.initCalendar();
      	gblPortalReasons =[];
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);       
        
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115Mobile';
        this.view.radioRescheduleReasons.skin = 'sknRadioBtnDarkGrayReg100Mobile';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        this.view.lblDesc2.skin = 'sknLblSubtitleDarkGrayRegMediumMobile';
        this.view.flxReasons.height = '300px';
        this.view.calendarNoticeDate.width = '45%';
        this.view.txtBoxEnterReasonText.width = '45%';
        this.view.fieldNotice.left = '0dp';
        this.view.dateNotice.left = '0dp';
        this.view.fieldNotice.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.lblDesc2.width = 'Preferred';
        this.view.fieldNotice.height = '100px';
        this.view.txtBoxEnterReasonText.width = '90%';   
      }
      else {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        this.view.radioRescheduleReasons.skin = 'sknRadioBtnDarkGrayReg100';
        this.view.lblDesc1.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.lblDesc2.skin = 'sknLblSubtitleDarkGrayRegMedium';
        this.view.flxReasons.height = '290px';
        this.view.calendarNoticeDate.width = '35%';
        this.view.txtBoxEnterReasonText.width = '35%';
        this.view.fieldNotice.left = '12dp';
        this.view.dateNotice.left = '12dp';
        this.view.fieldNotice.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.fieldNotice.height = '55px';
        this.view.lblDesc2.width = '45%';
        this.view.txtBoxEnterReasonText.width = '50%';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },     
    
    alignCalendar: function() { 
      //you can use: "right","left","top" or "bottom"
      try {
        this.view.calendarNoticeDate.setContext({
          "widget": this.view.calendarNoticeDate,
          "anchor": "top"
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
     
      //this.view.calendarNoticeDate.onSelection = this.onSelectDate;
      this.view.calendarNoticeDate.enableRangeOfDates([currentDay,currentMonth,currentYear-100], 
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

    loadPortalIssueQuestions:function(withdrawType) {
      //"KNYMobileFabric" is the current instance of the Kony Fabric auto initialized by Visualizer
      
      if(withdrawType =="AA"){
        this.view.flxReasons.setVisibility(false);
        this.view.dateNotice.setVisibility(false);
        this.view.fieldNotice.setVisibility(true);
        this.view.fieldNotice.centerY = "50%";
        this.view.radioRescheduleReasons.setVisibility(false);
        this.view.radioRescheduleReasons.height ='0px';
        this.view.flxContainerOptions.setVisibility(false);
        gblPortalReasons_key ="AA";
        gblWithdrawDate = false;
        gblWithdrawText = true;
      }
      else{
        
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      //Code to invoke parent integration service should be present to use below code.
      operationName =  "getPortalReasons";
      var data= {};
      var headers= {};
      integrationObj.invokeOperation(operationName, headers, data, this.loadPortalIssueQuestionsSuccess, this.loadPortalIssueQuestionsFailure);
      //this.loadPortalIssueQuestionsSuccess("{\"opstatus\":0,\"PortalReasons\":[{\"ReasonText\":\"The agency has fixed my case and I am satisfied with the outcome. The agency has notified me by mailing a notice of action (via USPS).\"},{\"ReasonText\":\"The agency has fixed my case and I am satisfied with the outcome. The agency has notified me by verbally discussing the changes to my case.\"},{\"ReasonText\":\"The agency has contacted me and I now understand that I am over income.\"},{\"ReasonText\":\"The agency has contacted me and I now understand that I am not eligible.\"},{\"ReasonText\":\"The agency has contacted me and I now understand that I am sanctioned.\"},{\"ReasonText\":\"I am no longer interested in pursuing my state hearing without verifying any of the above.\"}],\"httpStatusCode\":200,\"httpresponse\":{\"headers\":{\"access-control-allow-credentials\":\"true\",\"access-control-allow-methods\":\"GET, HEAD, POST, TRACE, OPTIONS, PUT, DELETE, PATCH\",\"access-control-allow-origin\":\"https://mobile-dev.jfs.ohio.gov\",\"cache-control\":\"no-store, no-cache, must-revalidate\",\"content-length\":\"737\",\"content-type\":\"text/plain;charset=UTF-8\",\"date\":\"Tue, 04 Dec 2018 17:12:37 GMT\",\"pragma\":\"no-cache\",\"server\":\"Kony\",\"vary\":\"Origin\",\"x-kony-requestid\":\"d8cac9e7-5a87-461b-9624-c71487d84cf6\",\"x-kony-service-message\":\"\",\"x-kony-service-opstatus\":\"0\"},\"url\":\"https://mobile-dev.jfs.ohio.gov/services/appellantServices/getPortalReasons\",\"responsecode\":200}}");
      }
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
              if(withdraw_reasons_key === "")
                this.view.radioRescheduleReasons.selectedKey = "";
              else
                this.view.radioRescheduleReasons.selectedKey = withdraw_reasons_key;

            }
          }
        }
      }
    },
    loadPortalIssueQuestionsFailure:function(error) {
      //kony.ui.Alert({ message: "Failed to fetch Issue Questions: " + error.errmsg, alertType:constants.ALERT_TYPE_ERROR, alertTitle:"Service Error", yesLabel:"OK"}, {});
      alert('Unable to access data!');
    },
    
//     onSelectDate:function() {
//         var date_value = this.getNoticeDate();
//         gblWithdrawDateValue = date_value;
//     },
  	onSelectProgramDescription:function() {
      	var reasons_key = this.view.radioRescheduleReasons.selectedKey;
      
      	withdraw_reasons_key = reasons_key;
      	gblPortalReasons_key = reasons_key.substring(4); 
     
      	var reasons_value = this.view.radioRescheduleReasons.selectedKeyValue;
      	gblPortalReasons_value = reasons_value[1];   
      
        if(reasons_key.substring(0,1) === 'Y' ) {
          this.view.dateNotice.height ='50px';
          this.view.dateNotice.setVisibility(true);
          this.view.dateNotice.forceLayout();
          gblWithdrawDate = true;

        }
        else {
          this.view.dateNotice.setVisibility(false);
          gblWithdrawDate = false;
        }

        if(reasons_key.substring(2,3) === 'Y' ) {
          this.view.dateNotice.setVisibility(false);
          this.view.dateNotice.height ='0px';
          this.view.fieldNotice.setVisibility(true);
          this.view.fieldNotice.forceLayout();
          gblWithdrawText = true;
        }
        else {
          this.view.fieldNotice.setVisibility(false);
          gblWithdrawText = false;
        }
        this.view.forceLayout();
      
  	},    
 
  };
  
});