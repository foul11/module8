import { Utils } from './Utils';

//noinspection JSUnresolvedVariable,SpellCheckingInspection
export class Card{
	static CARD_TYPE = {
		none: resource.card_empty,
		noStats: resource.card_empty_nostats,
		rare: resource.card_empty_rare,
		rareColored: resource.card_empty_rare_colored,
	}
	
	static CARD_ICO = {
		adder: resource.ico.portrait_adder,
		alarmbot: resource.ico.portrait_alarmbot,
		alpha: resource.ico.portrait_alpha,
		amalgam: resource.ico.portrait_amalgam,
		amoeba: resource.ico.portrait_amoeba,
		amoebot: resource.ico.portrait_amoebot,
		ant: resource.ico.portrait_ant,
		antflying: resource.ico.portrait_antflying,
		antqueen: resource.ico.portrait_antqueen,
		aquasquirrel: resource.ico.portrait_aquasquirrel,
		automaton: resource.ico.portrait_automaton,
		badfish: resource.ico.portrait_badfish,
		baitbucket: resource.ico.portrait_baitbucket,
		banshee: resource.ico.portrait_banshee,
		bat: resource.ico.portrait_bat,
		batterybot: resource.ico.portrait_batterybot,
		battransformer_beastmode: resource.ico.portrait_battransformer_beastmode,
		battransformer_botmode: resource.ico.portrait_battransformer_botmode,
		beartransformer_beastmode: resource.ico.portrait_beartransformer_beastmode,
		beartransformer_botmode: resource.ico.portrait_beartransformer_botmode,
		beaver: resource.ico.portrait_beaver,
		bee: resource.ico.portrait_bee,
		beehive: resource.ico.portrait_beehive,
		bird_tail: resource.ico.portrait_bird_tail,
		bloodhound: resource.ico.portrait_bloodhound,
		bluemage: resource.ico.portrait_bluemage,
		bolthound: resource.ico.portrait_bolthound,
		bombbot: resource.ico.portrait_bombbot,
		bomblatcher: resource.ico.portrait_bomblatcher,
		bonehound: resource.ico.portrait_bonehound,
		boulder: resource.ico.portrait_boulder,
		brittlelatcher: resource.ico.portrait_brittlelatcher,
		brokenegg: resource.ico.portrait_brokenegg,
		bull: resource.ico.portrait_bull,
		bullfrog: resource.ico.portrait_bullfrog,
		bustedprinter: resource.ico.portrait_bustedprinter,
		cagedwolf: resource.ico.portrait_cagedwolf,
		canine_tail: resource.ico.portrait_canine_tail,
		captivefile: resource.ico.portrait_captivefile,
		cat: resource.ico.portrait_cat,
		cat_undead: resource.ico.portrait_cat_undead,
		cellbuff: resource.ico.portrait_cellbuff,
		cellgift: resource.ico.portrait_cellgift,
		celltri: resource.ico.portrait_celltri,
		cockroach: resource.ico.portrait_cockroach,
		conduitattack: resource.ico.portrait_conduitattack,
		conduitgems: resource.ico.portrait_conduitgems,
		conduitnull: resource.ico.portrait_conduitnull,
		coyote: resource.ico.portrait_coyote,
		cuckoo: resource.ico.portrait_cuckoo,
		dam: resource.ico.portrait_dam,
		daus: resource.ico.portrait_daus,
		dausbell: resource.ico.portrait_dausbell,
		deer: resource.ico.portrait_deer,
		deercub: resource.ico.portrait_deercub,
		direwolf: resource.ico.portrait_direwolf,
		direwolfcub: resource.ico.portrait_direwolfcub,
		emeraldmox: resource.ico.portrait_emeraldmox,
		emptyvessel: resource.ico.portrait_emptyvessel,
		emptyvessel_gem_blue: resource.ico.portrait_emptyvessel_gem_blue,
		emptyvessel_gem_green: resource.ico.portrait_emptyvessel_gem_green,
		emptyvessel_gem_orange: resource.ico.portrait_emptyvessel_gem_orange,
		fieldmice: resource.ico.portrait_fieldmice,
		franknstein: resource.ico.portrait_franknstein,
		frozen_opossum: resource.ico.portrait_frozen_opossum,
		geck: resource.ico.portrait_geck,
		gemexploder: resource.ico.portrait_gemexploder,
		gemfiend: resource.ico.portrait_gemfiend,
		gemripper: resource.ico.portrait_gemripper,
		gemshielder: resource.ico.portrait_gemshielder,
		giftbot: resource.ico.portrait_giftbot,
		goat: resource.ico.portrait_goat,
		goat_sexy: resource.ico.portrait_goat_sexy,
		goldnugget: resource.ico.portrait_goldnugget,
		goodfish: resource.ico.portrait_goodfish,
		gravedigger: resource.ico.portrait_gravedigger,
		grizzly: resource.ico.portrait_grizzly,
		gunnerbot: resource.ico.portrait_gunnerbot,
		hodag: resource.ico.portrait_hodag,
		hunterhare: resource.ico.portrait_hunterhare,
		hydra: resource.ico.portrait_hydra,
		hydraegg: resource.ico.portrait_hydraegg,
		hydraegg_light: resource.ico.portrait_hydraegg_light,
		ijiraq: resource.ico.portrait_ijiraq,
		insect_tail: resource.ico.portrait_insect_tail,
		insectodrone: resource.ico.portrait_insectodrone,
		jerseydevil: resource.ico.portrait_jerseydevil,
		jerseydevil_sleeping: resource.ico.portrait_jerseydevil_sleeping,
		juniorsage: resource.ico.portrait_juniorsage,
		kingfisher: resource.ico.portrait_kingfisher,
		kraken: resource.ico.portrait_kraken,
		lammergeier: resource.ico.portrait_lammergeier,
		leapbot: resource.ico.portrait_leapbot,
		librarian: resource.ico.portrait_librarian,
		lice: resource.ico.portrait_lice,
		maggots: resource.ico.portrait_maggots,
		magpie: resource.ico.portrait_magpie,
		mantis: resource.ico.portrait_mantis,
		mantisgod: resource.ico.portrait_mantisgod,
		mealworm: resource.ico.portrait_mealworm,
		minecart: resource.ico.portrait_minecart,
		mole: resource.ico.portrait_mole,
		moleman: resource.ico.portrait_moleman,
		moleseaman: resource.ico.portrait_moleseaman,
		moose: resource.ico.portrait_moose,
		morefish: resource.ico.portrait_morefish,
		mothman_1: resource.ico.portrait_mothman_1,
		mothman_2: resource.ico.portrait_mothman_2,
		mothman_3: resource.ico.portrait_mothman_3,
		mudturtle: resource.ico.portrait_mudturtle,
		mudturtle_shelled: resource.ico.portrait_mudturtle_shelled,
		mule: resource.ico.portrait_mule,
		mycobot: resource.ico.portrait_mycobot,
		opossum: resource.ico.portrait_opossum,
		orangemage: resource.ico.portrait_orangemage,
		otter: resource.ico.portrait_otter,
		ouroboros: resource.ico.portrait_ouroboros,
		ourobot: resource.ico.portrait_ourobot,
		packrat: resource.ico.portrait_packrat,
		pelt_golden: resource.ico.portrait_pelt_golden,
		pelt_hare: resource.ico.portrait_pelt_hare,
		pelt_wolf: resource.ico.portrait_pelt_wolf,
		porcupine: resource.ico.portrait_porcupine,
		porcupinetransformer_beastmode: resource.ico.portrait_porcupinetransformer_beastmode,
		porcupinetransformer_botmode: resource.ico.portrait_porcupinetransformer_botmode,
		practicemage: resource.ico.portrait_practicemage,
		pronghorn: resource.ico.portrait_pronghorn,
		rabbit: resource.ico.portrait_rabbit,
		raccoon: resource.ico.portrait_raccoon,
		ratking: resource.ico.portrait_ratking,
		rattler: resource.ico.portrait_rattler,
		raven: resource.ico.portrait_raven,
		ravenegg: resource.ico.portrait_ravenegg,
		redhart: resource.ico.portrait_redhart,
		revenant: resource.ico.portrait_revenant,
		ringworm: resource.ico.portrait_ringworm,
		roboskeleton: resource.ico.portrait_roboskeleton,
		rubygolem: resource.ico.portrait_rubygolem,
		rubymox: resource.ico.portrait_rubymox,
		sapphiremox: resource.ico.portrait_sapphiremox,
		sentinel_blue: resource.ico.portrait_sentinel_blue,
		sentinel_green: resource.ico.portrait_sentinel_green,
		sentinel_orange: resource.ico.portrait_sentinel_orange,
		sentrybot: resource.ico.portrait_sentrybot,
		shark: resource.ico.portrait_shark,
		shieldbot: resource.ico.portrait_shieldbot,
		shieldlatcher: resource.ico.portrait_shieldlatcher,
		shutterbug: resource.ico.portrait_shutterbug,
		sinkhole: resource.ico.portrait_sinkhole,
		skeleton: resource.ico.portrait_skeleton,
		skeletonparrot: resource.ico.portrait_skeletonparrot,
		skeletonpirate: resource.ico.portrait_skeletonpirate,
		skink: resource.ico.portrait_skink,
		skink_tail: resource.ico.portrait_skink_tail,
		skink_tailless: resource.ico.portrait_skink_tailless,
		skunk: resource.ico.portrait_skunk,
		smoke: resource.ico.portrait_smoke,
		smoke_improved: resource.ico.portrait_smoke_improved,
		sniper: resource.ico.portrait_sniper,
		sparrow: resource.ico.portrait_sparrow,
		squidbell: resource.ico.portrait_squidbell,
		squidcards: resource.ico.portrait_squidcards,
		squidmirror: resource.ico.portrait_squidmirror,
		squirrel: resource.ico.portrait_squirrel,
		squirrel_scared: resource.ico.portrait_squirrel_scared,
		starvingman: resource.ico.portrait_starvingman,
		stoat: resource.ico.portrait_stoat,
		stoat_bloated: resource.ico.portrait_stoat_bloated,
		stones: resource.ico.portrait_stones,
		stump: resource.ico.portrait_stump,
		swapbot: resource.ico.portrait_swapbot,
		swapbot_swapped: resource.ico.portrait_swapbot_swapped,
		tadpole: resource.ico.portrait_tadpole,
		transformer_adder: resource.ico.portrait_transformer_adder,
		transformer_raven: resource.ico.portrait_transformer_raven,
		transformer_wolf: resource.ico.portrait_transformer_wolf,
		trap: resource.ico.portrait_trap,
		trap_closed: resource.ico.portrait_trap_closed,
		trapfrog: resource.ico.portrait_trapfrog,
		tree: resource.ico.portrait_tree,
		tree_snowcovered: resource.ico.portrait_tree_snowcovered,
		turtle: resource.ico.portrait_turtle,
		urayuli: resource.ico.portrait_urayuli,
		vulture: resource.ico.portrait_vulture,
		warren: resource.ico.portrait_warren,
		warren_eaten1: resource.ico.portrait_warren_eaten1,
		warren_eaten2: resource.ico.portrait_warren_eaten2,
		warren_eaten3: resource.ico.portrait_warren_eaten3,
		wolf: resource.ico.portrait_wolf,
		wolfcub: resource.ico.portrait_wolfcub,
		wolverine: resource.ico.portrait_wolverine,
	}
	
