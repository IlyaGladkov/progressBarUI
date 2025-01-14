const progressValueInput = document.querySelector('.progressValue')
const animateSwitch = document.getElementById('animateSwitch')
const hideSwitch = document.getElementById('hideSwitch')

const progressBar = document.querySelector('progress-bar')

progressValueInput.addEventListener('change', () => {
    progressBar.setAttribute('value', progressValueInput.value)
})

var timer
animateSwitch.addEventListener('change', () => {
    if (animateSwitch.checked) {
        let value = 0
        timer = setInterval(() => {
            progressBar.setAttribute('value', value)
            value++
            if (value === 100) value = 0
        }, 30)
    } else {
        clearInterval(timer)
        progressBar.setAttribute('value', 0)
    }
})

hideSwitch.addEventListener('change', () => {
    if (hideSwitch.checked) {
        progressBar.hidden = true
    } else {
        progressBar.hidden = false      
    }
})