#FROM maven:3.6.2-jdk-8-slim
FROM nexus.pentaho.org/jenkins-build/maven/oracle-jdk/8

ENV USER_HOME_DIR="/home/buildguy"
ENV MAVEN_CONFIG_DIR "$USER_HOME_DIR/.m2"
ENV MAVEN_CACHE_DIR "/cache"

# setup user and permissions 
ARG dgid=989
RUN groupadd --gid $dgid docker && usermod -a -G docker buildguy

COPY config/settings.xml $MAVEN_CONFIG_DIR/settings.xml
RUN mkdir -p $MAVEN_CACHE_DIR
RUN chown -R buildguy:buildguy $MAVEN_CONFIG_DIR $MAVEN_CACHE_DIR

COPY entrypoint.sh /entrypoint.sh

USER buildguy
WORKDIR /workspace
ENTRYPOINT ["/entrypoint.sh"]