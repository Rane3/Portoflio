document.querySelectorAll('.video-container').forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.play-btn');
    const progress = container.querySelector('.progress');
    const fullscreen = container.querySelector('.fullscreen-btn');

    // Toggle blur on play/pause
    video.addEventListener('play', () => {
      video.classList.add('playing');
      playBtn.classList.add('hidden');
    });

    video.addEventListener('pause', () => {
      video.classList.remove('playing');
      playBtn.classList.remove('hidden');
    });

    // Play/pause video when play button is clicked
    playBtn.addEventListener('click', () => {
      togglePlayPause(video);
    });

    // Play/pause video when video is clicked (works in fullscreen too)
    video.addEventListener('click', (event) => {
      // Prevent duplicate firing of events in fullscreen
      event.preventDefault();
      togglePlayPause(video);
    });

    // Update progress bar as video plays
    video.addEventListener('timeupdate', () => {
      const percent = (video.currentTime / video.duration) * 100;
      progress.value = percent;
    });

    // Seek video when progress bar is changed
    progress.addEventListener('input', (e) => {
      const time = (e.target.value / 100) * video.duration;
      video.currentTime = time;
    });

    // Fullscreen functionality
    fullscreen.addEventListener('click', () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    });

    // Toggle play/pause function
    function togglePlayPause(video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  });