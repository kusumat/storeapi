#!/bin/sh
###############################################################
#                 BuildScript		                              #
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
    echo "The property file $propertyFile found."

    # Read the keys and values in the property file
    while IFS='=' read -r key value
    do
      key=$(echo $key | tr '.' '_')
      eval "${key}='${value}'"
    done < "$propertyFile"

    echo "Project Workspace location ::$WORKSPACE"

		echo "************************************************************"
		echo "PRE BUILD ACTIVITIES - SET PATH & NAMES OF FILES - START"

		#echo "${THCI_PROJECT_WS}"
		#echo "Printing workspace location :::"$THCI_PROJECT_WS
		#cd ${THCI_PROJECT_WS}
		#pwd
		#echo "listing the file in the workspace"
		#ls

    #THCI_ANDROID_TAB_BINARY_PATH="tabrcandroid"
    THCI_ANDROID_TAB_BINARY_PATH="androidtablet"
    THCI_BUILD_PLUGINS_FOLDER="cicdplugins"
    THCI_HEADLESS_BLD_PROP="HeadlessBuild.properties"
    THCI_PRJ_PROP_JSON="projectProperties.json"
    THCI_ANDROID_BUILD_PROP="androidbuild.properties"
    THCI_BUILD_PLUGINS_PATH=""
    THCI_BOOL_TRUE="true"
    THCI_BOOL_FALSE="false"
    THCI_NATIVE_IPHONE="iPhone(Native)"
    THCI_NATIVE_ANDROID="Android(Native)"
    THCI_NATIVE_IPAD="iPad(Native)"
    THCI_NATIVE_ANDROIDTAB="AndroidTab(Native)"
    THCI_PWA_APP="PWA"

		echo "PRE BUILD ACTIVITIES - SET PATH & NAMES OF FILES - END"
		echo "************************************************************"
		# Setting the environment variables according to  OS on which build is triggered.
		echo "************************************************************"
		echo "PRE BUILD ACTIVITIES - SETUP JAVA_HOME and GRADLE_HOME BASED ON PLUGIN VERSION - START"


    echo "ANT_HOME::$ANT_HOME"
    echo "JAVA_HOME::$JAVA_HOME"
		if [ "$THCI_MACHINE_OS" = "windows" ]; then
			export HOME=$THCI_CYGWIN_HOME/bin/bash
			export JAVA_HOME=$THCI_JAVA_HOME
			echo "Printing JAVA_HOME :: "$JAVA_HOME
			export GRADLE_HOME=$THCI_GRADLE_HOME
			echo "Printing GRADLE_HOME :: "$GRADLE_HOME

      export PATH=$PATH:$ANT_HOME/bin:$JAVA_HOME/bin:$GRADLE_HOME/bin
      echo "Printing path ::"$PATH
        #echo "Setting Extra params for CI BUILD::"
        #finalString=$(echo ${THCI_PROJECT_WS} | sed 's/\\/\//g')
        #echo $finalString

		fi
		#Path settings for Mac Machine
		if [ "$THCI_MACHINE_OS" = "mac" ]; then
		    export ANT_HOME=$THCI_ANT_HOME
		    echo "Printing ANT_HOME :: "$ANT_HOME
		    export GRADLE_HOME=$THCI_GRADLE_HOME
		    echo "Printing GRADLE_HOME :: "$GRADLE_HOME
			  export JAVA_HOME=$THCI_JAVA_HOME
		    echo "Printing JAVA_HOME :: "$JAVA_HOME
        #THCI_JAVA_HOME="/var/jenkins_home/tools/hudson.model.JDK/DynamicInstaller"
        #ENV JAVA_HOME "$THCI_JAVA_HOME"
        #ENV PATH $JAVA_HOME/bin:$PATH
		    export PATH=$PATH:${ANT_HOME}/bin:${JAVA_HOME}/bin:${GRADLE_HOME}/bin
		    echo "Printing path ::"$PATH
		fi

		echo "PRE BUILD ACTIVITIES - SETUP JAVA_HOME and GRADLE_HOME BASED ON PLUGIN VERSION - END"
		echo "************************************************************"

		echo "************************************************************"
		echo "PRE BUILD ACTIVITIES - PERFORM PLUGIN EXTRACTION - START"

      cd $WORKSPACE/$THCI_PROJECT_FOLDER_NAME
      PLUGIN_VERSION_NO=$(sed -n 's/.*"currentgaversion": "\(.*\)",/\1/p' $THCI_PRJ_PROP_JSON)
      echo "Found Branding Plugin::$PLUGIN_VERSION_NO"

      echo "Extracted Plugin version::$PLUGIN_VERSION_NO"

      CITOOLS_URL=$(echo $THCI_BUILD_CITOOLS_URL | sed "s/#verno#/$PLUGIN_VERSION_NO/g")

      echo "CI Tools URL::$CITOOLS_URL"
      curl -sS $CITOOLS_URL > citools.zip
      echo "REMOVING EXISTING CI TOOLS FILES - START"
        rm -rf appViewerPackager.js
        rm -rf build.js
        rm -rf externaldependencies.json
        rm -rf generateJasmineArtifacts.js
        rm -rf pluginDownload.js
        rm -rf package.json
        #rm -rf $THCI_BUILD_PLUGINS_FOLDER
      echo "REMOVING EXISTING CI TOOLS FILES - END"
      unzip citools.zip
      npm install


    #cd $WORKSPACE


		echo "PRE BUILD ACTIVITIES - PERFORM PLUGIN EXTRACTION - END"
		echo "************************************************************"

		echo "************************************************************"
		echo "PRE BUILD ACTIVITIES - UPDATE GLOBAL PROPERTIES WITH ACTUAL VALUES - START"

    CONFIG_FILE=$propertyFile

    #if [[ "$THCI_GEN_USE_CONFIGURED_VERSION_CODE" == '' || $THCI_GEN_USE_CONFIGURED_VERSION_CODE = "false" ]]; then
      #echo "INCREMENTING THE VERSION CODE AS ::: ${PARENT_BUILD_NUMBER}"
      #Incrementing the Android Version code and iOS Bundle Version based on the KickStarter Build Number
      #sed -i '' "s/\(android\.versioncode=\).*\$/\1${PARENT_BUILD_NUMBER}/" $CONFIG_FILE
      #sed -i '' "s/\(ios\.bundleversion=\).*\$/\1${PARENT_BUILD_NUMBER}/" $CONFIG_FILE
    #fi

    #Setting android build properties (32 bit, 64 bit, x86, split apks) based on configuration values
    echo "SETTING ANDROID BUILD PROPERTIES - START"
    #cd $WORKSPACE
    if [ -f $THCI_ANDROID_BUILD_PROP ]; then
        rm $THCI_ANDROID_BUILD_PROP
    fi
    #echo "listing the file in the workspace"
		#ls -ltra
    echo "SETTING ANDROID BUILD PROPERTIES - END"

    echo "SETTING ENVIRONMENT VARIABLES"
    echo "HeadlessBuild File::${THCI_HEADLESS_BLD_PROP}"
    echo "projectProperties File::${THCI_PRJ_PROP_JSON}"


    #CHANNELARRAY=(${THCI_BUILD_CHANNELS//,/})
    #THCI_NATIVE_IPHONE=${CHANNELARRAY[0]}
    #THCI_NATIVE_ANDROID=${CHANNELARRAY[1]}
    #THCI_PWA_APP=${CHANNELARRAY[2]}

    THCI_FIRST_PF=$(echo $THCI_BUILD_CHANNELS | awk -F, '{print $1}')
    THCI_SECOND_PF=$(echo $THCI_BUILD_CHANNELS | awk -F, '{print $2}')
    THCI_THIRD_PF=$(echo $THCI_BUILD_CHANNELS | awk -F, '{print $3}')
    THCI_FOUR_PF=$(echo $THCI_BUILD_CHANNELS | awk -F, '{print $4}')
    THCI_FIVE_PF=$(echo $THCI_BUILD_CHANNELS | awk -F, '{print $5}')

    echo "CHANNELARRAY::::$THCI_FIRST_PF,$THCI_SECOND_PF,$THCI_THIRD_PF,$THCI_FOUR_PF,$THCI_FIVE_PF"

    echo "SETTING PATH DETAILS"
    sed -i -e "s|\(plugin\.dir=\).*\$|\1${THCI_BUILD_PLUGINS_FOLDER}|g" ${THCI_HEADLESS_BLD_PROP}
    sed -i -e 's|javaloc=.*|javaloc='"$THCI_JAVA_HOME"'|g' ${THCI_HEADLESS_BLD_PROP}
    sed -i -e 's|androidHome=.*|androidHome='"$THCI_ANDROID_HOME"'|g' ${THCI_HEADLESS_BLD_PROP}

    echo "SETTING FABRIC DETAILS"
    sed -i -e 's|account.id =.*|account.id='""'|g' ${THCI_HEADLESS_BLD_PROP}
    sed -i -e 's|mf.appname =.*|mf.appname='""'|g' ${THCI_HEADLESS_BLD_PROP}
    sed -i -e 's|web.binary.extension =.*|web.binary.extension='""'|g' ${THCI_HEADLESS_BLD_PROP}

    sed -i -e "s|\(environment\.name=\).*\$|\1${THCI_MF_ENV_NAME}|g" ${THCI_HEADLESS_BLD_PROP}
    sed -i -e "s|\(account\.id=\).*\$|\1${THCI_MF_ACCOUNT_ID}|g" ${THCI_HEADLESS_BLD_PROP}
    sed -i -e "s|\(mf\.appname=\).*\$|\1${THCI_MF_APP_NAME}|g" ${THCI_HEADLESS_BLD_PROP}
    sed -i -e "s|\(mf\.app\.version=\).*\$|\1${THCI_MF_APP_VERSION}|g" ${THCI_HEADLESS_BLD_PROP}

    sed -i -e "s|\(cloud\.username=\).*\$|\1${THCI_CLOUD_USERNAME}|g" ${THCI_HEADLESS_BLD_PROP}
    sed -i -e "s|\(cloud\.password=\).*\$|\1${THCI_CLOUD_PASSWORD}|g" ${THCI_HEADLESS_BLD_PROP}
    sed -i -e "s|\(mobilefabric\.url=\).*\$|\1${THCI_FABRIC_URL}|g" ${THCI_HEADLESS_BLD_PROP}
    sed -i -e "s|\(cloud\.environment=\).*\$|\1${THCI_MF_ENV_NAME}|g" ${THCI_HEADLESS_BLD_PROP}

    echo "SETTING PROJECT & BUILD DETAILS"
    sed -i -e "s|\(project\.name=\).*\$|\1${THCI_APP_NAME}|g" ${THCI_HEADLESS_BLD_PROP}
    sed -i -e "s|\(android\.packagename=\).*\$|\1${THCI_APP_PACKAGE_NAME}|g" ${THCI_HEADLESS_BLD_PROP}
    sed -i -e 's|^mode=.*|mode='"${THCI_BUILD_MODE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    sed -i -e 's|"iphonebundleidentifierkey":.*|"iphonebundleidentifierkey":"'$THCI_APP_BUNDLE_ID'",|g' $THCI_PRJ_PROP_JSON
    sed -i -e 's|"appnamekey":.*|"appnamekey":"'$THCI_APP_NAME'",|g' $THCI_PRJ_PROP_JSON
    sed -i -e "s|\(web\.binary\.extension=\).*\$|\1${THCI_PWA_BINARY_FORMAT}|g" ${THCI_HEADLESS_BLD_PROP}

    echo "SETTING IOS PROFILE DETAILS"
    sed -i -e "s|\(keychain\.password=\).*\$|\1${THCI_KEYCHAIN_PASS}|g" ${THCI_HEADLESS_BLD_PROP}
    sed -i -e "s|\(development\.team\.id=\).*\$|\1${THCI_DEV_TEAM_ID}|g" ${THCI_HEADLESS_BLD_PROP}
    sed -i -e 's|^method=.*|method='"${THCI_SIGN_METHOD}"'|g' ${THCI_HEADLESS_BLD_PROP}


    #THCI_NATIVE_IPHONE=${CHANNELARRAY[0]}
    #THCI_NATIVE_ANDROID=${CHANNELARRAY[1]}
    #THCI_PWA_APP

    if [ "$THCI_FIRST_PF" = "$THCI_NATIVE_IPHONE" ]; then
      sed -i -e 's|^iphone=.*|iphone='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
      sed -i -e 's|^genipaiphone=.*|genipaiphone='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_FIRST_PF" = "$THCI_NATIVE_ANDROID" ]; then
      sed -i -e 's|^android=.*|android='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_FIRST_PF" = "$THCI_PWA_APP" ]; then
      sed -i -e 's|^desktopweb=.*|desktopweb='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_FIRST_PF" = "$THCI_NATIVE_IPAD" ]; then
      sed -i -e 's|^ipad=.*|ipad='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
      sed -i -e 's|^genipaipad=.*|genipaipad='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_FIRST_PF" = "$THCI_NATIVE_ANDROIDTAB" ]; then
      sed -i -e 's|^androidtablet=.*|androidtablet='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    fi


    if [ "$THCI_SECOND_PF" = "$THCI_NATIVE_IPHONE" ]; then
      sed -i -e 's|^iphone=.*|iphone='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
      sed -i -e 's|^genipaiphone=.*|genipaiphone='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_SECOND_PF" = "$THCI_NATIVE_ANDROID" ]; then
      sed -i -e 's|^android=.*|android='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_SECOND_PF" = "$THCI_PWA_APP" ]; then
      sed -i -e 's|^desktopweb=.*|desktopweb='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_SECOND_PF" = "$THCI_NATIVE_IPAD" ]; then
      sed -i -e 's|^ipad=.*|ipad='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
      sed -i -e 's|^genipaipad=.*|genipaipad='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_SECOND_PF" = "$THCI_NATIVE_ANDROIDTAB" ]; then
      sed -i -e 's|^androidtablet=.*|androidtablet='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    fi

    if [ "$THCI_THIRD_PF" = "$THCI_NATIVE_IPHONE" ]; then
      sed -i -e 's|^iphone=.*|iphone='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
      sed -i -e 's|^genipaiphone=.*|genipaiphone='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_THIRD_PF" = "$THCI_NATIVE_ANDROID" ]; then
      sed -i -e 's|^android=.*|android='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_THIRD_PF" = "$THCI_PWA_APP" ]; then
      sed -i -e 's|^desktopweb=.*|desktopweb='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_THIRD_PF" = "$THCI_NATIVE_IPAD" ]; then
      sed -i -e 's|^ipad=.*|ipad='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
      sed -i -e 's|^genipaipad=.*|genipaipad='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_THIRD_PF" = "$THCI_NATIVE_ANDROIDTAB" ]; then
      sed -i -e 's|^androidtablet=.*|androidtablet='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    fi

    if [ "$THCI_FOUR_PF" = "$THCI_NATIVE_IPHONE" ]; then
      sed -i -e 's|^iphone=.*|iphone='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
      sed -i -e 's|^genipaiphone=.*|genipaiphone='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_FOUR_PF" = "$THCI_NATIVE_ANDROID" ]; then
      sed -i -e 's|^android=.*|android='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_FOUR_PF" = "$THCI_PWA_APP" ]; then
      sed -i -e 's|^desktopweb=.*|desktopweb='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_FOUR_PF" = "$THCI_NATIVE_IPAD" ]; then
      sed -i -e 's|^ipad=.*|ipad='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
      sed -i -e 's|^genipaipad=.*|genipaipad='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_FOUR_PF" = "$THCI_NATIVE_ANDROIDTAB" ]; then
      sed -i -e 's|^androidtablet=.*|androidtablet='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    fi

    if [ "$THCI_FIVE_PF" = "$THCI_NATIVE_IPHONE" ]; then
      sed -i -e 's|^iphone=.*|iphone='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
      sed -i -e 's|^genipaiphone=.*|genipaiphone='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_FIVE_PF" = "$THCI_NATIVE_ANDROID" ]; then
      sed -i -e 's|^android=.*|android='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_FIVE_PF" = "$THCI_PWA_APP" ]; then
      sed -i -e 's|^desktopweb=.*|desktopweb='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_FIVE_PF" = "$THCI_NATIVE_IPAD" ]; then
      sed -i -e 's|^ipad=.*|ipad='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
      sed -i -e 's|^genipaipad=.*|genipaipad='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    elif [ "$THCI_FIVE_PF" = "$THCI_NATIVE_ANDROIDTAB" ]; then
      sed -i -e 's|^androidtablet=.*|androidtablet='"${THCI_BOOL_TRUE}"'|g' ${THCI_HEADLESS_BLD_PROP}
    fi


		echo "PRE BUILD ACTIVITIES - UPDATE GLOBAL PROPERTIES WITH ACTUAL VALUES - END"
		echo "************************************************************"

		echo "************************************************************"
		echo "BUILD ACTIVITIES - PERFORM BUILD FOR TARGETED PLATFORMS - START"

		echo "THCI_PROJECT_FOLDER_NAME ::$THCI_PROJECT_FOLDER_NAME"

		cd $WORKSPACE/$THCI_PROJECT_FOLDER_NAME

    mkdir $THCI_BUILD_PLUGINS_FOLDER
		pwd
		echo "Removing Binaries folder inside the Project workspace before the Build Process"
		rm -rf binaries

    echo "Run the Build using CI Build tools"
    node build.js --konyvizversion "$PLUGIN_VERSION_NO"

		echo "BUILD ACTIVITIES - PERFORM BUILD FOR TARGETED PLATFORMS - END"
		echo "************************************************************"

		echo "************************************************************"

  else
    echo "The property file $propertyFile not found."
  fi
else
  echo "Wrong number of parameters!!"
fi
