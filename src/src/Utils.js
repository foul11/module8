

export class Utils{
	static ALIGN = {
		left: 0,
		center: 1,
		right: 2,
	}
	
	static loadTexture(url){
		return new Promise((resolve, reject) => {
			(new THREE.TextureLoader()).load(url, resolve, undefined, reject);
		});
	}
	
	static loadObj(url){
		return new Promise((resolve, reject) => {
			(new THREE.OBJLoader()).load(url, resolve, undefined, reject);
		});
	}
	
	static loadTTF(url){
		return new Promise((resolve, reject) => {
			(new THREE.TTFLoader()).load(url, (json) => {
				resolve(new THREE._Font(json));
			}, undefined, reject);
		});
	}
	
	static loadFont(url){
		return new Promise((resolve, reject) => {
			(new THREE._FontLoader()).load(url, resolve, undefined, reject);
		});
	}
	
	static roundGeometry(width, height, radius){
		let shape = new THREE.Shape();
		
		shape.moveTo(0, 0 + radius);
		shape.lineTo(0, 0 + height - radius);
		shape.quadraticCurveTo(0, 0 + height, 0 + radius, 0 + height);
		shape.lineTo(0 + width - radius, 0 + height);
		shape.quadraticCurveTo(0 + width, 0 + height, 0 + width, 0 + height - radius);
		shape.lineTo(0 + width, 0 + radius);
		shape.quadraticCurveTo(0 + width, 0, 0 + width - radius, 0);
		shape.lineTo(0 + radius, 0);
		shape.quadraticCurveTo(0, 0, 0, 0 + radius);
		
		return new THREE.ShapeBufferGeometry(shape);
	}
	
	static meshAutoUV(mesh){
		const box = new THREE.Box3().setFromObject(mesh);
		const size = new THREE.Vector3();
		
		box.getSize(size);
		
		const vec3 = new THREE.Vector3();
		const attPos = mesh.geometry.attributes.position;
		const attUv = mesh.geometry.attributes.uv;
		for(let i = 0; i < attPos.count; i++){
			vec3.fromBufferAttribute(attPos, i);
			attUv.setXY(i,
				(vec3.x - box.min.x) / size.x,
				(vec3.y - box.min.y) / size.y
			);
		}
	}
	
	static mixMaterials(m1, m2, parms = {}){
		return new THREE.ShaderMaterial(Object.assign({
			uniforms: {
				tOne: {type: "t", value: m1},
				tSec: {type: "t", value: m2},
			},
			vertexShader: `
                varying vec2 vUv;
    
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
			fragmentShader: `
                uniform sampler2D tOne;
                uniform sampler2D tSec;
            
                varying vec2 vUv;
                
                void main(void) {
                    vec3 c;
                    vec4 Ca = texture2D(tOne, vUv);
                    vec4 Cb = texture2D(tSec, vUv);
                    
                    c = Ca.rgb * Ca.a + Cb.rgb * Cb.a * (1.0 - Ca.a);
                    
                    gl_FragColor = vec4(c, 1.0);
                }
		    `,
		}, parms));
	}
	
	static newRenderTargetFromTexture(renderer, texture, parms = {}){
		const ret = new THREE.WebGLRenderTarget(texture.image.width, texture.image.height, { minFilter: THREE.NearestFilter,
			magFilter: THREE.NearestFilter, format: THREE.RGBAFormat });
		
		renderer.setRenderTarget(ret);
		renderer.render(new THREE.Mesh(new THREE.PlaneGeometry(), new THREE.MeshBasicMaterial(Object.assign({ map: texture, transparent: true }, parms))), new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1, 1));
		renderer.setRenderTarget(null);
		
		return ret;
	}
	
	static TextureForRenderTarget(renderer, renderTarget, vector4, texture, parms = {}){
		const mesh = new THREE.Mesh(new THREE.PlaneGeometry(vector4.z - vector4.x, vector4.w - vector4.y), new THREE.MeshBasicMaterial(Object.assign({ map: texture, transparent: true }, parms)));
		const cam = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1, 1);
		
		mesh.position.x = -0.5 + (vector4.z - vector4.x) / 2 + vector4.x;
		mesh.position.y = 0.5 -  (vector4.w - vector4.y) / 2 - vector4.y;
		
		mesh.updateMatrixWorld();
		
		renderer.setRenderTarget(renderTarget);
		renderer.render(mesh, cam);
		renderer.setRenderTarget(null);
	}
	
	static TextForRenderTarget(renderer, renderTarget, vector3, text, font, size, parms = {}){
		const mesh = new THREE.Mesh(new THREE.ShapeGeometry(font.generateShapes(text, size)), new THREE.MeshBasicMaterial(Object.assign({ color: '#fff', transparent: true }, parms)));
		const cam = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1, 1);
		
		mesh.geometry.computeBoundingBox();
		
		switch(vector3.z){
			case this.ALIGN.left:
				mesh.position.x = -0.5 + vector3.x;
				mesh.position.y = 0.5 - (mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y) * 0.5 - vector3.y;
				break;
				
			case this.ALIGN.center:
				mesh.position.x = -0.5 - (mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x) * 0.5 + vector3.x;
				mesh.position.y = 0.5 - (mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y) * 0.5 - vector3.y;
				break;
				
			case this.ALIGN.right:
				mesh.position.x = -0.5 - (mesh.geometry.boundingBox.max.x + mesh.geometry.boundingBox.min.x) + vector3.x;
				mesh.position.y = 0.5 - (mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y) * 0.5 - vector3.y;
				break;
		}
		
		mesh.updateMatrixWorld();
		
		renderer.setRenderTarget(renderTarget);
		renderer.render(mesh, cam);
		renderer.setRenderTarget(null);
	}
	
	static arrayRandomEl(array){
		return array[Math.floor(Math.random() * array.length)];
	}
	
	static objectRandomEl(object){
		const keys = Object.keys(object);
		return object[keys[Math.floor(Math.random() * keys.length)]];
	}
}