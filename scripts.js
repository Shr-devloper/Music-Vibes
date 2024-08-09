const songs = [
    {
        title: 'Chaleya',
        song: './songs/chaleya.mp3',
        img: './assets/images/img-1.jpg'
    },
    {
        title: 'jaan ban gaye',
        song: './songs/jaan ban gaye .mp3',
        img: './assets/images/img-2.jpg'
    },
    {
        title: 'khada hu aaj bhi wahi',
        song: './songs/khada hu aaj bhi wahi.mp3',
        img: './assets/images/img-6.jpg'
    },
    {
        title: 'maan meri jaan',
        song: './songs/maan meri jaan .mp3',
        img: './assets/images/img-12.jpg'
    },
    {
        title: 'aam chahe munde',
        song: './songs/aam chahe munde .mp3',
        img: './assets/images/img-3.jpg'
    },
    {
        title: 'pyaar hota hai kai baar',
        song: './songs/pyaar hota hai kai baar .mp3',
        img: './assets/images/img-11.jpg'
    },
    {
        title: 'rang lageya',
        song: './songs/rang lageya.mp3',
        img: './assets/images/img-9.jpg'
    },
    {
        title: 'saware',
        song: './song/saware.mp3',
        img: './assets/images/img-7.jpg'
    },
    {
        title: 'Show Me The Thumka',
        song: './song/Show Me The Thumka.mp3',
        img: './assets/images/img-5.jpg'    
    },
    {
        title: 'Summertime Sadness',
        song: './song/Summertime Sadness.mp3',
        img: './assets/images/img-4.jpg'
    },
    {
        title: 'Tere Pyar Mein',
        song: './song/Tere Pyar Mein.mp3',
        img: './assets/images/img-8.jpg'
    }
    // Add more songs as needed
];

let currentSongIndex = 0;

const parentUL = document.querySelector('.parentUL');
const nextButton = document.getElementById('nextbutton');
const prevButton = document.getElementById('prevbutton');
const audioPlayer = document.getElementById('audioPlayer');
const playButton = document.getElementById('playbutton');
const pauseButton = document.getElementById('pausebutton');
const playlistDiv = document.getElementById('songlist');

// Function to play the current song
function playSong(index) {
    if (index >= songs.length) {
        index = 0; // Loop back to the first song
    } else if (index < 0) {
        index = songs.length - 1; // Loop back to the last song
    }

    audioPlayer.src = songs[index].song; // Corrected src assignment
    audioPlayer.play();
    currentSongIndex = index; // Set currentSongIndex to the new index
}

// Event listener for when the song ends
audioPlayer.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

// Start playing the first song
playSong(currentSongIndex);

nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
});

prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + song.length) % songs.length; // Ensure non-negative index
    playSong(currentSongIndex);
});

playButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        playSong(currentSongIndex);
    }
});

pauseButton.addEventListener('click', () => {
    if (!audioPlayer.paused) {
        audioPlayer.pause();
    }
});

function createPlaylist() {
    songs.forEach((item, index) => {
        const mainParent = document.createElement('li');
        const child = document.createElement('ul');
        const LI = document.createElement('li');
        const IMG = document.createElement('img');
        // Remove audioFile creation if not required in the playlist
        // const audioFile = document.createElement('audio');

        audioPlayer.classList.add('audioPlayerset')
        parentUL.appendChild(mainParent);
        child.classList.add('childchange');
        mainParent.appendChild(child);

        IMG.src = item.img;
        IMG.alt = 'poster';
        IMG.classList.add('tasveer');
        child.appendChild(IMG);

        LI.innerText = item.title;
        child.appendChild(LI);

        mainParent.classList.add('song-item');
        mainParent.addEventListener('click', () => {
            playSong(index);
        });
    });
}

function setupCardClickEvents() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            playSong(index);
        });
    });
}

const seekbar = document.querySelector('.seekbar');
const circle = document.querySelector('.circle');
const currentTimeDisplay = document.querySelector('.current-time');
const durationDisplay = document.querySelector('.duration');

// Update seekbar and time display
function updateSeekbar() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    circle.style.left = `${progress}%`;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    durationDisplay.textContent = formatTime(audioPlayer.duration);
}

// Format time from seconds to MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Seek to a specific time
function seek(e) {
    const seekbarWidth = seekbar.clientWidth;
    const offsetX = e.offsetX;
    const newTime = (offsetX / seekbarWidth) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
}
seekbar.addEventListener('click', seek);

// Update the seekbar and time display periodically
audioPlayer.addEventListener('timeupdate', updateSeekbar);
audioPlayer.addEventListener('loadeddata', updateSeekbar);
// Initialize playlist and card click events


const cardElements = document.querySelectorAll('.card');
const popup = document.getElementById('popup');
const popupImage = document.getElementById('popupImage');
const popupTitle = document.getElementById('popupTitle');
const popupArtist = document.getElementById('popupArtist');
const popupAudio = document.getElementById('popupAudio');
const closePopupButton = document.getElementById('closePopup');

cardElements.forEach((card, index) => {
    card.addEventListener('click', () => {
        popupImage.src = songs[index].img;
        popupTitle.textContent = songs[index].title;
        popupArtist.textContent = songs[index].artist || 'Unknown Artist';  // Add artist info if available
        popupAudio.src = songs[index].song;
        popup.classList.remove('hidden');
        popupAudio.play();
    });
});

closePopupButton.addEventListener('click', () => {
    popup.classList.add('hidden');
    popupAudio.pause();
});

// document.addEventListener('DOMContentLoaded', () => {
//     const card = document.getElementById('card');
//     const audio = document.getElementById('audio');
//     let isFullscreen = false;

//     card.addEventListener('click', () => {
//         if (isFullscreen) {
//             // Exit fullscreen mode and stop audio
//             card.classList.remove('fullscreen');
//             audio.pause();
//             audio.currentTime = 0; // Reset audio to the start
//         } else {
//             // Enter fullscreen mode and play audio
//             card.classList.add('fullscreen');

//             // Stop any other audio that might be playing
//             const allAudioElements = document.querySelectorAll('audio');
//             allAudioElements.forEach(aud => {
//                 if (aud !== audio) {
//                     aud.pause();
//                     aud.currentTime = 0;
//                 }
//             });

//             audio.play();
//         }
//         isFullscreen = !isFullscreen;
//     });
// });




setupCardClickEvents();
// Initialize playlist
createPlaylist();

