import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './style.css';

const projects = [
  {title:'Chrome Reverie',type:'Abstract Sculpture',year:'2026',shape:'torus',color:0xa57bff,description:'A sculptural study of reflective surfaces, movement, and light.'},
  {title:'Orbit / 01',type:'Product Visualization',year:'2026',shape:'icosa',color:0x7e52e9,description:'An experimental product concept inspired by orbital geometry.'},
  {title:'Soft Geometry',type:'3D Exploration',year:'2025',shape:'knot',color:0xd5a0ff,description:'Organic forms and gentle gradients in three-dimensional space.'},
];

const app = document.querySelector('#app');
app.innerHTML = `
<header class="nav"><a class="brand" href="#home"><span class="brand-symbol">✳</span> NOIR<span class="violet">/</span>VIOLET<span class="brand-caption">3D ARTIST PORTFOLIO</span></a><nav><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></nav><a class="nav-cta" href="#work">Explore work <span>↗</span></a></header>
<main>
<section class="hero" id="home"><div class="hero-glow"></div><div class="hero-copy"><div class="eyebrow"><span class="live-dot"></span> INDEPENDENT 3D ARTIST · AVAILABLE FOR PROJECTS</div><h1>SHAPING<br/>THE <em>UNSEEN.</em></h1><p>Crafting immersive digital worlds, expressive forms, and visual experiences beyond the ordinary.</p><div class="hero-actions"><a class="primary-btn" href="#work">Explore my work <span>↗</span></a><a class="text-btn" href="#about">More about me <span>↘</span></a></div></div><div class="hero-art" id="hero-art" aria-label="Animated abstract 3D sculpture"></div><div class="hero-bottom"><span>SCROLL TO EXPLORE <span class="down">↓</span></span><span>DESIGN · MOTION · DIMENSION</span><span>01 / 03</span></div></section>
<section class="work-section" id="work"><div class="section-top"><div><div class="kicker">01 / SELECTED WORKS</div><h2>FEATURED <em>PROJECTS.</em></h2></div><p>A collection of experiments in form, texture, and imagination. Replace these demos with your own creations.</p></div><div class="project-grid" id="project-grid"></div><div class="upload-note"><span>✦</span><div><strong>Have your own 3D models?</strong><p>Preview your .glb or .gltf model locally using the viewer below. To publish it permanently, add the model to the repository.</p></div></div></section>
<section class="viewer-section" id="viewer"><div class="section-top"><div><div class="kicker">02 / INTERACTIVE EXPERIENCE</div><h2>TAKE A <em>CLOSER LOOK.</em></h2></div><p>Drag to rotate. Scroll to zoom. Experience the details from every angle.</p></div><div class="viewer-layout"><div class="viewer-stage" id="viewer-stage"><span class="viewer-badge">● LIVE 3D VIEWER</span><span class="viewer-help">DRAG TO ROTATE · SCROLL TO ZOOM</span></div><aside class="viewer-info"><div class="kicker">MODEL EXPLORER</div><h3 id="viewer-title">Chrome Reverie</h3><p id="viewer-description">A sculptural study of reflective surfaces, movement, and light.</p><div class="viewer-controls"><label for="model-choice">SELECT DEMO MODEL</label><select id="model-choice"><option value="0">Chrome Reverie</option><option value="1">Orbit / 01</option><option value="2">Soft Geometry</option></select><label for="model-file">PREVIEW YOUR OWN MODEL</label><input type="file" id="model-file" accept=".glb,.gltf"/><small>Best support: self-contained .glb files. File stays in your browser; it is not uploaded to a server.</small><button id="reset-view" class="outline-btn">Reset camera ↺</button></div></aside></div></section>
<section class="about-section" id="about"><div><div class="kicker">03 / THE ARTIST</div><h2>CREATIVE BY<br/><em>DESIGN.</em></h2></div><div class="about-content"><p class="about-lead">Hi, I'm <span class="violet">Your Name</span> — a 3D artist creating visuals that sit between art and technology.</p><p>I explore the intersection of design, digital sculpture, and motion. Every project is an opportunity to create something unexpected. Customize this introduction with your own story.</p><div class="skill-tags"><span>BLENDER</span><span>3D MODELING</span><span>TEXTURING</span><span>RENDERING</span><span>MOTION DESIGN</span></div></div></section>
<section class="contact-section" id="contact"><div class="kicker">04 / LET'S CONNECT</div><h2>HAVE A PROJECT<br/>IN <em>MIND?</em></h2><p>Let's turn your next idea into something extraordinary.</p><a class="primary-btn" href="mailto:yourname@example.com?subject=Portfolio%20Inquiry">Get in touch ↗</a><div class="contact-hint">Update the contact email in src/main.js before publishing.</div></section>
</main><footer><span>✳ NOIR/VIOLET</span><span>MADE FOR THE THIRD DIMENSION</span><a href="#home">BACK TO TOP ↑</a></footer>`;

