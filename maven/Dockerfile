#FROM maven:3.6.2-jdk-8-slim
FROM nexus.pentaho.org/jenkins-build/maven/oracle-jdk/8

ENV USER_HOME_DIR="/home/buildguy"
ENV MAVEN_CONFIG "$USER_HOME_DIR/.m2"

# setup user and permissions 
ARG dgid=989
RUN groupadd --gid $dgid docker \
  && usermod -a -G docker buildguy

COPY config/settings.xml $MAVEN_CONFIG/settings.xml
COPY entrypoint.sh /entrypoint.sh

USER buildguy
ENTRYPOINT ["/entrypoint.sh"]