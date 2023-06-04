const { ApplicationCommandOptionType, EmbedBuilder  } = require('discord.js');

require('dotenv').config();
const X_RapidAPI_Key = process.env.RapidAPIWeather;

module.exports = {
    name:'weather',
    description: 'Displays info about weather!',
        options: [
            {
                name: 'type',
                description: 'What type of weather information do you want?',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'current-weather',
                        value: 'now'
                    },
                    {
                        name: 'forecast-for-tomorrow',
                        value: 'forecast'
                    }
                ],
                required: true
            },
            {
                name: 'city',
                description: 'City you want to check weather for',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ],
    devOnly: false,
    testOnly: false,
    deleted: false,

    callback:async (client, interaction) => {
        const searchQuery = interaction.options.get('city').value;
        const func_type = interaction.options.get('type').value;
        const options = {
            method: 'GET',
            headers: {
             'X-RapidAPI-Key': X_RapidAPI_Key,
             'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
           };
        switch (func_type) {
            case 'now':
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(searchQuery)}`;
        const response = await fetch(url, options);
        const result = await response.json();
        if (!result.error) {
          const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Current weather information for "${searchQuery}"`)
            .setDescription('Enjoy your current weather info!')
            .setThumbnail(`https:${result.current.condition.icon}`)
            .addFields(
                { name: 'Name', value: result.location.name },
                { name: 'Region', value: `${result.location.region} ` },
                { name: 'Country', value: result.location.country },
                { name: 'Cordinates', value: `latitude: ${result.location.lat}, longitude: ${result.location.lon}` },
                { name: 'Local time', value: result.location.localtime },
                { name: 'Weather last updated on', value: result.current.last_updated },
                { name: 'Temperature', value: `${result.current.temp_c} °C/${result.current.temp_f} °F`, inline: true },
                { name: 'Condition', value: `${result.current.condition.text}`, inline: true },
                { name: 'Wind speed', value: `${result.current.wind_kph}kph/${result.current.wind_mph}mph`, inline: true },
                { name: 'Wind direction', value: `${result.current.wind_degree}° to ${result.current.wind_dir}`, inline: true },
                { name: 'Pressure', value: `${result.current.pressure_mb}mb/${result.current.pressure_in}in`, inline: true },
                { name: 'Precipitation', value: `${result.current.precip_mm}mm/${result.current.precip_in}in`, inline: true },
                { name: 'Humidity', value: `${result.current.humidity}`, inline: true },
                { name: 'Cloud', value: `${result.current.cloud}`, inline: true },
                { name: 'Feels like', value: `${result.current.feelslike_c} °C/${result.current.feelslike_f} °F`, inline: true },
                { name: 'Visibility', value: `${result.current.vis_km}km/${result.current.vis_miles}miles`, inline: true },
                { name: 'UV', value: `${result.current.uv}`, inline: true },
            )
            .setTimestamp();
            interaction.reply({ embeds: [embed] });
        } else {
          interaction.reply(`No results found for "${searchQuery}"`);
        }
        break;
        case ('forecast'):
        const url1 = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${encodeURIComponent(searchQuery)}&days=2`;
        const response1 = await fetch(url1, options);
        const result1 = await response1.json();
        const data = result1.forecast.forecastday[1].day;
        if (!result1.error) {
          const embed = new EmbedBuilder()
            .setColor('Random')
            .setTitle(`Weather forecast for "${searchQuery}" for ${result1.forecast.forecastday[1].date}`)
            .setDescription('Enjoy your weather forecast for tomorrow!')
            .setThumbnail(`https:${data.condition.icon}`)
            .addFields(
                { name: 'Name', value: result1.location.name },
                { name: 'Region', value: `${result1.location.region} ` },
                { name: 'Country', value: result1.location.country },
                { name: 'Max temperature', value: `${data.maxtemp_c} °C/${data.maxtemp_f} °F`, inline: true },
                { name: 'Min temperature', value: `${data.mintemp_c} °C/${data.mintemp_f} °F`, inline: true },
                { name: 'Average temperature', value: `${data.avgtemp_c} °C/${data.avgtemp_f} °F`, inline: true },
                { name: 'Max wind', value: `${data.maxwind_mph}mph/${data.maxwind_kph}kph`, inline: true },
                { name: 'Total precipitation', value: `${data.totalprecip_mm}mm/${data.totalprecip_in}in`, inline: true },
                { name: 'Total snow', value: `${data.totalsnow_cm}cm`, inline: true },
                { name: 'Average visibility', value: `${data.avgvis_km}km/${data.avgvis_miles}miles`, inline: true },
                { name: 'Average humidity', value: `${data.avghumidity}`, inline: true },
                { name: 'Condition', value: `${data.condition.text}`, inline: true },
                { name: 'Chance of snow', value: `${data.daily_chance_of_snow}`, inline: true },
                { name: 'Chance of rain', value: `${data.daily_chance_of_rain}`, inline: true },
                { name: 'UV', value: `${data.uv}`, inline: true },
            )
            .setTimestamp();
            interaction.reply({ embeds: [embed] });
        } else {
          interaction.reply(`No results found for "${searchQuery}"`);
        }
        break;
    }
    }
}