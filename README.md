# Statblock Sidekick
This [Obsidian](https://obsidian.md/) plugin is designed as a sidekick for your D&D 5e statblocks. Its goal is to help you edit your [Fantasy Statblocks](https://github.com/javalent/fantasy-statblocks) and implement rules from various sources.

Presently, the plugin allows you to create custom D&D 5e sidekicks based on the rules from *Tasha's Cauldron of Everything*: Expert, Spellcaster, or Warrior. It provides an interactive experience for selecting the sidekick's class, level, and features.

## Installation
It's not currently possible to install the Statblock sidekick like a standard community plugin from within Obsidian. There are two installation methods: through BRAT or manually.
## BRAT
1. Install and enable [BRAT](https://github.com/TfTHacker/obsidian42-brat). The simplest method is to use this [link](obsidian://show-plugin?id=obsidian42-brat).
2. Open the Command Palette or click on the BRAT icon in the Obsidian ribbon.
3. Select "Add a beta plugin for testing".
4. When the modal opens, paste the link to this repo in the designated field (). 
5. Make sure "Enable after installing the plugin" is ticked and click "Add Plugin".
## Manual installation (updating will require repeating this process)
1. Download the main.js and manifest.json files from the [latest release](https://github.com/n21rl/stablock-sidekick/releases/latest).
2. Place the downloaded files within a `sideblock-sidekick` folder in your Obsidian plugin folder (it should be `\.obsidian\plugins` within your vault).
3. Enable the plugin within Obsidian.

## Settings
### Save Mode
This setting determines where the generated sidekick note will be saved. You have two options:
1. **Same Directory**: The sidekick note will be saved in the same directory as the original statblock note.
2. **Default Directory**: The sidekick note will be saved in a specific directory that you can set using the `Save Directory` setting (see below).
### Default Directory
This setting is only applicable if you have chosen the `Default Directory` option in the `Save Mode` setting. Here, you can specify the directory where the generated sidekick notes will be saved by default.

## Creating a sidekick
1. Open a note containing a valid D&D 5e statblock formatted using the `statblock` code block in the [Fantasy Statblocks format](https://plugins.javalent.com/statblock/layouts/integrated/dnd5e).
2. From the Command Palette (`Ctrl/Cmd+P`), run the `Create sidekick` command.
3. Follow the prompts to select the sidekick's class, level, and features.
4. Once all the selections are made, the plugin will open a new note with the new statblock.

## Notes
- All sidekick rules from *Tasha's* are implemented except the language requirements for the Expert and the Spellcaster.
- You will have to manually enter spells in the output statblock.
- The sidekick level is saved in the `cr` field for convenience, but remember that level and CR (and XP) are not equivalent.
- Please only use this plugin if you own *Tasha's Cauldron of Everything* and with statblocks for which you own the source materials.

## Future plans
- Levelling up of a sidekick
- Rules from *Flee Mortals!*
- Equipment management
- Reduced-threat monsters
- Open to suggestions!

## Feedback and Support
If you encounter any issues or have suggestions for improvements, please report them on the plugin's GitHub repository or reach out to **@Ant** on the [Obsidian TTRPG Community Discord](https://discord.gg/sur9nSTf).
