import { Notice, Plugin, MarkdownView, TFile, FuzzySuggestModal } from 'obsidian';
import { ChallengeRating, HitDice, Abilities, Attack } from './statblocks/components';
import { showLevelSelectModal, showClassSelectModal, showOptionSelectModal, showNameInputModal } from './modals/show';
import { Statblock, extractStatblock, formatStatblockAsText, saveStatblockToFile } from './statblocks/statblocks';
import { Sidekick } from 'sidekicks/sidekicks';
import { Proficiency } from './statblocks/components';
import { DEFAULT_SETTINGS, StatblockSidekickSettings, StatblockSidekickSettingsTab } from './settings/settings';

export default class StatblockSidekick extends Plugin {
    settings: StatblockSidekickSettings;

    async onload() {
        await this.loadSettings();
        this.initializeSettings();

        // create sidekick command
        this.addCommand({
            id: 'create-sidekick',
            name: 'Create Sidekick',
            checkCallback: (checking: boolean) => {
                const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (markdownView) {
                    if (!checking) {
                        const text = markdownView.editor.getValue();
                        this.createSidekick(text);
                    }
                    return true;
                }
                return false;
            }
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
      }
    
    async saveSettings() {
        await this.saveData(this.settings);
    }
    
    initializeSettings(): void {
        this.addSettingTab(new StatblockSidekickSettingsTab(this.app, this));
    }

    
    async createSidekick(text: string)
    {
        const statblock = extractStatblock(text);
        
        if (!statblock) {
            new Notice('No valid statblock found!');
            return;
        }

        // Check CR
        const cr = ChallengeRating.parse(statblock.cr);
        if (!cr) {
            new Notice(`CR ${statblock.cr} is invalid!`);
            return;
        }
        else if (!cr.isSuitable()) {
            new Notice("CR must be ≤ 1/2");
            return;
        }

        // check hit dice
        const hitDice = HitDice.parse(statblock.hit_dice);
        if (!hitDice) {
            return;
        }
    
        // Select class
        const sidekickClass = await showClassSelectModal(this.app);
        if (!sidekickClass) {
            return;
        }
        
        // Select level
        const level = await showLevelSelectModal(this.app);
        if (level === undefined) {
            return;
        }

        const oldAbilities = Abilities.fromArray(statblock.stats);
        const oldMods = Abilities.calculateModifiers(oldAbilities);
        const oldProficiencyBonus = 2

        // create sidekick
        const sidekick = new Sidekick(statblock, sidekickClass, level); 
        // let appliedNotice = new Notice(``, 0);

        // level up incrementally
        for (let levelIndex = 0; levelIndex < level; levelIndex++) {
            // appliedNotice.hide();
            const abilities = Abilities.fromArray(statblock.stats);
            const conMod = Abilities.calculateModifier(abilities.constitution);
            hitDice.increment(conMod);
            const features = sidekickClass.featuresByLevel[levelIndex + 1];
            if (features) {
                let levelNotice = new Notice(`Level ${levelIndex + 1}...`, 0);
                for (const feature of features) {
                    const shouldApplyFeature = !feature.conditions || feature.conditions.some(condition => sidekick.checkCondition(condition));                    
                    if (shouldApplyFeature) {
                        if (feature.options) {
                            for (let choiceIndex = 0; choiceIndex < (feature.nbChoices || 1); choiceIndex++) {
                                feature.options = sidekick.getOptions(feature);
                                const selectedOption = await showOptionSelectModal(this.app, feature, choiceIndex, feature.nbChoices || 1);
                                sidekick.applyFeature(feature, selectedOption);
                            }
                        }
                        else {
                            sidekick.applyFeature(feature);
                        }
                    // let appliedNotice = new Notice(`Applied ${feature.name}`);
                    }

                }
                levelNotice.hide();
            }
            
            else {                     
            }
        }

        // update the statblock
        sidekick.applySpellcasting()

        const proficiencyBonus = Proficiency.calculatePB(sidekick.level);
        const proficiencyDiff = proficiencyBonus - oldProficiencyBonus;

        const abilities = Abilities.fromArray(statblock.stats);
        const mods = Abilities.calculateModifiers(abilities)
        const modDiff = Abilities.calculateModDiff(oldMods, mods)
        
        sidekick.updateSkills(oldAbilities, oldProficiencyBonus)
        sidekick.updateAttacks(oldAbilities, oldProficiencyBonus)
        sidekick.updateSaves(oldAbilities, oldProficiencyBonus)
        sidekick.updateSenses()
       
        // const now = new Date();
        // const dateString = window.moment(now).format('YYYY-MM-DD');
        // const timeString = window.moment(now).format('HH-mm-ss');
        // const fileName = `${dateString}_${timeString}_${statblock.name}.md`;

        sidekick.statblock.hit_dice = hitDice.toString();
        sidekick.statblock.cr = sidekick.level
        
        const sidekickName = await showNameInputModal(this.app);
        sidekick.statblock.name = `${sidekickName} - ${sidekick.statblock.name} - ${sidekick.sidekickClass.name} Sidekick`;
        const fileName = `${sidekick.statblock.name}.md`;

        const updatedContent = formatStatblockAsText(sidekick.statblock);
        saveStatblockToFile(this, updatedContent, fileName);
    }
    onunload() {}
}