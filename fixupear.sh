#!/bin/sh

version=draft.v0229
notice="Happy Leap Day"

#
# syntax: sh fixupear.sh [--verbose]


function usage()
{
    echo "usage: sh fixupear.sh [--all | --war | --ear]"
    echo ""
    echo "fixupear"
    echo "\t-h --help"
    echo "\t--verbose  \tDebug messages"
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
        -o | --verbose)
            arg_verbose=true
            ;;
        *)
            echo "ERROR: unknown parameter \"$PARAM\""
            usage
            exit 1
            ;;
    esac
    shift
done

app_name="SHARE"
share_ear="SHARE.ear"
share_war="SHARE.war"
path_build="./binaries/ear"
path_safe="../_safespace"
path_war_after_unar=${path_safe}"/"${app_name}/

if [ "$arg_verbose" == true ] 
then
    echo "Step 1. Find and explode the EAR file ... move it to a safe location ..."
fi

echo "..."
find ./binaries/ -name '*.[we]ar' -exec ls -l {} \;
echo "..."
ls -l ${path_build}/${share_ear}
rm -rf ${path_safe}
mkdir ${path_safe}
cmd_cp="cp -p ${path_build}/${share_ear} ${path_safe}"
cmd_unar="unar -o ${path_safe}/${app_name}  ${path_safe}/${share_ear}"
echo "Exploding ${share_ear} ... into ${path_safe}"
echo "${cmd_cp}"
echo `${cmd_cp}`
echo "${cmd_unar}"
echo `${cmd_unar}`
echo "..."
cmd_unar_war="unar -quiet -output-directory  ${path_safe}/${app_name}/${app_name}/${app_name}  ${path_safe}/${app_name}/${app_name}/${share_war}"
echo `${cmd_unar_war}`

if [ "$arg_verbose" == true ] 
then
    echo "Step 2. Diff the web.xml with the template web.xml ..."
fi

find ${path_safe} -name "web.xml" -exec ls -l {} \;
echo "... verification of build ... device DB lookup"
find ../_safespace -name 'web.xml' -exec awk '/device_db_lookup/,/param-value/ { print(FILENAME, $0) }' {} \;
echo "... verification of build ... KDCDB"
find ../_safespace -name 'web.xml' -exec awk '/KDCDB/,/\// { print(FILENAME, $0) }' {} \;
echo "... ... ..."

if [ "$arg_verbose" == true ] 
then
    echo "Step 3. Replace the web.xml with the template ..."
fi

if [ "$arg_verbose" == true ] 
then
    echo "Step 3. Re-archive the bundle ..."
fi

if [ "$arg_verbose" == true ] 
then
    echo "Step 4. Put the EAR file back for staging ..."
fi



if [ "$arg_verbose" == true ] 
then
    awk '/server.jars.dir=/,/webfiles.dir=/ {print("\t", $0)}' HeadlessBuild.properties
fi

