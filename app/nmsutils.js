function getItemFromName(name, data) {
  const item = data.Items.filter(item => item.Name === name);
  if (item.length > 0) {
    return item[0];
  }
  return null;
}

function lookupString(languageData, value) {
  return languageData.data[value];  
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
  const fileName = parts[parts.length-1].replace('.DDS', '.png');
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
        if(leaf.Property.name === 'Value'){
          result[leaf.name] = leaf.Property.value;
        }
        else {
          result[leaf.name] = transformTable(leaf.Property, {});
        }
      }
      else {
        const obj = transformTable(leaf.Property, {});
        result = {...result, ...obj};
      }
    }
    else {
      const obj = transformTable(leaf.Property, {});
      if(leaf.name){
        result[leaf.name] = obj;
      }
      else {
        result = {...result, ...obj};
      }
    }
  }

  if (Array.isArray(leaf)) {
    const obj = leaf.reduce((ag, cur) => {
      return {...ag, ...transformTable(cur, {})};
    }, {});
    result = {...result, ...obj};
  }

  return result;
}

export { 
  getItemFromName, 
  transformTable,
  translateIcon,
  translateColor,
  lookupString
};