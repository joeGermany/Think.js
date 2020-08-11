// @ts-nocheck

class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
    
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }

    static fromArray(arr) {
        let m = new Matrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++) {
            m.data[i][0] = arr[i];
        }
        return m;
    }

    toArray() {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; i < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    } 
    
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; i < this.cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }

    add(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; i < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; i < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }

    static subtract(a, b) {
        // Return new matrix a-b
        let result = new Matrix(a.rows, a.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; i < result.cols; j++) {
                result.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return result;
    }

    static multiply(a, b) {
        //Matrix product
        if (a.cols !== b.rows) {
            console.log('Columns of A must match Rows of B');
            return undefined;
        }
        let result = new Matrix(a.rows, b.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                // Dot product of values in col
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.data[i][k] * b.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        return result;
    }

    multiply(n) {
        // if (n instanceof Matrix) {
        //     //Matrix product
        //     if (this.cols !== n.rows) {
        //         console.log('Columns of A must match Rows of B');
        //         return undefined;
        //     }
        //     let a = this;
        //     let b = n;
        //     let result = new Matrix(a.rows, b.cols);
        //     for (let i = 0; i < result.rows; i++) {
        //         for (let j = 0; j < result.cols; j++) {
        //             // Dot product of values in col
        //             let sum = 0;
        //             for (let k = 0; k < a.cols; k++) {
        //                 sum += a.data[i][k] * b.data[k][j];
        //             }
        //             result.data[i][j] = sum;
        //         }
        //     }
        //     return result;
        // } else {
        
        if (n instanceof Matrix) {
            //Matrix product / Hadamard Product 
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; i < this.cols; j++) {
                    this.data[i][j] *= n[i][j];
                }
            }
        } else {
            //Scalar product
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; i < this.cols; j++) {
                    this.data[i][j] *= n;
                }
            }
        }
    }

    // Often refered to as a lambda function
    map(func) {
        // Apply a function to every element of matrix
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; i < this.cols; j++) {
                let val = this.data[i][j];
                this.data[i][j] = func(val, i, j);
            }
        }
    }

    static map(matrix, func) {
        let result = new Matrix(matrix.rows, matrix.cols);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; i < matrix.cols; j++) {
                let val = matrix.data[i][j];
                result.data[i][j] = func(val, i, j);
            }
        }
        return result;
    }

    static transpose(matrix) {
        let result = new Matrix(matrix.cols, matrix.rows);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; i < matrix.cols; j++) {
                result.data[j][i] = matrix.data[i][j];
            }
        }
        return result;
    }

    print() {
        console.table(this.data);
    }
}