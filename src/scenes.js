import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function rendererFor(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  return renderer;
}

function attachResize(canvas, renderer, camera, render) {
  const resize = () => {
    const width = Math.max(canvas.clientWidth, 1);
    const height = Math.max(canvas.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render?.();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();
  return observer;
}

export function initHeroWaterScene(canvas) {
  if (!canvas) return;
  try {
    const renderer = rendererFor(canvas);
    renderer.toneMapping = THREE.NoToneMapping;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
    camera.position.z = 1;
    const clock = new THREE.Clock();
    const rippleData = Array.from({ length: 8 }, () => new THREE.Vector3(-10, -10, -100));
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(.58, .34) },
      uRipples: { value: rippleData },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      depthTest: false,
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uPointer;
        uniform vec3 uRipples[8];

        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p), f = fract(p);
          f = f*f*(3.0-2.0*f);
          return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1)), f.x), f.y);
        }
        float fbm(vec2 p) {
          float v = 0.0, a = .5;
          for (int i=0; i<5; i++) { v += a*noise(p); p = p*2.03 + 17.7; a *= .5; }
          return v;
        }
        void main() {
          vec2 uv = vUv;
          float aspect = uResolution.x / max(uResolution.y, 1.0);
          vec2 p = (uv-.5)*vec2(aspect,1.0);
          float t = uTime;

          vec2 wave = vec2(
            sin(p.y*18.0+t*.65)+sin((p.x+p.y)*11.0-t*.48),
            cos(p.x*16.0-t*.55)+sin((p.x-p.y)*13.0+t*.42)
          ) * .0055;
          wave += (uPointer-.5) * .012;
          float rings = 0.0;
          for (int i=0; i<8; i++) {
            float age = t-uRipples[i].z;
            vec2 rp = uv-uRipples[i].xy;
            rp.x *= aspect;
            float d = length(rp);
            float ring = sin(d*105.0-age*5.8) * exp(-d*7.0) * exp(-age*.72);
            ring *= step(0.0,age) * step(age,6.0);
            rings += ring;
            wave += normalize(rp+vec2(.0001)) * ring * .009;
          }

          vec2 q = uv + wave;
          vec3 skyTop = vec3(.12,.52,.78);
          vec3 skyLow = vec3(.59,.87,.94);
          vec3 col = mix(skyLow, skyTop, smoothstep(.0,1.0,q.y));

          vec2 cloudUv = vec2(q.x*aspect, q.y)*2.1 + vec2(t*.008,0.0);
          float cloud = fbm(cloudUv*1.45 + fbm(cloudUv*.7));
          cloud = smoothstep(.52,.73,cloud) * smoothstep(.03,.36,q.y);
          col = mix(col, vec3(.96,.99,1.0), cloud*.88);

          vec2 sunPos = vec2(.76,.73);
          vec2 sunDelta = q-sunPos; sunDelta.x *= aspect;
          float sun = exp(-length(sunDelta)*9.0);
          col += vec3(.78,.94,1.0)*sun*.55;

          float surface = sin(q.x*32.0+t*.6)*sin(q.y*25.0-t*.45);
          surface += sin((q.x+q.y)*48.0-t*.8)*.35 + rings*1.5;
          float glint = pow(max(0.0, surface*.5+.5), 10.0);
          col += vec3(.72,.96,1.0)*glint*.18;
          col = mix(col, vec3(.04,.38,.63), .13 + (1.0-q.y)*.13);
          float vignette = smoothstep(.82,.18,length(p*vec2(.72,1.0)));
          col *= .78 + .22*vignette;
          col += vec3(.1,.5,.66)*rings*.08;
          gl_FragColor = vec4(col,1.0);
        }
      `,
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const hero = canvas.closest(".hero");
    let rippleIndex = 0;
    let dragging = false;
    let lastRipple = 0;
    const positionFor = (event) => {
      const rect = hero.getBoundingClientRect();
      return new THREE.Vector2((event.clientX-rect.left)/rect.width, 1-(event.clientY-rect.top)/rect.height);
    };
    const addRipple = (event) => {
      const point = positionFor(event);
      rippleData[rippleIndex].set(point.x, point.y, clock.getElapsedTime());
      rippleIndex = (rippleIndex+1)%rippleData.length;
      lastRipple = performance.now();
    };
    hero.addEventListener("pointerdown", (event) => { dragging = true; addRipple(event); });
    hero.addEventListener("pointerup", () => { dragging = false; });
    hero.addEventListener("pointercancel", () => { dragging = false; });
    hero.addEventListener("pointerleave", () => { dragging = false; });
    hero.addEventListener("pointermove", (event) => {
      const point = positionFor(event);
      uniforms.uPointer.value.lerp(point, .18);
      hero.style.setProperty("--water-x", ((point.x-.5)*2).toFixed(3));
      hero.style.setProperty("--water-y", ((point.y-.5)*2).toFixed(3));
      if (dragging && performance.now()-lastRipple > 85) addRipple(event);
    });

    const resize = () => {
      const width = Math.max(canvas.clientWidth,1), height = Math.max(canvas.clientHeight,1);
      renderer.setSize(width,height,false);
      uniforms.uResolution.value.set(width*renderer.getPixelRatio(),height*renderer.getPixelRatio());
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    const animate = () => {
      uniforms.uTime.value = reducedMotion ? 0 : clock.getElapsedTime();
      renderer.render(scene,camera);
      requestAnimationFrame(animate);
    };
    animate();
  } catch (error) {
    console.warn("Hero water scene unavailable", error);
    canvas.hidden = true;
  }
}

function makeEar(material) {
  const shape = new THREE.Shape();
  shape.moveTo(-0.62, -0.42);
  shape.quadraticCurveTo(-0.2, 0.55, 0, 0.82);
  shape.quadraticCurveTo(0.22, 0.55, 0.62, -0.42);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.32, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 0.12, bevelThickness: 0.08, curveSegments: 16 });
  geometry.center();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(0.95, 1.16, 1);
  return mesh;
}

function tube(points, material, radius = 0.018) {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 24, radius, 8, false), material);
}

export function initCatScene(canvas) {
  if (!canvas) return;
  try {
    const renderer = rendererFor(canvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.08, 7.4);

    scene.add(new THREE.HemisphereLight(0xf6fdff, 0x547b9d, 3.1));
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(-4, 6, 7);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x7fcdf0, 26, 20);
    rimLight.position.set(4, 0, 4);
    scene.add(rimLight);

    const cat = new THREE.Group();
    cat.position.y = 0.05;
    scene.add(cat);

    const ceramic = new THREE.MeshPhysicalMaterial({
      color: 0xa9d8f2,
      roughness: 0.18,
      metalness: 0.02,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      iridescence: 0.14,
      iridescenceIOR: 1.3,
    });
    const innerEar = new THREE.MeshPhysicalMaterial({ color: 0xd9f2f7, roughness: 0.3, clearcoat: 0.8 });
    const whiteGlass = new THREE.MeshPhysicalMaterial({ color: 0xf9fdff, roughness: 0.13, clearcoat: 1 });
    const navy = new THREE.MeshPhysicalMaterial({ color: 0x183650, roughness: 0.28, clearcoat: 0.6 });
    const silver = new THREE.MeshStandardMaterial({ color: 0xbfd5e3, metalness: 0.7, roughness: 0.22 });

    const head = new THREE.Mesh(new THREE.SphereGeometry(1.42, 64, 48), ceramic);
    head.scale.set(1.02, 0.9, 0.9);
    head.position.y = -0.1;
    cat.add(head);

    [-1, 1].forEach((side) => {
      const ear = makeEar(ceramic);
      ear.position.set(side * 0.88, 1.08, -0.08);
      ear.rotation.z = side * -0.16;
      ear.rotation.y = side * -0.08;
      cat.add(ear);
      const inset = makeEar(innerEar);
      inset.scale.multiplyScalar(0.58);
      inset.position.set(side * 0.88, 1.08, 0.18);
      inset.rotation.z = side * -0.16;
      inset.rotation.y = side * -0.08;
      cat.add(inset);
    });

    [-1, 1].forEach((side) => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 24), whiteGlass);
      eye.scale.set(0.82, 1.05, 0.34);
      eye.position.set(side * 0.53, 0.25, 1.13);
      cat.add(eye);
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 18), navy);
      pupil.scale.set(0.6, 1.18, 0.3);
      pupil.position.set(side * 0.53, 0.23, 1.36);
      cat.add(pupil);
      const shine = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), whiteGlass);
      shine.position.set(side * 0.49, 0.32, 1.5);
      cat.add(shine);
      const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 16), innerEar);
      cheek.scale.set(1.3, 0.5, 0.25);
      cheek.position.set(side * 0.75, -0.37, 1.05);
      cat.add(cheek);
    });

    const muzzleLeft = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 24), whiteGlass);
    muzzleLeft.scale.set(1.1, 0.72, 0.45);
    muzzleLeft.position.set(-0.23, -0.4, 1.12);
    cat.add(muzzleLeft);
    const muzzleRight = muzzleLeft.clone();
    muzzleRight.position.x = 0.23;
    cat.add(muzzleRight);

    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 16), navy);
    nose.scale.set(1.15, 0.65, 0.55);
    nose.position.set(0, -0.32, 1.48);
    cat.add(nose);
    cat.add(tube([[0,-.42,1.45],[0,-.58,1.43],[-.16,-.67,1.35]], navy, .018));
    cat.add(tube([[0,-.58,1.43],[.16,-.67,1.35]], navy, .018));

    [-1, 1].forEach((side) => {
      for (let index = 0; index < 3; index += 1) {
        const y = -0.36 - index * 0.16;
        const points = side < 0
          ? [[-.55,y,1.17],[-1.05,y + (1-index)*.04,1.06],[-1.55,y + (1-index)*.08,.82]]
          : [[.55,y,1.17],[1.05,y + (1-index)*.04,1.06],[1.55,y + (1-index)*.08,.82]];
        cat.add(tube(points, silver, 0.012));
      }
    });

    const halo = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.025, 10, 96), silver);
    halo.rotation.x = Math.PI / 2.8;
    halo.position.set(0, 1.78, -0.48);
    cat.add(halo);

    const bubbles = new THREE.Group();
    [[-1.72,.78,0,.12],[1.67,-.28,-.2,.08],[1.4,1.22,-.4,.06],[-1.45,-.95,-.2,.05]].forEach(([x,y,z,size]) => {
      const bubble = new THREE.Mesh(new THREE.SphereGeometry(size, 18, 12), new THREE.MeshPhysicalMaterial({ color: 0xcbefff, transmission: .65, opacity: .7, transparent: true, roughness: .05, thickness: .2 }));
      bubble.position.set(x,y,z);
      bubbles.add(bubble);
    });
    cat.add(bubbles);

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let targetY = 0;
    let targetX = 0;
    canvas.addEventListener("pointerdown", (event) => {
      dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      targetY += (event.clientX - startX) * 0.009;
      targetX += (event.clientY - startY) * 0.006;
      targetX = THREE.MathUtils.clamp(targetX, -0.35, 0.35);
      startX = event.clientX;
      startY = event.clientY;
    });
    const release = () => { dragging = false; };
    canvas.addEventListener("pointerup", release);
    canvas.addEventListener("pointercancel", release);

    const clock = new THREE.Clock();
    const render = () => renderer.render(scene, camera);
    attachResize(canvas, renderer, camera, render);
    const animate = () => {
      const time = clock.getElapsedTime();
      const idle = reducedMotion ? 0 : Math.sin(time * .45) * .14;
      cat.rotation.y += (targetY + idle - cat.rotation.y) * .055;
      cat.rotation.x += (targetX + (reducedMotion ? 0 : Math.sin(time * .62) * .025) - cat.rotation.x) * .05;
      cat.position.y = 0.05 + (reducedMotion ? 0 : Math.sin(time * .8) * .045);
      bubbles.rotation.z = time * .08;
      render();
      requestAnimationFrame(animate);
    };
    animate();
  } catch (error) {
    console.warn("Cat scene unavailable", error);
    canvas.hidden = true;
    const fallback = canvas.parentElement.querySelector(".cat-fallback");
    if (fallback) { fallback.hidden = false; fallback.style.display = "grid"; }
  }
}

export function initWalkmanScene(canvas, { onPrevious, onNext, onOpen }) {
  if (!canvas) return;
  try {
    const renderer = rendererFor(canvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
    camera.position.set(0, .1, 8.2);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x668aa6, 3.2));
    const key = new THREE.DirectionalLight(0xffffff, 4.5);
    key.position.set(-4, 6, 7);
    scene.add(key);
    const blue = new THREE.PointLight(0x77c9ed, 22, 18);
    blue.position.set(4, -2, 4);
    scene.add(blue);

    const player = new THREE.Group();
    player.rotation.set(-.08, -.34, -.05);
    scene.add(player);
    const shell = new THREE.MeshPhysicalMaterial({ color: 0xe7f1f6, metalness: .42, roughness: .22, clearcoat: .8 });
    const edge = new THREE.MeshStandardMaterial({ color: 0x86a8bf, metalness: .7, roughness: .2 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0x8bc9e5, transmission: .25, transparent: true, opacity: .78, roughness: .12, clearcoat: 1 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x234764, metalness: .25, roughness: .28 });
    const pearl = new THREE.MeshPhysicalMaterial({ color: 0xfbfefe, roughness: .14, clearcoat: 1 });

    const body = new THREE.Mesh(new RoundedBoxGeometry(3.8, 4.65, .82, 8, .18), shell);
    player.add(body);
    const side = new THREE.Mesh(new RoundedBoxGeometry(3.92, 4.22, .45, 6, .16), edge);
    side.position.z = -.37;
    player.add(side);
    body.position.z = .05;

    const screen = new THREE.Mesh(new RoundedBoxGeometry(2.78, 1.08, .1, 6, .12), glass);
    screen.position.set(0, 1.42, .48);
    player.add(screen);
    const screenLine = new THREE.Mesh(new THREE.BoxGeometry(1.48,.035,.035), dark);
    screenLine.position.set(-.33,1.5,.56);
    player.add(screenLine);
    const screenLineTwo = screenLine.clone();
    screenLineTwo.scale.x = .62;
    screenLineTwo.position.set(-.61,1.29,.56);
    player.add(screenLineTwo);
    for (let index = 0; index < 8; index += 1) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(.035,.1 + (index%3)*.045,.025), dark);
      bar.position.set(.55 + index*.09, 1.38, .565);
      player.add(bar);
    }

    const discRing = new THREE.Mesh(new THREE.TorusGeometry(1.05,.055,12,64), edge);
    discRing.position.set(0,-.37,.5);
    player.add(discRing);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(.98,64), new THREE.MeshPhysicalMaterial({ color: 0xc9e7f3, metalness: .16, roughness: .12, iridescence: .35, side: THREE.DoubleSide }));
    disc.position.set(0,-.37,.515);
    player.add(disc);
    const hub = new THREE.Mesh(new THREE.TorusGeometry(.24,.07,10,48), pearl);
    hub.position.set(0,-.37,.54);
    player.add(hub);
    const shine = new THREE.Mesh(new THREE.RingGeometry(.38,.78,64,1,0,.72), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .34, side: THREE.DoubleSide }));
    shine.position.set(0,-.37,.535);
    player.add(shine);

    const clickable = [];
    const makeButton = (x, action, symbol) => {
      const button = new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,.18,32), pearl.clone());
      button.rotation.x = Math.PI / 2;
      button.position.set(x,-1.82,.55);
      button.userData.action = action;
      button.userData.baseZ = .55;
      clickable.push(button);
      player.add(button);
      const label = new THREE.Mesh(new THREE.BoxGeometry(symbol === "open" ? .12 : .16,.035,.025), dark);
      label.position.set(x,-1.82,.66);
      if (symbol !== "open") label.rotation.z = symbol === "previous" ? -.42 : .42;
      player.add(label);
      if (symbol !== "open") {
        const second = label.clone();
        second.position.x += symbol === "previous" ? -.08 : .08;
        player.add(second);
      }
    };
    makeButton(-.72,"previous","previous");
    makeButton(0,"open","open");
    makeButton(.72,"next","next");

    const topButton = new THREE.Mesh(new RoundedBoxGeometry(1.25,.18,.25,3,.06), edge);
    topButton.position.set(.7,2.36,0);
    player.add(topButton);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const hit = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      return raycaster.intersectObjects(clickable, false)[0]?.object;
    };
    canvas.addEventListener("pointermove", (event) => { canvas.style.cursor = hit(event) ? "pointer" : "grab"; });
    canvas.addEventListener("click", (event) => {
      const object = hit(event);
      if (!object) return;
      object.userData.press = .16;
      ({ previous: onPrevious, next: onNext, open: onOpen })[object.userData.action]?.();
    });

    let drag = false;
    let startX = 0;
    let rotationTarget = -.34;
    canvas.addEventListener("pointerdown", (event) => { if (!hit(event)) { drag = true; startX = event.clientX; canvas.setPointerCapture(event.pointerId); } });
    canvas.addEventListener("pointermove", (event) => { if (drag) { rotationTarget += (event.clientX - startX) * .006; startX = event.clientX; } });
    canvas.addEventListener("pointerup", () => { drag = false; });

    const clock = new THREE.Clock();
    const render = () => renderer.render(scene,camera);
    attachResize(canvas,renderer,camera,render);
    const animate = () => {
      const time = clock.getElapsedTime();
      player.rotation.y += (rotationTarget + (reducedMotion ? 0 : Math.sin(time*.45)*.035) - player.rotation.y) * .05;
      player.position.y = reducedMotion ? 0 : Math.sin(time*.72)*.06;
      disc.rotation.z = reducedMotion ? .1 : time*.12;
      clickable.forEach((button) => { button.userData.press = Math.max(0,(button.userData.press || 0)-.012); button.position.z = button.userData.baseZ - button.userData.press; });
      render();
      requestAnimationFrame(animate);
    };
    animate();
  } catch (error) {
    console.warn("Walkman scene unavailable", error);
  }
}

let audioContext;
function playNote(frequency) {
  try {
    audioContext ||= new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(.0001,audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.12,audioContext.currentTime+.015);
    gain.gain.exponentialRampToValueAtTime(.0001,audioContext.currentTime+.55);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime+.58);
  } catch (error) {
    console.warn("Audio unavailable", error);
  }
}

export function initPianoScene(canvas, onSelect) {
  if (!canvas) return;
  try {
    const renderer = rendererFor(canvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35,1,.1,100);
    camera.position.set(0,4.8,7.8);
    camera.lookAt(0,0,0);
    scene.add(new THREE.HemisphereLight(0xffffff,0x527594,3.3));
    const keyLight = new THREE.DirectionalLight(0xffffff,4.2);
    keyLight.position.set(-4,7,6);
    scene.add(keyLight);
    const fill = new THREE.PointLight(0x78c7eb,25,18);
    fill.position.set(5,1,3);
    scene.add(fill);

    const piano = new THREE.Group();
    piano.rotation.y = -.12;
    piano.rotation.x = -.04;
    scene.add(piano);
    const whiteMaterials = [0xeef9ff,0xe2f4fb,0xd8eef8,0xdaf4f0,0xe8f4fb].map((color) => new THREE.MeshPhysicalMaterial({ color, roughness:.15, clearcoat:1 }));
    const darkMaterial = new THREE.MeshPhysicalMaterial({ color:0x294b68,roughness:.2,metalness:.12,clearcoat:.8 });
    const selectedMaterial = new THREE.MeshPhysicalMaterial({ color:0x6aa9d3,roughness:.15,clearcoat:1 });
    const keys = [];
    const whiteWidth = .52;
    for (let index = 0; index < 15; index += 1) {
      const skillIndex = Math.floor(index/3);
      const key = new THREE.Mesh(new RoundedBoxGeometry(whiteWidth, .28, 3.1, 4,.055), whiteMaterials[skillIndex]);
      key.position.set((index-7)*.56,0,0);
      key.userData = { skillIndex, baseY: 0, originalMaterial: whiteMaterials[skillIndex], note: 261.63 * Math.pow(2,index/12), press:0 };
      keys.push(key);
      piano.add(key);
    }
    [0,1,3,4,5,7,8,10,11,12].forEach((index) => {
      const skillIndex = Math.min(4,Math.floor(index/3));
      const key = new THREE.Mesh(new RoundedBoxGeometry(.32,.38,1.82,4,.045),darkMaterial);
      key.position.set((index-6.5)*.56,.25,-.58);
      key.userData = { skillIndex, baseY:.25, originalMaterial:darkMaterial, note:277.18*Math.pow(2,index/12), press:0 };
      keys.push(key);
      piano.add(key);
    });
    const base = new THREE.Mesh(new RoundedBoxGeometry(9.1,.42,3.75,5,.12),new THREE.MeshStandardMaterial({ color:0xa1b8c8,metalness:.62,roughness:.22 }));
    base.position.set(0,-.3,.1);
    piano.add(base);
    const back = new THREE.Mesh(new RoundedBoxGeometry(9.15,.85,.42,5,.1),new THREE.MeshPhysicalMaterial({ color:0xdbeaf2,metalness:.32,roughness:.23 }));
    back.position.set(0,.3,-1.78);
    piano.add(back);
    for (let index=0; index<5; index+=1) {
      const light = new THREE.Mesh(new THREE.SphereGeometry(.045,12,8),new THREE.MeshBasicMaterial({color:index===0?0x5b9fc8:0xaabfcd}));
      light.position.set(-.28+index*.14,.48,-1.55);
      piano.add(light);
    }

    let selected = 0;
    const setSelected = (next) => {
      selected = next;
      keys.forEach((key) => { key.material = key.userData.skillIndex === selected ? selectedMaterial : key.userData.originalMaterial; });
      onSelect?.(selected);
    };
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const hit = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX-rect.left)/rect.width)*2-1;
      pointer.y = -((event.clientY-rect.top)/rect.height)*2+1;
      raycaster.setFromCamera(pointer,camera);
      return raycaster.intersectObjects(keys,false)[0]?.object;
    };
    canvas.addEventListener("pointermove",(event)=>{ canvas.style.cursor=hit(event)?"pointer":"default"; });
    canvas.addEventListener("pointerdown",(event)=>{
      const key=hit(event);
      if(!key)return;
      key.userData.press=.2;
      setSelected(key.userData.skillIndex);
      playNote(key.userData.note);
    });
    canvas.setSkill = (index, sound=false) => { setSelected(index); if(sound) playNote(261.63*Math.pow(2,index*3/12)); };
    setSelected(0);

    const clock=new THREE.Clock();
    const render=()=>renderer.render(scene,camera);
    attachResize(canvas,renderer,camera,render);
    const animate=()=>{
      const time=clock.getElapsedTime();
      piano.position.y=reducedMotion?0:Math.sin(time*.55)*.025;
      keys.forEach((key)=>{ key.userData.press=Math.max(0,key.userData.press-.014); key.position.y=key.userData.baseY-key.userData.press; });
      render();
      requestAnimationFrame(animate);
    };
    animate();
  } catch(error){ console.warn("Piano scene unavailable",error); }
}
