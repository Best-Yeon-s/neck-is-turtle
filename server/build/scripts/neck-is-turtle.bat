@rem
@rem Copyright 2015 the original author or authors.
@rem
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem      https://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.
@rem

@if "%DEBUG%"=="" @echo off
@rem ##########################################################################
@rem
@rem  neck-is-turtle startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%"=="" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Add default JVM options here. You can also use JAVA_OPTS and NECK_IS_TURTLE_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if %ERRORLEVEL% equ 0 goto execute

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\neck-is-turtle-0.0.1-SNAPSHOT-plain.jar;%APP_HOME%\lib\spring-boot-starter-data-jpa-2.7.5.jar;%APP_HOME%\lib\spring-boot-starter-web-2.7.5.jar;%APP_HOME%\lib\spring-boot-devtools-2.7.5.jar;%APP_HOME%\lib\spring-boot-starter-webflux-2.7.5.jar;%APP_HOME%\lib\spring-boot-configuration-processor-2.7.5.jar;%APP_HOME%\lib\spring-boot-starter-batch-2.7.5.jar;%APP_HOME%\lib\springfox-boot-starter-3.0.0.jar;%APP_HOME%\lib\spring-boot-starter-oauth2-client-2.7.5.jar;%APP_HOME%\lib\spring-boot-starter-security-2.7.5.jar;%APP_HOME%\lib\lombok-1.18.24.jar;%APP_HOME%\lib\jjwt-impl-0.11.2.jar;%APP_HOME%\lib\jjwt-jackson-0.11.2.jar;%APP_HOME%\lib\mysql-connector-j-8.0.31.jar;%APP_HOME%\lib\spring-boot-starter-aop-2.7.5.jar;%APP_HOME%\lib\spring-boot-starter-jdbc-2.7.5.jar;%APP_HOME%\lib\jakarta.transaction-api-1.3.3.jar;%APP_HOME%\lib\jakarta.persistence-api-2.2.3.jar;%APP_HOME%\lib\hibernate-core-5.6.12.Final.jar;%APP_HOME%\lib\spring-data-jpa-2.7.5.jar;%APP_HOME%\lib\spring-aspects-5.3.23.jar;%APP_HOME%\lib\spring-boot-starter-json-2.7.5.jar;%APP_HOME%\lib\spring-boot-starter-2.7.5.jar;%APP_HOME%\lib\spring-boot-starter-tomcat-2.7.5.jar;%APP_HOME%\lib\spring-webmvc-5.3.23.jar;%APP_HOME%\lib\spring-webflux-5.3.23.jar;%APP_HOME%\lib\spring-security-oauth2-client-5.7.4.jar;%APP_HOME%\lib\spring-security-web-5.7.4.jar;%APP_HOME%\lib\spring-security-oauth2-jose-5.7.4.jar;%APP_HOME%\lib\spring-security-oauth2-core-5.7.4.jar;%APP_HOME%\lib\spring-web-5.3.23.jar;%APP_HOME%\lib\spring-boot-autoconfigure-2.7.5.jar;%APP_HOME%\lib\spring-boot-2.7.5.jar;%APP_HOME%\lib\spring-boot-starter-reactor-netty-2.7.5.jar;%APP_HOME%\lib\spring-batch-core-4.3.7.jar;%APP_HOME%\lib\springfox-oas-3.0.0.jar;%APP_HOME%\lib\springfox-data-rest-3.0.0.jar;%APP_HOME%\lib\springfox-bean-validators-3.0.0.jar;%APP_HOME%\lib\springfox-swagger2-3.0.0.jar;%APP_HOME%\lib\springfox-swagger-ui-3.0.0.jar;%APP_HOME%\lib\springfox-swagger-common-3.0.0.jar;%APP_HOME%\lib\springfox-spring-webmvc-3.0.0.jar;%APP_HOME%\lib\springfox-spring-webflux-3.0.0.jar;%APP_HOME%\lib\springfox-spring-web-3.0.0.jar;%APP_HOME%\lib\springfox-schema-3.0.0.jar;%APP_HOME%\lib\springfox-spi-3.0.0.jar;%APP_HOME%\lib\springfox-core-3.0.0.jar;%APP_HOME%\lib\classmate-1.5.1.jar;%APP_HOME%\lib\spring-plugin-metadata-2.0.0.RELEASE.jar;%APP_HOME%\lib\spring-plugin-core-2.0.0.RELEASE.jar;%APP_HOME%\lib\HikariCP-4.0.3.jar;%APP_HOME%\lib\spring-data-commons-2.7.5.jar;%APP_HOME%\lib\swagger-models-1.5.20.jar;%APP_HOME%\lib\spring-boot-starter-logging-2.7.5.jar;%APP_HOME%\lib\logback-classic-1.2.11.jar;%APP_HOME%\lib\log4j-to-slf4j-2.17.2.jar;%APP_HOME%\lib\jul-to-slf4j-1.7.36.jar;%APP_HOME%\lib\slf4j-api-1.7.36.jar;%APP_HOME%\lib\spring-security-config-5.7.4.jar;%APP_HOME%\lib\spring-security-core-5.7.4.jar;%APP_HOME%\lib\spring-context-5.3.23.jar;%APP_HOME%\lib\spring-aop-5.3.23.jar;%APP_HOME%\lib\jjwt-api-0.11.2.jar;%APP_HOME%\lib\jackson-datatype-jsr310-2.13.4.jar;%APP_HOME%\lib\jackson-module-parameter-names-2.13.4.jar;%APP_HOME%\lib\swagger-models-2.1.2.jar;%APP_HOME%\lib\jackson-annotations-2.13.4.jar;%APP_HOME%\lib\jackson-core-2.13.4.jar;%APP_HOME%\lib\jackson-datatype-jdk8-2.13.4.jar;%APP_HOME%\lib\jackson-databind-2.13.4.2.jar;%APP_HOME%\lib\aspectjweaver-1.9.7.jar;%APP_HOME%\lib\spring-orm-5.3.23.jar;%APP_HOME%\lib\spring-jdbc-5.3.23.jar;%APP_HOME%\lib\hibernate-commons-annotations-5.1.2.Final.jar;%APP_HOME%\lib\jboss-logging-3.4.3.Final.jar;%APP_HOME%\lib\byte-buddy-1.12.18.jar;%APP_HOME%\lib\antlr-2.7.7.jar;%APP_HOME%\lib\jandex-2.4.2.Final.jar;%APP_HOME%\lib\jaxb-runtime-2.3.7.jar;%APP_HOME%\lib\spring-tx-5.3.23.jar;%APP_HOME%\lib\spring-beans-5.3.23.jar;%APP_HOME%\lib\spring-expression-5.3.23.jar;%APP_HOME%\lib\spring-batch-infrastructure-4.3.7.jar;%APP_HOME%\lib\spring-core-5.3.23.jar;%APP_HOME%\lib\jakarta.annotation-api-1.3.5.jar;%APP_HOME%\lib\snakeyaml-1.30.jar;%APP_HOME%\lib\tomcat-embed-websocket-9.0.68.jar;%APP_HOME%\lib\tomcat-embed-core-9.0.68.jar;%APP_HOME%\lib\tomcat-embed-el-9.0.68.jar;%APP_HOME%\lib\reactor-netty-http-1.0.24.jar;%APP_HOME%\lib\reactor-netty-core-1.0.24.jar;%APP_HOME%\lib\reactor-core-3.4.24.jar;%APP_HOME%\lib\micrometer-core-1.9.5.jar;%APP_HOME%\lib\javax.batch-api-1.0.jar;%APP_HOME%\lib\swagger-annotations-2.1.2.jar;%APP_HOME%\lib\mapstruct-1.3.1.Final.jar;%APP_HOME%\lib\swagger-annotations-1.5.20.jar;%APP_HOME%\lib\spring-security-crypto-5.7.4.jar;%APP_HOME%\lib\oauth2-oidc-sdk-9.35.jar;%APP_HOME%\lib\nimbus-jose-jwt-9.22.jar;%APP_HOME%\lib\jakarta.xml.bind-api-2.3.3.jar;%APP_HOME%\lib\txw2-2.3.7.jar;%APP_HOME%\lib\istack-commons-runtime-3.0.12.jar;%APP_HOME%\lib\jakarta.activation-1.2.2.jar;%APP_HOME%\lib\spring-jcl-5.3.23.jar;%APP_HOME%\lib\netty-codec-http2-4.1.84.Final.jar;%APP_HOME%\lib\netty-handler-proxy-4.1.84.Final.jar;%APP_HOME%\lib\netty-codec-http-4.1.84.Final.jar;%APP_HOME%\lib\netty-resolver-dns-native-macos-4.1.84.Final-osx-x86_64.jar;%APP_HOME%\lib\netty-resolver-dns-classes-macos-4.1.84.Final.jar;%APP_HOME%\lib\netty-resolver-dns-4.1.84.Final.jar;%APP_HOME%\lib\netty-transport-native-epoll-4.1.84.Final-linux-x86_64.jar;%APP_HOME%\lib\reactive-streams-1.0.4.jar;%APP_HOME%\lib\HdrHistogram-2.1.12.jar;%APP_HOME%\lib\LatencyUtils-2.0.3.jar;%APP_HOME%\lib\spring-retry-1.3.4.jar;%APP_HOME%\lib\classgraph-4.8.83.jar;%APP_HOME%\lib\jcip-annotations-1.0-1.jar;%APP_HOME%\lib\content-type-2.2.jar;%APP_HOME%\lib\json-smart-2.4.8.jar;%APP_HOME%\lib\lang-tag-1.6.jar;%APP_HOME%\lib\logback-core-1.2.11.jar;%APP_HOME%\lib\log4j-api-2.17.2.jar;%APP_HOME%\lib\netty-handler-4.1.84.Final.jar;%APP_HOME%\lib\netty-codec-dns-4.1.84.Final.jar;%APP_HOME%\lib\netty-codec-socks-4.1.84.Final.jar;%APP_HOME%\lib\netty-codec-4.1.84.Final.jar;%APP_HOME%\lib\netty-transport-classes-epoll-4.1.84.Final.jar;%APP_HOME%\lib\netty-transport-native-unix-common-4.1.84.Final.jar;%APP_HOME%\lib\netty-transport-4.1.84.Final.jar;%APP_HOME%\lib\netty-buffer-4.1.84.Final.jar;%APP_HOME%\lib\netty-resolver-4.1.84.Final.jar;%APP_HOME%\lib\netty-common-4.1.84.Final.jar;%APP_HOME%\lib\accessors-smart-2.4.8.jar;%APP_HOME%\lib\asm-9.1.jar


@rem Execute neck-is-turtle
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %NECK_IS_TURTLE_OPTS%  -classpath "%CLASSPATH%" com.example.neckisturtle.NeckIsTurtleApplication %*

:end
@rem End local scope for the variables with windows NT shell
if %ERRORLEVEL% equ 0 goto mainEnd

:fail
rem Set variable NECK_IS_TURTLE_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
set EXIT_CODE=%ERRORLEVEL%
if %EXIT_CODE% equ 0 set EXIT_CODE=1
if not ""=="%NECK_IS_TURTLE_EXIT_CONSOLE%" exit %EXIT_CODE%
exit /b %EXIT_CODE%

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
