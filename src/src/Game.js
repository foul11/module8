//noinspection EqualityComparisonWithCoercionJS

import { Utils } from './Utils';
import { GlitchPass } from './Effects/GlitchPass';
import { Card } from "./Card";
import { CardStack } from "./CardStack";
import { CardPlatform } from "./CardPlatform";

/* hud
function getCanvasScene(width, height){
    //const width = window.innerWidth;
    //const height = window.innerHeight;
    const hud = new OffscreenCanvas(width, height);
    
    const hudCtx = hud.getContext('2d');
    
    //hudCtx.font = "Normal 40px Arial";
    //hudCtx.textAlign = 'center';
    //hudCtx.fillStyle = "rgba(245,245,245,0.75)";
    //hudCtx.fillText('Initializing...', width / 2, height / 2);
    
    const cameraHUD = new THREE.OrthographicCamera(-width/2, width/2, height/2, -height/2, 0, 30);
    const sceneHUD = new THREE.Scene();
    
    const hudTexture = new THREE.Texture(hud);
    hudTexture.needsUpdate = true;
    
    const hudMaterial = new THREE.MeshBasicMaterial({map: hudTexture});
    hudMaterial.transparent = true;
    
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    const plane = new THREE.Mesh(planeGeometry, hudMaterial);
    sceneHUD.add(plane);
    
    return {
        cameraHUD: cameraHUD,
        sceneHUD: sceneHUD,
        hud: hud,
        hudCtx: hudCtx,
    };
}
*/

export class Game{
	constructor(width, height){
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		
		renderer.autoClear = false;
		renderer.setSize(width, height);
		renderer.setAnimationLoop(this.update.bind(this));
		
		const camera3D = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
		const interact3D = new InteractionManager(renderer, camera3D, renderer.domElement);
		const scene3D = new THREE.Scene();
		
		const camera2D = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0, 100);
		const interact2D = new InteractionManager(renderer, camera2D, renderer.domElement);
		const scene2D = new THREE.Scene();
		
		const controls3D = new THREE.OrbitControls(camera3D, renderer.domElement);
		
		camera2D.position.z = 50;
		camera3D.position.z = 1;
		
		this.interact3D = interact3D;
		this.camera3D = camera3D;
		this.scene3D = scene3D;
		
		this.controls3D = controls3D;
		
		this.interact2D = interact2D;
		this.camera2D = camera2D;
		this.scene2D = scene2D;
		
		this.renderer = renderer;
		this.domElement = renderer.domElement;
		
		this.width = width;
		this.height = height;
		
