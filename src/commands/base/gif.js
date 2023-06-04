const { ApplicationCommandOptionType, EmbedBuilder  } = require('discord.js');

require('dotenv').config();
const TENOR_API_KEY = process.env.TENORKEY;

module.exports = {
    name:'gif',
    description: 'Finds a gif by you search request!',
        options: [
            {
                name: 'search-prompt',
                description: 'What gif do you want?',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback:async (client, interaction) => {
        const searchQuery = interaction.options.get('search-prompt').value;
        const url = `https://api.tenor.com/v1/random?q=${encodeURIComponent(searchQuery)}&key=${TENOR_API_KEY}&limit=25&media_filter=minimal`;
        const response = await fetch(url);
        const result = await response.json();
        const randNum = Math.floor(Math.random() * 26);
        if (result.results && result.results.length > 0) {
          const gifUrl = result.results[randNum].media[0].gif.url;
          const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Search results for "${searchQuery}"`)
            .setImage(gifUrl)
            .setFooter({text:'Powered by Tenor'});
            interaction.reply({ embeds: [embed] });

        } else {
          interaction.reply(`No results found for "${searchQuery}"`);
        }
    }
}