define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.radioReceivedNotice.onSelection = this.setReceivedNotice;
//       this.view.calendarReceiveNotice.onSelection = this.setReceivedNoticeDate;
      this.initCalendar();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

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

//     setReceivedNotice:function() {
//       gblReceivedNotice = this.view.radioReceivedNotice.selectedKey;	
//     },

    setReceivedNoticeDate:function() {
      gblReceivedNoticeDate = this.view.calendarReceiveNotice.formattedDate;
    },

    showHideCalendarSection:function(isVisible) {
      this.view.flxContainerCalendar.setVisibility(isVisible);
      this.view.lblTitle02.setVisibility(isVisible);
    },
    
    resetReceivedNoticeSelection:function() {      
      this.view.radioReceivedNotice.selectedKey = null;
      this.view.calendarReceiveNotice.clear();
	  this.showHideCalendarSection(false);
      this.view.forceLayout();      
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