const start = document.getElementById('start');
const boundary1pos = document.getElementById("boundary1").getBoundingClientRect();
const boundary2pos = document.getElementById("boundary2").getBoundingClientRect();
const boundary3pos = document.getElementById("boundary3").getBoundingClientRect();
const boundary4pos = document.getElementById("boundary4").getBoundingClientRect();
const boundary5pos = document.getElementById("boundary5").getBoundingClientRect();
const mainTitle = document.querySelector("h1");
const secTitle = document.getElementById("status");
const startinitpostop = start.getBoundingClientRect().top;
const game = document.getElementById("game");
const endbox = document.getElementById("end").getBoundingClientRect();
const score = document.getElementById("score");
const level = document.getElementById("level");
const restartbtn = document.getElementById("restart");
var counter = 0;

hard()
function hard() {
    level.innerText = "HARD";
    restartbtn.addEventListener('click', restart);

    function starttask(){
        game.classList.remove("youlose");
        startTime = performance.now();
        console.log(startTime)
        start.addEventListener('mousemove', mouseFollower);
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
        secTitle.innerText = "You Lost!";
        start.removeEventListener('mousemove', mouseFollower);
        start.style.left = 0 + 'px';
        start.style.top = startinitpostop - boundary1pos.top + 'px';
        game.classList.add("youlose");
        retry();
    }

    function retry(){
        score.innerText = counter;
        start.addEventListener(('mouseover'), function(){
            game.classList.remove("youlose");
        })
        start.addEventListener('click', starttask);
    }

    function win(){
    secTitle.innerText = "You Won!";
      counter += 5;
      start.style.left = 0 + 'px';
      start.style.top = startinitpostop - boundary1pos.top + 'px';
      start.removeEventListener('mousemove', mouseFollower);
      retry()
    }

    function restart(){
        start.style.left = 0 + 'px';
        start.style.top = startinitpostop - boundary1pos.top + 'px';
        counter = 0
        score.innerText = 0;
        starttask()
    }

    starttask()
};
