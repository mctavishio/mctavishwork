let blueprint = {};
blueprint.tools = {
	randominteger: (min, max) => {
		return Math.floor( min + Math.random()*(max-min));
	},
	normalrandominteger: (min, max, n) => { // CLT
		return Math.floor(Array.from(Array(n).keys()).reduce( (sum, j) => { return sum + blueprint.tools.randominteger(min,max) }, 0) / n)
	},
	logmsg: function(msg) {
		console.log("### ::: " + msg);
	},
	logerror: function(error) {
		try { console.log("rusty error ... " + error); }
		catch(err) {}
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
	randomhighharmonic: function(min, max) {
		var multipliers = [10.0, 12.5, 13.33, 15, 20];
		// blueprint.tools.logmsg("harmonic = " + multipliers[ blueprint.tools.randominteger( 0, multipliers.length) ]);
		return multipliers[ blueprint.tools.randominteger( 0, multipliers.length) ];
	},
	randomharmonic: function(min, max) {
		var multipliers = [5, 7.5, 10.0, 12.5, 13.33, 15, 20];
		// blueprint.tools.logmsg("harmonic = " + multipliers[ blueprint.tools.randominteger( 0, multipliers.length) ]);
		return multipliers[ blueprint.tools.randominteger( 0, multipliers.length) ];
	},
	randomlowharmonic: function(min, max) {
		var multipliers = [5, 7.5, 10.0, 12.5, 13.33, 15, 20];
		// blueprint.tools.logmsg("harmonic = " + multipliers[ blueprint.tools.randominteger( 0, multipliers.length) ]);
		return multipliers[ blueprint.tools.randominteger( 0, multipliers.length) ]/2;
	},

};
blueprint.score = ( blueprint => {
	let dt = 2, ndrawings = 4;
	return {
		colors: [ ['#fcfbe3','#000000','#ffcc00','#9a0000'],['#fcfbe3','#000000','#9a0000'],['#fcfbe3','#000000','#ffcc00'],['#fcfbe3','#000000'],['#fcfbe3','#000000','#ffcc00'],['#fcfbe3','#000000','#9a0000'],['#fcfbe3','#000000'] ],
		soundclips: {
			typewriter1: {url: "data/sound/typewriter1.mp3", loaded: false, minvolume: 0.6, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.randominteger(4,14)/10 } } },
			clarinet1: {url: "data/sound/clarinet1.mp3", loaded: false, minvolume: 0.5, maxvolume: 0.9, bufferparams: { playbackRate: function(){ return blueprint.tools.randomharmonic(8, 20)/10 } } },
			clarinet1a: {url: "data/sound/clarinet1.mp3", loaded: false, minvolume: 0.5, maxvolume: 0.9, bufferparams: { playbackRate: function(){ return blueprint.tools.randominteger(8,12)/10 } } },
			clarinet1b: {url: "data/sound/clarinet1.mp3", loaded: false, minvolume: 0.5, maxvolume: 0.9, bufferparams: { playbackRate: function(){ return blueprint.tools.randominteger(14,16)/10 } } },
			clarinet1c: {url: "data/sound/clarinet1.mp3", loaded: false, minvolume: 0.5, maxvolume: 0.9, bufferparams: { playbackRate: function(){ return blueprint.tools.randominteger(19,21)/10 } } },
			clarinet2: {url: "data/sound/20171218_clarinet2.mp3", loaded: false, minvolume: 0.4, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.randomharmonic(8, 20)/10 } } },
			clarinetI: {url: "data/sound/clarinet1.mp3", loaded: false, minvolume: 0.4, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.intervals.I(100) / 100 } } },
			clarinetIII: {url: "data/sound/clarinet1.mp3", loaded: false, minvolume: 0.4, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.intervals.III(100) / 100 } } },
			clarinetII: {url: "data/sound/clarinet1.mp3", loaded: false, minvolume: 0.4, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.intervals.II(100) / 100 } } },
			clarinetIV: {url: "data/sound/clarinet1.mp3", loaded: false, minvolume: 0.4, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.intervals.IV(100) / 100 } } },
			clarinetV: {url: "data/sound/clarinet1.mp3", loaded: false, minvolume: 0.4, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.intervals.V(100) / 100 } } },
			clarineti: {url: "data/sound/clarinet1.mp3", loaded: false, minvolume: 0.4, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.intervals.i(100) / 100 } } },
			clarinetvii: {url: "data/sound/clarinet1.mp3", loaded: false, minvolume: 0.4, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.intervals.vii(100) / 100 } } },
			clarinetVIII: {url: "data/sound/clarinet1.mp3", loaded: false, minvolume: 0.4, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.intervals.VIII(100) / 100 } } },
			thunk: {url: "data/sound/thunk.mp3", loaded: false, minvolume: 0.3, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.randomharmonic(8, 20)/10 } } },
			crow1: {url: "data/sound/crow1.mp3", loaded: false, minvolume: 0.8, maxvolume: 0.9, bufferparams: { playbackRate: function(){ return blueprint.tools.randominteger(6, 18)/10 } } },
			bird0: {url: "data/sound/bird0.mp3", loaded: false, minvolume: 0.6, maxvolume: 0.9, bufferparams: {  } },
			bird1: {url: "data/sound/bird1.mp3", loaded: false, minvolume: 0.6, maxvolume: 0.9, bufferparams: {  } },
			bird2: {url: "data/sound/bird2.mp3", loaded: false, minvolume: 0.6, maxvolume: 0.9, bufferparams: {  } },
			bird3: {url: "data/sound/bird3.mp3", loaded: false, minvolume: 0.6, maxvolume: 0.9, bufferparams: {  } },
			birdtheme: {url: "data/sound/birdtheme.mp3", loaded: false, minvolume: 0.5, maxvolume: 0.9, bufferparams: {} },
			bell2: {url: "data/sound/bell2.mp3", loaded: false, minvolume: 0.5, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.randominteger(5,20)/10 } } },
			bell6: {url: "data/sound/bell6.mp3", loaded: false, minvolume: 0.5, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.randominteger(5,20)/10 } } },
			bell11: {url: "data/sound/bell11.mp3", loaded: false, minvolume: 0.5, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.randominteger(4,13)/10 } } },
			submarineecho1: {url: "data/sound/submarineecho.mp3", loaded: false, minvolume: 0.2, maxvolume: 0.8, bufferparams: {   } },
			submarineecho2: {url: "data/sound/submarineecho.mp3", loaded: false, minvolume: 0.2, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.randomharmonic(4,10)/10 }  } },
			weatherradio1: {url: "data/sound/weatherradio1.mp3", loaded: false, minvolume: 0.2, maxvolume: 0.4, bufferparams: {  playbackRate: function(){ return blueprint.tools.randominteger(6,12)/10 }  } },
			icebowedvibes1: {url: "data/sound/icebowedvibes1.mp3", loaded: false, minvolume: 0.2, maxvolume: 0.4, bufferparams: { playbackRate: function(){ return blueprint.tools.randomharmonic(5,13)/10 } } },
			icebowedcymbal2: {url: "data/sound/icebowedcymbal2.mp3", loaded: false, minvolume: 0.3, maxvolume: 0.4, bufferparams: { playbackRate: function(){ return blueprint.tools.randomharmonic(5,11)/10 } } },
			train1: {url: "data/sound/train1.mp3", loaded: false, minvolume: 0.3, maxvolume: 0.6, bufferparams: { playbackRate: function(){ return blueprint.tools.randominteger(6,18)/10 } } },
			fan1: {url: "data/sound/fan1.mp3", loaded: false, minvolume: 0.3, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.randominteger(6,20)/10 } } },
			surf: {url: "data/sound/surf.mp3", loaded: false, minvolume: 0.3, maxvolume: 0.8, bufferparams: { playbackRate: function(){ return blueprint.tools.randominteger(4,20)/10 } } },
			silence1: {url: "data/sound/train1.mp3", loaded: false, minvolume: 0, maxvolume: 0.2, bufferparams: {  } },
			silence2: {url: "data/sound/fan1.mp3", loaded: false, minvolume: 0, maxvolume: 0.2, bufferparams: {  } },
			silence3: {url: "data/sound/surf.mp3", loaded: false, minvolume: 0, maxvolume: 0.2, bufferparams: {  } },
		},
		sounds: [ ["bell2", "bell6", "bell11"], ["clarinet1"], ["birdtheme","silence1","silence2","silence3"],  ["bird0", "bird1", "bird2", "bird3", "birdtheme"], ["crow1"], ["clarinet1"], ["icebowedvibes1", "icebowedvibes1", "icebowedcymbal2"],["bell11"], ["clarinet1"], ["weatherradio1", "train1", "fan1", "surf"], ["typewriter1"], ["birdtheme"],  ["surf", "icebowedvibes1", "icebowedvibes1", "icebowedcymbal2"], ["thunk"], ["typewriter1"], ["bell2", "bell6", "bell11"],  ["clarinet1"], ["surf", "fan1"], ["bird0", "bird1", "bird2", "bird3", "birdtheme"], ["thunk", "weatherradio1"], [ "weatherradio1", "train1", "fan1", "surf" ], ["silence1","silence2","silence3","clarinetI", "clarineti", "clarinetI", "clarineti","clarinetI", "clarineti","clarinetIV", "clarinetV"], ["silence1","silence2","silence3","clarinetI", "clarineti", "clarinetI", "clarineti","clarinetI", "clarineti", "clarinetIV", "clarinetV", "weatherradio1", "train1", "fan1", "surf"], ["train1", "weatherradio1", "train1", "fan1", "surf", "silence1","silence2","silence3"] ],
		ndrawings: ndrawings, nshapes: 4,
		start: new Date(),
		dt: dt,
		drawingnoise: Math.floor( dt * 120 * ndrawings ),
		drawingduration: Math.floor( dt * 300 * ndrawings ),
		drawingdelay: Math.floor( dt * 380 * ndrawings ),
		duration: function( who ) { return blueprint.tools.randominteger( blueprint.score.drawingduration - blueprint.score.drawingnoise, blueprint.score.drawingduration + blueprint.score.drawingnoise ) }, 
		delay: function( who ) { return blueprint.tools.randominteger(blueprint.score.drawingdelay - blueprint.score.drawingnoise, blueprint.score.drawingdelay + blueprint.score.drawingnoise ) + (who.d%4)*40 + (who.e%4)*40  },
		started: (new Date()).getTime(),
		maxnbuffersplaying: 6, maxngrainsplaying: 4,
		sketches: 
			[
				{
					id: "stripes",
					title: "stripes",
					getp: function( blueprint, who, e ) {
						var r = 20;
						var cx = blueprint.tools.randominteger(0,e.canvas.width);
						var cy = blueprint.tools.randominteger(0,e.canvas.height);
						return { r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
					},
					getsketch: function( blueprint, who, p, e ) {
						var gears =  [];
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "line", number: r,
								score: {
									opacity: 1.0,
									x1: 0,
									x2: e.canvas.width,
									y1: e.canvas.height/2,
									y2: e.canvas.height/2,
									strokeWidth: blueprint.tools.randominteger(e.canvas.height*0.1,(blueprint.score.ndrawings-who.d)*e.canvas.height*0.3),
									strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, e.canvas.max/3) / blueprint.tools.randominteger(1,3),
									// strokeWidth: e.canvas.strokeWidth() * 4,
									// strokeDasharray: e.canvas.strokeDasharray( e.canvas.min ),
									stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
								}
							});
						});
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "circle", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "rect", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						return gears;
					}
				},
				{
					id: "stripes2",
					title: "stripes 2",
					getp: function( blueprint, who, e ) {
						var r = 20;
						var cx = blueprint.tools.randominteger(0,e.canvas.width);
						var cy = blueprint.tools.randominteger(0,e.canvas.height);
						return { r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
					},
					getsketch: function( blueprint, who, p, e ) {
						var gears =  [];
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "line", number: r,
								score: {
									opacity: 1.0,
									x1: e.canvas.width/2,
									x2: e.canvas.width/2,
									y1: 0,
									y2: e.canvas.height,
									strokeWidth: blueprint.tools.randominteger(e.canvas.height*0.1,(blueprint.score.ndrawings-who.d)*e.canvas.width*0.2),
									strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, e.canvas.max) / blueprint.tools.randominteger(1,3),
									// strokeWidth: e.canvas.strokeWidth() * 4,
									// strokeDasharray: e.canvas.strokeDasharray( e.canvas.min ),
									stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
								}
							});
						});
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "circle", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "rect", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						return gears;
					}
				},
				{
					id: "racketball",
					title: "racketball",
					getp: function( blueprint, who, e ) {
						var rx = blueprint.tools.randominteger(e.canvas.min*0.3,e.canvas.min*0.8);
						var cx = blueprint.tools.randominteger(0,e.canvas.width);
						var cy = blueprint.tools.randominteger(0,e.canvas.height);
						var r = rx * blueprint.tools.randominteger(1,4);
						return { r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
					},
					getsketch: function( blueprint, who, p, e ) {

						// e.canvas.rendertext( blueprint, e );
						var gears =  [];
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "line", number: r,
								score: {
									opacity: 1.0,
									x1: p.cx,
									x2: p.cx,
									y1: 0,
									y2: e.canvas.height, 
									// strokeWidth: e.canvas.strokeWidth() * 2,
									// strokeDasharray: e.canvas.strokeDasharray( e.canvas.min ) / 2,
									strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 )*[4,3,2,1][who.d%4],
									strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, e.canvas.width) / [1,2,3,3][who.d%4],
									stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
								}
							});
						});
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "circle", number: r,
								score: {
									opacity: 1.0,
									cx: p.cx,
									cy: p.cy,
									r: p.r,
									fillOpacity: 0.0,
									strokeOpacity: 1.0,
									strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 ),
									strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, p.r ),
									stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)],
									fill: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
								}
							});
						});
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "rect", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						return gears;
					}
				},

				{
					id: "centralcircles",
					title: "central circles",
					getp: function( blueprint, who, e ) {
						var r = blueprint.tools.randominteger(e.canvas.min*.3, e.canvas.max*.4);
						var cx = e.canvas.width / 2.0;
						var cy = e.canvas.height / 2.0;
						return { r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
					},
					getsketch: function( blueprint, who, p, e ) {
						var gears =  
						[
							{
								type: "line", number: "0",
								score: {
									opacity: 1.0,
									x1: -e.canvas.width*blueprint.tools.randominteger(1,3),
									x2: e.canvas.width*blueprint.tools.randominteger(1,3),
									y1: p.cy,
									y2: p.cy,
									strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 ) / 1.8,
									strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, e.canvas.width) / blueprint.tools.randominteger(1,3),
									stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
								}
							},
							{
								type: "line", number: "1",
								score: {
									opacity: 1.0,
									x1: p.cx,
									x2: p.cx, y1: -e.canvas.height*blueprint.tools.randominteger(1,3),
									y2: e.canvas.height*blueprint.tools.randominteger(1,3),
									strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 ) / 1.8,
									strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, e.canvas.height ) / blueprint.tools.randominteger(1,3),
									stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
								}	
							},
						];
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "circle", number: r,
								score: {
									opacity: 1.0,
									cx: p.cx,
									cy: p.cy,
									r: p.r,
									fillOpacity: 0.0,
									strokeOpacity: 1.0,
									strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 ),
									strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, 4*p.r ),
									stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
								}
							});
						});
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "rect", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						[2,3].forEach(function(r) {
							gears.push({ 
								type: "line", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						return gears;
					}
				},
				{
					id: "leftcenterright",
					title: "left center right",
					getp: function( blueprint, who, e ) {
						var r = blueprint.tools.randominteger(e.canvas.min*0.2, e.canvas.min*0.8);
						var cx = [0, e.canvas.width/2, e.canvas.width][blueprint.tools.randominteger(0,3)];
						var cy = e.canvas.height*0.5;
						// var r = rx*0.9;
						return { r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
					},
					getsketch: function( blueprint, who, p, e ) {
						var gears =  [];
						gears.push({
							type: "rect", number: "0",
							score: {
								opacity: 1.0,
								x: 0,
								y: -e.canvas.height/2,
								width: e.canvas.width,
								height: e.canvas.height*2,
								fillOpacity: 0.0,
								strokeOpacity: 1.0,
								strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 )*7,
								strokeDasharray: blueprint.tools.randominteger( 10+(who.d%blueprint.score.ndrawings)*10, 18+(who.d%blueprint.score.ndrawings)*13),
								stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
							}
						});
						gears.push({
							type: "line", number: "0",
							score: {
								opacity: 1.0,
								x1: -e.canvas.width*blueprint.tools.randominteger(1,2),
								x2: e.canvas.width*blueprint.tools.randominteger(1,2),
								y1: p.cy,
								y2: p.cy,
								strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 ) / blueprint.tools.randominteger(2,3),
								strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, e.canvas.width) / blueprint.tools.randominteger(1,2),
								stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
							}
						});
						gears.push({
							type: "line", number: "1",
							score: {
								opacity: 0.0,
								x1: p.cx,
								x2: p.cx,
								y1: -e.canvas.height*blueprint.tools.randominteger(1,2),
								y2: e.canvas.height*blueprint.tools.randominteger(1,2),
								strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 ) / blueprint.tools.randominteger(1,3),
								strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, e.canvas.height )  / blueprint.tools.randominteger(1,2),
								stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
							}
						});
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "circle", number: r,
								score: {
									opacity: 1.0,
									cx: p.cx,
									cy: p.cy,
									r: p.r,fillOpacity: 1.0,
									strokeOpacity: 1.0,
									strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 ),
									strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, 4*p.r),
									stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)],
									fill: e.colors[blueprint.tools.randominteger(0,e.colors.length)],
								}
							});
						});
						[1,2,3].forEach(function(r) {
							gears.push({ 
								type: "rect", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						[2,3].forEach(function(r) {
							gears.push({ 
								type: "line", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						return gears;
					},
				},
				{
					id: "leftcenterright2",
					title: "left center right 2",
					getp: function( blueprint, who, e ) {
						var r = blueprint.tools.randominteger(e.canvas.min*0.2, e.canvas.min*0.8);
						var cx = [ 0,  e.canvas.width/2, e.canvas.width, e.canvas.width/2 ][blueprint.tools.randominteger(0,3)];
						var cy = e.canvas.height*0.5;
						return { r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
					},
					getsketch: function( blueprint, who, p, e ) {
						var gears =  [];
						gears.push({
							type: "rect", number: "0",
							score: {
								opacity: 1.0,
								x:  0,
								y: -e.canvas.height/2,
								width: e.canvas.width,
								height: e.canvas.height*2,
								fillOpacity: 0.0,
								strokeOpacity: 1.0,
								strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 )*4,
								strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, e.canvas.width*e.canvas.height) / 6,
								stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
							}
						});
						gears.push({
							type: "line", number: "0",
							score: {
								opacity: 1.0,
								x1: -e.canvas.width*blueprint.tools.randominteger(1,2),
								x2: e.canvas.width*blueprint.tools.randominteger(1,2),
								y1: p.cy,
								y2: p.cy,
								strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 ) * 2,
								strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, e.canvas.width) / 3,
								stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
							}
						});
						gears.push({
							type: "line", number: "1",
							score: {
								opacity: 1.0,
								x1: p.cx,
								x2: p.cx,
								y1: -e.canvas.height*blueprint.tools.randominteger(1,2),
								y2: e.canvas.height*blueprint.tools.randominteger(1,2),
								strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 )*2,
								strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, e.canvas.height )  / 3,
								stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
							}
						});
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "circle", number: r,
								score: {
									opacity: 1.0,
									cx: p.cx,
									cy: p.cy,
									r: p.r, ry: p.r,
									fillOpacity: 1.0,
									strokeOpacity: 0.0,
									strokeWidth: 0,
									strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, 4*p.r ),
									fill: e.colors[blueprint.tools.randominteger(0,e.colors.length)],
								}
							});
						});
						[1,2,3].forEach(function(r) {
							gears.push({ 
								type: "rect", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						[2,3].forEach(function(r) {
							gears.push({ 
								type: "line", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						return gears;
					},
				},
				{
					id: "leftright",
					title: "leftright",
					getp: function( blueprint, who, e ) {
						var r = blueprint.tools.randominteger(e.canvas.width*.1, e.canvas.width*0.8);
						var cy = blueprint.tools.randominteger(0,e.canvas.height);
						var cx = [0, e.canvas.width][who.d % 2];
						return { r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
					},
					getsketch: function( blueprint, who, p, e ) {
						var gears =  [];
						gears.push({
							type: "rect", number: "0",
							score: {
								opacity: 1.0,
								x: blueprint.tools.randominteger(e.canvas.width*.38,e.canvas.width*.4),
								y: 0,
								width: blueprint.tools.randominteger(e.canvas.width*.03,e.canvas.width*.06),
								height: e.canvas.height,
								fillOpacity: 1.0,
								strokeOpacity: 1.0,
								strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 ),
								strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, p.r*2 )*0.4,
								stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)],
								fill: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
							}
						});
						gears.push({
							type: "line", number: "0",
							score: {
								opacity: 1.0,
								x1: p.cx===0?0:e.canvas.width-p.r,
								x2: p.cx===0?p.r:e.canvas.width,
								y1: p.cy,
								y2: p.cy,
								strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 )*0.3,
								strokeDasharray: blueprint.tools.randominteger(9,18),
								stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
							}
						});
						gears.push({
							type: "line", number: "1",
							score: {
								opacity: 1.0,
								x1: p.cx,
								x2: p.cx,
								y1: p.cy - p.r*1.1,
								y2: p.cy + p.r*1.1,
								strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 ),
								strokeDasharray: blueprint.tools.randominteger(9,18),
								stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
							}
						});
						[0,1].forEach(function(r) {
							gears.push({ 
								type: "circle", number: r,
								score: {
									opacity: 1.0,
									cx: p.cx,
									cy: p.cy,
									r: p.r,
									fillOpacity: 1.0,
									strokeOpacity: 1.0,
									strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 ) * 0.5,
									strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, 4*p.r ),
									stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)],
									fill: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
								}
							});
						});
						[2,3].forEach(function(r) {
							gears.push({ 
								type: "circle", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						[1,2,3].forEach(function(r) {
							gears.push({ 
								type: "rect", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						[2,3].forEach(function(r) {
							gears.push({ 
								type: "line", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						return gears;
					},
				},
				{
					id: "spine",
					title: "spine",
					getp: function( blueprint, who, e ) {
						//var rx = e.canvas.min/2;
						var r = blueprint.tools.randominteger(e.canvas.min*.8, e.canvas.max*0.48)
						var cx = e.canvas.width/2;
						var cy = e.canvas.height/2;
						return { r: Math.floor(r), cx: Math.floor(cx), cy: Math.floor(cy) }
					},
					getsketch: function( blueprint, who, p, e ) {
						var w = e.canvas.width;
						var gears =  [];
						gears.push({
							type: "rect", number: "0",
							score: {
								opacity: 1.0,
								x: 0,
								y: -1.0*w/2,
								width: e.canvas.width,
								height: e.canvas.height+w,
								fillOpacity: 0.0,
								strokeOpacity: 1.0,
								//strokeWidth: e.canvas.strokeWidth()*3,
								strokeWidth: w,
								strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, e.canvas.width) * (blueprint.score.ndrawings-who.d+1)*0.25,
								stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)],
								
							}
						});
						gears.push({
							type: "line", number: "0",
							score: {
								opacity: 1.0,
								x1: p.cx,
								x2: p.cx,
								y1: 0,
								y2: e.canvas.height,
								strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 )*[4,3,2,1,0.8,0.6,0.5,0.5,0.5][who.d%10],
								strokeDasharray: e.canvas.width,
								stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
							}
						});
						[0].forEach(function(r) {
							gears.push({ 
								type: "circle", number: r,
								score: {
									opacity: 1.0,
									cx: p.cx,
									cy: p.cy,
									r: p.r, 
									fillOpacity: 0.0,
									strokeOpacity: 1.0,
									strokeWidth: blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 ),
									strokeDasharray: blueprint.tools.randominteger(e.canvas.min*0.02, 4*p.r),
									stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
								}
							});
						});
						[1,2,3].forEach(function(r) {
							gears.push({ 
								type: "rect", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						[1,2,3].forEach(function(r) {
							gears.push({ 
								type: "circle", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						[1,2,3].forEach(function(r) {
							gears.push({ 
								type: "line", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						return gears;
					}
				},
				{
					id: "ticket",
					title: "ticket",
					getp: function( blueprint, who, e ) {
						/* for print */
						if(!e.clock.count) e.clock.count = blueprint.tools.randominteger(0,40); 

						var n=40, t = e.clock.count%n;
						var multiplier = t < n/2 ? 2*t/n : 2*(n - t)/n;
						var width = 10 + multiplier*e.canvas.width;
						n=42, t = e.clock.count%n;
						multiplier = t < n/2 ? 2*t/n + 0.1 : 2*(n - t)/n + 0.1;

						var height = 10 + multiplier*e.canvas.height;
						// blueprint.tools.logmsg("t = " + t + " multiplier = " + multiplier);
						var x = (e.canvas.width - width)/2;
						var y = (e.canvas.height - height)/2;
						return { x: Math.floor(x), y: Math.floor(y), width: Math.floor(width), height: Math.floor(height) }
					},
					getsketch: function( blueprint, who, p, e ) {
						/* for print */
						if(!e.d || blueprint.score.keywords.indexOf("book") === -1) e.d = blueprint.tools.randominteger(0,5);

						var gears =  [];
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "rect", number: r,
								score: {
									opacity: 1.0,
									x: p.x,
									y: p.y,
									width: p.width,
									height: p.height,
									fillOpacity: 0,
									strokeOpacity: 1.0,
									strokeWidth: (r===0) ? blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 )/2 : blueprint.tools.randominteger(e.canvas.min*0.05, e.canvas.min*0.2 )/r,
									strokeDasharray: 10 + ( (e.d%6) * blueprint.tools.randominteger(e.canvas.min*0.02, e.canvas.min*(blueprint.score.ndrawings-who.d) )/6 ),
									strokeDashoffset: blueprint.tools.randominteger(0, p.height*2 + p.width*2 ),
									stroke: e.colors[blueprint.tools.randominteger(0,e.colors.length)],
									fill: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
								}
							});
						});
						[0,1].forEach(function(r) {
							//var rad = blueprint.tools.randominteger(10, Math.min(e.canvas.min*0.1, p.width));
							var rad = blueprint.tools.randominteger(20, Math.min(p.width, p.height)*0.1 + 20);
							gears.push({ 
								type: "circle", number: r,
								score: {
									opacity: 1.0,
									cx: p.x + p.width - blueprint.tools.randominteger(0,p.width) - rad,
									cy: p.y + p.height - blueprint.tools.randominteger(0,p.height) - rad,
									r: rad,
									fillOpacity: 1,
									//fillOpacity: who.d===0 ? [0,1,0,0,0,0,1,0,0][blueprint.tools.randominteger(0,8)] : 0,
									//fillOpacity:0,
									strokeOpacity: 0,
									//strokeWidth: (r===0) ? e.canvas.strokeWidth()/2 : e.canvas.strokeWidth()/r,
									strokeWidth: 0,
									fill: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
								}
							});
						});
						[2,3].forEach(function(r) {
							var rad = blueprint.tools.randominteger(20, Math.min(p.width, p.height)*0.1 + 20);
							gears.push({ 
								type: "circle", number: r,
								score: {
									opacity: 1.0,
									cx: blueprint.tools.randominteger(0,e.canvas.width),
									cy: blueprint.tools.randominteger(0,e.canvas.height),
									r: rad,fillOpacity: 1,
									//fillOpacity: who.d===0 ? [0,1,0,0,0,0,1,0,0][blueprint.tools.randominteger(0,8)] : 0,
									//fillOpacity:0,
									strokeOpacity: 0,
									//strokeWidth: (r===0) ? e.canvas.strokeWidth()/2 : e.canvas.strokeWidth()/r,
									strokeWidth: 0,
									fill: e.colors[blueprint.tools.randominteger(0,e.colors.length)]
								}
							});
						});
						[0,1,2,3].forEach(function(r) {
							gears.push({ 
								type: "line", number: r,
								score: {
									opacity: 0.0
								}
							});
						});
						return gears;
					}
				},
			],
	}
} )( blueprint );


blueprint.streams = ( blueprint => {
	const date0 = new Date();
	const t0 = date0.getTime();
	const d0 = Math.floor(t0/(10*1000)), q0 = Math.floor(t0/(15*1000)), m0 = Math.floor(t0/(60*1000))
	let clock0 = {
		date: date0, t: t0, d: d0, q: q0, m: m0,
		newd: false, newq: false, newm: true, currentd: d0, currentq: q0, currentm: m0, count: 0
	};
	blueprint.tools.logmsg("clock0 = " + JSON.stringify(clock0));
	return { 
		clock: Kefir.withInterval( 1000, emitter => { emitter.emit( { date: new Date() } ) })
			.scan( (state, e) => { 
				state.date = e.date;
				state.t = e.date.getTime();
				state.d = Math.floor(state.t/(10*1000));
				state.q = Math.floor(state.t/(15*1000));
				state.m = Math.floor(state.t/(60*1000));
				state.newd = state.currentd !== state.d ? true : false;
				state.newq = state.currentq !== state.q ? true : false;
				state.newm = state.currentm !== state.m ? true : false;
				state.currentd = state.d; state.currentq = state.q; state.currentm = state.m; 
				++state.count; 
				blueprint.tools.logmsg(state.count);
				return state 
			}, clock0  ),

		canvas: Kefir.fromEvents(window, "resize").throttle(200)
			.scan( (state,e) => {
				state.width = window.innerWidth;
				state.height = window.innerHeight;
				state.max = Math.max(state.width, state.height);
				state.min = Math.min(state.width, state.height);
				return state
			}, { width: window.innerWidth, height: window.innerHeight, max: Math.max(window.innerWidth, window.innerHeight), min: Math.min(window.innerWidth, window.innerHeight)}),

	}
} )( blueprint );

blueprint.streams.sketch = ( blueprint => { 
	let dx = 1;
	return blueprint.streams["clock"].filter(x => { return x.newm && x.m%dx === 0 })
		.scan( (state, e) => { blueprint.tools.logmsg("sketch ::: " + blueprint.score.sketches[ 0 ].id); return blueprint.score.sketches[ Math.floor( e.m/dx ) % blueprint.score.sketches.length ] }, blueprint.score.sketches[0]);
})( blueprint );

blueprint.streams.colors = ( blueprint => { 
	return blueprint.streams["clock"].filter(x => { return x.newq })
		.scan( (state, e) => { return blueprint.score.colors[ e.m % blueprint.score.colors.length ] }, blueprint.score.colors[0]);
})( blueprint );

blueprint.streams.sounds = ( blueprint => { 
	let dx=2;
	return blueprint.streams["clock"].filter(x => { return x.newm })
		.scan( (state, e) => { 
			if(e.m%2 === 0) { state.bleed =  state.core; state.core = blueprint.score.sounds[ Math.floor( e.m / dx ) % blueprint.score.sounds.length ] }
			else { state.bleed = blueprint.score.sounds[ Math.floor( e.m / dx + 1 ) % blueprint.score.sounds.length ]  } 
			return state;
		}, { core: blueprint.score.sounds[0], bleed: blueprint.score.sounds[0]} );
})( blueprint );

blueprint.elements = ( blueprint => {
	let body = document.querySelector("body");
	let elements = {};
	elements["body"] = { el: document.querySelector("body") };
	elements["body"].el.setAttribute("id", "body");
	elements["stage"] = { el: document.createElement("div") };
	elements["stage"].el.setAttribute("id", "stage");
	elements["stage"].el.setAttribute("class", "frame");

	elements["svgframe"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "svg") };
	elements["svgframe"].el.setAttributeNS(null, "id", "svgframe");
	elements["svgframe"].el.setAttributeNS(null, "class", "svgframe");
	elements["svgframe"].el.setAttributeNS(null, "width", window.innerWidth);
	elements["svgframe"].el.setAttributeNS(null, "height", window.innerHeight);

	elements["bgframe"] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
	elements["bgframe"].el.setAttributeNS(null, "id", "bgframe");
	elements["bgframe"].el.setAttributeNS(null, "class", "bgframe");
	elements["bgframe"].el.setAttributeNS(null, "x", "0");
	elements["bgframe"].el.setAttributeNS(null, "y", "0");
	elements["bgframe"].el.setAttributeNS(null, "width", "0");
	elements["bgframe"].el.setAttributeNS(null, "height", "0");
	elements["bgframe"].el.setAttributeNS(null, "fill", "none");
	elements["svgframe"].el.appendChild(elements["bgframe"].el);

	Array.from(Array(blueprint.score.ndrawings).keys()).map(  d => {
		elements["drawing_"+d] = { el: document.createElementNS("http://www.w3.org/2000/svg", "g") };
		elements["drawing_"+d].el.setAttributeNS(null, "id", "drawing_"+d);
		elements["drawing_"+d].el.setAttributeNS(null, "class", "drawing");
		Array.from(Array(blueprint.score.nshapes).keys()).map(  s => {
			elements["circle_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
			elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "id", "circle_d"+d+"e"+s);
			elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape circle");
			elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "cx", "0");elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "cy", "0");elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "r", "0");elements["circle_d"+d+"e"+s].el.setAttributeNS(null, "fill", "none");
			elements["drawing_"+d].el.appendChild(elements["circle_d"+d+"e"+s].el);
			
			elements["line_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "line") };
			elements["line_d"+d+"e"+s].el.setAttributeNS(null, "id", "line_d"+d+"e"+s);
			elements["line_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape line");
			elements["line_d"+d+"e"+s].el.setAttributeNS(null, "x1", "0");elements["line_d"+d+"e"+s].el.setAttributeNS(null, "x2", "0");elements["line_d"+d+"e"+s].el.setAttributeNS(null, "y1", "0");elements["line_d"+d+"e"+s].el.setAttributeNS(null, "y2", "0");
			elements["drawing_"+d].el.appendChild(elements["line_d"+d+"e"+s].el);

			elements["rect_d"+d+"e"+s] = { el: document.createElementNS("http://www.w3.org/2000/svg", "rect") };
			elements["rect_d"+d+"e"+s].el.setAttributeNS(null, "id", "rect_d"+d+"e"+s);
			elements["rect_d"+d+"e"+s].el.setAttributeNS(null, "class", "shape rect");
			elements["rect_d"+d+"e"+s].el.setAttributeNS(null, "x", "0");elements["rect_d"+d+"e"+s].el.setAttributeNS(null, "y", "0");elements["rect_d"+d+"e"+s].el.setAttributeNS(null, "width", "0");elements["rect_d"+d+"e"+s].el.setAttributeNS(null, "height", "0");elements["rect_d"+d+"e"+s].el.setAttributeNS(null, "fill", "none");
			elements["drawing_"+d].el.appendChild(elements["rect_d"+d+"e"+s].el);
			
		})
		elements["svgframe"].el.appendChild(elements["drawing_"+d].el);
	});
	elements["stage"].el.appendChild(elements["svgframe"].el);
	elements["body"].el.appendChild(elements["stage"].el);

	return elements;
})( blueprint );

blueprint.radio = ( blueprint => {
	let radio = {
		minclipduration:0, maxclipduration:0,
		nbuffersplaying: 0, ngrainsplaying:0
	};
	radio.soundclips = {};
	blueprint.score.sounds.forEach( function(playlist) {
		playlist.forEach( function(clip) {
			if(!radio.soundclips[clip]){ 
				blueprint.tools.logmsg("clip="+blueprint.score.soundclips[clip].url);
				radio.soundclips[clip] = 
				{ 	url: blueprint.score.soundclips[clip].url,
					loaded: false, duration: 0, buffer: null,
					minvolume: blueprint.score.soundclips[clip].minvolume, 
					maxvolume: blueprint.score.soundclips[clip].maxvolume, 
					bufferparams: blueprint.score.soundclips[clip].bufferparams
				}
			}
		});
	});
	Object.keys(radio.soundclips).forEach( key => {
		var clip = radio.soundclips[key];
		//blueprint.tools.logmsg("clip.url " + clip.url);
		//var source = blueprint.radio.player.context.createBufferSource();
		var request = new XMLHttpRequest();
		blueprint.tools.logmsg("get 2 ::: " + window.location.protocol + "//"+window.location.hostname + ":" + window.location.port + "/" +clip.url);
		request.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" +clip.url, true);
		request.responseType = "arraybuffer";
		request.onload = function() {
			blueprint.radio.player.context.decodeAudioData(request.response, function(buffer) {
				clip.loaded = true;
				clip.buffer = buffer;
				clip.duration = clip.buffer.duration;
				if( clip.duration > blueprint.radio.maxclipduration) {blueprint.radio.maxclipduration = clip.duration}
					else if( clip.duration < blueprint.radio.minclipduration) {blueprint.radio.minclipduration  = clip.duration}
						// blueprint.tools.logmsg("clip.url " + clip.url + " duration " + clip.buffer.duration);
				}, e => {
					blueprint.tools.logerror("audio error! " + e);
				});
		}
		request.send();
	});
	//https://www.keithmcmillen.com/blog/making-music-in-the-browser-web-audio-and-midi-api-amplitude-modulation/	
	
	/* set up player*/
	radio.player = {};
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	radio.player.context = new AudioContext();

	/* experimental parameters */
	var parameters = [
		{ gain: 0.4, threshold: -24, knee: 30, ratio: 12, attack: 0.003, release: 0.25 }, //default
		{ gain: 0.3, threshold: -18, knee: 30, ratio: 18, attack: 0.0003, release: 0.28 },
		{ gain: 0.5, threshold: -8, knee: 30, ratio: 18, attack: 0.003, release: 0.28 },
		{ gain: 0.8, threshold: -8, knee: 30, ratio: 18, attack: 0.003, release: 0.28 },
		];
		var n = 3;
		radio.player.gain = radio.player.context.createGain();
		radio.player.gain.gain.value = parameters[n].gain;
	//https://webaudio.github.io/web-audio-api/#idl-def-DynamicsCompressorNode
	radio.player.compressor = radio.player.context.createDynamicsCompressor();
	radio.player.compressor.threshold.value = parameters[n].threshold; // [-100,0] ::: default -24
	radio.player.compressor.knee.value = parameters[n].knee; // [0,40] ::: default 30
	radio.player.compressor.ratio.value = parameters[n].ratio; // [1,20] ::: default 12
	//radio.player.compressor.reduction.value = -20;
	radio.player.compressor.attack.value = parameters[n].attack;  // [0,1] ::: default .003
	radio.player.compressor.release.value = parameters[n].release;  // [0,1] ::: default .25
	//with compressor
	// radio.player.gain.connect(radio.player.compressor);
	// radio.player.compressor.connect(radio.player.context.destination);
	
	//with no compressor
	radio.player.gain.connect(radio.player.context.destination);
	radio.playtone = function(e) {
		var vco = blueprint.radio.player.context.createOscillator();
		/* vco : voltage-controlled oscillator*/
		vco.frequency.value = e.frequency;
		vco.type = "sine";
		var vca = blueprint.radio.player.context.createGain();;

		/* connect wiring */
		vco.connect(vca);
		//vca.connect(z.canvas.sound.context.destination);
		vca.connect(blueprint.radio.player.gain);

		var currenttime = blueprint.radio.player.context.currentTime;

		//fade in
		vca.gain.exponentialRampToValueAtTime(0.001, currenttime + e.delay);
		vca.gain.exponentialRampToValueAtTime(e.volume, currenttime + e.fadetime + e.delay);
		//fade out
		vca.gain.linearRampToValueAtTime(e.volume, currenttime + e.duration + e.delay - e.fadetime);
		vca.gain.linearRampToValueAtTime(0.001, currenttime + e.duration + e.delay);

		//vca.gain.exponentialRampToValueAtTime(0.1, 3.0 * length / 4.0);

		vco.start(currenttime + e.delay);
		vco.stop(currenttime + e.delay + e.duration + e.fadetime)
	};
	radio.playbuffer = function(e) {
		if(blueprint.radio.nbuffersplaying<blueprint.score.maxnbuffersplaying) {
			try {
				// blueprint.tools.logmsg("--> e.clip ::: " + e.clip);
				var clip = blueprint.radio.soundclips[e.clip];
				if(clip.loaded) {
					var vca = blueprint.radio.player.context.createGain(); 
					vca.gain.value = e.volume;
					var source = blueprint.radio.player.context.createBufferSource();
					source.buffer = clip.buffer;
					//source["playbackRate"].value = blueprint.tools.randominteger(5,10)/5;

					try {
						if(clip.bufferparams) {
							Object.keys(clip.bufferparams).forEach( function(key) {
								source[key].value = clip.bufferparams[key]();
								// blueprint.tools.logmsg("audio param " + key + " = " + source[key].value);
							});
						}
					} catch(e) { blueprint.tools.logerror("error applying params to audio buffer e::: " + e) }
					
					source.connect(vca);
					blueprint.tools.logmsg("--> play clip ::: " + e.clip + " volume ::: " + e.volume);
					vca.connect(blueprint.radio.player.gain);
					source.loop = false;
					source.onended = function(e) { blueprint.radio.nbuffersplaying=blueprint.radio.nbuffersplaying-1} ;
					++blueprint.radio.nbuffersplaying;
					var currenttime = blueprint.radio.player.context.currentTime;
					source.start(currenttime + e.delay);
				}
			}
			catch(e) { blueprint.tools.logerror(e) }
		}
	};
	radio.playgrain = function(e) {
		// blueprint.tools.logmsg("-->ngrainsplaying ::: " + blueprint.radio.ngrainsplaying + " from max" + blueprint.initp.maxngrainsplaying);
		if(blueprint.radio.ngrainsplaying<blueprint.score.maxngrainsplaying) {
			try {
				// blueprint.tools.logmsg("-->grain from ::: e.clip ::: " + e.clip);
				var clip = blueprint.radio.soundclips[e.clip];
				if(clip.loaded) {
					var now = blueprint.radio.player.context.currentTime;
					var dt = Math.min(blueprint.tools.randominteger(18,24)/10,clip.duration*.12);
					var offset = blueprint.tools.randominteger(0, (clip.duration-dt*3)*10)/10;
					// blueprint.tools.logmsg("offset = " + offset + ", dt = " + dt);
					var vca = blueprint.radio.player.context.createGain(); 
					var source = blueprint.radio.player.context.createBufferSource();
					source.buffer = clip.buffer;
					source.connect(vca);
					// blueprint.tools.logmsg("--> play grain clip ::: " + e.clip + " volume ::: " + e.volume);
					vca.connect(blueprint.radio.player.gain);
					source.loop = false;
					source.onended = function(e) { blueprint.radio.ngrainsplaying=blueprint.radio.ngrainsplaying-1} ;
					++blueprint.radio.ngrainsplaying;
					source.start(now, offset, dt*3); //parameters (when,offset,duration
					vca.gain.setValueAtTime(0.0, now);
					vca.gain.linearRampToValueAtTime(e.volume, now + dt);
					vca.gain.linearRampToValueAtTime(0, now + 3*dt ); 
				}
			}
			catch(e) { blueprint.tools.logerror(e) }
		}
	}
	return radio;
})( blueprint );

//animate
blueprint.streams.step = ( blueprint => { 
	// blueprint.tools.logmsg("blueprint.score.dt = " + blueprint.score.dt);
	return blueprint.streams["clock"].filter( x => { return x.count % blueprint.score.dt === 0});
})( blueprint );

blueprint.streams.animate = ( blueprint => { 
	return Kefir.combine([blueprint.streams.step], [blueprint.streams.canvas, blueprint.streams.colors, blueprint.streams.sketch], function(step, canvas, colors, sketch){ return {clock: step, canvas: canvas, colors: colors, sketch: sketch} })
})( blueprint );

( blueprint => { 
	blueprint.streams.canvas.onValue( e => {
		blueprint.elements["svgframe"].el.setAttributeNS(null, "width", e.width);
		blueprint.elements["svgframe"].el.setAttributeNS(null, "height", e.height);
		blueprint.elements["bgframe"].el.setAttributeNS(null, "width", e.width);
		blueprint.elements["bgframe"].el.setAttributeNS(null, "height", e.height);
	})
})(blueprint);
( blueprint => {
	blueprint.streams.animate.onValue( e => {
		let d = Math.floor(e.clock.count/blueprint.score.dt) % blueprint.score.ndrawings; 
		let who = { d: d, e: 0 };
		let p = e.sketch.getp( blueprint, who, e );
		// blueprint.tools.logmsg("p = " + JSON.stringify(p));
		let gears = e.sketch.getsketch( blueprint, who, p, e );
		gears.forEach( gear => {
			who.e = gear.number;
			// blueprint.tools.logmsg("gear.score = " + JSON.stringify(gear.score));
			// blueprint.tools.logmsg("element id = " + gear.type+"_d"+d+"e"+gear.number);
			Velocity({	
					elements: blueprint.elements[gear.type+"_d"+d+"e"+gear.number].el,
					properties: gear.score,
					options: { duration: blueprint.score.duration(who), delay: blueprint.score.delay(who), easing: "easeInOutQuad" },
				});
		});
		if( blueprint.tools.randominteger(0,100) < 40 ) {
			Velocity({	
				elements: blueprint.elements["bgframe"].el,
				properties: { opacity:1.0, fill: e.colors[blueprint.tools.randominteger(0,e.colors.length)] },
				options: { duration: blueprint.tools.randominteger(800,1200), delay: blueprint.tools.randominteger(80,200),  easing: "easeInOutQuad" },
			});
		}
	});
})(blueprint);

blueprint.streams.playcoreclip = ( blueprint => { 
	let step = blueprint.streams["clock"].filter( x => { return blueprint.tools.randominteger(0,100) < 48 });
	return Kefir.combine([step], [blueprint.streams.sounds], (step, sounds) => { return {clock: step, sounds: sounds} })
})( blueprint );

blueprint.streams.playbleedclip = ( blueprint => { 
	let step = blueprint.streams["clock"].filter( x => { return blueprint.tools.randominteger(0,100) < 4 });
	return Kefir.combine([step], [blueprint.streams.sounds], (step, sounds) => { return {clock: step, sounds: sounds} })
})( blueprint );


blueprint.streams.playcoreclip.onValue( e => {
	blueprint.tools.logmsg("playcoreclip e = " + JSON.stringify(e.sounds));
	var clip = e.sounds.core[blueprint.tools.randominteger(0, e.sounds.core.length)];
	blueprint.tools.logmsg("play clip " + clip);
	var vol = blueprint.tools.randominteger(blueprint.radio.soundclips[clip].minvolume*10, blueprint.radio.soundclips[clip].maxvolume*10)/10;
	blueprint.radio.playbuffer( { clip: clip, volume: vol, delay: blueprint.tools.randominteger(0,4)/10 } );
});

blueprint.streams.playbleedclip.onValue( e => {
	blueprint.tools.logmsg("playcoreclip e = " + JSON.stringify(e.sounds));
	var clip = e.sounds.bleed[blueprint.tools.randominteger(0, e.sounds.bleed.length)];
	blueprint.tools.logmsg("play clip " + clip);
	var vol = blueprint.tools.randominteger(blueprint.radio.soundclips[clip].minvolume*10, blueprint.radio.soundclips[clip].maxvolume*10)/10;
	blueprint.radio.playbuffer( { clip: clip, volume: vol, delay: blueprint.tools.randominteger(0,4)/10 } );
});


Object.keys(blueprint.streams).filter( key => {return key !== "clock"}).forEach( key => {
	blueprint.tools.logmsg("key " + key );
	blueprint.streams[key].onValue( e => { blueprint.tools.logmsg("onvalue ::: " + key + ": " + JSON.stringify(e)) });
});

// One-liner to resume playback when user interacted with the page.
// document.querySelector('body').addEventListener('click', function() {
// 	blueprint.radio.player.context.resume().then(() => {
// 		blueprint.tools.logmsg("**** Playback resumed successfully");
// 	});
// });

let resumeaudio = blueprint => {
	try {
		blueprint.radio.player.context.resume().then(() => {
			document.querySelector('#volume-on').style.display='none';
			document.querySelector('#volume-off').style.display='block';
			blueprint.tools.logmsg("Playback resumed successfully");
		});
	} catch(e) {}
}
let suspendaudio = blueprint => {
	try {
		blueprint.radio.player.context.suspend().then(() => {
			blueprint.tools.logmsg("Playback resumed successfully");
			console.log("volume off ***!");
			document.querySelector('#volume-off').style.display='none';
			document.querySelector('#volume-on').style.display='block';
		});
	} catch(e) {}
}
let hidecontrols = blueprint => {
	try {
		blueprint.tools.logmsg("hidden");
		console.log("hidden controls ***!");
		document.querySelector('#controls').style.display='none';
		document.querySelector('#menu').style.display='block';
	} catch(e) {}
}
let showcontrols = blueprint => {
	try {
		blueprint.tools.logmsg("show");
		console.log("show controls ***!");
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
blueprint.radio.player.context.onstatechange = function() {
  	console.log(blueprint.radio.player.context.state);
}
if(blueprint.radio.player.context.state!=="suspended") {
	try {
			blueprint.radio.player.context.resume().then(() => {
			document.querySelector('#volume-on').style.display='none';
			document.querySelector('#volume-off').style.display='block';
			blueprint.tools.logmsg("was already playing");
			console.log("was already playing");
		});
	} catch(e) {}
}