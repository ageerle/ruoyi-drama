import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { LAYOUT, MAX_LIFE, MAX_PARTICLES, TAU, angleAt, emissionAt, fireAt, hash, particleAt, sourceCount, type LayerId, type PuppetConfig } from './model';

export interface ViewState { position: number[]; target: number[] }
export interface PuppetWorld {
  renderer: THREE.WebGLRenderer; scene: THREE.Scene; camera: THREE.PerspectiveCamera; composer: EffectComposer;
  controls?: OrbitControls; update(config: PuppetConfig, time: number, selected: LayerId, guides: boolean): number;
  resize(width: number, height: number, fit?: boolean): void; fit(): void; view(): ViewState; applyView(view: ViewState, reframe?: boolean): void; dispose(): void;
}

function woodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas'); canvas.width = 128; canvas.height = 512;
  const ctx = canvas.getContext('2d')!; ctx.fillStyle = '#c9a16d'; ctx.fillRect(0, 0, 128, 512);
  for (let i = 0; i < 95; i++) {
    const x = hash(i + 1) * 128; ctx.strokeStyle = `rgba(86,49,22,${.035 + hash(i + 6) * .15})`; ctx.lineWidth = .3 + hash(i + 7);
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.bezierCurveTo(x + 8, 180, x - 7, 290, x + 2, 512); ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; texture.wrapS = texture.wrapT = THREE.RepeatWrapping; return texture;
}
function labelTexture(text: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!; ctx.fillStyle = '#8e241c'; ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = '#cfab61'; ctx.lineWidth = 5; ctx.strokeRect(8, 8, 112, 112);
  ctx.font = '70px "SimSun",serif'; ctx.fillStyle = '#ebd19b'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 64, 68);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture;
}

