
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import './style.css';

// ============================================
// PROJECTS
// Add your future 3D works here.
// ============================================

const projects = [
  {
    title: 'Pixel Black Cat',
    type: 'Voxel 3D Character',
    year: '2026',
    shape: 'icosa',
    color: 0x9b5cff,
    model: '/models/pixel-black-cat.glb',
    description:
      'A cute pixelated black cat with glowing green eyes, pink ears, and a purple collar.'
  },
  {
    title: 'Violet Sculpture',
    type: '3D Abstract Art',
    year: '2026',
    shape: 'torus',
    color: 0xa57bff,
    model: '/models/violet-sculpture.glb',
    description:
      'A futuristic purple 3D sculpture inspired by flowing geometric forms.'
  },
  {
    title: 'Orbit / 01',
    type: 'Product Visualization',
    year: '2026',
    shape: 'icosa',
    color: 0x7e52e9,
    description:
      'An experimental product concept inspired by orbital geometry.'
  },
  {
    title: 'Soft Geometry',
    type: '3D Exploration',
    year: '2025',
    shape: 'knot',
    color: 0xd5a0ff,
    description:
      'Organic forms and gentle gradients in three-dimensional space.'
  }
];

// ============================================
// WEBSITE LAYOUT
// ============================================

const app = document.querySelector('#app');

app.innerHTML = `
<header class="nav">
  <a class="brand" href="#home">
    <span class="brand-symbol">✳</span>
    NOIR<span class="violet">/</span>VIOLET
    <span class="brand-caption">3D ARTIST PORTFOLIO</span>
  </a>

  <nav>
    <a href="#work">Work</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>

  <a class="nav-cta" href="#work">
    Explore work ↗
  </a>
</header>

<main>

  <section class="hero" id="home">
    <div class="hero-glow"></div>

    <div class="hero-copy">
      <div class="eyebrow">
        <span class="live-dot"></span>
        INDEPENDENT 3D ARTIST · AVAILABLE FOR PROJECTS
      </div>

      <h1>
        SHAPING<br>
        THE <em>UNSEEN.</em>
      </h1>

      <p>
        Crafting immersive digital worlds,
        expressive forms, and visual experiences
        beyond the ordinary.
      </p>

      <div class="hero-actions">
        <a class="primary-btn" href="#work">
          Explore my work ↗
        </a>

        <a class="text-btn" href="#about">
          More about me ↘
        </a>
      </div>
    </div>

    <div class="hero-art" id="hero-art"></div>

    <div class="hero-bottom">
      <span>SCROLL TO EXPLORE ↓</span>
      <span>DESIGN · MOTION · DIMENSION</span>
      <span>01 / 04</span>
    </div>
  </section>

  <section class="work-section" id="work">
    <div class="section-top">
      <div>
        <div class="kicker">01 / SELECTED WORKS</div>
        <h2>FEATURED <em>PROJECTS.</em></h2>
      </div>

      <p>
        A collection of experiments in form,
        texture, and imagination.
      </p>
    </div>

    <div class="project-grid" id="project-grid"></div>

    <div class="upload-note">
      <span>✦</span>

      <div>
        <strong>Explore interactive 3D projects</strong>
        <p>
          Select any project to inspect its 3D model.
          You can also preview your own GLB file below.
        </p>
      </div>
    </div>
  </section>

  <section class="viewer-section" id="viewer">
    <div class="section-top">
      <div>
        <div class="kicker">
          02 / INTERACTIVE EXPERIENCE
        </div>

        <h2>TAKE A <em>CLOSER LOOK.</em></h2>
      </div>

      <p>Drag to rotate. Scroll to zoom.</p>
    </div>

    <div class="viewer-layout">

      <div class="viewer-stage" id="viewer-stage">
        <span class="viewer-badge">
          ● LIVE 3D VIEWER
        </span>

        <span class="viewer-help">
          DRAG TO ROTATE · SCROLL TO ZOOM
        </span>
      </div>

      <aside class="viewer-info">
        <div class="kicker">MODEL EXPLORER</div>

        <h3 id="viewer-title">
          Pixel Black Cat
        </h3>

        <p id="viewer-description">
          Explore the selected 3D model.
        </p>

        <div class="viewer-controls">

          <label for="model-choice">
            SELECT 3D PROJECT
          </label>

          <select id="model-choice"></select>

          <label for="model-file">
            PREVIEW YOUR OWN MODEL
          </label>

          <input
            type="file"
            id="model-file"
            accept=".glb,.gltf"
          />

          <small>
            Recommended format: GLB.
            Local previews are not permanently uploaded.
          </small>

          <button
            id="reset-view"
            class="outline-btn"
          >
            Reset camera ↺
          </button>

        </div>
      </aside>

    </div>
  </section>

  <section class="about-section" id="about">

    <div>
      <div class="kicker">03 / THE ARTIST</div>

      <h2>
        CREATIVE BY<br>
        <em>DESIGN.</em>
      </h2>
    </div>

    <div class="about-content">

      <p class="about-lead">
        Hi, I'm
        <span class="violet">Your Name</span>
        — a 3D artist creating visuals that sit
        between art and technology.
      </p>

      <p>
        I explore the intersection of design,
        digital sculpture, and motion.
      </p>

      <div class="skill-tags">
        <span>BLENDER</span>
        <span>3D MODELING</span>
        <span>TEXTURING</span>
        <span>RENDERING</span>
        <span>MOTION DESIGN</span>
      </div>

    </div>
  </section>

  <section class="contact-section" id="contact">

    <div class="kicker">
      04 / LET'S CONNECT
    </div>

    <h2>
      HAVE A PROJECT<br>
      IN <em>MIND?</em>
    </h2>

    <p>
      Let's turn your next idea into something extraordinary.
    </p>

    <a
      class="primary-btn"
      href="mailto:yourname@example.com"
    >
      Get in touch ↗
    </a>

  </section>

</main>

<footer>
  <span>✳ NOIR/VIOLET</span>
  <span>MADE FOR THE THIRD DIMENSION</span>
  <a href="#home">BACK TO TOP ↑</a>
</footer>
`;

