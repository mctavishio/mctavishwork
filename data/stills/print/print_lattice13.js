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
const prefix = "print_lattice13_";
const dimensions = [
	{width: (8.5 + 0.125)*72, height: (8.5 + 0.25)*72, suffix: "8.5x8.5book_"},
	{width: (8.5 + 0.125)*72*2.1, height: (8.5 + 0.25)*72, suffix: "8.5x8.5bookcover_"},
	{width: (7 + 0.125*2)*72, height: (5 + 0.125*2)*72, suffix: "7x5postcard_"},
	{width: (19)*72, height: (13)*72, suffix: "19x13_"},
	{width: (8.5)*72, height: (8.5)*72,suffix: "8.5x8.5_"},
	{width: (22)*72, height: (17)*72, suffix: "22x17_"},
	{width: (11)*72, height: (8.5)*72, suffix: "11x8.5_"},
];

const margins = { top: Math.floor(.8*72),bottom:Math.floor(.8*72),left:Math.floor(.9*72),right:Math.floor(.9*72) };

dimensions.forEach( dimension => {

let title = prefix +  dimension.suffix + Date.now().toString();
let info = { doctitle: title, Title: "lattice", Author: "mctavish", Subject: "lattice", Keywords: "net.art, webs, networks" };

let width = dimension.width, height = dimension.height;

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
	doc.rect(0, 0, width, height).strokeColor(pigments.black).dash(tools.randominteger(10,200)).lineWidth(height*.4).stroke();

	// // layer
	( () => {
		let colors = [[pigments.black,2], [pigments.white,5], [pigments.blue,0], [pigments.yellow,0], [pigments.red,1]].reduce( (acc, color, j) => {
			Array.prototype.push.apply(acc,[...Array(color[1]).keys()].reduce( (acc2,k) => { acc2.push(color[0]); return acc2 },[]) );
			return acc;
		}, [])
		let cx=width/2,cy=height/2, min=Math.min(width,height), r=Math.floor(min*0.4);
		[...Array(16).keys()].forEach( (d,j) => {
			[9,6,4].map(d => Math.floor(r*d/10)).map( d => {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.circle(cx, cy, d)
					.dash(tools.randominteger(20,r/8), {space: tools.randominteger(r/4,r) })
					.strokeColor(color).lineWidth(tools.randominteger(r/4,r*3))
					.stroke()
			})
			colorj = tools.randominteger(0,colors.length); color = colors[colorj];
			doc.circle(cx, cy, height*.01)
					.fillColor(color)
					.fill()
		})
	})();

	// layer
	( () => {
		let colors = [[pigments.black,2], [pigments.white,3], [pigments.blue,0], [pigments.yellow,0], [pigments.red,1]].reduce( (acc, color, j) => {
			Array.prototype.push.apply(acc,[...Array(color[1]).keys()].reduce( (acc2,k) => { acc2.push(color[0]); return acc2 },[]) );
			return acc;
		}, []);
		let colorj=0, color = colors[0];
		let y1=0,y2=width,dx=width*.2;
		let r=()=>tools.randominteger(8,dx*.4), dash=()=>tools.randominteger(10, 200);
		[...Array(4).keys()].forEach( (d,j) => {
			[3,7].map(d => Math.floor(width*d/10)).map( cx => {
				[10,8,6,4,2,1].map(d => Math.floor(dx*d/10)).map( lw => {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(cx,y1)
					.lineTo(cx,y2)
					.dash(dash(), {space: dash()})
					.strokeColor(color).lineWidth(lw)             
					.stroke();
				})
			})
		})
	})();

	// layer
	( () => {
		let colors = [[pigments.black,4], [pigments.white,8], [pigments.blue,0], [pigments.yellow,0], [pigments.red,1]].reduce( (acc, color, j) => {
			Array.prototype.push.apply(acc,[...Array(color[1]).keys()].reduce( (acc2,k) => { acc2.push(color[0]); return acc2 },[]) );
			return acc;
		}, []);
		let colorj=0, color = colors[0];
		let x1=0,x2=width,dy=height*.2;
		let r=()=>tools.randominteger(8,dy*.4), dash=()=>tools.randominteger(10, 100);
		[...Array(4).keys()].forEach( (d,j) => {
			[2,8].map(d => Math.floor(height*d/10)).map( cy => {
				[10,8,6,4,2,1].map(d => Math.floor(dy*d/10)).map( lw => {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(x1,cy)
					.lineTo(x2,cy)
					.dash(dash(), {space: dash()})
					.strokeColor(color).lineWidth(lw)             
					.stroke();
				})
			})
		})
	})();

	// layer
	( () => {
		let colors = [[pigments.black,2], [pigments.white,3], [pigments.blue,0], [pigments.yellow,0], [pigments.red,1]].reduce( (acc, color, j) => {
			Array.prototype.push.apply(acc,[...Array(color[1]).keys()].reduce( (acc2,k) => { acc2.push(color[0]); return acc2 },[]) );
			return acc;
		}, []);
		let colorj=0, color = colors[0];
		let y1=0,y2=height,dx=width*.2;
		let r=()=>tools.randominteger(8,dx*.4), dash=()=>tools.randominteger(10, 200);
		[...Array(4).keys()].forEach( (d,j) => {
			[1,10].map(d => Math.floor(width*d/10)).map( cx => {
				[10,8,6,4,2,1].map(d => Math.floor(dx*d/10)).map( lw => {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(cx,y1)
					.lineTo(cx,y2)
					.dash(dash(), {space: dash()})
					.strokeColor(color).lineWidth(lw)             
					.stroke();
				})
			})
		})
	})();

	// layer
	( () => {
		let colors = [[pigments.black,4], [pigments.white,8], [pigments.blue,0], [pigments.yellow,0], [pigments.red,1]].reduce( (acc, color, j) => {
			Array.prototype.push.apply(acc,[...Array(color[1]).keys()].reduce( (acc2,k) => { acc2.push(color[0]); return acc2 },[]) );
			return acc;
		}, []);
		let colorj=0, color = colors[0];
		let x1=0,x2=width,dy=height*.2;
		let r=()=>tools.randominteger(8,dy*.4), dash=()=>tools.randominteger(10, 100);
		[...Array(4).keys()].forEach( (d,j) => {
			[0,3,10].map(d => Math.floor(height*d/10)).map( cy => {
				[10,8,6,4,2,1].map(d => Math.floor(dy*d/10)).map( lw => {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(x1,cy)
					.lineTo(x2,cy)
					.dash(dash(), {space: dash()})
					.strokeColor(color).lineWidth(lw)             
					.stroke();
				})
			})
		})
	})();

	// // layer
	( () => {
		let colors = [[pigments.black,2], [pigments.white,5], [pigments.blue,0], [pigments.yellow,0], [pigments.red,1]].reduce( (acc, color, j) => {
			Array.prototype.push.apply(acc,[...Array(color[1]).keys()].reduce( (acc2,k) => { acc2.push(color[0]); return acc2 },[]) );
			return acc;
		}, [])
		let cx=width/2,cy=height/2, min=Math.min(width,height), r=Math.floor(min*0.4);
		[...Array(4).keys()].forEach( (d,j) => {
			[9,6,4].map(d => Math.floor(r*d/10)).map( d => {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.circle(cx, cy, d)
					.dash(tools.randominteger(20,r/8), {space: tools.randominteger(r/4,r) })
					.strokeColor(color).lineWidth(tools.randominteger(r/4,r*3))
					.stroke()
			})
			colorj = tools.randominteger(0,colors.length); color = colors[colorj];
			doc.circle(cx, cy, height*.01)
					.fillColor(color)
					.fill()
		})
	})();

	doc.rect(0, 0, width, height).strokeColor(pigments.black).dash(tools.randominteger(width/2,width)).lineWidth(height*.1).stroke();


	// // layer
	( () => {
		let colors = [[pigments.black,4], [pigments.white,8], [pigments.blue,0], [pigments.yellow,0], [pigments.red,1]].reduce( (acc, color, j) => {
			Array.prototype.push.apply(acc,[...Array(color[1]).keys()].reduce( (acc2,k) => { acc2.push(color[0]); return acc2 },[]) );
			return acc;
		}, []);
		let colorj=0, color = colors[0];
		let x1=0,x2=width,dy=width*.18;
		let r=()=>tools.randominteger(8,dy*.4), dash=()=>tools.randominteger(10, 100);
		[...Array(4).keys()].forEach( (d,j) => {
			[5].map(d => Math.floor(height*d/10)).map( cy => {
				[6,4,2,1].map(d => Math.floor(dy*d/10)).map( lw => {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(x1,cy)
					.lineTo(x2,cy)
					.dash(dash(), {space: dash()})
					.strokeColor(color).lineWidth(lw)             
					.stroke();
				// colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				// doc.moveTo(x1,cy)
				// 	.lineTo(x2,cy)
				// 	.dash(dash(), {space: dash()})
				// 	.strokeColor(color).lineWidth(r())             
				// 	.stroke();
				})
			})
		})
	})();


	// // layer
	( () => {
		let colors = [[pigments.black,2], [pigments.white,3], [pigments.blue,0], [pigments.yellow,0], [pigments.red,1]].reduce( (acc, color, j) => {
			Array.prototype.push.apply(acc,[...Array(color[1]).keys()].reduce( (acc2,k) => { acc2.push(color[0]); return acc2 },[]) );
			return acc;
		}, []);
		let colorj=0, color = colors[0];
		let y1=0,y2=height,dx=width*.2;
		let r=()=>tools.randominteger(8,dx*.4), dash=()=>tools.randominteger(10, 200);
		[...Array(4).keys()].forEach( (d,j) => {
			[2,5,8].map(d => Math.floor(width*d/10)).map( cx => {
				[8,6,4,3,2,1].map(d => Math.floor(dx*d/10)).map( lw => {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.moveTo(cx,y1)
					.lineTo(cx,y2)
					.dash(dash(), {space: dash()})
					.strokeColor(color).lineWidth(lw)             
					.stroke();
				})
			})
		})
	})();


	
	page < npages-1 ? doc.addPage() : "done";
});

// # Finalize PDF file
doc.end();

});
	
