const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars view and location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Express matches this to an empty route. This overrides app.get('')
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Steven'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Steven'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Steven',
        description: 'This page should offer you useful tips'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address, (error, data) => {
        if (error) {
            return res.send({ error })
        }
        const { longitude, latitude, location } = data 
        forecast(latitude, longitude, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({ error: forecastError })
            }
            return res.send({
                location,
                forecast: forecastData,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Steven',
        title: '404',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Steven',
        title: '404',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})