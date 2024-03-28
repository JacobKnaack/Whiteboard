'use strict';

class Whiteboard {
  constructor(canvasEl) {
    this.canvasEl = canvasEl;
    this.context = canvasEl.getContext('2d');
    this.isDrawing = false;
    this.mouseX = null;
    this.mouseY = null;
    this.storedContent = null;
  }

  /**
   * **********************************************************
   * These Drawing Functions have been created using ChatGPT 3.5
   * **********************************************************
   * 
   * First sections are for drawing simple lines.
   */
  drawLine = (e) => {
    if (!this.isDrawing) return 0;
    let mouseX2 = e.pageX - this.canvasEl.offsetLeft;
    let mouseY2 = e.pageY - this.canvasEl.offsetTop;

    // Draw line
    this.context.beginPath();
    this.context.moveTo(this.mouseX, this.mouseY);
    this.context.lineTo(mouseX2, mouseY2);
    this.context.stroke();

    this.mouseX = mouseX2;
    this.mouseY = mouseY2;
  }
  getRectValues = (e) => {
    if (!this.isDrawing) return 0;
    let x = e.clientX - this.canvasEl.offsetLeft; // Get the current x-coordinate of the mouse pointer
    let y = e.clientY - this.canvasEl.offsetTop; // Get the current y-coordinate of the mouse pointer
    let width = this.mouseX - x;
    let height = this.mouseY - y;
    return {x, y, width, height};
  }
  drawSquare = (x, y, width, height) => {
    if (this.isDrawing) {
      this.context.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
    }

    // Draw the rectangle outline
    this.context.strokeRect(x, y, width, height);
  }
  startDrawing = (e) => {
    this.isDrawing = true;
    this.mouseX = e.pageX - this.canvasEl.offsetLeft;
    this.mouseY = e.pageY - this.canvasEl.offsetTop;
  }
  stopDrawing = () => {
    this.isDrawing = false;
  }
  resizeCanvas = () => {
    this.storeContent();
    this.canvasEl.width = window.innerWidth;
    this.canvasEl.height = window.innerHeight;
    this.drawCanvas();
    this.loadContent();
  }
  drawCanvas() {
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }
  storeContent() {
    this.storedContent = this.context.getImageData(0, 0, this.canvasEl.width, this.canvasEl.height);
  }
  loadContent() {
    if (this.storedContent !== null) {
      this.context.putImageData(this.storedContent, 0, 0);
    }
  }
}