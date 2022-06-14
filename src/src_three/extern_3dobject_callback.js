
export default function(THREE){
	const constr = THREE.Object3D.constructor;
	
	THREE.Object3D.constructor = function(...a){
		console.log(a);
		constr(...a);
	}
	
	console.log(THREE.Object3D);
}