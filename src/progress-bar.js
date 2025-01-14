class ProgressBar extends HTMLElement {
    constructor() {
        super()
    }

    static get observedAttributes() {
        return ['min','max','color'];
    }

    attributeChangedCallback() {

    }
}

customElements.define('progress-bar', ProgressBar)