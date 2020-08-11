// @ts-nocheck

// // const TOTAL = 350;
// let totalPopulation = 500;
// let activeBirds = [];
// let allBirds = [];
// // let birds = [];
// // let savedBirds = [];
// let pipes = [];
// let counter = 0;

// // Interface elements
// // let slider;
// let speedSlider, speedSpan, highScoreSpan, allTimeHighScoreSpan;

// let highScore = 0;

// let runBest = false;
// let runBestButton;

// let brainJSON;

// // function loadBird() {
// //     brainJSON = loadJSON('bestBird.json');
// // }

// function setup() {
//     let canvas = createCanvas(600, 400);
//     canvas.parent('canvascontainer');

//     speedSlider = select('#speedSlider');
//     speedSpan = select('#speed');
//     highScoreSpan = select('#hs');
//     allTimeHighScoreSpan = select('#ahs');
//     runBestButton = select('#best');
//     runBestButton.mousePressed(toggleState);

//     // slider = createSlider(1, 100, 1);
//     for (let i = 0; i < totalPopulation; i++) {
//         // birds[i] = new Bird();
//         let bird = new Bird();
//         activeBirds[i] = bird;
//         allBirds[i] = bird;
//     }
//     // pipes.push(new Pipe());
// }

// function toggleState() {
//     runBest = !runBest;
//     if (runBest) {
//         resetGame();
//         runBestButton.html('continue training');
//     } else {
//         nextGeneration();
//         runBestButton.html('run best');
//     }
// }

// function draw() {
//     background(0);
//     let cycles = speedSlider.value();
//     speedSpan.html(cycles);

//     for (let n = 0; n < cycles; n++) {
//         for (let i = pipes.length-1; i >= 0; i--) {
//             pipes[i].update();
//             // for (let j = birds.length-1; j >= 0; j--) {
//             //     if (pipes[i].hits(birds[j])) {
//             //         savedBirds.push(birds.splice(j, 1)[0]);
//             //     }
//             // }
//             if (pipes[i].offscreen()) {
//                 pipes.splice(i, 1);
//             }
//         }
//         if (runBest) {
//             bestBird.think(pipes);
//             bestBird.update();
//             for (let j = 0; j < pipes.length; j++) {
//                 if (pipes[j].hits(bestBird)) {
//                     resetGame();
//                     break;
//                 }
//             }
//             if (bestBird.offscreen()) {
//                 resetGame();
//             }
//         } else {
//             for (let i = activeBirds.length - 1; i >= 0; i--) {
//                 let bird = activeBirds[i];
//                 bird.think(pipes);
//                 bird.update();
//                 for (let j = 0; j < pipes.length; j++) {
//                     if (pipes[j].hits(activeBirds[i])) {
//                         activeBirds.splice(i, 1);
//                         break;
//                     }
//                 }
//                 if (bird.offscreen()) {
//                     activeBirds.splice(i, 1);
//                 }
//             }
//         }
//         // for (let i = birds.length-1; i >= 0; i--) {
//         //     if (birds[i].offscreen()) {
//         //         savedBirds.push(birds.splice(i, 1)[0]);
//         //     }
//         // }
//         // for (let bird of birds) {
//         //     bird.think(pipes);
//         //     bird.update();
//         // }
//         // if (birds.length === 0) {
//         //     counter = 0;
//         //     nextGeneration();
//         //     pipes = [];
//         //     pipes.push(new Pipe());
//         // }
//         if (counter % 75 === 0) {
//             pipes.push(new Pipe());
//         }
//         counter++;
//     }
//     let tempHighScore = 0;
//     if (!runBest) {
//         let tempBestBird = null;
//         for (let i = 0; i < activeBirds.length; i++) {
//             let s = activeBirds[i].score;
//             if (s > tempHighScore) {
//                 tempHighScore = s;
//                 tempBestBird = activeBirds[i];
//             }
//         }
//         if (tempHighScore > highScore) {
//             highScore = tempHighScore;
//             bestBird = tempBestBird;
//         }
//     } else {
//         tempHighScore = bestBird.score;
//         if (tempHighScore > highScore) {
//             highScore = tempHighScore;
//         }
//     }
//     // for (let bird of birds) {
//     //     bird.show();
//     // }
//     // for (let pipe of pipes) {
//     //     pipe.show();
//     // }

//     // Updating dom elements
//     highScoreSpan.html(tempHighScore);
//     allTimeHighScoreSpan.html(highScore);
//     for (let i = 0; i < pipes.length; i++) {
//         pipes[i].show();
//     }
//     if (runBest) {
//         bestBird.show();
//     } else {
//         for (let i = 0; i < activeBirds.length; i++) {
//             activeBirds[i].show();
//         }
//         if (activeBirds.length == 0) {
//             nextGeneration();
//         }
//     }
// }

