FROM maven:3.6.2-jdk-8-slim

ENV USER_HOME_DIR="/home/github"
ENV MAVEN_CONFIG "$USER_HOME_DIR/.m2"

# setup user and permissions 
ARG uid=1000 
ARG gid=1000
ARG dgid=989
RUN groupadd --gid $gid github && groupadd --gid $dgid docker \
  && useradd --create-home --uid $uid --gid $gid --groups docker github 

COPY config/settings.xml $MAVEN_CONFIG/settings.xml
COPY entrypoint.sh /entrypoint.sh

USER github
ENTRYPOINT ["/entrypoint.sh"]