// ============================================
// 3D SETUP
// ============================================

const loader = new GLTFLoader();
const scenes = [];

function geometryFor(shape) {
  if (shape === 'torus') {
    return new THREE.TorusKnotGeometry(
      1.12, 0.35, 180, 24, 2, 5
    );
  }

  if (shape === 'icosa') {
    return new THREE.IcosahedronGeometry(1.45, 2);
  }

  return new THREE.TorusKnotGeometry(
    1, 0.42, 160, 22, 3, 7
  );
}

function createMaterial(color) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.65,
    roughness: 0.19,
    clearcoat: 1,
    clearcoatRoughness: 0.12
  });
}

function makeScene(element, shape, color, interactive = false) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    40, 1, 0.1, 1000
  );

  camera.position.set(0, 0, 5.8);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(1, 1);

  element.appendChild(renderer.domElement);

  scene.add(
    new THREE.AmbientLight(0xa994ff, 1.5)
  );

  const light = new THREE.PointLight(
    0xa75cff, 90
  );

  light.position.set(3, 4, 4);
  scene.add(light);

  const rim = new THREE.PointLight(
    0x4a36e9, 70
  );

  rim.position.set(-4, -2, -3);
  scene.add(rim);

  const mesh = new THREE.Mesh(
    geometryFor(shape),
    createMaterial(color)
  );

  scene.add(mesh);

  const entry = {
    element,
    scene,
    camera,
    renderer,
    mesh,
    object: mesh,
    controls: null,
    requestId: 0,
    width: 0,
    height: 0,
    animated: !interactive
  };

  if (interactive) {
    const controls = new OrbitControls(
      camera,
      renderer.domElement
    );

    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.7;
    controls.enablePan = false;
    controls.minDistance = 1;
    controls.maxDistance = 30;

    entry.controls = controls;
  }

  scenes.push(entry);

  return entry;
}

