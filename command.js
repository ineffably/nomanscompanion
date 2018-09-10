// const program = require('commander');
import { transformTable, lookupString, translateColor, translateIcon, getRefinementTables } from './app/nmsutils';
import command from 'commander';
import fs from 'fs';

function transposeTableFromRoot(inFile, outFile) {
  console.log(`reading file: ${inFile}`);
  const file = fs.readFileSync(inFile);
  const json = JSON.parse(file);
  let mapFrom = json.Data.Property;
  const result = mapFrom.map(el => { return transformTable(el); });
  const data = { data: result };
  console.log(`writing file: ${outFile}`);
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
}

function transposeTable(inFile, outFile) {
  console.log(`reading file: ${inFile}`);
  const file = fs.readFileSync(inFile);
  const json = JSON.parse(file);
  const mapFrom = Array.isArray(json.Data.Property) ? json.Data.Property[0].Property : json.Data.Property.Property;
  const result = mapFrom.map(el => { return transformTable(el); });
  const data = { data: result };
  console.log(`writing file: ${outFile}`);
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
}

function transposeLanguageFiles(inFile, outFile, language = 'English') {
  console.log(`reading file: ${inFile}`);
  const file = fs.readFileSync(inFile);
  const languageJson = JSON.parse(file);
  const result = languageJson.Data.Property.Property.map(el => { return transformTable(el); });
  const final = {};
  console.log('mapping table');
  result.forEach(el => { final[el.Id] = el[language]; });
  const data = { data: final };
  console.log(`writing file: ${outFile}`);
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2));
}

function getLanguageTable() {
  const loc1 = fs.readFileSync(__dirname + '/data/nms_loc1_english.transformed.json');
  const loc1Json = JSON.parse(loc1);
  const loc4 = fs.readFileSync(__dirname + '/data/nms_loc4_english.transformed.json');
  const loc4Json = JSON.parse(loc4);
  const update3 = fs.readFileSync(__dirname + '/data/nms_update3_english.transformed.json');
  const update3Json = JSON.parse(update3);

  const results = { ...loc1Json.data, ...loc4Json.data, ...update3Json.data };
  fs.writeFile(__dirname + '/data/en.json', JSON.stringify({ data: results }, null, 2));
  return results;
}

function applyLangToRecipes(langTable) {
  const realityFile = fs.readFileSync(__dirname + '/data/defaultreality.transformed.json');
  const realityJson = JSON.parse(realityFile);
  // const refinements = getRefinementTables(realityJson);
  const refinementTables = realityJson.data.filter((el) => {
    return (el.RefinerRecipeTable1Input || el.RefinerRecipeTable2Input || el.RefinerRecipeTable3Input);
  });
  refinementTables.forEach((el) => {
    const recipes = el[Object.keys(el)[0]];
    recipes.forEach(recipe => {
      recipe.Name = lookupString(langTable, recipe.Name);
    });
  });
  fs.writeFileSync(__dirname + '/data/defaultreality.en.transformed.json', JSON.stringify(realityJson, null, 2));
}

function applyLangAndLookups(inFile, outFile,
  languageTable = { data: getLanguageTable() }) {
  console.log('reading file ', inFile);
  const itemTable = fs.readFileSync(inFile);
  const jsonTable = JSON.parse(itemTable);

  const table = jsonTable.data.map((el) => {
    el.Id = el.ID || el.Id;
    if (el.Symbol) {
      el.Symbol = lookupString(languageTable, el.Symbol);
    }
    if (el.WorldColour) {
      el.WorldColorRGB = translateColor(el.WorldColour);
    }
    el.Icon.Filename = translateIcon(el.Icon.Filename);
    el.ColorRGB = translateColor(el.Colour);
    el.Name = lookupString(languageTable, el.Name);
    el.NameLower = lookupString(languageTable, el.NameLower);
    el.Subtitle = lookupString(languageTable, el.Subtitle);
    el.Description = lookupString(languageTable, el.Description);
    el.Rarity = el.Rarity ? el.Rarity.Rarity : el.Rarity;
    el.Legality = el.Legality ? el.Legality.Legality : el.Legality;
    if (el.ProceduralType) {
      el.ProceduralType = el.ProceduralType ? el.ProceduralType.ProceduralProductCategory : el.ProceduralType;
    }
    if (el.Type) {
      el.Type = el.Type ? el.Type.ProductCategory : el.Type;
    }
    if (el.SubstanceCategory) {
      el.SubstanceCategory = el.SubstanceCategory ? el.SubstanceCategory.SubstanceCategory : el.SubstanceCategory;
    }
    return el;
  });
  const tableJson = JSON.stringify({ data: table }, null, 2);
  console.log('writing file', outFile);
  fs.writeFileSync(outFile, tableJson);
}

