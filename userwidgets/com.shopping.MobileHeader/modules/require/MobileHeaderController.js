define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    onBackClick: function(){
      var currentForm = kony.application.getCurrentForm().id;
      var nft;

      switch (currentForm) {
        case "frmProductDescription":
          nft =  new kony.mvc.Navigation("frmProductDetails");
          break;
        case "frmProductDetails":
          nft =  new kony.mvc.Navigation("frmCreateOrder");
          break;
        case "frmCreateOrder":
          nft = new kony.mvc.Navigation("frmShoppingList");
          break;

      }
      nft.navigate();
    }
  };
});