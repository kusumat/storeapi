define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.calendarAchievedDate.onTouchEnd = this.alignCalendarAchievedDate.bind(this);
      this.initGettersSetters();
      this.initCalendar();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    initCalendar: function() {
      this.myresetAchievedDateToPlaceholder();
    },
    myformattedDate: function() {
      return this.view.calendarAchievedDate.formattedDate;
    },
    alignCalendarAchievedDate: function() {
      //you can use: "right","left","top" or "bottom"
      try {
        this.view.calendarAchievedDate.setContext({
          "widget": this.view.calendarAchievedDate,
          "anchor": "bottom"
        });
      } catch (ex) {
        kony.print("Exception found in alignCalendar: " + ex);
      }
    },
    mysetAchievedDate: function(argAchievedDate) {
      if ((argAchievedDate !== null) && (argAchievedDate.length > 0)){
        var achievedDateComponents = argAchievedDate.split(/\//);
        this.view.calendarAchievedDate.dateComponents[0] = achievedDateComponents[1];
        this.view.calendarAchievedDate.dateComponents[1] = achievedDateComponents[0];
        this.view.calendarAchievedDate.dateComponents[2] = achievedDateComponents[2];
      } else {
        this.myresetAchievedDateToPlaceholder();     
      }
    },
    myresetAchievedDateToPlaceholder: function() {
	  this.view.calendarAchievedDate.clear();      
    },
  };
});