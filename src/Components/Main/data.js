export const START_DATA = [
  {
    game: 1,
    win: true,
    rank: "Mythic",
    meteorite: 30,
    shadow: 0,
    gold: 0,
    diamond: 0,
  },
  {
    game: 2,
    win: true,
    rank: "Mythic",
    meteorite: 30,
    shadow: 0,
    gold: 0,
    diamond: 0,
  },
  {
    game: 3,
    win: true,
    rank: "Mythic",
    meteorite: 30,
    shadow: 0,
    gold: 0,
    diamond: 0,
  },
  {
    game: 4,
    win: true,
    rank: "Mythic",
    meteorite: 30,
    shadow: 0,
    gold: 0,
    diamond: 0,
  },
  {
    game: 5,
    win: true,
    rank: "Mythic",
    meteorite: 30,
    shadow: 0,
    gold: 0,
    diamond: 0,
  },
  {
    game: 6,
    win: true,
    rank: "Mythic",
    meteorite: 30,
    shadow: 0,
    gold: 0,
    diamond: 0,
  },
  {
    game: 7,
    win: true,
    rank: "Mythic",
    meteorite: 30,
    shadow: 0,
    gold: 0,
    diamond: 0,
  },
  {
    game: 8,
    win: true,
    rank: "Mythic",
    meteorite: 30,
    shadow: 0,
    gold: 0,
    diamond: 0,
  },
  {
    game: 9,
    win: true,
    rank: "Mythic",
    meteorite: 30,
    shadow: 0,
    gold: 0,
    diamond: 0,
  },
  {
    game: 10,
    win: true,
    rank: "Mythic",
    meteorite: 30,
    shadow: 0,
    gold: 0,
    diamond: 0,
  },
];

export const TOTAL_COMMUNITY_FRAGMENTS_DEFAULT = 321000;

export const CardQuality = Object.freeze({
  Diamond: "diamond",
  Gold: "gold",
  Shadow: "shadow",
  Meteorite: "meteorite",
});

export const ranks = [
  { name: "Mythic", mod: 1.0 },
  { name: "Ethereal Diamond", mod: 0.9 },
  { name: "Solar Gold", mod: 0.74 },
  { name: "Auric Gold", mod: 0.48 },
  { name: "Midnight Shadow", mod: 0.25 },
  { name: "Twilight Shadow", mod: 0.12 },
  { name: "Astral Meteorite", mod: 0 },
  { name: "Impact Meteorite", mod: 0 },
  { name: "Purified Iron", mod: 0 },
  { name: "Rusted Iron", mod: 0 },
  { name: "Purified Bronze", mod: 0 },
  { name: "Rusted Bronze", mod: 0 },
];

export const cardQualityValue = {};
cardQualityValue[CardQuality.Diamond] = 250;
cardQualityValue[CardQuality.Gold] = 25;
cardQualityValue[CardQuality.Shadow] = 10;
cardQualityValue[CardQuality.Meteorite] = 1;

export const fullDiamondDeckValue = 3750;

export const minimumQualityBoostAmount = {};
minimumQualityBoostAmount[CardQuality.Diamond] = 1;
minimumQualityBoostAmount[CardQuality.Gold] = 0.25;
minimumQualityBoostAmount[CardQuality.Shadow] = 0.2;
minimumQualityBoostAmount[CardQuality.Meteorite] = 0.15;

export const winRateModifiers = [
  0, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.03, 0.09, 0.09, 0.09,
];

export const BOOSTER = 2;

export const GAME_MODE_MODIFIER_NORMAL = 1;
