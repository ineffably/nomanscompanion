function getItemFromName(name, data) {
  const item = data.Items.filter(item => item.Name === name);
  if (item.length > 0) {
    return item[0];
  }
  return null;
}

function transformRawTableFormat(leaf, parent) {
  let result = parent || {};
  if (leaf.name && leaf.value) {
    result[leaf.name] = leaf.value;
  }

  if(leaf.value && leaf.value.indexOf('.xml') >= 0 ) {
    leaf.lookup = leaf.value;
    delete leaf.value;
  }

  if (leaf.Property) {
    const obj = transformRawTableFormat(leaf.Property, leaf);
    if (Array.isArray(leaf.Property)) {
      if (leaf.name) {
        result[leaf.name] = obj;
      }
      else {
        result = {...result, ...obj};
      }
    }
    else {
      if(leaf.Property.name === 'Value') {
        result[leaf.name] = leaf.Property.value;
      }
      else {
        result[leaf.name] = obj;
      }
    }
    
    delete (result.$t);
    // delete (leaf.Property);
    // delete (result.Property);
    return result;
  }

  if (Array.isArray(leaf)) {
    const newObj = {};
    leaf.forEach((node) => {
      transformRawTableFormat(node, newObj);
    });
    return newObj;
  }

  return result;
}

export { getItemFromName, transformRawTableFormat };