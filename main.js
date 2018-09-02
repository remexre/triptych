// Call with the URL of the data file describing how to synchronize the media,
// and optionally an element to search for the triptych elements in.
//
// Returns a Promise that will synchronize the streams once it resolves, and
// that resolves to a function that will stop synchronization once called.
function triptychSync(dataURL, container) {
  if(!container)
    container = document;

  const video = container.querySelector("video.triptych-video");

  const reveal = container.querySelector("iframe.triptych-slides");
  const Reveal = reveal.contentWindow.Reveal;
  Reveal.configure({ controls: false, embedded: true });

  // TODO Asciinema
  //const asciinema = container.querySelector(".triptych-screencast");

  return fetch(dataURL).then(function(r) {
    return r.json();
  }).then(function triptychSyncLoop(data) {
    // TODO: Validate that data has the right shape.

    const intervalID = setInterval(function() {
      if(video.ended || video.paused)
        return;
      const time = video.currentTime;

      const slide = data.slides.keyframes.filter(function(kf) {
        return kf.t >= time;
      }).reduce(function(l, r) {
        if(l.t >= r.t)
          return l;
        else
          return r;
      }, { t: 0, s: 1 }).s;
      Reveal.slide(slide);

      // TODO Asciinema
    }, 250);

    return function triptychSyncEnd() { clearInterval(intervalID); };
  });
}