	static CARD_PRESET = {
	
	}
	
	static STATE = {
		none: 0,
		inHand: 1,
		inStack: 2,
		inTable: 3,
	}
	
	constructor(CardName, CardType, CardIco, CardStats = {}){
		if(CardName instanceof Object){ //  PRESET
			const Preset = CardName;
			
			
		}else{
			this.CardName = CardName;
			this.CardType = CardType;
			this.CardIco = CardIco;
			this.CardStats = CardStats;
			this.state = Card.STATE.none;
		}
	}
	
	async generateMesh(game){
		const TCard = await Utils.loadTexture(this.CardType);
		const TIcoAlb = await Utils.loadTexture(this.CardIco.albedo);
		const TIcoEmi = this.CardIco.emission ? await Utils.loadTexture(this.CardIco.emission) : null;
		
		TCard.magFilter = THREE.NearestFilter;
		TCard.minFilter = THREE.NearestFilter;
		TIcoAlb.magFilter = THREE.NearestFilter;
		TIcoAlb.minFilter = THREE.NearestFilter;
		if(TIcoEmi){
			TIcoEmi.magFilter = THREE.NearestFilter;
			TIcoEmi.minFilter = THREE.NearestFilter;
		}
		
		const TCardBuild = Utils.newRenderTargetFromTexture(game.renderer, TCard);
		
		Utils.TextureForRenderTarget(game.renderer, TCardBuild, new THREE.Vector4(0.175, 0.175, 0.825, 0.675), TIcoAlb);
		if(TIcoEmi) Utils.TextureForRenderTarget(game.renderer, TCardBuild, new THREE.Vector4(0.175, 0.175, 0.825, 0.675), TIcoEmi);
		Utils.TextForRenderTarget(game.renderer, TCardBuild, new THREE.Vector3(0.5, 0.095, Utils.ALIGN.center), this.CardName, Card.Font, 0.085, { color: '#000' });
		if(this.CardStats.attack) Utils.TextForRenderTarget(game.renderer, TCardBuild, new THREE.Vector3(0.1, 0.785, Utils.ALIGN.left), this.CardStats.attack, Card.Font, 0.135, { color: '#000' });
		if(this.CardStats.health) Utils.TextForRenderTarget(game.renderer, TCardBuild, new THREE.Vector3(0.915, 0.855, Utils.ALIGN.right), this.CardStats.health, Card.Font, 0.135, { color: '#000' });
		
		const MCard = new THREE.MeshStandardMaterial({
			map: TCardBuild.texture,
			side: THREE.FrontSide,
			transparent: true,
			metalness: 0,
			roughness: 1,
			lightMapIntensity: 0.2,
		});
		
		const face = new THREE.Mesh(Card.GPlane, MCard);
		const back = new THREE.Mesh(Card.GPlane, Card.MCardBack);
		const group = new THREE.Group();
		
		group.add(face);
		group.add(back);
		
		group.userData.isCard = true;
		group.userData.card = this;
		
		return group;
	}
	
	static async init(){
		this.TCardBack = await Utils.loadTexture(resource.card_back);
		this.Font = await Utils.loadTTF(resource.font.umbrace);
		
		this.MCardBack = new THREE.MeshStandardMaterial({
			map: this.TCardBack,
			side: THREE.BackSide,
			transparent: true,
			metalness: 0,
			roughness: 1,
			lightMapIntensity: 0.2,
		});
		
		this.GPlane = new THREE.PlaneGeometry(0.4, 0.4 * 1.5);
	}
}