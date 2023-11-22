function setIntegrityParams(){

    var integrityParams = {"algo" : kony.sdk.constants.HASHING_ALGORITHM,
        "salt" : voltmxRef.mainRef.appSecret,
        "headerName" : kony.sdk.constants.INTEGRITY_HEADER,
        "validateResp" : true
    };
    voltmxRef.mainRef.integrityKey = false;
    voltmxRef.mainRef.integrityParams = integrityParams;
}