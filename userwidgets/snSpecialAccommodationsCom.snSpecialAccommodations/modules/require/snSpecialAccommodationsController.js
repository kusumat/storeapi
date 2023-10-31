define(function() {

  var languageList = [];
  var eventsList = [];
  var selectedTimeSolts = 0;

  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnSaveEvent.onClick = this.saveEvent;
      this.view.radioInterpreter.onSelection = this.selectInterpreter;      
      this.view.radioPrehearing.onSelection = this.selectPreHearingHelp;
      this.view.radioCountyConference.onSelection = this.selectCountyConference;
      this.view.lstAvailableLanguages.onSelection = this.selectLanguage;
      this.view.calendarEventDate.onTouchEnd = this.alignCalendar.bind(this);
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);      
      this.view.DataGridAvoidDays.onRowSelected = this.onRowSelectedCallBack;
            
      this.initializeDataGrid();
      languageList = [];
      eventsList = [];      
      this.initCalendar();
      this.loadLanguages();
      selectedTimeSolts = 0;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    initializeDataGrid: function(){   
      hearingRequest.avoidDays = [];
      this.view.DataGridAvoidDays.setData([{time: "AM", mon:"cbccheckbox.png",tue:"cbccheckbox.png",wed:"cbccheckbox.png",thur:"cbccheckbox.png"}, 
                                 {time: "PM", mon:"cbccheckbox.png",tue:"cbccheckbox.png",wed:"cbccheckbox.png",thur:"cbccheckbox.png"}]);
      var AM = this.view.DataGridAvoidDays.data[0];
      var PM = this.view.DataGridAvoidDays.data[1];
      hearingRequest.avoidDays.push({"monAMInd": AM.mon == "cbccheckbox.png" ? "N":"Y",
                         "monPMInd": PM.mon == "cbccheckbox.png" ? "N":"Y",
                         "tueAMInd": AM.tue == "cbccheckbox.png" ? "N":"Y",
                         "tuePMInd": PM.tue == "cbccheckbox.png" ? "N":"Y",
                         "wedAMInd": AM.wed == "cbccheckbox.png" ? "N":"Y",
                         "wedPMInd": PM.wed == "cbccheckbox.png" ? "N":"Y",
                         "thurAMInd": AM.thur == "cbccheckbox.png" ? "N":"Y",                           
                         "thurPMInd": PM.thur == "cbccheckbox.png" ? "N":"Y"});  
      
    },
    onRowSelectedCallBack: function(dataGrid) {
      var selectedRow = dataGrid.selectedIndex;
      var selectedColID = dataGrid.selectedCellIndex[1];
      var selectedCellItem = dataGrid.selectedCellItem;
      if (selectedColID == "time"){
        return;
      }
      if (selectedCellItem == "cbxcheckbox.png"){
        selectedCellItem = "cbccheckbox.png";
        selectedTimeSolts--;
      }
      else {
        selectedTimeSolts++;
        selectedCellItem = "cbxcheckbox.png";        
      }
      if (selectedTimeSolts > 6) {
        selectedTimeSolts--;
        alert ("You have reached the maximum selection for days and times to avoid. You will be unable to select additional days/times until you remove one of your previous selections.");
        return;
      }
      
      dataGrid.setCellDataAt(selectedRow, selectedColID, selectedCellItem);
      var data = dataGrid.data[selectedRow];
      dataGrid.setDataAt(data,selectedRow);
      var AM = dataGrid.data[0];
      var PM = dataGrid.data[1];
      hearingRequest.avoidDays = [];
      hearingRequest.avoidDays.push({"monAMInd": AM.mon == "cbccheckbox.png" ? "N":"Y",
                         "monPMInd": PM.mon == "cbccheckbox.png" ? "N":"Y",
                         "tueAMInd": AM.tue == "cbccheckbox.png" ? "N":"Y",
                         "tuePMInd": PM.tue == "cbccheckbox.png" ? "N":"Y",
                         "wedAMInd": AM.wed == "cbccheckbox.png" ? "N":"Y",
                         "wedPMInd": PM.wed == "cbccheckbox.png" ? "N":"Y",
                         "thurAMInd": AM.thur == "cbccheckbox.png" ? "N":"Y",                           
                         "thurPMInd": PM.thur == "cbccheckbox.png" ? "N":"Y"});  
    },  
    onBreakpointChange: function(form, width){
      try{
      var eventsWidgets = this.view.flxScheduledEvents.widgets();
      
      if(width <= gblBreakPoint) {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115Mobile';
        this.view.lblTitle2.skin = 'sknLblGrayishDark115Mobile';
        this.view.lblTitle3.skin = 'sknLblGrayishDark115Mobile';
        this.view.lblTitle4.skin = 'sknLblGrayishDark115Mobile';

        this.view.flxContainerInout.layoutType = kony.flex.FLOW_VERTICAL;
        this.view.txtBoxEventName.width        = '100%';
        this.view.calendarEventDate.left       = '0dp';
        this.view.btnSaveEvent.left            = '0dp';
        this.view.txtBoxEventName.bottom       = '8px';
        this.view.calendarEventDate.bottom     = '8px';
        this.view.txtBoxEventName.centerY      = 'Default';
        this.view.calendarEventDate.centerY    = 'Default';
        this.view.btnSaveEvent.centerY         = 'Default';
        this.view.flxContainerInout.height     = '136px';
        this.view.btnSaveEvent.width           = '30%';
        this.view.flxContainerAvoidDays.height = '200px';
        this.view.flxScheduledEvents.width = '97.5%';
        this.view.lblEventNameTitle.width = '200px';
        this.view.sgmEvents.rowTemplate = 'flxTmpSgmEventListMobile';
        this.view.sgmEvents.width = '100%';

      }
      else {
        this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        this.view.lblTitle2.skin = 'sknLblGrayishDark115';
        this.view.lblTitle3.skin = 'sknLblGrayishDark115';
        this.view.lblTitle4.skin = 'sknLblGrayishDark115';

        this.view.flxContainerInout.layoutType = kony.flex.FLOW_HORIZONTAL;
        this.view.txtBoxEventName.width        = '50%';
        this.view.calendarEventDate.left       = '5dp';
        this.view.btnSaveEvent.left            = '5dp';
        this.view.txtBoxEventName.bottom        = 'Default';
        this.view.calendarEventDate.bottom     = 'Default';        
        this.view.txtBoxEventName.centerY      = '50%';
        this.view.calendarEventDate.centerY    = '50%';
        this.view.btnSaveEvent.centerY         = '50%';
        this.view.flxContainerInout.height     = '40px';
        this.view.btnSaveEvent.width           = '10%';
        this.view.flxContainerAvoidDays.height = '160px';
        this.view.flxScheduledEvents.width = '80%';
        this.view.lblEventNameTitle.width = '460px';
        this.view.sgmEvents.width = '95%';
        this.view.sgmEvents.rowTemplate = 'flxTmpSgmEventList';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },   

    alignCalendar: function() {
      //you can use: "right","left","top" or "bottom"
      try {
        this.view.calendarEventDate.setContext({
          "widget": this.view.calendarEventDate,
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
      this.view.calendarEventDate.enableRangeOfDates([currentDay,currentMonth,currentYear], 
                                                     [currentDay,currentMonth,currentYear+100], "sknCalendarNormal", true);
    },

    isPastDate:function(eventDate) {
      var rightNow = new Date();
      var dateEntered = new Date(eventDate);
      if (rightNow > dateEntered) {
        return true;
      } else {
        return false;
      }
    },

    saveEvent:function() {
      var eventName = this.view.txtBoxEventName.text;
      if(eventName === "") {
        alert("Enter the Event Name");
        return;
      }       
      var eventDate = this.view.calendarEventDate.entereddate;
      if(eventDate === null || eventDate === undefined || eventDate === "") {
        alert("Enter the Event Date");
        return;
      }      
      var isPastDate = this.isPastDate(eventDate);
      if(isPastDate) {
        alert("Event Date must occur in the future");
      } else {
        //add to master data and display the event list
        var eventRow = {"lblEventNameDesc": eventName, "lblEventDateDesc": eventDate,"btnDeleteEvent": {"isVisible": true}, "flxBtnEdit": {onClick: this.removeEvent.bind(this, "index")}};
        eventsList.push(eventRow);
        this.view.sgmEvents.setData(eventsList);
        this.view.flxScheduledEvents.setVisibility(true);
        this.view.flxMainContainer.forceLayout();
        this.view.txtBoxEventName.text = "";
        this.view.calendarEventDate.formattedDate = "";  
        this.view.calendarEventDate.clear();
      }	         
    },

    removeEvent:function(scope, index) {
      var rowIndex = this.view.sgmEvents.selectedRowIndex;
      this.view.sgmEvents.removeAt(rowIndex[1], 0);
      var eventData = this.view.sgmEvents.data;
      if(eventData.length === 0) {
        this.view.flxScheduledEvents.setVisibility(false);   
      }
      this.view.flxMainContainer.forceLayout();
    },

    setEventData:function() {
      hearingRequest.eventDetails = [];
      var eventData = this.view.sgmEvents.data;   
      for(var i = 0; i < eventData.length; i++) {
        var eventDetail = {
          "eventName": eventData[i].lblEventNameDesc,
          "eventDate": eventData[i].lblEventDateDesc
        };
        hearingRequest.eventDetails.push(eventDetail);
      }
    },

    loadLanguages:function() {
      if(gblLanguageList.length === 0) {
        var serviceName = "appellantServices";
        var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
        operationName =  "getLanguagesList";
        var data= {};
        var headers= {};
        integrationObj.invokeOperation(operationName, headers, data, 
                                       this.loadLanguagesSuccess, this.loadLanguagesFailure);
      }
      else {
        this.setLanguageDropDownData();
      }
    }, 

    loadLanguagesSuccess:function(response) {
      if(response !== null && response !== undefined) {
        if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
          response.errorMessage = apiErrors.errLanguages;
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
            if(response.availableLanguages !== null && response.availableLanguages !== undefined) {
              gblLanguageList = response.availableLanguages;
              this.setLanguageDropDownData();
            }
          }
        }
      }
    },

    loadLanguagesFailure:function(error) {
      alert('Unable to access Language data');  
    },
    
    setLanguageDropDownData:function() {
      
          var languages = gblLanguageList;
          var languageItem = [];

          //add the most common to the top
          var commonLanguages = [
            [123,"Spanish"],
            [102,"Nepali (macrolanguage)"],
            [8,"Arabic"],
            [122,"Somali"],
            [117,"Russian"],
            [9999,"----------------------------------------"]];
          for(var i = 0; i < commonLanguages.length; i++) {
            languageItem = [];
            var commonLanguage = commonLanguages[i];
            languageItem[0] = commonLanguage[0];
            languageItem[1] = commonLanguage[1];
            languageList.push(languageItem);
          }

          //add the rest of the languages
          for(i = 0; i < languages.length; i++) {
            // TODO: SHARE-77, skip English for interpreter
//             if("English" === languages[i].languageName) {
//               continue;
//             }
            if("Spanish" !== languages[i].languageName &&
               "Nepali (macrolanguage)" !== languages[i].languageName &&
               "Arabic" !== languages[i].languageName &&
               "Somali" !== languages[i].languageName &&
               "Russian" !== languages[i].languageName) {
              languageItem = [];
              languageItem[0] = languages[i].languageId;
              languageItem[1] = languages[i].languageName;
              languageList.push(languageItem);
            }
          }
          this.view.lstAvailableLanguages.masterData = languageList;
      
    },

    getSelectedInterpreter:function() {
      return this.view.radioInterpreter.selectedKey;
    },
	clearValues:function() {
      this.initializeDataGrid();
      this.view.txtBoxEventName.text = "";
      this.view.calendarEventDate.clear();
      this.view.radioInterpreter.selectedKey = null;
      this.view.radioPrehearing.selectedKey = null;
      this.view.radioCountyConference.selectedKey = null;
      eventsList = [];
      selectedTimeSolts = 0;
      this.view.sgmEvents.setData(eventsList);
      
    },
    selectLanguage:function() {
      hearingRequest.intprLangId = this.view.lstAvailableLanguages.selectedKeyValue[0];
      hearingRequest.languageDesc = this.view.lstAvailableLanguages.selectedKeyValue[1];
      this.filterLanguageSelection(hearingRequest.languageDesc);
    },
    
    filterLanguageSelection: function(languageFilter) {
      if (languageFilter == "English") {
        var basicConf = {
          alertType: constants.ALERT_TYPE_ERROR,
          alertTitle: "Confirm",
          alertYesLabel: "Ok",
          message: "Please select a language other than " + languageFilter + " if you need an Interpreter.",
          alertHandler: this.deselectFilteredLanguage
        };
        var pspConfig = {
          "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        };
        kony.ui.Alert(basicConf, pspConfig);
      }
    }, 
    
    deselectFilteredLanguage: function() {
      var firstLanguageSelection = languageList[0];
      this.view.lstAvailableLanguages.selectedKey = firstLanguageSelection[0];        
      hearingRequest.intprLangId = this.view.lstAvailableLanguages.selectedKeyValue[0];
      hearingRequest.languageDesc = this.view.lstAvailableLanguages.selectedKeyValue[1];
    },

    selectInterpreter:function() {
      gblNeedInterpreter = this.view.radioInterpreter.selectedKey;
      if(gblNeedInterpreter  === "Yes") {
        hearingRequest.interptrReqInd = "Y";
        this.view.lstAvailableLanguages.setVisibility(true);
        //select first language by default if no language is selected
        if((hearingRequest.intprLangId === 0 && hearingRequest.languageDesc === "") || this.view.lstAvailableLanguages.selectedKey === null || (hearingRequest.interptrReqInd === "0" && hearingRequest.languageDesc === "")) {
          if(languageList.length > 0) {
            var language = languageList[0];
            hearingRequest.intprLangId = language[0];
            hearingRequest.languageDesc = language[1];
          }
        } 
      }
      else {
        var firstLanguageSelection = languageList[0];
        this.view.lstAvailableLanguages.selectedKey = firstLanguageSelection[0];        
        hearingRequest.interptrReqInd = "N";
        hearingRequest.languageDesc = "";
        hearingRequest.intprLangId = 0; 
        this.view.lstAvailableLanguages.setVisibility(false); 
      }
    },

    selectPreHearingHelp:function() {
      gblPreHearingHelp = this.view.radioPrehearing.selectedKey; 
    },

    selectCountyConference:function() {
      gblCountyConference = this.view.radioCountyConference.selectedKey;
    },

  };
});