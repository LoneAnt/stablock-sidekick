import { Trait } from './statblocks';
import { Ability } from './statblocks';

/**
 * Class to handle parsing and suitability checks for challenge ratings.
 */
export class ChallengeRating {
    constructor(public value: number) {}

    static parse(crInput: string | number): ChallengeRating | null {
        // Convert number to string if necessary
        const crString = typeof crInput === 'number' ? crInput.toString() : crInput;
    
        if (!crString) return null;
        let value;
        if (crString.includes('/')) {
            const [numerator, denominator] = crString.split('/').map(Number);
            value = numerator / denominator;
        } else {
            value = Number(crString);
            if (isNaN(value)) return null;
        }
        return new ChallengeRating(value);
    }

    isSuitable(maxCr: number = 0.5): boolean {
        return this.value <= maxCr;
    }
}

/**
 * Class to manage hit dice, including parsing, updating, and formatting.
 */
export class HitDice {
    constructor(public numDice: number, public dieType: number, public bonus: number) {}

    static parse(hitDiceString: string): HitDice | null {
        const regex = /^(\d+)d(\d+)(?:\s*([+-]\s*\d+))?$/;
        const match = hitDiceString.match(regex);
        if (!match) return null;

        // Parsing the bonus while removing any extra spaces around the sign if present
        const bonus = parseInt((match[3] || '0').replace(/\s/g, ''), 10);

        return new HitDice(parseInt(match[1], 10), parseInt(match[2], 10), bonus);
    }

    increment(conModifier: number): void {
        this.numDice += 1;  // Add one more die
        this.bonus += conModifier;  // Add the current Constitution modifier to the bonus
    }

    toString(): string {
        return `${this.numDice}d${this.dieType}${this.bonus >= 0 ? '+' : ''}${this.bonus}`;
    }
}

/**
 * Class to handle individual ability scores.
 */
export class Abilities {
    constructor(
        public strength: number,
        public dexterity: number,
        public constitution: number,
        public intelligence: number,
        public wisdom: number,
        public charisma: number
    ) {}

    static fromArray(abilityArray: [number, number, number, number, number, number]): Abilities {
        return new Abilities(...abilityArray);
    }

    /**
     * Calculate the modifier for a given ability score.
     * This method is public and static, allowing it to be used without an instance of Abilities.
     * @param score - The ability score from which to calculate the modifier.
     * @returns The calculated modifier.
     */
    public static calculateModifier(score: number): number {
        return Math.floor((score - 10) / 2);
    }

    public static calculateModifiers(abilities: Abilities): { [key in Ability]: number } {
      return Object.fromEntries(
          Object.entries(abilities).map(([key, value]) => [key, Abilities.calculateModifier(value)])
      ) as { [key in Ability]: number };
    }

    public static calculateModDiff(oldMods: { [key in Ability]: number }, newMods: { [key in Ability]: number }): Abilities {
      const modDiffs = { ...new Abilities(0, 0, 0, 0, 0, 0)};
  
      for (const ability in oldMods) {
          if (ability in newMods) {
              modDiffs[ability as Ability] = newMods[ability as Ability] - oldMods[ability as Ability];
          }
      }
  
      return modDiffs;
  }
}

/**
 * Calculates the proficiency bonus based on the sidekick's level.
 * This typically follows the standard D&D 5e rule: proficiency bonus starts at +2 and increases
 * every 4 levels (5th, 9th, 13th, 17th).
 */
export class Proficiency {
    static calculatePB(level: number): number {
        return Math.ceil(1 + level / 4);
    }
}

export class Attack {
  name: string;
  desc: string;
  isAttack: boolean;
  isMeleeWeapon?: boolean;
  isRangedWeapon?: boolean;
  toHit?: number;
  reach?: number;
  range?: { normal: number, long: number };
  numDice?: number;
  diceType?: number;
  damageMod?: number;
  averageDamage?: number;
  damageType?: string;
  isFinesseWeapon?: boolean;
  isMartialWeapon?: boolean;
  isSimpleWeapon?: boolean;
  target?: number;

  private finesseWeapons = [
    'dagger', 'rapier', 'shortsword', 'dart', 'scimitar', 'whip'
  ];

  private martialWeapons = [
    'battleaxe', 'flail', 'glaive', 'greataxe', 'greatsword', 'halberd', 'lance',
    'longsword', 'maul', 'morningstar', 'pike', 'rapier', 'scimitar', 'shortsword',
    'trident', 'war pick', 'warhammer', 'whip', 'blowgun', 'hand crossbow',
    'heavy crossbow', 'longbow', 'net'
  ];

  private simpleWeapons = [
    'club', 'dagger', 'greatclub', 'handaxe', 'javelin', 'light hammer', 'mace',
    'quarterstaff', 'sickle', 'spear', 'light crossbow', 'dart', 'shortbow', 'sling'
  ];

  constructor(trait: Trait) {
    this.name = trait.name;
    this.desc = trait.desc;

    // Parse description to extract attack properties
    this.parseDescription();

    // Determine weapon type
    this.isFinesseWeapon = this.finesseWeapons.includes(this.name.toLowerCase());
    this.isMartialWeapon = this.martialWeapons.includes(this.name.toLowerCase());
    this.isSimpleWeapon = this.simpleWeapons.includes(this.name.toLowerCase());
  }

