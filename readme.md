# Weathercly 

A simple node/zx cli app to get the weather and weather forecast for any location!

## Installation and Usage
```
   npm install -g weathercly
   weathercly -w t -c Chicago -u metric

    Using the city of: Chicago
    Weather:
    Temperature: 28
```
## Examples
```
$ weathercly
/* output */
```

## Usage/Options
```
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

h, hourly=[0-24]: Hourly forecast for the hour specified from the current time.
d, daily=[0-7]: Daily forecast for the day specified from the current time.

If none are selected, all will be returned

-c/--city: The city you want to get the weather for, if not provided, the default will be the user's location.

-m/--measurement: The units of measurement you want to use for the returned values

s, standard : Standard units of measurement
m, metric : Metric units of measurement
i, imperial : Imperial units of measurement

-l/--lang: The language you want to get the weather in

- See https://openweathermap.org/current#multi for options 

```

## Credits
Thank you to the zx maintainers, and the openweathermap.org team for making this possible.