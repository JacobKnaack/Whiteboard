'use strict';

export const Itype = (string) => {
  switch(string) {
    case 'line':
    case 'rectangle':
    case 'circle':
      return type;
    default:
      throw new Error('Shape Error: unknown shape');
  }
}

export class Shape {
  constructor(type) {
    this.type = IType(type);
  }
}