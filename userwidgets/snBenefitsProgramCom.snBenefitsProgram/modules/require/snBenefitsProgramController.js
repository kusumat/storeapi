define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.radioProgramDescriptions.onSelection = this.onSelectProgramDescription;
      this.loadPortalIssueQuestions();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    
    getSelectedKey:function() {
      gblBenefitsProgram = this.view.radioProgramDescriptions.selectedKey; 
      return this.view.radioProgramDescriptions.selectedKey;
    },

    loadPortalIssueQuestions:function() {
      if(gblPortalIssueQuestions.length === 0) {
        var serviceName = "appellantServices";
        var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
        operationName =  "getPortalIssueQuestions";
        var data= {};
        var headers= {};
        integrationObj.invokeOperation(operationName, headers, data, this.loadPortalIssueQuestionsSuccess, this.loadPortalIssueQuestionsFailure);

      } 
      else {
        this.populateBenefitsQuestions();
      }      
    },

    loadPortalIssueQuestionsSuccess:function(response) {
      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errInfoBenefitsPrograms;
        response.userAction = apiActions.actionWait;
        navigateToErrorPage(response);  
      }
      else
      {
        if(response.errorStatus !== undefined && response.errorStatus[0].errorCode === "UNEXPECTED_ERROR") {
          response.userAction = apiActions.actionWait;
          navigateToErrorPage(response);  
        }         
        else 
        {      
          if(response !== undefined && response.IssueQuestions !== undefined) {
            gblPortalIssueQuestions = response.IssueQuestions;
            this.populateBenefitsQuestions();
          }
        }
      }
    },
    
    loadPortalIssueQuestionsFailure:function(error) {
      var callSpecificMsg = "Unable to access Benefits Programs.";
      currentFrm.view.puInformationDialog.flxContainerInfoHeight = '150px';
      currentFrm.view.puInformationDialog.lblTitleText = "Experiencing Technical Difficulties";
      currentFrm.view.puInformationDialog.lblDescText = callSpecificMsg+"\n\n"+apiActions.actionCheckNetwork; 
      currentFrm.view.puInformationDialog.isVisible = true; 
      currentFrm.view.forceLayout();
    },
    
    populateBenefitsQuestions:function() {
        var questionlength = gblPortalIssueQuestions.length;
        
        if(questionlength > 0) {
          whatHappenedQuestions = gblPortalIssueQuestions;
          var tmp = new Set();
          for(var i = 0; i < questionlength; i++) {
            var issueQuestion = gblPortalIssueQuestions[i];
            tmp.add(issueQuestion.ProgramDescription);
          }

          let uniqueDescriptions = [];
          tmp.forEach(function(value) {
  		  	uniqueDescriptions.push(value);
	  	  });

          var sortedUniqueDescriptions = uniqueDescriptions.slice().sort();
          var radioButtonData = [];
          gblBenefitsPrograms = sortedUniqueDescriptions;

          for(var j = 0; j < sortedUniqueDescriptions.length; j++) {
            var descriptionChoice = [];
            descriptionChoice.push(sortedUniqueDescriptions[j]);
            descriptionChoice.push(sortedUniqueDescriptions[j]);
            radioButtonData.push(descriptionChoice);
          }
          
          this.view.radioProgramDescriptions.masterData = radioButtonData;
          this.view.radioProgramDescriptions.selectedKey = null;
          this.view.forceLayout();

        }
      
    },
    
  	onSelectProgramDescription:function() {
      gblBenefitsProgram = this.view.radioProgramDescriptions.selectedKey; 
  	},
    
    resetRadioButtons:function() {
      this.view.radioProgramDescriptions.selectedKey = null;
      this.view.forceLayout();
    },
    
    setSelectedBenefitsProgram:function(program) {
      this.view.radioProgramDescriptions.selectedKey = program;
    }
 
  };
  
});