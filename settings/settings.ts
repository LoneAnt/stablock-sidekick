import { App, PluginSettingTab, Setting, TFolder } from 'obsidian';
import StatblockSidekick from 'main';

export interface StatblockSidekickSettings {
  saveDirectory: string;
  saveMode: 'sameDirectory' | 'defaultDirectory' | 'promptDirectory';
}

export const DEFAULT_SETTINGS: StatblockSidekickSettings = {
  saveDirectory: '/sidekicks',
  saveMode: 'defaultDirectory', // Set the default save mode
};

export class StatblockSidekickSettingsTab extends PluginSettingTab {
  plugin: StatblockSidekick;

  constructor(app: App, plugin: StatblockSidekick) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'Statblock Sidekick Settings' });

    new Setting(containerEl)
      .setName('Save Mode')
      .setDesc('Choose how to save the sidekick files.')
      .addDropdown((dropdown) =>
        dropdown
          .addOption('sameDirectory', 'Same as original file')
          .addOption('defaultDirectory', 'Default directory')
          // .addOption('promptDirectory', 'Prompt for directory')
          .setValue(this.plugin.settings.saveMode)
          // .onChange(async (value: 'sameDirectory' | 'defaultDirectory' | 'promptDirectory') => {
          .onChange(async (value: 'sameDirectory' | 'defaultDirectory') => {
            this.plugin.settings.saveMode = value;
            await this.plugin.saveSettings();
          })
      );

      new Setting(containerEl)
      .setName('Default Directory')
      .setDesc("Select the directory where sidekick files should be saved when 'Save Mode' is set to 'Default Directory'")
      .addText((textComponent) => {
          textComponent.inputEl.placeholder = 'Enter folder path...';
          textComponent.setValue(this.plugin.settings.saveDirectory);
          textComponent.onChange(async (value) => {
              this.plugin.settings.saveDirectory = value;
              await this.plugin.saveSettings();
          });
      });
    
      
  }
}