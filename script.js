gsap.set("#pikaboo", {
    y: 30,
    transformOrigin: '50% 50%'
});
gsap.set("#eye1ball", {
    transformOrigin: '50% 50%'
});
gsap.set("#eye2ball", {
    transformOrigin: '50% 50%'
});

var pika = document.querySelector("#pikaboo");
var pikaBody = document.querySelector("#body");
var svg = document.querySelector("#svg");
var pos = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};
var mouse = {
    x: pos.x,
    y: pos.y
};
var bboxRect = svg.getBBox();
var svgWidth = bboxRect.width;
var svgHeight = bboxRect.height;
var speed = 0.01;
var xSet = gsap.quickSetter(pika, "x", "px");
var movingRight;
var angle1 = 0;
var angle2 = 0;
var eye1 = document.querySelector("#eye1ball");
var eye2 = document.querySelector("#eye2ball");

getAngle = (eye, e) => {
    let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
    let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
    angle = (Math.atan2(e.pageX - x, e.pageY - y) * (180 / Math.PI) * -1) + 45;
    return angle;
}

window.addEventListener("mousemove", tapOrMove, false);
window.addEventListener("touchend", tapOrMove, false);

function tapOrMove(e) {
    mouse.x = e.pageX;
    movingRight = e.pageX > (window.innerWidth / 2);
    angle1 = getAngle(eye1, e);
    angle2 = getAngle(eye2, e);
    return false;
}

// is Pikabook at the edges?
atEdge = () => {
    if (movingRight) {
        if (pika.getBoundingClientRect().right >= svg.getBoundingClientRect().right) {
            return true;
        }
    } else {

    }
    return false;
}

gsap.ticker.add(() => {
    // let's move Pikaboo!
    var dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
    pos.x += (mouse.x - pos.x) * dt;
    var svg = {
        x: pos.x / window.innerWidth * svgWidth * 2 - svgWidth,
    }
    if (!atEdge()) {
        xSet(svg.x);
    }

    // flip Pikaboo
    if (mouse.x < pos.x) {
        gsap.set("#pikaboo", {
            scaleX: -1
        });
    } else {
        gsap.set("#pikaboo", {
            scaleX: 1
        });
    }


    // rotate eyeballs  
    gsap.set("#eye1ball", {
        rotation: angle1
    });
    gsap.set("#eye2ball", {
        rotation: angle2
    });
});

const tl = gsap.timeline({
    defaults: {
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'Power1.easeInOut'
    }
});
tl.to('#pikabooMain', {
        yPercent: -30
    })
    .to('#pikabooShadow', {
        scale: 0.8,
        opacity: 0.05,
        xPercent: 5,
        transformOrigin: '50% 50%'
    }, "<")
    .to('#lamp-light', {
        duration: 0.8,
        opacity: 0.2,
        duration: 1,
        repeat: -1,
        repeatDelay: 8,
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp:  false})"
    }, '<');

// make Pikaboo shy
pikaBody.addEventListener('mouseenter', beingShy, false);
pikaBody.addEventListener('mouseleave', beingNormal, false);
var tl2 = gsap.timeline();

function beingShy(e) {
    if (tl2.reversed()) {
        tl2.play();
    }
    tl2.to("#arm-left", {
            duration: 0,
            opacity: 0
        })
        .to('#expression-regular', {
            duration: 0,
            opacity: 0
        })
        .to('#expression-afraid', {
            duration: 0,
            opacity: 1
        }, "<")
        .to('#arm-left-alt', {
            duration: 0.2,
            yPercent: -90
        }, "<")
        .to('#arm-right', {
            duration: 0.2,
            yPercent: -70,
            xPercent: 20,
            rotation: -30,
            transformOrigin: '25% 50%'
        }, "<")
        .to('#blush', {
            duration: 0.2,
            opacity: 0.4
        }, "<");
}

function beingNormal(e) {
    tl2.reverse();
}