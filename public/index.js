const button = document.querySelector('button')
const message = document.querySelector('.message')

async function handleButtonClick() {
	let res = await fetch('/hello', {method: 'GET'})
	let data = await res.json()
	message.textContent = data
}

button.addEventListener('click', handleButtonClick)
