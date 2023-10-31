# - bash profile for Kony CI build (R.James)
# REFER AS TEMPLATE AND MERGE TO YOUR ENVIRONMENT
# ALSO, CONSIDER SWITCHING TO USE zsh SHELL.

export GRADLE_HOME=/usr/local/bin/gradle
export M2_HOME=/usr/local/bin/mvn
export ANT_HOME=/usr/local/bin/apache-ant-1.10.7
export ANDROID_HOME=~/Library/Android/sdk
export ANDROID_BUILD_TOOLS=$ANDROID_HOME/build-tools/29.0.2
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-13.jdk/Contents/Home

export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools:$ANDROID_BUILD_TOOLS:$GRADLE_HOME/bin:$M2_HOME/bin:$JAVA_HOME/bin:$ANT_HOME/bin:/usr/local/bin/rjames