// function keyPressed() {
//     // if (key == " ") {
//     //     bird.up();
//     // }
//     if (key === 'S') {
//         let bird = birds[0];
//         // let json = bird.brain.serialize();
//         save(bird.brain, 'bird.json');
//         console.log(json);    
//     }
// }


// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S18

// This flappy bird implementation is adapted from:
// https://youtu.be/cXgA1d_E-jY&

// How big is the population
let totalPopulation = 500;
// All active birds (not yet collided with pipe)
let activeBirds = [];
// All birds for any given population
let allBirds = [];
// Pipes
let pipes = [];
// A frame counter to determine when to add a pipe
let counter = 0;

// Interface elements
let speedSlider;
let speedSpan;
let highScoreSpan;
let allTimeHighScoreSpan;

// All time high score
let highScore = 0;

// Training or just showing the current best
let runBest = false;
let runBestButton;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('canvascontainer');

    // Access the interface elements
    speedSlider = select('#speedSlider');
    speedSpan = select('#speed');
    highScoreSpan = select('#hs');
    allTimeHighScoreSpan = select('#ahs');
    runBestButton = select('#best');
    runBestButton.mousePressed(toggleState);

    // Create a population
    for (let i = 0; i < totalPopulation; i++) {
        let bird = new Bird();
        activeBirds[i] = bird;
        allBirds[i] = bird;
    }
}

// Toggle the state of the simulation
function toggleState() {
    runBest = !runBest;
    // Show the best bird
    if (runBest) {
        resetGame();
        runBestButton.html('continue training');
        // Go train some more
    } else {
        nextGeneration();
        runBestButton.html('run best');
    }
}



function draw() {
    background(0);

    // Should we speed up cycles per frame
    let cycles = speedSlider.value();
    speedSpan.html(cycles);

    // How many times to advance the game
    for (let n = 0; n < cycles; n++) {
        // Show all the pipes
        for (let i = pipes.length - 1; i >= 0; i--) {
            pipes[i].update();
            if (pipes[i].offscreen()) {
                pipes.splice(i, 1);
            }
        }
        // Are we just running the best bird
        if (runBest) {
        bestBird.think(pipes);
        bestBird.update();
        for (let j = 0; j < pipes.length; j++) {
            // Start over, bird hit pipe
            if (pipes[j].hits(bestBird)) {
                resetGame();
                break;
            }
        }

        if (bestBird.bottomTop()) {
            resetGame();
        }
        // Or are we running all the active birds
        } else {
            for (let i = activeBirds.length - 1; i >= 0; i--) {
                let bird = activeBirds[i];
                // Bird uses its brain!
                bird.think(pipes);
                bird.update();

                // Check all the pipes
                for (let j = 0; j < pipes.length; j++) {
                    // It's hit a pipe
                    if (pipes[j].hits(activeBirds[i])) {
                        // Remove this bird
                        activeBirds.splice(i, 1);
                        break;
                    }
                }
                if (bird.bottomTop()) {
                    activeBirds.splice(i, 1);
                }
            }
        }

        // Add a new pipe every so often
        if (counter % 75 == 0) {
            pipes.push(new Pipe());
        }
        counter++;
    }

    // What is highest score of the current population
    let tempHighScore = 0;
    // If we're training
    if (!runBest) {
        // Which is the best bird?
        let tempBestBird = null;
        for (let i = 0; i < activeBirds.length; i++) {
            let s = activeBirds[i].score;
            if (s > tempHighScore) {
                tempHighScore = s;
                tempBestBird = activeBirds[i];
            }
        }

        // Is it the all time high scorer?
        if (tempHighScore > highScore) {
            highScore = tempHighScore;
            bestBird = tempBestBird;
        }
    } else {
        // Just one bird, the best one so far
        tempHighScore = bestBird.score;
        if (tempHighScore > highScore) {
            highScore = tempHighScore;
        }
    }

    // Update DOM Elements
    highScoreSpan.html(tempHighScore);
    allTimeHighScoreSpan.html(highScore);

    // Draw everything!
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].show();
    }

    if (runBest) {
        bestBird.show();
    } else {
        for (let i = 0; i < activeBirds.length; i++) {
            activeBirds[i].show();
        }
        // If we're out of birds go to the next generation
        if (activeBirds.length == 0) {
            nextGeneration();
        }
    }
}

function keyPressed() {
    if (key === 'S') {
        // let bird = birds[0];
        // // let json = bird.brain.serialize();
        // save(bird.brain, 'bird.json');
        // console.log(json);    
        console.log(bestBird.brain);
        localStorage.setItem('bestBird', JSON.stringify(bestBird.brain));
    }
}