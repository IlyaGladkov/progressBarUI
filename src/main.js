const progressValueInput = document.querySelector('.progressValue')
const animateSwitch = document.getElementById('animateSwitch')
const hideSwitch = document.getElementById('hideSwitch')

const progressBar = document.querySelector('progress-bar')

progressValueInput.addEventListener('input', () => {
    progressValueInput.value = progressValueInput.value > 100 ? 100 : progressValueInput.value
})

progressValueInput.addEventListener('change', () => {
    progressBar.setAttribute('value', progressValueInput.value)
})

let timer
let deg = 0
animateSwitch.addEventListener('change', () => {
    let max = 360
    if (animateSwitch.checked) {
        timer = setInterval(() => {
            progressBar.style.transform = `rotate(${deg++}deg)`
            if (deg >= max) deg = 0
        }, 5)
    } else {
        clearInterval(timer)
    }
})

hideSwitch.addEventListener('change', () => {
    if (hideSwitch.checked) {
        progressBar.hidden = true
    } else {
        progressBar.hidden = false      
    }
})