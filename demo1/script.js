// ---------- NAVIGATION ----------
function show(id) {
  document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function goToWish(){ show("wish"); }
function goToCake(){ show("cake"); }
function goToSurprise(){ show("surprise"); }

// ---------- CAKE ----------
function blowCandles() {
  document.getElementById("cakeMsg").innerText =
    "✨ Wish made! ✨";
  document.getElementById("cakeNext").classList.remove("hidden");
}

// ---------- MODAL ----------
function openModal(type) {
  document.getElementById("modal").classList.remove("hidden");
  const c = document.getElementById("modalContent");

  if (type === "photos") {
    c.innerHTML = `<h3>Memories 📸</h3><p>Your beautiful moments 💖</p>`;
  }

  else if (type === "appre") {
    c.innerHTML = `<h3>Why you're amazing 💛</h3>
    <p>You are kind, strong and beautiful 🌸</p>`;
  }

  else if (type === "letter") {
    c.innerHTML = `<h3>My Letter 💌</h3>
    <p>Dear Pooja,<br>You mean everything to me ❤️</p>`;
  }

  // ---------- QUIZ ----------
  else if (type === "quiz") {
    startQuiz();
  }

  // ---------- GAME ----------
  else if (type === "game") {
    startGame();
  }
}

function closeModal(){
  document.getElementById("modal").classList.add("hidden");
}

// ---------- QUIZ ----------
const quizData = [
  {q:"Favorite color?", options:["Pink","Black","Blue"], answer:0},
  {q:"Favorite vibe?", options:["Calm","Fun","Crazy"], answer:1}
];

let qi=0, score=0;

function startQuiz(){
  qi=0; score=0;
  loadQ();
}

function loadQ(){
  const q=quizData[qi];
  document.getElementById("modalContent").innerHTML = `
    <h3>${q.q}</h3>
    ${q.options.map((o,i)=>`<button onclick="answer(${i})">${o}</button>`).join("")}
  `;
}

function answer(i){
  if(i===quizData[qi].answer) score++;
  qi++;
  if(qi<quizData.length) loadQ();
  else {
    document.getElementById("modalContent").innerHTML =
      `<h3>Score ${score}/${quizData.length} 💖</h3>`;
  }
}

// ---------- GAME ----------
function startGame(){
  document.getElementById("modalContent").innerHTML =
    `<canvas id="canvas" width="300" height="300"></canvas>
     <p id="msg">Click dots</p>`;

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const points = [
    {x:150,y:60},{x:220,y:120},{x:200,y:200},
    {x:150,y:250},{x:100,y:200},{x:80,y:120}
  ];

  let current=0;

  function draw(){
    ctx.clearRect(0,0,300,300);

    ctx.beginPath();
    for(let i=0;i<current;i++){
      ctx.lineTo(points[i].x,points[i].y);
    }
    ctx.stroke();

    points.forEach((p,i)=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,6,0,Math.PI*2);
      ctx.fillStyle=i===current?"gold":"pink";
      ctx.fill();
    });
  }

  canvas.onclick=function(e){
    const rect=canvas.getBoundingClientRect();
    const x=e.clientX-rect.left;
    const y=e.clientY-rect.top;

    const p=points[current];
    if(Math.hypot(x-p.x,y-p.y)<15){
      current++;
      if(current===points.length){
        ctx.clearRect(0,0,300,300);
        ctx.fillText("❤️ Pooja ❤️",150,150);
        document.getElementById("msg").innerText="You made my heart 💕";
      } else draw();
    }
  };

  draw();
}