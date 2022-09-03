
const start = document.getElementById('start');
const boundary1pos = document.getElementById("boundary1").getBoundingClientRect();
const boundary2pos = document.getElementById("boundary2").getBoundingClientRect();
const boundary3pos = document.getElementById("boundary3").getBoundingClientRect();
const boundary4pos = document.getElementById("boundary4").getBoundingClientRect();
const boundary5pos = document.getElementById("boundary5").getBoundingClientRect();
const mainTitle = document.querySelector("h1");
const secTitle = document.getElementById("status");
const startinitpos = start.getBoundingClientRect();
const game = document.getElementById("game");
const endbox = document.getElementById("end").getBoundingClientRect();
const score = document.getElementById("score");
const level = document.getElementById("level");
const restartbtn = document.getElementById("restart");
const hardbtn = document.getElementById("hard");
const easybtn = document.getElementById("easy");
var counter = 0;

hardbtn.addEventListener('click', hard);
easybtn.addEventListener('click', easy);
restartbtn.addEventListener('click', restart);

function easy(){
    hardbtn.removeEventListener('click', hard);
    easybtn.removeEventListener('click', easy);
    hardbtn.addEventListener('click', function(){
        alert("Click on restart before changing the Level!")
    });
    easybtn.addEventListener('click', function(){
        alert("Click on restart before changing the Level!")
    });
    level.innerText = "Easy";

    function startgame(){
        start.addEventListener('mouseover', mousestart);
    };

    function mousestart(){
        start.removeEventListener('mouseover', mousestart);
        window.addEventListener('mousemove', mouseFollower);
    }

    function mouseFollower(event){
        secTitle.innerText = "Don't hit the borders!";
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
        score.innerText = counter;
        start.addEventListener(('mouseover'), function(){
            game.classList.remove("youlose");
        })
        start.addEventListener('click', mousestart);
    }

    function lost(){
        window.removeEventListener('mousemove', mouseFollower);
        counter -= 10;
        secTitle.innerText = "You Lost!";
        game.classList.add("youlose");
        retry();
    }

    function win(){
        window.removeEventListener('mousemove', mouseFollower);
        secTitle.innerText = "You Won!";
        counter += 5;
        retry();
    }
     
    startgame();
};

function hard() {
    hardbtn.removeEventListener('click', hard);
    easybtn.removeEventListener('click', easy);
    hardbtn.addEventListener('click', function(){
        alert("Click on restart before changing the Level!")
    });
    easybtn.addEventListener('click', function(){
        alert("Click on restart before changing the Level!")
    });
    level.innerText = "HARD";

    function startgame(){
        start.removeEventListener('click', startgame);
        game.classList.remove("youlose");
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
        start.style.top = startinitpos.top - boundary1pos.top + 'px';
        game.classList.add("youlose");
        retry();
    }

    function retry(){
        score.innerText = counter;
        start.addEventListener(('mouseover'), function(){
            game.classList.remove("youlose");
        })
        start.addEventListener('click', startgame);
    }

    function win(){
        secTitle.innerText = "You Won!";
        counter += 5;
        start.style.left = 0 + 'px';
        start.style.top = startinitpos.top - boundary1pos.top + 'px';
        start.removeEventListener('mousemove', mouseFollower);
        retry()
    }

    start.addEventListener('click', startgame);
};

function restart(){
    document.location.reload();
}