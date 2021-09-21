# Extracting data and updating app json files and icons

Notes on manual command sequences in order to automate the update process when a patch is made.

## 1. Download tools: 

PSARC tool for extracting pak files
```
https://gbatemp.net/download/psarc-extractor.25178/download?version=25178
file: 25178-PSARC.zip
```

MBINCompiler for extracting exml files from mbin files 
```
https://github.com/monkeyman192/MBINCompiler/releases/tag/v2.24.0-pre2
https://github.com/monkeyman192/MBINCompiler/releases/download/v2.24.0-pre2/libMBIN.dll
https://github.com/monkeyman192/MBINCompiler/releases/download/v2.24.0-pre2/MBINCompiler.exe
```

## 2. Copy PAK files from source folder to temp folder: 

```
mkdir c:\temp\PCBANKS
copy C:\games\steam\steamapps\common\No Man's Sky\GAMEDATA\PCBANKS\*.pak c:\temp\PCBANKS\
```

## 3. extract pak files:

```
forfiles /s /m *.pak /c "cmd /c psarc.exe extract -y @path"
pause
```

## 4. extract exml files from reality tables mbin files

```
MBINCompiler.exe METADATA\REALITY\TABLES\BASEBUILDINGTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\COSTTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\DAMAGETABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\DISCOVERYREWARDLOOKUPTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\EXPEDITIONEVENTTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\EXPEDITIONREWARDTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\FRIGATETRAITTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\INVENTORYTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\LEGACYBASEBUILDINGTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\LEGACYITEMTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\MAINTENANCEGROUPSTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_DIALOG_GCALIENPUZZLETABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_DIALOG_GCALIENSPEECHTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_DIALOG_SPECIALISTPUZZLETABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_REALITY_GCPROCEDURALTECHNOLOGYTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_REALITY_GCPROCPRODUCTTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_REALITY_GCPRODUCTTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_REALITY_GCSUBSTANCETABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_REALITY_GCTECHNOLOGYTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_TESTREALITY_GCPRODUCTTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_TESTREALITY_GCSUBSTANCETABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_TESTREALITY_GCTECHNOLOGYTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_U3REALITY_GCPRODUCTTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_U3REALITY_GCSUBSTANCETABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\NMS_U3REALITY_GCTECHNOLOGYTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\PROCEDURALPRODUCTTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\PROCEDURALTECHNOLOGYTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\PURCHASEABLEBUILDINGBLUEPRINTS.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\PURCHASEABLESPECIALS.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\REWARDDESTRUCTTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\REWARDTABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\TRADINGCLASSDATATABLE.MBIN
MBINCompiler.exe METADATA\REALITY\TABLES\TRADINGCOSTTABLE.MBIN
```

## 5. convert exml files to json files:

```
@echo off
set TABLEDIR=METADATA\REALITY\TABLES
for /f %%i in ('dir /b %TABLEDIR%\*.exml') do (
  xml2json %TABLEDIR%\%%~ni.exml %TABLEDIR%\%%~ni.json
)
```

## 6. create folder for json files for processing

```
mkdir c:\temp\json
copy C:\temp\PCBANKS\METADATA\REALITY\TABLES\*.json c:\temp\json\
```

## 7. transpose json into a more friendly format for the application

```
npm run command -- --transpose -f c:\temp\json\
npm run command -- --language -f c:\temp\json\
```

## 8. copy json files in to app data folder

```
# tbd
```

## 8. extract images/icons

## 9. copy/update files in images folder


