#!/bin/sh
###############################################################
#                 CloudBuildScript		                              #
###############################################################
# Purpose:
# Purpose of this file is to trigger the build on local       #
# machine, to generate binaries for the Required Platforms,   #
# publish services, publish pwa app .                         #
###############################################################

# Adding the input parameter to a dynamic property file
propertyFile="$1"

# Condition to check if the number of parameters passed as input
# are correct or not
if [ "$#" -eq 1 ]; then
  echo "Correct number of parameters passed"
  # Checking if the property file exists
  if [ -f "$propertyFile" ]; then
    # Read the keys and values in the property file
    while IFS='=' read -r key value
    do
      key=$(echo $key | tr '.' '_')
      eval "${key}='${value}'"
    done < "$propertyFile"

    echo "The property file $propertyFile found."

    THCI_SRC_ZIP_FILE="${THCI_PROJECT_NAME}.zip"
    THCI_BINARIES_FOLDER="binaries"
    echo "Project File is :: $THCI_PROJECT_NAME"

    echo "************************************************************"
		echo "PRE BUILD ACTIVITIES - UPDATE PROJECT PROPERTIES JSON WITH DYNAMIC VALUES - START"

    CONFIG_FILE=$propertyFile
    THCI_PRJ_PROP_JSON="projectProperties.json"

    cd $WORKSPACE/${THCI_PROJECT_NAME}
    echo "projectProperties File::${THCI_PRJ_PROP_JSON}"

    sed -i -e 's|"iphonebundleidentifierkey":.*|"iphonebundleidentifierkey":"'$THCI_APP_BUNDLE_ID'",|g' $THCI_PRJ_PROP_JSON
    sed -i -e 's|"iphonebundleversionkey":.*|"iphonebundleversionkey":"'$THCI_APP_BUNDLE_VERSION'",|g' $THCI_PRJ_PROP_JSON

    sed -i -e 's|"appversionkey":.*|"appversionkey":"'$THCI_APP_VERSION'",|g' $THCI_PRJ_PROP_JSON
    sed -i -e 's|"appversioncode":.*|"appversioncode":"'$THCI_APP_VERSION_CODE'",|g' $THCI_PRJ_PROP_JSON

    sed -i -e 's|"appnamekey":.*|"appnamekey":"'$THCI_APP_NAME'",|g' $THCI_PRJ_PROP_JSON
    sed -i -e 's|"appidkey":.*|"appidkey":"'$THCI_APP_ID'",|g' $THCI_PRJ_PROP_JSON

    sed -i -e 's|"iOSMobileProvision":.*|"iOSMobileProvision":"'certificates/iOS/$THCI_IOS_MOBILE_PROVISION'",|g' $THCI_PRJ_PROP_JSON
    sed -i -e 's|"iOSP12FilePath":.*|"iOSP12FilePath":"'certificates/iOS/$THCI_IOS_CERT_FILE'",|g' $THCI_PRJ_PROP_JSON
    sed -i -e 's|"iOSP12Password":.*|"iOSP12Password":"'$THCI_IOS_CERT_PASS'",|g' $THCI_PRJ_PROP_JSON

    sed -i -e 's|"keyAlias":.*|"keyAlias":"'$THCI_ANDROID_KEY_ALIAS'",|g' $THCI_PRJ_PROP_JSON
    sed -i -e 's|"keyPassword":.*|"keyPassword":"'$THCI_ANDROID_KEY_PASS'",|g' $THCI_PRJ_PROP_JSON
    sed -i -e 's|"keyStoreFilePath":.*|"keyStoreFilePath":"'certificates/android/$THCI_ANDROID_KEYSTORE_PATH'",|g' $THCI_PRJ_PROP_JSON
    sed -i -e 's|"keyStorePassword":.*|"keyStorePassword":"'$THCI_ANDROID_KEYSTORE_PASS'",|g' $THCI_PRJ_PROP_JSON

		echo "PRE BUILD ACTIVITIES - UPDATE PROJECT PROPERTIES JSON WITH DYNAMIC VALUES - END"
		echo "************************************************************"


    echo "************************************************************"
    echo "PRE BUILD ACTIVITIES - UPDATE BUILD PARAMETERS PROPERTIES JSON WITH DYNAMIC VALUES - START"

    THCI_BUILD_AUTOMATION_FOLDER="BuildAutomation"
    THCI_BUILD_AUTOMATION_PROPS_FILE="CloudBuild_parameters.json"
    cd $WORKSPACE/${THCI_BUILD_AUTOMATION_FOLDER}/

    sed -i -e "s|#project_name#|$THCI_APP_ID|g" $THCI_BUILD_AUTOMATION_PROPS_FILE

    sed -i -e "s|#recipients_list#|$THCI_BUILD_RECIPIENTS_LIST|g" $THCI_BUILD_AUTOMATION_PROPS_FILE

    sed -i -e "s|#fabric_app_name#|$THCI_MF_APP_NAME|g" $THCI_BUILD_AUTOMATION_PROPS_FILE

    sed -i -e "s|#fabric_env_name#|$THCI_MF_ENV_NAME|g" $THCI_BUILD_AUTOMATION_PROPS_FILE

    sed -i -e "s|#fabric_app_version#|$THCI_MF_APP_VERSION|g" $THCI_BUILD_AUTOMATION_PROPS_FILE

    sed -i -e "s|#ios_mobile_app_id#|$THCI_IOS_APP_BUNDLE_ID|g" $THCI_BUILD_AUTOMATION_PROPS_FILE

    sed -i -e "s|#ios_app_version#|$THCI_IOS_APP_VERSION|g" $THCI_BUILD_AUTOMATION_PROPS_FILE

    sed -i -e "s|#ios_bundle_version#|$THCI_IOS_APP_BUNDLE_VERSION|g" $THCI_BUILD_AUTOMATION_PROPS_FILE

    sed -i -e "s|#android_version_code#|$THCI_ANDROID_APP_VERSION_CODE|g" $THCI_BUILD_AUTOMATION_PROPS_FILE

    sed -i -e "s|#android_app_version#|$THCI_ANDROID_APP_VERSION|g" $THCI_BUILD_AUTOMATION_PROPS_FILE

    sed -i -e "s|#android_mobile_app_id#|$THCI_ANDROID_APP_PACKAGE_NAME|g" $THCI_BUILD_AUTOMATION_PROPS_FILE

    rm -rf $WORKSPACE/${THCI_PROJECT_NAME}/certificates
    mv $WORKSPACE/${THCI_BUILD_AUTOMATION_FOLDER}/certificates $WORKSPACE/${THCI_PROJECT_NAME}/

    echo "PRE BUILD ACTIVITIES - UPDATE  BUILD PARAMETERS PROPERTIES JSON WITH DYNAMIC VALUES - END"
    echo "************************************************************"

    cd $WORKSPACE
    zip -r ./"$THCI_SRC_ZIP_FILE" $THCI_PROJECT_NAME -x "*.git*" -x "*/Fabric/*" #-x "*/node_modules/*" #-x "*/jssrc/*"
    mv $THCI_SRC_ZIP_FILE $WORKSPACE/BuildAutomation/
    cd $WORKSPACE/BuildAutomation/
    java -jar $THCI_MFCLI_JAR_PATH build -u "$THCI_CLOUD_USERNAME" -p "$THCI_CLOUD_PASSWORD" -t "$THCI_FABRIC_ACCOUNT_ID" -e "$THCI_ENV_NAME" -pp "$THCI_PROJECT_PROPS_FILE" -sp "$THCI_SRC_ZIP_FILE" -od "$THCI_BINARIES_FOLDER"
  else
    echo "The property file $propertyFile not found."
  fi

  else
  echo "Wrong number of parameters!!"
fi
