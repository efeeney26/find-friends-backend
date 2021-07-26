const loadButton = document.querySelector('#load')
const clearButton = document.querySelector('#clear')
const upload = document.querySelector('#fileInput')

let fileData

const addMessage = (message, messageColor) => {
    const elem = document.createElement('p')
    elem.innerHTML = message
    elem.style.color = messageColor
    document.body.appendChild(elem)
    setTimeout(() => {
        elem.remove()
    }, 2000)
}

upload.onchange = () => {
    const uploadFile = upload.files[0]
    const reader = new FileReader()
    reader.readAsText(uploadFile)

    reader.onload = () => {
        fileData = reader.result
    }

    reader.onerror = () => {
        console.error('Error')
    }
}

loadButton.onclick = async () => {
    if (fileData) {
        let res
        try {
            res = await fetch('/users/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: fileData
            })
            if (res.ok) {
                addMessage('Данные загружены', 'green')
            }
        } catch (e) {

        }
    }
}

clearButton.onclick = async () => {
    let res
    try {
        res = await fetch('/users/delete', {
            method: 'DELETE'
        })
        if (res.ok) {
            addMessage('Данные очищены', 'green')
        }
    } catch (e) {
        addMessage('Ошибка', 'red')
        console.error(e)
    }
}
