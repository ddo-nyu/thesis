function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const mouse = document.querySelector('.author_mouse');
const photos = document.querySelectorAll('.photo');
photos.forEach((photo) => {
  const randomPos = {
    x: randomIntFromInterval(-500, 500),
    y: randomIntFromInterval(-500, 500),
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
      ease: 'easeInOut',
      onComplete: () => {
        photo.addEventListener('mouseover', () => {
          gsap.to(photo, {
            scale: 2.5,
            x: 0,
            y: 0,
            rotate: 0,
            zIndex: 1000,
            duration: 0.3
          });

          mouse.innerText = `By ${photo.querySelector('.author').innerText}`;

          setTimeout(() => {
            gsap.to(photo, {
              scale: 1,
              zIndex: 0,
              duration: 0.3,
              ...randomPos,
            });
            mouse.innerText = '';
          }, 1000);
        });
      }
    });
  });
});

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
