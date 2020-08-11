// @ts-nocheck

// let training_data = [
//     {
//         inputs: [0, 1],
//         target: [1]
//     },
//     {
//         inputs: [1, 0],
//         target: [1]
//     },
//     {
//         inputs: [0, 0],
//         target: [0]
//     },
//     {
//         inputs: [1, 1],
//         target: [0]
//     }
// ];

// function setup() {
//     // let a = new Matrix(2, 3);
//     // let b = new Matrix(3, 2);
//     // a.randomize();
//     // b.randomize();
//     // console.table(a.matrix);
//     // console.table(b.matrix);
//     // let c = a.multiply(b);
//     // console.table(c.matrix);

//     // let a = new Matrix(2, 2);
//     // a.randomize();
//     // a.print();
//     // function doubleIt(x) {
//     //     return x * 2;
//     // }
//     // a.map(doubleIt);
//     // a.print();

//     // let nn = new NeuralNetwork(2, 2, 2);
//     // let inputs = [1, 0];
//     // let targets = [1, 0];
//     // nn.train(inputs, targets);

//     let nn = new NeuralNetwork(2, 2, 1);
//     for (let i = 0; i < 50000; i++) {
//         let data = random(training_data);
//         nn.train(data.inputs, data.target);
//     }

//     console.log(nn.feedforward([0, 0]));
//     console.log(nn.feedforward([0, 1]));
//     console.log(nn.feedforward([1, 0]));
//     console.log(nn.feedforward([1, 1]));
// }

let nn, lr_slider;
let training_data = [
    {
        inputs: [0, 0],
        outputs: [0]
    },
    {
        inputs: [0, 1],
        outputs: [1]
    },
    {
        inputs: [1, 0],
        outputs: [1]
    },
    {
        inputs: [1, 1],
        outputs: [0]
    },
];

function setup() {
    createCanvas(400, 400);
    nn = new NeuralNetwork(2, 4, 1);
    lr_slider = createSlider(0.01, 0.5, 0.1, 0.01);
}

function draw() {
    background(0);
    for (let i = 0; i < 1000; i++) {
        let data = random(training_data);
        nn.train(data.inputs, data.outputs);    
    }
    nn.setLearningRate(lr_slider.value());
    let resolution = 10;
    let cols = width / resolution;
    let rows = height / resolution;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x1 = i / cols;
            let x2 = j / rows;
            let inputs = [x1, x2];
            let y = nn.predict(inputs);
            fill(y * 255);
            rect(i*resolution, j*resolution, resolution, resolution);
        }
    }
}