const grid = document.querySelector('#project-grid');
projects.forEach((project,index)=>{
 const card=document.createElement('article');card.className='project-card';
 card.innerHTML=`<div class="project-canvas" id="project-${index}"><span class="project-index">0${index+1} / 03</span><span class="project-arrow">↗</span></div><div class="project-meta"><div><h3>${project.title}</h3><p>${project.type}</p></div><span>${project.year}</span></div>`;
 card.addEventListener('click',()=>{document.querySelector('#model-choice').value=String(index);setViewerModel(index);document.querySelector('#viewer').scrollIntoView({behavior:'smooth'});});
 grid.appendChild(card);
});

const scenes=[];
function geometryFor(shape){if(shape==='torus')return new THREE.TorusKnotGeometry(1.12,.35,180,24,2,5);if(shape==='icosa')return new THREE.IcosahedronGeometry(1.45,2);return new THREE.TorusKnotGeometry(1,.42,160,22,3,7);}
function makeScene(element,shape,color,interactive=false){
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(40,1,.1,100);camera.position.set(0,0,interactive?5.8:5.5);
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;element.appendChild(renderer.domElement);
 scene.add(new THREE.AmbientLight(0xa994ff,1.5));const light=new THREE.PointLight(0xa75cff,90);light.position.set(3,4,4);scene.add(light);const rim=new THREE.PointLight(0x4a36e9,70);rim.position.set(-4,-2,-3);scene.add(rim);
 const material=new THREE.MeshPhysicalMaterial({color,metalness:.65,roughness:.19,clearcoat:1,clearcoatRoughness:.12});const mesh=new THREE.Mesh(geometryFor(shape),material);scene.add(mesh);
 const entry={element,scene,camera,renderer,mesh,controls:null,object:mesh};
 if(interactive){const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.autoRotate=true;controls.autoRotateSpeed=.7;controls.enablePan=false;controls.minDistance=2;controls.maxDistance=12;entry.controls=controls;}
 scenes.push(entry);return entry;
}
const hero=makeScene(document.querySelector('#hero-art'),'torus',0x8c62f5);hero.mesh.scale.setScalar(1.3);
projects.forEach((p,i)=>makeScene(document.querySelector(`#project-${i}`),p.shape,p.color));
const viewer=makeScene(document.querySelector('#viewer-stage'),projects[0].shape,projects[0].color,true);
function setViewerModel(index){const p=projects[index];viewer.scene.remove(viewer.object);viewer.object=new THREE.Mesh(geometryFor(p.shape),new THREE.MeshPhysicalMaterial({color:p.color,metalness:.65,roughness:.18,clearcoat:1}));viewer.scene.add(viewer.object);viewer.controls.target.set(0,0,0);viewer.camera.position.set(0,0,5.8);viewer.controls.update();document.querySelector('#viewer-title').textContent=p.title;document.querySelector('#viewer-description').textContent=p.description;}
document.querySelector('#model-choice').addEventListener('change',e=>setViewerModel(Number(e.target.value)));
document.querySelector('#reset-view').addEventListener('click',()=>{viewer.camera.position.set(0,0,5.8);viewer.controls.target.set(0,0,0);viewer.controls.update();});
const loader=new GLTFLoader();document.querySelector('#model-file').addEventListener('change',e=>{const file=e.target.files?.[0];if(!file)return;const url=URL.createObjectURL(file);loader.load(url,gltf=>{viewer.scene.remove(viewer.object);viewer.object=gltf.scene;viewer.scene.add(viewer.object);const bounds=new THREE.Box3().setFromObject(viewer.object);const center=bounds.getCenter(new THREE.Vector3());const size=bounds.getSize(new THREE.Vector3()).length();viewer.object.position.sub(center);viewer.camera.position.set(0,0,Math.max(3,size*1.4));viewer.controls.target.set(0,0,0);viewer.controls.update();document.querySelector('#viewer-title').textContent=file.name;document.querySelector('#viewer-description').textContent='Your local 3D model preview. To publish this model, place it in public/models and reference it in your project code.';URL.revokeObjectURL(url);},undefined,err=>{console.error(err);alert('Could not load model. Please use a self-contained .glb file.');URL.revokeObjectURL(url);});});
function resize(entry){const w=entry.element.clientWidth,h=entry.element.clientHeight;if(!w||!h)return;if(entry.renderer.domElement.width!==Math.floor(w*Math.min(devicePixelRatio,2))||entry.renderer.domElement.height!==Math.floor(h*Math.min(devicePixelRatio,2))){entry.renderer.setSize(w,h,false);entry.camera.aspect=w/h;entry.camera.updateProjectionMatrix();}}
let previous=0;function tick(time){requestAnimationFrame(tick);const dt=Math.min((time-previous)/1000,.05);previous=time;scenes.forEach((entry,i)=>{resize(entry);if(entry.controls){entry.controls.update();}else{entry.mesh.rotation.y+=dt*(i===0?.25:.35);entry.mesh.rotation.x+=dt*.1;}entry.renderer.render(entry.scene,entry.camera);});}requestAnimationFrame(tick);
