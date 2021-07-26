const dataContainer = document.querySelector('#data')
const upload = document.querySelector('#fileInput')
const loadButton = document.querySelector('#load')
const clearButton = document.querySelector('#clear')

const photoContainer = document.querySelector('#photo')
const photo = document.querySelector('#photoInput')
const loadPhotoButton = document.querySelector('#loadPhoto')
const getPhoto = document.querySelector('#getPhoto')

let fileData
let photoData

const addMessage = (message, messageColor, el) => {
    const elem = document.createElement('p')
    elem.innerHTML = message
    elem.style.color = messageColor
    el.append(elem)
    setTimeout(() => {
        elem.remove()
    }, 3000)
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
                addMessage('Данные загружены', 'green', dataContainer)
            }
        } catch (e) {
            addMessage('Ошибка', 'red', dataContainer)
            console.error(e)
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
            addMessage('Данные очищены', 'green', dataContainer)
        }
    } catch (e) {
        addMessage('Ошибка', 'red', dataContainer)
        console.error(e)
    }
}

photo.onchange = () => {
    const preview = document.querySelector('img')
    const uploadFile = photo.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(uploadFile)

    reader.onloadend = function () {
        preview.src = reader.result
    }

    reader.onload = () => {
        photoData = reader.result
    }

    reader.onerror = () => {
        console.error('Error')
    }
}

loadPhotoButton.onclick = async () => {
    if (photoData) {
        let res
        try {
            res = await fetch('/users/set-photo/group1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { photo: photoData })
            })
            if (res.ok) {
                addMessage('Данные загружены', 'green', photoContainer)
            }
        } catch (e) {
            addMessage('Ошибка', 'red', photoContainer)
            console.error(e)
        }
    }
}

getPhoto.onclick = async () => {
    try {
        const res = await fetch('/users')
        const resJson = await res.json()
        const photo = await resJson[0].photo
        const img = new Image()
        img.src = photo
        img.width = 600
        img.height = 600
        document.body.appendChild(img)
    } catch (e) {
        console.error(e)
        addMessage('Ошибка', 'red', photoContainer)
    }
}
