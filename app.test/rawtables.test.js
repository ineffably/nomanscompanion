import { transformTable } from '../app/nmsutils';

describe('Transform Tables', () => {
  it('converts name and value to object', () => {
    const testTable = {
      name: 'SpaceStationMarkup', value: '0'
    };
    const result = transformTable(testTable);
    expect(result.SpaceStationMarkup).toEqual('0');
  });

  it('transforms a property array to single object', () => {
    const testTable = {
      Property: [
        { name: 'SpaceStationMarkup', value: '0' },
        { name: 'BaseValue', value: '800' }
      ]
    };
    const result = transformTable(testTable.Property);
    expect(result.SpaceStationMarkup).toEqual('0');
    expect(result.BaseValue).toEqual('800');
  });

  it('transforms a named Property array to value', () => {
    const testTable = {
      'name': 'Colour',
      'value': 'Colour.xml',
      '$t': '',
      'Property': [
        {
          'name': 'R',
          'value': '0.9529412'
        },
        {
          'name': 'G',
          'value': '0.6627451'
        },
        {
          'name': 'B',
          'value': '0.1372549'
        },
        {
          'name': 'A',
          'value': '1'
        }
      ]
    };
    const result = transformTable(testTable);
    expect(result.Colour).toBeDefined;
    expect(result.Colour.R).toEqual('0.9529412');
  });

  it('can transform 2 properties into a single object', () => {
    const testTable = {
      name: 'Table',
      'Property': [
        {
          'name': 'Subtitle',
          'value': 'VariableSizeString.xml',
          '$t': '',
          'Property': {
            'name': 'Value',
            'value': 'CRAFTPROD_SUB'
          }
        },
        {
          'name': 'Description',
          'value': 'VariableSizeString.xml',
          '$t': '',
          'Property': {
            'name': 'Value',
            'value': 'CASING_DESC'
          }
        },
        {
          'name': 'Icon',
          'value': 'TkModelResource.xml',
          '$t': '',
          'Property': {
            'name': 'Filename',
            'value': 'TEXTURES/UI/FRONTEND/ICONS/U4PRODUCTS/PRODUCT.CASING.DDS'
          }
        },
      ]
    };

    const expected = {
      Table: {
        Subtitle: 'CRAFTPROD_SUB',
        Description: 'CASING_DESC',
        Icon: { Filename: 'TEXTURES/UI/FRONTEND/ICONS/U4PRODUCTS/PRODUCT.CASING.DDS' }
      }
    };

    const result = transformTable(testTable);
    expect(result.Table).toBeDefined();
    expect(result.Table.Subtitle).toBeDefined();
    expect(result.Table.Subtitle).toEqual(expected.Table.Subtitle);
    expect(result.Table.Description).toBeDefined();
    expect(result.Table.Description).toEqual(expected.Table.Description);
    expect(result.Table.Icon).toBeDefined();
    expect(result.Table.Icon.Filename).toEqual(expected.Table.Icon.Filename);
  });

  it('doenst puke on partials', () => {
    const testTable = {
      'name': 'Icon',
      'value': 'TkModelResource.xml',
      '$t': '',
      'Property': {
        'name': 'Filename',
        'value': 'TEXTURES/UI/FRONTEND/ICONS/U4PRODUCTS/PRODUCT.CASING.DDS'
      }
    };

    const result = transformTable(testTable);
    expect(result.Icon).toBeDefined();
    expect(result.Icon.Filename).toBeDefined();
  });

  it('can transform complicated objects', () => {
    const testTable = {
      'name': 'Requirements',
      '$t': '',
      'Property': {
        'value': 'GcTechnologyRequirement.xml',
        '$t': '',
        'Property': [
          {
            'name': 'ID',
            'value': 'LAND1'
          },
          {
            'name': 'InventoryType',
            'value': 'GcInventoryType.xml',
            '$t': '',
            'Property': {
              'name': 'InventoryType',
              'value': 'Substance'
            }
          },
          {
            'name': 'Amount',
            'value': '50'
          }
        ]
      }
    };

    const expected = {
      Requirements: {
        ID: 'LAND1',
        InventoryType: { InventoryType: 'Substance' },
        Amount: '50'
      }
    };

    const result = transformTable(testTable);
    expect(result.Requirements).toBeDefined();
    expect(result.Requirements.Amount).toBeDefined();
    expect(result.Requirements.ID).toBeDefined();
    expect(result.Requirements.ID).toEqual(expected.Requirements.ID);
    expect(result.Requirements.Amount).toEqual(expected.Requirements.Amount);
  });

  it('transforms table format', () => {
    const testTable = {
      'Data': {
        'template': 'TkLocalisationTable',
        'Property': {
          'name': 'Table',
          '$t': '',
          'Property': [
            {
              'value': 'TkLocalisationEntry.xml',
              '$t': '',
              'Property': [
                {
                  'name': 'Id',
                  'value': 'NAMEGEN_PLANET_ADORN_1'
                },
                {
                  'name': 'English',
                  'value': 'VariableSizeString.xml',
                  '$t': '',
                  'Property': {
                    'name': 'Value',
                    'value': 'Prime'
                  }
                },
                {
                  'name': 'French',
                  'value': 'VariableSizeString.xml',
                  '$t': '',
                  'Property': {
                    'name': 'Value',
                    'value': ''
                  }
                }]
            }
          ]
        }
      }
    };

    const expectedResults = {
      'Table': [{
        Id: 'NAMEGEN_PLANET_ADORN_1',
        English: 'Prime',
        French: ''
      }]
    };

    const result = transformTable(testTable.Data, {});
    // console.log(JSON.stringify(result, null, 2));
    expect(result.Table).toBeDefined();
    expect(result.Table).toEqual(expectedResults.Table);

  });

});