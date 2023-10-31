define(function() {

  var languageList = [];
  var eventsList = [];
  var selectedTimeSolts = 0;
  var selectedTimeSoltsNew = 0; 

  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnSaveEvent.onClick = this.saveEvent;
      this.view.radioInterpreter.onSelection = this.selectInterpreter;      
      this.view.radioPrehearing.onSelection = this.selectPreHearingHelp;
      this.view.radioCountyConference.onSelection = this.selectCountyConference;
      this.view.lstAvailableLanguages.onSelection = this.selectLanguage;
      this.view.calendarEventDate.onTouchEnd = this.alignCalendar.bind(this);
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1);      
      this.view.checkBoxGroupMondayAM.onSelection = this.onRowSelectedCallBackNew;
      this.view.checkBoxGroupMondayPM.onSelection = this.onRowSelectedCallBackNew;
      this.view.checkBoxGroupTuesdayAM.onSelection = this.onRowSelectedCallBackNew;
      this.view.checkBoxGroupTuesdayPM.onSelection = this.onRowSelectedCallBackNew;
      this.view.checkBoxGroupWednesdayAM.onSelection = this.onRowSelectedCallBackNew;
      this.view.checkBoxGroupWednesdayPM.onSelection = this.onRowSelectedCallBackNew;
      this.view.checkBoxGroupThursdayAM.onSelection = this.onRowSelectedCallBackNew;
      this.view.checkBoxGroupThursdayPM.onSelection = this.onRowSelectedCallBackNew;
      
      var CheckBoxObject = [["MondayAM", " ", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Monday AM", "a11yHint": "", "a11yIndex": 0}]];
      this.view.checkBoxGroupMondayAM.masterData = CheckBoxObject;   
      CheckBoxObject = [["MondayPM", " ", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Monday PM", "a11yHint": "", "a11yIndex": 0}]];
      this.view.checkBoxGroupMondayPM.masterData = CheckBoxObject;   
      CheckBoxObject = [["TuesdayAM", " ", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Tuesday AM", "a11yHint": "", "a11yIndex": 0}]];
      this.view.checkBoxGroupTuesdayAM.masterData = CheckBoxObject;   
      CheckBoxObject = [["TuesdayPM", " ", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Tuesday PM", "a11yHint": "", "a11yIndex": 0}]];
      this.view.checkBoxGroupTuesdayPM.masterData = CheckBoxObject;    
      CheckBoxObject = [["WednesdayAM", " ", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Wednesday AM", "a11yHint": "", "a11yIndex": 0}]];
      this.view.checkBoxGroupWednesdayAM.masterData = CheckBoxObject;   
      CheckBoxObject = [["WednesdayPM", " ", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Wednesday PM", "a11yHint": "", "a11yIndex": 0}]];
      this.view.checkBoxGroupWednesdayPM.masterData = CheckBoxObject;   
      CheckBoxObject = [["ThursdayAM", " ", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Thursday AM", "a11yHint": "", "a11yIndex": 0}]];
      this.view.checkBoxGroupThursdayAM.masterData = CheckBoxObject;   
      CheckBoxObject = [["ThursdayPM", " ", accessibilityConfig={"a11yHidden": false, "a11yLabel": "Thursday PM", "a11yHint": "", "a11yIndex": 0}]];
      this.view.checkBoxGroupThursdayPM.masterData = CheckBoxObject;   
      
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
      hearingRequest.avoidDays.push({"monAMInd": "N","monPMInd": "N","tueAMInd": "N","tuePMInd": "N","wedAMInd": "N","wedPMInd": "N","thurAMInd": "N","thurPMInd": "N"});  
    },
    
    onRowSelectedCallBackNew: function () {
      var AMMon;
      var PMMon; 
      var AMTue;
      var PMTue;
      var AMWed;
      var PMWed;
      var AMThur;
      var PMThur;
      var selectedAMMon = 0; 
      var selectedAMTue = 0; 
      var selectedAMWed = 0; 
      var selectedAMThur = 0;
      var selectedPMMon = 0; 
      var selectedPMTue = 0; 
      var selectedPMWed = 0; 
      var selectedPMThur = 0;
      
      selectedTimeSoltsNew = 0;
      if (this.view.checkBoxGroupMondayAM.selectedKeys === null) {
        AMMon = "N";
      }else{
        AMMon = "Y";
        selectedAMMon = 1;
      }
      if (this.view.checkBoxGroupMondayPM.selectedKeys === null) {
        PMMon = "N";
      }else{
        PMMon = "Y";
        selectedPMMon = 1;
      }
      if (this.view.checkBoxGroupTuesdayAM.selectedKeys === null) {
        AMTue = "N";
      }else{
        AMTue = "Y";
        selectedAMTue = 1;
      }
      if (this.view.checkBoxGroupTuesdayPM.selectedKeys === null) {
        PMTue = "N";
      }else{
        PMTue = "Y";
        selectedPMTue = 1;
      }
      if (this.view.checkBoxGroupWednesdayAM.selectedKeys === null) {
        AMWed  = "N";
      }else{
        AMWed = "Y";
        selectedAMWed = 1;
      }
      if (this.view.checkBoxGroupWednesdayPM.selectedKeys === null) {
        PMWed = "N";
      }else{
        PMWed = "Y";
        selectedPMWed = 1;
      }
      if (this.view.checkBoxGroupThursdayAM.selectedKeys === null) {
        AMThur = "N";
      }else{
        AMThur = "Y";
        selectedAMThur = 1;
      }
      if (this.view.checkBoxGroupThursdayPM.selectedKeys === null) {
        PMThur = "N";
      }else{
        PMThur = "Y";
        selectedPMThur = 1;
      }
      selectedTimeSoltsNew = selectedAMMon + selectedPMMon + selectedAMTue + selectedPMTue + selectedAMWed + selectedPMWed + selectedAMThur + selectedPMThur;
      if (selectedTimeSoltsNew === 6) {
        if (this.view.checkBoxGroupMondayAM.selectedKeys === null) {
          this.view.checkBoxGroupMondayAM.setEnabled(false);
        }
        if (this.view.checkBoxGroupMondayPM.selectedKeys === null) {
          this.view.checkBoxGroupMondayPM.setEnabled(false);
        }
        if (this.view.checkBoxGroupTuesdayAM.selectedKeys === null) {
          this.view.checkBoxGroupTuesdayAM.setEnabled(false);  
        }
        if (this.view.checkBoxGroupTuesdayPM.selectedKeys === null) {
          this.view.checkBoxGroupTuesdayPM.setEnabled(false);  
        }
        if (this.view.checkBoxGroupWednesdayAM.selectedKeys === null) {
          this.view.checkBoxGroupWednesdayAM.setEnabled(false);          
        }
        if (this.view.checkBoxGroupWednesdayPM.selectedKeys === null) {
          this.view.checkBoxGroupWednesdayPM.setEnabled(false);          
        }
        if (this.view.checkBoxGroupThursdayAM.selectedKeys === null) {
          this.view.checkBoxGroupThursdayAM.setEnabled(false);
        }
        if (this.view.checkBoxGroupThursdayPM.selectedKeys === null) {
          this.view.checkBoxGroupThursdayPM.setEnabled(false);
        }
        alert ("You have reached the maximum selection for days and times to avoid. You will be unable to select additional days/times until you remove one of your previous selections.");
      }else{        
        this.view.checkBoxGroupMondayAM.setEnabled(true);
        this.view.checkBoxGroupMondayPM.setEnabled(true);
        this.view.checkBoxGroupTuesdayAM.setEnabled(true);
        this.view.checkBoxGroupTuesdayPM.setEnabled(true);
        this.view.checkBoxGroupWednesdayAM.setEnabled(true);
        this.view.checkBoxGroupWednesdayPM.setEnabled(true);
        this.view.checkBoxGroupThursdayAM.setEnabled(true);
        this.view.checkBoxGroupThursdayPM.setEnabled(true);
      }
      hearingRequest.avoidDays = [];
      hearingRequest.avoidDays.push({"monAMInd": AMMon,"monPMInd": PMMon,"tueAMInd": AMTue,"tuePMInd": PMTue,"wedAMInd": AMWed,"wedPMInd": PMWed,"thurAMInd": AMThur,"thurPMInd": PMThur});  
    },    

    onBreakpointChange: function(form, width){
      try{
      var eventsWidgets = this.view.flxScheduledEvents.widgets();
      
      if(width <= gblBreakPoint) {
        this.view.flxContainerMonday.left = '-4px';
        this.view.flxBoxMondayAM.left = '-4px';
        this.view.flxBoxMondayPM.left = '-4px';    
        this.view.flxContainerTuesday.left = '-5px';
        this.view.flxBoxTuesdayAM.left = '-5px';
        this.view.flxBoxTuesdayPM.left = '-5px';
        this.view.flxContainerWednesday.left = '-5px';
        this.view.flxBoxWednesdayAM.left = '-5px';
        this.view.flxBoxWednesdayPM.left = '-5px';
        this.view.flxContainerThursday.left = '-7px';
        this.view.flxBoxThursdayAM.left = '-7px';
        this.view.flxBoxThursdayPM.left = '-7px';
        this.view.lblHeaderMonday.skin = "sknLabelAvoidDaysHeaderMobile";
        this.view.lblHeaderTuesday.skin = "sknLabelAvoidDaysHeaderMobile";
        this.view.lblHeaderWednesday.skin = "sknLabelAvoidDaysHeaderMobile";
        this.view.lblHeaderThursday.skin = "sknLabelAvoidDaysHeaderMobile";
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
        this.view.lblEventNameTitle.width = '180px';
        this.view.sgmEvents.rowTemplate = 'flxTmpSgmEventListMobile';
        this.view.sgmEvents.width = '100%';

      }
      else {
        this.view.flxContainerMonday.left = '-3px';
        this.view.flxBoxMondayAM.left = '-3px';
        this.view.flxBoxMondayPM.left = '-3px';
        this.view.flxContainerTuesday.left = '-4px';
        this.view.flxBoxTuesdayAM.left = '-4px';
        this.view.flxBoxTuesdayPM.left = '-4px';
        this.view.flxContainerWednesday.left = '-4px';
        this.view.flxBoxWednesdayAM.left = '-4px';
        this.view.flxBoxWednesdayPM.left = '-4px';
        this.view.flxContainerThursday.left = '-5px';
        this.view.flxBoxThursdayAM.left = '-5px';
        this.view.flxBoxThursdayPM.left = '-5px';        
        
        this.view.lblTitle1.skin = 'sknLblGrayishDark115';
        this.view.lblTitle2.skin = 'sknLblGrayishDark115';
        this.view.lblTitle3.skin = 'sknLblGrayishDark115';
        this.view.lblTitle4.skin = 'sknLblGrayishDark115';
        this.view.lblHeaderMonday.skin = "sknLabelAvoidDaysHeader";
        this.view.lblHeaderTuesday.skin = "sknLabelAvoidDaysHeader";
        this.view.lblHeaderWednesday.skin = "sknLabelAvoidDaysHeader";
        this.view.lblHeaderThursday.skin = "sknLabelAvoidDaysHeader";

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
        this.view.flxContainerAvoidDays.height = '180px';
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