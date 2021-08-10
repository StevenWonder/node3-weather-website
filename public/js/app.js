console.log('Client side javaScript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const fetchWeather = (address) => {
    const url = `http://localhost:3000/weather?address=${address}`
    fetch(url).then((response) => {
        response.json().then((data) => {
            const { error, location, forecast } = data
            if (error) {
                messageOne.textContent = error
            } else {
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }
        })
    })    
}


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetchWeather(location)
})