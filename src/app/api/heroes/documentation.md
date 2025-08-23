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
    `hexImage`: `yaphalla.com/assets/images/hexes/unit/{heroName}.png`,
    `portraitImage`?: `yaphalla.com/assets/images/portraits/{heroName}.png`,
    `factionImage`: `yaphalla.com/assets/images/factions/{lightbearer | wilder | mauler | graveborn | celestial | hypogean}.png`,
    `classImage`: `yaphalla.com/assets/images/class/{mage | marksman | rogue | support | tank | warrior}.png`,
    `damageTypeImage`?: `yaphalla.com/assets/images/damage/{magic | physical}.png`
  },
  ...
}
