#!/usr/bin/env node
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import * as zx from 'zx'
import * as M from 'module'
import minimist from 'minimist';
import dotenv from 'dotenv'
const require = M.createRequire(import.meta.url)
const packageJSON = require('./package.json')
const path = require('path');
import { fileURLToPath } from 'url';
$.verbose = false; //avoids showing the curl requests in the terminal
const __dirname = fileURLToPath(import.meta.url);
const API_URL = 'https://weatherclyapi.vercel.app/api/weather?';
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // necessary for the cli to work outside of the project

async function getUnit(unitFlag) {
    function saveUnit() {
        fs.writeFileSync(path.resolve(__dirname, '../.env'), '\nunit=' + unitFlag, { 'flag': 'a' }, (err) => {
            if (err) {
                console.log(chalk.red('Error: ' + err));
                process.exit(1);
            }
        });
    }
    if (unitFlag == undefined) {
        if (process.env.unit !== undefined) {
            return process.env.unit;
        }
        else {
            console.log(chalk.red("\nNo unit specified, defaulting to standard"));
            return 'standard';
        }
    }
    else if (unitFlag == 'standard' || unitFlag == 's') {
        await saveUnit();
        return 'standard';
    }
    else if (unitFlag == 'metric' || unitFlag == 'm') {
        await saveUnit();
        return 'metric';
    }
    else if (unitFlag == 'imperial' || unitFlag == 'i') {
        await saveUnit();
        return 'imperial';
    }
    else {
        console.log(chalk.red("\nIncorrect unit specified, defaulting to standard"));
        return 'standard';
    }
}
function getLang(langFlag) {
    const languageCodes = ['af', 'al', 'ar', 'az', 'bg', 'ca', 'cz', 'da', 'de', 'el', 'es', 'en', 'eu', 'fa', 'fi', 'fr', 'gl', 'he', 'hi', 'hr', 'hu', 'id', 'it', 'ja', 'kr', 'la', 'lt', 'mk', 'no', 'nl', 'pl', 'pt', 'pt_br', 'ro', 'ru', 'sv', 'se', 'sk', 'sl', 'sp', 'es', 'sr', 'th', 'tr', 'ua', 'uk', 'vi', 'zh_cn', 'zh_tw', 'zu']
    if (argv['l']) {
        if (languageCodes.includes(argv['l'])) {
            return langFlag;
        }
        else {
            console.log(chalk.red.bold("\nPlease use a valid language code, e.g. 'en' or 'es'. Defaulting to English"));
            return 'en';
        }
    }
    else {
        return 'en';
    }
}
async function getIP() {
    console.log(chalk.hex('#719c9a').bold("Fetching your IP: for your location..."));
    let ip_json = await fetch('https://api.ipify.org?format=json');
    let ip = await ip_json.json();
    return ip.ip;
}
async function getCity() {
    console.log(chalk.hex('#719c9a').bold("\nFetching your City with the ip..."));
    let ip = await getIP();
    let cityJson = await fetch('https://ipapi.co/' + ip + '/city/');
    let city = await cityJson.text();
    return city;
}
// function parseWeather(arg, weather) {
//     let temperature = {
//         temperature: Math.round(weather.main.temp),
//         feelslike: Math.round(weather.main.feels_like),
//         temp_min: Math.round(weather.main.temp_min),
//         temp_max: Math.round(weather.main.temp_max)
//     }
//     let wind = {
//         speed: weather.wind.speed,
//         deg: weather.wind.deg,
//         gust: weather.wind.gust
//     }
//     let main = {
//         description: weather.weather[0].description,
//         humidity: weather.main.humidity,
//         pressure: weather.main.pressure,
//         sea_level: weather.main.sea_level,
//         grnd_level: weather.main.grnd_level
//     }

//     // let rain = { //add later
//     //     rain1h: weather.rain.1h,
//     //     rain3h: weather.rain.3h
//     // }

//     // let snow = { //add later
//     //     snow1h: weather.snow.1h,
//     //     snow3h: weather.snow.3h
//     // }

//     let clouds = {
//         all: weather.clouds.all + '%'
//     }
//     let sys = {
//         sunrise: weather.sys.sunrise,
//         sunset: weather.sys.sunset
//     }

