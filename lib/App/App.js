'use strict';

// import dotenv from 'dotenv';
// import io from 'socket.io-client';

const modes = ['select', 'line', 'rectangle'];

const isValidMode = (string) => {
  let mode = null;
  modes.forEach(option => {
    if (option === string) mode = string;
  });
  return mode ? mode : new Error('App Error: invalid mode setting');
}

// App class to support socket connections and behaviors for the browser
class App {
  constructor(whiteboard) {
    if (!whiteboard) throw new Error('App Requires whiteboard object');
    this.currentMode = 'select'
    this.whiteboard = whiteboard;
    this.handleMousedown = null;
    this.handleMouseUp = null;
    this.handleMousemove = null;
    this.handleMouseout = null;
  }
  init() {
    window.addEventListener('resize', this.whiteboard.resizeCanvas);
    this.whiteboard.resizeCanvas();
  }
  connect() {}
  setMode(mode) {
    this.currentMode = isValidMode(mode);
  }
}