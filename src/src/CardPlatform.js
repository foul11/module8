//noinspection EqualityComparisonWithCoercionJS

import { Utils } from './Utils';
import { CardStack } from "./CardStack";
import { Card } from "./Card";

//noinspection JSUnresolvedVariable,SpellCheckingInspection
export class CardPlatform{
	constructor(){
		//this.group = new THREE.Group();
		
		//this.group.position.x = 0.80 + stackCount * 0.5;
		//this.group.position.y = 3.405;
		//this.group.position.z = 1.15;
	}
	
	async generateMesh(game){
		const platform = new THREE.Group();
		
		platform.position.z = 0.5;
		platform.position.x = -(CardPlatform.GPlane.parameters.width - 0.025) * 2;
		platform.position.y = 3.405;
		
		platform.rotation.x = -Math.PI / 2;
		
		const offsetX = 0.05;
		const offsetY = 0.05;
		
		const cardStack = new CardStack(0);
		const cardStackSq = new CardStack(1);
		
		for(let i = 0; i < 12; i++){
			const PCardSlot = new THREE.Mesh(CardPlatform.GPlane, (i % 3 == 2) ? CardPlatform.MQueueSlot.clone() : CardPlatform.MCardSlot.clone());
			const PCard = await (new Card("test", Card.CARD_TYPE.none, Utils.objectRandomEl(Card.CARD_ICO), {
				health: '10',
				attack: '2',
			})).generateMesh(game);
			
			PCardSlot.position.y = (i % 3) * (PCardSlot.geometry.parameters.height + offsetY);
			PCardSlot.position.x = Math.floor(i / 3) * (PCardSlot.geometry.parameters.width + offsetX);
			
			PCardSlot.rotation.z = (i % 3 == 1) ? Math.PI : 0;
			
			PCard.position.copy(PCardSlot.position);
			PCard.position.z += 0.015;
			
			PCardSlot.addEventListener('mouseover', function(){
				PCardSlot.material.emissiveIntensity = 0.25;
			});
			
			PCardSlot.addEventListener('mouseout', function(){
				PCardSlot.material.emissiveIntensity = 0;
			});
			
			game.interact3D.add(PCardSlot);
			game.interact3D.add(PCard);
			
			platform.add(PCardSlot);
			if(i % 2)
				platform.add(PCard);
			else
				cardStack.add(PCard);
			
			cardStackSq.add(await (new Card("SQ", Card.CARD_TYPE.none, Card.CARD_ICO.squirrel, {
				health: '1',
				attack: '0',
			})).generateMesh(game));
		}
		
		platform.add(cardStack.group);
		platform.add(cardStackSq.group);
		
		return platform;
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
		
		card.state = card.userData.card.constructor.STATE.inTable;
		
		this.group.add(card);
	}
	
	static async init(){
		const TCardSlot = await Utils.loadTexture(resource.card_slot);
		const TQueueSlot = await Utils.loadTexture(resource.card_queue_slot);
		
		TCardSlot.magFilter = THREE.NearestFilter;
		TCardSlot.minFilter = THREE.NearestFilter;
		TQueueSlot.magFilter = THREE.NearestFilter;
		TQueueSlot.minFilter = THREE.NearestFilter;
		
		this.MCardSlot = new THREE.MeshStandardMaterial({
			map: TCardSlot,
			side: THREE.DoubleSide,
			transparent: true,
			color: '#ff7c00'
		});
		this.MQueueSlot = new THREE.MeshStandardMaterial({
			map: TQueueSlot,
			side: THREE.DoubleSide,
			transparent: true,
			color: '#fff'
		});
		
		this.GPlane = new THREE.PlaneGeometry(0.4, 0.4 * 1.5); // 0.7
		
		this.MCardSlot.emissive.set('#fac');
		this.MQueueSlot.emissive.set('#fac');
		
		this.MCardSlot.emissiveIntensity = 0;
		this.MQueueSlot.emissiveIntensity = 0;
	}
}