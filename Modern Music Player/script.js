const songs = [
    { name: "Song 1", artist: "Artist 1", src: "music/song1.mp3", cover: "images/cover1.jpeg" },
    { name: "Song 2", artist: "Artist 2", src: "music/song2.mp3", cover: "images/cover2.jpeg" },
    { name: "Song 3", artist: "Artist 3", src: "music/song3.mp3", cover: "images/cover3.jpeg" },
    { name: "Song 4", artist: "Artist 4", src: "music/song4.mp3", cover: "images/cover4.jpeg" },
    { name: "Song 5", artist: "Artist 5", src: "music/song5.mp3", cover: "images/cover5.jpeg" }
];

const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");

const volume = document.getElementById("volume");
const muteBtn = document.getElementById("muteBtn");

const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");

const favoriteBtn = document.getElementById("favoriteBtn");
const playlist = document.getElementById("playlist");
const themeBtn = document.getElementById("themeBtn");

let currentSongIndex = 0;
let isShuffle = false;
let isRepeat = false;
let isPlaying = false;

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function loadSong(index) {
    currentSongIndex = index;

    const song = songs[index];

    title.textContent = song.name;
    artist.textContent = song.artist;
    audio.src = song.src;
    cover.src = song.cover;

    updateFavoriteButton();
    updatePlaylist();
}

function playSong() {
    audio.play().then(function () {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }).catch(function (error) {
        console.error("Audio playback error:", error);
    });
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

playBtn.addEventListener("click", function () {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener("click", function () {
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }

    loadSong(currentSongIndex);
    playSong();
});

function nextSong() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }
    }

    loadSong(currentSongIndex);
    playSong();
}

nextBtn.addEventListener("click", nextSong);

audio.addEventListener("ended", function () {
    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
});

audio.addEventListener("timeupdate", function () {
    if (audio.duration) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percentage + "%";
    }
});

progressBar.addEventListener("click", function (event) {
    if (audio.duration) {
        const width = progressBar.clientWidth;
        const clickX = event.offsetX;
        audio.currentTime = (clickX / width) * audio.duration;
    }
});

volume.addEventListener("input", function () {
    audio.volume = Number(volume.value);
    audio.muted = false;
});

muteBtn.addEventListener("click", function () {
    audio.muted = !audio.muted;
});

shuffleBtn.addEventListener("click", function () {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active", isShuffle);
});

repeatBtn.addEventListener("click", function () {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle("active", isRepeat);
});

function updateFavoriteButton() {
    if (favorites.includes(currentSongIndex)) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
        favoriteBtn.classList.add("active");
    } else {
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.classList.remove("active");
    }
}

favoriteBtn.addEventListener("click", function () {
    if (favorites.includes(currentSongIndex)) {
        favorites = favorites.filter(function (index) {
            return index !== currentSongIndex;
        });
    } else {
        favorites.push(currentSongIndex);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavoriteButton();
});

function updatePlaylist() {
    playlist.innerHTML = "";

    songs.forEach(function (song, index) {
        const item = document.createElement("div");

        item.className = "playlist-item";

        if (index === currentSongIndex) {
            item.classList.add("active");
        }

        item.innerHTML = "<div class='track-info'>" +
            "<strong>" + song.name + "</strong>" +
            "<span>" + song.artist + "</span>" +
            "</div>" +
            "<i class='fas fa-play'></i>";

        item.addEventListener("click", function () {
            loadSong(index);
            playSong();
        });

        playlist.appendChild(item);
    });
}

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");
});

// INITIAL SETUP
audio.volume = Number(volume.value);
loadSong(0);