		this.onPreUpdate = [];
		this.onPostUpdate = [];
	}
	
	async init(){
		await Card.init();
		await CardPlatform.init();
	}
	
	async menu(){
		const Tnewgame = await Utils.loadTexture(resource.menucard_newgame);
		const Toption = await Utils.loadTexture(resource.menucard_options);
		const Texit = await Utils.loadTexture(resource.menucard_startscreen);
		const Tbackground = await Utils.loadTexture(resource.startscreen_background_PART4);
		
		const Mnewgame = new THREE.MeshBasicMaterial({ map: Tnewgame });
		const Moption = new THREE.MeshBasicMaterial({ map: Toption });
		const Mexit = new THREE.MeshBasicMaterial({ map: Texit });
		const Mbackground = new THREE.MeshBasicMaterial({ map: Tbackground });
		
		Mbackground.transparent = true;
		Mbackground.opacity = 0.5;
		
		const Gnewgame = new THREE.PlaneGeometry(Tnewgame.source.data.width * 3, Tnewgame.source.data.height * 3);
		const Goption = new THREE.PlaneGeometry(Toption.source.data.width * 3, Toption.source.data.height * 3);
		const Gexit = new THREE.PlaneGeometry(Texit.source.data.width * 3, Texit.source.data.height * 3);
		const Ground = Utils.roundGeometry(this.width / 1.10, this.height / 1.05, 40);
		
		const Pnewgame = new THREE.Mesh(Gnewgame, Mnewgame);
		const Poption = new THREE.Mesh(Goption, Moption);
		const Pexit = new THREE.Mesh(Gexit, Mexit);
		const Pround = new THREE.Mesh(Ground, Mbackground);
		
		Utils.meshAutoUV(Pround);
		
		const debug = new THREE.Scene();
		
		//const clearMask = new THREE.ClearMaskPass();
		//const mask = new THREE.MaskPass(debug, this.camera2D);
		const composer = new THREE.EffectComposer(this.renderer);
		const renderPass = new THREE.RenderPass(debug, this.camera2D);
		const glitchPass = new GlitchPass();
		
		//const effectDotScreen = new THREE.DotScreenPass(new THREE.Vector2(0, 0), 0.5, 0.8);
		//const effectVignette = new THREE.ShaderPass(THREE.VignetteShader);

		//effectVignette.uniforms['offset'].value = 0.95;
		//effectVignette.uniforms['darkness'].value = 1.6;
		
		renderPass.clearColor = new THREE.Color(0, 0, 0);
		renderPass.clearAlpha = 0;
		
		//mask.inverse = true;
		
		renderPass.clear = false;
		glitchPass.goWild = true;
		
		//clearMask.
		
		composer.addPass(renderPass);
		//composer.addPass(mask);
		//composer.addPass(effectDotScreen);
		composer.addPass(glitchPass);
		//composer.addPass(clearMask);
		//composer.addPass(effectVignette);
		
		const composerUpdate = (time) => {
			composer.render();
		}
		
		glitchPass.material.transparent = true;
		
		Pnewgame.position.x = -Tnewgame.source.data.width * 3.5;
		Pexit.position.x = Texit.source.data.width * 3.5;
		Pround.position.x = -this.width / 2.2;
		
		Pnewgame.position.y = -400;
		Poption.position.y = -400;
		Pexit.position.y = -400;
		Pround.position.y = -this.height / 2.1;
		
		Pround.position.z = -1;
		Pnewgame.position.z = 10;
		Poption.position.z = 10;
		Pexit.position.z = 10;
		
		
		debug.add(Pexit);
		
		this.scene2D.add(Pround);
		this.scene2D.add(Pnewgame);
		this.scene2D.add(Poption);
		//this.scene2D.add(Pexit);
		//this.scene2D.add(debug);
		
		
		this.interact2D.add(Pnewgame);
		Pnewgame.addEventListener('click', () => console.log('Start game'));
		this.interact2D.add(Poption);
		Poption.addEventListener('click', () => console.log('Option game'));
		this.interact2D.add(Pexit);
		Pexit.addEventListener('click', () => {
			this.scene2D.remove(Pround);
			this.scene2D.remove(Pnewgame);
			this.scene2D.remove(Poption);
			this.scene2D.remove(debug);
			this.onPostUpdate.splice(this.onPostUpdate.indexOf(composerUpdate), 1);
			
			console.log('Exit game');
		});
		
		this.onPostUpdate.push(composerUpdate);
	}
	
	async fight(){
		const TWoodBase = await Utils.loadTexture(resource.material.wood.baseColor);
		const TWoodNorm = await Utils.loadTexture(resource.material.wood.normalMap);
		const TWoodRoug = await Utils.loadTexture(resource.material.wood.RoughnessMap);
		const TIndoorEnv = await Utils.loadTexture(resource.env.indoor);
		const MWood = new THREE.MeshStandardMaterial({
			map: TWoodBase,
			normalMap: TWoodNorm,
			roughnessMap: TWoodRoug,
			envMap: TIndoorEnv,
			envMapIntensity: 0.5,
			roughness: 0.75,
			normalScale: new THREE.Vector2(0.15, 0.15),
			metalness: 0,
			color: '#ff7c00',
			//emissive: '#ff7c00',
			//emissiveIntensity: 0.2,
		});
		const PTable = (await Utils.loadObj(resource.obj.table)).children[0];
		
		const platform = await (new CardPlatform()).generateMesh(this);
		
		TIndoorEnv.mapping = THREE.EquirectangularReflectionMapping;
		TIndoorEnv.encoding = THREE.sRGBEncoding;
		
		PTable.material = MWood;
		PTable.scale.set(1, 1, 1);
		
		//const spotLight = new THREE.SpotLight(0xff7b00);
		const spotLight = new THREE.SpotLight(0xffac55);
		
		spotLight.position.y = 10;
		spotLight.power = 2;
		spotLight.angle = 20 / 180 * Math.PI;
		spotLight.penumbra = 1;
		
		const board = new THREE.Group();
		
		board.add(PTable);
		PTable.add(spotLight);
		PTable.add(platform);
		//PTable.add(cardStack.group);
		//PTable.add(cardStackSq.group);
		
		new THREE.Object3D(123);
		
		this.scene3D.add(board);
	}
	
	async generateCard(){
	
	}
	
	async setFight(){
	
	}
	
	async setMap(){
	
	}
	
	testCube(){
		const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
		//const materialBasic = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5 });
		const materialNormal = new THREE.MeshNormalMaterial();
		
		const mesh = new THREE.Mesh(geometry, materialNormal);
		
		mesh.material.wireframe = true;
		mesh.position.y = 0.12;
		
		this.scene3D.add(mesh);
		this.interact3D.add(mesh);
		
		mesh.addEventListener('mouseover', (e) => {
			mesh.material.wireframe = false;
		});
		mesh.addEventListener('mouseout', (e) => {
			mesh.material.wireframe = true;
		});
		
		this.onPreUpdate.push((time) => {
			mesh.rotation.x = time / 2000;
			mesh.rotation.y = time / 1000;
		});
	}
	
	async update(time){
		this.onPreUpdate.forEach((func) => {
			if(func instanceof Function)
				func.call(this, ...arguments);
		});
		
		//hudCtx.clearRect(0, 0, width, height);
		//hudCtx.fillText('RAD [' + Date.now() + ']', width / 2, height / 2);
		//hudTexture.needsUpdate = true;
		
		this.controls3D.update();
		//this.renderer.clear();
		
		this.renderer.render(this.scene3D, this.camera3D);
		this.renderer.render(this.scene2D, this.camera2D);
		
		this.interact2D.update();
		this.interact3D.update();
		
		this.onPostUpdate.forEach((func) => {
			if(func instanceof Function)
				func.call(this, ...arguments);
		});
		
		//if(this.onUpdate instanceof Function)
		//    this.onUpdate.call(this, ...arguments);
	}
	
	updateSize(width, height){
		this.renderer.setSize(width, height);
		this.camera3D.aspect = (width / height);
		this.camera3D.updateProjectionMatrix();
	}
}