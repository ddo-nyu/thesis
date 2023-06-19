async function frame() {
    const wrapper = document.querySelector('.wrapper');
    const photos = await fetchPhotos();
    photos.forEach((photo, i) => {
        const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        // You can do something with each photo URL here, such as displaying them on a webpage
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');
        const img = document.createElement('img');
        img.src = photoUrl;
        photoDiv.appendChild(img);
        if (i === 0) {
            photoDiv.classList.add('active');
        }
        wrapper.appendChild(photoDiv);
    });
    setInterval(() => {
        const active = document.querySelector('.active');
        active.classList.remove('active');
        if (active.nextElementSibling) {
            active.nextElementSibling.classList.add('active');
        } else {
            wrapper.firstElementChild.classList.add('active');
        }
    }, 5000);
}

function openFullscreen() {
    const elem = window;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

window.onload = function() {
    frame();
    window.addEventListener('dblclick', () => openFullscreen());
}