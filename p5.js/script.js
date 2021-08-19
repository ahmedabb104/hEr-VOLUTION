window.addEventListener(
    'keydown',
    function(e) {
        if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
            e.preventDefault()
        }
    },
    false
)



let canvas = new p5(function(sketch) {

    const width = 600;
    const height = 400;
    let score = 0;
    let outputScore = document.getElementById("score");

    // Player Object
    const playerSize = 40
    let player = {
        x: (width-playerSize)/2,
        y: (height-playerSize)/2,
        speed: 5,

        goLeft: function() {
            if (0 < this.x) {
                this.x -= this.speed
            }
        },

        goRight: function() {
            if (width > (this.x + playerSize)) {
                this.x += this.speed
            }
        },

        goUp: function() {
            if (0 < this.y) {
                this.y -= this.speed
            }
        },

        goDown: function() {
            if (height > (this.y + playerSize)) {
                this.y += this.speed
            }
        },

        display: function() {
            sketch.fill(0,255,0)
            sketch.rect(this.x, this.y, playerSize)
        }
    }

    // Gold Piece Object
    const goldBoxSize = 20
    let goldBox = {
        x: sketch.random(0, width - goldBoxSize),
        y: sketch.random(0, height - goldBoxSize),

        checkCollision: function(player) {
            if (player.x > this.x + goldBoxSize) {
                return false
            } 
            if (player.x + playerSize < this.x) {
                return false
            }
            if (player.y > this.y + goldBoxSize) {
                return false
            }
            if (player.y + playerSize < this.y) {
                return false
            }

            return true
        },

        reposition: function() {
            this.x = sketch.random(0, width - goldBoxSize)
            this.y = sketch.random(0, height - goldBoxSize)
        },

        display: function() {
            sketch.fill(255, 255, 0);
            sketch.rect(this.x, this.y, goldBoxSize);
        }
    }


    sketch.setup = function() {
        sketch.createCanvas(width, height);
        sketch.frameRate(60)
    }

    sketch.draw = function() {
        sketch.background(255)

        if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
            player.goLeft()
        }
        if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
            player.goRight()
        }
        if (sketch.keyIsDown(sketch.UP_ARROW)) {
            player.goUp()
        }
        if (sketch.keyIsDown(sketch.DOWN_ARROW)) {
            player.goDown()
        }
        
        if (goldBox.checkCollision(player)) {
            goldBox.reposition();
            score++;
            outputScore.innerHTML = score;
        }

        player.display()
        goldBox.display()
    }
}, document.getElementById("canvas-container"))