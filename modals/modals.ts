import { FuzzySuggestModal, SuggestModal, App, Modal, TFolder } from 'obsidian';
import { SidekickClass, Expert, Warrior, Spellcaster } from '../sidekicks/classes';
import {Feature, Option} from '../statblocks/statblocks'

export class LevelSelectModal extends FuzzySuggestModal<number> {
    constructor(app: App, private onSelect: (level: number) => void) {
        super(app);
        this.setPlaceholder("Select level");
    }

    getItems(): number[] {
        return Array.from({ length: 20 }, (_, i) => i + 1);
    }

    getItemText(item: number): string {
        return `${item}`;
    }

    onChooseItem(item: number, evt: MouseEvent | KeyboardEvent): void {
        this.onSelect(item);
    }
}

export class ClassSelectModal extends SuggestModal<SidekickClass> {
    classes: SidekickClass[];

    constructor(app: App, private onClassChosen: (chosenClass: SidekickClass) => void) {
        super(app);
        this.setPlaceholder("Select a class");

        // Instantiate each class
        this.classes = [
            new Expert(),
            new Spellcaster(),
            new Warrior()
        ];
    }

    getSuggestions(query: string): SidekickClass[] {
        return this.classes.filter(cls => cls.name.toLowerCase().includes(query.toLowerCase()));
    }

    renderSuggestion(item: SidekickClass, el: HTMLElement): void {
        el.createEl('div', { text: item.name, cls: 'suggestion-name' });
        el.createEl('small', { text: item.desc, cls: 'suggestion-desc' });
    }

    onChooseSuggestion(item: SidekickClass, evt: MouseEvent | KeyboardEvent): void {
        this.onClassChosen(item);
    }
}

export class OptionSelectModal extends SuggestModal<Option> {
    feature: Feature;
    resolve: (option: Option) => void;

    constructor(app: App, feature: Feature, resolve: (option: Option) => void, choiceIndex: number, maxChoices: number) {
        super(app);
        this.feature = feature;
        this.resolve = resolve;
        this.setPlaceholder(`Select ${this.feature.name.toLowerCase()} (${choiceIndex + 1}/${maxChoices})`);
    }

    getSuggestions(query: string): Option[] {
        if (!this.feature.options) return [];
        const lowerCaseQuery = query.toLowerCase();
        return this.feature.options.filter(option =>
            option.name.toLowerCase().includes(lowerCaseQuery)
        );
    }

    renderSuggestion(item: Option, el: HTMLElement): void {
        el.createEl('div', { text: item.name, cls: 'suggestion-name' });
        el.createEl('small', { text: item.desc, cls: 'suggestion-desc' });
    }

    onChooseSuggestion(item: Option, evt: MouseEvent | KeyboardEvent): void {
        this.resolve(item);
        this.close();
    }
}

export class NameInputModal extends Modal {
    private resolve: (value: string) => void;

    constructor(app: App, resolve: (value: string) => void) {
        super(app);
        this.resolve = resolve;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h4', { text: "Enter the sidekick's name" });

        // Create a div as a Flex container
        const formContainer = contentEl.createEl('div', { cls: 'form-container' });

        const nameInput = formContainer.createEl('input', {
            type: 'text',
            placeholder: 'Enter name...',
            cls: 'form-input'
        });

        const submitButton = formContainer.createEl('button', {
            text: 'Save',
            cls: 'form-button'
        });

        submitButton.addEventListener('click', () => {
            this.resolve(nameInput.value);
            this.close();
        });

        nameInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.resolve(nameInput.value);
                this.close();
            }
        });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

// not fully implemented yet
export class DirectorySelectModal extends FuzzySuggestModal<string> {
  private resolve: (value: string | undefined) => void;

  constructor(app: App, resolve: (value: string | undefined) => void) {
    super(app);
    this.resolve = resolve;
    this.setPlaceholder('Enter or select a directory...');
    this.setInstructions([
      { command: '/', purpose: 'navigate to a folder' },
      { command: '<folder-name>', purpose: 'select a folder' },
    ]);
  }

  getItems(): string[] {
    return this.app.vault.getAllLoadedFiles()
      .filter((file) => file instanceof TFolder)
      .map((folder) => folder.path);
  }

  getItemText(item: string): string {
    return item.split('/').pop() || item; // Return the folder name or the full path if no name exists
  }

  onChooseItem(item: string, _evt: MouseEvent | KeyboardEvent): void {
    const folder = this.app.vault.getAbstractFileByPath(item);
    if (folder instanceof TFolder) {
      this.resolve(folder.path);
    } else {
      this.resolve(undefined);
    }
    this.close();
  }

  onOpen() {
    super.onOpen();
    this.inputEl.focus();
  }

  onClose() {
    this.resolve(undefined);
    super.onClose();
  }
}