const ColumnOptions = {
  'Id': {
    'Header': 'Id'
  },
  'Name': {
    'Header': 'Name'
  },
  'NameLower': {
    'Header': 'NameLower'
  },
  'Subtitle': {
    'Header': 'Subtitle'
  },
  'Description': {
    'Header': 'Description'
  },
  'DebrisFile': {
    'Header': 'DebrisFile'
  },
  'BaseValue': {
    'Header': 'BaseValue'
  },
  'Level': {
    'Header': 'Level'
  },
  'Icon': {
    'Header': 'Icon'
  },
  'HeroIcon': {
    'Header': 'HeroIcon'
  },
  'Colour': {
    'Header': 'Colour'
  },
  'SubstanceCategory': {
    'Header': 'SubstanceCategory'
  },
  'Type': {
    'Header': 'Type'
  },
  'ProceduralType': {
    'Header': 'ProceduralType'
  },
  'Rarity': {
    'Header': 'Rarity'
  },
  'Legality': {
    'Header': 'Legality'
  },
  'Consumable': {
    'Header': 'Consumable'
  },
  'ChargeValue': {
    'Header': 'ChargeValue'
  },
  'StackMultiplier': {
    'Header': 'StackMultiplier'
  },
  'DefaultCraftAmount': {
    'Header': 'DefaultCraftAmount'
  },
  'CraftAmountStepSize': {
    'Header': 'CraftAmountStepSize'
  },
  'CraftAmountMultiplier': {
    'Header': 'CraftAmountMultiplier'
  },
  'Requirements': {
    'Header': 'Requirements'
  },
  'Cost': {
    'Header': 'Cost'
  },
  'SpecificChargeOnly': {
    'Header': 'SpecificChargeOnly'
  },
  'NormalisedValueOnWorld': {
    'Header': 'NormalisedValueOnWorld'
  },
  'NormalisedValueOffWorld': {
    'Header': 'NormalisedValueOffWorld'
  },
  'TradeCategory': {
    'Header': 'TradeCategory'
  },
  'WikiEnabled': {
    'Header': 'WikiEnabled'
  },
  'IsCraftable': {
    'Header': 'IsCraftable'
  },
  'EconomyInfluenceMultiplier': {
    'Header': 'EconomyInfluenceMultiplier'
  },
  'ColorRGB': {
    'Header': 'ColorRGB'
  },
  'PinObjeective': {
    'Header': 'PinObjeective'
  },
  'PinObjeectiveTip': {
    'Header': 'PinObjeectiveTip'
  },
  'ID': {
    'Header': 'ID'
  },
  'Symbol': {
    'Header': 'Symbol'
  },
  'WorldColour': {
    'Header': 'WorldColour'
  },
  'Category': {
    'Header': 'Category'
  },
  'tradeCategory': {
    'Header': 'tradeCategory'
  },
  'PinObjective': {
    'Header': 'PinObjective'
  },
  'PinObjectiveTip': {
    'Header': 'PinObjectiveTip'
  },
  'WorldColorRGB': {
    'Header': 'WorldColorRGB'
  },
  'DeploysInto': {
    'Header': 'DeploysInto'
  },
  'GroupID': {
    'Header': 'GroupID'
  },
  'AltRequirements': {
    'Header': 'AltRequirements'
  }
};

const DefaultConfig = {
  'Id': true,
  'Name': false,
  'NameLower': true,
  'Subtitle': false,
  'Description': false,
  'DebrisFile': false,
  'BaseValue': true,
  'Level': false,
  'Icon': true,
  'HeroIcon': false,
  'Colour': false,
  'SubstanceCategory': true,
  'Type': true,
  'ProceduralType': true,
  'Rarity': true,
  'Legality': false,
  'Consumable': true,
  'ChargeValue': true,
  'StackMultiplier': true,
  'DefaultCraftAmount': true,
  'CraftAmountStepSize': true,
  'CraftAmountMultiplier': true,
  'Requirements': false,
  'Cost': true,
  'SpecificChargeOnly': false,
  'NormalisedValueOnWorld': false,
  'NormalisedValueOffWorld': false,
  'TradeCategory': true,
  'WikiEnabled': false,
  'IsCraftable': true,
  'EconomyInfluenceMultiplier': false,
  'ColorRGB': false,
  'PinObjeective': false,
  'PinObjeectiveTip': false,
  'ID': false,
  'Symbol': false,
  'WorldColour': false,
  'Category': false,
  'tradeCategory': true,
  'PinObjective': false,
  'PinObjectiveTip': false,
  'WorldColorRGB': false,
  'DeploysInto': false,
  'GroupID': true,
  'AltRequirements': false
};

const Columns = ['Icon', 'Id', 'Name', 'NameLower', 'Subtitle', 'Description', 'DebrisFile',
  'BaseValue', 'Level', 'HeroIcon', 'Colour', 'SubstanceCategory',
  'Type', 'ProceduralType', 'Rarity', 'Legality', 'Consumable', 'ChargeValue',
  'StackMultiplier', 'DefaultCraftAmount', 'CraftAmountStepSize',
  'CraftAmountMultiplier', 'Requirements', 'Cost', 'SpecificChargeOnly',
  'NormalisedValueOnWorld', 'NormalisedValueOffWorld', 'TradeCategory',
  'WikiEnabled', 'IsCraftable', 'EconomyInfluenceMultiplier', 'ColorRGB',
  'PinObjeective', 'PinObjeectiveTip', 'ID', 'Symbol', 'WorldColour', 'Category',
  'tradeCategory', 'PinObjective', 'PinObjectiveTip', 'WorldColorRGB', 'DeploysInto',
  'GroupID', 'AltRequirements'];

export {
  Columns,
  ColumnOptions, 
  DefaultConfig
};