import { Utils } from './Utils';

//noinspection JSUnresolvedVariable,SpellCheckingInspection
export class CardHand{
	constructor(stackCount = 0){
		this.group = new THREE.Group();
		
		this.group.position.x = 0.80 + stackCount * 0.5;
		this.group.position.y = 3.405;
		this.group.position.z = 1.15;
	}
	
	add(card){
		//card.rotation.x = Math.PI / 2;
		//card.rotation.y = Math.random() / 30;
		//card.rotation.z = Math.random() / 10;
		
		//card.position.x = Math.random() / 50;
		//card.position.y = this.group.children.length / 80;
		//card.position.z = Math.random() / 50;
		
		if(!card.userData.isCard)
			throw Error('Object is not a card');
		
		card.state = card.userData.card.constructor.STATE.inHand;
		
		this.group.add(card);
	}
}