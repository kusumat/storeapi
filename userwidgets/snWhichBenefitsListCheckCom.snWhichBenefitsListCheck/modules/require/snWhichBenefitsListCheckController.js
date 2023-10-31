define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.sgmReasonsWReschedule.onSelection = this.onSelectProgramDescription;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },
    
    getSelectedKey:function() {
      return this.view.sgmReasonsWReschedule.selectedKey;
    },

    loadPortalIssueQuestions:function() {
      //"KNYMobileFabric" is the current instance of the Kony Fabric auto initialized by Visualizer
      var serviceName = "appellantServices";
      var integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
      //Code to invoke parent integration service should be present to use below code.
      operationName =  "getPortalIssueQuestions";
      var data= {};
      var headers= {};
      integrationObj.invokeOperation(operationName, headers, data, this.loadPortalIssueQuestionsSuccess, this.loadPortalIssueQuestionsFailure);
    },

    loadPortalIssueQuestionsSuccess:function(response) {
      kony.print("Questions Response: " + JSON.stringify(response));

      if(response.errorCode !== undefined || 500 === response.httpStatusCode) {
        response.errorMessage = apiErrors.errIssuesList;
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
          if(response !== undefined && response.IssueQuestions !== undefined) {
            var questionlength = response.IssueQuestions.length;
            if(questionlength > 0) {
              whatHappenedQuestions = response.IssueQuestions;
              kony.print("questionlength: " + questionlength);

              var programDescriptions = [];
              for(var i = 0; i < questionlength; i++) {
                kony.print("Inside loop: "+i);
                kony.print("programDescriptions: "+ programDescriptions);
                var issueQuestion = response.IssueQuestions[i];
                programDescriptions.push(issueQuestion.ProgramDescription);
              }

              let uniqueDescriptions = [];
              var tmp = new Set(programDescriptions);

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

              //           this.view.radioProgramDescriptions.masterData = radioButtonData;
              this.view.sgmReasonsWReschedule.data = radioButtonData;
              this.view.sgmReasonsWReschedule.selectedKey = null;
              this.view.forceLayout();
            }
          }
        }
      }
    },
    loadPortalIssueQuestionsFailure:function(error) {
      //kony.ui.Alert({ message: "Failed to fetch Issue Questions: " + error.errmsg, alertType:constants.ALERT_TYPE_ERROR, alertTitle:"Service Error", yesLabel:"OK"}, {});
      alert('Unable to access data!');
    },
    
  	onSelectProgramDescription:function() {
      gblBenefitsProgram = this.view.sgmReasonsWReschedule.selectedKey; 
  	},
    
    resetRadioButtons:function() {
      this.view.sgmReasonsWReschedule.selectedKey = null;
      this.view.forceLayout();
    }
 
  };
  
});