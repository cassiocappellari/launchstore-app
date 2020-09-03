const formDelete = document.querySelector('#form-delete')

if(formDelete) {
    formDelete.addEventListener('submit', function(event){
        const deleteOption = confirm('Are you sure?')
        if(!deleteOption) {
            event.preventDefault()
        }
    })
}

const Mask = {
    apply(input, func) {
        setTimeout(function() {
            input.value = Mask[func](input.value)
        }, 1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g, "")

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100)
    }
}

const PhotosUpload = {
    uploadLimit: 6,
    handleFileInput(event) {
        const {files: fileList} = event.target
        const {uploadLimit} = PhotosUpload

        if (fileList.length > uploadLimit) {
            alert(`Send the maximum of ${uploadLimit} pictures`)
            event.preventDefault()
            return
        }

        Array.from(fileList).forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = document.createElement('div')
                div.classList.add('photo')
                div.onclick = () => alert('Remover Foto')
                div.appendChild(image)

                document.querySelector('#photos-preview').appendChild(div)
            }
            reader.readAsDataURL(file)
        })
    }
}