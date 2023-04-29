// ***** ############## streams ############## ---------
let createstreams = z => {
	z.streams = {};

	// ***** drawp stream ---------
	createdrawp(z);

	// ***** box stream ---------
	(function() {
		let name = "box";
		let dt = 2; //in seconds
		let ratios = [5,10,15,20,30,40];
		let tostring = function(e) {return "box"};
		let box0 = {
			elements: z.elements["box"],
			count: 0,
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.count = state.count + 1;
				return state;
			}, box0  )
		z.streams[name].onValue( e => { 
			try {
				let color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
				if(e.count%5!==0) {
					Velocity({	
						elements: e.elements.el,
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/100, e.canvas.min/40), strokeDasharray: z.tools.randominteger(10, e.canvas.max*2), fill: color, x: 0, y: 0, width: e.canvas.width, height: e.canvas.height },
						options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
					});
				}
				else if(e.count%3===0) {
					Velocity({	
						elements: e.elements.el,
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/40, e.canvas.min/10), strokeDasharray: 9, fill: color, x: 0, y: 0, width: e.canvas.width, height: e.canvas.height },
						options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
					});
				}
				else if(e.count%2===0) {
					Velocity({	
						elements: e.elements.el,
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/100, e.canvas.min/40), strokeDasharray: z.tools.randominteger(10, e.canvas.min*2), fill: color, x: z.tools.randominteger(0,e.canvas.grid.nrows-1)*e.canvas.grid.dx, y: 0, width: e.canvas.grid.dx, height: e.canvas.height },
						options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
					});
				}
				else {
					Velocity({	
						elements: e.elements.el,
						properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: z.tools.randominteger(e.canvas.min/100, e.canvas.min/40), strokeDasharray: z.tools.randominteger(10, e.canvas.min*2), fill: color, x: 0, y: z.tools.randominteger(0,e.canvas.grid.ncols-1)*e.canvas.grid.dy, width: e.canvas.width, height: e.canvas.grid.dy },
						options: { duration: z.tools.randominteger(e.dt*800,e.dt*900),  delay: z.tools.randominteger(0,e.dt*80), easing: "easeInOutQuad" },
					});
				}
				
			} catch(err) {}
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** square stream ---------
	(function() {
		let name = "squares";
		let dt = 4; //in seconds
		let ratios = [5,10,15,20,30,40];
		let tostring = function(e) {return "squares"};
		let squares0 = {
			elements: z.elements["squares"],
			count: 0,
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.count = state.count + 1;
				return state;
			}, squares0  )
		z.streams[name].onValue( e => { 
			try {
				let dx = e.canvas.grid.dx, dy = e.canvas.grid.dy;
				let color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
				e.elements.forEach( (row, r) => {
					if(Math.floor(e.tick.t/dt)%4!==0) { color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];}
					let y = r*dy;
					e.elements[r].forEach( (col,c) => {
						if(Math.floor(e.tick.t/dt)%5!==0) { color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];}
						let x = c*dx;
						// z.tools.logmsg("c="+e.palette.colors.length + " color="+color);
						Velocity({	
							elements: e.elements[r][c].el,
							properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: 12, fill: color, x: x, y: y, width: dx*ratios[z.tools.randominteger(0,ratios.length)]/10, height: dy*ratios[z.tools.randominteger(0,ratios.length)] },
							options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
						});
					})

				})
				
			} catch(err) {}
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();


	// ***** circles0 stream ---------
	(function() {
		let name = "circles0";
		let dt = 3; //in seconds
		let ratios = [5,10,15,20,30,40];
		let tostring = function(e) {return "circles0"};
		let circles0 = {
			elements: z.elements["circles0"],
			count: 0,
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.count = state.count + 1;
				return state;
			}, circles0  )
		z.streams[name].onValue( e => { 
			try {
				let min = Math.min(e.canvas.grid.dx, e.canvas.grid.dy);
				// let pick = z.tools.randominteger(0,e.canvas.grid.ncols*e.canvas.grid.nrows);
				e.elements.forEach( (row, r) => {
					let cy = r*e.canvas.grid.dy + e.canvas.grid.dy/2;
					e.elements[r].forEach( (col,c) => {
						let cx = c*e.canvas.grid.dx + e.canvas.grid.dx/2, color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
						// let radius = ( ((e.boxpick.row ===r && e.boxpick.col===c) || (e.boxpick.row ===c && e.boxpick.col===r)) && e.count%2===0) ? min*ratios[z.tools.randominteger(0,ratios.length)]/10 : min*z.tools.randominteger(1,3)/10;
						let radius = min*z.tools.randominteger(3,5)/10;
						// z.tools.logmsg("c="+e.palette.colors.length + " color="+color);

						Velocity({	
							elements: e.elements[r][c].el,
							properties: { fillOpacity: 0.0, strokeOpacity: 1.0, stroke: color, strokeWidth: e.canvas.grid.sw, fill: color, cx: cx, cy: cy, r: radius },
							options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
						});
					})

				})
				
			} catch(err) {}
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** circles1 stream ---------
	(function() {
		let name = "circles1";
		let dt = 3; //in seconds
		let ratios = [5,10,15,20];
		let tostring = function(e) {return "circles1"};
		let circles1 = {
			elements: z.elements["circles1"],
			count: 0,
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["drawp"].filter( e => e.tick.t%dt===0 )
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.count = state.count + 1;
				return state;
			}, circles1  )
		z.streams[name].onValue( e => { 
			try {
				let min = Math.min(e.canvas.grid.dx, e.canvas.grid.dy);
				// let pick = z.tools.randominteger(0,e.canvas.grid.ncols*e.canvas.grid.nrows);
				e.elements.forEach( (row, r) => {
					let cy = r*e.canvas.grid.dy + e.canvas.grid.dy/2;
					e.elements[r].forEach( (col,c) => {
						// z.tools.logmsg("c="+c + " e.boxpick.col="+e.boxpick.col + "r="+r + " e.boxpick.row="+e.boxpick.row);
						// let radius = ( ((e.boxpick.row ===r && e.boxpick.col===c) || (e.boxpick.row ===c && e.boxpick.col===r)) && e.count%5===0)  ? min*ratios[z.tools.randominteger(0,ratios.length)]/10 : min*z.tools.randominteger(1,3)/10;
						let radius = min*z.tools.randominteger(1,3)/10;
						let cx = c*e.canvas.grid.dx + e.canvas.grid.dx/2, color = e.palette.colors[z.tools.randominteger(0,e.palette.colors.length)];
						// z.tools.logmsg("c="+e.palette.colors.length + " color="+color);
						Velocity({	
							elements: e.elements[r][c].el,
							properties: { fillOpacity: 1.0, strokeOpacity: 0.0, stroke: color, strokeWidth: 12, fill: color, cx: cx, cy: cy, r: radius },
							options: { duration: z.tools.randominteger(e.dt*200,e.dt*400),  delay: z.tools.randominteger(0,e.dt*600), easing: "easeInOutQuad" },
						});
					})

				})
				
			} catch(err) {}
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** sound set stream ---------
	(function() {
		let name = "sounds";
		let dt = 38; //in seconds
		let date0 = new Date();
		let t0 = Math.floor(date0.getTime()/1000);
		let tostring = function(e) {return "sounds"};
		let sounds0 = {
			sounds: z.score.orchestration[ Math.floor(t0/dt)% z.score.orchestration.length ],
			count: 0,
			past: ["piano1"],
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["tick"].filter( e => e.t%dt===0 )
			.scan( (state, e) => { 
				state.past = state.sounds;
				state.sounds = z.score.orchestration[ Math.floor(e.t/dt)% z.score.orchestration.length ],
				state.count = state.count + 1;
				return state;
			}, sounds0  )
		z.streams[name].onValue( e => { 
			// z.elements["stage"].el.setAttribute("style", "background-color: " + e.colors[z.tools.randominteger(0, e.colors.length)]);
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();


	// ***** sound stream ---------
	(function() {
		let name = "sound";
		let dt = 1; //in seconds
		let tostring = function(e) {return "sound"};
		let sound0 = {
			count: 0,
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = Kefir.combine([z.streams["tick"].filter( e => e.t%dt===0 && z.score.soundplaying && z.tools.randominteger(0,10)<8 )], [z.streams["sounds"]], (tick, sounds) => { return {tick:tick, sounds:sounds } })
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.sounds = e.sounds.sounds;
				state.count = state.count + 1;
				return state;
			}, sound0  )
		z.streams[name].onValue( e => { 
			try {
				let sound = e.sounds[z.tools.randominteger(0,e.sounds.length)];
				// z.tools.logmsg(" play instrument ::: " + sound);
				let instrumentname = sound;
				let instrument = z.data.sounds.instruments[sound];
				let vol = z.tools.randominteger(instrument.minvolume*10, instrument.maxvolume*10)/10;
				z.radio.playbuffer( { instrument: sound, volume: vol, delay: z.tools.randominteger(0,4)/10 } );
				if(z.tools.randominteger(0,10) < 2) {
					Kefir.sequentially(400, [0, 1, 2, 3]).onValue( x => { 
						z.radio.playgrain( { instrument: instrumentname, volume: vol, delay: 0 } );
					});
				}

			} catch(err) {}
			// z.tools.logmsg(JSON.stringify(e));
		});
	})();

}