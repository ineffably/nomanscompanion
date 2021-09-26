import { Colour, DebrisFile } from '../types/gcproduct';

export const colorFromEntry = (colorValue: Colour): string => {
  const { R, G, B, A } = colorValue;
  const colorEntry = (value) => {
    return Math.round(parseFloat(value) * 255);
  }
  return `rgba(${colorEntry(R)}, ${colorEntry(G)}, ${colorEntry(B)}, ${A})`;
}

export const getIconUrlFromDebrisFile = (fileNameEntry: DebrisFile): string => {
  const { Filename } = fileNameEntry;
  if(!Filename) return '';
  const iconPath = 'TEXTURES/UI/FRONTEND/ICONS';
  const iconPath2 = 'TEXTURES/UI/FRONTEND'; // jank image pathing fix, apparnetly lazy me needs to re-import images one path up
  const imagePath = Filename.replace(iconPath, '/assets/images').replace(iconPath2, '/assets/images').replace('.DDS', '.webp').toLowerCase();
  return imagePath;
}

export const GCProductKeys = [
  "Id",
  "Name",
  "NameLower",
  "Subtitle",
  "Description",
  "Teach",
  "Icon",
  "Colour",
  "Level",
  "Chargeable",
  "ChargeAmount",
  "ChargeType",
  "ChargeBy",
  "ChargeMultiplier",
  "BuildFullyCharged",
  "UsesAmmo",
  "PrimaryItem",
  "Upgrade",
  "Core",
  "RepairTech",
  "Procedural",
  "Category",
  "Rarity",
  "Value",
  "Requirements",
  "BaseStat",
  "StatBonuses",
  "RequiredLevel",
  "UpgradeColour",
  "LinkColour",
  "BaseValue",
  "Cost",
  "RequiredRank",
  "DispensingRace",
  "FragmentCost",
  "TechShopRarity",
  "WikiEnabled",
  "DamagedDescription",
  "RewardGroup",
  "RequiredTech",
  "FocusLocator",
  "HintEnd",
  "AmmoId",
  "Group"
];