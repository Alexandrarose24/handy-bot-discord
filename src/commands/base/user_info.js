const { EmbedBuilder  } = require('discord.js');
module.exports = {
    name:'user-info',
    description: 'Displays info about user!',
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback:(client, interaction) => {
        const embed = new EmbedBuilder()
        .setTitle(`Info about ${interaction.user.username}#${interaction.user.discriminator}`)
        .setDescription(`${interaction.member.nickname}`)
        .setColor('Random')
        .setThumbnail(interaction.user.avatarURL({format:'png', size: 128}))
        .setImage(interaction.user.avatarURL({dynamic:true, size: 4096}))
        .setFields({ name:'Joined server on', value: `<t:${Math.floor(interaction.member.joinedTimestamp/1000)}>`})
        .setTimestamp(Date.now());
        interaction.reply({ embeds: [embed] });
    }
}