//     if (arg == 'temperature' || arg == 'Temperature' || arg == 't') {
//         console.log(chalk.inverse('Temperature:') + ' ' + temperature.temperature + '\n');
//     }
//     else if (arg == 'tempMin' || arg == 'TempMin' || arg == 'tm') {
//         console.log(chalk.inverse('Temp min:') + ' ' + temperature.temp_min + '\n');
//     }
//     else if (arg == 'tempMax' || arg == 'TempMax' || arg == 'tx') {
//         console.log(chalk.inverse('Temp max:') + ' ' + temperature.temp_max + '\n');
//     }
//     else if (arg == 'feelsLike' || arg == 'FeelsLike' || arg == 'fl') {
//         console.log(chalk.inverse('Feels like:') + ' ' + temperature.feelslike + '\n');
//     }
//     else if (arg == 'humidity' || arg == 'Humidity' || arg == 'h') {
//         console.log(chalk.inverse('Humidity:') + ' ' + main.humidity + '\n');
//     }
//     else if (arg == 'pressure' || arg == 'Pressure' || arg == 'p') {
//         console.log(chalk.inverse('Pressure:') + ' ' + main.pressure + '\n');
//     }
//     else if (arg == 'description' || arg == 'Description' || arg == 'd') {
//         console.log(chalk.inverse('Description:') + ' ' + main.description + '\n');
//     }
//     else if (arg == 'windSpeed' || arg == 'WindSpeed' || arg == 'ws') {
//         console.log(chalk.inverse('Wind speed:') + ' ' + wind.speed + '\n');
//     }
//     else if (arg == 'windDeg' || arg == 'WindDeg' || arg == 'wd') {
//         console.log(chalk.inverse('Wind deg:') + ' ' + wind.deg + '\n');
//     }
//     else if (arg == 'windGust' || arg == 'WindGust' || arg == 'wg') {
//         console.log(chalk.inverse('Wind gust:') + ' ' + wind.gust + '\n');
//     }
//     else if (arg == 'wind' || arg == 'Wind' || arg == 'w') {
//         console.log(chalk.inverse('Wind speed:') + ' ' + wind.speed + '\n');
//         console.log(chalk.inverse('Wind deg:') + ' ' + wind.deg + '\n');
//         console.log(chalk.inverse('Wind gust:') + ' ' + wind.gust + '\n');
//     }
//     else if (arg == 'cloud' || arg == 'Cloud' || arg == 'c') {
//         console.log(chalk.inverse('Cloud:') + ' ' + clouds.all + '\n');
//     }
//     // else if (arg == 'snow' || arg == 'Snow' || arg == 's') {
//     //     console.log(chalk.inverse('Snow:') + ' ' + snow.snow1h + '\n');
//     //     console.log(chalk.inverse('Snow:') + ' ' + snow.snow3h + '\n');
//     // }
//     // else if (arg == 'rain' || arg == 'Rain' || arg == 'r') {
//     //     console.log(chalk.inverse('Rain Volume (1h):') + ' ' + rain.r1h + '\n');
//     //     console.log(chalk.inverse('Rain Volume (3h):') + ' ' + rain.r3h + '\n');
//     // }
//     else if (arg == 'sunrise' || arg == 'Sunrise' || arg == 'sr') {
//         console.log(chalk.inverse('Sunrise:') + ' ' + sys.sunrise + '\n');
//     }
//     else if (arg == 'sunset' || arg == 'Sunset' || arg == 'ss') {
//         console.log(chalk.inverse('Sunset:') + ' ' + sys.sunset + '\n');
//     }
//     else {
//         console.log(chalk.red('Error, incorrect flag argument'));
//     }
// }
async function getWeather(city, unit, lang, weatherFlag) {
    let response = await fetch(API_URL + 'city=' + city + '&unit=' + unit + '&lang=' + lang + '&weatherFlag=' + weatherFlag);
    let weatherJSON = await response.json();
    let weather = weatherJSON.weather;
    if (weatherFlag === true) {
        console.log(chalk.inverse('Basic Weather: \n')
            + chalk.underline('Temperature:') + ' ' + weather.temperature + '\n'
            + chalk.underline('Feels like:') + ' ' + weather.feelsLike + '\n'
            + chalk.underline('Description:') + ' ' + weather.description + '\n'
            + chalk.underline('Wind Speed:') + ' ' + weather.windSpeed + '\n'
            + chalk.underline('Humidity:') + ' ' + weather.humidity + '\n'
            + chalk.underline('Pressure:') + ' ' + weather.pressure
        );
    }
    else if (weatherFlag.split(',').length > 1) {
        console.log(chalk.cyan.underline('Weather:\n'));
        let weatherFlags = weatherFlag.split(',');
        for (let i = 0; i < weatherFlags.length; i++) {
            console.log(chalk.green(JSON.stringify(weather[i])) + '\n');
        }
    }
    else {
        console.log(chalk.cyan.underline('Weather:\n'));
        console.log(chalk.green(JSON.stringify(weather, null, 2)));
    }
}
// function parseForecast(arg, forecast) {
//     if (arg.includes('h') || arg.includes('hourly') || arg.includes('Hourly')) {
//         let hour = arg.split('=')[1];
//         if (hour > 48) {
//             console.log(chalk.red('Error, max hour forecast is 48'));
//             process.exit();
//         }
//         console.log(chalk.inverse('Hourly Forecast for ' + hour + ' hours from now: \n'))
//         console.log(forecast.hourly[hour]);
//     }
//     else if (arg.includes('d') || arg.includes('daily') || arg.includes('Daily')) {
//         let day = arg.split('=')[1];
//         if (day > 7) {
//             console.log(chalk.red('Error, max day is 7'));
//             process.exit();
//         }
//         console.log(chalk.inverse('Daily Forecast for ' + day + ' days from now: \n'))
//         console.log(forecast.daily[day]);
//     }
//     else {
//         console.log(chalk.red('Error, incorrect flag argument supplied to forecast. Use -d/--daily or -h/--hourly'));
//         process.exit();
//     }
// }
async function getForecast(city, unit, lang, forecastFlag) {
    let response = await fetch(API_URL + 'city=' + city + '&unit=' + unit + '&lang=' + lang + '&forecastFlag=' + forecastFlag);
    let forecastJSON = await response.json();
    let forecast = forecastJSON.response;
    console.log(chalk.cyan.underline('Forecast:\n'));
    console.log(chalk.green(JSON.stringify(forecast, null, 2)));
}

