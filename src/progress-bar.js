class ProgressBar extends HTMLElement {
    constructor() {
        super()

        this.timer
        this.deg = 0

        const shadow = this.attachShadow({mode: 'open'})
        const diagram = document.createElement('div')

        diagram.className = 'progressbar'
        diagram.innerHTML = `
            <div class="piece left"></div>
            <div class="piece right"></div>`

        shadow.appendChild(diagram)

        const styleTag = document.createElement('style')
        styleTag.innerHTML = `
            .progressbar {
                width: ${this.getAttribute('size') || '150px'};
                height: ${this.getAttribute('size') || '150px'};
                border-radius: 50%;
                background-color: ${this.getAttribute('bgcolor') || '#005dff'};
                position: relative;
                overflow: hidden;
            }

            .progressbar::before {
                content: '';
                display: block;
                position: absolute;
                top: 10px;
                right: 10px;
                bottom: 10px;
                left: 10px;
                border-radius: 50%;
                background-color: white;
                z-index: 3;
            }

            .progressbar .piece {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                right: 0;
                overflow: hidden;
            }

            .progressbar .piece::before {
                content: '';
                display: block;
                position: absolute;
                width: 50%;
                height: 100%;
            }

            .progressbar .piece.left {
                transform: rotate(0deg);
                border-radius: 50%;
                z-index: 2;
            }

            .progressbar .left::before {
                background-color: #ccc;
            }

            .progressbar .piece.right {
                transform: rotate(180deg);
                border-radius: 50%;
            }

            .progressbar .right::before {
                background-color: #ccc;
            }

            .progressbar.over_50 .piece.left {
                transform: rotate(180deg);
            }

            .progressbar.over_50 .piece.right {
                transform: rotate(360deg);
            }

            .progressbar.over_50 .piece.left::before {
                background-color: ${this.getAttribute('bgcolor') || '#005dff'};
            }
        `
        shadow.appendChild(styleTag)
    }

    setProgressByAttribute() {
        const progressElements = this.shadowRoot.querySelectorAll('.progressbar')
        progressElements.forEach(elem => {
            const value = this.getAttribute('value')
            if(value >= 50){
                elem.classList.add('over_50')
            }else{
                elem.classList.remove('over_50')
            }
            const deg = (360 * value / 100) + 180
            elem.querySelector('.piece.right').style.transform = `rotate(${deg}deg)`
        })
    }

    setActivity(value) {
        let max = 360
        if (value != null) {
            this.timer = setInterval(() => {
                this.style.transform = `rotate(${this.deg++}deg)`
                if (this.deg >= max) this.deg = 0
            }, 5)
        } else {
            clearInterval(this.timer)
        }
    }

    static get observedAttributes() {
        return ['value', 'active'];
    }

    attributeChangedCallback(name, oldval, newval) {
        switch(name) {
            case 'value':
                if (newval > 100) this.setAttribute('value', 100)
                this.setProgressByAttribute()
                break
            case 'active':
                this.setActivity(newval)
                break
            default: console.log('error')
        }
    }
}

customElements.define('progress-bar', ProgressBar)