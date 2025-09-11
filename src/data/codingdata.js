export const cardData = [
  {
    id: 1,
    title: "Oddiy Button (HTML, CSS, JS)",
    category: "free",
    image: "/images/button-preview.png",
    html: `<button class="btn">Click me</button>`,
    css: `.btn { padding: 10px 20px; background: blue; color: white; border: none; }`,
    js: `document.querySelector('.btn').addEventListener('click', () => alert('Clicked!'));`,
  },
  {
    id: 2,
    title: "Modal oyna (HTML, CSS, JS)",
    category: "premium",
    image: "/images/modal-preview.png",
    html: `<div class="modal">Hello World</div>`,
    css: `.modal { display: none; background: #eee; padding: 20px; }`,
    js: `// Modal logic here`,
  },
];
