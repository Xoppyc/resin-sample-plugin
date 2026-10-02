import { Plugin, PluginSettingTab, Setting } from 'resin-api';

interface HelloResinSettings {
  enableToast: boolean;
  greeting: string;
}

const DEFAULT_SETTINGS: HelloResinSettings = {
  enableToast: true,
  greeting: 'Hello from Resin!',
};

class HelloResinSettingTab extends PluginSettingTab {
  plugin: HelloResinPlugin;

  constructor(app: any, plugin: HelloResinPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.innerHTML = '';

    new Setting(containerEl)
      .setName('Enable Greeting Toast')
      .setDesc('Whether clicking the ribbon icon shows a greeting toast notification.')
      .addToggle((toggle) => {
        toggle
          .setValue(this.plugin.settings.enableToast)
          .onChange(async (val) => {
            this.plugin.settings.enableToast = val;
            await this.plugin.saveSettings();
          });
      });

    new Setting(containerEl)
      .setName('Custom Greeting Message')
      .setDesc('The message text to display in the toast.')
      .addText((text) => {
        text
          .setPlaceholder('Enter a greeting...')
          .setValue(this.plugin.settings.greeting)
          .onChange(async (val) => {
            this.plugin.settings.greeting = val;
            await this.plugin.saveSettings();
          });
      });
  }
}

export default class HelloResinPlugin extends Plugin {
  settings: HelloResinSettings = DEFAULT_SETTINGS;

  override async onLoad(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

    // 1. Ribbon Icon
    this.addRibbonIcon('SparkleIcon', 'Hello Resin', () => {
      if (this.settings.enableToast) {
        this.app.toast.show({
          title: 'Hello Resin',
          message: this.settings.greeting,
          type: 'info',
        });
      }
    });

    // 2. Command Palette Command
    this.addCommand({
      id: 'show-greeting',
      label: 'Show Greeting Toast',
      handler: () => {
        this.app.toast.show({
          title: 'Hello Resin Command',
          message: this.settings.greeting,
          type: 'success',
        });
      },
    });

    // 3. Settings Tab
    this.addSettingTab(new HelloResinSettingTab(this.app, this));
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  override async onUnload(): Promise<void> {
    // Resin cleans up ribbon icons and commands automatically
  }
}