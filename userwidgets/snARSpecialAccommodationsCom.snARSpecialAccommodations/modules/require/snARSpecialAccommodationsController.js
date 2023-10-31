define(function() {
  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.initCalendar();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    initCalendar:function() {
      var currentDate = new Date();
      var currentDay = currentDate.getUTCDate();
      var currentMonth = currentDate.getMonth()+1;
      var currentYear = currentDate.getFullYear();
      this.view.calendarEventDate.enableRangeOfDates([currentDay,currentMonth,currentYear], 
                                                         [currentDay,currentMonth,currentYear+100], "sknCalendarNormal", true);
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


  };
});