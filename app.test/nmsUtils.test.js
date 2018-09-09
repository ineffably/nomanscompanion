import { transformTable, translateIcon, translateColor, getItemFromField } from '../app/nmsutils';
import { testRequirements } from './testItems';
import fs from 'fs';

let itemData = [];

describe('NMS Utils', () => {
  beforeAll(() => {
    const file = fs.readFileSync(__dirname + '/../data/raw/nms_reality_gcproducttable.en.transformed.json');
    itemData = JSON.parse(file).data;
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
});