// імпортуємо плеєр та пакет тротл бібліотеки лодаш
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// створюємо посилання, копію об'єкта плеєр, статичну змінну для ключа в LocalStorage
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
//console.log(player);

// додаємо слухача подій з відстеженням в 1 секунду
player.on('timeupdate', throttle(onPlayerTimeUpdate, 1000));

// колбек LocalStorage, що робить запис поточних параметрів об'єкта timeupdate
function onPlayerTimeUpdate({ duration, percent, seconds }) {
  // data is an object containing properties specific to that event
  const playerValue = {
    duration,
    percent,
    seconds,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(playerValue));
}

savedPlayerValue();
//перевіряємо чи є дані в LocalStorage
function savedPlayerValue() {
  const savedKeyPlayer = localStorage.getItem(STORAGE_KEY);

  if (savedKeyPlayer) {
    player.setCurrentTime(JSON.parse(savedKeyPlayer));
  }
}
