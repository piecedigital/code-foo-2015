function findWord(str) {
	var array = [];
	var words = ["BLINKY", "SHINRA", "RAPTURE", "ANIMUS", "FIREFLY", "WALKERS", "TARDIS", "EPONA", "CREEPER", "AVENGER", "PATRONUS", "WESTEROS", "IFRIT", "ARKHAM", "VAULT", "CLAPTRAP", "NORMANDY", "REAVER", "HEISENBERG", "STARK", "MORDOR", "BIRDMAN", "TITAN", "OCULUS", "GOOMBA", "KATAMARI"];
	for(i = 0; i < words.length; i++) {
		var regTemp = new RegExp("[" + words[i] + "]", "g");
		//console.log(regTemp);
		var matched = str.match(regTemp);
		//console.log(matched);
		var weedOutArr = [];
		matched.map(function(elem) {
			var used = false;
			weedOutArr.map(function(elem2) {
				var reg = new RegExp("[" + elem + "]", "g");
				var reg2 = new RegExp("[" + elem2 + "]", "g");
				if(elem2 === elem && weedOutArr.join("").match(reg2).length === words[i].match(reg).length ){
				//console.log(matchArr.join(""));
					used = true;
				}
			});
			if(!used){
				//console.log(elem);
				weedOutArr.push(elem);
			}
		});
		//console.log(matchArr);
		if( weedOutArr.length === words[i].length ) {
			//console.log(words[i]);
			array.push(words[i]);
		}
	}
	console.log("words: " + words.length);
	console.log("array: " + array.length);
}

findWord("O B M K A T A M A R I O C C S F T P H S S M G S W G B O J K O N U U R I I A J D T K H V O O N V X H O D L Z B L S D O E D I E P O N A Z R E U D L N X E D B C V V Y E S M T I M N C I V E L A B P C B E O C X S B K A S O W B S O R E T S E W S U M I N A N X C T F R I E K P H B K R M S B S T D X S T G K B A R N V U A M I O V G U Y I G K H N B O O P D B V L D R M U P N E K T U P I H K P Y T M E S G M H M Z O G J T A F F N R Q L R U A R U A G L A R O F B R N F C R Z K S K R N G R L G W T J W I U C U A L A Y R N M E A K U Q J A B T A M B L X V A T L Y X V S H R O L P H R R L Y B K J E P T F X L J A E M M Y J O O Z K N F R V N T A E O E M A P Q I D E Z L N E V C A H G R R R L S V M Z R T G Z M I B R N U T A E A D I R E E O N Z I C G L A K S L E S K R P I F R M F A T P Z C B I Z D T A J O F S W S");