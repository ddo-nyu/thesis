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
    });
    gsap.to(photo, {
      delay: 1,
      ...randomPos,
      duration: 1,
      ease: 'easeInOut'
    });
  })

  photo.addEventListener('mouseover', () => {
    gsap.to(photo, {
      scale: 2,
      x: -100,
      y: 0,
      rotate: 0,
      zIndex: 1000,
    });

    mouse.innerText = photo.querySelector('.author').innerText;
  });
  photo.addEventListener('mouseout', () => {
    gsap.to(photo, {
      scale: 1,
      zIndex: 0,
      ...randomPos,
    });
    mouse.innerText = '';
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
    })
  }
});
