'use strict';

function MyArray() {
    if (!new.target) {
        return new MyArray();
    }
    this.length = 0;
    this.isMyArray = function isMyArray() {
        return (this instanceof MyArray);
    }
}

const myArrProto = new MyArray();
MyArray.prototype = myArrProto;

myArrProto.push = function push() {
    for (let i = 0; i < arguments.length; i++) {
        this[this.length++] = arguments[i];
    }
    return this.length;
};

myArrProto.find = function find(callback) {
    let element;
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            element = this[i];
            break;
        }
    }
    return element;
};

myArrProto.includes = function includes(valueToFind, fromIndex = 0) {
    if (fromIndex < 0) {
        fromIndex = this.length + fromIndex;
    }
    for (let i = fromIndex; i < this.length; i++) {
        if (this[i] === valueToFind) {
            return true;
        }
    }
    return false;
}

myArrProto.join = function join(separator=',') {
    let string = '';
    for (let i = 0; i < this.length - 1; i++) {
        string = string + String(this[i]) + separator;
    }
    string = string + String(this[this.length - 1]);
    return string;
}