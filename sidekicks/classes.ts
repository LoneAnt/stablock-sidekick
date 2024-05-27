import {Feature} from '../statblocks/statblocks'

export interface SidekickClass {
    name: string;
    desc: string;
    featuresByLevel: { [level: number]: Feature[] };
}

export class Expert implements SidekickClass {
    name = 'Expert';
    desc = 'The Expert is a master of certain tasks or knowledge, favoring cunning over brawn.\n' +
    'It might be a scout, a musician, a librarian, a clever street kid, a wily merchant, or a burglar.';
    featuresByLevel = {
        1: [
            {
                name: "Saving Throw Proficiency",
                desc: "The sidekick gains proficiency in one saving throw of your choice",
                options: [
                    { name: "Dexterity" },
                    { name: "Intelligence" },
                    { name: "Charisma" }
                ],
                nbChoices: 1
            },
            {
                name: "Skill Proficiencies",
                desc: "The sidekick gains proficiency in five skills of your choice.",
                options: [
                    { name: "Acrobatics" },
                    { name: "Animal Handling" },
                    { name: "Arcana" },
                    { name: "Athletics" },
                    { name: "Deception" },
                    { name: "History" },
                    { name: "Insight" },
                    { name: "Intimidation" },
                    { name: "Investigation" },
                    { name: "Medicine" },
                    { name: "Nature" },
                    { name: "Perception" },
                    { name: "Performance" },
                    { name: "Persuasion" },
                    { name: "Religion" },
                    { name: "Sleight of Hand" },
                    { name: "Stealth" },
                    { name: "Survival" }
                ],
                nbChoices: 5
            },
            {
                name: "Armor Proficiency",
                desc: "light armor"
            },
            {
                name: "Weapon Proficiency",
                desc: "all simple weapons",
                conditions: ["humanoid", "simple weapon", "martial weapon"]
            },
            {
                name: "Tool Proficiencies",
                desc: "",
                conditions: ["humanoid", "simple weapon", "martial weapon"],
                options: [
                    { "name": "Alchemist's supplies" },
                    { "name": "Brewer's supplies" },
                    { "name": "Calligrapher's supplies" },
                    { "name": "Carpenter's tools" },
                    { "name": "Cartographer's tools" },
                    { "name": "Cobbler's tools" },
                    { "name": "Cook's utensils" },
                    { "name": "Disguise kit" }, 
                    { "name": "Forgery kit" },
                    { "name": "Glassblower's tools" },
                    { "name": "Herbalism kit" },
                    { "name": "Jeweler's tools" },
                    { "name": "Leatherworker's tools" },
                    { "name": "Mason's tools" },
                    { "name": "Navigator's tools" },
                    { "name": "Painter's supplies" },
                    { "name": "Poisoner's kit" },
                    { "name": "Potter's tools" },
                    { "name": "Smith's tools" },
                    { "name": "Tinker's tools" },
                    { "name": "Thieves' tools" },
                    { "name": "Weaver's tools" },
                    { "name": "Woodcarver's tools" }
                ],
                nbChoices: 2
            },
            {
                name: "Helpful",
                desc: "The sidekick can take the Help action as a bonus action.",
                category: "bonus_actions"
            }
        ],
        2: [
            {
                name: "Cunning Action",
                desc: "On its turn in combat, the sidekick can take the Dash, Disengage, or Hide action as a bonus action.",
                category: "bonus_actions"
            }
        ],
        3: [
            {
                name:"Expertise",
                desc: "Choose two of the sidekick's skill proficiencies. The sidekick's proficiency bonus is doubled for any ability check it makes that uses any of the chosen proficiencies.",
                options: [
                    { name: "Will be determined based on the sidekick's skill proficiencies" }],
                nbChoices: 2
            }
        ],
        4: [
            {
                name:"Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        6: [
            {
                name:"Helpful",
                desc: "The sidekick can take the Help action as a bonus action. When using this feature to aid an ally in attacking a creature, that target can be up to 30 feet away from the sidekick, and the sidekick can deal an extra 2d6 damage to it the next time the sidekick hits it with an attack roll before the end of the current turn. The extra damage is the same type of damage dealt by the attack.",
                category: "bonus_actions"
            }
        ],
        7: [
            {
                name:"Evasion",
                desc: "When the sidekick is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it failed. The sidekick doesn't benefit from this feature while incapacitated."
            }
        ],
        8: [
            {
                name:"Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        10: [
            {
                name:"Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        11: [
            {
                name:"Inspiring Help",
                desc: "When the sidekick takes the Help action, the creature who receives the help also gains a 1d6 bonus to the d20 roll. If that roll is an attack roll, the creature can forgo adding the bonus to it, and then if the attack hits, the creature can add the bonus to the attack's damage roll against one target."
            }
        ],
        12: [
            {
                name:"Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        14: [
            {
                name: "Reliable Talent",
                desc: "Whenever the sidekick makes an ability check that includes its whole proficiency bonus, it can treat a d20 roll of 9 or lower as a 10."
            }
        ],
        15: [
            {
                name:"Expertise",
                desc: "Choose two of the sidekick's skill proficiencies. The sidekick's proficiency bonus is doubled for any ability check it makes that uses any of the chosen proficiencies.",
                options: [
                    { name: "Will be determined based on the sidekick's skill proficiencies" }],
                nbChoices: 2
            }
        ],
        16: [
            {
                name:"Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        18: [
            {
                name: "Saving Throw Proficiency",
                desc: "Sharp Mind: The sidekick gains proficiency in one saving throw of your choice.",
                options: [
                    { name: "Intelligence" },
                    { name: "Wiscom" },
                    { name: "Charisma" }
                ],
                nbChoices: 1
            },
        ],
        19: [
            {
                name:"Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        20: [
            {
                name:"Inspiring Help",
                desc: "When the sidekick takes the Help action, the creature who receives the help also gains a 2d6 bonus to the d20 roll. If that roll is an attack roll, the creature can forgo adding the bonus to it, and then if the attack hits, the creature can add the bonus to the attack's damage roll against one target."
            }
        ],

    };
}

export class Spellcaster implements SidekickClass {
    name = 'Spellcaster';
    desc = 'A sidekick who becomes a Spellcaster walks the paths of magic.\n' +
    'The sidekick might be a hedge wizard, a priest, a soothsayer, a magical performer, or a person with magic in their veins.';
    featuresByLevel = {
        1: [
            {
                name: "Saving Throw Proficiency",
                desc: "The sidekick gains gain proficiency in one saving throw of your choice",
                options: [
                    { name: "Wisdom" },
                    { name: "Intelligence" },
                    { name: "Charisma" }
                ],
                nbChoices: 1
            },
            {
                name: "Skill Proficiencies",
                desc: "The sidekick gains proficiency in five skills of your choice.",
                options: [
                    { name: "Arcana" },
                    { name: "History" },
                    { name: "Insight" },
                    { name: "Investigation" },
                    { name: "Medicine" },
                    { name: "Performance" },
                    { name: "Persuasion" },
                    { name: "Religion" }
                ],
                nbChoices: 2
            },
            {
                name: "Armor Proficiency",
                desc: "light armor"
            },
            {
                name: "Weapon Proficiency",
                desc: "all simple weapons",
                conditions: ["humanoid", "simple weapon", "martial weapon"]
            },
            {
                name: "Spellcaster Role",
                desc: "The sidekick gains the ability to cast spells. Choose the Spellcaster's role: Mage, Healer, or Prodigy. This choice determines the spell list and spellcasting ability used by the sidekick.",
                options: [
                    {
                        name: "Mage",
                        desc: "Spell List: Wizard - Spellcasting Ability: Intelligence"
                    },
                    {
                        name: "Healer",
                        desc: "Spell Lists: Cleric and Druid - Spellcasting Ability: Wisdom"
                    },
                    {
                        name: "Prodigy",
                        desc: "Spell Lists: Bard and Warlock - Spellcasting Ability: Charisma"
                    }
                ],
                nbChoices: 1
            }
        ],
        4: [
            {
                name:"Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        6: [
            {
                name:"Potent Cantrips",
                desc: "The sidekick can add its spellcasting ability modifier to the damage it deals with any cantrip."
            }
        ],
        8: [
            {
                name:"Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        12: [
            {
                name:"Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        14: [
            {
                name:"School of Magic for Empowered Spells",
                desc: "Choose one school of magic. Whenever the sidekick casts a spell of that school by expending a spell slot, the sidekick can add its spellcasting ability modifier to the spell's damage roll or healing roll, if any.",
                options: [
                    { name: "Abjuration" },
                    { name: "Conjuration" },
                    { name: "Divination" },
                    { name: "Enchantment" },
                    { name: "Evocation" },
                    { name: "Illusion" },
                    { name: "Necromancy" },
                    { name: "Transmutation" }
                ],
                nbChoices: 1
            }
        ],
        16: [
            {
                name:"Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        18: [
            {
                name:"Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        20: [
            {
                name:"Focused Casting",
                desc: "Taking damage can't break the sidekick's concentration on a spell."
            }
        ],
        
    };
}

export class Warrior implements SidekickClass {
    name = 'Warrior';
    desc = 'A Warrior sidekick grows in martial prowess as it fights by your side.\n' +
    'It might be a soldier, a town guard, a battle-trained beast, or any other creature honed for combat.';
    featuresByLevel = {
        1: [
            {
                name: "Saving Throw Proficiency",
                desc: "The sidekick gains proficiency in one saving throw of your choice",
                options: [
                    { name: "Strength" },
                    { name: "Dexterity" },
                    { name: "Constitution" }
                ],
                nbChoices: 1
            },
            {
                name: "Skill Proficiencies",
                desc: "The sidekick gains proficiency in two skills of your choice",
                options: [
                    { name: "Acrobatics" },
                    { name: "Animal Handling" },
                    { name: "Athletics" },
                    { name: "Intimidation" },
                    { name: "Nature" },
                    { name: "Perception" },
                    { name: "Survival" }
                ],
                nbChoices: 2
            },
            {
                name: "Armor Proficiency",
                desc: "all armor"
            },
            {
                name: "Weapon Proficiencies",
                desc: "all simple and martial weapons",
                conditions: ["humanoid", "simple weapon", "martial weapon"]
            },
            {
                name: "Shield Proficiency",
                desc: "shields",
                conditions: ["humanoid", "simple weapon", "martial weapon"]
            },
            {
                name: "Martial Role",
                desc: "Each warrior focuses on offense or defense in their training. Choose one of the following options:",
                options: [
                    {
                        name: "Attacker",
                        desc: "The sidekick gains a + 2 bonus to all attack rolls (already included)."
                    },
                    {
                        name: "Defender",
                        desc: "The sidekick can use its reaction to impose disadvantage on the attack roll of a creature within 5 feet of it whose target isn't the sidekick, provided the sidekick can see the attacker.",
                        category: "reactions"
                        
                    }
                ],
                nbChoices: 1
            }
        ],
        2: [
            {
                name: "Second Wind",
                desc: "Once per short or long rest, the sidekick can use a bonus action on its turn to regain hit points equal to 1d10 + its level in this class.",
                category: "bonus_actions"
            }
        ],
        3: [
            {
                name: "Improved Critical",
                desc: "The sidekick's attack rolls score a critical hit on a roll of 19 or 20 on the d20."
            }
        ],
        4: [
            {
                name: "Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            },
        ],
        6: [
            {
                name: "Extra Attack",
                desc: "The sidekick can attack twice, instead of once, whenever it takes the Attack action on its turn. If the sidekick has the Multiattack action, it can use Extra Attack or Multiattack on a turn, not both."
            }
        ],
        7: [
            {
                name: "Battle Readiness",
                desc: "The sidekick has advantage on initiative rolls."
            }
        ],
        8: [
            {
                name: "Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        10: [
            {
                name: "Improved Defense",
                desc: "The sidekick's Armor Class increases by 1 (already iuncluded)."
            },
        ],
        11: [
            {
                name: "Indomitable",
                desc: "Once per long rest, the sidekick can reroll a saving throw that it fails, but it must use the new roll."
            },
        ],
        12: [
            {
                name: "Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        14: [
            {
                name: "Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        15: [
            {
                name: "Extra Attack",
                desc: "The sidekick can attack three times, instead of once, whenever it takes the Attack action on its turn. If the sidekick has the Multiattack action, it can use Extra Attack or Multiattack on a turn, not both."
            }
        ],
        16: [
            {
                name: "Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        18: [
            {
                name: "Indomitable",
                desc: "Twice per long rest, the sidekick can reroll a saving throw that it fails, but it must use the new roll."
            },
        ],
        19: [
            {
                name: "Ability Score Improvement",
                desc: "The sidekick increases one ability score of your choice by 2, or the sidekick increases two ability scores of your choice by 1. The sidekick can't increase an ability score above 20 using this feature.",
                options: [
                    { name: "Will be determined based on the sidekick's current abilities" }
                ],
                nbChoices: 2
            }
        ],
        20: [
            {
                name: "Second Wind",
                desc: "Twice per short or long rest, the sidekick can use a bonus action on its turn to regain hit points equal to 1d10 + its level in this class.",
                category: "bonus_actions"
            }
        ],
    };
}