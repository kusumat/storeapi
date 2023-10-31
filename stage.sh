#!/bin/sh

version=2.0.0

#
# syntax: stage --for {rad | dev | sys | uat | prod } folder  # dtYYYYMMDD[a..z]


function usage()
{
    echo "usage: stage --env={rad | dev | sys | uat | prod } --folder=YYYYMMDD_descriptive"
    echo ""
    echo "stage"
    echo "\t-h --help"
    echo "\t--env={ rad | dev | sys | uat | prod }"
    echo "\t--folder=YYYYMMDD_descriptive (e.g., _SPRINT6)"
    echo ""
    echo ""
}

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
        -e | --env)
            arg_env=$VALUE
            ;;
        -f | --folder)
            arg_folder=$VALUE
            ;;
        *)
            echo "ERROR: unknown parameter \"$PARAM\""
            usage
            exit 1
            ;;
    esac
    shift
done

echo '***** THIS VERSION HAS THE PATHS FIXED.  *****'
echo VER: ${version}
echo ENV: ${arg_env}
echo FOLDER: ${arg_folder}

if [ "$arg_env" == "rad" ] 
then
    the_path="//Volumes/global/Public/BobJames/HATS/dist/${arg_folder}"
    cmd_mkdir="mkdir -p "${the_path}
    cmd_cp="cp binaries/ear/SHARE.ear "${the_path}""
    echo ... "${cmd_mkdir}"
    echo ... "${cmd_cp}"
    while true; do
        read -p "Do you wish to distribute this binary? " yn
        case $yn in
            [Yy]* ) break;;
            [Nn]* ) exit;;
            * ) echo "Please answer yes or no.";;
        esac
    done
    `${cmd_mkdir}`
    `${cmd_cp}`
else
    the_path="//Volumes/shares/AIR-P06/SHARED/PRIVATE/HATS/HATS_EAR/"
    the_otherpath="//Volumes/shares/AIR-P06/SHARED/PRIVATE/HATS/HATS_EAR/${arg_folder}"
    cmd_mkdir="mkdir -p "${the_otherpath}
    cmd_cp="cp binaries/ear/SHARE.ear "${the_path}""
    cmd_cpother="cp binaries/ear/SHARE.ear "${the_otherpath}""
    echo ... "${cmd_mkdir}"
    echo ... "${cmd_cp}"
    echo ... "${cmd_cpother}"
    while true; do
        read -p "Do you wish to distribute this binary? " yn
        case $yn in
            [Yy]* ) break;;
            [Nn]* ) exit;;
            * ) echo "Please answer yes or no.";;
        esac
    done
    `${cmd_mkdir}`
    `${cmd_cpother}`
    `${cmd_cp}`
fi

