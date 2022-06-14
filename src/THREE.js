import * as THREE from 'three';
import { InteractionManager } from 'three.interactive';
// import extern_3dobject_callback from './src_three/extern_3dobject_callback';

window.THREE = THREE;
window.InteractionManager = InteractionManager;

// extern_3dobject_callback(window.THREE);

function requireAll(r) {
	// console.log(r.keys());
	
	r.keys().forEach((...a) => {
		const module = r(...a);
		
		for(let i in module){
			if(!window.THREE[i])
				window.THREE[i] = module[i];
			// console.log(module[i]);
		}
	});
};

requireAll(require.context('./node_modules/three/examples/jsm/postprocessing', true, /\.js$/));
requireAll(require.context('./node_modules/three/examples/jsm/shaders', true, /\.js$/));
requireAll(require.context('./node_modules/three/examples/jsm/loaders', false, /\.js$/));
requireAll(require.context('./node_modules/three/examples/jsm/geometries', false, /\.js$/));
requireAll(require.context('./node_modules/three/examples/jsm/controls', true, /\.js$/));

window.THREE._FontLoader = require('./node_modules/three/examples/jsm/loaders/FontLoader.js').FontLoader;
window.THREE._Font = require('./node_modules/three/examples/jsm/loaders/FontLoader.js').Font;
window.THREE._TextGeometry = require('./node_modules/three/examples/jsm/geometries/TextGeometry.js').TextGeometry;
// console.log();
