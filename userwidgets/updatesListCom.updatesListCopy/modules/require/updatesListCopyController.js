define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //this.setUpdatesSectionData(gblNotificationsList);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    setUpdatesSectionData:function(data) {

      var dataRows = [];
      var updateCount = 0;

      if(data !== null && data !== undefined) {
        updateCount = data.length;

        for(var i = 0; i < data.length; i++) {
          var dataRow = {"imgArrowRight":"",
                         "lblTypeTitle":data[i],
                         "lblUILine":"-Line-"
                        };
          dataRows.push(dataRow);
        }
      }

      if(updateCount === 1) {
        this.view.lblTitleSectionCard.text = "1 Update";  
      }
      else {
        this.view.lblTitleSectionCard.text = updateCount + " Updates";  
      }      

      this.view.sgmDataUpdateList.data = dataRows;
      this.view.forceLayout();

    }
  };
});