  private parseDescription() {
    const attackTypeMatch = this.desc.match(/^(Melee\s+or\s+Ranged|Melee|Ranged)/i);

    const toHitMatch = this.desc.match(/([+-]?\d+)\s*to\s*hit/i);
    const reachMatch = this.desc.match(/reach\s*(\d+)\s*ft\./i);
    const rangeMatch = this.desc.match(/range\s*(\d+)\/(\d+)\s*ft\./i);
    const targetMatch = this.desc.match(/(?<=one\s)(\d+|target)/i);

    // Separate match variables for each damage item
    const hitKeywordMatch = this.desc.match(/Hit:/i);
    const averageDamageMatch = this.desc.match(/\d+(?=\s*\()/);
    const numDiceMatch = this.desc.match(/\d+(?=d)/);
    const diceTypeMatch = this.desc.match(/(?<=d)\d+/);
    const damageModMatch = this.desc.match(/[+-]\s*\d+(?=\))/);
    const damageTypeMatch = this.desc.match(/\w+(?=\s+damage)/i);

    if (attackTypeMatch) {
      this.isAttack = true;
      this.isMeleeWeapon = attackTypeMatch[1] === 'Melee' || attackTypeMatch[1] === 'Melee or Ranged';
      this.isRangedWeapon = attackTypeMatch[1] === 'Ranged' || attackTypeMatch[1] === 'Melee or Ranged';
    } else {
      this.isAttack = false;
    }

    if (toHitMatch) {
      this.toHit = parseInt(toHitMatch[1], 10);
    }

    if (reachMatch) {
      this.reach = parseInt(reachMatch[1], 10);
    }

    if (rangeMatch) {
      this.range = {
        normal: parseInt(rangeMatch[1], 10),
        long: parseInt(rangeMatch[2], 10)
      };
    }

    if (targetMatch) {
      this.target = targetMatch[1] === 'target' ? 1 : parseInt(targetMatch[1], 10);
    }

    if (hitKeywordMatch) {
      if (averageDamageMatch) {
        this.averageDamage = parseInt(averageDamageMatch[0], 10);
      }

      if (numDiceMatch) {
        this.numDice = parseInt(numDiceMatch[0], 10);
      }

      if (diceTypeMatch) {
        this.diceType = parseInt(diceTypeMatch[0], 10);
      }

      if (damageModMatch) {
        const sign = damageModMatch[0].charAt(0);
        const value = parseInt(damageModMatch[0].slice(1), 10);
        this.damageMod = sign === '+' ? value : -value;
      } else {
        this.damageMod = 0;
      }

      if (damageTypeMatch) {
        this.damageType = damageTypeMatch[0];
      }
    }
  }

  constructDescription(): string {
    let desc = '';

    if (this.isMeleeWeapon && this.isRangedWeapon) {
      desc += 'Melee or Ranged ';
    } else if (this.isMeleeWeapon) {
      desc += 'Melee ';
    } else if (this.isRangedWeapon) {
      desc += 'Ranged ';
    }

    if (this.isAttack && this.toHit !== undefined) {
      desc += `Weapon Attack: ${this.toHit >= 0 ? '+' : '-'}${this.toHit} to hit`;
    }

    if (this.reach && this.range) {
      desc += `, reach ${this.reach} ft. or range ${this.range.normal}/${this.range.long} ft.`;

    }
    else {
      if (this.reach) {
        desc += `, reach ${this.reach} ft.`;
      }

      if (this.range) {
        desc += `, range ${this.range.normal}/${this.range.long} ft.`;
      }
    }

    if (this.isAttack && this.target !== undefined) {
      const targetText = this.target === 1 ? 'one target' : `${this.target} targets`;
      desc += `, ${targetText}. `;
    }

    if (this.numDice && this.diceType && this.damageType) {
      desc += 'Hit: ';

      if (this.averageDamage) {
        desc += `${this.averageDamage} (`;
      }

      desc += `${this.numDice}d${this.diceType}`;

      if (this.damageMod !== undefined) {
        desc += `${this.damageMod >= 0 ? ' + ' : ' - '}${Math.abs(this.damageMod)}`;
      }

      if (this.averageDamage) {
        desc += ')';
      }

      desc += ` ${this.damageType} damage`;
    }

    return desc.trim();
  }

  getRelevantAbility(abilities: Abilities): Ability {
    if (this.isMeleeWeapon && !this.isFinesseWeapon) {
        return 'strength';
    } else if (this.isRangedWeapon) {
        return 'dexterity';
    } else if (this.isFinesseWeapon) {
        const strengthModifier = Abilities.calculateModifier(abilities.strength);
        const dexterityModifier = Abilities.calculateModifier(abilities.dexterity);
        return strengthModifier >= dexterityModifier ? 'strength' : 'dexterity';
    }
    throw new Error('Invalid attack type');
  }

  calculateExpectedValues(abilities: Abilities, proficiencyBonus: number): { toHit: number, damageMod: number } {
    const relevantAbility = this.getRelevantAbility(abilities);
    const abilityMod = Abilities.calculateModifier(abilities[relevantAbility]);

    const expectedToHit = abilityMod + proficiencyBonus;
    const expectedDamageMod = abilityMod;

    return { toHit: expectedToHit, damageMod: expectedDamageMod };
}

}