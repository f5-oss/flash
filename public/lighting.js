/* public/lighting.js - canvas-based lightning effect (blue + gold) */
(function(){
  const canvas = document.getElementById('bgCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w=0,h=0, DPR = Math.max(1, window.devicePixelRatio || 1);

  function resize(){
    w = window.innerWidth; h = window.innerHeight; canvas.width = Math.floor(w*DPR); canvas.height = Math.floor(h*DPR);
    canvas.style.width = w+'px'; canvas.style.height = h+'px'; ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  window.addEventListener('resize', resize, {passive:true}); resize();

  // Lightning bolt generator
  function boltPath(x1,y1,x2,y2, jaggedness=0.6, displace=80){
    const path = [{x:x1,y:y1},{x:x2,y:y2}];
    let iterations = 6;
    for(let i=0;i<iterations;i++){
      const newPath = [];
      for(let j=0;j<path.length-1;j++){
        const a = path[j], b = path[j+1];
        const mid = { x: (a.x+b.x)/2 + (Math.random()-0.5)*displace, y: (a.y+b.y)/2 + (Math.random()-0.5)*displace };
        newPath.push(a, mid);
      }
      newPath.push(path[path.length-1]);
      displace *= jaggedness;
      path.splice(0, path.length, ...newPath);
    }
    return path;
  }

  function drawBolt(path, color, glow){
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    // soft glow
    ctx.strokeStyle = color;
    ctx.lineWidth = glow*12;
    ctx.globalAlpha = 0.14;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for(let i=1;i<path.length;i++) ctx.lineTo(path[i].x, path[i].y);
    ctx.stroke();
    // core line
    ctx.strokeStyle = color;
    ctx.lineWidth = glow*3;
    ctx.globalAlpha = 0.9;
    ctx.beginPath(); ctx.moveTo(path[0].x, path[0].y);
    for(let i=1;i<path.length;i++) ctx.lineTo(path[i].x, path[i].y);
    ctx.stroke();
    ctx.restore();
  }

  const bolts = [];
  function spawnBolt(){
    // random top-to-bottom bolt or lateral
    const isBlue = Math.random() < 0.6;
    const color = isBlue ? 'rgba(63,176,255,1)' : 'rgba(255,209,102,1)';
    const glow = isBlue ? 1.0 : 0.9;
    const x1 = Math.random()*w;
    const y1 = 0;
    const x2 = Math.random()*w;
    const y2 = h;
    const path = boltPath(x1,y1,x2,y2,0.55, Math.max(w,h)*0.12);
    bolts.push({path, color, glow, ttl: Math.random()*700 + 300});
  }

  // continuous subtle ambient streaks for depth
  const ambient = [];
  function spawnAmbient(){
    const isBlue = Math.random() < 0.5;
    const color = isBlue ? 'rgba(63,176,255,0.06)' : 'rgba(255,209,102,0.05)';
    const x1 = Math.random()*w; const y1 = Math.random()*h*0.6;
    const x2 = x1 + (Math.random()-0.5)*w*0.6; const y2 = y1 + (Math.random()-0.5)*h*0.2;
    const path = boltPath(x1,y1,x2,y2,0.7, Math.max(w,h)*0.04);
    ambient.push({path, color, ttl: Math.random()*4000 + 3000});
  }

  // seed some ambient streaks
  for(let i=0;i<6;i++) spawnAmbient();

  let last = performance.now();
  function frame(now){
    const dt = now - last; last = now;
    // fade canvas slightly to create motion blur
    ctx.clearRect(0,0,w,h);

    // occasionally spawn bolts
    if(Math.random() < 0.018) spawnBolt();
    if(Math.random() < 0.02) spawnAmbient();

    // draw ambient
    for(let i=ambient.length-1;i>=0;i--){
      const a = ambient[i];
      a.ttl -= dt;
      const alpha = Math.max(0, Math.min(1, a.ttl/5000));
      ctx.save(); ctx.globalAlpha = alpha; ctx.lineWidth = 6; ctx.strokeStyle = a.color; ctx.beginPath(); ctx.moveTo(a.path[0].x,a.path[0].y);
      for(let j=1;j<a.path.length;j++) ctx.lineTo(a.path[j].x,a.path[j].y);
      ctx.stroke(); ctx.restore();
      if(a.ttl <= 0) ambient.splice(i,1);
    }

    // draw bolts
    for(let i=bolts.length-1;i>=0;i--){
      const b = bolts[i];
      b.ttl -= dt;
      const progress = Math.max(0, Math.min(1, b.ttl / 1000));
      // draw core multiple times for intensity
      drawBolt(b.path, b.color.replace(/1\)$/, progress*0.9 + ')'), b.glow);
      if(b.ttl <= 0) bolts.splice(i,1);
    }

    // subtle global vignette/overlay to tint blue/gold
    ctx.save();
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0, 'rgba(63,176,255,0.02)');
    g.addColorStop(1, 'rgba(255,209,102,0.02)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);
    ctx.restore();

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
