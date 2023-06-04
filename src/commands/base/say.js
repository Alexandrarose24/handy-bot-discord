const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name:'say',
    description: 'Replies with whatever you want it to say!',
        options: [
            {
                name: 'text',
                description: 'What you want me to say?',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback:(client, interaction) => {
        const repl = interaction.options.get('text').value;
        interaction.reply(`${repl}`);
    }
}