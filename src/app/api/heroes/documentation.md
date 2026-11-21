### Response Example: /api/heroes
{
  `heroName`: {
    `id`:  `string`,
    `faction`: `Lightbearer | Wilder | Mauler | Graveborn | Celestial | Hypogean`,
    `class`: `Mage | Marksman | Rogue | Support | Tank | Warrior`,
    `name`: `string`,
    `title`?: `string`,
    `description`?: `string`,
    `damageType`?: `Magic | Physical`,
    `hexImage`: `https://res.cloudinary.com/vvib7uec/image/upload/f_webp/q_auto:low/assets/images/hexes/unit/{heroName}.png`,
    `portraitImage`?: `https://res.cloudinary.com/vvib7uec/image/upload/f_webp/q_auto:low/assets/images/portraits/{heroName}.png`,
    `factionImage`: `https://res.cloudinary.com/vvib7uec/image/upload/f_webp/q_auto:low/assets/images/factions/{lightbearer | wilder | mauler | graveborn | celestial | hypogean}.png`,
    `classImage`: `https://res.cloudinary.com/vvib7uec/image/upload/f_webp/q_auto:low/assets/images/class/{mage | marksman | rogue | support | tank | warrior}.png`,
    `damageTypeImage`?: `https://res.cloudinary.com/vvib7uec/image/upload/f_webp/q_auto:low/assets/images/damage/{magic | physical}.png`
  },
  ...
}
