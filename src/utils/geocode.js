const request = require('postman-request')

const mapBoxApiToken = 'pk.eyJ1Ijoic3RldmVud29uZGVycyIsImEiOiJja2x3cjhpemkwNnYxMm5zMnc3b2EzNmFrIn0.aSDbNBUgJyOriZOXff3NRw'

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapBoxApiToken}&limit=1`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try somewhere else!', undefined)
        } else {
            const { features } = body
            const [ longitude, latitude ] = features[0].center
            const { place_name: location } = features[0]
            callback(undefined, {
                longitude,
                latitude,
                location
            })
        }
    })
}

module.exports = geocode