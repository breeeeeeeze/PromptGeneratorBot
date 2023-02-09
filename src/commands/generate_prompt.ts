import { ApplicationCommandRegistry, Command } from '@sapphire/framework';
import { Stopwatch } from '@sapphire/stopwatch';
import { postRequest } from '../utils/apiHelpers';
import { validateURL } from '../utils/validateURL';
import config from '../config';

export class GeneratePromptCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      description: 'Generate a prompt based on the image',
    });
  }

  public override registerApplicationCommands(
    registry: ApplicationCommandRegistry
  ) {
    registry.registerChatInputCommand(
      (builder) =>
        builder //
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((option) =>
            option //
              .setName('image_url')
              .setDescription('URL of the image')
              .setRequired(true)
          )
          .addStringOption((option) =>
            option //
              .setName('mode')
              .setDescription('Prompt generation mode')
              .addChoices(
                { name: 'Fast', value: 'fast' },
                { name: 'Default', value: 'default' },
                { name: 'Classic', value: 'classic' }
              )
          ),
      { guildIds: [config.guildId] }
    );
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    await interaction.deferReply();
    const image_url = interaction.options.getString('image_url');
    // default to fast if no mode is passed
    const mode = interaction.options.getString('mode') || 'fast';
    if (!image_url) return await interaction.editReply('Invalid URL');
    if (!validateURL(image_url))
      return await interaction.editReply('Invalid URL');
    this.container.logger.info(`Sending URL: ${image_url}`);

    const stopwatch = new Stopwatch();
    const message = await postRequest('generate_prompt', {
      url: image_url,
      mode: mode,
    });
    this.container.logger.info(
      `Reply received in ${stopwatch.stop().toString()} seconds.`
    );
    return await interaction.editReply(message);
  }
}
