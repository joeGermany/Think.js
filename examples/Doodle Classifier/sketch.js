// @ts-nocheck

const len = 784;
const total_data = 1000;
const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;
let cats_data, trains_data, rainbows_data;
let cats = {},
    trains = {},
    rainbows = {};

let nn;

function preload() {
    cats_data = loadBytes('DoodleClassifierData/cats1000.bin');
    trains_data = loadBytes('DoodleClassifierData/trains1000.bin');
    rainbows_data = loadBytes('DoodleClassifierData/rainbows1000.bin');
}

function prepareData(category, data, label) {
    category.training = [];
    category.testing = [];
    for (let i = 0; i < total_data; i++) {
        let offset = i * len;
        let threshold = floor(0.8 * total_data);
        if (i < threshold) {
            category.training[i] = data.bytes.subarray(offset, offset + len);
            category.training.label = label;
        } else {
            category.testing[i - threshold] = data.bytes.subarray(offset, offset + len);
            category.testing.label = label;
        }
    }
}

function trainEpoch(training) {
    shuffle(training, true);
    // Train for one epoch
    for (let i = 0; i < training.length; i++) {
        let data = training[i];
        // let inputs = [];
        // for (let j = 0; j < len; j++) {
        //     inputs[j] = data[j] / 255.0;
        // }
        let inputs = Array.from(data).map(x => x / 255);
        // console.log(inputs);
        let label = training[i].label;
        let targets = [0, 0, 0];
        targets[label] = 1;
        nn.train(inputs, targets);
    }
}

function testAll(testing) {
    let correct = 0;
    for (let i = 0; i < testing.length; i++) {
        let data = testing[i];
        // let inputs = [];
        // for (let j = 0; j < len; j++) {
        //     inputs[j] = data[j] / 255.0;
        // }
        let inputs = Array.from(data).map(x => x / 255);
        let label = testing[i].label;
        let guess = nn.predict(inputs);
        let m = max(guess);
        let classification = guess.indexOf(m);
        if (classification === label) {
            correct++;
        }
    }
    let percent = 100 * correct / testing.length;
    return percent;
}

function setup() {
    createCanvas(280, 280);
    background(255);
    prepareData(cats, cats_data, CAT);
    prepareData(rainbows, rainbows_data, RAINBOW);
    prepareData(trains, trains_data, TRAIN);
    nn = new NeuralNetwork(784, 64, 3);
    let training = [];
    training = training.concat(cats.training);
    training = training.concat(rainbows.training);
    training = training.concat(trains.training);
    
    let testing = [];
    testing = testing.concat(cats.testing);
    testing = testing.concat(rainbows.testing);
    testing = testing.concat(trains.testing);

    let trainButton = select('#train');
    let epochCouter = 0;
    trainButton.mousePressed(function() {
        trainEpoch(training);
        epochCouter++;
        console.log('Epoch: ' + epochCouter);
    });
    let testButton = select('#test');
    testButton.mousePressed(function() {
        let percent = testAll(testing);
        console.log("Percent: " + nf(percent, 2, 2) + "%");
    });
    let guessButton = select('#guess');
    guessButton.mousePressed(function() {
        let inputs = [];
        let img = get();
        img.resize(28, 28);
        console.log(img);
        img.loadPixels();
        //We can skip every four values because they are the (r,g,b,a) of the image, but because the image is 
        // grascale, that means that the (r,g,b) are identical and (a) is always 255
        // for (let i = 0; i < img.pixels.length; i+=4) {
        //     let bright = img.pixels[i];
        // }

        for (let i = 0; i < len; i+=4) {
            let bright = img.pixels[i*4];
            inputs[i] = (255 - bright) / 255.0;
        }
        let guess = nn.predict(inputs);
        let m = max(guess);
        let classification = guess.indexOf(m);
        if (classification === CAT) {
            console.log('CAT');
        } else if (classification === RAINBOW) {
            console.log('RAINBOW');
        } else if (classification === TRAIN) {
            console.log('TRAIN');
        }

        // image(img, 0, 0);
    });

    let clearButton = select('#clear');
    clearButton.mousePressed(function() {
        background(255);
    });
    
    // for (let i = 1; i < 6; i++) {
    //     trainEpoch(training);
    //     console.log('Epoch: ' + i);
    //     let percent = testAll(testing);
    //     console.log(percent);
    // }

    // Visualize the data received
    // let total = 100;
    // for (let n = 0;  n < total; n++) {
    //     let img = createImage(28, 28);
    //     img.loadPixels();
    //     let offset = n * 784;
    //     //javascript stores rgba values for each byte in different indexes
    //     // For example:
    //     /**
    //      * [r1, g1, b1, a1, r2, g2, b2, a2, ...]
    //      */
    //     // That is why we multiply by 4!
    //     for (let i = 0; i < 784; i++) {
    //         let val = 255-cats.bytes[i + offset];
    //         img.pixels[i * 4 + 0] = val;
    //         img.pixels[i * 4 + 1] = val;
    //         img.pixels[i * 4 + 2] = val;
    //         img.pixels[i * 4 + 3] = 255;
    //     }
    //     img.updatePixels();
    //     let x = (n % 10) * 28;
    //     let y = floor(n/10) * 28;
    //     image(img, x, y);
    // }
}

function draw() {
    strokeWeight(8);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}