function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

async function main() {
  const wrapper = document.querySelector('.wrapper');
  const photos = await fetchPhotos();
  photos.forEach(photo => {
    const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    // You can do something with each photo URL here, such as displaying them on a webpage
    const photoDiv = document.createElement('div');
    photoDiv.classList.add('photo');
    const img = document.createElement('img');
    img.src = photoUrl;
    photoDiv.appendChild(img);
    wrapper.appendChild(photoDiv);
  });
  addAnimation();
}

window.onload = function () {
  main();
}

function addAnimation() {
  let zIndex = 0;
  const mouse = document.querySelector('.author_mouse');
  const photos = document.querySelectorAll('.photo');
  photos.forEach((photo) => {
    const randomPos = {
      x: randomIntFromInterval(-500, 500),
      y: randomIntFromInterval(-450, 450),
      rotate: randomIntFromInterval(-10, 10),
    };

    photo.querySelector('img').addEventListener('load', () => {
      gsap.to(photo, {
        rotate: randomPos.rotate,
        duration: 1,
        delay: 1,
      });
      gsap.to(photo, {
        delay: 2,
        ...randomPos,
        duration: 1,
        ease: 'easeIn',
        onComplete: () => {
          photo.addEventListener('mouseover', () => {
            gsap.to(photo, {
              zIndex: 1,
              x: () => '+=' + randomIntFromInterval(-30, 30),
              y: () => '+=' + randomIntFromInterval(-30, 30),
              duration: 0.3,
            });
          });
          photo.addEventListener('mouseout', () => {
            gsap.to(photo, {
              zIndex: 0,
              duration: 0.5,
            });
          });
        }
      });
    });
  });
}


let mouseObserver;
mouseObserver = Observer.create({
  target: window,         // can be any element (selector text is fine)
  type: "pointer",
  onMove: (e) => {
    gsap.to('.author_mouse', {
      x: e.x,
      y: e.y,
    });
  }
});
