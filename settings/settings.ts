import { App, PluginSettingTab, Setting, TFolder } from 'obsidian';
import StatblockSidekick from 'main';

export interface StatblockSidekickSettings {
  saveFolder: string;
  saveMode: 'sameFolder' | 'defaultFolder' | 'promptFolder';
}

export const DEFAULT_SETTINGS: StatblockSidekickSettings = {
  saveFolder: '/sidekicks',
  saveMode: 'defaultFolder', // Set the default save mode
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

    new Setting(containerEl)
      .setName("Save mode")
      .setDesc("Choose how to save the sidekick files")
      .addDropdown((dropdown) =>
        dropdown
          .addOption('sameFolder', 'Same as original file')
          .addOption('defaultFolder', 'Default folder')
          // .addOption('promptFolder', 'Prompt for Folder')
          .setValue(this.plugin.settings.saveMode)
          // .onChange(async (value: 'sameFolder' | 'defaultFolder' | 'promptFolder') => {
          .onChange(async (value: 'sameFolder' | 'defaultFolder') => {
            this.plugin.settings.saveMode = value;
            await this.plugin.saveSettings();
          })
      );

      new Setting(containerEl)
      .setName("Default folder")
      .setDesc("Select the folder where sidekick files should be saved when 'Save mode' is set to 'Default folder'")
      .addText((textComponent) => {
          textComponent.inputEl.placeholder = 'Enter folder path...';
          textComponent.setValue(this.plugin.settings.saveFolder);
          textComponent.onChange(async (value) => {
              this.plugin.settings.saveFolder = value;
              await this.plugin.saveSettings();
          });
      });
    
      
  }
}