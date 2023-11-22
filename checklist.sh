#!/bin/sh

version=draft.v0116

#
# syntax: sh checklist.sh [--all | --war | --ear]


function usage()
{
    echo "usage: sh checklist.sh [--all | --war | --ear]"
    echo ""
    echo "checklist"
    echo "\t-h --help"
    echo "\t--all  \tDisplay checklist for all phases (default)"
    echo "\t--war  \tDisplay checklist only for WAR phase"
    echo "\t--ear  \tDisplay checklist only for EAR phase"
    echo ""
    echo ""
}


echo ""
echo "$0"
echo "Version $version"
echo ""

arg_ear=true;
arg_war=true;

while [ "$1" != "" ]; do
    PARAM=`echo $1 | awk -F= '{print $1}'`
    VALUE=`echo $1 | awk -F= '{print $2}'`
    case $PARAM in
        -h | --help)
            usage
            exit
            ;;
        -v | --ver | --version)
            echo "Version $version"
            exit
            ;;
        -a | --all)
            arg_war=true
            arg_ear=true
            ;;
        -w | --war)
            arg_war=true
            arg_ear=false
            ;;
        -e | --ear)
            arg_ear=true
            arg_war=false
            ;;
        *)
            echo "ERROR: unknown parameter \"$PARAM\""
            usage
            exit 1
            ;;
    esac
    shift
done



if [ "$arg_war" == true ] 
then
    echo "..."
    echo "Needed for WAR"
    echo ""
    echo "\t"`grep -e 'appid=' HeadlessBuild.properties` 
    echo "\t"`grep -e '^project.name=' HeadlessBuild.properties` must match PWD: `pwd`
    echo "\t"`grep -e '^build.mode=' HeadlessBuild.properties`
    echo "\t"`grep -e '"desktopwebtitle"' projectProperties.json` expected to be "SHARE"
    echo "Publish to: "`grep -e '^mobilefabric.url=' HeadlessBuild.properties` 
    echo "\t"`grep -e 'localTestEnv.*=' modules/globals.js`
    echo "\t"`grep -e 'isSkipToken_forTesting.*:' modules/globals.js` must set to "false"
    echo "\t"`grep -e '^binaries.location=' HeadlessBuild.properties` must set to "./binaries"
    echo "\t"`grep -e '^desktopweb=' HeadlessBuild.properties`
    echo "\t"`grep -e '^config.war.name=' HeadlessBuild.properties`
    grep -e '^combinewar\..*=' HeadlessBuild.properties ;
    awk '/server.jars.dir=/,/webfiles.dir=/ {print("\t", $0)}' HeadlessBuild.properties
fi

if [ "$arg_ear" == true ]
then
    echo "..."
    echo "Needed for EAR"
    echo ""
    grep -e 'target.*name.*=' build.xml
fi

