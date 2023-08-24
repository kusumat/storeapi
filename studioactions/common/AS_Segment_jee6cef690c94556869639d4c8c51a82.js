function AS_Segment_jee6cef690c94556869639d4c8c51a82(eventobject, sectionNumber, rowNumber) {
    var self = this;
    var selRowData = this.view.segOrderList.selectedRowItems;
    kony.print("selected row :" + this.view.segOrderList.selectedRowItems);
    var nextForm = new kony.mvc.Navigation("frmProductDetails");
    nextForm.navigate(selRowData);
}