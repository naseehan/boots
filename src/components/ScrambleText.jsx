import React, { useEffect, useRef, useState } from 'react';
// import './scrambleText.css'
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const ScrambleText = () => {
    


  const phrases = [
    'shoes',
    
    'jersey',
    'sports balls',
    'board games',
    'badminton rackets.',
    
  ];

  const elRef = useRef(null);
  const [counter, setCounter] = useState(0);

useEffect(() => {
  if (elRef.current && counter < phrases.length) {
    const fx = new TextScramble(elRef.current);

    fx.setText(phrases[counter]).then(() => {
      setTimeout(() => {
        setCounter((prev) => prev + 1);
      }, 2000); 
    });

    return () => {
      cancelAnimationFrame(fx.frameRequest);
    };
  }
}, [counter]);


  return (
  <div ref={elRef}></div>
  
  )
 
};

export default ScrambleText;
