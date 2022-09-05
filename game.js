

const start = document.getElementById('start');
const boundary1pos = document.getElementById("boundary1").getBoundingClientRect();
const boundary2pos = document.getElementById("boundary2").getBoundingClientRect();
const boundary3pos = document.getElementById("boundary3").getBoundingClientRect();
const boundary4pos = document.getElementById("boundary4").getBoundingClientRect();
const boundary5pos = document.getElementById("boundary5").getBoundingClientRect();
const secTitle = document.getElementById("status");
const startinitpos = start.getBoundingClientRect();
const game = document.getElementById("game");
const endbox = document.getElementById("end").getBoundingClientRect();
const user = prompt("What is your Username?");
var timercheck = true;

let data = "Learning how to write in a file."

game.insertAdjacentHTML("afterend", '<div style="margin-top: 10px;"><center>Timer <span id="timer" class="timerbg">N/A</span></center></div>')

var timerbox = document.getElementById("timer")
var counter = 0;
const ldiv = document.getElementsByClassName("example")[0];

ldiv.innerHTML = '<div>Score<div id="score" class="boundary centeritems">0</div></div><div class="centerrestart"><button id="easy">Easy</button></div><div class="centerrestart"><button id="timertoggle">Timer ON</button></div><div class="centerrestart"><button id="hard">Hard</button></div><div>Level Difficulty<div id="level" class="boundary centeritems">N/A</div></div><br>'
ldiv.classList.add("results")
ldiv.classList.remove("boundary")
secTitle.innerHTML = "Begin by Selecting your level."

const hardbtn = document.getElementById("hard");
const easybtn = document.getElementById("easy");

document.getElementById("timertoggle").addEventListener('click', timerswitch);
hardbtn.addEventListener('click', hard);
easybtn.addEventListener('click', easy);



function timerswitch(){
    if (timercheck){
        timercheck = false;
        document.getElementById("timertoggle").innerText = "Timer OFF"
    }
    else{
        timercheck = true;
        document.getElementById("timertoggle").innerText = "Timer ON"
    }
}

function easy(){
    let gamestatus = false;
    if(timercheck){
        timerbox.innerText = "60";
    }
    hardbtn.removeEventListener('click', hard);
    easybtn.removeEventListener('click', easy);
    ldiv.innerHTML = '<div>Score<div id="score" class="boundary centeritems">0</div></div><div><center>User</center><div id="user" class="boundary centeritems">N/A</div></div><div class="centerrestart"><button id="restart">Restart</button></div><div>Level Difficulty<div id="level" class="boundary centeritems">N/A</div></div><br>'
    let userbox = document.getElementById("user");
    let restartbtn = document.getElementById("restart");
    let level = document.getElementById("level");
    let score = document.getElementById("score");
    score.innerHTML = "0";
    if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem(user)!= "[object HTMLDivElement]"){
            score.innerHTML = localStorage.getItem(user);
            counter = localStorage.getItem(user);
        }
        else {
            score.innerHTML = "0";
      }
    }
    if(!score.innerHTML){
        score.innerHTML = "0";
    }
    restartbtn.addEventListener('click', restart);
    userbox.innerHTML = user;
    level.innerText = "Easy";
    secTitle.innerText = 'Begin by moving your mouse over the "S"'

    function startgame(){
        start.addEventListener('mouseover', mousestart);
    };


    function mousestart(){
        start.removeEventListener('mouseover', mousestart);
        window.addEventListener('mousemove', mouseFollower);
        secTitle.innerText = "Don't hit the borders!";
        secTitle.style.color = "black";
        gamestatus = false;
        if(timercheck){
            timer()
        }
    }

    function mouseFollower(event){
        let startposy = event.pageY
        let startposx = event.clientX
        if (( startposy < boundary1pos.bottom && startposx < boundary1pos.right )
            || (startposy < boundary2pos.bottom)
            || (startposx > boundary3pos.left && startposy < boundary3pos.bottom)
            || (startposy > boundary4pos.top)
            || (startposx > boundary5pos.left && startposy > boundary5pos.top && startposx < boundary5pos.right)
            || (startposx < startinitpos.left - 20)){
            lost()
        }
        else if(startposx>=endbox.left){
            win()
        }
    }

    function retry(){
        localStorage.removeItem(user, score.innerText);
        score.innerText = counter;
        localStorage.setItem(user, counter);
        start.addEventListener(('mouseover'), function(){
            game.classList.remove("youlose");
        })
        start.addEventListener('click', mousestart);
    }

    function lost(){
        window.removeEventListener('mousemove', mouseFollower);
        counter -= 10;
        secTitle.innerText = "You Lost! Click on the S to try again";
        secTitle.style.color = "red";
        game.classList.add("youlose");
        gamestatus = true;
        retry();
    }

    function win(){
        window.removeEventListener('mousemove', mouseFollower);
        secTitle.innerText = "You Won! Click on the S to play again";
        secTitle.style.color = "green";
        counter += 5;
        gamestatus = true;
        retry();
    }

    function timer(){
        var setdate = new Date().getTime();
        var countDownDate = setdate + 61000
        var seconds = 60;
        var myfunc = setInterval(function() {
            var now = new Date().getTime();
            var timeleft = countDownDate - now;
            seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            timerbox.innerText = seconds;
            if(gamestatus){
                timerbox.innerText = "60";
                clearInterval(myfunc);
            }
            if (timeleft <= 0) {
                clearInterval(myfunc);
                lost()
            }
        }, 1000);
    }
     
    startgame();
};

