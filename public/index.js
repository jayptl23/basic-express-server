const likeButtons = document.querySelectorAll('.fa-thumbs-up')
likeButtons.forEach(button => button.addEventListener('click', updateLikes))

const trashButtons = document.querySelectorAll('.fa-trash')
trashButtons.forEach(button => button.addEventListener('click', deletePokemon))

async function updateLikes(event) {
	const parent = event.target.parentElement
	const name = parent.textContent.split(' ')[0]

	try {
		const res = await fetch('incrementLikes', {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: name,
			}),
		})
		const data = await res.json()
		console.log(data)
		location.reload()
	} catch (error) {
		console.error(error)
	}
}

async function deletePokemon(event) {
	const parent = event.target.parentElement
	const name = parent.textContent.split(' ')[0]

	try {
		const res = await fetch('deletePokemon', {
			method: 'DELETE',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: name,
			}),
		})
		const data = await res.json()
		console.log(data)
		location.reload()
	} catch (error) {
		console.error(error)
	}
}
