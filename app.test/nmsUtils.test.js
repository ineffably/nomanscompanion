import { transformTable, translateIcon, translateColor, getItemFromField, getCraftFromItem } from '../app/nmsutils';
import { testRequirements, cwireRequirementsTest } from './testItems';
import fs from 'fs';

let itemData = [];

describe('NMS Utils', () => {
  beforeAll(() => {
    const productJson = JSON.parse(fs.readFileSync(__dirname + '/../data/raw/nms_reality_combinedproducts.en.json'));
    const substanceJson = JSON.parse(fs.readFileSync(__dirname + '/../data/raw/nms_reality_combinedsubstance.en.json'));
    itemData = productJson.data.concat(substanceJson.data);
  });

  it('can translate icons and paths from dds to png', () => {
    const result = translateIcon('TEXTURES/UI/FRONTEND/ICONS/U4PRODUCTS/PRODUCT.CASING.DDS');
    expect(result).toEqual('PRODUCT.CASING.png');
  });

  it('converts raw rgb values into CSS rgb values', () => {
    const result = translateColor({ 'R': '0.9529412', 'G': '0.6627451', 'B': '0.1372549', 'A': '1' });
    expect(result).toEqual('rgb(243.000006, 169.0000005, 34.9999995, 1)');
  });

  it('generates requirements from properties correctly', () => {
    const result = transformTable(testRequirements, {});
    expect(result.Id).toBeDefined();
    expect(result.Requirements).toBeDefined();
    expect(result.Requirements.length).toEqual(2);
  });

  it('retrieves an item by Name for by default', () => {
    const item = getItemFromField('Metal Plating',  itemData);
    expect(item.Id).toEqual('CASING');
    expect(item.Name).toEqual('METAL PLATING');
  });

  it('retrieves an item by Id', () => {
    const item = getItemFromField('PLANTPOT3',  itemData, 'Id');
    expect(item.Id).toEqual('PLANTPOT3');
    expect(item.Name).toEqual('FLORA CONTAINMENT');
  });

  it('doesnot return an item when not found', () => {
    const item = getItemFromField('wowowow',  itemData);
    expect(item).toBeUndefined();
  });

  it('returns SUBWATER from Id', () => {
    const item = getItemFromField('SUBWATER',  itemData, 'Id');
    expect(item).toBeDefined;
    expect(item.Id).toEqual('SUBWATER');
  });

  it('converts the recipe correctly', () => {
    const item = getItemFromField('ACID',  itemData);
    const recipe = getCraftFromItem(item, itemData);
    const expectedResults = {
      Output: item,
      Count: item.DefaultCraftAmount,
      In1: getItemFromField('CREATURE1', itemData, 'Id'),
      In1Count: 25,
      In2: getItemFromField('PLANT_TOXIC', itemData, 'ID'),
      In2Count: 600
    };

    expect(recipe).toBeDefined();
    expect(recipe.Output.Name).toEqual(expectedResults.Output.Name);
    expect(recipe.In2Count).toEqual(expectedResults.In2Count);
    expect(recipe.Count).toEqual(expectedResults.Count);

  });

  it('converts recipe correctly for a single item', () => {
    const results = transformTable(cwireRequirementsTest, {});
    const recipe = getCraftFromItem(results, itemData);
    expect(results.Requirements).toBeDefined();
    expect(recipe).toBeDefined();
    expect(recipe.Output.Name).toEqual(results.Name);
    expect(recipe.In1).toBeDefined();
  });

});