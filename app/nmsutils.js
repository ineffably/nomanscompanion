function getItemFromField(value, data, field = 'Name') {
  return data.filter(item => {
    return item[field] && item[field].toLowerCase() === value.toLowerCase();
  })[0];
}

function getRefinerRecipe(recipe, allItems){
  let recipeIngredients = recipe.Ingredients;
  if(!recipeIngredients){
    return null;
  }
  if(!Array.isArray(recipe.Ingredients)){
    recipeIngredients = [recipeIngredients];
  }
  const ingredients = getBlueprintFromRequirement(recipeIngredients, allItems);
  const bluePrint = { 
    Output: getItemFromField(recipe.Result.Id, allItems, 'Id'),
    Count: recipe.Result.Amount,
    Time: recipe.TimeToMake,
    Name: recipe.Name
  };

  return {...bluePrint, ...ingredients};
}

function getCraftingTable(itemData = []) {
  const results = itemData.filter(item => item.IsCraftable).map(item => {
    return { 
      Id: item.Id, 
      Name: item.Name, 
      NameLower: item.NameLower,
      Requirements: item.Requirements
    };
  });
  return results;
}

function getRecipesWith(item = {}, craftingTable = []) {
  const isRequirement = (req) => {
    if(!req){return;}
    return item.Id === req.ID;
  };

  const result = craftingTable.filter(o => {
    if(Array.isArray(o.Requirements)){
      const isin = o.Requirements.filter(isRequirement);
      return isin.length > 0;
    }
    else {
      return isRequirement(o.Requirements);
    }
  });
  return result;
}

function getBlueprintFromRequirement(requirements, allItems){
  const reqs = requirements.reduce((prev, cur, i) => {
    const obj = {};
    const item = getItemFromField((cur.ID || cur.Id), allItems, 'Id');
    obj['In'+(i+1)+''] = item;
    obj['In'+(i+1)+'Count'] = parseInt(cur.Amount, 10);
    return {...prev, ...obj };
  }, {});
  return reqs;
}

function getCraftFromItem(item, allItems) {
  if(!item.Requirements){return;}
  const requirements = Array.isArray(item.Requirements) ? item.Requirements : [item.Requirements];
  const reqs = getBlueprintFromRequirement(requirements, allItems);
  const results = {
    Output: item, 
    Count: item.DefaultCraftAmount, 
    ...reqs
  };
  return results;
}

function getRefinementTables(realityData) {
  const tables = realityData.data.reduce((prev, cur) => {
    if(cur.RefinerRecipeTable1Input || cur.RefinerRecipeTable2Input || cur.RefinerRecipeTable3Input)
      return {...prev, ...cur};
    else
      return {...prev };
  }, {});

  return tables;
}

function lookupString(languageData, value) {
  const result = languageData.data[value];
  if (!result) {
    console.info('lang not found', value);
  }
  return result || value;
}

function translateColor(rawColor) {
  const r = parseFloat(rawColor.R) * 255;
  const g = parseFloat(rawColor.G) * 255;
  const b = parseFloat(rawColor.B) * 255;
  const a = parseFloat(rawColor.A);
  return `rgb(${r}, ${g}, ${b}, ${a})`;
}

function translateIcon(rawFilePath) {
  const parts = rawFilePath.split('/');
  const fileName = parts[parts.length - 1].replace('.DDS', '.png');
  return fileName;
}

function transformTable(leaf, parent) {
  let result = parent || {};
  // single key/value pairs combine into an object

  if (leaf.name && leaf.value &&
    typeof leaf.value === 'string' && leaf.value.indexOf('.xml') === -1) {
    result[leaf.name] = leaf.value;
    return result;
  }

  if (leaf.Property) {
    if (!Array.isArray(leaf.Property)) {
      if (leaf.name) {
        if (leaf.Property.name === 'Value') {
          result[leaf.name] = leaf.Property.value;
        }
        else {
          result[leaf.name] = transformTable(leaf.Property, {});
        }
      }
      else {
        const obj = transformTable(leaf.Property, {});
        result = { ...result, ...obj };
      }
    }
    else {
      const obj = transformTable(leaf.Property, {});
      if (leaf.name) {
        if (leaf.Property[0].Property && Array.isArray(leaf.Property[0].Property)) {
          const mapResults = leaf.Property.map(o => transformTable(o, {}));
          result[leaf.name] = mapResults;
        }
        else {
          result[leaf.name] = obj;
        }
      }
      else {
        result = { ...result, ...obj };
      }
    }
  }

  if (Array.isArray(leaf)) {
    const obj = leaf.reduce((ag, cur) => {
      const t = transformTable(cur, {});
      const r = { ...ag, ...t };
      return r;
    }, {});
    result = { ...result, ...obj };
  }

  return result;
}

export {
  transformTable,
  translateIcon,
  translateColor,
  lookupString,
  getRefinementTables,
  getItemFromField,
  getCraftFromItem,
  getCraftingTable,
  getBlueprintFromRequirement,
  getRefinerRecipe,
  getRecipesWith
};