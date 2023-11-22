define(function() {

  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.lblTitleUserName.text = gblDemographicInfo.AppellantFirstName;
    },      

    setComponentData:function(name) {
      this.view.lblTitleUserName.text = name;
      this.view.flxContainerHeader.forceLayout();
    },


  };
});