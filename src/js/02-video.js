import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
let parsedTime;
//console.log(player);

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate({ seconds }) {
  let timeValue = JSON.stringify(seconds);
  //console.log(timeValue);
  localStorage.setItem(STORAGE_KEY, timeValue);
}

savedPlayerValue();

function savedPlayerValue() {
  const savedValue = localStorage.getItem(STORAGE_KEY);
  if (savedValue) {
    return (parsedTime = JSON.parse(savedValue));
  }
  return (parsedTime = 0);
}

player.setCurrentTime(parsedTime);
