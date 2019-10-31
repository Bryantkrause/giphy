document.addEventListener('click', event => {
    if (event.target.className === 'person') {
      let person = event.target.dataset.person

      let url = `https://api.giphy.com/v1/gifs/search?q=${person}&api_key=UdqUUlM9Mn9gG96v2hsMUu0CEWY8ievj&limit=10`

      fetch(url)
        .then(r => r.json())
        .then(gifs => {
          console.log(gifs)
          document.getElementById('gifDisp').innerHTML = ''
          gifs.data.forEach(gif => {
            let gifElem = document.createElement('img')
            // currently displayed gif
            gifElem.src = gif.images.original_still.url
            // link to the still version
            gifElem.dataset.still = gif.images.original_still.url
            // link to the animated version
            gifElem.dataset.animated = gif.images.original.url
            // if the gif is animated
            gifElem.dataset.isanimated = false
            // set gif class
            gifElem.className = 'gif'

            document.getElementById('gifDisp').append(gifElem)
          })
        })
    } else if (event.target.className === 'gif') {
      if (event.target.isanimated === 'true') {
        event.target.src = event.target.dataset.still
        event.target.isanimated = 'false'
      } else {
        event.target.src = event.target.dataset.animated
        event.target.isanimated = 'true'
      }
    }
  })

  document.getElementById('addPerson').addEventListener('click', event => {
    event.preventDefault()
    let btnElem = document.createElement('button')
    btnElem.textContent = document.getElementById('newPerson').value
    btnElem.dataset.person = document.getElementById('newPerson').value
    btnElem.className = 'person'
    document.getElementById('buttons').append(btnElem)
    document.getElementById('newPerson').value = ''
  })


