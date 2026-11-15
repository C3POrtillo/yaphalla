export const Keywords = {
  '[backonehex]': '',
  '[frontonehex]': '',
  '[symmetric]': '',
  '[standardline]': '',
  '[centralaxis]': '',
  '[sideborderline]': "The tile in each column closest to the corresponding team's side of the battlefield.",
  '[backest]': [
    "The deepest position on the target's side of the battlefield.",
    '/assets/images/tooltips/rearest.webp',
  ],
  '[frontest]': ['Closest to the enemy side of the field.', '/assets/images/tooltips/frontest.webp'],
  '[lonely]': 'A unit with no allies within a 1-tile radius.',
  '[disarm]': 'An abnormal status. Disarmed units cannot use normal attacks.',
  '[silence]': 'An abnormal status. Silenced units can only use normal attacks.',
  '[freeze]': 'One of the abnormal states. Frozen units cannot move or act.',
  '[taunt]': 'One of the abnormal states. Taunted units can only attack the caster, and only with normal attacks.',
  '[fear]': 'One of the abnormal states. Frightened units are afraid to get close to the caster.',
  '[enchanted]': 'One of the abnormal states. Charmed units attack their own allies.',
  '[immobilize]': 'One of the abnormal states. Immobilized units cannot move or use movement skills.',
  '[blind]': 'An abnormal status. Blinded characters are unable to hit enemies with normal attacks.',
  '[interrupteff]':
    "A collective term for various abnormal states that can interrupt a unit's current skills or attacks, such as Stun, Frozen, etc.",
  '[dodg]': 'The chance to dodge a normal attack. No Damage is taken when dodging a normal attack.',
  '[original]':
    'The amount of damage the attack or skill would have dealt. The amount is not affected by buffs and debuffs influencing damage of the attacking unit, nor those influencing Phys DEF, Magic DEF, shield or Stats of the unit being attacked.',
  '[takedown]':
    'If a hero recently dealt damage to or inflicted a debuff on an enemy that has been defeated, the hero is considered to have assisted in defeating that enemy.',
  '[backward]': 'The deeper the target is on their own side of the battlefield.',
  '[basicattr]':
    "A hero's basic stats include max HP, ATK, Phys DEF, and Magic DEF. If a hero's max HP is up or down in the battle, their current HP ratio remains the same.",
  '[teamatk]': 'The sum of the ATK of all deployed allied units.',
  '[strongest]': 'Living unit that currently has the highest HP ratio.',
  '[weakest]': 'Living unit that currently has the lowest HP ratio.',
  '[fatal]': "Damage that can reduce all of a unit's remaining HP.",
  '[invincible]': 'Immune to all types of damage and control effects and becomes untargetable.',
  '[uncontrol]': 'Immune to all control effects.',
  '[stable]': 'Cannot be knocked into the air, knocked back, or involuntarily moved.',
} as const;

export type Keywords = keyof typeof Keywords;