// ============================================
// CENTER AND FIT GLB MODELS
// ============================================

function fitModel(model, targetSize = 2.7) {
  model.updateMatrixWorld(true);

  const bounds = new THREE.Box3().setFromObject(model);

  if (bounds.isEmpty()) {
    return model;
  }

  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());

  const maxDimension = Math.max(
    size.x, size.y, size.z
  );

  if (maxDimension <= 0) {
    return model;
  }

  const scale = targetSize / maxDimension;

  // A parent group keeps model transforms intact.
  const group = new THREE.Group();

  model.position.set(0, 0, 0);
  group.add(model);

  group.scale.setScalar(scale);
  group.position.copy(center).multiplyScalar(-scale);

  // Recalculate after scaling.
  group.updateMatrixWorld(true);

  const finalBox = new THREE.Box3().setFromObject(group);
  const finalCenter = finalBox.getCenter(new THREE.Vector3());

  group.position.sub(finalCenter);

  return group;
}

// ============================================
// REPLACE SCENE OBJECT
// ============================================

function replaceObject(entry, object) {
  if (entry.object) {
    entry.scene.remove(entry.object);
  }

  entry.object = object;
  entry.scene.add(object);
}

// ============================================
// LOAD PROJECT MODEL
// ============================================

function loadProject(entry, project, onComplete, onError) {
  const requestId = ++entry.requestId;

  if (!project.model) {
    const mesh = new THREE.Mesh(
      geometryFor(project.shape),
      createMaterial(project.color)
    );

    replaceObject(entry, mesh);

    if (onComplete) onComplete();

    return;
  }

  loader.load(
    project.model,

    (gltf) => {
      if (requestId !== entry.requestId) {
        return;
      }

      const model = fitModel(gltf.scene);

      replaceObject(entry, model);

      if (onComplete) onComplete();
    },

    undefined,

    (error) => {
      if (requestId !== entry.requestId) {
        return;
      }

      console.error(
        `Failed to load ${project.model}`,
        error
      );

      // Show a fallback 3D shape.
      const fallback = new THREE.Mesh(
        geometryFor(project.shape),
        createMaterial(project.color)
      );

      replaceObject(entry, fallback);

      if (onError) onError(error);
    }
  );
}

// ============================================
// HERO 3D OBJECT
// ============================================

const hero = makeScene(
  document.querySelector('#hero-art'),
  'torus',
  0x8c62f5
);

hero.mesh.scale.setScalar(1.3);

// ============================================
// PROJECT GALLERY
// ============================================

const grid = document.querySelector('#project-grid');

const projectEntries = [];

projects.forEach((project, index) => {
  const card = document.createElement('article');

  card.className = 'project-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');

  card.setAttribute(
    'aria-label',
    `View ${project.title} in 3D`
  );

  card.innerHTML = `
    <div
      class="project-canvas"
      id="project-${index}"
    >
      <span class="project-index">
        ${String(index + 1).padStart(2, '0')}
        / ${String(projects.length).padStart(2, '0')}
      </span>

      <span class="project-arrow">↗</span>
    </div>

    <div class="project-meta">
      <div>
        <h3>${project.title}</h3>
        <p>${project.type}</p>
      </div>

      <span>${project.year}</span>
    </div>
  `;

  grid.appendChild(card);

  const entry = makeScene(
    document.querySelector(`#project-${index}`),
    project.shape,
    project.color
  );

  projectEntries.push(entry);

  loadProject(entry, project, null, () => {
    console.warn(
      `Gallery preview unavailable: ${project.title}`
    );
  });

  const openProject = () => {
    document.querySelector('#model-choice').value =
      String(index);

    setViewerModel(index);

    document.querySelector('#viewer').scrollIntoView({
      behavior: 'smooth'
    });
  };

  card.addEventListener('click', openProject);

  card.addEventListener('keydown', (event) => {
    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      openProject();
    }
  });
});

