define(function() {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.radioWhatHappened.onSelection = this.selectWhatHappened;
      this.view.txtBoxComments.onTextChange = this.txtBoxCommentsChanged;
      this.view.txtBoxComments.onKeyUp = this.txtBoxCommentsKeyup;
      amplify.subscribe("authorizedDash", this, this.onBreakpointChange, 1); 
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },
    
    onBreakpointChange: function(form, width){
      try{
      var options = this.view.radioWhatHappened.masterData.length;
      var radioButtonGroupHeight = options * 29 + 20;
      if(width <= gblBreakPoint) {
        radioButtonGroupHeight = options * 34+20;
        this.view.lblTitle1.skin                = 'sknLblGrayishDark115Mobile';
        this.view.radioWhatHappened.width       = '95%';
        this.view.radioWhatHappened.skin        = 'sknRadioBtnDarkGrayReg100Mobile';
        this.view.txtBoxComments.width 			= '95%';
        this.view.radioWhatHappened.height      =  radioButtonGroupHeight + 'px';
      }
      else {
        this.view.lblTitle1.skin                = 'sknLblGrayishDark115';
        this.view.radioWhatHappened.width       = '80%';
        this.view.radioWhatHappened.skin        = 'sknRadioBtnDarkGrayReg100';
        this.view.txtBoxComments.width 			= '80%';
        this.view.radioWhatHappened.height      = radioButtonGroupHeight + 'px';
      }
      }catch(err){
      kony.print("onBreakpointChange Exception:"+err);
    }
    },    

    setWhatHappenedData: function() {

      var tempWhatHappenedQuestions = whatHappenedQuestions;
      var whatHappenedData = [];

      for(var i = 0; i < tempWhatHappenedQuestions.length; i++) {
        var tempData = [];
        if(gblBenefitsProgram === tempWhatHappenedQuestions[i].ProgramDescription) {
          tempData.push(tempWhatHappenedQuestions[i].IssueQuestionCode);
          tempData.push(tempWhatHappenedQuestions[i].IssueQuestionText);
          whatHappenedData.push(tempData);
        }
      }
      entries = programsAndIssues.entries();
      element = entries.next();
      while(!element.done) {
        entry = element.value[1];
        var program = entry[0];
        var issue = entry[1];
        var issueComments = entry[3];
        if(gblBenefitsProgram === program) {
          this.view.txtBoxComments.text = issueComments === undefined ? "" : issueComments;
          gblWhatHappenedComments = this.view.txtBoxComments.text;
        }
        element = entries.next();          
      }    
      gblWhatHappenedQuestionsFiltered = whatHappenedData; 
      this.view.radioWhatHappened.masterData = whatHappenedData; 
      this.view.lblTitle1.text = "Tell us what happened to your " + gblBenefitsProgram;

      this.view.radioWhatHappened.selectedKey = null;  
      this.view.lblCommentsCharCount.text = this.view.txtBoxComments.text.length.toString() + "/1000";
      this.view.forceLayout();
    },

    getSelectedKey:function() {
      return this.view.radioWhatHappened.selectedKey;
    },    


    selectWhatHappened:function() {
      var selection = this.view.radioWhatHappened.selectedKeyValue;
      gblWhatHappenedCode = selection[0];
      gblWhatHappenedText = selection[1];
    },
    
    txtBoxCommentsChanged:function() {
		gblWhatHappenedComments = this.view.txtBoxComments.text;
      
    },
    txtBoxCommentsKeyup: function(event) {
      this.view.lblCommentsCharCount.text = this.view.txtBoxComments.text.length.toString() + "/1000";
    },
    setSelectedIssue:function(issueCode) {
      this.view.radioWhatHappened.selectedKey = issueCode;  
    }


  };
});