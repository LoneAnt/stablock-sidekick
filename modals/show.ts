import { App } from 'obsidian';
import { LevelSelectModal, ClassSelectModal, OptionSelectModal, NameInputModal, FolderSelectModal } from './modals';
import { SidekickClass } from 'sidekicks/classes';
import {Feature, Option} from '../statblocks/statblocks'

export function showLevelSelectModal(app: App): Promise<number> {
    return new Promise((resolve) => {
        const modal = new LevelSelectModal(app, resolve);
        modal.open();
    });
}

export function showClassSelectModal(app: App): Promise<SidekickClass> {
        return new Promise((resolve) => {
        const modal = new ClassSelectModal(app, resolve);
        modal.open();
    });
}

export function showOptionSelectModal(app: App, feature: Feature, choiceIndex: number, maxChoices: number): Promise<Option> {
    return new Promise((resolve) => {
        const modal = new OptionSelectModal(app, feature, resolve, choiceIndex, maxChoices);
        modal.open();
    });
}

export function showNameInputModal(app: App) {
    return new Promise((resolve) => {
        const modal = new NameInputModal(app, resolve);
        modal.open();
    });
}

// not fully implemented yet
export function showFolderSelectModal(app: App): Promise<string | undefined> {
    return new Promise((resolve) => {
      const modal = new FolderSelectModal(app, resolve);
      modal.open();
    });
  }