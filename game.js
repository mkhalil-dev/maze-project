var start = document.getElementById('start');

const boundary1pos = document.getElementById("boundary1").getBoundingClientRect()
const boundary2pos = document.getElementById("boundary2").getBoundingClientRect()
const boundary3pos = document.getElementById("boundary3").getBoundingClientRect()
const boundary4pos = document.getElementById("boundary4").getBoundingClientRect()
const boundary5pos = document.getElementById("boundary5").getBoundingClientRect()

startinitpostop = start.getBoundingClientRect().top

    start.addEventListener('mousemove', e => {
        mouseFollower(e)
});

console.log(boundary1.getBoundingClientRect().bottom)
console.log(start.getBoundingClientRect().top)

function mouseFollower(e) {
    var startpos = start.getBoundingClientRect()
    if ((startpos.top < boundary1pos.bottom && startpos.left < boundary1pos.right )
        || (startpos.top < boundary2pos.bottom)
        || (startpos.right > boundary3pos.left && startpos.top < boundary3pos.bottom)
        || (startpos.bottom > boundary4pos.top)
        || (startpos.right > boundary5pos.left && startpos.bottom > boundary5pos.top && startpos.left < boundary5pos.right)){
        console.log("You Lost")
        document.removeEventListener('mousemove', lost());
        start.style.left = 0 + 'px'
        start.style.top = startinitpostop - boundary1pos.top + 'px'
    }
    else{
        let left = e.clientX;
        let top = e.clientY;
        console.log(e.clientY)
        start.style.left = left - 485 + 'px';
        start.style.top = top - 145 + 'px';
    }
}

function lost(){
    alert("Lost!")
}

function won(){

}