// ============================================
// INTERACTIVE 3D VIEWER
// ============================================

const viewer = makeScene(
  document.querySelector('#viewer-stage'),
  projects[0].shape,
  projects[0].color,
  true
);

const modelChoice = document.querySelector('#model-choice');
const viewerTitle = document.querySelector('#viewer-title');
const viewerDescription =
  document.querySelector('#viewer-description');

projects.forEach((project, index) => {
  const option = document.createElement('option');

  option.value = String(index);
  option.textContent = project.title;

  modelChoice.appendChild(option);
});

function resetCamera() {
  viewer.camera.position.set(0, 0, 5.8);

  viewer.controls.target.set(0, 0, 0);

  viewer.controls.update();
}

function setViewerModel(index) {
  const project = projects[index];

  if (!project) return;

  modelChoice.value = String(index);

  viewerTitle.textContent = project.title;

  viewerDescription.textContent =
    'Loading 3D model...';

  resetCamera();

  loadProject(
    viewer,
    project,

    () => {
      viewerDescription.textContent =
        project.description;

      resetCamera();
    },

    () => {
      viewerDescription.textContent =
        'The 3D file could not be loaded. ' +
        'Showing a demo shape instead. ' +
        'Check the model path in public/models/.';
    }
  );
}

modelChoice.addEventListener('change', (event) => {
  setViewerModel(Number(event.target.value));
});

document.querySelector('#reset-view')
  .addEventListener('click', resetCamera);

// ============================================
// PREVIEW LOCAL GLB FILES
// ============================================

const modelFileInput =
  document.querySelector('#model-file');

modelFileInput.addEventListener('change', (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const fileName = file.name.toLowerCase();

  if (!fileName.endsWith('.glb')) {
    alert(
      'Please choose a self-contained .glb file. ' +
      'Separate .gltf dependencies are not supported ' +
      'by this local preview.'
    );
    return;
  }

  const url = URL.createObjectURL(file);
  const requestId = ++viewer.requestId;

  viewerTitle.textContent = file.name;
  viewerDescription.textContent =
    'Loading your local model...';

  loader.load(
    url,

    (gltf) => {
      URL.revokeObjectURL(url);

      if (requestId !== viewer.requestId) {
        return;
      }

      const model = fitModel(gltf.scene);

      replaceObject(viewer, model);

      viewerDescription.textContent =
        'Local 3D preview. This model is not ' +
        'permanently uploaded to the website.';

      resetCamera();
    },

    undefined,

    (error) => {
      URL.revokeObjectURL(url);

      if (requestId !== viewer.requestId) {
        return;
      }

      console.error(error);

      viewerDescription.textContent =
        'Unable to load the selected file.';

      alert(
        'Could not load the 3D model. ' +
        'Try exporting it as a GLB file.'
      );
    }
  );
});

// ============================================
// RESPONSIVE CANVAS RESIZING
// ============================================

function resize(entry) {
  const width = entry.element.clientWidth;
  const height = entry.element.clientHeight;

  if (!width || !height) return;

  if (
    width === entry.width &&
    height === entry.height
  ) {
    return;
  }

  entry.width = width;
  entry.height = height;

  entry.renderer.setSize(width, height, false);

  entry.camera.aspect = width / height;
  entry.camera.updateProjectionMatrix();
}

// ============================================
// ANIMATION LOOP
// ============================================

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = Math.min(clock.getDelta(), 0.05);

  scenes.forEach((entry, index) => {
    resize(entry);

    if (entry.controls) {
      entry.controls.update();
    } else if (entry.object) {
      entry.object.rotation.y +=
        delta * (index === 0 ? 0.25 : 0.35);

      entry.object.rotation.x +=
        delta * 0.1;
    }

    entry.renderer.render(
      entry.scene,
      entry.camera
    );
  });
}

// ============================================
// INITIALIZE WEBSITE
// ============================================

setViewerModel(0);

animate();
