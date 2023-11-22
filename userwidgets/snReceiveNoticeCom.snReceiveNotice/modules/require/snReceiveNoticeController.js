define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.radioReceivedNotice.onSelection = this.setReceivedNotice;
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1); 
      this.view.calendarReceiveNotice.onTouchEnd = this.alignCalendar.bind(this);
      this.resetReceivedNoticeSelection();
      this.initCalendar();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    onBreakpointChange: function(form, width){
      try{
      if(width <= gblBreakPoint) {
        this.view.lblTitle1.skin  = 'sknLblGrayishDark115Mobile';
        this.view.lblTitle02.skin = 'sknLblGrayishDark115Mobile';
        this.view.lblAddIssueHint.skin = 'sknLblGrayLightDisclaimerMobile';
        this.view.lblTitle02.top = '0px';
        this.view.radioReceivedNotice.height = '48px';
        this.view.flxContainerCalendar.top = '0px';
      }
      else {
        this.view.lblTitle1.skin   = 'sknLblGrayishDark115';
        this.view.lblTitle02.skin = 'sknLblGrayishDark115';
        this.view.lblAddIssueHint.skin = 'sknLblGrayLightDisclaimer';
        this.view.lblTitle02.top = '8px';
        this.view.radioReceivedNotice.height = '60px';
        this.view.flxContainerCalendar.top = '8px';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },    
    
    alignCalendar: function() {
      //you can use: "right","left","top" or "bottom"
      try {
        this.view.calendarReceiveNotice.setContext({
          "widget": this.view.calendarReceiveNotice,
          "anchor": "bottom"
        });
      } catch (ex) {
        kony.print("Exception found in alignCalendar: " + ex);
      }
    },
    
    setReceivedNotice:function() {
      gblReceivedNotice = this.view.radioReceivedNotice.selectedKey;
      if(gblReceivedNotice === "Yes") {
      	this.showHideCalendarSection(true);
      }
      else {
        this.showHideCalendarSection(false);
        this.resetCalendarInput();
      }
    },
    
    getReceivedNoticeDate:function() {
      var date = "";
      var month = this.view.calendarReceiveNotice.month;
      var day   = this.view.calendarReceiveNotice.day;
      var year  = this.view.calendarReceiveNotice.year;
      if(month !== null && day !== null && year !== null) {
      	date = month + "/" + day + "/" + year;  
      }
	  return date;      
    },

    showHideCalendarSection:function(isVisible) {
      this.view.flxContainerCalendar.setVisibility(isVisible);
      this.view.lblTitle02.setVisibility(isVisible);
      this.view.flxAddIssueHint.top = isVisible === false ? '90px': '0px';
    },

    resetReceivedNoticeSelection:function() {
      this.view.radioReceivedNotice.selectedKey = null;      
      this.view.calendarReceiveNotice.clear();
	  this.showHideCalendarSection(false);
      this.view.forceLayout();
    },
    
    resetCalendarInput:function() {
      this.view.calendarReceiveNotice.clear();
	  this.showHideCalendarSection(false);
    },    

    initCalendar:function() {
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + -1);
      var currentDay = currentDate.getUTCDate();
      var currentMonth = currentDate.getMonth()+1;
      var currentYear = currentDate.getFullYear();
      this.view.calendarReceiveNotice.enableRangeOfDates([currentDay,currentMonth,currentYear-100], 
                                                         [currentDay,currentMonth,currentYear], "sknCalendarNormal", true);
    }
  };
});