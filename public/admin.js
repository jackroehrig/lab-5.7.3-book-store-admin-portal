async function createAdmin(){
    let response = await fetch('http://localhost:3001/listBooks');
    let books = await response.json()
    let ul = document.createElement('ul')
    document.getElementById('root').append(ul)
    books.forEach(book => {
        let li = document.createElement('li')
        li.textContent = book.title;

        let input = document.createElement('input')
        input.type = 'number'
        input.value = book.quantity

        let submit = document.createElement('button')
        submit.classList.add('btn-primary')
        submit.innerHTML = 'Save'
        submit.addEventListener('click', async () => {
            await fetch('http://localhost:3001/updateBook', {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'id': book.id,
                    'quantity': input.value
                })
            })
            book.quantity = input.value
        })

        let deleteBtn = document.createElement('button')
        deleteBtn.classList.add('btn-danger')
        deleteBtn.innerHTML = 'Delete'
        deleteBtn.addEventListener('click', async () => {
            await fetch(`http://localhost:3001/removeBook/${book.id}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'}
            })
            li.remove()
        })

        li.append(input)
        li.append(submit)
        li.append(deleteBtn)
        ul.append(li)
    })
}

createAdmin()
