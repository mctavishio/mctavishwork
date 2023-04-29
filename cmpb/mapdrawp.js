let createdrawp = z => {

	// ***** clock stream ---------
	(function() {
		let name = "tick";
		let dt = 1; //in seconds
		let date0 = new Date();
		let t0 = Math.floor(date0.getTime()/1000);
		let tostring = function(e) {return "clock"};
		let clock0 = {
			date: date0,
			t: t0, count: 0,
			changed: false,
			count: 0,
			past: Math.floor(t0 / 1000),
			dt:dt, t0:t0, tostring: tostring, name:name 
		};
		z.streams[name] = Kefir.withInterval( 1000, emitter => { emitter.emit( { date: new Date() } ) })
			.scan( (state, e) => { 
				state.date = e.date;
				state.past = state.t;
				state.t = Math.floor(e.date.getTime()/1000);
				state.changed = state.t !== state.past ? true : false;
				state.count = state.count + 1;
				return state;
			}, clock0  )
		z.streams[name].onValue( e => { 
			// z.tools.logmsg(JSON.stringify(e));
			z.elements["clock"].el.innerHTML = z.tools.datestr(new Date(e.t*1000));
			// z.elements["clock"].el.innerHTML = z.tools.datestr(e.date, {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"});
		});
	})();

	// ***** color palette stream ---------
	(function() {
		let name = "palette";
		let dt = 48; //in seconds
		let date0 = new Date();
		let t0 = Math.floor(date0.getTime()/1000);
		let palette = z.score.palette;
		let tostring = function(e) {return "color palette"};
		let palette0 = {
			palette: palette,
			colors: palette[ Math.floor(t0/dt)%palette.length ],
			count: 0,
			past: ["#fcfbe3", "#191918"],
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = z.streams["tick"].filter( e => e.t%dt===0 )
			.scan( (state, e) => { 
				state.past = state.colors;
				state.colors = state.palette[ Math.floor(e.t/dt)%state.palette.length ];
				state.count = state.count + 1;
				return state;
			}, palette0  )
		// z.streams[name].onValue( e => { 
		// 	// z.elements["stage"].el.setAttribute("style", "background-color: " + e.colors[z.tools.randominteger(0, e.colors.length)]);
		// 	z.tools.logmsg(JSON.stringify(e.colors));
		// });
	})();

	// ***** book stream ---------
	(function() {
		let name = "book";
		let dt = 68; //in seconds
		let date0 = new Date();
		let t0 = Math.floor(date0.getTime()/1000);
		z.tools.logmsg("z.score.texts = " + z.score.texts);
		let texts = z.score.texts;
		let tostring = function(e) {return "book palette"};
		let palette0 = {
			texts: texts,
			text: z.data.language.texts[ texts[ Math.floor(t0/dt)%texts.length ]],
			count: 0,
			past: ["Ã– x x x Ã¸ 0 Ã˜", "x X x Ã¸ 0 Ã˜ xÂº3"],
			dt:dt, tostring: tostring, name:name 
		};
		// z.tools.logmsg(JSON.stringify("text" + palette0.text));
		z.streams[name] = z.streams["tick"].filter( e => e.t%dt===0 )
			.scan( (state, e) => { 
				state.past = state.text;
				state.text = z.data.language.texts[state.texts[ Math.floor(e.t/dt)%state.texts.length ]];
				state.count = state.count + 1;
				return state;
			}, palette0  )
		z.streams[name].onValue( e => { 
			// z.elements["stage"].el.setAttribute("style", "background-color: " + e.colors[z.tools.randominteger(0, e.colors.length)]);
			// z.tools.logmsg(JSON.stringify(e.text));
		});
	})();

	// ***** canvas stream ---------
	(function() {
		let name = "canvas";
		let dt = 400; //in milliseconds
		let tostring = e => { return "canvas stream" };
		let width = window.innerWidth, height = window.innerHeight;
		let dx = Math.floor(width/z.score.nrows), dy = Math.floor(height/z.score.ncols);
		let sw = Math.floor(Math.max(dx*.03, dy*.03, 4));
		let canvas0 = { 
			grid: { nrows: z.score.nrows, ncols: z.score.ncols, dx: dx, dy: dy, sw: sw },
			width: width, height: height, 
			max: Math.max(window.innerWidth, window.innerHeight), min: Math.min(window.innerWidth, window.innerHeight), 
			dt:dt, tostring: tostring, name:name 
		};
		z.streams[name] = Kefir.fromEvents(window, "resize").throttle(dt)
			.scan( (state,e) => {
				state.width = window.innerWidth;
				state.height = window.innerHeight;
				state.max = Math.max(state.width, state.height);
				state.min = Math.min(state.width, state.height);
				state.grid.dx = Math.floor(state.width/state.grid.nrows);
				state.grid.dy = Math.floor(state.height/state.grid.ncols);
				state.grid.sw = Math.floor(Math.max(state.grid.dx*.03, state.grid.dy*.03, 4));
				return state
			}, canvas0)

		z.streams[name].onValue( e => { 
			z.tools.logmsg(JSON.stringify(e));
		});
	})();

	// ***** box pick stream ---------
	(function() {
		let name = "boxpick";
		let dt = 9; //in seconds
		let ratios = [5,10,15,20,30,40];
		
		let tostring = function(e) {return "box pick"};
		let pick0 = {
			row: 0, col: 0,
			count: 0, nrows: z.score.nrows, ncols: z.score.ncols,
			past: [z.tools.randominteger(0, z.score.nrows), z.tools.randominteger(0, z.score.ncols)],
			dt:dt, tostring: tostring, name:name,
			past: [],
		};
		//build memory
		Array.from(Array(z.score.m).keys()).forEach(  r => {
			pick0.past.unshift([z.tools.randominteger(0, z.score.nrows), z.tools.randominteger(0, z.score.ncols)]);
		});
		z.streams[name] = z.streams["tick"].filter( e => e.t%dt===0 )
			.scan( (state, e) => { 
				state.past.shift();
				state.past.push([z.tools.randominteger(0, state.nrows), z.tools.randominteger(0, state.ncols)]);
				// state.row = z.tools.randominteger(0, state.nrows);
				// state.col = z.tools.randominteger(0, state.ncols);
				state.count = state.count + 1;
				return state;
			}, pick0  );
		// z.streams[name].onValue( e => { 
		// 	z.tools.logmsg("boxpick stream " + JSON.stringify(e));
		// });
	})();

	// ***** drawing parameters stream ---------
	(function() {
		let name = "drawp";
		let dt = 1; //in seconds
		let date0 = new Date();
		let t0 = Math.floor(date0.getTime()/1000);
		let tostring = function(e) {return "draw parameters"};
		let drawp0 = {
			count: 0,
			dt:dt, t0:t0, tostring: tostring, name:name 
		};
		z.streams[name] = Kefir.combine([z.streams["tick"]], [z.streams["palette"], z.streams["canvas"], z.streams["boxpick"], z.streams["book"]], (tick, palette, canvas, boxpick, book) => { return {tick:tick, palette:palette, canvas:canvas, boxpick:boxpick, book:book } })
			.scan( (state, e) => { 
				state.tick = e.tick;
				state.palette = e.palette;
				state.canvas = e.canvas;
				state.boxpick = e.boxpick;
				state.book = e.book;
				state.count = state.count + 1;
				return state;
		}, drawp0  );
		// z.streams[name].onValue( e => { 
		// 	z.tools.logmsg("drawp *** " + JSON.stringify(e));
		// });
	})();
};