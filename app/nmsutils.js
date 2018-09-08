function getItemFromName(name, data) {
  const item = data.Items.filter(item => item.Name === name);
  if (item.length > 0) {
    return item[0];
  }
  return null;
}

function lookupString(languageData, value) {
  const result = languageData.data[value];
  if (!result) {
    console.log('lang not found', value);
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
  getItemFromName,
  transformTable,
  translateIcon,
  translateColor,
  lookupString
};