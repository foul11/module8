window.resource = {};

function basename(path){
	return path.split(/[\\/]/).pop();
}

function strip_extension(str){
	return str.substr(0, str.lastIndexOf('.'));
}

function requireAll(namespace, r, callback = null){
	let module_link = window.resource;
	
	if(namespace.length)
		for(let i of namespace.split('.')){
			if(module_link[i] === undefined)
				module_link[i] = {};
			
			module_link = module_link[i];
		}
	
	r.keys().forEach((...a) => {
		const module = r(...a);
		
		if(callback instanceof Function){
			callback(module, module_link, ...a);
		}else
			module_link[strip_extension(basename(a[0]))] = module;
	});
};

requireAll('', require.context('../img/', false, /\.(png|jpe?g)$/));
requireAll('ico', require.context('../img/Ico', false, /\.(png|jpe?g)$/), (module, namespace, fileName) => {
	let parse = /^(.+?)(_emission)?$/.exec(strip_extension(basename(fileName)));
	
	if(namespace[parse[1]] === undefined)
		namespace[parse[1]] = {};
	
	if(parse[2] && parse[2].length)
		namespace[parse[1]].emission = module;
	else
		namespace[parse[1]].albedo = module;
});

window.resource.material = {};

window.resource.material.wood = {
	'baseColor': require('../img/Materials/Wood/Wood062_1K_Color.jpg'),
	'normalMap': require('../img/Materials/Wood/Wood062_1K_NormalGL.jpg'),
	'RoughnessMap': require('../img/Materials/Wood/Wood062_1K_Roughness.jpg'),
};


window.resource.env = {};

window.resource.env.indoor = require('../img/env/IndoorHDRI001_4K-TONEMAPPED.jpg');


window.resource.obj = {};

window.resource.obj.table = require('../img/Obj/table.obj');


window.resource.font = {};

window.resource.font.heavyweight = require('../fonts/HEAVYWEIGHT.ttf');
window.resource.font.umbrace = require('../fonts/UMBRAGE.ttf');
window.resource.font.vicioushunger = require('../fonts/VICIOUSHUNGER.ttf');