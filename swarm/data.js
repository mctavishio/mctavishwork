let buildblueprint = score => {

	let blueprint = { score: score, soundplaying: false, soundloaded: false };
	blueprint.tools = ( blueprint => {
		
		return {
				randominteger: (min, max) => {
					return Math.floor( min + Math.random()*(max-min));
				},
				normalrandominteger: (min, max, n) => { // CLT
					return n === 0 ? blueprint.tools.randominteger(min,max) : Math.floor(Array.from(Array(n).keys()).reduce( (sum, j) => { return sum + blueprint.tools.randominteger(min,max) }, 0) / n)
				},
				telegraph: (el, msg) => {
					if(el) {
						try { el.innerHTML =  msg; blueprint.tools.logmsg("... " + msg);}
						catch(err) { blueprint.tools.logerror(err) }
					}
					else {
						blueprint.tools.logmsg(" || ... " + msg);
					}
				},
				logmsg: function(msg) {
					try { 
						console.log("### ::: " + msg); 
					}
					catch(err) { blueprint.tools.logerror(err) }
				},
				logerror: function(error) {
					try { console.log("rusty error ... " + error); }
					catch(err) {}
				},
				randomhighharmonic: () => {
					let multipliers = [10.0, 12.5, 13.33, 15, 20];
					return multipliers[ blueprint.tools.randominteger( 0, multipliers.length) ];
				},
				randomharmonic: () => {
					let multipliers = [5, 7.5, 10.0, 12.5, 13.33, 15, 20];
					return multipliers[ blueprint.tools.randominteger( 0, multipliers.length) ];
				},
				randomlowharmonic: () => {
					let multipliers = [5, 7.5, 10.0, 12.5, 13.33, 15, 20];
					return multipliers[ blueprint.tools.randominteger( 0, multipliers.length) ]/2;
				},
				randomkey: (object) => {
					let keys = Object.keys(object);
					let key = keys[blueprint.tools.randominteger(0,keys.length)];
					// blueprint.tools.logmsg("key = " + key);
					return key;
				},
				togrid: (min=1, max=1, x=1, ndivisions=1) => {
					let dx = Math.floor( (max-min) / ndivisions );
					return Math.floor( ( x-min+dx/2)/dx )*dx + min;
				},
				getrandomblanks: (ndrawings, nshapes) => {
					let blanks = [[0],[0,1]];
					for(let d=1; d<ndrawings+1; ++d) {
						let blank = []
						for(let s=0; s<d*nshapes; ++s) {
							blank.push(s);
						}
						blanks.push(blank);
					}
					return blanks[ blueprint.tools.randominteger(0,blueprint.score.n.drawings+2) ];
				},
				shuffle: (array) => {
					copy = array.slice();
					for (var i = copy.length - 1; i > 0; i--) {
						var j = Math.floor(Math.random() * (i + 1));
						var temp = copy[i];
						copy[i] = copy[j];
						copy[j] = temp;
					}
					return copy;
				},
				logstreams: streams => {
					Object.keys(streams).filter( key => {return key !== "clock"}).forEach( key => {
						blueprint.tools.logmsg("key " + key );
						streams[key].onValue( e => { blueprint.tools.logmsg("onvalue ::: " + key + ": " + JSON.stringify(e)) });
					});
				},
			}
	})( blueprint );

	blueprint.data = ( blueprint => {
		return {
			language: {
				texts: {
					universe0: ["women", "women of the world", "women of the universe", "lovers",  "love wins!", "victory", "onward!", "fear not!", "industry!", "courage!", "mothers!", "solidarity!", "you can do it!", "yay", "yay", "workers", "people", "unite", "rise up", "revolution", "joy", "breathe", "cyborgs",  "photosynthesis!"],
					universe1: ["people", "universe", "universal people", "people of the universe", "yay!", "you can do it", "photosynthesis"],
					andthen0: ["and", "then", "now", "soon", "and"],
					iwas0: ["i was", "i", "i was looking", "i was looking for you", "i was", "walking"],
					letx0: ["let x", "x and", "let x equal", "let x equal x", "and x", "x equals x", "always", "and then", "i was"],
					everymorning0: ["it was", "it was like this", "every morning", "it was", "morning", "always", "repeat"]
				},
				playlists: {
					fieldtrials: [ "universe0", "everymorning0", "universe1", "letx0" ],
				}
			},
			colors: {
				pigments: {
					white: "#ffffff",
					warmwhite: "fcfbe3", 
					black: "#000000", warmblack: "#191918",
					gray: "#484848", lightgray: "#888888", warmlightgray: "#656560", warmgray: "#4b4b44",
					blue: "#006699",
					red: "#9a0000",
					yellow: "ffcc00",
				},
				sets: {
					industry: ["#fcfbe3","#000000","#ffcc00","#9a0000"],
					warmindustry: ["#fcfbe3","#191918","#ffcc00","#9a0000"],
					photosynthesis: ["#fcfbe3","#000000", "#484848", "#ffcc00", "#006699"],
					warmphotosynthesis: ["#fcfbe3","#191918", "#64645a", "#ffcc00", "#006699"],
					bw: ["#000000", "fcfbe3"], 
					warmbw: ["fcfbe3", "#191918"],
					grays: ["#686868","#888888", "#484848"],
					warmgrays: ["#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"],
					blues: ["#006699","#0a7293","#0a7c8e","#008888"],
					yellows: ["#fcfbe3","#ffeba9","#ffdc6e","#ffcc00"],
					bluesyellows: ["#fcfbe3","#ffeba9","#ffdc6e","#ffcc00", "#006699","#0a7293","#0a7c8e","#fcfbe3", "#64645a", "#4b4b44"],
					warmgraysred: ["#9a0000", "#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"],
					warmgraysblue: ["#006699", "#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"],
					warmgraysyellow: ["#ffcc00", "#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"],
					warmbwyellow: ["#ffcc00", "#fcfbe3", "#191918"], 
					warmbwred: ["#9a0000", "#fcfbe3", "#191918"],
					warmbwblue: ["#006699", "#fcfbe3", "#191918"],
					warmbwgyellow: ["#ffcc00", "#fcfbe3", "#191918", "#64645a"], 
					warmbwgred: ["#9a0000", "#fcfbe3", "#191918", "#64645a"],
					warmbwgblue: ["#006699", "#fcfbe3", "#191918", "#64645a"],
					warmwgyellow: ["#ffcc00", "#fcfbe3", "#64645a", "#979688"], 
					warmwgred: ["#9a0000", "#fcfbe3", "#64645a", "#979688"],
					warmwgblue: ["#006699", "#fcfbe3", "#64645a", "#979688"],
					bwyellow: ["#ffcc00", "#000000", "fcfbe3"],
					bwred: ["#9a0000", "#000000", "fcfbe3"],
					bwblue: ["#006699", "#000000", "fcfbe3"],
					bwgyellow: ["#ffcc00", "#000000", "fcfbe3", "#484848",],
					bwgred: ["#9a0000", "#000000", "fcfbe3", "#484848",],
					bwgblue: ["#006699", "#000000", "fcfbe3", "#484848",],
					zinnia: ["#f6f9c2", "#f5ce35", "#ed8816", "#df3420", "#da5a8b"]
				},
				playlists: {
					fieldtrials: [
						["#ffcc00", "#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"], //warmgraysyellow
						["#006699", "#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"], //warmgraysblue
						["#ffcc00", "#fcfbe3", "#191918"], //"warmbwyellow", 
						["#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"],
						["#9a0000", "#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"], //warmgraysred 
						["#9a0000", "#fcfbe3", "#191918"], //"warmbwred",
						["#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"], //warmgrays
						["#ffcc00", "#fcfbe3", "#191918"], //"warmbwyellow", 
						["#9a0000", "#fcfbe3", "#191918"], //"warmbwred",
						["#ffcc00", "#fcfbe3", "#191918"], //"warmbwyellow",
						["#006699", "#fcfbe3", "#191918"], //"warmbwblue",
						["#fcfbe3", "#e2e1cc", "#c9c8b5", "#b0af9e", "#979688", "#7e7d71", "#64645a", "#4b4b44", "#32322d", "#191916", "#000000"], //warmgrays
					],
					zinnia: [
						["#f6f9c2", "#f5ce35", "#ed8816", "#df3420", "#da5a8b", "#33689a"], //"#da5a8b" : pink, "#df3420" : red
						["#f6f9c2", "#ed8816", "#df3420", "#da5a8b"],
						["#f5ce35", "#ed8816", "#df3420"],
						["#f6f9c2", "#f5ce35", "#ed8816", "#33689a"],
					],
					chance: [ 
							['#fcfbe3','#000000','#ffcc00','#9a0000'],['#fcfbe3','#000000','#9a0000'],['#fcfbe3','#000000','#ffcc00'],['#fcfbe3','#000000'],['#fcfbe3','#000000','#ffcc00'],['#fcfbe3','#000000','#9a0000'],['#fcfbe3','#000000'] 
						],
				}
			},
			timesteps: [
				{ 	
					seeds: [4,8,10,12,15,16,18,30,48,60,68,88,108,148,168,3600],
					everyminute: 8, everyhour: 15, every10: 2, every15: 4, every30: 7,
					nseeds: 16
				}
			],
			sounds: {
				clips: {
					typewriter1: {url:"/data/sound/typewriter1.mp3",loaded:false,duration:2.6644897959183673,minvolume:0.6,maxvolume:0.8,buffer:{}},
					accordion: {url:"/data/sound/accordion.mp3",loaded:false,duration:0,minvolume:0.4,maxvolume:0.8,buffer:{}},
					knocking1: {url:"/data/sound/knocking1.mp3",loaded:false,duration:0,minvolume:0.4,maxvolume:0.8,buffer:{}},
					knocking2: {url:"/data/sound/knocking2.mp3",loaded:false,duration:0,minvolume:0.4,maxvolume:0.8,buffer:{}},
					birds4: {url:"/data/sound/birds4.mp3",loaded: false, duration: 0, minvolume: 0.2, maxvolume: 0.5, buffer:{}},
					birds5: {url:"/data/sound/birds5.mp3",loaded: false, duration: 0, minvolume: 0.2, maxvolume: 0.5, buffer:{}},
					birds6: {url:"/data/sound/birds6.mp3",loaded: false, duration: 0, minvolume: 0.2, maxvolume: 0.5, buffer:{}},
					silobirds: {url:"/data/sound/silobirds.mp3",loaded: false, duration: 0, minvolume: 0.2, maxvolume: 0.6, buffer:{}},
					meow: {url:"/data/sound/meow2.mp3",loaded: false, duration: 0, minvolume: 0.4, maxvolume: 0.9, buffer:{} },
					bird0: {url:"/data/sound/bird0.mp3",loaded:false,duration:6.582857142857143,minvolume:0.6,maxvolume:0.9,buffer:{}},
					bird3: {url:"/data/sound/bird3.mp3",loaded:false,duration:6.2693877551020405,minvolume:0.6,maxvolume:0.9,buffer:{}},
					bird2: {url:"/data/sound/bird2.mp3",loaded:false,duration:6.608979591836735,minvolume:0.6,maxvolume:0.9,buffer:{}},
					bird1: {url:"/data/sound/bird1.mp3",loaded:false,duration:6.608979591836735,minvolume:0.6,maxvolume:0.9,buffer:{}},
					cowbell: {url:"/data/sound/cowbell.mp3",loaded:false,duration:0,minvolume:0.3,maxvolume:0.9,buffer:{}},
					scraping: {url:"/data/sound/scraping1.mp3",loaded:false,duration:0,minvolume:0.4,maxvolume:0.9,buffer:{}},
					cello_pitch3: {url:"/data/sound/cello_pitch3.mp3",loaded:false,duration:8.986122448979591,minvolume:0.1,maxvolume:0.4,buffer:{}},
					cello_pitch4: {url:"/data/sound/cello_pitch4.mp3",loaded:false,duration:0,minvolume:0.4,maxvolume:0.9,buffer:{}},
					cello_pitch5: {url:"/data/sound/cello_pitch5.mp3",loaded:false,duration:0,minvolume:0.4,maxvolume:0.9,buffer:{}},
					sheila1: {url:"/data/sound/sheila.mp3",loaded:false,duration:0,minvolume:0.1,maxvolume:0.9,buffer:{}},
					sheila2: {url:"/data/sound/sheila1.mp3",loaded:false,duration:0,minvolume:0.1,maxvolume:0.9,buffer:{}},
					icebowedcymbal2: {url:"/data/sound/icebowedcymbal2.mp3",loaded:false,duration:10.579591836734695,minvolume:0.3,maxvolume:0.4,buffer:{}},
					fan: {url:"/data/sound/fan1.mp3",loaded:false,duration:8.150204081632653,minvolume:0.3,maxvolume:0.8,buffer:{}},
					surf: {url:"/data/sound/surf.mp3",loaded:false,duration:9.95265306122449,minvolume:0.3,maxvolume:0.8,buffer:{}},
					cello_pitch2: {url:"/data/sound/cello_pitch2.mp3",loaded:false,duration:11.206530612244897,minvolume:0.1,maxvolume:0.4,buffer:{}},
					crow: {url:"/data/sound/crow1.mp3",loaded:false,duration:11.80734693877551,minvolume:0.8,maxvolume:0.9,buffer:{}},
					bell2: {url:"/data/sound/bell2.mp3",loaded:false,duration:5.433469387755102,minvolume:0.5,maxvolume:0.8,buffer:{}},
					bell6: {url:"/data/sound/bell6.mp3",loaded:false,duration:11.885714285714286,minvolume:0.5,maxvolume:0.8,buffer:{}},
					bell11: {url:"/data/sound/bell11.mp3",loaded:false,duration:20.114285714285714,minvolume:0.5,maxvolume:0.8,buffer:{}},
					bell13: {url:"/data/sound/bell13.mp3",loaded:false,duration:20.114285714285714,minvolume:0.5,maxvolume:0.9,buffer:{}},
					longbell: {url:"/data/sound/longbell.mp3",loaded:false,duration:20.114285714285714,minvolume:0.5,maxvolume:0.8,buffer:{}},
					weatherradio1: {url:"/data/sound/weatherradio1.mp3",loaded:false,duration:12.747755102040816,minvolume:0.2,maxvolume:0.4,buffer:{}},
					train: {url:"/data/sound/train1.mp3",loaded:false,duration:12.303673469387755,minvolume:0.3,maxvolume:0.6,buffer:{}},
					icebowedvibes1: {url:"/data/sound/icebowedvibes1.mp3",loaded:false,duration:16.195918367346938,minvolume:0.1,maxvolume:0.5,buffer:{}},
					thunk: {url:"/data/sound/thunk.mp3",loaded:false,duration:21.864489795918367,minvolume:0.3,maxvolume:0.8,buffer:{}},
					birdtheme: {url:"/data/sound/birdtheme.mp3",loaded:false,duration:24.13714285714286,minvolume:0.5,maxvolume:0.9,buffer:{}},
					piano1: {url:"/data/sound/piano1.mp3",loaded:false,duration:0,minvolume:0.3,maxvolume:0.9,buffer:{}},
					kantela1: {url:"/data/sound/kantela1.mp3",loaded:false,duration:0,minvolume:0.3,maxvolume:0.9,buffer:{}},
					kantela2: {url:"/data/sound/kantela2.mp3",loaded:false,duration:0,minvolume:0.3,maxvolume:0.9,buffer:{}},
					cisterncello: {url:"/data/sound/cisterncello.mp3",loaded:false,duration:0,minvolume:0.3,maxvolume:0.9,buffer:{}},
					cello_pitch1: {url:"/data/sound/cello_pitch1.mp3",loaded:false,duration:36.12734693877551,minvolume:0.1,maxvolume:0.3,buffer:{}},
					clarinet1: {url:"/data/sound/clarinet1.mp3",loaded:false, duration:0, minvolume:0.5,maxvolume:0.9,buffer:{}},
				},
				instruments: {
					typewriter1: {clip: "typewriter1", minvolume: 0.6, maxvolume: 0.8, playbackRate: () => { return blueprint.tools.randominteger(4,14)/10 } },
					accordion: {clip: "accordion", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randomharmonic()/4 } },
					knocking1: {clip: "knocking1", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(4,48)/10 } },
					knocking2: {clip: "knocking2", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(4,48)/10 } },
					cello_pitch2: {clip: "cello_pitch2", minvolume: 0.3, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					cello_pitch3: {clip: "cello_pitch3", minvolume: 0.3, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					cello_pitch4: {clip: "cello_pitch4", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					cello_pitch5: {clip: "cello_pitch5", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					sheila1: {clip: "sheila1", minvolume: 0.8, maxvolume: 1.1 },
					sheila2harmonic: {clip: "sheila2", minvolume: 0.8, maxvolume: 1.0, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					sheila1harmonic: {clip: "sheila1", minvolume: 0.8, maxvolume: 1.1, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					sheila2: {clip: "sheila2", minvolume: 0.8, maxvolume: 1.0  },
					cisterncello: {clip: "cisterncello", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(8,38)/10 } },
					cisterncelloharmonic: {clip: "cisterncello", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return blueprint.tools.randomharmonic()/6 } },
					kantela1: {clip: "kantela1", minvolume: 0.5, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randomharmonic()/8 } },
					kantela2: {clip: "kantela2", minvolume: 0.5, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randomharmonic()/6 } },
					piano1: {clip: "piano1", minvolume: 0.3, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					kantelarandom: {clip: "kantela", minvolume: 0.5, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(2,28)/10 } },
					piano1random: {clip: "piano1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return blueprint.tools.randominteger(2,48)/10 } },
					cello_pitch1: {clip: "cello_pitch1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					cello_pitch1I: {clip: "cello_pitch1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return blueprint.data.sounds.intervals.I(100) / 100 } },
					cello_pitch1random: {clip: "cello_pitch1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return blueprint.tools.randominteger(6,14)/10 } },
					cello_pitch1harmonic: {clip: "cello_pitch1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					cello_pitch1IV: {clip: "cello_pitch1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return blueprint.data.sounds.intervals.IV(100) / 100 } },
					cello_pitch1V: {clip: "cello_pitch1", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return blueprint.data.sounds.intervals.V(100) / 100 } },
					clarinet1: {clip: "clarinet1",minvolume: 0.5, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					clarinethighbuzz: {clip: "clarinet1",minvolume: 0.1, maxvolume: 0.4, playbackRate: () => { return blueprint.tools.randominteger(38,40)/10 } },
					clarinetI: {clip: "clarinet1",minvolume: 0.4, maxvolume: 0.8, playbackRate: () => { return blueprint.data.sounds.intervals.I(100) / 100 } },
					clarinetIII: {clip: "clarinet1",minvolume: 0.4, maxvolume: 0.8, playbackRate: () => { return blueprint.data.sounds.intervals.III(100) / 100 } },
					clarinetII: {clip: "clarinet1",minvolume: 0.4, maxvolume: 0.8, playbackRate: () => { return blueprint.data.sounds.intervals.II(100) / 100 } },
					clarinetIV: {clip: "clarinet1",minvolume: 0.4, maxvolume: 0.8, playbackRate: () => { return blueprint.data.sounds.intervals.IV(100) / 100 } },
					clarinetV: {clip: "clarinet1",minvolume: 0.4, maxvolume: 0.8, playbackRate: () => { return blueprint.data.sounds.intervals.V(100) / 100 } },
					clarineti: {clip: "clarinet1",minvolume: 0.4, maxvolume: 0.8, playbackRate: () => { return blueprint.data.sounds.intervals.i(100) / 100 } },
					clarinetvii: {clip: "clarinet1",minvolume: 0.4, maxvolume: 0.8, playbackRate: () => { return blueprint.data.sounds.intervals.vii(100) / 100 } },
					clarinetVIII: {clip: "clarinet1",minvolume: 0.4, maxvolume: 0.8, playbackRate: () => { return blueprint.data.sounds.intervals.VIII(100) / 100 } },
					icebowedvibesI: {clip: "icebowedvibes1", minvolume: 0.1, maxvolume: 0.6, playbackRate: () => { return blueprint.data.sounds.intervals.I(100) / 100 } },
					icebowedvibesIII: {clip: "icebowedvibes1", minvolume: 0.1, maxvolume: 0.6, playbackRate: () => { return blueprint.data.sounds.intervals.III(100) / 100 } },
					icebowedvibesII: {clip: "icebowedvibes1", minvolume: 0.1, maxvolume: 0.6, playbackRate: () => { return blueprint.data.sounds.intervals.II(100) / 100 } },
					icebowedvibesIV: {clip: "icebowedvibes1", minvolume: 0.1, maxvolume: 0.6, playbackRate: () => { return blueprint.data.sounds.intervals.IV(100) / 100 } },
					icebowedvibesV: {clip: "icebowedvibes1", minvolume: 0.1, maxvolume: 0.6, playbackRate: () => { return blueprint.data.sounds.intervals.V(100) / 100 } },
					icebowedvibesi: {clip: "icebowedvibes1", minvolume: 0.1, maxvolume: 0.6, playbackRate: () => { return blueprint.data.sounds.intervals.i(100) / 100 } },
					icebowedvibesvii: {clip: "icebowedvibes1", minvolume: 0.1, maxvolume: 0.3, playbackRate: () => { return blueprint.data.sounds.intervals.vii(100) / 100 } },
					icebowedvibesVIII: {clip: "icebowedvibes1", minvolume: 0.1, maxvolume: 0.6, playbackRate: () => { return blueprint.data.sounds.intervals.VIII(100) / 100 } },
					thunk: {clip: "thunk", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					birds4: {clip: "birds4",minvolume: 0.2, maxvolume: 0.5, playbackRate: () => { return blueprint.tools.randominteger(4, 24)/10 } },
					birds5: {clip: "birds5",minvolume: 0.2, maxvolume: 0.5, playbackRate: () => { return blueprint.tools.randominteger(4, 24)/10 } },
					birds6: {clip: "birds6",minvolume: 0.2, maxvolume: 0.5, playbackRate: () => { return blueprint.tools.randominteger(4, 24)/10 } },
					meow: {clip: "meow",minvolume: 0.6, maxvolume: 1.0, playbackRate: () => { return blueprint.tools.randominteger(1, 9)/10 } },
					meowlow: {clip: "meow",minvolume: 0.8, maxvolume: 1.0, playbackRate: () => { return blueprint.tools.randominteger(1,4)/10 } },
					crow: {clip: "crow", minvolume: 0.8, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(6, 18)/10 } },
					bird0: {clip: "bird0", minvolume: 0.8, maxvolume: 1.0 },
					bird1: {clip: "bird1", minvolume: 0.8, maxvolume: 1.0 },
					scrapingrandom: {clip: "scraping", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(4, 48)/10 } },
					scrapingrandom2: {clip: "scraping", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(4, 88)/10 } },
					scrapingharmonic: {clip: "scraping", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					cowbellrandom: {clip: "cowbell", minvolume: 0.6, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(4, 48)/10 } },
					cowbellharmonic: {clip: "cowbell", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					silobirds: {clip: "silobirds", minvolume: 0.4, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(3,18)/10 } },
					bird1random: {clip: "bird1", minvolume: 0.8, maxvolume: 1.0, playbackRate: () => { return blueprint.tools.randominteger(6, 18)/10 } },
					bird1harmonic: {clip: "bird1", minvolume: 0.8, maxvolume: 1.0, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					bird2: {clip: "bird2", minvolume: 0.8, maxvolume: 1.0 },
					bird3: {clip: "bird3", minvolume: 0.8, maxvolume: 1.0 },
					birdtheme: {clip: "birdtheme", minvolume: 0.5, maxvolume: 0.9, },
					bell2: {clip: "bell2", minvolume: 0.5, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(5,20)/10 } },
					bell6: {clip: "bell6", minvolume: 0.5, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(5,20)/10 } },
					bell11: {clip: "bell11", minvolume: 0.5, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(4,13)/10 } },
					bell13: {clip: "bell13", minvolume: 0.2, maxvolume: 0.4, playbackRate: () => { return blueprint.tools.randominteger(6,18)/10 } },
					bell13harmonic: {clip: "bell13", minvolume: 0.2, maxvolume: 0.4, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					longbell: {clip: "longbell", minvolume: 0.5, maxvolume: 0.9, playbackRate: () => { return blueprint.tools.randominteger(9,18)/10 } },
					bell11low: {clip: "bell11", minvolume: 0.5, maxvolume: 0.8, playbackRate: () => { return blueprint.tools.randominteger(2,6)/10 } },
					weatherradio1: {clip: "weatherradio1", minvolume: 0.2, maxvolume: 0.4,  playbackRate: () => { return blueprint.tools.randominteger(6,12)/10 }  },
					icebowedvibes1: {clip: "icebowedvibes1", minvolume: 0.2, maxvolume: 0.5, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					icebowedvibes1high: {clip: "icebowedvibes1", minvolume: 0.2, maxvolume: 0.6, playbackRate: () => { return blueprint.tools.randomharmonic()/6 } },
					icebowedvibes1low: {clip: "icebowedvibes1", minvolume: 0.2, maxvolume: 0.4, playbackRate: () => { return blueprint.tools.randominteger(5,10)/10 } },
					icebowedcymbal2: {clip: "icebowedcymbal2", minvolume: 0.3, maxvolume: 0.4, playbackRate: () => { return blueprint.tools.randomharmonic()/10 } },
					train: {clip: "train", minvolume: 0.3, maxvolume: 0.6, playbackRate: () => { return blueprint.tools.randominteger(6,18)/10 } },
					fan: {clip: "fan", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return blueprint.tools.randominteger(6,20)/10 } },
					surf: {clip: "surf", minvolume: 0.3, maxvolume: 0.8, playbackRate: () => { return blueprint.tools.randominteger(4,20)/10 } },
					silencebird1random: {clip: "bird1", minvolume: 0.1, maxvolume: 0.5, playbackRate: () => { return blueprint.tools.randominteger(6, 18)/10 } },
					silencetrain: {clip: "train", minvolume: 0.1, maxvolume: 0.4 },
					silencefan: {clip: "fan", minvolume: 0.1, maxvolume: 0.4 },
					silencesurf: {clip: "surf", minvolume: 0.1, maxvolume: 0.4 },
					silencetrainpitched: {clip: "train", minvolume: 0.2, maxvolume: 0.5, playbackRate: () => { return blueprint.tools.randominteger(6,18)/10 } },
					silencefanpitched: {clip: "fan", minvolume: 0.2, maxvolume: 0.5, playbackRate: () => { return blueprint.tools.randominteger(6,20)/10 } },
					silencesurfpitched: {clip: "surf", minvolume: 0.2, maxvolume: 0.5, playbackRate: () => { return blueprint.tools.randominteger(4,20)/10 } },
				},
				intervals: {
					lowi: function(basetone){ return Math.floor(basetone/4) },
					i: function(basetone){ return Math.floor(basetone/2) },
					I: function(basetone){ return Math.floor(basetone/1) },
					II: function(basetone){ return Math.floor(basetone*9/8) },
					III: function(basetone){ return Math.floor(basetone*5/4) },
					iii: function(basetone){ return Math.floor(basetone*6/5) },
					IV: function(basetone){ return Math.floor(basetone*4/3) },
					V: function(basetone){ return Math.floor(basetone*3/2) },
					VI: function(basetone){ return Math.floor(basetone*5/3) },
					VII: function(basetone){ return Math.floor(basetone*15/8) },
					vii: function(basetone){ return Math.floor(basetone*9/5) },
					VIII: function(basetone){ return Math.floor(basetone*2) },
				},
				pools: {
					silence0: ["silencetrain","silencefan","silencesurf"],
					silence1: ["silencetrainpitched","silencefanpitched","silencesurfpitched"],
					ocean0: ["weatherradio1", "train", "fan", "surf"],
					ocean1: ["train", "fan", "surf"],
					ocean2: ["fan", "surf"],
					ocean3: ["train", "weatherradio1", "train", "fan", "surf", "silencetrainpitched","silencefanpitched","silencesurfpitched"],
					bells0: ["bell2", "bell6", "bell11"],
					bells1: ["bell11"],
					bowed0: ["icebowedvibesI", "icebowedvibesi", "icebowedvibesII", "icebowedvibesI", "icebowedvibesi","icebowedvibesIV", "icebowedvibesV"],
					bowed1: ["icebowedvibes1", "icebowedvibes1", "icebowedcymbal2"],
					bowed2: ["cello_pitch1", "cello_pitch2", "cello_pitch3", "icebowedvibes1"],
					bowed3: ["cello_pitch1", "cello_pitch1I", "cello_pitch1IV", "cello_pitch1V", "icebowedvibes1"],
					bowed4: ["cello_pitch1", "cello_pitch1I", "cello_pitch1IV"],
					bowed5: ["cello_pitch1", "cello_pitch1I", "cello_pitch1IV", "icebowedvibesI", "icebowedvibesi", "icebowedvibesII", "icebowedvibesI", "icebowedvibesIV", "icebowedvibesV"],
					talk0: ["thunk"],
					talk1: ["typewriter1"],
					talk2: ["thunk","typewriter1"],
					talk3: ["surf", "train", "fan", "thunk"],
					talk4: ["birds4","birds5","birds6"],
					pitch0: ["clarinet1"],
					pitch1: ["clarinetI", "clarineti", "clarinetI", "clarineti","clarinetI", "clarineti","clarinetIV", "clarinetV"],
					pitch2: ["clarinetI", "clarineti", "clarinetI", "clarineti","clarinetI", "clarineti","clarinetIV", "clarinetV"],
					buzz0: ["clarinethighbuzz", "icebowedvibes1high"],
					buzz1: ["cisterncello", "cisterncelloharmonic"],
					scraping0: ["scrapingrandom2", "scrapingrandom","scrapingharmonic"],
					meow0: ["meow", "meowlow"],
					birds0: ["bird0", "bird1", "bird2", "bird3"],
					knocking0: ["knocking1"],
					knocking1: ["knocking2"],
					kantela: ["kantela1", "kantela2"],
					cellobells: ["cello_pitch4", "cello_pitch5"]
				},
				playlists: {
					fieldtrials: [ 
						["bell2", "bell6", "bell11", "silencesurf"], 
						["silencetrain","silencefan","bell11"],
						["surf","bird0", "bird1", "bird2", "bird3"], 
						["silencesurfpitched", "silencefanpitched","bird1random"], 
						["weatherradio1", "train", "fan", "surf"],  
						["silencefan","silencesurf","icebowedvibes1", "icebowedvibes1", "icebowedcymbal2"], 
						["silencefan","icebowedvibes1high"], ["typewriter1"], ["thunk"], 
						["birds4","birds5","birds6"], 
						["silencesurf","icebowedvibesI", "icebowedvibesi", "icebowedvibesII", "icebowedvibesI", "icebowedvibesi","icebowedvibesIV", "icebowedvibesV"], 
						["silencetrain","cello_pitch1harmonic"], ["cello_pitch1", "cello_pitch1I", "cello_pitch1IV", "cello_pitch1V"] 
					],
					road: [
						["silencetrain","silencefan","bell11"], 
						["silencesurfpitched", "silencefanpitched","bird1random"], 
						["weatherradio1", "train", "fan", "surf"],  
						["silencefan","silencesurf","icebowedvibes1", "icebowedvibes1", "icebowedcymbal2"], 
						["silencetrain","cello_pitch1harmonic"], ["cello_pitch1", "cello_pitch1I", "cello_pitch1IV", "cello_pitch1V"] 
					],
					zinnias: [ 
						["bell2", "bell6", "bell11", "silencesurf"], ["silencetrain","silencefan","bell11"], 
						["weatherradio1", "train", "fan", "surf"],  
						["silencefan","silencesurf","icebowedvibes1", "icebowedvibes1", "icebowedcymbal2"],  
						["silencefan","icebowedvibes1high"], ["typewriter1"], ["thunk"], 
						["silencesurf","icebowedvibesI", "icebowedvibesi", "icebowedvibesII", "icebowedvibesI", "icebowedvibesi","icebowedvibesIV", "icebowedvibesV"]
					], 
					core: [ ["bell2", "bell6", "bell11"], ["bell11"], ["weatherradio1", "train", "fan", "surf"], ["icebowedvibes1", "icebowedvibes1", "icebowedcymbal2"],["weatherradio1", "train", "fan", "surf"],  ["typewriter1"], ["surf", "icebowedvibes1", "icebowedvibes1", "icebowedcymbal2"], ["thunk"], ["typewriter1"], ["bell2", "bell6", "bell11"],  ["surf", "fan"], ["thunk", "weatherradio1"], [ "weatherradio1", "train", "fan", "surf" ], ["silencetrainpitched","silencefanpitched","silencesurfpitched", "bell11"], ["silencetrainpitched","silencefanpitched","silencesurfpitched","weatherradio1", "train", "fan", "surf"], ["train", "silencetrainpitched","icebowedvibesI", "icebowedvibesi", "icebowedvibesII", "icebowedvibesI", "icebowedvibesi","icebowedvibesIV", "icebowedvibesV"], ["train", "weatherradio1", "train", "fan", "surf", "silencetrainpitched","silencefanpitched","silencesurfpitched"] ],
					ocean: [ ["weatherradio1", "train", "fan", "surf"], ["weatherradio1", "train", "fan", "surf"],  ["surf", "icebowedvibes1", "icebowedvibes1", "icebowedcymbal2"], ["surf", "fan"], ["thunk", "weatherradio1"], [ "weatherradio1", "train", "fan", "surf" ], ["silencetrainpitched","silencefanpitched","silencesurfpitched", "bell11"], ["silencetrainpitched","silencefanpitched","silencesurfpitched","weatherradio1", "train", "fan", "surf"], ["train", "silencetrainpitched","icebowedvibesI", "icebowedvibesi", "icebowedvibesII", "icebowedvibesI", "icebowedvibesi","icebowedvibesIV", "icebowedvibesV"], ["train", "weatherradio1", "train", "fan", "surf", "silencetrainpitched","silencefanpitched","silencesurfpitched"] ],
					cellocore: [ ["weatherradio1", "train", "fan", "surf"], ["weatherradio1", "train", "fan", "surf"],  ["surf", "icebowedvibes1", "icebowedvibes1", "icebowedcymbal2"], ["thunk"], ["typewriter1"], ["surf", "fan"], ["thunk", "weatherradio1"], ["train", "silencetrainpitched", "cello_pitch1", "cello_pitch2", "cello_pitch3", "icebowedvibes1"], ["silencetrainpitched", "cello_pitch1", "cello_pitch1I", "cello_pitch1IV", "cello_pitch1V", "icebowedvibes1"], [ "weatherradio1", "train", "fan", "surf" ], ["silencetrainpitched","silencefanpitched","silencesurfpitched", "bell11"], ["silencetrainpitched","silencefanpitched","silencesurfpitched","weatherradio1", "train", "fan", "surf"], ["train", "silencetrainpitched","icebowedvibesI", "icebowedvibesi", "icebowedvibesII", "icebowedvibesI", "icebowedvibesi","icebowedvibesIV", "icebowedvibesV"], ["train", "weatherradio1", "train", "fan", "surf", "silencetrainpitched","silencefanpitched","silencesurfpitched"] ],
					celloclarinetcore: [ ["weatherradio1", "train", "fan", "surf"], ["weatherradio1", "train", "fan", "surf"],  ["surf", "icebowedvibes1", "icebowedvibes1", "icebowedcymbal2"], ["thunk"], ["typewriter1"], ["surf", "fan"], ["thunk", "weatherradio1"], ["train", "silencetrainpitched", "cello_pitch1", "cello_pitch2", "cello_pitch3", "icebowedvibes1"], ["silencetrainpitched", "cello_pitch1", "cello_pitch1I", "cello_pitch1IV", "cello_pitch1V"], [ "weatherradio1", "train", "fan", "surf" ], ["silencetrainpitched","silencefanpitched","silencesurfpitched", "bell11"], ["silencetrainpitched","silencefanpitched","silencesurfpitched","weatherradio1", "train", "fan", "surf"], ["train", "silencetrainpitched","icebowedvibesI", "icebowedvibesi", "icebowedvibesII", "icebowedvibesI", "icebowedvibesi","icebowedvibesIV", "icebowedvibesV"], ["train", "weatherradio1", "train", "fan", "surf", "silencetrainpitched","silencefanpitched","silencesurfpitched"], ["clarinet1"], ["silencetrainpitched","silencefanpitched","silencesurfpitched","clarinetI", "clarineti", "clarinetI", "clarineti","clarinetI", "clarineti","clarinetIV", "clarinetV"], ["silencetrainpitched","silencefanpitched","silencesurfpitched","clarinetI", "clarineti", "clarinetI", "clarineti","clarinetI", "clarineti","clarinetIV", "clarinetV", "weatherradio1", "train", "fan", "surf"] ],
					clarinet: [["clarinet1"], ["silencetrainpitched","silencefanpitched","silencesurfpitched","clarinetI", "clarineti", "clarinetI", "clarineti","clarinetI", "clarineti","clarinetIV", "clarinetV"], ["silencetrainpitched","silencefanpitched","silencesurfpitched","clarinetI", "clarineti", "clarinetI", "clarineti","clarinetI", "clarineti","clarinetIV", "clarinetV", "weatherradio1", "train", "fan", "surf"] ],
					bowedvibes: [ ["train", "silencetrainpitched","icebowedvibesI", "icebowedvibesi", "icebowedvibesII", "icebowedvibesI", "icebowedvibesi","icebowedvibesIV", "icebowedvibesV"] ],
					cello: [ ["train", "silencetrainpitched", "cello_pitch1", "cello_pitch2", "cello_pitch3", "icebowedvibes1"], ["silencetrainpitched", "cello_pitch1", "cello_pitch1I", "cello_pitch1IV", "cello_pitch1V", "icebowedvibes1"], ["silencetrainpitched", "cello_pitch1", "cello_pitch1I", "cello_pitch1IV"] ],
					talk: [  ["thunk"], ["thunk","typewriter1"], ["bell2", "bell6", "bell11"], ["thunk"], ["typewriter1"], ["surf"], ["surf", "train", "fan", "thunk"], ["typewriter1"], ["thunk"], ["typewriter1"], ["thunk"] ],
					buzzmeow0: [ ["meow", "meowlow","clarinethighbuzz"] ],
					background0: [ ["weatherradio1", "train", "fan", "surf"], ["train", "silencetrainpitched","silencefanpitched","silencesurfpitched"], ["silencetrain","silencefan","silencesurfpitched"], ["silencetrain","silencefan","silencesurf", "fan"], ["silencefan","silencesurf", "surf"] ],
					talking: [ ["birds4","birds5","birds6"], ["thunk"], ["typewriter1"],  ["birds4","birds5","birds6", "crow"], ["thunk", "typewriter1"]],
					//pools
					silence0: [ ["silencetrain","silencefan","silencesurf"] ],
					silence1: [ ["silencetrainpitched","silencefanpitched","silencesurfpitched"] ],
					ocean0: [ ["weatherradio1", "train", "fan", "surf"] ],
					ocean1: [ ["train", "fan", "surf"] ],
					ocean2: [ ["fan", "surf"] ],
					ocean3: [ ["train", "weatherradio1", "train", "fan", "surf", "silencetrainpitched","silencefanpitched","silencesurfpitched"] ],
					bells0: [ ["bell2", "bell6", "bell11"] ],
					bells1: [ ["bell11"] ],
					bowed0: [ ["icebowedvibesI", "icebowedvibesi", "icebowedvibesII", "icebowedvibesI", "icebowedvibesi","icebowedvibesIV", "icebowedvibesV"] ],
					bowed1: [ ["icebowedvibes1", "icebowedvibes1", "icebowedcymbal2"] ],
					bowed2: [ ["cello_pitch1", "cello_pitch2", "cello_pitch3", "icebowedvibes1"] ],
					bowed3: [ ["cello_pitch1", "cello_pitch1I", "cello_pitch1IV", "cello_pitch1V", "icebowedvibes1"] ],
					bowed4: [ ["cello_pitch1", "cello_pitch1I", "cello_pitch1IV"] ],
					bowed5: [ ["cello_pitch1", "cello_pitch1I", "cello_pitch1IV", "icebowedvibesI", "icebowedvibesi", "icebowedvibesII", "icebowedvibesI", "icebowedvibesIV", "icebowedvibesV"] ],
					talk0: [ ["thunk"] ],
					talk1: [ ["typewriter1"] ],
					talk2: [ ["thunk","typewriter1"] ],
					talk3: [ ["surf", "train", "fan", "thunk"] ],
					talk4: [ ["birds4","birds5","birds6"] ],
					pitch0: [ ["clarinet1"] ],
					pitch1: [ ["clarinetI", "clarineti", "clarinetI", "clarineti","clarinetI", "clarineti","clarinetIV", "clarinetV"] ],
					pitch2: [ ["clarinetI", "clarineti", "clarinetI", "clarineti","clarinetI", "clarineti","clarinetIV", "clarinetV"] ],
					buzz0: [ ["clarinethighbuzz"] ],
					meow0: [ ["meow", "meowlow"] ],
					meowvibelow: [["icebowedvibesi", "meowlow"]],
					meowcello: [["cello_pitch1", "cello_pitch1IV", "cello_pitch1V", "meow", "meowlow"]]
				}
			},
		}
	})( blueprint );
	blueprint.score.oscilloscope.tones = Object.keys(blueprint.data.sounds.intervals).reduce( (obj, key) => {
		return obj[key] = blueprint.data.sounds.intervals[key](blueprint.score.oscilloscope.core);
	}, {});

	blueprint.elements = ( blueprint => {
		let body = document.querySelector("body");
		let elements = {};
		elements["body"] = { el: document.querySelector("body") };
		elements["body"].el.setAttribute("id", "body");
		elements["telegraph"] = { el: document.querySelector("#telegraph") };
		elements["stage"] = { el: document.createElement("div") };
		elements["stage"].el.setAttribute("id", "stage");
		elements["stage"].el.setAttribute("class", "frame");
		elements["stage"].el.setAttribute("style", "background-color: #191918");
		elements["body"].el.appendChild(elements["stage"].el);
		return elements;
	})( blueprint );

	// ***** NOTE ::: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#webaudio
	blueprint.radio = ( blueprint => {
		let maxbuffersplaying = blueprint.score.version === "small" ? 6 : 12;
		let maxgrainsplaying = blueprint.score.version === "small" ? 6 : 12;

		let durationthrottle = blueprint.score.version === "small" ? [[6,0.9],[8,0.6],[14,0.4],[18,0.2],[40,0.1]] : [[6,1.0],[8,0.8],[14,0.6],[18,0.4],[40,0.3]];

		let radio = {
			clipduration: { min:0, max:0 },
			n: { buffersplaying: 0, grainsplaying:0 },
			max: { buffersplaying: maxbuffersplaying, grainsplaying: maxgrainsplaying },
			player: {}
		};
		radio.loading = [];
		radio.clips = {};
		radio.instruments = {};
		blueprint.score.instruments = [];

		// blueprint.tools.logmsg("blueprint.score.buffers = "+JSON.stringify(blueprint.score.buffers));
		Object.keys(blueprint.score.buffers).forEach( key => {
			blueprint.score.buffers[key].forEach( (instruments, j) => {
				instruments.forEach( instrument => 
					{ 
						// blueprint.tools.logmsg("instrument = " + instrument)
						blueprint.score.instruments.push(instrument);
						radio.instruments[instrument] = blueprint.data.sounds.instruments[instrument];
						radio.clips[blueprint.data.sounds.instruments[instrument].clip] = blueprint.data.sounds.clips[blueprint.data.sounds.instruments[instrument].clip]
					});
			})
			// radio.clips = blueprint.data.sounds.playlists[key].reduce( (obj, instruments) => { 
			// 	instruments.forEach( instrument => { obj[blueprint.data.sounds.instruments[instrument].clip] = blueprint.data.sounds.clips[blueprint.data.sounds.instruments[instrument].clip]} );
			// 	return obj; 
			// }, {} );
		});
		/* set up player*/
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		radio.player.context = new AudioContext();
		/* experimental parameters */
		let parameters = [
			{ gain: 0.4, threshold: -24, knee: 30, ratio: 12, attack: 0.003, release: 0.25 }, //default
			{ gain: 0.3, threshold: -18, knee: 30, ratio: 18, attack: 0.0003, release: 0.28 },
			{ gain: 0.5, threshold: -8, knee: 30, ratio: 18, attack: 0.003, release: 0.28 },
			{ gain: 0.8, threshold: -8, knee: 30, ratio: 18, attack: 0.003, release: 0.28 },
			];
		let n = 3;

		radio.player.gain = radio.player.context.createGain();
		radio.player.gain.gain.value = parameters[n].gain;
		//with no compressor
		radio.player.gain.connect(radio.player.context.destination);
		radio.playtone = e =>  {
			let vco = blueprint.radio.player.context.createOscillator();
			vco.frequency.value = e.frequency;
			vco.type = "sine";
			let vca = blueprint.radio.player.context.createGain();
			
			vco.connect(vca);
			vca.connect(blueprint.radio.player.gain);
			let now = blueprint.radio.player.context.currentTime;
			//fade in
			vca.gain.exponentialRampToValueAtTime(0.001, now + e.delay);
			vca.gain.exponentialRampToValueAtTime(e.volume, now + e.fadetime + e.delay);
			//fade out
			vca.gain.linearRampToValueAtTime(e.volume, now + e.duration + e.delay - e.fadetime);
			vca.gain.linearRampToValueAtTime(0.001, now + e.duration + e.delay);
			vco.start(now + e.delay);
			vco.stop(now + e.delay + e.duration + e.fadetime);
			vco.onended = function() {
			  	vco.disconnect(); vca.disconnect();
			}
		};
		radio.playbuffer = e =>  {
			// blueprint.tools.logmsg("buffersplaying = " +  blueprint.radio.n.buffersplaying);
			// if(blueprint.radio.n.buffersplaying<blueprint.radio.max.buffersplaying) {
				try {
					// let instrument = blueprint.data.sounds.instruments[e.instrument];
					let instrument = radio.instruments[e.instrument];
					let clip = blueprint.radio.clips[instrument.clip];
					// blueprint.tools.logmsg("e = " + JSON.stringify(clip));
					// blueprint.tools.logmsg("buffer playing = " + JSON.stringify(clip));

					if(clip.loaded) {
						let rate = 1.0;
						if(instrument.playbackRate) {
							rate = instrument.playbackRate();
							
						}
						let prob = blueprint.tools.randominteger(0,100)/100;
						// let isplayed = (blueprint.radio.n.buffersplaying<blueprint.radio.max.buffersplaying-1) || durationthrottle.reduce( (isplayed,d) => { 
						// 	// blueprint.tools.logmsg("prob = " + prob + " ::: isplayed = " + isplayed + " ::: d = " + d + " ::: duration = " + clip.duration*rate); 
						// 	return isplayed || (clip.duration*rate < d[0] && prob <= d[1]) }, false);
	
						let isplayed = blueprint.radio.n.buffersplaying<blueprint.radio.max.buffersplaying;
						if(isplayed) {
							try {
								// blueprint.tools.logmsg("rate = " + rate + " ::: duration = " + clip.duration*rate);
								let vca = blueprint.radio.player.context.createGain(); 
								vca.gain.value = e.volume;
								let source = blueprint.radio.player.context.createBufferSource();
								source.buffer = clip.buffer;
								source["playbackRate"].value = rate;
								source.connect(vca);
								vca.connect(blueprint.radio.player.gain);
								source.loop = false;
								source.onended = e =>  { 
									// blueprint.tools.logmsg("ended ::: " + JSON.stringify(e));
									blueprint.radio.n.buffersplaying=blueprint.radio.n.buffersplaying-1
								} ;
								++blueprint.radio.n.buffersplaying;
								let now = blueprint.radio.player.context.currentTime;
								source.start(now + e.delay);
								// blueprint.tools.logmsg("playing = " + clip.url);
							} catch(e) { blueprint.tools.logerror("error applying params to audio buffer e::: " + e) }
						}
						else {	
							// blueprint.tools.logmsg("NOT playing = " + clip.url);
						}
					}
				}
				catch(e) { blueprint.tools.logerror(e) }
		};
		radio.playgrain = e =>  {
			// blueprint.tools.logmsg("ngrainsplaying = " + blueprint.radio.n.grainsplaying);
			if(blueprint.radio.n.grainsplaying<blueprint.radio.max.grainsplaying) {
				try {
					// let instrument = blueprint.data.sounds.instruments[e.instrument];
					let instrument = radio.instruments[e.instrument];
					let clip = blueprint.radio.clips[instrument.clip];
					// blueprint.tools.logmsg("grain playing = " + instrument.clip);
					if(clip.loaded) {
						let rate = 1.0;
						if(instrument.playbackRate) {
								rate = instrument.playbackRate();
						}
						let now = blueprint.radio.player.context.currentTime;
						let dt = Math.min(blueprint.tools.randominteger(18,48)/10,rate*clip.duration*.4);
						// let dt = Math.min(blueprint.tools.randominteger(18,24)/10,clip.duration*.3);
						let offset = blueprint.tools.randominteger(0, (rate*clip.duration-2*dt)*10)/10;
						// let offset = blueprint.tools.randominteger(0, (clip.duration-2*dt)*10)/10;
						// blueprint.tools.logmsg("in playgrain ::: clip = " + e.instrument + ", clip duration = " + clip.duration + ", clip new duration = " + clip.duration*rate + ", dt = " + dt + ", rate = " + rate + ", offset = " + offset);
						let vca = blueprint.radio.player.context.createGain(); 
						let source = blueprint.radio.player.context.createBufferSource();
						source.buffer = clip.buffer;
						source["playbackRate"].value = rate;
						source.connect(vca);
						vca.connect(blueprint.radio.player.gain);
						source.loop = false;
						source.onended = e =>  { blueprint.radio.n.grainsplaying=blueprint.radio.n.grainsplaying-1} ;
						++blueprint.radio.n.grainsplaying;
						source.start(now, offset, dt*3); //parameters (when,offset,duration
						vca.gain.setValueAtTime(0.0, now);
						vca.gain.linearRampToValueAtTime(e.volume, now + dt);
						// vca.gain.linearRampToValueAtTime(1.0, now + dt);
						vca.gain.linearRampToValueAtTime(0, now + 2*dt ); 
					}
				}
				catch(e) { blueprint.tools.logerror(e) }
			}
		};
		radio.speak = e => {};
		if("speechSynthesis" in window) {
				radio.voxsynth = window.speechSynthesis;
				radio.voices = radio.voxsynth.getVoices().filter( x => x.lang==="en-US" );
				if (window.speechSynthesis.onvoiceschanged !== undefined) {
					window.speechSynthesis.onvoiceschanged = e => { radio.voices = radio.voxsynth.getVoices().filter( x => x.lang.startsWith("en")) };				// 
				}
				// ex:  window.speechSynthesis.speak(new SpeechUtterance(document.querySelector("article").textContent));
				radio.speak = e => {
					blueprint.tools.logmsg("text = " + e.text);
					let msg = new SpeechSynthesisUtterance();
					msg.voice = radio.voices[blueprint.tools.randominteger(0,radio.voices.length)];
					msg.volume = e.volume ? e.volume : 0.3; //between 0 & 1.0
					msg.rate = e.rate ? e.rate : 1.0; //between 0.1 & 10
					msg.pitch = e.pitch ? e.pitch : 1; //between 0 & 1.0
					msg.text = e.text ? e.text : "hello world!";
					msg.lang = 'en-US';
					radio.voxsynth.speak(msg);
				}
		}
		// radio.player.context.onstatechange = () => blueprint.tools.logmsg("state change ::: blueprint.radio.player.context.state= " + blueprint.radio.player.context.state);
		
		return radio;
	})( blueprint );

	blueprint.streams = {};
	// blueprint.streams.clock = Kefir.withInterval( 1000, emitter => { emitter.emit( { date: new Date() } ) })
	// 		.map( e => { return { date: e.date, t: e.date.getTime() } });

	blueprint.streams.clock = ( blueprint => {
		const date0 = new Date();
		const t0 = date0.getTime();
		let seeds = blueprint.score.orchestration.reduce( (list, entry) => { 
			if( !list.includes(entry.dt) ) {
				entry.j = list.length;
				list.push( entry.dt );
			}
			else {
				entry.j = list.reduce( (j, dt, i) =>  { 
					return entry.dt === dt ? i : j;
				}, 0 )
			}
			return list;
		}, []);
		
		// blueprint.tools.logmsg("***&&& --- seeds = " + JSON.stringify(seeds));
		let clock0 = {
			date: date0, time: t0,
			t: seeds.map( d => { return Math.floor(t0 / (d*1000)) }),
			tick: seeds.map( d => { return false }),
			count: seeds.map( d => { return 0 }),
			past: seeds.map( d => { return Math.floor(t0 / (d*1000)) }),
			dt: seeds
		};
		return Kefir.withInterval( 1000, emitter => { emitter.emit( { date: new Date() } ) })
			.scan( (state, e) => { 
				state.date = e.date;
				state.time = e.date.getTime();
				state.t = state.dt.map( d => { return Math.floor(state.time / (d*1000)) });
				state.tick = state.t.map( (d,j) => { return d !== state.past[j] ? true : false });
				state.count = state.tick.map( (d,j) => { return d  ? state.count[j]+1 : state.count[j] });
				state.past = state.t;
				return state 
			}, clock0  )
	})( blueprint );

	blueprint.streams.canvas = (blueprint => {
		return Kefir.fromEvents(window, "resize").throttle(200)
			.scan( (state,e) => {
				state.width = window.innerWidth;
				state.height = window.innerHeight;
				state.max = Math.max(state.width, state.height);
				state.min = Math.min(state.width, state.height);
				// blueprint.tools.logmsg("size ::: " + state.width + " x " + state.height);
				// blueprint.tools.logmsg("canvas = " + JSON.stringify(state));
				return state
			}, { width: window.innerWidth, height: window.innerHeight, max: Math.max(window.innerWidth, window.innerHeight), min: Math.min(window.innerWidth, window.innerHeight)})
	})( blueprint );

	blueprint.streams.conditions = (blueprint => {
		return Kefir.combine( [ blueprint.streams.clock], [blueprint.streams.canvas], (clock, canvas) =>{ return {clock: clock, canvas: canvas} })
	})( blueprint );

	blueprint.actions = {
		draw0: blueprint => {
			let title = "for RAC ::: all";
			let about = "the cybernetic Z visits the RAC";
			let nshapes = blueprint.score.version === "small" ? 2 : 4;
			let ndrawings = blueprint.score.version === "small" ? 2 : 4;
			let ntotal = nshapes * ndrawings;
			let blanksubsets = [[0],[0,1]];
			for(let d=1; d<ndrawings+1; ++d) {
				let blank = []
				for(let s=0; s<d*nshapes; ++s) {
					blank.push(s);
				}
				blanksubsets.push(blank);
			}
			let blanks = Array.from(Array(ndrawings*nshapes).keys());
			return {
				title: title,
				about: about,
				ndrawings: ndrawings, nshapes: nshapes,
				initialize: (blueprint, key) => {
					blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about);
					blueprint.elements["text"] = { el: document.createElement("div") };
					blueprint.elements["text"].el.setAttribute("id", "text");
					blueprint.elements["text"].el.setAttribute("class", "absolute large");
					blueprint.elements["stage"].el.appendChild(blueprint.elements["text"].el);
					blueprint.elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
					blueprint.elements["svg"].el.setAttributeNS(null, "id", "svg");
					blueprint.elements["svg"].el.setAttributeNS(null, "class", "frame");
					blueprint.elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
					blueprint.elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
					blueprint.elements["stage"].el.appendChild(blueprint.elements["svg"].el);

					Array.from(Array(ndrawings).keys()).forEach(  d => {
						blueprint.elements["drawing_d"+d] = { el: document.createElementNS("http://www.w3.org/2000/svg", "g") };
						blueprint.elements["drawing_d"+d].el.setAttributeNS(null, "id", "drawing_d"+d);
						Array.from(Array(nshapes).keys()).forEach(  s => {
							blueprint.elements["circle_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "id", "circle_d"+d+"e"+s);
							blueprint.elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["circle_d"+d+"e"+s].el);
							
							blueprint.elements["square_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
							blueprint.elements["square_d"+d+"e"+s].el.setAttributeNS(null, "id", "square_d"+d+"e"+s);
							blueprint.elements["square_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape square");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["square_d"+d+"e"+s].el);
						})
						blueprint.elements["svg"].el.appendChild(blueprint.elements["drawing_d"+d].el);
					});
					blueprint.elements["stage"].el.setAttribute("style", "background-color: " + blueprint.score.colors.playlist[0][blueprint.tools.randominteger(0, blueprint.score.colors.playlist[0].length)]);
				},
				f: (e, initialp) => {
					let setdx = initialp.setdx ? initialp.setdx : 14; 
					let colort = Math.floor(e.clock.t[e.j]/setdx);
					// let colort = Math.floor(e.clock.t[e.j]/13);
					
					if( e.clock.t[e.j] % setdx === 0 || !initialp.colors ){ initialp.colors = blueprint.tools.shuffle(blueprint.score.colors.playlist[ colort % blueprint.score.colors.playlist.length ]) }
					let colors = initialp.colors;
					// blueprint.tools.logmsg("e.clock.t[e.j] % setdx = " + e.clock.t[e.j] % setdx)
					// blueprint.tools.logmsg("colors = " + JSON.stringify(colors));
					let numbers = blanksubsets[ blueprint.tools.randominteger(0,ndrawings+2) ].map( j => { return blueprint.tools.togrid(0,100,blueprint.tools.randominteger(0,101), 20) });
					let n = numbers.length;
					let p = {};

					p.cx = e.clock.t[e.j]%18 < 6 ? blanks.map( (d,j) => Math.floor(numbers[j%n]*e.canvas.width/100) ) : blanks.map( (d,j) => e.canvas.width/2 );
					p.cy = e.clock.t[e.j]%18 >12 ? blanks.map( (d,j) => Math.floor(numbers[(j+1)%n]*e.canvas.height/100) ) : blanks.map( (d,j) => e.canvas.height/2 );
					p.r = blanks.map( j => { return blueprint.tools.randominteger(e.canvas.min/20,e.canvas.min) }).sort(function(a, b){return b-a});
					let sw = blanks.map( j => { return blueprint.tools.togrid(14,68,blueprint.tools.randominteger(14,68), 8)/100 }).sort(function(a, b){return b-a});
					let sa = blanks.map( j => { return blueprint.tools.togrid(8,88,blueprint.tools.randominteger(8,68), 8)/100 }).sort(function(a, b){return b-a});
					// blueprint.tools.logmsg("**in draw0 ::: p = " + JSON.stringify(p));
					if( e.clock.t[e.j]%18 < 6 ) {
						p.x = blanks.map( (d,j) => { return -e.canvas.width });
						p.width = blanks.map( (d,j) => { return e.canvas.width*3 });
						p.y = blanks.map( (d,j) => { return numbers[j%n]/800*e.canvas.height });
						p.height = blanks.map( (d,j) => { return e.canvas.height - p.y[j] });
						p.strokeWidth = sw.map( d => Math.floor( d*e.canvas.height ) );
						p.strokeDasharray = sa.map( d => Math.floor( d*e.canvas.height ) );
						p.scaleX = blanks.map( (d,j) => 2*numbers[j%n]/100 );
						p.scaleY = blanks.map( (d,j) => 1.0 );
					}
					else if( e.clock.t[e.j]%18 > 12 ) {
						p.y = blanks.map( (d,j) => { return -e.canvas.height });
						p.height = blanks.map( (d,j) => { return e.canvas.height*3 });
						p.x = blanks.map( (d,j) => { return numbers[j%n]/800*e.canvas.width });
						p.width = blanks.map( (d,j) => { return e.canvas.width - p.x[j] });
						p.strokeWidth = sw.map( d => Math.floor( d*e.canvas.width ) );
						p.strokeDasharray = sa.map( d => Math.floor( d*e.canvas.width ) );
						p.scaleY = blanks.map( (d,j) => 2*numbers[j%n]/100 );
						p.scaleX = blanks.map( (d,j) => 1.0 );
					}
					else if( e.clock.t[e.j]%18 < 10 ) {
						p.y = blanks.map( (d,j) => { return 0 });
						p.height = blanks.map( (d,j) => { return e.canvas.height-p.y[j] });
						p.x = blanks.map( (d,j) => { return 0 });
						p.width = blanks.map( (d,j) => { return e.canvas.width - p.x[j] });
						p.strokeWidth = sw.map( d => Math.floor( d*e.canvas.min ) );
						p.strokeDasharray = sa.map( d => blueprint.tools.randominteger( e.canvas.max*2,  e.canvas.max*2 + e.canvas.min*2 ) );
						p.scaleY = blanks.map( (d,j) => 1.0 );
						p.scaleX = blanks.map( (d,j) => 1.0 );
					}
					else {
						p.x = p.cx.map( (d,j) => { j%2 === 0 ? Math.floor( d - p.r[j]*1.2) : 0 });
						p.width = p.r.map( (d,j) => { j%2 === 0 ? Math.floor( d*2.4 ) : e.canvas.width });
						p.y = p.cy.map( (d,j) => { j%2 === 1 ? Math.floor( d - p.r[j]*1.2) : 0 });
						p.height = p.r.map( (d,j) => { j%2 === 1 ? Math.floor( d*2.4 ) : e.canvas.height });
						p.strokeWidth = sw.map( d => Math.floor( d*e.canvas.min/6 ) );
						p.strokeDasharray = sa.map( d => Math.floor( d*e.canvas.min/6 ) );
						p.scaleY = blanks.map( (d,j) => 3*numbers[j%n]/100 );
						p.scaleX = blanks.map( (d,j) => 3*numbers[j%n]/100 );				
					}
					p.fillOpacity = blanks.map( (d,j) => { return j===0 ? 0.0 : 1.0 } );
					p.strokeOpacity = p.fillOpacity.map( d => { return  d === 0 ? 1.0 : 0.0 } );
					p.duration = blanks.map(d => { return blueprint.tools.randominteger(e.dt * 800, e.dt * 1100) });
					p.delay = blanks.map(d => { return 0 });			
					p.colors = blanks.map( (d,j) => { return colors[ j % colors.length ] } );
					// blueprint.tools.logmsg("p.colors = " + JSON.stringify(p.colors));
					// p.colors = blanks.map( (d,j) => { return colors[ blueprint.tools.randominteger(0,colors.length) ] } );
					let dt = Math.floor(e.dt*400 / ntotal);
					Kefir.sequentially( dt, blanks).onValue( k => {
						let d = Math.floor(k/nshapes), s=k%nshapes;
						Velocity({	
							elements: blueprint.elements["circle_d"+d+"e"+s].el,
							properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k+1) % p.colors.length], strokeWidth: p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], cx: p.cx[k], cy: p.cy[k], r: p.r[k], scaleX: p.scaleX[k], scaleY: p.scaleY[k] },
							options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
						});
						Velocity({	
							elements: blueprint.elements["square_d"+d+"e"+s].el,
							properties: { opacity:1.0, fillOpacity: 0.0, strokeOpacity:1.0, strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], x: p.x[k], y: p.y[k], width: p.width[k], height: p.height[k], stroke: p.colors[k], scaleX: p.scaleX[k], scaleY: p.scaleY[k] },
							options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
						});		
					})
					//change background color
					// if( blueprint.tools.randominteger(0,100) < 30 ) {
					// 	Velocity({	
					// 		elements: blueprint.elements["stage"].el,
					// 		properties: { backgroundColor: p.colors[blueprint.tools.randominteger(0,p.colors.length)] },
					// 		options: { duration: blueprint.tools.randominteger(1200,1800), delay: 0,  easing: "easeInOutQuad" },
					// 	});
					// }
					if(e.clock.t[e.j] % setdx === 0) {
						Velocity({	
							elements: blueprint.elements["stage"].el,
							properties: { backgroundColor: p.colors[blueprint.tools.randominteger(0,p.colors.length)] },
							options: { duration: blueprint.tools.randominteger(1200,1800), delay: 0,  easing: "easeInOutQuad" },
						});
					}
				}
			}
		},
		draw0a: blueprint => {
			let title = "for Wrenshall ::: 1st sketch";
			let about = "the cybernetic Z visits the Free Range Film barn Wrenshall";
			let nshapes = blueprint.score.version === "small" ? 2 : 4;
			let ndrawings = blueprint.score.version === "small" ? 2 : 4;
			let ntotal = nshapes * ndrawings;
			let blanksubsets = [[0],[0,1]];
			for(let d=1; d<ndrawings+1; ++d) {
				let blank = []
				for(let s=0; s<d*nshapes; ++s) {
					blank.push(s);
				}
				blanksubsets.push(blank);
			}
			let blanks = Array.from(Array(ndrawings*nshapes).keys());
			return {
				title: title,
				about: about,
				ndrawings: ndrawings, nshapes: nshapes,
				initialize: (blueprint, key) => {
					blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about);
					blueprint.elements["text"] = { el: document.createElement("div") };
					blueprint.elements["text"].el.setAttribute("id", "text");
					blueprint.elements["text"].el.setAttribute("class", "absolute large");
					blueprint.elements["stage"].el.appendChild(blueprint.elements["text"].el);
					blueprint.elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
					blueprint.elements["svg"].el.setAttributeNS(null, "id", "svg");
					blueprint.elements["svg"].el.setAttributeNS(null, "class", "frame");
					blueprint.elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
					blueprint.elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
					blueprint.elements["stage"].el.appendChild(blueprint.elements["svg"].el);

					Array.from(Array(ndrawings).keys()).forEach(  d => {
						blueprint.elements["drawing_d"+d] = { el: document.createElementNS("http://www.w3.org/2000/svg", "g") };
						blueprint.elements["drawing_d"+d].el.setAttributeNS(null, "id", "drawing_d"+d);
						Array.from(Array(nshapes).keys()).forEach(  s => {
							blueprint.elements["circle_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "id", "circle_d"+d+"e"+s);
							blueprint.elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["circle_d"+d+"e"+s].el);
							
							blueprint.elements["square_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
							blueprint.elements["square_d"+d+"e"+s].el.setAttributeNS(null, "id", "square_d"+d+"e"+s);
							blueprint.elements["square_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape square");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["square_d"+d+"e"+s].el);
						})
						blueprint.elements["svg"].el.appendChild(blueprint.elements["drawing_d"+d].el);
					});
					blueprint.elements["stage"].el.setAttribute("style", "background-color: " + blueprint.score.colors.playlist[0][blueprint.tools.randominteger(0, blueprint.score.colors.playlist[0].length)]);
				},
				f: (e, initialp) => {
					let setdx = initialp.setdx ? initialp.setdx : 14; 
					let colort = Math.floor(e.clock.t[e.j]/setdx);
					if( e.clock.t[e.j] % setdx === 0 || !initialp.colors ){ initialp.colors = blueprint.tools.shuffle(blueprint.score.colors.playlist[ colort % blueprint.score.colors.playlist.length ]) }
					let colors = initialp.colors;
					
					let numbers = blanksubsets[ blueprint.tools.randominteger(0,ndrawings+2) ].map( j => { return blueprint.tools.togrid(0,100,blueprint.tools.randominteger(0,101), 20) });
					let n = numbers.length;
					let p = {};

					p.cx = e.clock.t[e.j]%18 < 6 ? blanks.map( (d,j) => Math.floor(numbers[j%n]*e.canvas.width/100) ) : blanks.map( (d,j) => e.canvas.width/2 );
					p.cy = e.clock.t[e.j]%18 >12 ? blanks.map( (d,j) => Math.floor(numbers[(j+1)%n]*e.canvas.height/100) ) : blanks.map( (d,j) => e.canvas.height/2 );
					p.r = blanks.map( j => { return blueprint.tools.randominteger(e.canvas.min/20,e.canvas.min) }).sort(function(a, b){return b-a});
					let sw = blanks.map( j => { return blueprint.tools.togrid(14,68,blueprint.tools.randominteger(14,68), 8)/100 }).sort(function(a, b){return b-a});
					let sa = blanks.map( j => { return blueprint.tools.togrid(8,88,blueprint.tools.randominteger(8,68), 8)/100 }).sort(function(a, b){return b-a});
					
						p.x = blanks.map( (d,j) => { return -e.canvas.width });
						p.width = blanks.map( (d,j) => { return e.canvas.width*3 });
						p.y = blanks.map( (d,j) => { return numbers[j%n]/800*e.canvas.height });
						p.height = blanks.map( (d,j) => { return e.canvas.height - p.y[j] });
						p.strokeWidth = sw.map( d => Math.floor( d*e.canvas.height ) );
						p.strokeDasharray = sa.map( d => Math.floor( d*e.canvas.height ) );
						p.scaleX = blanks.map( (d,j) => 2*numbers[j%n]/100 );
						p.scaleY = blanks.map( (d,j) => 1.0 );
					
					p.fillOpacity = blanks.map( (d,j) => { return j===0 ? 0.0 : 1.0 } );
					p.strokeOpacity = p.fillOpacity.map( d => { return  d === 0 ? 1.0 : 0.0 } );
					p.duration = blanks.map(d => { return blueprint.tools.randominteger(e.dt * 800, e.dt * 1100) });
					p.delay = blanks.map(d => { return 0 });			
					p.colors = blanks.map( (d,j) => { return colors[ j % colors.length ] } );
					let dt = Math.floor(e.dt*400 / ntotal);
					Kefir.sequentially( dt, blanks).onValue( k => {
						let d = Math.floor(k/nshapes), s=k%nshapes;
						Velocity({	
							elements: blueprint.elements["circle_d"+d+"e"+s].el,
							properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k+1) % p.colors.length], strokeWidth: p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], cx: p.cx[k], cy: p.cy[k], r: p.r[k], scaleX: p.scaleX[k], scaleY: p.scaleY[k] },
							options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
						});
						Velocity({	
							elements: blueprint.elements["square_d"+d+"e"+s].el,
							properties: { opacity:1.0, fillOpacity: 0.0, strokeOpacity:1.0, strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], x: p.x[k], y: p.y[k], width: p.width[k], height: p.height[k], stroke: p.colors[k], scaleX: p.scaleX[k], scaleY: p.scaleY[k] },
							options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
						});		
					})
					//change background color
					if(e.clock.t[e.j] % setdx === 0) {
						Velocity({	
							elements: blueprint.elements["stage"].el,
							properties: { backgroundColor: p.colors[blueprint.tools.randominteger(0,p.colors.length)] },
							options: { duration: blueprint.tools.randominteger(1200,1800), delay: 0,  easing: "easeInOutQuad" },
						});
					}
				}
			}
		},
		draw0b: blueprint => {
			let title = "for Wrenshall ::: 2nd sketch";
			let about = "the cybernetic Z visits the Free Range Film barn Wrenshall";
			let nshapes = blueprint.score.version === "small" ? 2 : 4;
			let ndrawings = blueprint.score.version === "small" ? 2 : 4;
			let ntotal = nshapes * ndrawings;
			let blanksubsets = [[0],[0,1]];
			for(let d=1; d<ndrawings+1; ++d) {
				let blank = []
				for(let s=0; s<d*nshapes; ++s) {
					blank.push(s);
				}
				blanksubsets.push(blank);
			}
			let blanks = Array.from(Array(ndrawings*nshapes).keys());
			return {
				title: title,
				about: about,
				ndrawings: ndrawings, nshapes: nshapes,
				initialize: (blueprint, key) => {
					blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about);
					blueprint.elements["text"] = { el: document.createElement("div") };
					blueprint.elements["text"].el.setAttribute("id", "text");
					blueprint.elements["text"].el.setAttribute("class", "absolute large");
					blueprint.elements["stage"].el.appendChild(blueprint.elements["text"].el);
					blueprint.elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
					blueprint.elements["svg"].el.setAttributeNS(null, "id", "svg");
					blueprint.elements["svg"].el.setAttributeNS(null, "class", "frame");
					blueprint.elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
					blueprint.elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
					blueprint.elements["stage"].el.appendChild(blueprint.elements["svg"].el);

					Array.from(Array(ndrawings).keys()).forEach(  d => {
						blueprint.elements["drawing_d"+d] = { el: document.createElementNS("http://www.w3.org/2000/svg", "g") };
						blueprint.elements["drawing_d"+d].el.setAttributeNS(null, "id", "drawing_d"+d);
						Array.from(Array(nshapes).keys()).forEach(  s => {
							blueprint.elements["circle_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "id", "circle_d"+d+"e"+s);
							blueprint.elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["circle_d"+d+"e"+s].el);
							
							blueprint.elements["square_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
							blueprint.elements["square_d"+d+"e"+s].el.setAttributeNS(null, "id", "square_d"+d+"e"+s);
							blueprint.elements["square_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape square");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["square_d"+d+"e"+s].el);
						})
						blueprint.elements["svg"].el.appendChild(blueprint.elements["drawing_d"+d].el);
					});
					blueprint.elements["stage"].el.setAttribute("style", "background-color: " + blueprint.score.colors.playlist[0][blueprint.tools.randominteger(0, blueprint.score.colors.playlist[0].length)]);
				},
				f: (e, initialp) => {
					let setdx = initialp.setdx ? initialp.setdx : 14; 
					let colort = Math.floor(e.clock.t[e.j]/setdx);
					if( e.clock.t[e.j] % setdx === 0 || !initialp.colors ){ initialp.colors = blueprint.tools.shuffle(blueprint.score.colors.playlist[ colort % blueprint.score.colors.playlist.length ]) }
					let colors = initialp.colors;

					let numbers = blanksubsets[ blueprint.tools.randominteger(0,ndrawings+2) ].map( j => { return blueprint.tools.togrid(0,100,blueprint.tools.randominteger(0,101), 20) });
					let n = numbers.length;
					let p = {};

					p.cx = e.clock.t[e.j]%18 < 6 ? blanks.map( (d,j) => Math.floor(numbers[j%n]*e.canvas.width/100) ) : blanks.map( (d,j) => e.canvas.width/2 );
					p.cy = e.clock.t[e.j]%18 >12 ? blanks.map( (d,j) => Math.floor(numbers[(j+1)%n]*e.canvas.height/100) ) : blanks.map( (d,j) => e.canvas.height/2 );
					p.r = blanks.map( j => { return blueprint.tools.randominteger(e.canvas.min/20,e.canvas.min) }).sort(function(a, b){return b-a});
					let sw = blanks.map( j => { return blueprint.tools.togrid(14,68,blueprint.tools.randominteger(14,68), 8)/100 }).sort(function(a, b){return b-a});
					let sa = blanks.map( j => { return blueprint.tools.togrid(8,88,blueprint.tools.randominteger(8,68), 8)/100 }).sort(function(a, b){return b-a});
					
					
						p.y = blanks.map( (d,j) => { return -e.canvas.height });
						p.height = blanks.map( (d,j) => { return e.canvas.height*3 });
						p.x = blanks.map( (d,j) => { return numbers[j%n]/800*e.canvas.width });
						p.width = blanks.map( (d,j) => { return e.canvas.width - p.x[j] });
						p.strokeWidth = sw.map( d => Math.floor( d*e.canvas.width ) );
						p.strokeDasharray = sa.map( d => Math.floor( d*e.canvas.width ) );
						p.scaleY = blanks.map( (d,j) => 2*numbers[j%n]/100 );
						p.scaleX = blanks.map( (d,j) => 1.0 );
					

					p.fillOpacity = blanks.map( (d,j) => { return j===0 ? 0.0 : 1.0 } );
					p.strokeOpacity = p.fillOpacity.map( d => { return  d === 0 ? 1.0 : 0.0 } );
					p.duration = blanks.map(d => { return blueprint.tools.randominteger(e.dt * 800, e.dt * 1100) });
					p.delay = blanks.map(d => { return 0 });			
					p.colors = blanks.map( (d,j) => { return colors[ j % colors.length ] } );
					let dt = Math.floor(e.dt*400 / ntotal);
					Kefir.sequentially( dt, blanks).onValue( k => {
						let d = Math.floor(k/nshapes), s=k%nshapes;
						Velocity({	
							elements: blueprint.elements["circle_d"+d+"e"+s].el,
							properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k+1) % p.colors.length], strokeWidth: p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], cx: p.cx[k], cy: p.cy[k], r: p.r[k], scaleX: p.scaleX[k], scaleY: p.scaleY[k] },
							options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
						});
						Velocity({	
							elements: blueprint.elements["square_d"+d+"e"+s].el,
							properties: { opacity:1.0, fillOpacity: 0.0, strokeOpacity:1.0, strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], x: p.x[k], y: p.y[k], width: p.width[k], height: p.height[k], stroke: p.colors[k], scaleX: p.scaleX[k], scaleY: p.scaleY[k] },
							options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
						});		
					})
					//change background color
					if(e.clock.t[e.j] % setdx === 0) {
						Velocity({	
							elements: blueprint.elements["stage"].el,
							properties: { backgroundColor: p.colors[blueprint.tools.randominteger(0,p.colors.length)] },
							options: { duration: blueprint.tools.randominteger(1200,1800), delay: 0,  easing: "easeInOutQuad" },
						});
					}
				}
			}
		},
		draw0c: blueprint => {
			let title = "for Wrenshall ::: 3rd sketch";
			let about = "the cybernetic Z visits the Free Range Film barn Wrenshall";
			let nshapes = blueprint.score.version === "small" ? 2 : 4;
			let ndrawings = blueprint.score.version === "small" ? 2 : 4;
			let ntotal = nshapes * ndrawings;
			let blanksubsets = [[0],[0,1]];
			for(let d=1; d<ndrawings+1; ++d) {
				let blank = []
				for(let s=0; s<d*nshapes; ++s) {
					blank.push(s);
				}
				blanksubsets.push(blank);
			}
			let blanks = Array.from(Array(ndrawings*nshapes).keys());
			return {
				title: title,
				about: about,
				ndrawings: ndrawings, nshapes: nshapes,
				initialize: (blueprint, key) => {
					blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about);
					blueprint.elements["text"] = { el: document.createElement("div") };
					blueprint.elements["text"].el.setAttribute("id", "text");
					blueprint.elements["text"].el.setAttribute("class", "absolute large");
					blueprint.elements["stage"].el.appendChild(blueprint.elements["text"].el);
					blueprint.elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
					blueprint.elements["svg"].el.setAttributeNS(null, "id", "svg");
					blueprint.elements["svg"].el.setAttributeNS(null, "class", "frame");
					blueprint.elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
					blueprint.elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
					blueprint.elements["stage"].el.appendChild(blueprint.elements["svg"].el);

					Array.from(Array(ndrawings).keys()).forEach(  d => {
						blueprint.elements["drawing_d"+d] = { el: document.createElementNS("http://www.w3.org/2000/svg", "g") };
						blueprint.elements["drawing_d"+d].el.setAttributeNS(null, "id", "drawing_d"+d);
						Array.from(Array(nshapes).keys()).forEach(  s => {
							blueprint.elements["circle_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "id", "circle_d"+d+"e"+s);
							blueprint.elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["circle_d"+d+"e"+s].el);
							
							blueprint.elements["square_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
							blueprint.elements["square_d"+d+"e"+s].el.setAttributeNS(null, "id", "square_d"+d+"e"+s);
							blueprint.elements["square_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape square");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["square_d"+d+"e"+s].el);
						})
						blueprint.elements["svg"].el.appendChild(blueprint.elements["drawing_d"+d].el);
					});
					blueprint.elements["stage"].el.setAttribute("style", "background-color: " + blueprint.score.colors.playlist[0][blueprint.tools.randominteger(0, blueprint.score.colors.playlist[0].length)]);
				},
				f: (e, initialp) => {
					let setdx = initialp.setdx ? initialp.setdx : 14; 
					let colort = Math.floor(e.clock.t[e.j]/setdx);
					if( e.clock.t[e.j] % setdx === 0 || !initialp.colors ){ initialp.colors = blueprint.tools.shuffle(blueprint.score.colors.playlist[ colort % blueprint.score.colors.playlist.length ]) }
					let colors = initialp.colors;

					let numbers = blanksubsets[ blueprint.tools.randominteger(0,ndrawings+2) ].map( j => { return blueprint.tools.togrid(0,100,blueprint.tools.randominteger(0,101), 20) });
					let n = numbers.length;
					let p = {};

					p.cx = e.clock.t[e.j]%18 < 6 ? blanks.map( (d,j) => Math.floor(numbers[j%n]*e.canvas.width/100) ) : blanks.map( (d,j) => e.canvas.width/2 );
					p.cy = e.clock.t[e.j]%18 >12 ? blanks.map( (d,j) => Math.floor(numbers[(j+1)%n]*e.canvas.height/100) ) : blanks.map( (d,j) => e.canvas.height/2 );
					p.r = blanks.map( j => { return blueprint.tools.randominteger(e.canvas.min/20,e.canvas.min) }).sort(function(a, b){return b-a});
					let sw = blanks.map( j => { return blueprint.tools.togrid(14,68,blueprint.tools.randominteger(14,68), 8)/100 }).sort(function(a, b){return b-a});
					let sa = blanks.map( j => { return blueprint.tools.togrid(8,88,blueprint.tools.randominteger(8,68), 8)/100 }).sort(function(a, b){return b-a});

					
						p.y = blanks.map( (d,j) => { return 0 });
						p.height = blanks.map( (d,j) => { return e.canvas.height-p.y[j] });
						p.x = blanks.map( (d,j) => { return 0 });
						p.width = blanks.map( (d,j) => { return e.canvas.width - p.x[j] });
						p.strokeWidth = sw.map( d => Math.floor( d*e.canvas.min ) );
						p.strokeDasharray = sa.map( d => blueprint.tools.randominteger( e.canvas.max*2,  e.canvas.max*2 + e.canvas.min*2 ) );
						p.scaleY = blanks.map( (d,j) => 1.0 );
						p.scaleX = blanks.map( (d,j) => 1.0 );
					

					p.fillOpacity = blanks.map( (d,j) => { return j===0 ? 0.0 : 1.0 } );
					p.strokeOpacity = p.fillOpacity.map( d => { return  d === 0 ? 1.0 : 0.0 } );
					p.duration = blanks.map(d => { return blueprint.tools.randominteger(e.dt * 800, e.dt * 1100) });
					p.delay = blanks.map(d => { return 0 });			
					p.colors = blanks.map( (d,j) => { return colors[ j % colors.length ] } );
					let dt = Math.floor(e.dt*400 / ntotal);
					Kefir.sequentially( dt, blanks).onValue( k => {
						let d = Math.floor(k/nshapes), s=k%nshapes;
						Velocity({	
							elements: blueprint.elements["circle_d"+d+"e"+s].el,
							properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k+1) % p.colors.length], strokeWidth: p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], cx: p.cx[k], cy: p.cy[k], r: p.r[k], scaleX: p.scaleX[k], scaleY: p.scaleY[k] },
							options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
						});
						Velocity({	
							elements: blueprint.elements["square_d"+d+"e"+s].el,
							properties: { opacity:1.0, fillOpacity: 0.0, strokeOpacity:1.0, strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], x: p.x[k], y: p.y[k], width: p.width[k], height: p.height[k], stroke: p.colors[k], scaleX: p.scaleX[k], scaleY: p.scaleY[k] },
							options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
						});		
					})
					//change background color
					if(e.clock.t[e.j] % setdx === 0) {
						Velocity({	
							elements: blueprint.elements["stage"].el,
							properties: { backgroundColor: p.colors[blueprint.tools.randominteger(0,p.colors.length)] },
							options: { duration: blueprint.tools.randominteger(1200,1800), delay: 0,  easing: "easeInOutQuad" },
						});
					}
				}
			}
		},
		draw0d: blueprint => {
			let title = "for Wrenshall ::: 4th sketch";
			let about = "the cybernetic Z visits the Free Range Film barn Wrenshall";
			let nshapes = blueprint.score.version === "small" ? 2 : 4;
			let ndrawings = blueprint.score.version === "small" ? 2 : 4;
			let ntotal = nshapes * ndrawings;
			let blanksubsets = [[0],[0,1]];
			for(let d=1; d<ndrawings+1; ++d) {
				let blank = []
				for(let s=0; s<d*nshapes; ++s) {
					blank.push(s);
				}
				blanksubsets.push(blank);
			}
			let blanks = Array.from(Array(ndrawings*nshapes).keys());
			return {
				title: title,
				about: about,
				ndrawings: ndrawings, nshapes: nshapes,
				initialize: (blueprint, key) => {
					blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about);
					blueprint.elements["text"] = { el: document.createElement("div") };
					blueprint.elements["text"].el.setAttribute("id", "text");
					blueprint.elements["text"].el.setAttribute("class", "absolute large");
					blueprint.elements["stage"].el.appendChild(blueprint.elements["text"].el);
					blueprint.elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
					blueprint.elements["svg"].el.setAttributeNS(null, "id", "svg");
					blueprint.elements["svg"].el.setAttributeNS(null, "class", "frame");
					blueprint.elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
					blueprint.elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
					blueprint.elements["stage"].el.appendChild(blueprint.elements["svg"].el);

					Array.from(Array(ndrawings).keys()).forEach(  d => {
						blueprint.elements["drawing_d"+d] = { el: document.createElementNS("http://www.w3.org/2000/svg", "g") };
						blueprint.elements["drawing_d"+d].el.setAttributeNS(null, "id", "drawing_d"+d);
						Array.from(Array(nshapes).keys()).forEach(  s => {
							blueprint.elements["circle_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "id", "circle_d"+d+"e"+s);
							blueprint.elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["circle_d"+d+"e"+s].el);
							
							blueprint.elements["square_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
							blueprint.elements["square_d"+d+"e"+s].el.setAttributeNS(null, "id", "square_d"+d+"e"+s);
							blueprint.elements["square_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape square");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["square_d"+d+"e"+s].el);
						})
						blueprint.elements["svg"].el.appendChild(blueprint.elements["drawing_d"+d].el);
					});
					blueprint.elements["stage"].el.setAttribute("style", "background-color: " + blueprint.score.colors.playlist[0][blueprint.tools.randominteger(0, blueprint.score.colors.playlist[0].length)]);
				},
				f: (e, initialp) => {
					let setdx = initialp.setdx ? initialp.setdx : 14; 
					let colort = Math.floor(e.clock.t[e.j]/setdx);
					if( e.clock.t[e.j] % setdx === 0 || !initialp.colors ){ initialp.colors = blueprint.tools.shuffle(blueprint.score.colors.playlist[ colort % blueprint.score.colors.playlist.length ]) }
					let colors = initialp.colors;

					let numbers = blanksubsets[ blueprint.tools.randominteger(0,ndrawings+2) ].map( j => { return blueprint.tools.togrid(0,100,blueprint.tools.randominteger(0,101), 20) });
					let n = numbers.length;
					let p = {};

					p.cx = e.clock.t[e.j]%18 < 6 ? blanks.map( (d,j) => Math.floor(numbers[j%n]*e.canvas.width/100) ) : blanks.map( (d,j) => e.canvas.width/2 );
					p.cy = e.clock.t[e.j]%18 >12 ? blanks.map( (d,j) => Math.floor(numbers[(j+1)%n]*e.canvas.height/100) ) : blanks.map( (d,j) => e.canvas.height/2 );
					p.r = blanks.map( j => { return blueprint.tools.randominteger(e.canvas.min/20,e.canvas.min) }).sort(function(a, b){return b-a});
					let sw = blanks.map( j => { return blueprint.tools.togrid(14,68,blueprint.tools.randominteger(14,68), 8)/100 }).sort(function(a, b){return b-a});
					let sa = blanks.map( j => { return blueprint.tools.togrid(8,88,blueprint.tools.randominteger(8,68), 8)/100 }).sort(function(a, b){return b-a});

					p.x = p.cx.map( (d,j) => { j%2 === 0 ? Math.floor( d - p.r[j]*1.2) : 0 });
					p.width = p.r.map( (d,j) => { j%2 === 0 ? Math.floor( d*2.4 ) : e.canvas.width });
					p.y = p.cy.map( (d,j) => { j%2 === 1 ? Math.floor( d - p.r[j]*1.2) : 0 });
					p.height = p.r.map( (d,j) => { j%2 === 1 ? Math.floor( d*2.4 ) : e.canvas.height });
					p.strokeWidth = sw.map( d => Math.floor( d*e.canvas.min/6 ) );
					p.strokeDasharray = sa.map( d => Math.floor( d*e.canvas.min/6 ) );
					p.scaleY = blanks.map( (d,j) => 3*numbers[j%n]/100 );
					p.scaleX = blanks.map( (d,j) => 3*numbers[j%n]/100 );				
					
					p.fillOpacity = blanks.map( (d,j) => { return j===0 ? 0.0 : 1.0 } );
					p.strokeOpacity = p.fillOpacity.map( d => { return  d === 0 ? 1.0 : 0.0 } );
					p.duration = blanks.map(d => { return blueprint.tools.randominteger(e.dt * 800, e.dt * 1100) });
					p.delay = blanks.map(d => { return 0 });			
					p.colors = blanks.map( (d,j) => { return colors[ j % colors.length ] } );
					let dt = Math.floor(e.dt*400 / ntotal);
					Kefir.sequentially( dt, blanks).onValue( k => {
						let d = Math.floor(k/nshapes), s=k%nshapes;
						Velocity({	
							elements: blueprint.elements["circle_d"+d+"e"+s].el,
							properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k+1) % p.colors.length], strokeWidth: p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], cx: p.cx[k], cy: p.cy[k], r: p.r[k], scaleX: p.scaleX[k], scaleY: p.scaleY[k] },
							options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
						});
						Velocity({	
							elements: blueprint.elements["square_d"+d+"e"+s].el,
							properties: { opacity:1.0, fillOpacity: 0.0, strokeOpacity:1.0, strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], x: p.x[k], y: p.y[k], width: p.width[k], height: p.height[k], stroke: p.colors[k], scaleX: p.scaleX[k], scaleY: p.scaleY[k] },
							options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
						});		
					})
					//change background color
					if(e.clock.t[e.j] % setdx === 0) {
						Velocity({	
							elements: blueprint.elements["stage"].el,
							properties: { backgroundColor: p.colors[blueprint.tools.randominteger(0,p.colors.length)] },
							options: { duration: blueprint.tools.randominteger(1200,1800), delay: 0,  easing: "easeInOutQuad" },
						});
					}
				}
			}
		},
		draw1: blueprint => {
			let title = "Betsy's Zinnias";
			let about = "the cybernetic Z visits Betsy's flower garden in Wrenshall";
			let nshapes = blueprint.score.version === "small" ? 2 : 4;
			let ndrawings = blueprint.score.version === "small" ? 2 : 4;
			let ntotal = nshapes * ndrawings;
			let blanksubsets = [[0],[0,1]];
			for(let d=1; d<ndrawings+1; ++d) {
				let blank = []
				for(let s=0; s<d*nshapes; ++s) {
					blank.push(s);
				}
				blanksubsets.push(blank);
			}
			let blanks = Array.from(Array(ndrawings*nshapes).keys());
			return {
				title: title,
				about: about,
				ndrawings: ndrawings, nshapes: nshapes,
				initialize: (blueprint, key) => {
					blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about);
					blueprint.elements["text"] = { el: document.createElement("div") };
					blueprint.elements["text"].el.setAttribute("id", "text");
					blueprint.elements["text"].el.setAttribute("class", "absolute large");
					blueprint.elements["stage"].el.appendChild(blueprint.elements["text"].el);
					blueprint.elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
					blueprint.elements["svg"].el.setAttributeNS(null, "id", "svg");
					blueprint.elements["svg"].el.setAttributeNS(null, "class", "frame");
					blueprint.elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
					blueprint.elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
					blueprint.elements["stage"].el.appendChild(blueprint.elements["svg"].el);
					Array.from(Array(ndrawings).keys()).forEach(  d => {
						blueprint.elements["drawing_d"+d] = { el: document.createElementNS("http://www.w3.org/2000/svg", "g") };
						blueprint.elements["drawing_d"+d].el.setAttributeNS(null, "id", "drawing_d"+d);
						Array.from(Array(nshapes).keys()).forEach(  s => {
							blueprint.elements["circle_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "id", "circle_d"+d+"e"+s);
							blueprint.elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["circle_d"+d+"e"+s].el);
							
							blueprint.elements["petal_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["petal_d"+d+"e"+s].el.setAttributeNS(null, "id", "petal_d"+d+"e"+s);
							blueprint.elements["petal_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["petal_d"+d+"e"+s].el);
						})
						blueprint.elements["svg"].el.appendChild(blueprint.elements["drawing_d"+d].el);
					});
					blueprint.elements["stage"].el.setAttribute("style", "background-color: " + blueprint.score.colors.playlist[0][blueprint.tools.randominteger(0, blueprint.score.colors.playlist[0].length)]);
				},
				f: (e, initialp) => {
					let setdx = initialp.setdx ? initialp.setdx : 14; 
					let colort = Math.floor(e.clock.t[e.j]/setdx);
					if( e.clock.t[e.j] % setdx === 0 || !initialp.colors ){ initialp.colors = blueprint.tools.shuffle(blueprint.score.colors.playlist[ colort % blueprint.score.colors.playlist.length ]) }
					let colors = initialp.colors;

					let numbers = blanksubsets[ blueprint.tools.randominteger(0,ndrawings+2) ].map( j => { return blueprint.tools.togrid(20,80,blueprint.tools.randominteger(20,81), 4) });
					let n = numbers.length;
					let p = {};

					p.cx = e.clock.t[e.j]%18 < 6 ? blanks.map( (d,j) => Math.floor(numbers[j%n]*e.canvas.width/100) ) : blanks.map( (d,j) => e.canvas.width/2 );
					p.cy = e.clock.t[e.j]%18 > 12 ? blanks.map( (d,j) => Math.floor(numbers[(j+1)%n]*e.canvas.height/100) ) : blanks.map( (d,j) => e.canvas.height/2 );
					p.r = blanks.map( j => { return blueprint.tools.randominteger(e.canvas.min/20,e.canvas.min) }).sort(function(a, b){return b-a});
					p.strokeWidth = p.r.map( d => { return blueprint.tools.randominteger(d/4,d/2) } );
					p.strokeDasharray = blanks.map( d => blueprint.tools.randominteger( e.canvas.min/8,  e.canvas.max*2 ) );

					if( e.clock.t[e.j]%18 < 6 ) {
						p.scaleX = blanks.map( (d,j) => 2*numbers[j%n]/100 );
						p.scaleY = blanks.map( (d,j) => 1.0 );
					}
					else if( e.clock.t[e.j]%18 > 12 ) {
						p.scaleY = blanks.map( (d,j) => 2*numbers[j%n]/100 );
						p.scaleX = blanks.map( (d,j) => 1.0 );
					}
					else if( e.clock.t[e.j]%18 < 10 ) {
						p.scaleY = blanks.map( (d,j) => 2*numbers[j%n]/100 );
						p.scaleX = blanks.map( (d,j) => 2*numbers[j%n]/100 );
					}
					else {
						p.scaleY = blanks.map( (d,j) => 3*numbers[j%n]/100 );
						p.scaleX = blanks.map( (d,j) => 3*numbers[j%n]/100 );			
					}
					p.fillOpacity = blanks.map( (d,j) => { return (j+e.clock.t[e.j])%3===0 ? 1.0 : 0.0 } );
					p.strokeOpacity = p.fillOpacity.map( d => { return  d === 0 ? 1.0 : 0.0 } );

					p.duration = blanks.map(d => { return blueprint.tools.randominteger(e.dt * 800, e.dt * 1100) });
					p.delay = blanks.map(d => { return 0 });			
					p.colors = blanks.map( (d,j) => { return colors[ j % colors.length ] } );
					let dt = Math.floor(e.dt*400 / ntotal);
					Kefir.sequentially( dt, blanks).onValue( k => {
							let d = Math.floor(k/nshapes), s=k%nshapes;
							Velocity({	
								elements: blueprint.elements["circle_d"+d+"e"+s].el,
								properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k) % p.colors.length], strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], cx: p.cx[k], cy: p.cy[k], r: p.r[k]  }, //, scaleX: p.scaleX[k], scaleY: p.scaleY[k]
								options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
							});
							Velocity({	
								elements: blueprint.elements["petal_d"+d+"e"+s].el,
								properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k+2) % p.colors.length], strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[k % p.colors.length], cx: p.cx[k], cy: p.cy[k], r: p.r[k] }, //, scaleX: p.scaleY[k], scaleY: p.scaleX[k]
								options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
							});
							Velocity({	
								elements: blueprint.elements["drawing_d"+d].el,
								properties: { scaleX: blueprint.tools.randominteger(2,18)/10, scaleY: blueprint.tools.randominteger(6,14)/10 },
								options: { duration: p.duration[k], delay: p.delay[(k+1) % p.delay.length],  easing: "easeInOutQuad" },
							});	
					})
					//change background color
					if(e.clock.t[e.j] % setdx === 0) {
						Velocity({	
							elements: blueprint.elements["stage"].el,
							properties: { backgroundColor: p.colors[blueprint.tools.randominteger(0,p.colors.length)] },
							options: { duration: blueprint.tools.randominteger(1200,1800), delay: 0,  easing: "easeInOutQuad" },
						});
					}
				}
			}
		},
		draw2: blueprint => {
			let title = "lines";
			let about = "farming ::: roads to wrenshall";
			let nshapes = blueprint.score.version === "small" ? 2 : 3;
			let ndrawings = blueprint.score.version === "small" ? 2 : 3;
			let ntotal = nshapes * ndrawings;
			let blanksubsets = [[0],[0,1]];
			for(let d=1; d<ndrawings+1; ++d) {
				let blank = []
				for(let s=0; s<d*nshapes; ++s) {
					blank.push(s);
				}
				blanksubsets.push(blank);
			}
			let blanks = Array.from(Array(ndrawings*nshapes).keys());
			return {
				title: title,
				about: about,
				ndrawings: ndrawings, nshapes: nshapes,
				initialize: (blueprint, key) => {
					blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about);
					blueprint.elements["text"] = { el: document.createElement("div") };
					blueprint.elements["text"].el.setAttribute("id", "text");
					blueprint.elements["text"].el.setAttribute("class", "absolute large");
					blueprint.elements["stage"].el.appendChild(blueprint.elements["text"].el);
					blueprint.elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
					blueprint.elements["svg"].el.setAttributeNS(null, "id", "svg");
					blueprint.elements["svg"].el.setAttributeNS(null, "class", "frame");
					blueprint.elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
					blueprint.elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
					blueprint.elements["stage"].el.appendChild(blueprint.elements["svg"].el);
					Array.from(Array(ndrawings).keys()).forEach(  d => {
						blueprint.elements["drawing_d"+d] = { el: document.createElementNS("http://www.w3.org/2000/svg", "g") };
						blueprint.elements["drawing_d"+d].el.setAttributeNS(null, "id", "drawing_d"+d);
						Array.from(Array(nshapes).keys()).forEach(  s => {
							blueprint.elements["rect_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
							blueprint.elements["rect_d"+d+"e"+s].el.setAttributeNS(null, "id", "rect_d"+d+"e"+s);
							blueprint.elements["rect_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape rect");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["rect_d"+d+"e"+s].el);
							
							blueprint.elements["road_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
							blueprint.elements["road_d"+d+"e"+s].el.setAttributeNS(null, "id", "road_d"+d+"e"+s);
							blueprint.elements["road_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape rect");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["road_d"+d+"e"+s].el);
						})
						blueprint.elements["svg"].el.appendChild(blueprint.elements["drawing_d"+d].el);
					});
					blueprint.elements["stage"].el.setAttribute("style", "background-color: " + blueprint.score.colors.playlist[0][blueprint.tools.randominteger(0, blueprint.score.colors.playlist[0].length)]);
				},
				f: (e, initialp) => {
					let setdx = initialp.setdx ? initialp.setdx : 14; 
					let colort = Math.floor(e.clock.t[e.j]/setdx);
					if( e.clock.t[e.j] % setdx === 0 || !initialp.colors ){ initialp.colors = blueprint.tools.shuffle(blueprint.score.colors.playlist[ colort % blueprint.score.colors.playlist.length ]) }
					let colors = initialp.colors;

					let numbers = blanksubsets[ blueprint.tools.randominteger(0,ndrawings+2) ].map( j => { return blueprint.tools.togrid(20,80,blueprint.tools.randominteger(20,81), 4) });
					let n = numbers.length;
					let p = {};

					p.cx = e.clock.t[e.j]%18 < 6 ? blanks.map( (d,j) => Math.floor(numbers[j%n]*e.canvas.width/100) ) : blanks.map( (d,j) => e.canvas.width/2 );
					p.cy = e.clock.t[e.j]%18 > 12 ? blanks.map( (d,j) => Math.floor(numbers[(j+1)%n]*e.canvas.height/100) ) : blanks.map( (d,j) => e.canvas.height/2 );
					p.r = blanks.map( j => { return blueprint.tools.randominteger(e.canvas.min/20,e.canvas.min) }).sort(function(a, b){return b-a});
					p.strokeWidth = p.r.map( d => { return blueprint.tools.randominteger(d/4,d) } );
					p.strokeDasharray = blanks.map( d => blueprint.tools.randominteger( 12,  e.canvas.max*2 ) );

					if( e.clock.t[e.j]%18 < 6 ) {
						p.scaleX = blanks.map( (d,j) => 2*numbers[j%n]/100 );
						p.scaleY = blanks.map( (d,j) => 1.0 );
					}
					else if( e.clock.t[e.j]%18 > 12 ) {
						p.scaleY = blanks.map( (d,j) => 2*numbers[j%n]/100 );
						p.scaleX = blanks.map( (d,j) => 1.0 );
					}
					else if( e.clock.t[e.j]%18 < 10 ) {
						p.scaleY = blanks.map( (d,j) => 2*numbers[j%n]/100 );
						p.scaleX = blanks.map( (d,j) => 2*numbers[j%n]/100 );
					}
					else {
						p.scaleY = blanks.map( (d,j) => 3*numbers[j%n]/100 );
						p.scaleX = blanks.map( (d,j) => 3*numbers[j%n]/100 );			
					}
					p.fillOpacity = blanks.map( (d,j) => { return (j+e.clock.t[e.j])%3===0 ? 1.0 : 0.0 } );
					p.strokeOpacity = p.fillOpacity.map( d => { return  d === 0 ? 1.0 : 0.0 } );

					p.duration = blanks.map(d => { return blueprint.tools.randominteger(e.dt * 800, e.dt * 1100) });
					p.delay = blanks.map(d => { return 0 });			
					p.colors = blanks.map( (d,j) => { return colors[ j % colors.length ] } );
					// blueprint.tools.logmsg("colors = " + p.colors)
					let dt = Math.floor(e.dt*400 / ntotal);
					Kefir.sequentially( dt, blanks).onValue( k => {
							let d = Math.floor(k/nshapes), s=k%nshapes;
							Velocity({	
								elements: blueprint.elements["rect_d"+d+"e"+s].el,
								properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k) % p.colors.length], strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], x: p.cx[k] - p.r[k]/2, y: 0, width: p.r[k], height: e.canvas.height  }, //, scaleX: p.scaleX[k], scaleY: p.scaleY[k]
								options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
							});
							Velocity({	
								elements: blueprint.elements["road_d"+d+"e"+s].el,
								properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k+2) % p.colors.length], strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[k % p.colors.length], x: 0, y: p.cy[k]-p.r[k]/2, height: p.r[k], width: e.canvas.width }, //, scaleX: p.scaleY[k], scaleY: p.scaleX[k]
								options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
							});
							// Velocity({	
							// 	elements: blueprint.elements["drawing_d"+d].el,
							// 	properties: { scaleX: blueprint.tools.randominteger(2,18)/10, scaleY: blueprint.tools.randominteger(6,14)/10 },
							// 	options: { duration: p.duration[k], delay: p.delay[(k+1) % p.delay.length],  easing: "easeInOutQuad" },
							// });	
					})
					//change background color
					if(e.clock.t[e.j] % setdx === 0) {
						Velocity({	
							elements: blueprint.elements["stage"].el,
							properties: { backgroundColor: p.colors[blueprint.tools.randominteger(0,p.colors.length)] },
							options: { duration: blueprint.tools.randominteger(1200,1800), delay: 0,  easing: "easeInOutQuad" },
						});
					}
				}
			}
		},
		draw3: blueprint => {
			let title = "circles cling to side";
			let about = "the cybernetic Z visits Wrenshall";
			let nshapes = blueprint.score.version === "small" ? 2 : 4;
			let ndrawings = blueprint.score.version === "small" ? 2 : 4;
			// blueprint.tools.logmsg("blueprint.score.version ::: " + blueprint.score.version);
			let ntotal = nshapes * ndrawings;
			let blanksubsets = [[0],[0,1]];
			for(let d=1; d<ndrawings+1; ++d) {
				let blank = []
				for(let s=0; s<d*nshapes; ++s) {
					blank.push(s);
				}
				blanksubsets.push(blank);
			}
			let blanks = Array.from(Array(ndrawings*nshapes).keys());
			return {
				title: title,
				about: about,
				ndrawings: ndrawings, nshapes: nshapes,
				initialize: (blueprint, key) => {
					blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about);
					blueprint.elements["text"] = { el: document.createElement("div") };
					blueprint.elements["text"].el.setAttribute("id", "text");
					blueprint.elements["text"].el.setAttribute("class", "absolute large");
					blueprint.elements["stage"].el.appendChild(blueprint.elements["text"].el);
					blueprint.elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
					blueprint.elements["svg"].el.setAttributeNS(null, "id", "svg");
					blueprint.elements["svg"].el.setAttributeNS(null, "class", "frame");
					blueprint.elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
					blueprint.elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
					blueprint.elements["stage"].el.appendChild(blueprint.elements["svg"].el);
					Array.from(Array(ndrawings).keys()).forEach(  d => {
						blueprint.elements["drawing_d"+d] = { el: document.createElementNS("http://www.w3.org/2000/svg", "g") };
						blueprint.elements["drawing_d"+d].el.setAttributeNS(null, "id", "drawing_d"+d);
						Array.from(Array(nshapes).keys()).forEach(  s => {
							blueprint.elements["circlel_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["circlel_d"+d+"e"+s].el.setAttributeNS(null, "id", "circlel_d"+d+"e"+s);
							blueprint.elements["circlel_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["circlel_d"+d+"e"+s].el);
							
							blueprint.elements["circler_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["circler_d"+d+"e"+s].el.setAttributeNS(null, "id", "circler_d"+d+"e"+s);
							blueprint.elements["circler_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["circler_d"+d+"e"+s].el);

							blueprint.elements["circlet_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["circlet_d"+d+"e"+s].el.setAttributeNS(null, "id", "circlet_d"+d+"e"+s);
							blueprint.elements["circlet_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["circlet_d"+d+"e"+s].el);

							blueprint.elements["circleb_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["circleb_d"+d+"e"+s].el.setAttributeNS(null, "id", "circleb_d"+d+"e"+s);
							blueprint.elements["circleb_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["circleb_d"+d+"e"+s].el);
						})
						blueprint.elements["svg"].el.appendChild(blueprint.elements["drawing_d"+d].el);
					});
					blueprint.elements["stage"].el.setAttribute("style", "background-color: " + blueprint.score.colors.playlist[0][blueprint.tools.randominteger(0, blueprint.score.colors.playlist[0].length)]);
				},
				f: (e, initialp) => {
					let setdx = initialp.setdx ? initialp.setdx : 14; 
					let colort = Math.floor(e.clock.t[e.j]/setdx);
					if( e.clock.t[e.j] % setdx === 0 || !initialp.colors ){ initialp.colors = blueprint.tools.shuffle(blueprint.score.colors.playlist[ colort % blueprint.score.colors.playlist.length ]) }
					let colors = initialp.colors;

					// blueprint.tools.logmsg("e.clock.t[e.j] % setdx = " + e.clock.t[e.j] % setdx)
					// blueprint.tools.logmsg("colors = " + JSON.stringify(colors));

					let numbers = blanksubsets[ blueprint.tools.randominteger(0,ndrawings+2) ].map( j => { return blueprint.tools.togrid(20,80,blueprint.tools.randominteger(20,81), 4) });
					let n = numbers.length;
					let p = {};

					// p.cx = e.clock.t[e.j]%18 < 3 ? blanks.map( (d,j) => Math.floor(numbers[j%n]*e.canvas.width/100) ) : blanks.map( (d,j) => e.canvas.width/2 );
					// p.cy = e.clock.t[e.j]%18 < 3 ? blanks.map( (d,j) => Math.floor(numbers[(j+1)%n]*e.canvas.height/100) ) : blanks.map( (d,j) => e.canvas.height/2 );
					p.cx = e.clock.t[e.j]% setdx < 4 ? blanks.map( (d,j) => [0,1][j%2]*e.canvas.width ) : blanks.map( (d,j) => e.canvas.width/2 );
					p.cy = e.clock.t[e.j]% setdx < 4 ? blanks.map( (d,j) => [0,1][j%2]*e.canvas.height ) : blanks.map( (d,j) => e.canvas.height/2 );
					p.r = blanks.map( j => { return blueprint.tools.randominteger(e.canvas.min/20,e.canvas.min) }).sort(function(a, b){return b-a});
					p.strokeWidth = p.r.map( d => { return blueprint.tools.randominteger(d/6,d/2) } );
					p.strokeDasharray = blanks.map( d => blueprint.tools.randominteger( e.canvas.min/8,  e.canvas.max*2 ) );

					// if( e.clock.t[e.j]%18 < 4 ) {
					// 	p.scaleX = blanks.map( (d,j) => 2*numbers[j%n]/100 );
					// 	p.scaleY = blanks.map( (d,j) => 1.0 );
					// }
					// else if( e.clock.t[e.j]%18 > 18 ) {
					// 	p.scaleY = blanks.map( (d,j) => 2*numbers[j%n]/100 );
					// 	p.scaleX = blanks.map( (d,j) => 1.0 );
					// }
					// if( e.clock.t[e.j]%18 < 0 ) {
					// 	p.scaleY = blanks.map( (d,j) => 2*numbers[j%n]/100 );
					// 	p.scaleX = blanks.map( (d,j) => 2*numbers[j%n]/100 );
					// }
					// else if( e.clock.t[e.j]%18 < 0 ) {
					// 	p.scaleY = blanks.map( (d,j) => 3*numbers[j%n]/100 );
					// 	p.scaleX = blanks.map( (d,j) => 3*numbers[j%n]/100 );
					// }
					// else {
					// 	p.scaleY = blanks.map( (d,j) => 1.0 );
					// 	p.scaleX = blanks.map( (d,j) => 1.0 );			
					// }
					p.fillOpacity = blanks.map( (d,j) => { return (j+e.clock.t[e.j])%3===0 ? 1.0 : 0.0 } );
					p.strokeOpacity = p.fillOpacity.map( d => { return  d === 0 ? 1.0 : 0.0 } );

					p.duration = blanks.map(d => { return blueprint.tools.randominteger(e.dt * 800, e.dt * 1100) });
					p.delay = blanks.map(d => { return 0 });			
					p.colors = blanks.map( (d,j) => { return colors[ j % colors.length ] } );
					// blueprint.tools.logmsg("p.colors = " + JSON.stringify(p.colors));
					// p.colors = blanks.map( (d,j) => { return colors[ blueprint.tools.randominteger(0,colors.length) ] } );
					let dt = Math.floor(e.dt*400 / ntotal);
					Kefir.sequentially( dt, blanks).onValue( k => {
							let d = Math.floor(k/nshapes), s=k%nshapes;
							Velocity({	
								elements: blueprint.elements["circlel_d"+d+"e"+s].el,
								properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k) % p.colors.length], strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], cx: 0, cy: p.cy[k], r: p.r[k]  }, //, scaleX: p.scaleX[k], scaleY: p.scaleY[k]
								options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
							});
							Velocity({	
								elements: blueprint.elements["circler_d"+d+"e"+s].el,
								properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k) % p.colors.length], strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], cx: e.canvas.width, cy: p.cy[k], r: p.r[k]  }, //, scaleX: p.scaleX[k], scaleY: p.scaleY[k]
								options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
							});
							Velocity({	
								elements: blueprint.elements["circleb_d"+d+"e"+s].el,
								properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k) % p.colors.length], strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], cx: p.cx[k], cy: e.canvas.height, r: p.r[k] }, //, scaleX: p.scaleX[k], scaleY: p.scaleY[k]
								options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
							});
							Velocity({	
								elements: blueprint.elements["circlet_d"+d+"e"+s].el,
								properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k) % p.colors.length], strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], cx: p.cx[k], cy: 0, r: p.r[k]  }, //, scaleX: p.scaleX[k], scaleY: p.scaleY[k]
								options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
							});
							// Velocity({	
							// 	elements: blueprint.elements["drawing_d"+d].el,
							// 	properties: { scaleX: blueprint.tools.randominteger(2,18)/10, scaleY: blueprint.tools.randominteger(6,14)/10 },
							// 	options: { duration: p.duration[k], delay: p.delay[(k+1) % p.delay.length],  easing: "easeInOutQuad" },
							// });	
					})
					//change background color
					if(e.clock.t[e.j] % setdx === 0) {
						Velocity({	
							elements: blueprint.elements["stage"].el,
							properties: { backgroundColor: p.colors[blueprint.tools.randominteger(0,p.colors.length)] },
							options: { duration: blueprint.tools.randominteger(1200,1800), delay: 0,  easing: "easeInOutQuad" },
						});
					}
				}
			}
		},
		draw4: blueprint => {
			let title = "drilling";
			let about = "the cybernetic Z visits Wrenshall";
			let nshapes = blueprint.score.version === "small" ? 2 : 4;
			let ndrawings = blueprint.score.version === "small" ? 2 : 4;
			let ntotal = nshapes * ndrawings;
			let blanksubsets = [[0],[0,1]];
			for(let d=1; d<ndrawings+1; ++d) {
				let blank = []
				for(let s=0; s<d*nshapes; ++s) {
					blank.push(s);
				}
				blanksubsets.push(blank);
			}
			let blanks = Array.from(Array(ndrawings*nshapes).keys());
			return {
				title: title,
				about: about,
				ndrawings: ndrawings, nshapes: nshapes,
				initialize: (blueprint, key) => {
					blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about);
					blueprint.elements["text"] = { el: document.createElement("div") };
					blueprint.elements["text"].el.setAttribute("id", "text");
					blueprint.elements["text"].el.setAttribute("class", "absolute large");
					blueprint.elements["stage"].el.appendChild(blueprint.elements["text"].el);
					blueprint.elements["svg"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
					blueprint.elements["svg"].el.setAttributeNS(null, "id", "svg");
					blueprint.elements["svg"].el.setAttributeNS(null, "class", "frame");
					blueprint.elements["svg"].el.setAttributeNS(null, "width", window.innerWidth);
					blueprint.elements["svg"].el.setAttributeNS(null, "height", window.innerHeight);
					blueprint.elements["stage"].el.appendChild(blueprint.elements["svg"].el);
					let w = window.innerWidth, h=window.innerHeight;
					Array.from(Array(ndrawings).keys()).forEach(  d => {
						blueprint.elements["drawing_d"+d] = { el: document.createElementNS("http://www.w3.org/2000/svg", "g") };
						blueprint.elements["drawing_d"+d].el.setAttributeNS(null, "id", "drawing_d"+d);
						Array.from(Array(nshapes).keys()).forEach(  s => {
							blueprint.elements["circlel_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["circlel_d"+d+"e"+s].el.setAttributeNS(null, "id", "circlel_d"+d+"e"+s);
							blueprint.elements["circlel_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["circlel_d"+d+"e"+s].el.setAttributeNS(null, "cx", w/2);
							blueprint.elements["circlel_d"+d+"e"+s].el.setAttributeNS(null, "cy", h/2);
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["circlel_d"+d+"e"+s].el);
							
							blueprint.elements["circler_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
							blueprint.elements["circler_d"+d+"e"+s].el.setAttributeNS(null, "id", "circler_d"+d+"e"+s);
							blueprint.elements["circler_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
							blueprint.elements["circler_d"+d+"e"+s].el.setAttributeNS(null, "cx", w/2);
							blueprint.elements["circler_d"+d+"e"+s].el.setAttributeNS(null, "cy", h/2);
							blueprint.elements["drawing_d"+d].el.appendChild(blueprint.elements["circler_d"+d+"e"+s].el);

						})
						blueprint.elements["svg"].el.appendChild(blueprint.elements["drawing_d"+d].el);
					});
					blueprint.elements["stage"].el.setAttribute("style", "background-color: " + blueprint.score.colors.playlist[0][blueprint.tools.randominteger(0, blueprint.score.colors.playlist[0].length)]);
				},
				f: (e, initialp) => {
					let setdx = initialp.setdx ? initialp.setdx : 14; 
					let colort = Math.floor(e.clock.t[e.j]/setdx);
					if( e.clock.t[e.j] % setdx === 0 || !initialp.colors ){ initialp.colors = blueprint.tools.shuffle(blueprint.score.colors.playlist[ colort % blueprint.score.colors.playlist.length ]) }
					let colors = initialp.colors;

					let numbers = blanksubsets[ blueprint.tools.randominteger(0,ndrawings+2) ].map( j => { return blueprint.tools.togrid(20,80,blueprint.tools.randominteger(20,81), 4) });
					let n = numbers.length;
					let p = {};
					p.cx = blanks.map( j => { return e.canvas.width/2 });
					p.cy = blanks.map( j => { return e.canvas.height/2 });
	
					p.r = blanks.map( j => { return blueprint.tools.randominteger(e.canvas.min/20,e.canvas.min) }).sort(function(a, b){return b-a});
					p.strokeWidth = p.r.map( d => { return blueprint.tools.randominteger(d/5,d/2) } );
					p.strokeDasharray = blanks.map( d => blueprint.tools.randominteger( e.canvas.min/10,  e.canvas.max ) );

					if( e.clock.t[e.j]%18 < 4 ) {
						p.scaleX = blanks.map( (d,j) => 2*numbers[j%n]/100 );
						p.scaleY = blanks.map( (d,j) => 1.0 );
					}
					else if( e.clock.t[e.j]%18 > 14 ) {
						p.scaleY = blanks.map( (d,j) => 2*numbers[j%n]/100 );
						p.scaleX = blanks.map( (d,j) => 1.0 );
					}
					else {
						p.scaleY = blanks.map( (d,j) => 1.0 );
						p.scaleX = blanks.map( (d,j) => 1.0 );			
					}
					p.fillOpacity = blanks.map( (d,j) => { return (j+e.clock.t[e.j])%2===0 ? 1.0 : 0.0 } );
					p.strokeOpacity = p.fillOpacity.map( d => { return  d === 0 ? 1.0 : 0.0 } );

					p.duration = blanks.map(d => { return blueprint.tools.randominteger(e.dt * 800, e.dt * 1100) });
					p.delay = blanks.map(d => { return 0 });			
					p.colors = blanks.map( (d,j) => { return colors[ j % colors.length ] } );

					
					let dt = Math.floor(e.dt*400 / ntotal);
					Kefir.sequentially( dt, blanks).onValue( k => {
							let d = Math.floor(k/nshapes), s=k%nshapes;

							Velocity({	
								elements: blueprint.elements["circlel_d"+d+"e"+s].el,
								properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k) % p.colors.length], strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], cx: p.cx[k], cy: p.cy[k],r: p.r[k], scaleX: p.scaleX[k], scaleY: p.scaleY[k]  },
								options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
							});
							Velocity({	
								elements: blueprint.elements["circler_d"+d+"e"+s].el,
								properties: { fillOpacity: p.fillOpacity[k], strokeOpacity: p.strokeOpacity[k], stroke: p.colors[(k) % p.colors.length], strokeWidth:p.strokeWidth[k], strokeDasharray: p.strokeDasharray[k], fill: p.colors[(k+1) % p.colors.length], cx: p.cx[k], cy: p.cy[k], r: p.r[k], scaleX: p.scaleX[k], scaleY: p.scaleY[k]  },
								options: { duration: p.duration[k], delay: p.delay[k],  easing: "easeInOutQuad" },
							});
					})
					//change background color
					if(e.clock.t[e.j] % setdx === 0) {
						Velocity({	
							elements: blueprint.elements["stage"].el,
							properties: { backgroundColor: p.colors[blueprint.tools.randominteger(0,p.colors.length)] },
							options: { duration: blueprint.tools.randominteger(1200,1800), delay: 0,  easing: "easeInOutQuad" },
						});
					}
				}
			}
		},
		playheartbeats0: blueprint => { 
			let title = "heartbeats";
			let about = "oscilloscope";
			return {
				title: title, about: about,
				initialize: (blueprint,key) => { blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about)},
				f: (e, p) => {
					let f = 180;
					let tone = [f, blueprint.data.sounds.intervals.VIII(f), blueprint.data.sounds.intervals.V(f), blueprint.data.sounds.intervals.IV(f), blueprint.data.sounds.intervals.i(f)][blueprint.tools.randominteger(0,5)];
					let tones = [tone, blueprint.data.sounds.intervals.VIII(tone), blueprint.data.sounds.intervals.V(tone) ];
					let rhythm = blueprint.tools.randominteger(2,5);
					let beats = [Array.from(Array(blueprint.tools.randominteger(40,68)).keys()).map( d => d%rhythm===0 ? 1 : 0), Array.from(Array(blueprint.tools.randominteger(40,48)).keys()).map( d => d%rhythm===0 ? 1 : 0), Array.from(Array(blueprint.tools.randominteger(60,68)).keys()).map( d => d%rhythm===0 ? 1 : 0)];
					// let d = blueprint.score.n.drawings;
					Kefir.sequentially(400, beats[0]).onValue( (x,j) => { 
						if(beats[0][j]!==0) {
							blueprint.radio.playtone( {frequency: tones[0], volume: 0.10, delay:0, duration:.3,fadetime:0} );
						}
					});
					Kefir.sequentially(300, beats[1]).onValue( (x,j) => { 
						if(beats[1][j]!==0) {
							blueprint.radio.playtone( {frequency: tones[1], volume: 0.08, delay:0, duration:.3,fadetime:0} );
						}
					});
					// Kefir.sequentially(400, beats[2]).onValue( (x,j) => { 
					// 	if(beats[1][j]!==0) {
					// 		blueprint.radio.playtone( {frequency: tones[2], volume: 0.10, delay:0, duration:.3,fadetime:0} );
					// 	}
					// });
					blueprint.radio.playtone( {frequency: tones[0], volume: 0.08, delay:300*10/1000, duration:(400*40)/1000,fadetime:(400*30)/1000} );
					blueprint.radio.playtone( {frequency: blueprint.data.sounds.intervals.VIII(tones[0]), volume: 0.08, delay:400*18/1000, duration:(400*68)/1000,fadetime:(400*40)/1000} );

				}
			}
		},
		playinstrument: blueprint => { 
			let title = "play instrument";
			let about = "buffer sound ::: from given list";
			return {
				title: title, about: about,
				initialize: (blueprint,key) => { blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about)},
				f: (e, p) => {
					if(blueprint.soundplaying) {
						let list = p.list ? p.list : "random";
						let setdx = p.setdx ? p.setdx : 40; 
						let soundt = Math.floor(e.clock.t[e.j]/setdx);
						// let soundt = e.clock.t[e.j]%setdx;
						// blueprint.tools.logmsg("soundt = "+soundt + " soundt%blueprint.score.buffers[list].length = " + soundt%blueprint.score.buffers[list].length); 

						let instruments = blueprint.score.buffers.hasOwnProperty(list) ? blueprint.score.buffers[list][ soundt%blueprint.score.buffers[list].length ] : blueprint.score.instruments;
						let instrumentname = instruments[blueprint.tools.randominteger(0,instruments.length)];
						// blueprint.tools.logmsg(" play instrument ::: " + instrumentname + " list = " + list);
						// blueprint.tools.logmsg(" play instrument ::: instruments = " + JSON.stringify(instruments) + " n=" + soundt%blueprint.score.buffers[list].length + "/"+blueprint.score.buffers[list].length);
						let instrument = blueprint.data.sounds.instruments[instrumentname];
						let vol = blueprint.tools.randominteger(instrument.minvolume*10, instrument.maxvolume*10)/10;
						blueprint.radio.playbuffer( { instrument: instrumentname, volume: vol, delay: blueprint.tools.randominteger(0,4)/10 } );
						if(blueprint.tools.randominteger(0,10) < 2) {
							Kefir.sequentially(400, [0, 1, 2, 3]).onValue( x => { 
								blueprint.radio.playgrain( { instrument: instrumentname, volume: vol, delay: 0 } );
							});
						}
					}
				}
			}
		},
		playcoreinstrument: blueprint => { 
			let title = "play core instrument";
			let about = "buffer sound without grains ::: from given list";
			return {
				title: title, about: about,
				initialize: (blueprint,key) => { blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about)},
				f: (e, p) => {
					let list = p.list ? p.list : "random";
					let setdx = p.setdx ? p.setdx : 40; 
					let soundt = Math.floor(e.clock.t[e.j]/setdx);

					let instruments = blueprint.score.buffers.hasOwnProperty(list) ? blueprint.score.buffers[list][ soundt%blueprint.score.buffers[list].length ] : blueprint.score.instruments;
					let instrumentname = instruments[blueprint.tools.randominteger(0,instruments.length)];
					// blueprint.tools.logmsg(" play core ::: " + instrumentname);
					// blueprint.tools.logmsg(" play core ::: instruments = " + JSON.stringify(instruments));
					let instrument = blueprint.data.sounds.instruments[instrumentname];
					let vol = blueprint.tools.randominteger(instrument.minvolume*10, instrument.maxvolume*10)/10;
					blueprint.radio.playbuffer( { instrument: instrumentname, volume: vol, delay: blueprint.tools.randominteger(0,4)/10 } );
				}
			}
		},
		playgrain: blueprint => { 
			let title = "play grain";
			let about = "buffer sound ::: grain subsections of clip";
			return {
				title: title, about: about,
				initialize: (blueprint,key) => { blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about)},
				f: (e,p) => {
					let list = p.list ? p.list : "random";
					let setdx = p.setdx ? p.setdx : 40; 
					let soundt = e.clock.t[e.j]%setdx;
					// blueprint.tools.logmsg("soundt = "+soundt + " soundt%blueprint.score.buffers[list].length = " + soundt%blueprint.score.buffers[list].length); 
					let instruments = blueprint.score.buffers.hasOwnProperty(list) ? blueprint.score.buffers[list][ soundt%blueprint.score.buffers[list].length ] : blueprint.score.instruments;
					// blueprint.tools.logmsg( "play grain :::  list = " + list);
					// blueprint.tools.logmsg(" play grain ::: instruments = " + JSON.stringify(instruments));
					Kefir.sequentially(440, [0, 1, 2, 3, 4, 5, 6]).onValue( x => { 
						let instrumentname = instruments[blueprint.tools.randominteger(0,instruments.length)];
						let instrument = blueprint.data.sounds.instruments[instrumentname];
						let vol = blueprint.tools.randominteger(instrument.minvolume*10, instrument.maxvolume*12)/10;
						// let vol = instrument.maxvolume;
						blueprint.radio.playgrain( { instrument: instrumentname, volume: vol, delay: blueprint.tools.randominteger(0,5)/10 } );
					});
				}
			}
		},
		speak0: blueprint => { 
			let title = "speak";
			let about = "chromevox ::: screen reader";
			return {
				title: title, about: about,
				initialize: (blueprint,key) => { blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about)},
				f: (e, p) => {
					let min=Math.min(400, e.dt/8), max=Math.max(1000, e.dt/24);
					let dx = blueprint.tools.randominteger(min, max);
					Kefir.sequentially(dx, [0, 1, 2, 3, 4, 5, 6, 7, 8]).onValue( x => { 
						let texts = blueprint.score.texts[e.clock.t[e.j]%blueprint.score.texts.length];
						blueprint.tools.logmsg("e.clock.t[e.j] = " + e.clock.t[e.j] + ", text s= " + texts);
						let text = texts[blueprint.tools.randominteger(0, texts.length)];
						blueprint.radio.speak( { text: text } );
					});
				}
			}
		},
		speak1: blueprint => { 
			let title = "speak";
			let about = "chromevox ::: screen reader";
			return {
				title: title, about: about,
				initialize: (blueprint,key) => { blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about)},
				f: (e, p) => {
					Kefir.sequentially(1000, [0, 1, 2, 3, 4, 5, 6, 7, 8]).onValue( x => { 
						let texts = blueprint.score.texts[blueprint.tools.randominteger(0,blueprint.score.texts.length)];
						blueprint.tools.logmsg("speak :::   text s= " + texts);
						let text = texts[blueprint.tools.randominteger(0, texts.length)];
						blueprint.radio.speak( { text: texts } );
					});
				}
			}
		},
		playparticles0: blueprint => { 
			let title = "particles";
			let about = "oscilloscope";
			return {
				title: title,
				about: about,
				initialize: (blueprint,key) => { blueprint.tools.logmsg("initialized ::: " + title + " ::: " + about)},
				f: e => {
					// let ranges = [[100,800], [200,400], [140,180], [300,400], [200,300], [200,240], [100,500]];
					let ranges = [[140,680]];
					let range = ranges[e.t[6]%ranges.length];
					let f1 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map( d => blueprint.tools.randominteger(0,10) < 6 ? blueprint.tools.randominteger(range[0],range[1]) : 0);
					let f2 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map( d => blueprint.tools.randominteger(0,10) < 4 ? blueprint.tools.randominteger(range[0],range[1]) : 0);
					let f3 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map( d => blueprint.tools.randominteger(0,10) < 2 ? blueprint.tools.randominteger(range[0],range[1]) : 0);
					let t = [0,1,2].map(d => blueprint.tools.randominteger(200,400));
					// let duration = t.map( d => d/2400);
					let duration = t.map( d => blueprint.tools.randominteger(10,40)/100);

					
					Kefir.sequentially(t[0], f1).onValue( x => { 
						if(x!==0) {
							blueprint.radio.playtone( {frequency: blueprint.data.sounds.intervals[blueprint.tools.randomkey(blueprint.data.sounds.intervals)](x) / 100, volume: 0.06, delay:0, duration:duration[0],fadetime:0} );
							blueprint.radio.playtone( {frequency: x, volume: 0.04, delay:0.1, duration:duration[0]*2,fadetime:0} );
							blueprint.radio.playtone( {frequency: x*3/2, volume: 0.04, delay:0.3, duration:duration[0],fadetime:0} );
							blueprint.radio.playtone( {frequency: blueprint.data.sounds.intervals[blueprint.tools.randomkey(blueprint.data.sounds.intervals)](x) / 100, volume: 0.04, delay:0.5, duration:duration[0],fadetime:0} );
							blueprint.radio.playtone( {frequency: blueprint.data.sounds.intervals[blueprint.tools.randomkey(blueprint.data.sounds.intervals)](x) / 100, volume: 0.03, delay:0, duration:duration[0],fadetime:0} );
						}
					});
					Kefir.sequentially(t[1], f2).onValue( x => { 
						if(x!==0) {
							blueprint.radio.playtone( {frequency: x, volume: 0.06, delay:0, duration:duration[1],fadetime:0} );
							blueprint.radio.playtone( {frequency: blueprint.data.sounds.intervals[blueprint.tools.randomkey(blueprint.data.sounds.intervals)](x) / 100, volume: 0.04, delay:0.1, duration:duration[1]*2,fadetime:0} );
							blueprint.radio.playtone( {frequency: blueprint.data.sounds.intervals[blueprint.tools.randomkey(blueprint.data.sounds.intervals)](x) / 100, volume: 0.04, delay:0.3, duration:duration[1],fadetime:0} );
							blueprint.radio.playtone( {frequency: blueprint.data.sounds.intervals[blueprint.tools.randomkey(blueprint.data.sounds.intervals)](x) / 100, volume: 0.04, delay:0.5, duration:duration[1],fadetime:0} );
							blueprint.radio.playtone( {frequency: blueprint.data.sounds.intervals[blueprint.tools.randomkey(blueprint.data.sounds.intervals)](x) / 100, volume: 0.03, delay:0, duration:duration[1],fadetime:0} );
						}
					});
					Kefir.sequentially(t[3], f3).onValue( x => { 
						if(x!==0) {
							blueprint.radio.playtone( {frequency: x, volume: 0.06, delay:0, duration:duration[2],fadetime:0} );
							blueprint.radio.playtone( {frequency: blueprint.data.sounds.intervals[blueprint.tools.randomkey(blueprint.data.sounds.intervals)](x) / 100, volume: 0.04, delay:0.1, duration:duration[2],fadetime:0} );
							blueprint.radio.playtone( {frequency: blueprint.data.sounds.intervals[blueprint.tools.randomkey(blueprint.data.sounds.intervals)](x) / 100, volume: 0.04, delay:0.3, duration:duration[2]*2,fadetime:0} );
							blueprint.radio.playtone( {frequency: blueprint.data.sounds.intervals[blueprint.tools.randomkey(blueprint.data.sounds.intervals)](x) / 100, volume: 0.04, delay:0.5, duration:duration[2],fadetime:0} );
							blueprint.radio.playtone( {frequency: blueprint.data.sounds.intervals[blueprint.tools.randomkey(blueprint.data.sounds.intervals)](x) / 100, volume: 0.03, delay:0, duration:duration[2],fadetime:0} );
						}
					});
				} 
			}
		},
	}
	blueprint.score.orchestration.filter(o => o.type==="animation").forEach( d => {
		blueprint.tools.logmsg(d.stream);
		blueprint.streams[d.stream] = blueprint.streams.conditions.filter( e => e.clock.tick[d.j] ).filter( d.filterf );
		let action = blueprint.actions[d.actionf](blueprint);
		action.initialize( blueprint, d.actionf );
		blueprint.streams[d.stream].onValue( e => { 
			e.dt = d.dt; e.j = d.j; 
			d.p.key = d.actionf;
			action.f(e, d.p) 
		});
	});
	blueprint.soundloaded = false;
	let resumeaudio = blueprint => {
		try {
			blueprint.radio.player.context.resume().then(() => {
				if(!blueprint.soundloaded){
					blueprint.tools.logmsg("hello ::: lets load sound");
					Object.keys(blueprint.radio.clips).forEach( key => {
						let clip = blueprint.radio.clips[key];
						if(!blueprint.radio.loading.includes(clip.url)) {
							blueprint.radio.loading.push(clip.url);
							let request = new XMLHttpRequest();
							// request.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" +clip.url, true);
							request.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + clip.url, true);
							blueprint.tools.logmsg("url" + window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + clip.url);
							// blueprint.tools.logmsg("trying to load" + clip.url);
							request.responseType = "arraybuffer";
							request.onload = () =>  {
								blueprint.tools.logmsg("loaded" + clip.url);
								blueprint.radio.player.context.decodeAudioData(request.response, buffer => {
									clip.loaded = true;
									clip.buffer = buffer;
									clip.duration = clip.buffer.duration;
									if( clip.duration > blueprint.radio.clipduration.max) {blueprint.radio.clipduration.max = clip.duration}
									else if( clip.duration < blueprint.radio.clipduration.min) {blueprint.radio.clipduration.min  = clip.duration}
									// blueprint.tools.logmsg("decoded" + clip.url);
								}, e => {
									blueprint.tools.logerror("audio error! clip = " + clip.url + ", err = " + e);
								});
								
							}
							request.send();
						}
					});
					
					blueprint.score.orchestration.filter(o => o.type==="sound").forEach( d => {
						blueprint.streams[d.stream] = blueprint.streams.conditions.filter( e => e.clock.tick[d.j] ).filter( d.filterf );
						let action = blueprint.actions[d.actionf](blueprint);
						action.initialize( blueprint, d.actionf );
						blueprint.streams[d.stream].onValue( e => { 
							e.dt = d.dt; e.j = d.j; 
							d.p.key = d.actionf;
							action.f(e, d.p) 
						});
					});
					blueprint.soundloaded = true;
				}
				
				document.querySelector('#volume-on').style.display='none';
				document.querySelector('#volume-off').style.display='block';
				// blueprint.tools.logmsg("Playback resumed successfully");
				blueprint.tools.telegraph(blueprint.elements["telegraph"].el, "sound on");
				blueprint.soundplaying = true;
			});
		} catch(e) {}
	}
	let suspendaudio = blueprint => {
		try {
			blueprint.radio.player.context.suspend().then(() => {
				// blueprint.tools.logmsg("Playback suspended successfully");
				document.querySelector('#volume-off').style.display='none';
				document.querySelector('#volume-on').style.display='block';
				blueprint.tools.telegraph(blueprint.elements["telegraph"].el, "sound off");
				blueprint.soundplaying = false;
			});
		} catch(e) {}
	}
	let hidecontrols = blueprint => {
		try {
			blueprint.tools.logmsg("hidden");
			document.querySelector('#controls').style.display='none';
			document.querySelector('#menu').style.display='block';
		} catch(e) {}
	}
	let showcontrols = blueprint => {
		try {
			blueprint.tools.logmsg("show");
			document.querySelector('#controls').style.display='block';
			document.querySelector('#menu').style.display='none';
		} catch(e) {}
	}
	// One-liner to resume playback when user interacted with the page.
	document.querySelector('#volume-on').addEventListener('click', function() {
		resumeaudio(blueprint);
	});
	document.querySelector('#volume-off').addEventListener('click', function() {
		suspendaudio(blueprint);
	});
	document.querySelector('#hide').addEventListener('click', function() {
		hidecontrols(blueprint);
	});
	document.querySelector('#menu').addEventListener('click', function() {
		showcontrols(blueprint);
	});
	
	blueprint.tools.logmsg("blueprint.radio.player.context.state= "+blueprint.radio.player.context.state);
	// if(blueprint.radio.player.context.state!=="running") {
	// 	try {
	// 		blueprint.radio.player.context.resume().then(() => {
				document.querySelector('#volume-on').style.display='block';
				document.querySelector('#volume-off').style.display='none';
				blueprint.tools.telegraph(blueprint.elements["telegraph"].el, "turn on sound");
		// 	});
		// } catch(e) {}
	// }

	return blueprint;
}


