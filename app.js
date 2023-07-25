const originalItems = document.querySelectorAll('.item.original');


let draggedElement = null;

originalItems.forEach(item => {

    item.onmousedown = (e) => {
        draggedElement = item.cloneNode(true);
        rect = item.getBoundingClientRect()
        draggedElement.style.position = 'absolute';
        draggedElement.style.top = rect.top + 'px';
        draggedElement.style.left = rect.left + 'px';
        draggedElement.classList.remove('original')
        document.body.append(draggedElement)
        draggedElement.onmousedown = itemMouseDownHandler
        draggedElement.oncontextmenu = rightClickHandler
    }

});

function itemMouseDownHandler(e) {
    draggedElement = this;
    rect = draggedElement.getBoundingClientRect()
    draggedElement.style.top = rect.top + 'px';
    draggedElement.style.left = rect.left + 'px';
}

function rightClickHandler(e) {
    e.preventDefault()
    this.remove()
    draggedElement = null;
}



document.onmousemove = (e) => {
    if (draggedElement) {
        rect = draggedElement.getBoundingClientRect()
        draggedElement.style.top = e.clientY - rect.height/2 + 'px';
        draggedElement.style.left = e.clientX - rect.width/2 + 'px';
    }
}

document.onmouseup = (e) => {
    draggedElement = null;
}



// const iphoneEl = document.querySelector('.iphone');

// iphoneEl.onclick = () => console.log('clicekd 1')
// iphoneEl.onclick = () => console.log('clicekd 2')

// iphoneEl.addEventListener('click', () => console.log('clicked 1'))
// iphoneEl.addEventListener('click', () => console.log('clicked 2'))


const modelNameEl = document.querySelector('.model-name');
const modelNameInput = document.querySelector('#model-name-input');
const iphone = document.querySelector('.iphone')

modelNameInput.addEventListener('input', (e) => {
    modelNameEl.textContent = e.target.value;
})



const colorClassEq = {
    '1': 'black-gradient',
    '2': 'gold-gradient',
    '3': 'white-gradient',
    '4': 'dark-blue-gradient',
}

const colorsSelectEl = document.querySelector('#colors');
let currentColorClass = 'black-gradient'
colorsSelectEl.onchange = (e) => {
    const value = e.target.value;
    const newColorClass = colorClassEq[value];
    iphone.classList.remove(currentColorClass)
    iphone.classList.add(newColorClass)
    currentColorClass = newColorClass
}

const edgeCheckbox = document.querySelector('#edge-checkbox');

edgeCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        iphone.classList.add('edge');
    } else {
        iphone.classList.remove('edge');
    }
})


const sizeScale = {big: 2, medium: 1.5, small: 1}
document.querySelectorAll('input[name="logo-size"]').forEach(el => {
    el.onclick = (e) => {
        const value = e.target.value;
        const scale = sizeScale[value];
        const scaleStyle = `scale(${scale})` //
        document.querySelectorAll('.logo').forEach(logoEl => {
            logoEl.style.transform = scaleStyle;
        })
    }
})