function combineSubstanceFiles() {
  const loc1 = fs.readFileSync(__dirname + '/data/raw/nms_reality_gcsubstancetable.transformed.json');
  const loc2 = fs.readFileSync(__dirname + '/data/raw/nms_u3reality_gcsubstancetable.transformed.json');
  const loc1Json = JSON.parse(loc1);
  const loc2Json = JSON.parse(loc2);
  const ids = loc1Json.data.reduce((prev, cur) => {
    prev.push(cur.Id);
    return prev;
  }, []);

  const loc2Filtered = loc2Json.data.filter((el) => !ids.includes(el.Id));

  const combinedLanguages = { data: loc1Json.data.concat(loc2Filtered) };
  fs.writeFileSync(__dirname + '/data/raw/nms_reality_combinedsubstance.json', JSON.stringify(combinedLanguages, null, 2));
}

function combineProductFiles() {
  const loc1 = fs.readFileSync(__dirname + '/data/raw/nms_reality_gcproducttable.transformed.json');
  const loc2 = fs.readFileSync(__dirname + '/data/raw/nms_u3reality_gcproducttable.transformed.json');
  const loc1Json = JSON.parse(loc1);
  const loc2Json = JSON.parse(loc2);

  const ids = loc1Json.data.reduce((prev, cur) => {
    prev.push(cur.Id);
    return prev;
  }, []);

  console.log(ids.length);
  const loc2Filtered = loc2Json.data.filter((el) => !ids.includes(el.Id));

  const combinedLanguages = { data: loc1Json.data.concat(loc2Filtered) };
  fs.writeFileSync(__dirname + '/data/raw/nms_reality_combinedproducts.json', JSON.stringify(combinedLanguages, null, 2));
}

command.version('0.1')
  .option('-t, --transpose')
  .option('-l, --language')
  .option('-r, --run')
  .parse(process.argv);

if (command.run) {
  // const languageTable = { data: getLanguageTable() };
  combineSubstanceFiles();
  combineProductFiles();
}

if (command.transpose) {
  transposeLanguageFiles(
    __dirname + '/data/NSM_LOC1_ENGLISH.json',
    __dirname + '/data/nms_loc1_english.transformed.json'
  );
  transposeLanguageFiles(
    __dirname + '/data/NSM_LOC4_ENGLISH.json',
    __dirname + '/data/nms_loc4_english.transformed.json'
  );
  transposeLanguageFiles(
    __dirname + '/data/NSM_UPDATE3_ENGLISH.json',
    __dirname + '/data/nms_update3_english.transformed.json'
  );

  transposeTable(
    __dirname + '/data/raw/NMS_REALITY_GCPRODUCTTABLE.json',
    __dirname + '/data/raw/nms_reality_gcproducttable.transformed.json',
  );
  transposeTable(
    __dirname + '/data/raw/NMS_U3REALITY_GCPRODUCTTABLE.json',
    __dirname + '/data/raw/nms_u3reality_gcproducttable.transformed.json',
  );

  transposeTable(
    __dirname + '/data/raw/NMS_REALITY_GCSUBSTANCETABLE.json',
    __dirname + '/data/raw/nms_reality_gcsubstancetable.transformed.json',
  );
  transposeTable(
    __dirname + '/data/raw/NMS_U3REALITY_GCSUBSTANCETABLE.json',
    __dirname + '/data/raw/nms_u3reality_gcsubstancetable.transformed.json',
  );

  transposeTableFromRoot(
    __dirname + '/data/DEFAULTREALITY.json',
    __dirname + '/data/defaultreality.transformed.json'
  );

  combineSubstanceFiles();
  combineProductFiles();
}

if (command.language) {
  const languageTable = { data: getLanguageTable() };

  applyLangAndLookups(
    __dirname + '/data/raw/nms_reality_combinedsubstance.json',
    __dirname + '/data/raw/nms_reality_combinedsubstance.en.json',
    languageTable
  );

  applyLangAndLookups(
    __dirname + '/data/raw/nms_reality_combinedproducts.json',
    __dirname + '/data/raw/nms_reality_combinedproducts.en.json',
    languageTable
  );

  applyLangToRecipes(languageTable);
}