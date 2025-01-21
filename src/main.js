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

animateSwitch.addEventListener('change', () => {
    progressBar.toggleAttribute('active')
})

hideSwitch.addEventListener('change', () => {
    progressBar.toggleAttribute('hidden')
})