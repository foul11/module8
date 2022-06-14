import { Utils } from './Utils';

//noinspection JSUnresolvedVariable,SpellCheckingInspection
export class CardStack{
	constructor(stackCount = 0){
		this.group = new THREE.Group();
		
		this.group.position.x = 1.25 + stackCount * 0.5;
		this.group.position.y = -0.75;
		this.group.position.z = 0;
	}
	
	add(card){
		card.rotation.x = Math.PI;
		card.rotation.y = Math.random() / 30;
		card.rotation.z = Math.random() / 10;
		
		card.position.y = Math.random() / 50;
		card.position.z = this.group.children.length / 80;
		card.position.x = Math.random() / 50;
		
		if(!card.userData.isCard)
			throw Error('Object is not a card');
		
		card.state = card.userData.card.constructor.STATE.inStack;
		
		this.group.add(card);
	}
}