export function createPuppetWorld(container?: HTMLElement, exported = false): PuppetWorld {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: exported });
  renderer.info.autoReset = false;
  renderer.setPixelRatio(exported ? 1 : Math.min(window.devicePixelRatio, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.setAttribute('aria-label', '药发木偶三维预演，可拖动观察角度'); renderer.domElement.style.touchAction = 'none';
  container?.appendChild(renderer.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#080f1c'); scene.fog = new THREE.FogExp2('#080f1c', .021);
  const camera = new THREE.PerspectiveCamera(40, 1, .1, 80); camera.position.set(4.5, 5.5, 12.5);
  const controls = container ? new OrbitControls(camera, renderer.domElement) : undefined;
  if (controls) { controls.target.set(0, 3.95, 0); controls.enableDamping = true; controls.dampingFactor = .09; controls.minDistance = 3; controls.maxDistance = 25; controls.maxPolarAngle = Math.PI * .58 }
  camera.lookAt(0, 3.95, 0);
  scene.add(new THREE.HemisphereLight('#8da7ce', '#46362b', 1.8));
  const moon = new THREE.DirectionalLight('#bbcff0', 2.3); moon.position.set(-4, 10, 5); moon.castShadow = true;
  moon.shadow.mapSize.set(1024, 1024); moon.shadow.camera.left = -6; moon.shadow.camera.right = 6; moon.shadow.camera.top = 9; moon.shadow.camera.bottom = -5; moon.shadow.normalBias = .025; scene.add(moon);
  const key = new THREE.DirectionalLight('#ffd6a0', 1.7); key.position.set(4, 6, 7); scene.add(key);
  const fireLight = new THREE.PointLight('#ffad49', 0, 9, 1.5); fireLight.position.set(0, 3.8, 1); scene.add(fireLight);
  const composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(800, 800), .55, .45, 1.1)); composer.addPass(new OutputPass());

  const woodMap = woodTexture(); const materials: THREE.Material[] = []; const textures: THREE.Texture[] = [woodMap]; const geometries: THREE.BufferGeometry[] = [];
  const material = (color: string, metalness = 0, roughness = .7, map?: THREE.Texture) => {
    const m = new THREE.MeshStandardMaterial({ color, metalness, roughness, map: map ?? null }); materials.push(m); return m;
  };
  const wood = material('#d2aa73', 0, .8, woodMap), darkWood = material('#624126', 0, .83, woodMap), red = material('#aa3023', .05, .52), gold = material('#bd9045', .55, .35);
  const rope = material('#b89d67'), skin = material('#bf9060', 0, .83, woodMap), black = material('#292522'), robe = material('#873322', 0, .78), blue = material('#415370');
  const geo = <T extends THREE.BufferGeometry>(g: T): T => { geometries.push(g); return g };
  const boxGeo = geo(new THREE.BoxGeometry(1, 1, 1)), ballGeo = geo(new THREE.SphereGeometry(1, 16, 12));
  const cylinderGeo = geo(new THREE.CylinderGeometry(1, 1, 1, 12)), coneGeo = geo(new THREE.ConeGeometry(1, 1, 12));
  function mesh(g: THREE.BufferGeometry, m: THREE.Material, parent: THREE.Object3D, x: number, y: number, z: number, sx = 1, sy = 1, sz = 1) {
    const object = new THREE.Mesh(g, m); object.position.set(x, y, z); object.scale.set(sx, sy, sz); object.castShadow = true; object.receiveShadow = true; parent.add(object); return object;
  }
  const box = (p: THREE.Object3D, m: THREE.Material, x: number, y: number, z: number, sx: number, sy: number, sz: number) => mesh(boxGeo, m, p, x, y, z, sx, sy, sz);
  const ball = (p: THREE.Object3D, m: THREE.Material, x: number, y: number, z: number, sx: number, sy = sx, sz = sx) => mesh(ballGeo, m, p, x, y, z, sx, sy, sz);
  const cylinder = (p: THREE.Object3D, m: THREE.Material, x: number, y: number, z: number, radius: number, height: number) => mesh(cylinderGeo, m, p, x, y, z, radius, height, radius);
  function strut(parent: THREE.Object3D, from: THREE.Vector3, to: THREE.Vector3, radius: number, m = wood) {
    const d = to.clone().sub(from), object = cylinder(parent, m, 0, 0, 0, radius, d.length());
    object.position.copy(from).add(to).multiplyScalar(.5); object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); return object;
  }
  function lineCurve(parent: THREE.Object3D, points: THREE.Vector3[], radius: number, m: THREE.Material) { return mesh(geo(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 20, radius, 6, false)), m, parent, 0, 0, 0) }
  const root = new THREE.Group(); scene.add(root);
  box(root, darkWood, 0, .12, 0, 1.2, .22, .95); box(root, red, 0, .32, 0, .96, .2, .72);
  cylinder(root, wood, 0, 3.7, 0, .037, 6.65);
  for (const y of [2.15, 2.91, 3.45, 3.91, 4.58, 5.2, 6.15]) cylinder(root, gold, 0, y, 0, .062, .07);

  // Two rectangular decks with visible, instanced upright bars.
  for (const y of [6.05, 6.50]) {
    for (const side of [-1, 1]) { box(root, wood, side * .56, y, 0, .07, .065, 1.16); box(root, wood, 0, y, side * .56, 1.16, .065, .07) }
    if (y === 6.05) {
      const bars = new THREE.InstancedMesh(boxGeo, darkWood, 36); const matrix = new THREE.Matrix4(), scale = new THREE.Vector3(.013, .43, .013);
      for (let i = 0; i < 36; i++) { const side = Math.floor(i / 9), along = -.5 + i % 9 / 8; const x = side < 2 ? (side ? .55 : -.55) : along; const z = side < 2 ? along : side === 2 ? -.55 : .55;
        matrix.compose(new THREE.Vector3(x, 6.27, z), new THREE.Quaternion(), scale); bars.setMatrixAt(i, matrix) }
      bars.castShadow = true; root.add(bars);
    }
  }
  cylinder(root, darkWood, 0, 6.82, 0, .045, .58); box(root, black, 0, 7.05, 0, .27, .045, .16);
  const phoenix = new THREE.Group(); phoenix.position.set(0, 7.06, 0); root.add(phoenix);
  ball(phoenix, gold, 0, .22, 0, .08, .14, .09);
  lineCurve(phoenix, [new THREE.Vector3(0, .27, 0), new THREE.Vector3(-.04, .39, 0), new THREE.Vector3(-.16, .48, 0)], .035, gold);
  ball(phoenix, gold, -.17, .48, 0, .052); const beak = mesh(coneGeo, gold, phoenix, -.245, .472, .006, .025, .1, .025); beak.rotation.z = Math.PI / 2;
  ball(phoenix, black, -.186, .49, .048, .008);
  for (let i = 0; i < 7; i++) for (const sign of [-1, 1]) {
    const feather = new THREE.Shape(); feather.moveTo(0, 0); feather.quadraticCurveTo(.05, .31, .10, .60 - i * .048); feather.quadraticCurveTo(.13, .24, 0, 0);
    const f = mesh(geo(new THREE.ExtrudeGeometry(feather, { depth: .008, bevelEnabled: false })), i % 2 ? gold : red, phoenix, sign * .035, .26, -.028 * i);
    f.rotation.z = -sign * (.28 + i * .13); f.scale.x = sign;
  }
  for (let i = 0; i < 4; i++) {
    lineCurve(phoenix, [new THREE.Vector3(.02, .2, -.045), new THREE.Vector3(.12 + i * .09, .14, -.2), new THREE.Vector3(.3 + i * .07, .36 + i * .03, -.40)], .013, i % 2 ? red : gold);
  }
  for (const side of [-1, 1]) { strut(phoenix, new THREE.Vector3(side * .03, .05, 0), new THREE.Vector3(side * .05, .17, 0), .013, gold); box(phoenix, gold, side * .05, .04, .025, .055, .014, .1) }

  const layerGroups = new Map<LayerId, THREE.Group>(), selectGroups = new Map<LayerId, THREE.Object3D>();
  const puppets: Array<{ arm: THREE.Group; head: THREE.Object3D; carrier: THREE.Group; parent: THREE.Group; side: number; base: number }> = [];
  function puppet(parent: THREE.Group, role: 'monkey' | 'pig' | 'monk' | 'horse', x: number) {
    const p = new THREE.Group(); p.position.set(x, -.60, 0); parent.add(p);
    if (role === 'horse') {
      ball(p, skin, 0, .10, -.005, .11, .07, .045); ball(p, skin, .085, .21, 0, .045, .06, .045); ball(p, skin, .12, .21, .025, .04, .035, .04);
      strut(p, new THREE.Vector3(.06, .1, 0), new THREE.Vector3(.075, .2, 0), .03, skin);
      for (const sx of [-.065, .055]) for (const sz of [-.025, .025]) cylinder(p, darkWood, sx, .04, sz, .012, .085);
      box(p, robe, -.02, .14, 0, .09, .028, .09); return;
    }
    for (const sx of [-.026, .026]) { cylinder(p, black, sx, .032, 0, .016, .065); box(p, black, sx, .008, .012, .03, .016, .045) }
    ball(p, role === 'monk' ? robe : role === 'pig' ? blue : red, 0, .125, 0, .052, .074, .034);
    const head = ball(p, skin, 0, .235, 0, .052, .058, .045);
    ball(p, black, -.017, .245, .042, .006); ball(p, black, .017, .245, .042, .006); ball(p, skin, 0, .226, .047, .009, .008, .007);
    if (role === 'pig') { ball(p, skin, 0, .228, .057, .023, .013, .013); for (const sign of [-1, 1]) ball(p, skin, sign * .048, .268, 0, .012, .025, .008) }
    if (role === 'monkey') { for (const sign of [-1, 1]) ball(p, skin, sign * .055, .235, 0, .016, .021, .009); lineCurve(p, [new THREE.Vector3(0, .11, -.035), new THREE.Vector3(.1, .1, -.05), new THREE.Vector3(.10, .2, -.07)], .009, skin) }
    if (role === 'monk') { cylinder(p, gold, 0, .29, 0, .055, .025); for (let i = 0; i < 5; i++) mesh(coneGeo, gold, p, Math.cos(i * TAU / 5) * .043, .32, Math.sin(i * TAU / 5) * .043, .015, .045, .015) }
    else { cylinder(p, black, 0, .282, 0, .047, .024); cylinder(p, gold, 0, .283, 0, .049, .008) }
    const arm = new THREE.Group(); arm.position.set(-.044, .17, 0); p.add(arm); cylinder(arm, role === 'monk' ? robe : red, -.008, -.041, 0, .014, .082); ball(arm, skin, -.008, -.08, 0, .013);
    cylinder(p, role === 'monk' ? robe : blue, .055, .13, 0, .015, .082); ball(p, skin, .055, .087, 0, .013);
    cylinder(arm, gold, -.024, -.025, .025, .005, .26);
    puppets.push({ arm, head, carrier: parent, parent: parent.parent as THREE.Group, side: Math.sign(parent.position.x), base: 0 });
  }
  function stage(parent: THREE.Group, x: number, role: 'monkey' | 'pig' | 'monk' | 'horse') {
    const hanging = new THREE.Group(); hanging.position.set(x, -.055, 0); parent.add(hanging);
    cylinder(hanging, gold, 0, -.63, 0, .26, .035); cylinder(hanging, red, 0, -.017, 0, .25, .07); cylinder(hanging, gold, 0, .02, 0, .256, .016);
    for (let i = 0; i < 4; i++) { const a = i * TAU / 4 + Math.PI / 4; cylinder(hanging, rope, Math.cos(a) * .23, -.32, Math.sin(a) * .23, .004, .60) }
    puppet(hanging, role, 0); return hanging;
  }
  const stageHangers: Array<{ group: THREE.Group; layer: LayerId; offset: number }> = [];
  for (const layout of LAYOUT) {
    const g = new THREE.Group(); g.position.fromArray(layout.center); layerGroups.set(layout.id, g); root.add(g);
    if (layout.kind === 'ring') {
      for (const offset of layout.rings) {
        const circle = mesh(geo(new THREE.TorusGeometry(layout.radius, .019, 6, 48)), wood, g, 0, offset, 0); circle.rotation.x = Math.PI / 2;
        for (let i = 0; i < 3; i++) {
          const a = i * TAU / 3; strut(g, new THREE.Vector3(0, offset, 0), new THREE.Vector3(Math.cos(a) * layout.radius, offset, Math.sin(a) * layout.radius), .014);
          ball(g, i === 0 ? red : gold, Math.cos(a) * layout.radius, offset, Math.sin(a) * layout.radius, .027);
        }
      }
    } else if (layout.kind === 'wheel') {
      mesh(geo(new THREE.TorusGeometry(layout.radius, .04, 8, 48)), red, g, 0, 0, 0);
      for (let i = 0; i < 5; i++) { const a = i * TAU / 5; const s = box(g, i === 0 ? gold : red, Math.cos(a) * .22, Math.sin(a) * .22, 0, .40, .043, .038); s.rotation.z = a }
      ball(g, gold, 0, 0, .045, .071, .071, .028); ball(g, gold, layout.radius, 0, .005, .039);
    } else {
      box(g, wood, 0, 0, 0, layout.radius * 2 + .18, .065, .075);
      for (const sign of [-1, 1]) {
        const role = layout.id === 'upper-stages' ? sign < 0 ? 'monkey' : 'pig' : sign < 0 ? 'monk' : 'horse';
        const hanging = stage(g, sign * layout.radius, role); stageHangers.push({ group: hanging, layer: layout.id, offset: sign });
      }
    }
    const marker = new THREE.AxesHelper(.35); marker.position.y = layout.kind === 'ring' ? 0 : .05; marker.visible = false; g.add(marker); selectGroups.set(layout.id, marker);
  }
  // Hanging paper plaques retain readable text; the pole and cage never rotate.
  box(root, wood, 0, 1.99, 0, 3.4, .06, .06);
  for (const [side, text] of [[-1, '国泰民安'], [1, '风调雨顺']] as const) {
    cylinder(root, rope, side * 1.62, 1.2, 0, .004, 1.5);
    Array.from(text).forEach((character, i) => { const t = labelTexture(character); textures.push(t); const m = material('#ffffff', 0, .86, t); const panel = box(root, m, side * 1.62, 1.80 - i * .29, 0, .22, .24, .015); panel.castShadow = false });
  }

  // Quiet courtyard depth; low draw-call, instanced paving.
  const groundMat = material('#202938', 0, .95), stone = material('#414959', 0, .95);
  const ground = mesh(geo(new THREE.PlaneGeometry(70, 70)), groundMat, scene, 0, 0, 0); ground.rotation.x = -Math.PI / 2; ground.castShadow = false;
  const paving = new THREE.InstancedMesh(boxGeo, stone, 88); const pavingMatrix = new THREE.Matrix4();
  for (let i = 0; i < 88; i++) { pavingMatrix.compose(new THREE.Vector3((i % 11 - 5) * 1.08, .012, (Math.floor(i / 11) - 3.5) * 1.05), new THREE.Quaternion(), new THREE.Vector3(1.04, .024, 1.01)); paving.setMatrixAt(i, pavingMatrix) }
  paving.receiveShadow = true; scene.add(paving);
  const roofMat = material('#17212e', .1, .78), wall = material('#303749', 0, .95);
  box(scene, wall, 0, .65, -4.2, 14, 1.3, .22); box(scene, stone, 0, 1.32, -4.2, 14.1, .09, .33);
  for (let i = 0; i < 9; i++) box(scene, stone, -7 + i * 1.75, .79, -4.2, .24, 1.6, .30);
  for (const x of [-4.7, 4.7]) {
    for (const sx of [-.55, .55]) cylinder(scene, darkWood, x + sx, 1.7, -5, .11, 3.4);
    box(scene, red, x, 3.22, -5, 1.9, .19, .25);
    const roof = mesh(coneGeo, roofMat, scene, x, 3.72, -5, 1.65, .67, 1.65); roof.geometry = geo(new THREE.ConeGeometry(1, 1, 4)); roof.rotation.y = Math.PI / 4;
    const lamp = ball(scene, gold, x, 2.95, -4.85, .1, .16, .1); const lm = new THREE.MeshStandardMaterial({ color: '#ffbb66', emissive: '#ff9c30', emissiveIntensity: 1.5 }); materials.push(lm); lamp.material = lm;
  }

  const sparkPosition = new Float32Array(MAX_PARTICLES * 3), sparkColor = new Float32Array(MAX_PARTICLES * 3), sparkAlpha = new Float32Array(MAX_PARTICLES), sparkSize = new Float32Array(MAX_PARTICLES);
  const tailPosition = new Float32Array(MAX_PARTICLES * 6), tailColor = new Float32Array(MAX_PARTICLES * 6), tailAlpha = new Float32Array(MAX_PARTICLES * 2);
  function dynamicAttribute(array: Float32Array, size: number) { return new THREE.BufferAttribute(array, size).setUsage(THREE.DynamicDrawUsage) }
  const sparkGeometry = geo(new THREE.BufferGeometry()); sparkGeometry.setAttribute('position', dynamicAttribute(sparkPosition, 3)); sparkGeometry.setAttribute('color', dynamicAttribute(sparkColor, 3)); sparkGeometry.setAttribute('alpha', dynamicAttribute(sparkAlpha, 1)); sparkGeometry.setAttribute('size', dynamicAttribute(sparkSize, 1));
  const shader = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { pixelRatio: { value: renderer.getPixelRatio() } },
    vertexShader: 'attribute float alpha; attribute float size; attribute vec3 color; varying float vAlpha; varying vec3 vColor; uniform float pixelRatio; void main(){vAlpha=alpha;vColor=color;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(size*pixelRatio*9./max(1.,-mv.z),1.,14.);}',
    fragmentShader: 'varying float vAlpha; varying vec3 vColor; void main(){float d=length(gl_PointCoord-vec2(.5))*2.;if(d>1.)discard;gl_FragColor=vec4(vColor,vAlpha*pow(1.-d,1.3));}',
  }); materials.push(shader);
  const sparks = new THREE.Points(sparkGeometry, shader); sparks.frustumCulled = false; scene.add(sparks);
  const trailGeometry = geo(new THREE.BufferGeometry()); trailGeometry.setAttribute('position', dynamicAttribute(tailPosition, 3)); trailGeometry.setAttribute('color', dynamicAttribute(tailColor, 3)); trailGeometry.setAttribute('alpha', dynamicAttribute(tailAlpha, 1));
  const trailMaterial = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: 'attribute float alpha; attribute vec3 color; varying float vAlpha; varying vec3 vColor; void main(){vAlpha=alpha;vColor=color;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: 'varying float vAlpha; varying vec3 vColor; void main(){gl_FragColor=vec4(vColor,vAlpha*.55);}',
  }); materials.push(trailMaterial); const trails = new THREE.LineSegments(trailGeometry, trailMaterial); trails.frustumCulled = false; scene.add(trails);
  const smokeGeometry = geo(new THREE.BufferGeometry()), smokePositions = new Float32Array(96 * 3), smokeAlpha = new Float32Array(96);
  smokeGeometry.setAttribute('position', dynamicAttribute(smokePositions, 3)); smokeGeometry.setAttribute('alpha', dynamicAttribute(smokeAlpha, 1));
  const smokeMaterial = new THREE.ShaderMaterial({ transparent: true, depthWrite: false,
    vertexShader: 'attribute float alpha;varying float vAlpha; void main(){vAlpha=alpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(230./max(1.,-mv.z),10.,80.);}',
    fragmentShader: 'varying float vAlpha;void main(){float d=length(gl_PointCoord-vec2(.5))*2.;if(d>1.)discard;gl_FragColor=vec4(.36,.40,.47,vAlpha*pow(1.-d,2.)*.09);}',
  }); materials.push(smokeMaterial); const smoke = new THREE.Points(smokeGeometry, smokeMaterial); smoke.frustumCulled = false; scene.add(smoke);
  const scratch = new Float64Array(9), tint = new THREE.Color();
  const savedTarget = new THREE.Vector3(0, 3.95, 0);
  let lastParticleCount = 0;
  function update(config: PuppetConfig, time: number, selected: LayerId, guides: boolean) {
    for (const layer of config.layers) {
      const group = layerGroups.get(layer.id)!, layout = LAYOUT.find(l => l.id === layer.id)!;
      group.rotation[layout.axis] = angleAt(layer, time, config.speed); selectGroups.get(layer.id)!.visible = guides && layer.id === selected;
    }
    for (const hanger of stageHangers) {
      const layer = config.layers.find(l => l.id === hanger.layer)!;
      // Counter-rotate the suspended carrier: its feet stay on its own floor.
      hanger.group.rotation.y = -angleAt(layer, time, config.speed);
      hanger.group.rotation.z = Math.sin(time * 2.2 + hanger.offset) * .025 * (layer.enabled ? 1 : 0);
    }
    for (const p of puppets) { p.arm.rotation.z = .2 + Math.sin(time * 3.1 + p.side) * .45; p.head.rotation.y = Math.sin(time * 1.9 + p.side) * .17 }
    let count = 0, light = 0; tint.set(config.color);
    const rate = Math.max(1, Math.round(43 * config.density));
    for (let li = 0; li < LAYOUT.length; li++) {
      const layout = LAYOUT[li]!, layer = config.layers.find(l => l.id === layout.id)!; light += fireAt(layer, time);
      if (!layer.sparks || !layer.enabled || config.density === 0) continue;
      const first = Math.max(0, Math.floor((time - MAX_LIFE) * rate)), last = Math.floor(time * rate);
      for (let emitter = 0; emitter < sourceCount(layout); emitter++) for (let serial = first; serial <= last; serial++) {
        if (count >= MAX_PARTICLES) break;
        const birth = (serial + hash(emitter + li * 100)) / rate;
        if (!particleAt(config, layout, layer, emitter, birth, serial, time, scratch)) continue;
        const p = count * 3, q = count * 6, intensity = scratch[8]! > .8 ? 3.4 : 1.7;
        sparkPosition[p] = scratch[0]!; sparkPosition[p + 1] = scratch[1]!; sparkPosition[p + 2] = scratch[2]!;
        sparkColor[p] = tint.r * intensity + .15; sparkColor[p + 1] = tint.g * intensity + .06; sparkColor[p + 2] = tint.b * intensity;
        sparkAlpha[count] = scratch[6]!; sparkSize[count] = scratch[7]!;
        for (let j = 0; j < 3; j++) { tailPosition[q + j] = scratch[j]!; tailPosition[q + j + 3] = scratch[j + 3]!; tailColor[q + j] = sparkColor[p + j]!; tailColor[q + j + 3] = sparkColor[p + j]! }
        tailAlpha[count * 2] = scratch[6]!; tailAlpha[count * 2 + 1] = 0; count++;
      }
    }
    sparkGeometry.setDrawRange(0, count); trailGeometry.setDrawRange(0, count * 2);
    for (const attr of Object.values(sparkGeometry.attributes)) attr.needsUpdate = true; for (const attr of Object.values(trailGeometry.attributes)) attr.needsUpdate = true;
    let smokeCount = 0;
    if (config.smoke && config.density > 0) for (let i = 0; i < 96; i++) {
      const li = i % LAYOUT.length, layer = config.layers.find(l => l.id === LAYOUT[li]!.id)!, age = (time + hash(i + 66) * 3.4) % 3.4, birth = time - age;
      if (birth < 0 || fireAt(layer, birth) <= .05) continue;
      emissionAt(LAYOUT[li]!, layer, i % sourceCount(LAYOUT[li]!), birth, config.speed, scratch);
      smokePositions[smokeCount * 3] = scratch[0]! + config.wind * age + Math.sin(i * 11) * age * .15;
      smokePositions[smokeCount * 3 + 1] = scratch[1]! + age * .38; smokePositions[smokeCount * 3 + 2] = scratch[2]! - age * .13;
      smokeAlpha[smokeCount] = Math.sin(age / 3.4 * Math.PI); smokeCount++;
    }
    smokeGeometry.setDrawRange(0, smokeCount); smokeGeometry.attributes.position!.needsUpdate = true; smokeGeometry.attributes.alpha!.needsUpdate = true;
    fireLight.intensity = light * 2.3 * config.density; lastParticleCount = count; controls?.update(); renderer.info.reset(); composer.render(); return lastParticleCount;
  }
  function fit() {
    const target = controls?.target ?? savedTarget;
    const direction = camera.position.clone().sub(target).normalize();
    const halfFov = THREE.MathUtils.degToRad(camera.fov / 2), distance = Math.max(4.3 / Math.tan(halfFov), 2.45 / (Math.tan(halfFov) * camera.aspect)) * 1.13;
    target.set(0, 3.95, 0); savedTarget.copy(target); camera.position.copy(target).addScaledVector(direction, distance); camera.lookAt(target); controls?.update();
  }
  function resize(width: number, height: number, reframe = false) { renderer.setSize(width, height); composer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); if (reframe) fit() }
  function view(): ViewState { return { position: camera.position.toArray(), target: (controls?.target ?? savedTarget).toArray() } }
  function applyView(v: ViewState, reframe = false) { camera.position.fromArray(v.position); savedTarget.fromArray(v.target); controls?.target.copy(savedTarget); camera.lookAt(savedTarget); if (reframe) fit() }
  function dispose() {
    controls?.dispose(); for (const pass of composer.passes) pass.dispose(); composer.dispose();
    root.traverse(object => { if (object instanceof THREE.AxesHelper) { object.geometry.dispose(); const ms = Array.isArray(object.material) ? object.material : [object.material]; ms.forEach(m => m.dispose()) } });
    new Set(geometries).forEach(g => g.dispose()); new Set(materials).forEach(m => m.dispose()); textures.forEach(t => t.dispose()); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
  }
  return { renderer, scene, camera, composer, controls, update, resize, fit, view, applyView, dispose };
}
