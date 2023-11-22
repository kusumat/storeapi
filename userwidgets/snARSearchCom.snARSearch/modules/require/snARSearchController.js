define(function() {
  var altKey = "";
  var shiftKey= "";
  var arrowKey = "";
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
//       this.view.radioReceivedNotice.onSelection = this.setReceivedNotice;
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1); 
      this.view.TabPaneSearch.calendarStartDate.onTouchEnd = this.alignCalendarStartDate.bind(this);
      this.view.TabPaneSearch.calendarEndDate.onTouchEnd = this.alignCalendarEndDate.bind(this);

      addEventListener('keydown',this.keyDown);
      addEventListener('keyup',this.keyUp);
      
      this.initCalendar();
      
      this.view.TabPaneSearch.txtBoxEnterFirstName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": " ", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.TabPaneSearch.txtBoxEnterLastName.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": " ", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.TabPaneSearch.txtBoxEnterAppealNumber.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": " ", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.TabPaneSearch.txtBoxEnterCaseNumber.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": " ", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.TabPaneSearch.calendarStartDate.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": " ", 
        "a11yHint": "press enter to activate", 
        "a11yIndex": 0 
      };
      this.view.TabPaneSearch.calendarEndDate.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": " ", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };     
      this.view.TabPaneSearch.txtBoxEnterFirstNameCompleted.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": " ", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.TabPaneSearch.txtBoxEnterLastNameCompleted.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": " ", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.TabPaneSearch.txtBoxEnterAppealNumberCompleted.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": " ", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
      this.view.TabPaneSearch.txtBoxEnterCaseNumberCompleted.accessibilityConfig = {
        "a11yHidden": false, 
        "a11yLabel": " ", 
        "a11yHint": "", 
        "a11yIndex": 0 
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    keyDown: function(e){ 
      if (window.event.code.includes("Alt") === true) {
        altKey = true;
      }
      if (window.event.code.includes("Shift") === true) {
        shiftKey = true;
      }

      if (altKey === true && shiftKey === true) {
        if (window.event.code === "ArrowRight") {
          switch (this.view.TabPaneSearch.activeTab) {
            case 0:
              this.view.TabPaneSearch.activeTab = 1;
              break;
            case 1:
              this.view.TabPaneSearch.activeTab = 2;
              break;                
            case 2:
              this.view.TabPaneSearch.activeTab = 2;
              break;                
          }
        }
        else
        {
          if (window.event.code === "ArrowLeft") {
            switch (this.view.TabPaneSearch.activeTab) {
              case 0:
                this.view.TabPaneSearch.activeTab = 0;
                break;  
              case 1:
                this.view.TabPaneSearch.activeTab = 0;
                break;        
              case 2:
                this.view.TabPaneSearch.activeTab = 1;
                break;          
            }
          }
        }
      }
    },
    keyUp: function(e){ 
      if (window.event.code.includes("Alt") === true) {
        altKey = false;
      }
      if (window.event.code.includes("Shift") === true) {
        shiftKey = false;
      }
      if (window.event.code === "ArrowRight") {
        arrowKey = "";
      }
      if (window.event.code === "ArrowLeft") {
        arrowKey = "";
      }
    },

    setComponentData: function(contButton) {
      //gblARReceivedStatus = false;
      //this.view.TabPaneSearch.CheckBoxRecievedStatus.selectedKeys = null;
      this.continueButton = contButton;
//       this.view.TabPaneSearch.calendarStartDate.onTouchEnd = this.onCalendarStartDateTouchEnd;
      this.view.TabPaneSearch.calendarStartDate.onSelection= this.onCalendarStartDateTouchEnd;
//       this.view.TabPaneSearch.calendarEndDate.onTouchEnd = this.onCalendarEndDateTouchEnd;
      this.view.TabPaneSearch.calendarEndDate.onSelection = this.onCalendarEndDateTouchEnd;
      
    },
    alignCalendarStartDate: function() {
      //you can use: "right","left","top" or "bottom"
      try {
        this.view.TabPaneSearch.calendarStartDate.setContext({
          "widget": this.view.TabPaneSearch.calendarStartDate,
          "anchor": "bottom"
        });
      } catch (ex) {
        kony.print("Exception found in alignCalendar: " + ex);
      }
    },
    alignCalendarEndDate: function() {
      //you can use: "right","left","top" or "bottom"
      try {
        this.view.TabPaneSearch.calendarEndDate.setContext({
          "widget": this.view.TabPaneSearch.calendarEndDate,
          "anchor": "bottom"
        });
      } catch (ex) {
        kony.print("Exception found in alignCalendar: " + ex);
      }
    },
    getComponentData: function(contButton) {
      switch (this.view.TabPaneSearch.activeTab) {
        case 0:
          gblARSearchTab = "Appellants";
          break;
        case 1:
          gblARSearchTab = "HearingSchedules";
          break;        
        case 2:
          gblARSearchTab = "CompletedHearings";
          break;          
      }
      gblHearingStartDate = "";
      gblHearingEndDate = "";
      if (this.view.TabPaneSearch.calendarStartDate.formattedDate !== ""){
        gblHearingStartDate = this.view.TabPaneSearch.calendarStartDate.formattedDate;
      }
      if (this.view.TabPaneSearch.calendarEndDate.formattedDate !== ""){
        gblHearingEndDate = this.view.TabPaneSearch.calendarEndDate.formattedDate;
      }
    },
    onCalendarStartDateTouchEnd: function (calendar, isValidDateSelected){ 
      var startDate = "";
      var endDate = "";
      var date = "";
      if (this.view.TabPaneSearch.calendarStartDate.formattedDate.length === 10) {
        startDate = this.view.TabPaneSearch.calendarStartDate.year.toString() + 
          			this.view.TabPaneSearch.calendarStartDate.month.toString().padStart(2, '0')+  
          			this.view.TabPaneSearch.calendarStartDate.day.toString().padStart(2, '0');
      }
      if (this.view.TabPaneSearch.calendarEndDate.formattedDate.length === 10) {
        endDate = this.view.TabPaneSearch.calendarEndDate.year.toString() + 
          		  this.view.TabPaneSearch.calendarEndDate.month.toString().padStart(2, '0') + 
          		  this.view.TabPaneSearch.calendarEndDate.day.toString().padStart(2, '0');
      }
      if ((startDate !== "" && endDate === "") || (startDate > endDate))
      {
          this.view.TabPaneSearch.calendarEndDate.dateComponents = [this.view.TabPaneSearch.calendarStartDate.day, this.view.TabPaneSearch.calendarStartDate.month,this.view.TabPaneSearch.calendarStartDate.year];
      }       
    },
    onCalendarEndDateTouchEnd: function (){ 
      var startDate = "";
      var endDate = "";
      var date = "";
      if (this.view.TabPaneSearch.calendarStartDate.formattedDate.length === 10) {
        startDate = this.view.TabPaneSearch.calendarStartDate.year.toString() + 
          			this.view.TabPaneSearch.calendarStartDate.month.toString().padStart(2, '0')+  
          			this.view.TabPaneSearch.calendarStartDate.day.toString().padStart(2, '0');
      }
      if (this.view.TabPaneSearch.calendarEndDate.formattedDate.length === 10) {
        endDate = this.view.TabPaneSearch.calendarEndDate.year.toString() + 
          		  this.view.TabPaneSearch.calendarEndDate.month.toString().padStart(2, '0') + 
          		  this.view.TabPaneSearch.calendarEndDate.day.toString().padStart(2, '0');
      }
      if ((startDate === "" && endDate !== "") || (startDate > endDate))
      {
          this.view.TabPaneSearch.calendarStartDate.dateComponents = [this.view.TabPaneSearch.calendarEndDate.day, this.view.TabPaneSearch.calendarEndDate.month,this.view.TabPaneSearch.calendarEndDate.year];
      }       
    },
    onBreakpointChange: function(form, width){
      if(width <= gblBreakPoint) {
        this.view.TabPaneSearch.lblFirstName.skin  = 'sknLblGrayishDark115Mobile';
        this.view.TabPaneSearch.lblLastName.skin = 'sknLblGrayishDark115Mobile';
        this.view.TabPaneSearch.lblCaseNumber.skin = 'sknLblGrayishDark115Mobile';
        this.view.TabPaneSearch.lblAppealNumber.skin = 'sknLblGrayishDark115Mobile';
        this.view.TabPaneSearch.lblLastName.skin = 'sknLblGrayishDark115Mobile';
        
        this.view.TabPaneSearch.txtBoxEnterFirstName.width  = '95%';
        this.view.TabPaneSearch.txtBoxEnterLastName.width  = '95%';
        this.view.TabPaneSearch.txtBoxEnterAppealNumber.width  = '95%';
        this.view.TabPaneSearch.txtBoxEnterCaseNumber.width  = '95%';
        
        this.view.TabPaneSearch.txtBoxEnterFirstNameCompleted.width  = '95%';
        this.view.TabPaneSearch.txtBoxEnterLastNameCompleted.width  = '95%';
        this.view.TabPaneSearch.txtBoxEnterAppealNumberCompleted.width  = '95%';
        this.view.TabPaneSearch.txtBoxEnterCaseNumberCompleted.width  = '95%';


      }
      else {
        this.view.TabPaneSearch.lblFirstName.skin  = 'sknLblGrayishDark100';
        this.view.TabPaneSearch.lblLastName.skin = 'sknLblGrayishDark100';
        this.view.TabPaneSearch.lblCaseNumber.skin = 'sknLblGrayishDark100';
        this.view.TabPaneSearch.lblAppealNumber.skin = 'sknLblGrayishDark100';
       
        this.view.TabPaneSearch.txtBoxEnterFirstName.width  = '45%';
        this.view.TabPaneSearch.txtBoxEnterLastName.width  = '45%';
        this.view.TabPaneSearch.txtBoxEnterAppealNumber.width  = '45%';
        this.view.TabPaneSearch.txtBoxEnterCaseNumber.width  = '45%';
        
        this.view.TabPaneSearch.txtBoxEnterFirstNameCompleted.width  = '45%';
        this.view.TabPaneSearch.txtBoxEnterLastNameCompleted.width  = '45%';
        this.view.TabPaneSearch.txtBoxEnterAppealNumberCompleted.width  = '45%';
        this.view.TabPaneSearch.txtBoxEnterCaseNumberCompleted.width  = '45%';
      }
    },    
        
    initCalendar:function() {
//       var currentDate = new Date();
//       currentDate.setDate(currentDate.getDate() + -1);
//       var currentDay = currentDate.getUTCDate();
//       var currentMonth = currentDate.getMonth()+1;
//       var currentYear = currentDate.getFullYear();
//       this.view.TabPaneSearch.calendarCompliance.enableRangeOfDates([currentDay,currentMonth,currentYear-100], 
//                                                          [currentDay,currentMonth,currentYear], "sknCalendarNormal", true);
    }
  };
});