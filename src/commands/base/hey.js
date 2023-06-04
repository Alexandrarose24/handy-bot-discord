module.exports = {
    name:'hey',
    description: 'Replies with hey!',
    devOnly: true,
    testOnly: false,
    deleted: false,

    callback:(client, interaction) => {
        interaction.reply('heyyyy!');
    }
}