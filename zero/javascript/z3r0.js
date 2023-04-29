z = {
compass: {
	latitude: 0, longitude: 0,
	time: {start:0, now:0}, dt: 3000,
	count: 1, mode: "darkness"
},
canvas: {
	textcontext: null, thecount: null, timecontext: null, terminalcontext: null, rhterminalcontext: null, 
	width: 0, height: 0, margin: 0,
	sound: {context: null, noisebuffer: null},
},
streams: {}, 
resources: {
	texts: [
		{source: "it was like this every morning"},
		{source: ".. - / .-- .- ... / .-.. .. -.- . / - .... .. ... / . ...- . .-. -.-- / -- --- .-. -. .. -. --."}, //it was like this every morning
		{source: "aXQgd2FzIGxpa2UgdGhpcyBldmVyeSBtb3JuaW5n"}, //it was like this every morning
		{source: "01101000 01100101 01101100 01101100 01101111 00100000 01110111 01101111 01110010 01101100 01100100"}, //hello world
		{source: "aGVsbG8gd29ybGQ="}, //hello world
		{source: "i0i000i0000iiii0i000i0000iii"}, //i
		{source: "#thecount ‰ 0 1 2 3 4 5 6 7 8 9 iº #aftercount #aftertime"}, //
		{source: "høly h0L¥ hølY H0ly ® Å"},
		{source: "Ö x x x ø 0 Ø x X x ø 0 Ø xº3"},
		{source: "hellº wørld"},
		{source: "forEach Å øn t0uch Ž"},
	],
	symbols: ["&#xe63a","&#xe64c","&#xe600","&#xe68b","&#xe601","&#xe602","&#xe644","&#xe603","&#xe604","&#xe607","&#xe609","&#xe60a","&#xe60b","&#xe60c","&#xe60d","&#xe60e","&#xe64c","&#xe63a","&#xe682","&#xe612","&#xe644","&#xe613","&#xe63a","&#xe614","&#xe615","&#xe617","&#xe618","&#xe619","&#xe61a","&#xe61a","&#xe61a","&#xe61b","&#xe61c","&#xe61d","&#xe61e","&#xe61f","&#xe620","&#xe621","&#xe64c","&#xe621","&#xe622","&#xe623","&#xe624","&#xe625","&#xe625","&#xe626","&#xe627","&#xe628","&#xe629","&#xe62a","&#xe62b","&#xe62e","&#xe62f","&#xe630","&#xe631","&#xe633","&#xe634","&#xe635","&#xe637","&#xe638","&#xe639","&#xe63a","&#xe63b","&#xe63c","&#xe63e","&#xe63f","&#xe640","&#xe641","&#xe642","&#xe643","&#xe644","&#xe645","&#xe648","&#xe64a","&#xe64c","&#xe64d","&#xe64e","&#xe64f","&#xe650","&#xe651","&#xe652","&#xe653","&#xe654","&#xe655","&#xe656","&#xe682","&#xe65d","&#xe65e","&#xe662","&#xe663","&#xe664","&#xe666","&#xe667","&#xe66c","&#xe675","&#xe677","&#xe678","&#xe682","&#xe679","&#xe67b","&#xe64c","&#xe67c","&#xe68b","&#xe67d","&#xe67e","&#xe67f","&#xe680","&#xe681","&#xe682","&#xe683","&#xe684","&#xe685","&#xe686","&#xe689","&#xe689","&#xe689","&#xe68b","&#xe68d","&#xe68e"],
	palette: {
		blues: ["#2B4C6F", "#4A6A8A", "#133253", "#041D37", "#009688"],
		greens: ["#267158", "#478D76", "#0E553E", "#003926"],
		oranges: ["#D32F2F", "#E64A19", "#FF5722", "#9a0000"],
		blacks: ["#212121", "#727272"],
		whites: ["fffffa", "#B6B6B6"],
		moon: ["#9a0000", "#de4400", "#de4400", "#ffcc00", "#ffcc00", "#008888", "#4682B4","#4682B4", "#008848",  "#004888", "#006699"],
	},
	tones: {
		lowfreqs: [110, 118, 114, 112],
		midfreqs: [180, 190, 184, 180, 188, 190, 194, 190, 190],
		highfreqs: [220, 230, 240, 244, 238]
	},
},
actions: [
],
start: function() {
	// ***** initialize resources ---------
	z.compass.time.start = new Date();
	z.canvas.width = window.innerWidth; z.canvas.height = window.innerHeight;
	z.canvas.textcontext = document.querySelector("#textcontext");
	z.canvas.thecount = document.querySelector("#thecount");
	z.canvas.timecontext = document.querySelector("#clock");
	z.canvas.terminalcontext = document.querySelector("#terminal");
	z.canvas.rhterminalcontext = document.querySelector("#rhterminal");

	//partition text
	z.resources.texts.forEach(
		function(text, index, array) {
			text.words = text.source.split(" ");
			text.letters = [];
			text.source.split("").forEach(
				function(value, index, array) {
					if(value !== " ") text.letters.push(value);
					else text.letters.push("_");
				}
			)
		}
	);

	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	z.canvas.sound.context = new AudioContext();
	z.canvas.sound.compressor = z.canvas.sound.context.createDynamicsCompressor();
	z.canvas.sound.compressor.threshold.value = -50;
	z.canvas.sound.compressor.knee.value = 40;
	z.canvas.sound.compressor.ratio.value = 12;
	z.canvas.sound.compressor.reduction.value = -20;
	z.canvas.sound.compressor.attack.value = 0;
	z.canvas.sound.compressor.release.value = 0.25;
	z.canvas.sound.gain = z.canvas.sound.context.createGain();
	z.canvas.sound.gain.gain.value = 0.9;
	z.canvas.sound.compressor.connect(z.canvas.sound.gain);
	z.canvas.sound.gain.connect(z.canvas.sound.context.destination);

	//start audio for mobile
	var startsoundonmobile = function(){ z.tools.playsound( 300, 0.4, 1, 0.1, 0.0 ); window.removeEventListener("touchend", startsoundonmobile); document.querySelector("#sound").innerHTML = "&#xe662;"; };
	window.addEventListener("touchend", startsoundonmobile); //window.addEventListener("mousedown", startsoundonmobile);
	if (!('ontouchstart' in window)) { document.querySelector("#sound").innerHTML = "&#xe662;"; }

	(function() { 
		var text = z.resources.texts[z.tools.randominteger(0,z.resources.texts.length-1)].letters.slice(0);
		while(text.length < 120) {text.push.apply(text, z.resources.texts[z.tools.randominteger(0,z.resources.texts.length-1)].letters.slice(0))};
		var dt = 100;
		var stream = Kefir.sequentially(dt, text);
		var letterstosound= function(d) {
			z.tools.playsound( d.charCodeAt(0)*3 + 200, 0.4, .1, 0, 0 ); z.tools.playsound( d.charCodeAt(0)*2 + 210, 0.4, .1, 0, 0.08 );
		};
		stream.onValue( function(l) { letterstosound(l)  });
		stream.onValue( function(l) { z.tools.rhlogmsg(l + " ::: " + l.charCodeAt(0) + "&nbsp;&nbsp;&nbsp;&nbsp;");  });
	})();
	// ***** ############## streams ############## ---------
	// ***** core stream ---------
	(function() {
		var name = "tick";
		var dt = 1000;
		var t0 = new Date();
		var tostring = function(e) {return "t 1 C k"};
		f = 
		function(e) { 
			var el = document.querySelector("#clock");
			el.innerHTML = z.tools.datestr(e.stream.d, {hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"});
		};
		var stream = Kefir.withInterval(dt, function(emitter) { var d = new Date(); emitter.emit( {d:d, dt:dt, t0:t0, tostring: tostring, name:name }) });
		var count = stream.scan( function(count){ return count + 1 }, 0 );
		z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
		z.streams[name].onValue(function(e) { f(e); });
	})();
	
	// ***** morsecodeitwas stream ---------
	(function() {
		var name = "morsecodeitwas";
		var dt = 68000;
		var t0 = new Date();
		var f = 	
		function(e) {
			var textsource = ".. - / .-- .- ... / .-.. .. -.- . / - .... .. ... / . ...- . .-. -.-- / -- --- .-. -. .. -. --.";
			var text = [];
			textsource.split("").forEach(
				function(value, index, array) {
					if(value !== " ") text.push(value);
					else text.push("_");
				}
			);
			var freqchoices = [720, 800, 880, 840, 640], basefreq = freqchoices[z.tools.randominteger(0,freqchoices.length-1)];
			var freqseq = Kefir.sequentially(100, z.translate.morsetoduration(text));
			var morsedurationtosound = function(d) {
				if(d===".") { z.tools.playsound( basefreq, 0.3, .1, 0, 0 ); z.tools.playsound( basefreq/2, 0.2, .1, 0, 0.08 ) }
				else if(d==="-") { z.tools.playsound( basefreq, 0.3, .3, 0, 0 ); z.tools.playsound( Math.floor(2*basefreq/6), 0.2, .3, 0, 0.08 ) }
			};
			freqseq.onValue( function(freq) { morsedurationtosound(freq);  });
			freqseq.onValue( function(freq) { z.tools.rhlogmsg(freq + " ");  });
		};
		var tostring = function(e) {return "source: .. - / .-- .- ... / .-.. .. -.- . / - .... .. ... / . ...- . .-. -.-- / -- --- .-. -. .. -. --.}, // it was like this every morning"};
		var stream = Kefir.withInterval(dt, function(emitter) { emitter.emit( {dt:dt, t0:t0, tostring: tostring, name:name }) });
		var count = stream.scan( function(count){ return count + 1 }, 0 );
		z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
		z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); z.tools.logmsg(f.toString()); f(e); });
	})();
	
	// ***** letterssounding stream---------
	(function() {
		var name = "letterssounding";
		var dt = 38000;
		var t0 = new Date();
		var f =
		function(e) { 
			var text = z.resources.texts[e.count%z.resources.texts.length].letters.slice(0);
			if(e.stream.dt / (4*text.length) > 300) text.push.apply(text, text);
			var dt = e.stream.dt / (4*text.length);
			var stream = Kefir.sequentially(dt, text);
			var letterstosound= function(d) {
				z.tools.playsound( d.charCodeAt(0)*3 + 200, 0.4, .1, 0, 0 ); z.tools.playsound( d.charCodeAt(0)*2 + 210, 0.4, .1, 0, 0.08 );
			};
			stream.onValue( function(l) { letterstosound(l)  });
			stream.onValue( function(l) { z.tools.rhlogmsg(l + " ::: " + l.charCodeAt(0) + "&nbsp;&nbsp;&nbsp;&nbsp;");  });
		};
		var k = 
		function() {
			var tostring = function(e) {return "l e t t e r s ::: å s c 3 n c i ø N"};
			var stream = Kefir.withInterval(dt, function(emitter) { emitter.emit( {dt:dt, t0:t0, tostring: tostring, name:name } )});
			var count = stream.scan( function(count){ return count + 1 }, 0 );
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); z.tools.logmsg(f.toString()); f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
	
	// ***** lettersfloating ---------
	(function() {
		var name = "lettersfloating";
		var dt = 18000;
		var t0 = new Date();
		var f = 	
		function(e) {  
			var text = "01101001".split(""); //i
			var staticCSS = {
				color: function() {return z.resources.palette.moon[z.tools.randominteger(0, z.resources.palette.moon.length-1)]},
				opacity: 0,
				top: function(j,n){ return z.tools.randominteger(10,.1*z.canvas.height).toString() + "px" }, 
				left: function(j,n){ return z.tools.randominteger(10,.3*z.canvas.width).toString() + "px" }, 
				"font-size": z.tools.randominteger(9,48) + "em"
			};
			var elementtype = "div", parentel = z.canvas.textcontext; var classname = "letter absolute large monospace";
			var elements = [], elementsstr = "";

			text.forEach(
				function(value, index, array) {
					var el = document.createElement(elementtype);
					el.className = classname;
					z.tools.applyCSS(el, staticCSS, index, array.length);
					el.innerHTML = value;
					elementsstr = elementsstr + value;
					elements.push(el);
				}
			);
			z.tools.logmsg("elements ::: " + elementsstr );
			elements.forEach(function(value, index, array) { parentel.appendChild(value); });
			Velocity({	
					elements: elements,
					properties: {
						translateX: function(j, n) { return z.canvas.width / 3.0 * j; },
						//translateY: function(j, n) { return z.canvas.height / 4.0 * j; },
						translateY: function(j, n) { return z.tools.randominteger(-z.canvas.height / 4.0, z.canvas.height / 4.0) },
						opacity: 1.0,
					},
					options: {
						duration: Math.floor(e.stream.dt / 8.0),
						delay: 0, loop: false, easing: "swing",
					}
			});
			Velocity(
				{	
					elements: elements,
					properties: {
						translateX: function(j, n) { return -100 * j; },
						translateY: function(j, n) { return -200 * j; },
					},
					options: { duration: Math.floor(e.stream.dt / 12.0)} }
			);
			Velocity(
				{	
					elements: elements,
					properties: {
						opacity: 0.0,
					},
					options: {
						duration: Math.floor(e.stream.dt / 12.0),
						complete: function(elements) { elements.forEach( function(value, index, array) { z.tools.removeelement(value) } ) },
					}
				}
			);
		};
		var tostring = function(e) {return "l e t t e r s ::: f l o a t i n g ::: r 1 s i N g ::: i i i"};
		var k = 
		function() {
			var stream = Kefir.withInterval(dt, function(emitter) { emitter.emit( {dt:dt, t0:t0, tostring: tostring, name:name } )});
			var count = stream.scan( function(count){ return count + 1 }, 0 );
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); z.tools.logmsg(f.toString()); f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
	
	// ***** dancing man stream ---------
	(function() {
		var name = "dancingman";
		var dt = 15000;
		var t0 = new Date();
		var f = 	
		function(e) { 
			var text = "&#xe63a;";
			var staticCSS = {
				color: function() {return z.resources.palette.moon[z.tools.randominteger(0, z.resources.palette.moon.length-1)]},
				opacity: 0.0,
				left: z.tools.randominteger(4,53) + "%",
				top: z.tools.randominteger(38, 54) + "%",
				"font-size": z.tools.randominteger(24,68) + "em"
			};
			var elementtype = "div", parentel = z.canvas.textcontext; var classname = "letter absolute icomoon";
			var translateZ = [-100,-200,-300,-400,-500, 100,200,400,300,500], rotateX = [-380, -480, -730, -230, 248, 360, 480, 730, 880];
			var el = document.createElement(elementtype);
			el.className = classname;
			z.tools.applyCSS(el, staticCSS, 1, 1);
			el.innerHTML = text;
			parentel.appendChild(el);
			Velocity({	
					elements: el,
					properties: {
						rotateZ: function() {return rotateX[z.tools.randominteger(0,rotateX.length-1)]},
						opacity: 1.0,
					},
					options: {
						duration: Math.floor(e.stream.dt / 6.0),
						delay: 0, loop: false, easing: "swing",
					}
			});
			Velocity(
				{	
					elements: el,
					properties: {
						//translateY: function() {return z.tools.randominteger(-z.canvas.height*0.8, z.canvas.height*0.8)},
						//translateX: function() {return z.tools.randominteger(-z.canvas.width, z.canvas.width)},
						translateZ: function() {return z.tools.randominteger(-40, 120)},
						opacity: 0.0,
					},
					options: {
						duration: Math.floor(e.stream.dt / 12.0),
						delay: 2, loop: false, easing: "easeOutSine",
						complete: function(elements) { elements.forEach( function(value, index, array) { z.tools.removeelement(value) } ) },
					}
				}
			);	
		};
		var tostring = function(e) {return "the dancing man ::: xxxøøø"};
		var k =
		function() {
			var stream = Kefir.withInterval(dt, function(emitter) { emitter.emit( {dt:dt, t0:t0, tostring: tostring, name:name } )});
			var count = stream.scan( function(count){ return count + 1 }, 0 );
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); z.tools.logmsg(f.toString()); f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
	
	// ***** rotatinggear stream ---------
	(function() {
		var name = "gear";
		var dt = 13000;
		var t0 = new Date();
		var f = 	
		function(e) { 
			var text = "&#xe631;";
			var staticCSS = {
				color: function() {return z.resources.palette.moon[z.tools.randominteger(0, z.resources.palette.moon.length-1)]},
				opacity: 0.0,
				left: z.tools.randominteger(8,48) + "%", 
				top: z.tools.randominteger(38, 54) + "%",
				//top: "50%",
				"font-size": z.tools.randominteger(18,88) + "em"
			};
			var elementtype = "div", parentel = z.canvas.textcontext;
			rotateX = [-240, -480, -718, 310, 360, 480, 730, 880];
			var el = document.createElement(elementtype);
			el.className = "letter absolute icomoon";
			z.tools.applyCSS(el, staticCSS, 1, 1);
			el.innerHTML = text;
			parentel.appendChild(el);
			Velocity({	
					elements: el,
					properties: {
						rotateZ: z.tools.randominteger(360,900),
						opacity: 1.0,
					},
					options: { duration: Math.floor(e.stream.dt / 4.0), delay: 0, loop: false, easing: "swing"}
			});
			Velocity(
				{	
					elements: el,
					properties: {
						opacity: 0.0,
					},
					options: {
						duration: Math.floor(e.stream.dt / 8.0),
						complete: function(elements) { elements.forEach( function(value, index, array) { z.tools.removeelement(value) } ) },
					}
				}
			);	
		};
		var tostring = function(e) {return "Ø > g E a r # 1 < Ø"};
		var k =
		function() {
			var stream = Kefir.withInterval(dt, function(emitter) { emitter.emit( {dt:dt, t0:t0, tostring: tostring, name:name } )});
			var count = stream.scan( function(count){ return count + 1 }, 0 );
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); z.tools.logmsg(f.toString()); f(e); });

		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
	
	if(z.canvas.width > 1200) {
		// ***** rotatinggear stream ---------
		(function() {
			var name = "gear2";
			var dt = 19000;
			var t0 = new Date();
			var f = 	
			function(e) { 
				var text = "&#xe631;", leftarray = [-48, -38, -68, -53, 88, 83];
				var staticCSS = {
					color: function() {return z.resources.palette.moon[z.tools.randominteger(0, z.resources.palette.moon.length-1)]},
					opacity: 0.0,
					left: leftarray[z.tools.randominteger(0,leftarray.length-1)] + "%", 
					top: z.tools.randominteger(38, 54) + "%",
					"font-size": z.tools.randominteger(48,88) + "em"
				};
				var elementtype = "div", parentel = z.canvas.textcontext;
				rotateX = [-480, -330, -620, 310, 360, 480, 730, 880];
				var el = document.createElement(elementtype);
				el.className = "letter absolute icomoon";
				z.tools.applyCSS(el, staticCSS, 1, 1);
				el.innerHTML = text;
				parentel.appendChild(el);
				Velocity({	
						elements: el,
						properties: {
							rotateZ: z.tools.randominteger(360,900),
							opacity: 1.0,
						},
						options: { duration: Math.floor(e.stream.dt / 4.0), delay: 0, loop: false, easing: "swing"}
				});
				Velocity(
					{	
						elements: el,
						properties: {
							opacity: 0.0,
						},
						options: {
							duration: Math.floor(e.stream.dt / 8.0),
							complete: function(elements) { elements.forEach( function(value, index, array) { z.tools.removeelement(value) } ) },
						}
					}
				);	
			};
			var tostring = function(e) {return "Ø > g E a r # 2 < Ø"};
			var k =
			function() {
				var stream = Kefir.withInterval(dt, function(emitter) { emitter.emit( {dt:dt, t0:t0, tostring: tostring, name:name } )});
				var count = stream.scan( function(count){ return count + 1 }, 0 );
				z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
				z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) );  f(e); });

			};
			z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
			k();
		})();
	}
	
	// ***** z3r0 stream ---------
	(function() {
		var name = "z3r0";
		var dt = 48000;
		var t0 = new Date();
		var f = 	
		function(e) { 
			var text = "z3rø";
			var staticCSS = {
				color: function() {return z.resources.palette.moon[z.tools.randominteger(0, z.resources.palette.moon.length-1)]},
				opacity: 0.0,
				left: z.tools.randominteger(8,13) + "%", 
				top: z.tools.randominteger(18,44) + "%",
				//top: "50%",
				"font-size": z.tools.randominteger(38,88) + "em"
			};
			var elementtype = "div", parentel = z.canvas.textcontext;
			rotateY = [-720,-360,360,720,1440];
			var el = document.createElement(elementtype);
			el.className = "letter absolute zhighest monospace";
			z.tools.applyCSS(el, staticCSS, 1, 1);
			el.innerHTML = text;
			parentel.appendChild(el);
			Velocity({	
					elements: el,
					properties: {
						opacity: 1.0, 
						rotateY: rotateY[z.tools.randominteger(0,rotateY.length-1)],
					},
					options: { duration: Math.floor(e.stream.dt / 4.0), delay: 0, loop: false, easing: "swing"}
			});
			Velocity(
				{	
					elements: el,
					properties: {
						opacity: 0.0
					},
					options: {
						duration: Math.floor(e.stream.dt / 8.0),
						complete: function(elements) { elements.forEach( function(value, index, array) { z.tools.removeelement(value) } ) },
					}
				}
			);	
		};
		var tostring = function(e) {return "the dancing man ::: xxxøøø"};
		var k = 
		function() {
			var stream = Kefir.withInterval(dt, function(emitter) { emitter.emit( {dt:dt, t0:t0, tostring: tostring, name:name } )});
			var count = stream.scan( function(count){ return count + 1 }, 0 );
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); z.tools.logmsg(f.toString()); f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
	
	// ***** helloworld stream ---------
	(function() {
		var name = "helloworld";
		var dt = 44000;
		var t0 = new Date();
		var f = 	
		function(e) { 
			z.resources.texts.forEach(
				function(text, index, array) {
					color= z.resources.palette.moon[z.tools.randominteger(0, z.resources.palette.moon.length-1)];
					z.tools.logmsg( "<h3 style='color:"+color+"'>&nbsp;&nbsp;&nbsp;&nbsp;"+text.source+"</h3>");
				}
			);
		};
		var tostring = function(e) {return "$$ hellº wørld ------"};
		var k =
		function() {
			var stream = Kefir.withInterval(dt, function(emitter) { emitter.emit( {dt:dt, t0:t0, tostring: tostring, name:name } )});
			var count = stream.scan( function(count){ return count + 1 }, 0 );
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
	
	// ***** counting stream ---------#thecount
	(function() {
		var name = "thecount";
		var dt = 8000;
		var t0 = new Date();
		var el = z.canvas.thecount;
		var texts = ["z3r0", "1", "twø", "3", "4", "f1vE", "6", "7", "eiGht","9", "teN", "0", "1", "2", "3", "4", "5", "6", "7", "8","9", "10"];
		var f = 	
		function(e) { 
			var text = texts[e.count%texts.length];
			el.style.fontSize = Math.floor(100 / text.length) + "vmin";
			el.style.color = z.resources.palette.moon[z.tools.randominteger(0, z.resources.palette.moon.length-1)];
			el.innerText = text;
			Velocity({	
					elements: el,
					properties: { opacity: 1.0,},
					options: { duration: Math.floor(e.stream.dt / 8.0), delay: 0, loop: false, easing: "swing"}
			});
			Velocity(
				{	
					elements: el,
					properties: { opacity: 0.0 },
					options: { duration: Math.floor(e.stream.dt / 8.0), delay: e.stream.dt / 3.0,  }
				}
			);	
		};
		var tostring = function(e) {return "ØØØ #thecount ØØØ"};
		var k =
		function() {
			var stream = Kefir.withInterval(dt, function(emitter) { emitter.emit( {dt:dt, t0:t0, tostring: tostring, name:name } )});
			var count = stream.scan( function(count){ return count + 1 }, 0 );
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { /*z.tools.logmsg( e.stream.tostring(e) );*/ f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
	
	// ***** pointerdown stream ---------
	(function() {
		var name = "pointerdown";
		var dt = 20000;
		var t0 = new Date();
		var pointerel = document.querySelector("#youarehere");
		var f = function(e) {
				var x = Math.max(Math.min(e.stream.clientX-40, z.canvas.width - 30),6); 
				var y = Math.max(Math.min(e.stream.clientY-40, z.canvas.height - 60),40); 
				z.tools.playsound( Math.floor(140 + 420*(e.stream.clientX / z.canvas.width)), 0.2, 1, 0.2, 0.0 );
				z.tools.playsound( Math.floor(180 + 480*(e.stream.clientY / z.canvas.height)), 0.2, 1, 0.2, 0.3 );
				pointerel.style.color = z.resources.palette.moon[z.tools.randominteger(0, z.resources.palette.moon.length-1)];
				pointerel.style.left = x + "px"; pointerel.style.top = y + "px";
		};

		var tostring = function(e) {return "&darr; &darr; &darr; pointer down @ ::: x = " + e.stream.clientX + "&& y = " + e.stream.clientY};
		var autostreamf = function() {
			var autostream = Kefir.withInterval(dt, 
							  function(emitter) { 
								  var x = z.tools.randominteger(10,z.canvas.width-10); 
								  var y = z.tools.randominteger(10,z.canvas.height*.6); 
								  var e = { stream: { clientX: x, clientY: y, dt:dt, t0:t0, tostring: tostring, name:name } 
										  }; 
								  emitter.emit( e ) 
							  });
			z.streams.autostream = autostream.takeUntilBy(z.streams.pointerdown);
			z.streams.autostream.onValue(function(e) {
					f(e);
					var text = z.resources.texts[0].letters.slice(0);
					text.push(z.resources.symbols[z.tools.randominteger(0,z.resources.symbols.length-1)]+";");
					text.push("&#xe644;");
					var letterstream = Kefir.sequentially(100, text);
					letterstream.onValue( function(l) { pointerel.innerHTML = l  });
				});
		};
				
		var k =
		function() {
			stream = Kefir.merge(
				[	Kefir.fromEvents(document, "mousedown").map(function(e) { return { clientX: e.clientX-20, clientY: e.clientY, dt:dt, t0:t0, tostring: tostring, name:name } }),
					Kefir.fromEvents(document, "touchstart").map(function(e) { return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY, dt:dt, t0:t0, tostring: tostring, name:name } })
				]
			);
			count = stream.scan( function(sum) { return sum + 1}, 0);
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); z.tools.logmsg(f.toString()); f(e); autostreamf();});
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();autostreamf();	
	})();
	
	// ***** pointerup stream ---------
	(function() {
		var name = "pointerup";
		var dt = 200;
		var t0 = new Date();
		var pointerel = document.querySelector("#youarehere");
		var f = function(e) {
			var text = z.resources.texts[0].letters.slice(0);
			text.push(z.resources.symbols[z.tools.randominteger(0,z.resources.symbols.length-1)]+";");
			text.push("&#xe644;");
			var letterstream = Kefir.sequentially(dt, text);
			letterstream.onValue( function(l) { pointerel.innerHTML = l  });
		};
		var tostring = function(e) {return "&uarr; &uarr; &uarr; pointer up ¡¡¡ "};
		var k =
		function() {
			stream = Kefir.merge(
				[	Kefir.fromEvents(document, "mouseup").map(function(e) { return { e:e, dt:dt, t0:t0, tostring: tostring, name:name } }), 
					Kefir.fromEvents(document, "touchend").map(function(e) { return { e:e, dt:dt, t0:t0, tostring: tostring, name:name } })
				]
			);
			count = stream.scan( function(sum) { return sum + 1}, 0);
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); /*z.tools.logmsg(f.toString());*/ f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
	
	// ***** pointermove stream ---------
	(function() {
		var name = "pointermove";
		var dt = 400;
		var t0 = new Date();
		var f = function(e) {};
		var tostring = function(e) {return "pointer moved ::: x = " + e.stream.clientX + "&& y = " + e.stream.clientY};
		var k =
		function() {
			stream = Kefir.merge(
				[	Kefir.fromEvents(document, "mousemove").throttle(dt).map(function(e) { return { clientX: e.clientX, clientY: e.clientY, dt:dt, t0:t0, tostring: tostring, name:name } }), 
					Kefir.fromEvents(document, "touchmove").throttle(dt).map(function(e) { return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY, dt:dt, t0:t0, tostring: tostring, name:name } }), 
				]
			);
			count = stream.scan( function(sum) { return sum + 1}, 0);
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { /*z.tools.logmsg( e.stream.tostring(e) ); z.tools.logmsg(f.toString());*/ f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
	
	// ***** windowresize stream ---------
	(function() {
		var name = "windowresize";
		var dt = 300;
		var t0 = new Date();
		var f = function(e) {
			z.canvas.width = e.stream.width; z.canvas.height = e.stream.height;
		};
		var tostring = function(e) {return "<h2> window resized ::: width = " + e.stream.width + " && height = " + e.stream.height + "</h2>"};
		var k =
		function() {		
			stream = Kefir.fromEvents(window, "resize").throttle(dt).map(function(e) { return { width: window.innerWidth, height: window.innerHeight, dt:dt, t0:t0, tostring: tostring, name:name } });
			count = stream.scan( function(sum) { return sum + 1}, 0);
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
	
	/*
	// ***** scroll stream ---------
	(function() {
		var name = "scroll";
		var dt = 300;
		var t0 = new Date();
		var f = function(e) {};
		var tostring = function(e) {return "scrolled to ::: x = " + e.stream.pageXOffset + "&& y = " + e.stream.pageYOffset};
		var k =
		function() {
			stream = Kefir.fromEvents(window, "scroll").throttle(dt).map(function(e) { return { pageXOffset: window.pageXOffset, pageYOffset: window.pageYOffset, dt:dt, t0:t0, tostring: tostring, name:name } });
			count = stream.scan( function(sum) { return sum + 1}, 0);
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); z.tools.logmsg(f.toString()); f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
	*/
		
	// ***** daynight stream ---------
	(function() {
		var name = "daynight";
		var dt = 300, autodt = 60*1000*4; //4 minutes
		var t0 = new Date();
		var mode = "darkness";
		var el = document.querySelector("#daynight");
		var pointerel = document.querySelector("#youarehere");
		var body = document.querySelector("body");
		var f = 
		function(e){
			//if(e.count%2 ===1) {
			if(e.stream.mode === "darkness") {
				mode = "daylight";
				e.stream.el.innerHTML = "&#xe61b;";
				body.setAttribute("class", "daylight");
			}
			else {
				mode = "darkness";
				e.stream.el.innerHTML = "&#xe61a;";
				body.setAttribute("class", "darkness");
			}
			document.querySelector("#youarehere").style.top = "200px";
		};
		var tostring = function(e) {return "> ( d A y  ||  n 1 G h t ) <  ::: mode === " + body.getAttribute("class")};
		z.streams.daynightauto = Kefir.withInterval(autodt, function(emitter) { var d = new Date(); emitter.emit( {el: el, d:d, dt:dt, t0:t0, tostring: tostring, name:name }) });
		z.streams.daynightauto.onValue(function(e) {
			var hour = e.d.getHours();
			//console.log("hour = " + hour);
			if( hour > 7 && hour < 16 ) {
				mode = "daylight";
				e.el.innerHTML = "&#xe61b;";
				body.setAttribute("class", "daylight");
			}
			else {
				mode = "darkness";
				e.el.innerHTML = "&#xe61a;";
				body.setAttribute("class", "darkness");
			}		
		});
		
		var k =
		function() {
			stream = Kefir.merge(
				[	Kefir.fromEvents(el, "click").map(function(e) { return { el: el, mode: mode, dt:dt, t0:t0, tostring: tostring, name:name } }),
					Kefir.fromEvents(el, "touchstart").map(function(e) { e.preventDefault(); return { el: el, dt:dt, t0:t0, tostring: tostring, name:name } })
				]
			);
			count = stream.scan( function(sum) { return sum + 1}, 0);
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); z.tools.logmsg(f.toString()); f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
		
	// ***** sound stream ---------
	(function() {
		var name = "sound";
		var dt = 300;
		var t0 = new Date();
		var el = document.querySelector("#sound");
		var f = 
		function(e){
			if(e.count%2 ===1) {
				e.stream.el.innerHTML = "&#xe662;";
				z.canvas.sound.gain.gain.value = 0.9;
			}
			else {
				e.stream.el.innerHTML = "&#xe65e;";
				z.canvas.sound.gain.gain.value = 0.0;
			}
			document.querySelector("#youarehere").style.top = "200px";
		}
		var tostring = function(e) {return "> ( s ø U N D ) <"};
		var k =
		function() {
			stream = Kefir.fromEvents(el, "click").map(function(e) { return { el: el, dt:dt, t0:t0, tostring: tostring, name:name } });
			count = stream.scan( function(sum) { return sum + 1}, 0);
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); z.tools.logmsg(f.toString()); f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
	
	// ***** ############## composite streams ############## ---------
	// ***** deltamove stream ---------
	/*
	(function() {
		var name = "deltamove";
		var dt = undefined;
		var t0 = new Date();
		var f = function(e) {};
		var tostring = function(e) {return "movement detected :::: --> dx = " + e.stream.dx + " & dy = " + e.stream.dy};
		stream = z.streams["pointerdown"].flatMap(
			function(downevent) {
				return z.streams["pointermove"].takeUntilBy(z.streams["pointerup"])
							.diff(
									function(prevevent, nextevent) {
										return {
											dx: nextevent.stream.clientX - prevevent.stream.clientX,
											dy: nextevent.stream.clientY - prevevent.stream.clientY,
											Dx: nextevent.stream.clientX - prevevent.stream.clientX,
											Dy: nextevent.stream.clientY - prevevent.stream.clientY,
											dt:dt, t0:t0, tostring: tostring, name:name
										};
									}, downevent);
			}
		);
		count = stream.scan( function(sum) { return sum + 1}, 0);
		z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
		z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); z.tools.logmsg(f.toString()); f(e); });
	})();
	*/
	
	// ***** swipe stream ---------
	(function() {
		var name = "swipe";
		var dt = undefined;
		var t0 = new Date();
		var f = function(e) {};
		var tostring = function(e) {return "swipe gesture :::: --> dx = " + e.stream.dx + " & dy = " + e.stream.dy};
		var k = 
		function() {
			stream = z.streams["pointerdown"].flatMap(
				function(downevent) {
					return z.streams["pointermove"].takeUntilBy(z.streams["pointerup"])
								.diff(
										function(prevevent, nextevent) {
											return {
												dx: nextevent.stream.clientX - prevevent.stream.clientX,
												dy: nextevent.stream.clientY - prevevent.stream.clientY,
												Dx: nextevent.stream.clientX - prevevent.stream.clientX,
												Dy: nextevent.stream.clientY - prevevent.stream.clientY,
												dt:dt, t0:t0, tostring: tostring, name:name
											};
										}, downevent).last();
				}
			);
			count = stream.scan( function(sum) { return sum + 1}, 0);
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); /*z.tools.logmsg(f.toString());*/ f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();
		
	// ***** leftswipe stream ---------
	(function() {
		var name = "leftswipe";
		var dt = 300;
		var t0 = new Date();
		var f = function(e) { z.tools.logmsg("<h1> &larr; &larr; &larr; leftswipe <- ::: dx === " + e.stream.e.stream.dx + " </h1>") };
		var tostring = function(e) {return "> ( L 3 F t ) <"};
		stream = z.streams.swipe.filter(function(e){ return e.stream.dx < -60 }).map(function(e) { return { e:e, dt:dt, t0:t0, tostring: tostring, name:name } });
		count = stream.scan( function(sum) { return sum + 1}, 0);
		z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
		z.streams[name].onValue(function(e) {  f(e); });
	})();
		
	// ***** rightswipe stream ---------
	(function() {
		var name = "rightswipe";
		var dt = 300;
		var t0 = new Date();
		var f = function(e) { z.tools.logmsg("<h2> &rarr; &rarr; &rarr; rightswipe -> ::: dx === " + e.stream.e.stream.dx + "</h2>") };
		var tostring = function(e) {return "> ( r 1 G h t ) <"};
		stream = z.streams.swipe.filter(function(e){ return e.stream.dx > 60 }).map(function(e) { return { e:e, dt:dt, t0:t0, tostring: tostring, name:name } });
		count = stream.scan( function(sum) { return sum + 1}, 0);
		z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
		z.streams[name].onValue(function(e) {  f(e); });
	})();
	
	// ***** windowresize stream ---------
	(function() {
		var name = "windowresize";
		var dt = 300;
		var t0 = new Date();
		var f = function(e) {
			z.canvas.width = e.stream.width; z.canvas.height = e.stream.height;
		};
		var tostring = function(e) {return "<h2> window resized ::: width = " + e.stream.width + " && height = " + e.stream.height + "</h2>"};
		var k =
		function() {		
			stream = Kefir.fromEvents(window, "resize").throttle(dt).map(function(e) { return { width: window.innerWidth, height: window.innerHeight, dt:dt, t0:t0, tostring: tostring, name:name } });
			count = stream.scan( function(sum) { return sum + 1}, 0);
			z.streams[name] = Kefir.combine([stream], [count], function(stream, count){ return {stream: stream, count: count} });
			z.streams[name].onValue(function(e) { z.tools.logmsg( e.stream.tostring(e) ); f(e); });
		};
		z.tools.logmsg("<h1> stream definition ::: " + name + "</h1>&nbsp;&nbsp;&nbsp;&nbsp;" + k.toString());
		k();
	})();

},
}


z.translate = {

//http://vabate.com/convert-a-base64-encoded-string-to-binary-with-javascript/
//ex ::: utftobinary("♡")
	utftobinary: function(data) {
		//array holds the initial set of un-padded binary results
		var binArray = []
		//the string to hold the padded results
		var datEncode = "";
		//encode each character in data to it's binary equiv and push it into an array
		for (i=0; i < data.length; i++) { binArray.push(data[i].charCodeAt(0).toString(2)); }
		//loop through binArray to pad each binary entry.
		for (j=0; j < binArray.length; j++) {
			//pad the binary result with zeros to the left to ensure proper 8 bit binary
			var pad = padding_left(binArray[j], '0', 8); //append each result into a string
			datEncode += pad + ' ';
		}
		//function to check if each set is encoded to 8 bits, pad the left with zeros if not.
		function padding_left(s, c, n) {
			if (! s || ! c || s.length >= n) {return s;}
			var max = (n - s.length)/c.length;
			for (var i = 0; i < max; i++) { s = c + s; }
			return s;
		} //print array of unpadded results in console
		console.log(binArray); //string of padded results in console
		console.log(datEncode);
	},
	//ex::: utf8totext('\u4e0a\u6d77')
	utf8totext: function( s ){
		return unescape( encodeURIComponent( s ) );
	},
	// binary to unicode character
	//ex ::: bin2ascii("01101111")
	bin2ascii: function(bin) {
	  return String.fromCharCode(parseInt(bin, 2));
	},
	utf8_to_b64: function(str) {
		return window.btoa(unescape(encodeURIComponent(str)));
	},
	b64_to_utf8: function(str) {
		return decodeURIComponent(escape(window.atob(str)));
	},
	//You could define Unicode escape syntax using the following regular expression: \\u[a-fA-F0-9]{4}
	//You could define hexadecimal escape syntax using the following regular expression: \\x[a-fA-F0-9]{2}
	//ex ::: utf8tob64('✓ à la mode'); // "4pyTIMOgIGxhIG1vZGU="
	utf8tob64: function(str) {
		return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
			return String.fromCharCode('0x' + p1);
		}));
	},
	letters: { a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....", i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--", z: "--..", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.", 0: "-----", },
	chartomorse: function(c) {
		s = z.translate.letters[c];
		if(!s) return '';
		return s + ' ';
	},
	morsetoduration: function(morseletters) {
		durationarray=[];
		morseletters.forEach( 
			function(m, index, array) {
				if(m === ".") {durationarray.push(".");durationarray.push("")}
				else if(m === "_") {durationarray.push("");durationarray.push("");}
				else if(m === "-") {durationarray.push("-");durationarray.push("");durationarray.push("");durationarray.push("")}
				else if(m === "/") {durationarray.push(""); durationarray.push("");}
		});
		z.tools.logmsg("durationarray = " + durationarray);
		return durationarray;
	},
	morsedurationtosound: function(d) {
			if(d===".") { z.tools.playsound( 800, 0.4, .1, 0, 0 ); z.tools.playsound( 400, 0.4, .1, 0, 0.08 ) }
			else if(d==="-") { z.tools.playsound( 800, 0.4, .3, 0, 0 ); z.tools.playsound( 200, 0.4, .3, 0, 0.08 ) }
	},
}
//http://akinuri.com/exps/color-transition/first-try
z.tools = {
	logmsg: function(msg, p) {
		//var textentry = "<h5> ++ log entry ::: " + z.tools.datestr(new Date()) + " ::: </h5>" + msg;
		var textentry = "<h5> ++ log entry ::: " + z.tools.datestr(new Date()) + " ::: </h5>      " + msg;
		//console.log(textentry);
		var el = document.createElement("div");
		el.setAttribute("class", "terminalentry");
		if(p) {
			z.tools.applyCSS(el, p.cssstyles, p.j, p.n);
		}
		el.innerHTML = textentry;
		z.canvas.terminalcontext.insertBefore(el, z.canvas.terminalcontext.firstChild);
		if(z.canvas.terminalcontext.childNodes.length > 12) {
			z.canvas.terminalcontext.removeChild(z.canvas.terminalcontext.lastChild);
		}
	},
	rhlogmsg: function(msg, p) {
		var textentry = msg;
		//console.log(textentry);
		var el = document.createElement("div");
		el.setAttribute("class", "rhterminalentry textalignright");
		if(p) {
			el.setAttribute("class", cssclass);
			z.tools.applyCSS(el, p.cssstyles, p.j, p.n);
		}
		else {
			z.tools.applyCSS(el, {color: z.resources.palette.moon[z.tools.randominteger(0, z.resources.palette.moon.length-1)]},1,1);
		}
		el.innerHTML = textentry;
		z.canvas.rhterminalcontext.insertBefore(el, z.canvas.rhterminalcontext.firstChild);
		if(z.canvas.rhterminalcontext.childNodes.length > 13) {
			z.canvas.rhterminalcontext.removeChild(z.canvas.rhterminalcontext.lastChild);
		}
	},
	logerror: function(msg) {console.log("** error log entry ::: " + z.tools.datestr(new Date())  + " ::: " + msg)},
	datestr: function(date, options) {
		if(options===undefined) options = {year: "numeric", month: "2-digit", day: "numeric", hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"};
		return date.toLocaleTimeString("en-US", options);
	},
	//target # octaves = bandwidth below
	getQ: function( bandwidth ){ return Math.sqrt( Math.pow(2, bandwidth) ) / ( Math.pow(2, bandwidth) - 1 ) },
	prefix: (function () {
		var styles = window.getComputedStyle(document.documentElement, ''),
		pre = (Array.prototype.slice
		.call(styles)
		.join('')
		.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
		)[1],
		dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		};
	})(),
	randominteger: function (min, max) {
		//returns a random integer between min (included) and max (included)	
		var nmin = parseInt(min)*1;
		var nmax = parseInt(max)*1;
		var dif = Math.abs(nmax - nmin + 1);
		var randomnum = parseInt(Math.floor (Math.random() * dif + nmin));
		return randomnum;
	},
	playsound: function( frequency, volume, duration, fadetime, delay ) {
		var vco = z.canvas.sound.context.createOscillator();
		/* vco : voltage-controlled oscillator*/
		vco.frequency.value = frequency;
		vco.type = "sine";
		/* vca : voltage-controlled gain */
		var vca = z.canvas.sound.context.createGain();

		/* connect wiring */
		vco.connect(vca);
		//vca.connect(z.canvas.sound.context.destination);
		vca.connect(z.canvas.sound.compressor);

		var currenttime = z.canvas.sound.context.currentTime;

		//fade in
		vca.gain.exponentialRampToValueAtTime(0.001, currenttime + delay);
		vca.gain.exponentialRampToValueAtTime(volume, currenttime + fadetime + delay);
		//fade out
		vca.gain.linearRampToValueAtTime(volume, currenttime + duration + delay - fadetime);
		vca.gain.linearRampToValueAtTime(0.001, currenttime + duration + delay);

		//vca.gain.exponentialRampToValueAtTime(0.1, 3.0 * length / 4.0);

		vco.start(currenttime + delay);
		vco.stop(currenttime + delay + duration + fadetime)
	},
	removeelement: function(el) {
		//var el = document.querySelector(selector);
		if( el != null ) {
			try {
				el.parentNode.removeChild(el);
			}
			catch(err) {
				z.tools.logmsg("error removing element " + err);
			}
		}
		else {
			z.tools.logmsg("in removeelement - couldn't find element :!: ");
		}

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
};
window.onload = function() { z.start()}


