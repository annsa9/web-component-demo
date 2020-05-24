// Component without Shadow DOM
class Square extends HTMLElement {
  // Specify observed attributes so that attributeChangedCallback will work
  // These values will be watched by attributeChangedCallback
  static get observedAttributes() {
    return ['c', 'l'];
  }

  constructor() {
    // Always call super first in constructor
    super();
  }

  updateStyle(elem) {
    this.querySelector('style').textContent = `
    .box-maker {
      margin-top: 20px;
      width: ${elem.getAttribute('l')}px;
      height: ${elem.getAttribute('l')}px;
      background-color: ${elem.getAttribute('c')};
    }
  `;
  }

  connectedCallback() {  // componentDidMount
    const div = document.createElement('div');
    const style = document.createElement('style');
    div.classList.add('box-maker');

    this.appendChild(style);
    this.appendChild(div);

    console.log('Custom square element added to page.');
    this.updateStyle(this);
  }

  disconnectedCallback() { //componentWillUnmount
    console.log('Custom square element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }

  attributeChangedCallback(name, oldValue, newValue) { // componentDidUpdate
    console.log('Custom square element attributes changed.', name, oldValue, newValue);
    if (oldValue) { // To avoid first time call till component is not mounted
      this.updateStyle(this);
    }
  }

}

customElements.define('CustomSquare', Square);

export default Square;