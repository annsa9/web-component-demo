// Component with Shadow DOM 
import './sqaure.js';

class App extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' }); // open - shadowRoot accessible, closed - No access
    const div = document.createElement('div');
    div.innerHTML = `
    <h1>Simple Web Component</h1>
    <div>
      <button class="add">Add Square</button>
      <button class="update">Update Square</button>
      <button class="remove">Remove Square</button>
    </div>
    `;
    const style = document.createElement('style');
    style.textContent = `
        custom-square {
          margin: 20px;
        }
      `;

    shadowRoot.appendChild(div);
    shadowRoot.appendChild(style);

    this.addEventListeners();
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  addEventListeners = () => {
    const add = document.querySelector('my-app').shadowRoot.querySelector('.add');
    const update = document.querySelector('my-app').shadowRoot.querySelector('.update');
    const remove = document.querySelector('my-app').shadowRoot.querySelector('.remove');
    let square;

    update.disabled = true;
    remove.disabled = true;

    add.onclick = function () {
      // Create a custom square element
      square = document.createElement('custom-square');
      square.setAttribute('l', '100');
      square.setAttribute('c', 'red');
      document.body.appendChild(square);

      update.disabled = false;
      remove.disabled = false;
      add.disabled = true;
    };

    update.onclick = () => {
      // Randomly update square's attributes
      square.setAttribute('l', this.random(50, 200));
      square.setAttribute('c', `rgb(${this.random(0, 255)}, ${this.random(0, 255)}, ${this.random(0, 255)})`);
    };

    remove.onclick = function () {
      // Remove the square
      document.body.removeChild(square);

      update.disabled = true;
      remove.disabled = true;
      add.disabled = false;
    };
  }
}

customElements.define('my-app', App);