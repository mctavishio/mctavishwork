let createradio = z => {
	return {
		clipduration: { min:0, max:0 },
		n: { buffersplaying: 0, grainsplaying:0 },
		max: { buffersplaying: z.score.version === "small" ? 6 : 12, grainsplaying: z.score.version === "small" ? 6 : 12 },
		player: {}, loading: [], clips: {}, instruments: {},
		durationthrottle: z.score.version === "small" ? [[6,0.9],[8,0.6],[14,0.4],[18,0.2],[40,0.1]] : [[6,1.0],[8,0.8],[14,0.6],[18,0.4],[40,0.3]],
		loadclips: z => {
			Object.keys(z.radio.clips).forEach( key => {
				let clip = z.radio.clips[key];
				if(!z.radio.loading.includes(clip.url)) {
					z.radio.loading.push(clip.url);
					let request = new XMLHttpRequest();
					//for localhost testing
					// request.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" + clip.url, true);
					// for deploy
					request.open("GET", window.location.protocol + "//" + window.location.hostname + "/" + clip.url, true);
					z.tools.logmsg("url = " + window.location.protocol + "//" + window.location.hostname + "/"  + clip.url);
					request.responseType = "arraybuffer";
					request.onload = () =>  {
						// z.tools.logmsg("loaded" + clip.url);
						z.radio.player.context.decodeAudioData(request.response, buffer => {
							clip.loaded = true;
							clip.buffer = buffer;
							clip.duration = clip.buffer.duration;
							if( clip.duration > z.radio.clipduration.max) {z.radio.clipduration.max = clip.duration}
							else if( clip.duration < z.radio.clipduration.min) {z.radio.clipduration.min  = clip.duration}
							// z.tools.logmsg("decoded" + clip.url);
						}, e => {
							z.tools.logerror("audio error! clip = " + clip.url + ", err = " + e);
						});
						
					};
					request.send();
				}
			});
			z.score.soundloaded = true;
		},
		start: z => {
			// z.tools.logmsg("z.score = " + JSON.stringify(z.score,null,2));
			z.score.orchestration.forEach( (instruments, j) => {
				instruments.forEach( instrument => 
				{ 
					z.tools.logmsg("instrument = " + instrument)
					z.radio.instruments[instrument] = z.data.sounds.instruments[instrument];
					z.radio.clips[z.data.sounds.instruments[instrument].clip] = z.data.sounds.clips[z.data.sounds.instruments[instrument].clip]
				});
			});
			/* set up player*/
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			z.radio.player.context = new AudioContext();
			/* experimental parameters */
			let parameters = [
				{ gain: 0.4, threshold: -24, knee: 30, ratio: 12, attack: 0.003, release: 0.25 }, //default
				{ gain: 0.3, threshold: -18, knee: 30, ratio: 18, attack: 0.0003, release: 0.28 },
				{ gain: 0.5, threshold: -8, knee: 30, ratio: 18, attack: 0.003, release: 0.28 },
				{ gain: 0.8, threshold: -8, knee: 30, ratio: 18, attack: 0.003, release: 0.28 },
				];
			let n = 3;

			z.radio.player.gain = z.radio.player.context.createGain();
			z.radio.player.gain.gain.value = parameters[n].gain;
			//with no compressor
			z.radio.player.gain.connect(z.radio.player.context.destination);
		},
		playtone: e => {
			let vco = z.radio.player.context.createOscillator();
			vco.frequency.value = e.frequency;
			vco.type = "sine";
			let vca = z.radio.player.context.createGain();
			
			vco.connect(vca);
			vca.connect(z.radio.player.gain);
			let now = z.radio.player.context.currentTime;
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
		},
		playbuffer: e =>  {
			try {
				let instrument = z.radio.instruments[e.instrument];
				let clip = z.radio.clips[instrument.clip];

				if(clip.loaded) {
					let rate = 1.0;
					if(instrument.playbackRate) {
						rate = instrument.playbackRate();
						
					}
					let prob = z.tools.randominteger(0,100)/100;
					let isplayed = (z.radio.n.buffersplaying<z.radio.max.buffersplaying-1) || z.radio.durationthrottle.reduce( (isplayed,d) => { 
						// z.tools.logmsg("prob = " + prob + " ::: isplayed = " + isplayed + " ::: d = " + d + " ::: duration = " + clip.duration*rate); 
						return isplayed || (clip.duration*rate < d[0] && prob <= d[1]) }, false);
					if(isplayed) {
						try {
							// z.tools.logmsg("rate = " + rate + " ::: duration = " + clip.duration*rate);
							let vca = z.radio.player.context.createGain(); 
							vca.gain.value = e.volume;
							let source = z.radio.player.context.createBufferSource();
							source.buffer = clip.buffer;
							source["playbackRate"].value = rate;
							source.connect(vca);
							vca.connect(z.radio.player.gain);
							source.loop = false;
							source.onended = e =>  { 
								// z.tools.logmsg("ended ::: " + JSON.stringify(e));
								z.radio.n.buffersplaying=z.radio.n.buffersplaying-1
							} ;
							++z.radio.n.buffersplaying;
							let now = z.radio.player.context.currentTime;
							source.start(now + e.delay);
							// z.tools.logmsg("playing = " + clip.url);
						} catch(e) { z.tools.logerror("error applying params to audio buffer e::: " + e) }
					}
					else {	
						// z.tools.logmsg("NOT playing = " + clip.url);
					}
				}
			}
			catch(e) { z.tools.logerror("line 104" + e) }
		},
		playgrain: e =>  {
			// z.tools.logmsg("ngrainsplaying = " + z.radio.n.grainsplaying);
			// if(z.radio.n.grainsplaying<z.radio.max.grainsplaying) {
				try {
					// let instrument = z.data.sounds.instruments[e.instrument];
					let instrument = z.radio.instruments[e.instrument];
					let clip = z.radio.clips[instrument.clip];
					// z.tools.logmsg("grain playing = " + instrument.clip);
					if(clip.loaded) {
						let rate = 1.0;
						if(instrument.playbackRate) {
								rate = instrument.playbackRate();
						}
						let now = z.radio.player.context.currentTime;
						let dt = Math.min(z.tools.randominteger(18,48)/10,rate*clip.duration*.4);
						// let dt = Math.min(z.tools.randominteger(18,24)/10,clip.duration*.3);
						let offset = z.tools.randominteger(0, (rate*clip.duration-2*dt)*10)/10;
						// let offset = z.tools.randominteger(0, (clip.duration-2*dt)*10)/10;
						// z.tools.logmsg("in playgrain ::: clip = " + e.instrument + ", clip duration = " + clip.duration + ", clip new duration = " + clip.duration*rate + ", dt = " + dt + ", rate = " + rate + ", offset = " + offset);
						let vca = z.radio.player.context.createGain(); 
						let source = z.radio.player.context.createBufferSource();
						source.buffer = clip.buffer;
						source["playbackRate"].value = rate;
						source.connect(vca);
						vca.connect(z.radio.player.gain);
						source.loop = false;
						source.onended = e =>  { z.radio.n.grainsplaying=z.radio.n.grainsplaying-1} ;
						++z.radio.n.grainsplaying;
						source.start(now, offset, dt*3); //parameters (when,offset,duration
						vca.gain.setValueAtTime(0.0, now);
						vca.gain.linearRampToValueAtTime(e.volume, now + dt);
						// vca.gain.linearRampToValueAtTime(1.0, now + dt);
						vca.gain.linearRampToValueAtTime(0, now + 2*dt ); 
					}
				}
				catch(e) { z.tools.logerror("radio 141 " + e) }
		},
	}
}