// TODO: Implement this
// eslint-disable-next-line no-unused-vars 
async function getWeatherAndForecast(city, unit, lang, weatherFlag, forecastFlag) {
    let response = await fetch(API_URL + 'city=' + city + '&unit=' + unit + '&lang=' + lang + '&weatherFlag=' + weatherFlag + '&forecastFlag=' + forecastFlag);
    let weatherAndForecast = await response.json();
    return weatherAndForecast;
}

void async function () {
    let argv = minimist(process.argv, { // parse the arguments
        // flag options
        alias: {
            w: 'weather',
            f: 'forecast',
            c: 'city',
            u: 'unit',
            l: 'lang',
            h: 'help',
            v: 'version'
        }
    })

    const help = `
    $ weathercly -w/--weather [args] -f/--forecast [args] -c/--city [string] -u/--unit [string] -l/--lang [string]

    -w/--weather: Current weather conditions.

    t, temperature: Temperature
    tmin, minTemperature: Minimum temperature
    tmax, maxTemperature: Maximum temperature
    fl, feelslike: What the temperature feels like

    h, humidity: Humidity
    p, pressure: Pressure
    d, description: Description of the weather

    w, wind: Wind speed, direction and speed
    ws, windspeed: Wind speed
    wdir, winddirection: Wind direction
    wg, windgust: Wind gust

    c, clouds: Cloudiness

    r, rain: Rain volume in the last 1 hour and the last 3 hours
    s, snow: Snow volume in the last 1 hour and the last 3 hours

    ssun, sunrise: Sunrise time
    sset, sunset: Sunset time

    -f/--forecast: Forecast weather conditions.

    h, hourly=[0-24]: Hourly forecast
    d, daily=[0-7]: Daily forecast

    If none are selected, all will be returned

    -c/--city: The city you want to get the weather for, if not provided, the default will be the user's location.

    -m/--measurement: The units of measurement you want to use for the returned values

    s, standard : Standard units of measurement
    m, metric : Metric units of measurement
    i, imperial : Imperial units of measurement

    -l/--lang: The language you want to get the weather in

    - See https://openweathermap.org/current#multi for options `;


    /* Check if the user passed the help or version flags,
    if so, print the help or version info and exit */
    if (argv['h']) {
        console.log(help);
        process.exit(0);
    }
    else if (argv['v']) {
        console.log('version: ' + packageJSON.version);
        process.exit(0);
    }


    /* Check if the user passed the weather or forecast flag, if not, exit the process */
    if (!argv['w'] && !argv['f'] && !argv['k']) {
        console.log(chalk.red('Error, no weather or forecast flag passed. Use -h or --help for more info.'));
        process.exit(1);
    }
    // console.log(process.argv);
    let unit = await getUnit(argv['u']);
    let lang = await getLang(argv['l']);
    let city;
    if (argv['c'] == undefined) {
        city = await getCity();
    }
    else {
        city = argv['c'];
    }
    console.log(chalk.magenta('Using the city of: ' + city));

    let weatherFlag = argv['w'];
    let forecastFlag = argv['f'];

    if (argv['w'] != undefined && argv['f'] != undefined) {
        await getWeather(city, unit, lang, weatherFlag);
        getForecast(city, unit, lang, forecastFlag);
    }
    else if (argv['w'] != undefined) {
        getWeather(city, unit, lang, weatherFlag);
    }
    else if (argv['f'] != undefined) {
        getForecast(city, unit, lang, forecastFlag);
    }
    else {
        console.log(chalk.red('Error'));
        process.exit(1);
    }
}()