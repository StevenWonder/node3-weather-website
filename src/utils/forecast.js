const request = require('postman-request')

const weatherStackToken = 'ef2aa1805c396ba30f7be15e6e3ee0d0'

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${weatherStackToken}&query=${latitude},${longitude}`
    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const { temperature, feelslike, weather_descriptions } = body.current
            const weatherSummary = `${weather_descriptions[0]}. Current temperature is ${temperature} degrees and it feels like ${feelslike} degrees`
            callback(undefined, weatherSummary)
        }
    })
}

module.exports = forecast