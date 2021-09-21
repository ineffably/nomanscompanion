@echo off
set TABLEDIR=METADATA\REALITY\TABLES
for /f %%i in ('dir /b %TABLEDIR%\*.exml') do (
  xml2json %TABLEDIR%\%%~ni.exml %TABLEDIR%\%%~ni.json
)
