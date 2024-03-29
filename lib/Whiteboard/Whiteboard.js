'use strict';

class Whiteboard {
  constructor(canvasEl) {
    this.canvas = canvasEl;
    this.context = canvasEl.getContext('2d', { willReadFrequently: true });
    this.isDrawing = false;
    this.mouseX = null;
    this.mouseY = null;
    this.storedContent = null;
    this.selection = null;
    this.shapes = new Map();
  }

  // adds shape data to the shapes Map
  addShape(type, data) {
    let shapes = this.shapes.get(type);
    if (shapes) {
      shapes.push(data);
    } else {
      shapes = [];
      shapes.push(data);
      this.shapes.set(type, shapes);
    }
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
    let mouseX2 = e.pageX - this.canvas.offsetLeft;
    let mouseY2 = e.pageY - this.canvas.offsetTop;

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
    let x = e.clientX - this.canvas.offsetLeft; // Get the current x-coordinate of the mouse pointer
    let y = e.clientY - this.canvas.offsetTop; // Get the current y-coordinate of the mouse pointer
    let width = this.mouseX - x;
    let height = this.mouseY - y;
    return {x, y, width, height};
  }
  drawRect = (x, y, width, height) => {
    if (this.isDrawing) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.context.strokeRect(x, y, width, height);
  }
  drawShapes = () => {
    let shapeData = this.shapes.entries();
    for (let data of shapeData) {
      let type = data[0];
      if (type === 'rectangle') {
        let rectangles = data[1];
        rectangles.forEach(({x,y,width,height}) => {
          this.context.strokeRect(x,y,width,height);
        });
      }
    }
  }
  startDrawing = (e) => {
    this.isDrawing = true;
    this.mouseX = e.pageX - this.canvas.offsetLeft;
    this.mouseY = e.pageY - this.canvas.offsetTop;
  }
  stopDrawing = () => {
    this.isDrawing = false;
  }
  selectShape = (e) => {
    let mouseX = e.clientX - this.canvas.offsetLeft;
    let mouseY = e.clientY - this.canvas.offsetTop;
    // Check if any rectangle is clicked
    let shapes = this.shapes.get('rectangle');
    for (let i = shapes.length - 1; i >= 0; i--) {
      let shape = shapes[i];
      if (mouseX >= shape.x && mouseX <= shape.x + shape.width &&
        mouseY >= shape.y && mouseY <= shape.y + shape.height) {
        this.selection = shape;
        // Calculate offset for smooth dragging
        this.selection.offsetX = mouseX - shape.x;
        this.selection.offsetY = mouseY - shape.y;
        break;
      }
    }
  }
  moveSelection = (e) => {
    if (this.selection) {
      var mouseX = e.clientX - canvas.offsetLeft;
      var mouseY = e.clientY - canvas.offsetTop;

      // Update the position of the selected rectangle
      this.selection.x = mouseX - this.selection.offsetX;
      this.selection.y = mouseY - this.selection.offsetY;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawShapes();
    }
  }
  resizeCanvas = () => {
    this.storeContent();
    this.canvas.width = window.innerWidth > this.canvas.width
      ? window.innerWidth
      : this.canvas.width;
    this.canvas.height = window.innerHeight > this.canvas.height
      ? window.innerHeight
      : this.canvas.height;
    this.drawCanvas();
    this.loadContent();
  }
  drawCanvas() {
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  clearCanvas() {}
  storeContent() {
    this.storedContent = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }
  loadContent() {
    if (this.storedContent !== null) {
      this.context.putImageData(this.storedContent, 0, 0);
    }
  }
}