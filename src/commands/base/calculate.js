const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name:'calculate',
    description: 'Computes mathematical operations with two numbers!',
    options: [
            {
                name: 'operation-type',
                description: 'Addition, substraction, multiplication, division or taking to power - you choose!',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'add',
                        value: '+'
                    },
                    {
                        name: 'substract',
                        value: '-'
                    },
                    {
                        name: 'multiply',
                        value: '*'
                    },
                    {
                        name: 'divide',
                        value: '/'
                    },
                    {
                        name: 'power',
                        value: '^'
                    }
                ],
                required: true
            },
            {
                name: 'first-number',
                description: 'The first number',
                type: ApplicationCommandOptionType.Number,
                required: true
            },
            {
                name: 'second-number',
                description: 'The second number',
                type: ApplicationCommandOptionType.Number,
                required: true
            }
        ],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback:(client, interaction) => {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;
        const op = interaction.options.get('operation-type').value;
        if (op == '^') {
            interaction.reply(`${num1} ${op} ${num2} = ${Math.pow(num1,num2)}`);
        } else {
            calc = num1+op+num2
        interaction.reply(`${num1} ${op} ${num2} = ${eval(calc)}`);
        }
    }
}