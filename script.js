const word = document.getElementById('word');
const text = document.getElementById('text');
const settingsForm = document.getElementById('settings-form');
const selectDifficulty = document.getElementById('difficulty');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const endGame = document.getElementById('end-game-container');
const settings = document.getElementById('settings');

const words = [
  'admit','academic','access','acid','abandoned','airplane','angular',
  'builds','bunch','butter','buzz','bad','ball',
  'cadillac','calculated','cameroon','capture','conventional',
  'destination','detection','dialog','disclosure','drag','dependent','delhi',
  'ecommerce','eight','english','entrepreneur','essay','europe',
  'fabric','favorite','fellowship','flickr','folder','freeware','feeble',
  'gauge','gazette','geographic','glossary','guatemala',
  'hammer','hawaiian','highlights','hydrogen','hurricane','highfalutin',
  'illinois','impossible','independence','indie','issues',
  'javascript','justify','journal','joining','judgment','juice','jaipur',
  'karma','kernel','kilometers','kitty','keyboard','kanpur',
  'lafayette','labels','legend','liability','losses','loving',
  'madagascar','mainstream','memorabilia','messages','miscellaneous','mumbai',
  'navigation','necessary','neutral','newsletter','numerous','north','node',
  'occasions','officially','offset','omissions','orchestra',
  'pages','parameter','participants','permission','podcast','patna','pies',
  'qualification','queue','quizzes','quotes','quick',
  'roulette','raleigh','reader','realm','recognition','recommendation','referral','rocks','react','redux',
  'satellite','scanner','scholarship','screenshot','seems','stack','simplified','soccer','sophisticated','steer','silver','superficial','sigh',
  'taught','technology','tense','terrain','titles','transparency','typically',
  'ultimately','undefined','usually','unwrap','university','unity',
  'venue','verify','version','viewed','volleyball',
  'waiver','walked','warranty','website','workplace','warlike',
  'yarn','yugoslavia','yeah','yearly','yard',
  'zero','zone','zoom','zimbabwe',
];

let randomeWord;
let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

selectDifficulty.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  time--;
  timeElement.innerHTML = time + 's';
  if (time === 0) {
    clearInterval(timeInterval)
    gameOver();
  }
}

function gameOver() {
  endGame.innerHTML = `
    <h1>Time Over!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()" style="width: 120px; border-radius: 5px; height: 50px; font-weight: bolder;">Reload</button>
  `
  endGame.style.display = 'flex';
}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function addWordToDom() {
  randomeWord = getRandomWord();
  word.innerHTML = randomeWord;
}

function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

addWordToDom();

text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if(insertedText === randomeWord) {
    addWordToDom();
    updateScore();

    e.target.value = '';

    if(difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else if (difficulty === 'easy') {
      time += 4;
    } else {
      time += 5;
    }
    updateTime();
  }
})

settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
})