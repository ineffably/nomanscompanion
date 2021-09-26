export interface GCProductEntry {
  ID?:                         string;
  Id?:                         string;
  Name?:                       string;
  NameLower?:                  string;
  Subtitle?:                   string;
  Description?:                string;
  DebrisFile?:                 DebrisFile;
  BaseValue?:                  string;
  Level?:                      string;
  Icon?:                       DebrisFile;
  HeroIcon?:                   HeroIcon;
  Colour?:                     Colour;
  Category?:                   Category;
  Type?:                       Type;
  Rarity?:                     Rarity;
  Legality?:                   Legality;
  LinkColour?:                 Colour;
  Consumable?:                 string;
  ChargeValue?:                string;
  StackMultiplier?:            string;
  DefaultCraftAmount?:         string;
  CraftAmountStepSize?:        string;
  CraftAmountMultiplier?:      string;
  Requirements?:               Requirements;
  Cost?:                       Cost;
  RecipeCost?:                 string;
  SpecificChargeOnly?:         string;
  NormalisedValueOnWorld?:     string;
  NormalisedValueOffWorld?:    string;
  TradeCategory?:              TradeCategory;
  WikiCategory?:               string;
  IsCraftable?:                string;
  EconomyInfluenceMultiplier?: string;
  PinObjective?:               string;
  PinObjectiveTip?:            string;
  CookingIngredient?:          string;
  CookingValue?:               string;
  GoodForSelling?:             string;
  EggModifierIngredient?:      string;
  ext?:                        ExtendedProductData; // added for app processing
}

export interface ExtendedProductData {
  iconUrl?: string;
  linkColor?: string;
}

export interface Category {
  SubstanceCategory?: string;
}

export interface Colour {
  R?: string;
  G?: string;
  B?: string;
  A?: string;
}

export interface Cost {
  SpaceStationMarkup?: string;
  LowPriceMod?:        string;
  HighPriceMod?:       string;
  BuyBaseMarkup?:      string;
  BuyMarkupMod?:       string;
}

export interface DebrisFile {
  Filename?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeroIcon {
}

export interface Legality {
  Legality?: string;
}

export interface Rarity {
  Rarity?: string;
}

export interface Requirements {
  ID?:            string;
  InventoryType?: InventoryType;
  Amount?:        string;
}

export interface InventoryType {
  InventoryType?: string;
}

export interface TradeCategory {
  TradeCategory?: string;
}

export interface Type {
  ProductCategory?: string;
}
