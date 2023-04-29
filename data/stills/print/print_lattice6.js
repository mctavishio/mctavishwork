const PDFDocument = require("pdfkit");
const fs = require('fs');

const tools = ( () => {
	return {
			randominteger: (min, max) => {
				return Math.floor( min + Math.random()*(max-min));
			},
			normalrandominteger: (min, max, n) => { // CLT
				return n === 0 ? blueprint.tools.randominteger(min,max) : Math.floor(Array.from(Array(n).keys()).reduce( (sum, j) => { return sum + blueprint.tools.randominteger(min,max) }, 0) / n)
			},
			logmsg: function(msg) {
				console.log("### ::: " + msg);
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
			togrid: (min=1, max=1, x=1, ndivisions=1) => {
				let dx = Math.floor( (max-min) / ndivisions );
				return Math.floor( ( x-min+dx/2)/dx )*dx + min;
			},
			logstreams: streams => {
				Object.keys(streams).filter( key => {return key !== "clock"}).forEach( key => {
					blueprint.tools.logmsg("key " + key );
					streams[key].onValue( e => { blueprint.tools.logmsg("onvalue ::: " + key + ": " + JSON.stringify(e)) });
				});
			},
			shuffle: array => { // Fisher-Yates shuffle
				for (let i = array.length - 1; i > 0; i--) {
					let j = Math.floor(Math.random() * (i + 1));
					[array[i], array[j]] = [array[j], array[i]];
				}
				return array;
			},
		}
})( );
const colorsets = [
	//primary colors
	["#fcfbe3", "#191918"], //"warmbw",
	// ["#9a0000", "#fcfbe3", "#191918"], //"warmbwred",
	// ["#fcfbe3", "#191918"], //"warmbw",
	// ["#ffcc00", "#fcfbe3", "#191918"], //"warmbwyellow",
	// ["#fcfbe3", "#191918"], //"warmbw",
	// ["#006699", "#fcfbe3", "#191918", "#4b4b44"], //"warmbwbluegray",
	// ["#006699", "#fcfbe3", "#191918", "#004488"], //"warmbwblues",
	// ["#fcfbe3", "#191918", "#4b4b44"], //"warmbwgray",
	
	// ["#006699", "#fcfbe3", "#191918"], //"warmbwblue",
	
	// ["#006699", "#006666", "#fcfbe3", "#191918"], //"warmbwbluegreen",
];
const pigments = {
	black: "#191918",
	white: "#fcfbe3",
	blue: "#006699",
	red: "#9a0000",
	yellow: "#ffcc00",
	gray: "#484848"
};
const width = (8.5 + 0.125)*72, height = (8.5 + 0.25)*72; //8.5x8.5book_
// const width = (8.5 + 0.125)*72*2.1, height = (8.5 + 0.25)*72; //8.5x8.5bookcover_
// const width = (7 + 0.125*2)*72, height = (5 + 0.125*2)*72; //postcard_
// const width = (19)*72, height = (13)*72; //19x13_
// const width = (22)*72, height = (17)*72; //22x17_
// const width = (11)*72, height = (8.5)*72; //11x8.5_
// const width = (8.5)*72, height = (8.5)*72; //8.5x8.5_
const margins = { top: Math.floor(.8*72),bottom:Math.floor(.8*72),left:Math.floor(.9*72),right:Math.floor(.9*72) };
const title = "print_lattice6_8.5x8.5book_" + Date.now().toString();
const info = { doctitle: title, Title: "lattice", Author: "mctavish", Subject: "lattice", Keywords: "net.art, webs, networks" };

let doc = new PDFDocument(
{ 
	size: [width, height],
	margins: margins,
	info: info,
	// bufferPages: true
});
// doc.registerFont('notosans', 'css/fonts/NotoSans-Regular.ttf');
// doc.registerFont('notosansbold', 'css/fonts/NotoSans-Bold.ttf');
// doc.registerFont('notomono', 'css/fonts/NotoMono-Regular.ttf');
// doc.registerFont('sourcecode', 'css/fonts/SourceCodePro-Regular.ttf');
// doc.registerFont('sourcecodebold', 'css/fonts/SourceCodePro-Bold.ttf');
// doc.font('notomono');
doc.font('Courier');
// doc.on('pageAdded', e => { ++pagenumber; doc.text("Page Title") });
// # Pipe its output somewhere, like to a file or HTTP response
// # See below for browser usage
doc.pipe(fs.createWriteStream(info.doctitle + '_output.pdf'));
doc.fontSize(18);
const npages = 300;


[...Array(npages).keys()].forEach( page => {
	let colors = tools.shuffle(colorsets[page%colorsets.length]);
	
	// layer 0 ::: background canvas
	doc.rect(0, 0, width, height).fillColor(pigments.white).fill();




	// layer
	( () => {
		let colors = [[pigments.black,2], [pigments.white,5], [pigments.blue,0], [pigments.yellow,0], , [pigments.red,1]].reduce( (acc, color, j) => {
			Array.prototype.push.apply(acc,[...Array(color[1]).keys()].reduce( (acc2,k) => { acc2.push(color[0]); return acc2 },[]) );
			return acc;
		}, []);
		let colorj=0, color = colors[0];
		// console.log("colors = " + JSON.stringify(colors));

		let cx=width/2,cy=height/2, min=Math.min(width,height), r=Math.floor(min*0.4);
		[...Array(16).keys()].forEach( (d,j) => {
			[9,8,6,4].map(d => Math.floor(r*d/10)).map( d => {
			// [9,6,4].map(d => Math.floor(r*d/10)).map( d => {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(0,cy)
					.lineTo(width,cy)
					.dash(tools.randominteger(10, width*0.4), {space: tools.randominteger(10, width*0.4)})
					.strokeColor(color).lineWidth(d)             
					.stroke();
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(cx,0)
					.lineTo(cx,height)
					.dash(tools.randominteger(10, width*0.4), {space: tools.randominteger(10, width*0.4)})
					.strokeColor(color).lineWidth(d)             
					.stroke();
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(0,0)
					.lineTo(0,height)
					.dash(tools.randominteger(10, height*0.4), {space: tools.randominteger(10, height*0.4)})
					.strokeColor(color).lineWidth(d)             
					.stroke();
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(width,0)
					.lineTo(width,height)
					.dash(tools.randominteger(10, height*0.4), {space: tools.randominteger(10, height*0.4)})
					.strokeColor(color).lineWidth(d)             
					.stroke();
			})
		})
		
	})();

	// layer
	( () => {
		let colors = [[pigments.black,2], [pigments.white,5], [pigments.blue,0], [pigments.yellow,0], , [pigments.red,1]].reduce( (acc, color, j) => {
			Array.prototype.push.apply(acc,[...Array(color[1]).keys()].reduce( (acc2,k) => { acc2.push(color[0]); return acc2 },[]) );
			return acc;
		}, []);
		let colorj=0, color = colors[0];
		// console.log("colors = " + JSON.stringify(colors));

		let cx=width/2,cy=height/2, min=Math.min(width,height), r=Math.floor(min*0.2);
		[...Array(4).keys()].forEach( (d,j) => {
			[6,4,2].map(d => Math.floor(r*d/10)).map( d => {
			// [9,6,4].map(d => Math.floor(r*d/10)).map( d => {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(0,cy)
					.lineTo(width,cy)
					.dash(tools.randominteger(10, width*0.4), {space: tools.randominteger(10, width*0.4)})
					.strokeColor(color).lineWidth(d)             
					.stroke();
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(cx,0)
					.lineTo(cx,height)
					.dash(tools.randominteger(10, width*0.4), {space: tools.randominteger(10, width*0.4)})
					.strokeColor(color).lineWidth(d)             
					.stroke();
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(0,0)
					.lineTo(0,height)
					.dash(tools.randominteger(10, height*0.4), {space: tools.randominteger(10, height*0.4)})
					.strokeColor(color).lineWidth(d)             
					.stroke();
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(width,0)
					.lineTo(width,height)
					.dash(tools.randominteger(10, height*0.4), {space: tools.randominteger(10, height*0.4)})
					.strokeColor(color).lineWidth(d)             
					.stroke();
			})
		})
		
	})();

	// layer
	( () => {
		let colors = [[pigments.black,0], [pigments.white,5], [pigments.blue,0], [pigments.yellow,0], , [pigments.red,2]].reduce( (acc, color, j) => {
			Array.prototype.push.apply(acc,[...Array(color[1]).keys()].reduce( (acc2,k) => { acc2.push(color[0]); return acc2 },[]) );
			return acc;
		}, []); 
		let colorj=0, color = colors[0];
		// console.log("colors = " + JSON.stringify(colors));
		let min = Math.min(width,height), r=Math.floor(min*0.2/2);
		let grid=[0,2,4,6,8,10]; let cr = r*3/10;
		let coords = [];
		grid.map( d => d/10*width ).forEach( cx => {
			grid.map( d => d/10*height ).forEach( cy => {
				if(tools.randominteger(0,10)<3) {
					[9,6].map(d => Math.floor(r*d/10)).forEach( cr => {
						colorj = tools.randominteger(0,colors.length); color = colors[colorj];
						doc.circle(cx, cy, cr).fillColor(color).fill();

					});
					color = pigments.black;
					doc.circle(cx, cy, cr).fillColor(color).fill();
					coords.push([cx,cy]);
				}
			})
		})
		let lw = cr/4;
		coords.forEach( (d,j) => {
			let next = coords[(j+1)%coords.length];
			doc.moveTo(d[0],d[1])
					.lineTo(next[0],next[1]).dash(width*2)
					.strokeColor(pigments.red).lineWidth(lw)             
					.stroke();
			doc.circle(d[0], d[1], lw*2).fillColor(pigments.red).fill();
		});

		
	})();





	//layer
	// ( () => {
	// 	// let colors = [[pigments.black,0], [pigments.white,5], [pigments.blue,2], [pigments.yellow,1]].reduce( (acc, color, j) => {
	// 	let colors = [[pigments.black,2], [pigments.white,2], [pigments.blue,0], [pigments.yellow,0], [pigments.red,2]].reduce( (acc, color, j) => {
	// 	Array.prototype.push.apply(acc,[...Array(color[1]).keys()].reduce( (acc2,k) => { acc2.push(color[0]); return acc2 },[]) );
	// 		return acc;
	// 	}, []);
	// let colorj=0, color = colors[0];

	// 	let w=width*0.2/2, h=height*0.2/2;
	// 	// [...Array(16).keys()].forEach( (d,j) => {
	// 		[0,2,4,6,8,10].map(d => { return {x:Math.floor(d/10*width), y:Math.floor(height-d/10*height)} }).map( d => {
	// 			colorj = tools.randominteger(0,colors.length); color = colors[colorj];
	// 			doc.rect(d.x, d.y, w, h).fillColor(color).fill()
	// 		})
	// 	// })
		
	// })();


	
	page < npages-1 ? doc.addPage() : "done";
});
	
// # Finalize PDF file
doc.end();