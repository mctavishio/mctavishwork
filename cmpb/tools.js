let createtools = z => {
	return {
		randominteger: (min, max) => {
			return Math.floor( min + Math.random()*(max-min));
		},
		normalrandominteger: (min, max, n) => { // CLT
			return n === 0 ? z.tools.randominteger(min,max) : Math.floor(Array.from(Array(n).keys()).reduce( (sum, j) => { return sum + z.tools.randominteger(min,max) }, 0) / n)
		},
		clearDOMelement: (el) => {
			el.innerHTML = "";
		},
		telegraph: (el, msg) => {
			if(el) {
				try { el.innerHTML =  msg; z.tools.logmsg("... " + msg);}
				catch(err) { z.tools.logerror(err) }
			}
			else {
				z.tools.logmsg(" || ... " + msg);
			}
		},
		logmsg: function(msg) {
			try { 
				// console.log("### ::: " + msg); 
			}
			catch(err) { z.tools.logerror(err) }
		},
		logerror: function(error) {
			try { console.log("rusty error ... " + error); }
			catch(err) {}
		},
		randomhighharmonic: () => {
			let multipliers = [10.0, 12.5, 13.33, 15, 20];
			return multipliers[ z.tools.randominteger( 0, multipliers.length) ];
		},
		randomharmonic: () => {
			let multipliers = [5, 7.5, 10.0, 12.5, 13.33, 15, 20];
			return multipliers[ z.tools.randominteger( 0, multipliers.length) ];
		},
		randomlowharmonic: () => {
			let multipliers = [5, 7.5, 10.0, 12.5, 13.33, 15, 20];
			return multipliers[ z.tools.randominteger( 0, multipliers.length) ]/2;
		},
		randomkey: (object) => {
			let keys = Object.keys(object);
			let key = keys[z.tools.randominteger(0,keys.length)];
			// z.tools.logmsg("key = " + key);
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
			return blanks[ z.tools.randominteger(0,ndrawings+2) ];
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
				z.tools.logmsg("key " + key );
				streams[key].onValue( e => { z.tools.logmsg("onvalue ::: " + key + ": " + JSON.stringify(e)) });
			});
		},
		datestr: function(date, options) {
			if(options===undefined) options = {year: "numeric", month: "2-digit", day: "numeric", hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"};
			return date.toLocaleTimeString("en-US", options);
		},
		applyCSS: function(el, css, j, n) {
			var j = j || 0, n = n || 1;
			for (var key in css) {
				if (css.hasOwnProperty(key)) {
					if(typeof css[key] === "function") el.style[ key ] = css[key](j, n);
					else el.style[ key ] = css[key];
				}
			}
		},
	}
};