function hard() {
    let gamestatus = false;
    if(timercheck){
        timerbox.innerText = "60";
    }
    hardbtn.removeEventListener('click', hard);
    easybtn.removeEventListener('click', easy);
    ldiv.innerHTML = '<div>Score<div id="score" class="boundary centeritems">0</div></div><div><center>User</center><div id="user" class="boundary centeritems">N/A</div></div><div class="centerrestart"><button id="restart">Restart</button></div><div>Level Difficulty<div id="level" class="boundary centeritems">N/A</div></div><br>'
    let userbox = document.getElementById("user");
    let restartbtn = document.getElementById("restart");
    let level = document.getElementById("level");
    let score = document.getElementById("score");
    score.innerHTML = "0";
    if (typeof(Storage) !== "undefined") {
        console.log(localStorage.getItem(user))
        if (localStorage.getItem(user)!= "[object HTMLDivElement]"){
            score.innerHTML = localStorage.getItem(user);
            counter = localStorage.getItem(user);
        }
        else {
            score.innerHTML = "0";
        }
    }
    if(!score.innerHTML){
        score.innerHTML = "0";
    }
    restartbtn.addEventListener('click', restart);
    userbox.innerHTML = user;
    level.innerText = "HARD";
    secTitle.innerText = 'Begin by click on the middle of the "S"';

    function startgame(){
        secTitle.innerText = "Don't hit the borders!";
        secTitle.style.color = "black";
        start.removeEventListener('click', startgame);
        game.classList.remove("youlose");
        start.addEventListener('mousemove', mouseFollower);
        gamestatus = false;
        if(timercheck){
            timer()
        }
    };

    function mouseFollower(e) {
        var startpos = start.getBoundingClientRect()
        if ((startpos.top < boundary1pos.bottom && startpos.left < boundary1pos.right )
            || (startpos.top < boundary2pos.bottom)
            || (startpos.right > boundary3pos.left && startpos.top < boundary3pos.bottom)
            || (startpos.bottom > boundary4pos.top)
            || (startpos.right > boundary5pos.left && startpos.bottom > boundary5pos.top && startpos.left < boundary5pos.right)){
            lost();
        }

        else if(startpos.right>=endbox.right){
        win()
        }
        else{
            let left = e.clientX;
            let top = e.clientY;
            start.style.left = left - 485 + 'px';
            start.style.top = top - 145 + 'px';
        }
    }

    function lost(){
        counter -= 10;
        secTitle.innerText = "You Lost! Click on the S to try again";
        secTitle.style.color = "red";
        start.removeEventListener('mousemove', mouseFollower);
        start.style.left = 0 + 'px';
        start.style.top = startinitpos.top - boundary1pos.top + 'px';
        game.classList.add("youlose");
        retry();
    }

    function retry(){
        gamestatus = true;
        localStorage.removeItem(user, score.innerText);
        score.innerText = counter;
        localStorage.setItem(user, counter);
        start.addEventListener(('mouseover'), function(){
            game.classList.remove("youlose");
        })
        start.addEventListener('click', startgame);
    }

    function win(){
        secTitle.innerText = "You Won! Click on the S to play again";
        secTitle.style.color = "green";
        counter += 5;
        start.style.left = 0 + 'px';
        start.style.top = startinitpos.top - boundary1pos.top + 'px';
        start.removeEventListener('mousemove', mouseFollower);
        retry()
    }

    function timer(){
        var setdate = new Date().getTime();
        var countDownDate = setdate + 61000
        var seconds = 60;
        var myfunc = setInterval(function() {
            var now = new Date().getTime();
            var timeleft = countDownDate - now;
            seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            timerbox.innerText = seconds;
            if(gamestatus){
                timerbox.innerText = "60";
                clearInterval(myfunc);
            }
            if (timeleft <= 0) {
                clearInterval(myfunc);
                lost()
            }
        }, 1000);
    }

    start.addEventListener('click', startgame);
};

function restart(){
    document.location.reload();
}

