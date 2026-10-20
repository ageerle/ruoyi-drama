import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildArmyPath, cavalryColumns, formationLength, soldierPose, soldierRole, type ArmyConfig } from './model';

export type ArmyView = 'field' | 'overview' | 'head' | 'body' | 'tail' | 'cavalry';
export interface ArmyCamera { position: number[]; target: number[]; preset: ArmyView; aspect: number }
const MAX = 960;
export function createArmyWorld(host?: HTMLElement, exported = false) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: exported });
  renderer.setPixelRatio(exported ? 1 : Math.min(devicePixelRatio, 1.5)); renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.domElement.setAttribute('aria-label', '一字长蛇阵三维画面，可拖动观察并点选兵卒'); renderer.domElement.style.touchAction = 'none'; host?.appendChild(renderer.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#b6b59e'); scene.fog = new THREE.Fog('#b6b59e', 160, 700);
  const camera = new THREE.PerspectiveCamera(43, 1, .1, 5000); camera.position.set(20, 60, 90);
  const controls = host ? new OrbitControls(camera, renderer.domElement) : undefined;
  const target = new THREE.Vector3(0, 1, 0); if (controls) { controls.target.copy(target); controls.enableDamping = true; controls.dampingFactor = .1; controls.maxPolarAngle = Math.PI * .485; controls.minDistance = 5; controls.maxDistance = 3500 }
  scene.add(new THREE.HemisphereLight('#e9e3cb', '#4b4935', 2.1));
  const sun = new THREE.DirectionalLight('#ffedc3', 3); sun.position.set(-50, 90, 55); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.normalBias = .04; sun.shadow.bias = -.0002; scene.add(sun);
  const fill = new THREE.DirectionalLight('#cbd9d4', 1.3); fill.position.set(40, 25, -40); scene.add(fill);
  const geos: THREE.BufferGeometry[] = [], mats: THREE.Material[] = [], textures: THREE.Texture[] = [];
  const geo = <T extends THREE.BufferGeometry>(g: T) => { geos.push(g); return g };
  const mat = (color: string, metalness = 0, roughness = .8) => { const m = new THREE.MeshStandardMaterial({ color, metalness, roughness }); mats.push(m); return m };
  const iron = mat('#454e4e', .55, .62), helmet = mat('#64695d', .55, .57), gold = mat('#b29b5d', .65, .53), skin = mat('#bb9974'), leather = mat('#3b332b'), red = mat('#943d2d'), wood = mat('#705336'), eye = mat('#262523');
  const redFlag = mat('#973c2a'); redFlag.side = THREE.DoubleSide;
  const shapes = { box: geo(new THREE.BoxGeometry(1, 1, 1)), sphere: geo(new THREE.SphereGeometry(1, 10, 8)), cylinder: geo(new THREE.CylinderGeometry(1, 1, 1, 8)), cone: geo(new THREE.ConeGeometry(1, 1, 6)), shield: geo(new THREE.CylinderGeometry(1, 1, 1, 18)), rim: geo(new THREE.TorusGeometry(1, .04, 4, 20)), dome: geo(new THREE.SphereGeometry(1, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2)) };
  function groundMap() {
    const c = document.createElement('canvas'); c.width = c.height = 256; const ctx = c.getContext('2d')!; ctx.fillStyle = '#b5a383'; ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2400; i++) { const a = Math.sin(i * 13.123) * 43758.545, b = Math.sin(i * 37.32 + 5) * 45345.12; ctx.fillStyle = i % 4 ? 'rgba(58,55,38,.08)' : 'rgba(237,218,179,.14)'; ctx.fillRect((a - Math.floor(a)) * 256, (b - Math.floor(b)) * 256, i % 3 + 1, 1) }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(180, 180); textures.push(t); return t;
  }
  const groundMat = mat('#c0b18e'); groundMat.map = groundMap(); const ground = new THREE.Mesh(geo(new THREE.PlaneGeometry(2200, 2200)), groundMat); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  const grid = new THREE.GridHelper(1800, 180, '#8b8368', '#a49470'); (grid.material as THREE.Material).transparent = true; (grid.material as THREE.Material).opacity = .17; mats.push(grid.material as THREE.Material); geos.push(grid.geometry); grid.position.y = .006; scene.add(grid);
  // Distant low ridges and a small camp establish a field, without crowding the formation.
  const ridge = mat('#7c8263');
  for (let i = 0; i < 22; i++) { const mountain = new THREE.Mesh(shapes.cone, ridge); mountain.position.set((i - 11) * 27, 9 + Math.sin(i * 6) * 4, -180 - Math.sin(i) * 20); mountain.scale.set(29, 26 + Math.sin(i * 4) * 13, 36); scene.add(mountain) }
  const tentMat = mat('#656a4b');
  for (let i = 0; i < 12; i++) {
    const tent = new THREE.Mesh(geo(new THREE.ConeGeometry(2.2, 3.6, 4)), tentMat); tent.position.set((i - 5.5) * 7, 1.8, -35 - i % 2 * 7); tent.rotation.y = Math.PI / 4; tent.scale.z = 1.35; tent.castShadow = true; scene.add(tent);
  }
  const batches = new Map<string, THREE.InstancedMesh>();
  function batch(name: string, g: THREE.BufferGeometry, m: THREE.Material, capacity = MAX) { const mesh = new THREE.InstancedMesh(g, m, capacity); mesh.count = 0; mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); mesh.castShadow = true; mesh.frustumCulled = false; mesh.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 2000); batches.set(name, mesh); scene.add(mesh); return mesh }
  const body = batch('body', shapes.box, iron); batch('skirt', shapes.box, iron); batch('belt', shapes.box, red); batch('strap', shapes.box, gold, MAX * 2);
  batch('head', shapes.sphere, skin); batch('helmet', shapes.dome, helmet); batch('band', shapes.cylinder, helmet); batch('plume', shapes.cone, red);
  batch('eyes', shapes.sphere, eye, MAX * 2); batch('nose', shapes.sphere, skin); batch('arms', shapes.box, iron, MAX * 2); batch('hands', shapes.sphere, skin, MAX * 2);
  batch('legs', shapes.box, leather, MAX * 4); batch('boots', shapes.box, leather, MAX * 2);
  batch('shield', shapes.shield, wood); batch('rim', shapes.rim, gold); batch('boss', shapes.sphere, gold);
  batch('spear', shapes.cylinder, wood); batch('point', shapes.cone, helmet);
  const bowCurve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, -.5, 0), new THREE.Vector3(.23, -.27, 0), new THREE.Vector3(.28, 0, 0), new THREE.Vector3(.23, .27, 0), new THREE.Vector3(0, .5, 0)]);
  batch('bow', geo(new THREE.TubeGeometry(bowCurve, 12, .027, 5, false)), wood); batch('string', shapes.cylinder, gold);
  batch('quiver', shapes.cylinder, leather); batch('arrows', shapes.cylinder, wood, MAX * 3); batch('arrowtips', shapes.cone, helmet, MAX * 3);
  batch('flagpole', shapes.cylinder, wood); batch('finial', shapes.sphere, gold);
  const coat = mat('#79533a'), mane = mat('#302921'), muzzle = mat('#584331');
  const horseBody = batch('horseBody', shapes.sphere, coat), horseIds = new Uint16Array(MAX);
  batch('horseHaunch', shapes.sphere, coat, MAX * 2); batch('horseNeck', shapes.sphere, coat); batch('horseHead', shapes.sphere, coat, MAX * 2);
  batch('horseMuzzle', shapes.sphere, muzzle); batch('horseEars', shapes.cone, coat, MAX * 2); batch('horseEyes', shapes.sphere, eye, MAX * 4);
  batch('horseMane', shapes.box, mane, MAX * 2); batch('horseTail', shapes.cylinder, mane); batch('horseLegs', shapes.cylinder, coat, MAX * 8); batch('horseHooves', shapes.box, mane, MAX * 4);
  batch('saddleBlanket', shapes.box, red); batch('saddle', shapes.box, leather); batch('bridle', shapes.box, leather, MAX * 3); batch('stirrups', shapes.rim, gold, MAX * 2);
  for (const side of [-1, 1]) { const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(side * .18, 1.92, 1.25), new THREE.Vector3(side * .19, 1.78, .65), new THREE.Vector3(-.34, 1.86, .13)]); batch(`reins${side}`, geo(new THREE.TubeGeometry(curve, 10, .012, 4, false)), leather) }
  const flagGeo = geo(new THREE.PlaneGeometry(.85, 1.23, 8, 8)); for (let i = 0; i < flagGeo.attributes.position!.count; i++) { const p = flagGeo.attributes.position!; p.setZ(i, Math.sin(p.getX(i) * 5 + p.getY(i) * 4) * .07) } flagGeo.computeVertexNormals();
  const banner = document.createElement('canvas'); banner.width = 128; banner.height = 192; const bctx = banner.getContext('2d')!; bctx.fillStyle = '#963d29'; bctx.fillRect(0, 0, 128, 192); bctx.strokeStyle = '#c5a26d'; bctx.lineWidth = 6; bctx.strokeRect(8, 8, 112, 176); bctx.font = '76px SimSun,serif'; bctx.textAlign = 'center'; bctx.fillStyle = '#dfcc9b'; bctx.fillText('军', 64, 122);
  const flagTex = new THREE.CanvasTexture(banner); flagTex.colorSpace = THREE.SRGBColorSpace; textures.push(flagTex); redFlag.map = flagTex; batch('banner', flagGeo, redFlag);
  const scratch = new Float64Array(6), position = new THREE.Vector3(), scaling = new THREE.Vector3(), rotation = new THREE.Quaternion(), euler = new THREE.Euler();
  const base = new THREE.Matrix4(), mount = new THREE.Matrix4(), local = new THREE.Matrix4(), matrix = new THREE.Matrix4(), hip = new THREE.Matrix4(), knee = new THREE.Matrix4(), weapon = new THREE.Matrix4();
  const tints = [new THREE.Color('#716351'), new THREE.Color('#46524f'), new THREE.Color('#5b6241')];
  function transform(parent: THREE.Matrix4, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0) { rotation.setFromEuler(euler.set(rx, ry, rz)); local.compose(position.set(x, y, z), rotation, scaling.set(1, 1, 1)); return matrix.multiplyMatrices(parent, local) }
  function paint(name: string, parent: THREE.Matrix4, x: number, y: number, z: number, sx: number, sy: number, sz: number, rx = 0, ry = 0, rz = 0) {
    const mesh = batches.get(name)!; rotation.setFromEuler(euler.set(rx, ry, rz)); local.compose(position.set(x, y, z), rotation, scaling.set(sx, sy, sz)); matrix.multiplyMatrices(parent, local); mesh.setMatrixAt(mesh.count++, matrix);
  }
  function horse(id: number, phase: number, moving: number) {
    horseIds[horseBody.count] = id;
    paint('horseBody', mount, 0, 1.27, 0, .34, .43, .78);
    paint('horseHaunch', mount, 0, 1.28, -.50, .36, .42, .37); paint('horseHaunch', mount, 0, 1.28, .49, .34, .46, .34);
    paint('horseNeck', mount, 0, 1.68, .66, .21, .50, .23, .38);
    paint('horseHead', mount, 0, 2.02, .97, .19, .26, .29, .35); paint('horseHead', mount, 0, 1.90, 1.20, .18, .17, .25, .30);
    paint('horseMuzzle', mount, 0, 1.84, 1.40, .18, .13, .10);
    for (const side of [-1, 1]) {
      paint('horseEars', mount, side * .10, 2.31, .90, .055, .20, .055, -.12, 0, side * -.18);
      paint('horseEyes', mount, side * .179, 2.10, 1.03, .022, .023, .028); paint('horseEyes', mount, side * .10, 1.91, 1.47, .026, .012, .008);
      paint(`reins${side}`, mount, 0, 0, 0, 1, 1, 1);
      paint('stirrups', mount, side * .50, .96, .23, .12, .16, .12, 0, Math.PI / 2);
      for (const front of [-1, 1]) {
        const stride = Math.sin(phase + (side === -1 ? Math.PI : 0) + (front === -1 ? Math.PI * .5 : 0)) * moving;
        hip.copy(transform(mount, side * .26, 1.20, front * .52, stride * .25)); paint('horseLegs', hip, 0, -.265, 0, .072, .53, .072);
        knee.copy(transform(hip, 0, -.53, 0, Math.max(0, -stride) * .45)); paint('horseLegs', knee, 0, -.26, 0, .052, .52, .052); paint('horseHooves', knee, 0, -.58, .035, .16, .16, .23);
      }
    }
    paint('horseMane', mount, 0, 1.85, .46, .065, .71, .11, .38); paint('horseMane', mount, 0, 2.21, .93, .13, .07, .25, .12);
    paint('horseTail', mount, 0, 1.04, -1.10, .075, .72, .075, .30, 0, Math.sin(phase * .6) * moving * .10);
    paint('saddleBlanket', mount, 0, 1.56, -.04, .68, .10, .72); paint('saddle', mount, 0, 1.65, -.03, .51, .10, .52);
    paint('bridle', mount, 0, 1.97, 1.13, .405, .035, .35, .35); paint('bridle', mount, -.20, 2.04, 1.05, .024, .34, .05, .35); paint('bridle', mount, .20, 2.04, 1.05, .024, .34, .05, .35);
  }
  const routePoints = new Float32Array(1024 * 3), routeGeo = geo(new THREE.BufferGeometry()); routeGeo.setAttribute('position', new THREE.BufferAttribute(routePoints, 3).setUsage(THREE.DynamicDrawUsage));
  const routeMat = new THREE.LineBasicMaterial({ color: '#914f2b', transparent: true, opacity: .55 }); mats.push(routeMat); const route = new THREE.Line(routeGeo, routeMat); route.frustumCulled = false; scene.add(route);
  const targetMarker = new THREE.Group(); const markerMat = new THREE.MeshBasicMaterial({ color: '#a54832', transparent: true, opacity: .55, depthWrite: false }); mats.push(markerMat);
  const marker = new THREE.Mesh(geo(new THREE.RingGeometry(1.5, 1.65, 40)), markerMat); marker.rotation.x = -Math.PI / 2; targetMarker.add(marker); scene.add(targetMarker);
  const selection = new THREE.Mesh(geo(new THREE.RingGeometry(.48, .58, 24)), markerMat); selection.rotation.x = -Math.PI / 2; selection.visible = false; scene.add(selection);
  const labels: THREE.Sprite[] = [], labelContexts: CanvasRenderingContext2D[] = []; let viewportHeight = 720, labeledCavalry = false;
  function labelText(ctx: CanvasRenderingContext2D, text: string) { ctx.clearRect(0, 0, 320, 80); ctx.fillStyle = 'rgba(36,45,38,.86)'; ctx.fillRect(0, 0, 320, 80); ctx.strokeStyle = '#ab9a6f'; ctx.lineWidth = 3; ctx.strokeRect(2, 2, 316, 76); ctx.fillStyle = '#ecdfba'; ctx.font = '36px SimSun,serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 160, 41) }
  for (const text of ['蛇首 · 盾阵', '蛇身 · 枪阵', '蛇尾 · 弓阵']) {
    const canvas = document.createElement('canvas'); canvas.width = 320; canvas.height = 80; const ctx = canvas.getContext('2d')!; labelContexts.push(ctx); labelText(ctx, text);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture); const material = new THREE.SpriteMaterial({ map: texture, depthTest: false, depthWrite: false }); mats.push(material); const sprite = new THREE.Sprite(material); sprite.center.set(.5, -.6); sprite.renderOrder = 3; labels.push(sprite); scene.add(sprite);
  }
  const dustGeo = geo(new THREE.BufferGeometry()), dustPos = new Float32Array(360 * 3), dustAlpha = new Float32Array(360);
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3).setUsage(THREE.DynamicDrawUsage)); dustGeo.setAttribute('alpha', new THREE.BufferAttribute(dustAlpha, 1).setUsage(THREE.DynamicDrawUsage));
  const dustMat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false,
    vertexShader: 'attribute float alpha;varying float vAlpha;void main(){vAlpha=alpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(210./max(1.,-mv.z),2.,30.);}',
    fragmentShader: 'varying float vAlpha;void main(){float d=length(gl_PointCoord-vec2(.5))*2.;if(d>1.)discard;gl_FragColor=vec4(.49,.40,.26,vAlpha*pow(1.-d,2.)*.14);}',
  }); mats.push(dustMat); const dust = new THREE.Points(dustGeo, dustMat); dust.frustumCulled = false; scene.add(dust);
  let preset: ArmyView = 'field', selected = -1, pickHandler: ((id: number) => void) | undefined;
  const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2(); let down: { x: number; y: number } | undefined;
  function pointerDown(e: PointerEvent) { down = { x: e.clientX, y: e.clientY } }
  function pointerUp(e: PointerEvent) { if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return; down = undefined; const rect = renderer.domElement.getBoundingClientRect(); pointer.set((e.clientX - rect.left) / rect.width * 2 - 1, 1 - (e.clientY - rect.top) / rect.height * 2); raycaster.setFromCamera(pointer, camera); const hit = raycaster.intersectObjects([body, horseBody], false)[0]; if (hit?.instanceId !== undefined) { selected = hit.object === horseBody ? horseIds[hit.instanceId]! : hit.instanceId; pickHandler?.(selected) } }
  if (host) { renderer.domElement.addEventListener('pointerdown', pointerDown); renderer.domElement.addEventListener('pointerup', pointerUp) }
  const centers = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
  function update(c: ArmyConfig, time: number) {
    const path = buildArmyPath(c, time); for (const mesh of batches.values()) mesh.count = 0;
    let dustCount = 0;
    for (let id = 0; id < c.count; id++) {
      soldierPose(c, path, id, time, scratch); const gait = Math.sin(scratch[3]!) * scratch[4]!, role = soldierRole(c, id);
      const mounted = role === 'cavalry';
      rotation.setFromEuler(euler.set(0, scratch[2]!, 0)); mount.compose(position.set(scratch[0]!, 0, scratch[1]!), rotation, scaling.set(1, 1, 1));
      if (mounted) horse(id, scratch[3]! * .8, scratch[4]!);
      rotation.setFromEuler(euler.set(0, scratch[2]!, 0)); base.compose(position.set(scratch[0]!, (mounted ? .95 : 0) + Math.abs(gait) * .015, scratch[1]!), rotation, scaling.set(1, 1, 1));
      paint('body', base, 0, 1.13, 0, .46, .55, .26); body.setColorAt(id, tints[scratch[5]!]!);
      paint('skirt', base, 0, .80, 0, .54, .27, .33); paint('belt', base, 0, .93, .005, .49, .10, .29);
      for (const side of [-1, 1]) paint('strap', base, side * .13, 1.18, .145, .022, .42, .02, 0, 0, side * -.06);
      paint('head', base, 0, 1.57, .006, .15, .2, .145); paint('helmet', base, 0, 1.68, 0, .19, .20, .18); paint('band', base, 0, 1.67, 0, .19, .09, .18); paint('plume', base, 0, 1.92, -.02, .055, .25, .045, -.25);
      for (const side of [-1, 1]) { paint('eyes', base, side * .052, 1.59, .146, .017, .011, .011); paint('arms', base, side * .31, 1.12, .06, .15, .44, .16, -.25 + gait * side * .10); paint('hands', base, side * .34, .91, role === 'flag' && side === 1 ? 0 : .13, .07, .08, .07);
        hip.copy(transform(base, side * (mounted ? .21 : .14), .77, mounted ? .02 : 0, mounted ? -.90 : gait * side * .42, 0, mounted ? side * .45 : 0)); paint('legs', hip, 0, -.145, 0, .15, .28, .18);
        knee.copy(transform(hip, 0, -.29, 0, mounted ? 1.05 : Math.max(0, -gait * side) * .46, 0, mounted ? -side * .40 : 0)); paint('legs', knee, 0, -.15, 0, .14, .28, .16); paint('boots', knee, 0, -.33, .035, .18, .17, .30);
      }
      paint('nose', base, 0, 1.55, .165, .025, .034, .03);
      if (role === 'shield') {
        paint('shield', base, -.43, 1.05, .24, .31, .065, .38, Math.PI / 2); paint('rim', base, -.43, 1.05, .28, .315, .38, 1); paint('boss', base, -.43, 1.05, .30, .075, .075, .055);
        weapon.copy(transform(base, .35, 1.2, .1, -.08)); paint('spear', weapon, 0, .55, 0, .018, 2.1, .018); paint('point', weapon, 0, 1.68, 0, .055, .20, .038);
      } else if (role === 'spear' || role === 'cavalry') {
        weapon.copy(transform(base, .35, 1.22, .12, -.17 - Math.abs(gait) * .025)); paint('spear', weapon, 0, .58, 0, .021, 2.3, .021); paint('point', weapon, 0, 1.83, 0, .058, .24, .043);
      } else if (role === 'bow') {
        paint('bow', base, .07, .92, .14, 1, 1, 1, -.1); paint('string', base, .07, .92, .14, .006, 1, .006, -.1);
        paint('quiver', base, -.10, 1.28, -.24, .095, .47, .095, .15);
        for (let a = -1; a <= 1; a++) { paint('arrows', base, -.1 + a * .04, 1.54, -.24, .009, .60, .009); paint('arrowtips', base, -.1 + a * .04, 1.90, -.24, .025, .12, .022) }
      } else {
        paint('flagpole', base, .38, 1.78, 0, .027, 3.5, .027); paint('finial', base, .38, 3.57, 0, .07, .09, .07);
        paint('banner', base, .38, 2.79, -.425, 1, 1, 1, 0, -Math.PI / 2 + Math.sin(time * 2.2 + id) * .16, Math.sin(time + id) * .04);
      }
      if (c.dust && scratch[4] && id % 4 === 0 && dustCount < 360) { dustPos[dustCount * 3] = scratch[0]! - Math.sin(scratch[2]!) * .42; dustPos[dustCount * 3 + 1] = .22 + Math.abs(Math.sin(time * 2 + id)) * .18; dustPos[dustCount * 3 + 2] = scratch[1]! - Math.cos(scratch[2]!) * .42; dustAlpha[dustCount] = .3 + .7 * Math.abs(Math.sin(time * 1.9 + id)); dustCount++ }
      if (id === selected) { selection.position.set(scratch[0]!, .028, scratch[1]!); selection.scale.setScalar(mounted ? 1.7 : 1) }
    }
    for (const mesh of batches.values()) mesh.instanceMatrix.needsUpdate = true; if (body.instanceColor) body.instanceColor.needsUpdate = true;
    selection.visible = selected >= 0 && selected < c.count;
    const columns = Math.ceil(c.count / c.ranks);
    const hasCavalry = cavalryColumns(c) > 0;
    if (hasCavalry !== labeledCavalry) { labelText(labelContexts[0]!, hasCavalry ? '蛇首 · 前军' : '蛇首 · 盾阵'); labelText(labelContexts[1]!, hasCavalry ? '蛇身 · 步阵' : '蛇身 · 枪阵'); for (let i = 0; i < 2; i++) (labels[i]!.material as THREE.SpriteMaterial).map!.needsUpdate = true; labeledCavalry = hasCavalry }
    for (let i = 0; i < columns; i++) { soldierPose(c, path, i * c.ranks + (c.ranks - 1) / 2, time, scratch); routePoints[i * 3] = scratch[0]!; routePoints[i * 3 + 1] = .021; routePoints[i * 3 + 2] = scratch[1]! }
    routeGeo.setDrawRange(0, columns); routeGeo.attributes.position!.needsUpdate = true; route.visible = c.guides; grid.visible = c.guides;
    for (let i = 0; i < 3; i++) { const col = Math.min(columns - 1, Math.round((columns - 1) * [.10, .5, .90][i]!)); soldierPose(c, path, col * c.ranks + (c.ranks - 1) / 2, time, scratch); centers[i]!.set(scratch[0]!, 1, scratch[1]!); labels[i]!.position.set(scratch[0]!, 4.6, scratch[1]!); labels[i]!.visible = c.labels }
    soldierPose(c, path, Math.max(0, Math.floor((cavalryColumns(c) - 1) / 2)) * c.ranks + (c.ranks - 1) / 2, time, scratch); centers[3]!.set(scratch[0]!, 1.65, scratch[1]!);
    targetMarker.visible = c.guides && c.mode === 'respond'; targetMarker.position.set(0, .022, path.radius * .7);
    if (preset === 'head' || preset === 'body' || preset === 'tail' || preset === 'cavalry') { const center = centers[preset === 'head' ? 0 : preset === 'body' ? 1 : preset === 'tail' ? 2 : 3]!; const liveTarget = controls?.target ?? target; position.copy(center).sub(liveTarget); camera.position.add(position); liveTarget.copy(center); target.copy(center); camera.lookAt(center) }
    for (const label of labels) { const height = camera.position.distanceTo(label.position) * 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 22 / viewportHeight; label.scale.set(height * 4, height, 1) }
    dustGeo.setDrawRange(0, dustCount); dustGeo.attributes.position!.needsUpdate = true; dustGeo.attributes.alpha!.needsUpdate = true;
    controls?.update(); renderer.render(scene, camera);
    return { columns, length: path.length, response: path.response, dustCount };
  }
  function setView(view: ArmyView, c: ArmyConfig, time: number) {
    preset = view; const span = Math.max(formationLength(c) + 20, c.bend * 2 + 25, 32), tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const distance = Math.max(span / (2 * tan * camera.aspect), span * .65) * 1.12;
    target.set(0, 1, c.mode === 'respond' ? span * .12 : 0);
    if (view === 'head' || view === 'body' || view === 'tail' || view === 'cavalry') { const path = buildArmyPath(c, time), columns = Math.ceil(c.count / c.ranks), ratio = view === 'head' ? .1 : view === 'body' ? .5 : .9, col = view === 'cavalry' ? Math.max(0, Math.floor((cavalryColumns(c) - 1) / 2)) : Math.round((columns - 1) * ratio); soldierPose(c, path, col * c.ranks + (c.ranks - 1) / 2, time, scratch); target.set(scratch[0]!, view === 'cavalry' ? 1.65 : 1, scratch[1]!); camera.position.copy(target).add(new THREE.Vector3(8, 6, 12).multiplyScalar(camera.aspect < 1 ? 1.4 : 1)) }
    else camera.position.copy(target).add(view === 'overview' ? new THREE.Vector3(0, distance, .1) : new THREE.Vector3(.17, .64, .75).normalize().multiplyScalar(distance));
    controls?.target.copy(target); camera.lookAt(target); controls?.update(); scene.fog = new THREE.Fog('#b6b59e', Math.max(150, distance * 1.7), Math.max(700, distance * 4));
    const reach = Math.min(700, span * .6 + 25); sun.shadow.camera.left = -reach; sun.shadow.camera.right = reach; sun.shadow.camera.top = reach; sun.shadow.camera.bottom = -reach; sun.shadow.camera.far = Math.max(500, reach * 3); sun.shadow.camera.updateProjectionMatrix();
  }
  function resize(w: number, h: number) { viewportHeight = Math.max(1, h); renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix() }
  function view(): ArmyCamera { return { position: camera.position.toArray(), target: (controls?.target ?? target).toArray(), preset, aspect: camera.aspect } }
  function applyView(v: ArmyCamera, reframe = false) { camera.position.fromArray(v.position); target.fromArray(v.target); if (reframe) camera.position.sub(target).multiplyScalar(Math.max(1, v.aspect / camera.aspect)).add(target); controls?.target.copy(target); preset = v.preset; camera.lookAt(target) }
  function dispose() { controls?.dispose(); renderer.domElement.removeEventListener('pointerdown', pointerDown); renderer.domElement.removeEventListener('pointerup', pointerUp); for (const mesh of batches.values()) mesh.dispose(); new Set(geos).forEach(g => g.dispose()); new Set(mats).forEach(m => m.dispose()); textures.forEach(t => t.dispose()); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove() }
  return { renderer, update, resize, setView, view, applyView, dispose, onPick: (fn: (id: number) => void) => { pickHandler = fn }, clearSelection: () => { selected = -1 } };
}
