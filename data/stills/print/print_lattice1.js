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
const prefix = "print_lattice1_";
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
let dx = 0.2*width, dy = 0.2*height; let r=1,x=0,y=0,cx=0,cy=0,colorj=0,w=0,h=0,color="#000";
const rows=[0,.2,.4,.6,.8,1], cols=[0,.2,.4,.6,.8,1]; 
[...Array(npages).keys()].forEach( page => {
	let colors = tools.shuffle(colorsets[page%colorsets.length]);
	//background canvas
	doc.rect(0, 0, width, height).fillColor(colors[tools.randominteger(0,colors.length)]).fill();
	rows.forEach( row => {
		if (tools.randominteger(0,10) < 9) {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				let noise = tools.randominteger(-2,2)/40;
				x = width/2;
				let y1 = row%2===0 ? height : 0, y2 = row%2===1 ? height : 0; 
				lw = (1.1-row)*dx/2;

				doc.moveTo(x, y1)
					.lineTo(x, y2)
					.dash(tools.randominteger(height/6, height/2))
					.strokeColor(color).lineWidth(lw)             
					.stroke();
				// color = colors[tools.randominteger(0,colors.length)];
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				noise = tools.randominteger(-2,2)/40;
				let y = height/2; 
				let x1 = row%2===0 ? width : 0, x2 = row%2===1 ? width : 0;
				lw = (1.1-row)*dy/2;
				doc.moveTo(x1,y)
					.lineTo(x2,y)
					.dash(tools.randominteger(width/8, width/2))
					.strokeColor(color).lineWidth(lw)             
					.stroke();  
		}
		cols.forEach( col => {
			// w = dx, h = height;
			// x = row*width, y = height-h;
			// color = colors[colorj];
			// doc.rect(x, y, w, h).fillColor(color).fill();

			// h = cols[tools.randominteger(1,cols.length)]*height, y = height-h;
			// // color = colors[tools.randominteger(0,colors.length)];
			// color = colors[colorj];
			// doc.rect(x, y, w, h).fillColor(color).fill();
			if (tools.randominteger(0,10) < 6) {
			colorj = tools.randominteger(0,colors.length); color = colors[colorj];
			let cx = width/2, cy = height/2;
			let r = (1.1-row)*width;
			let lw = tools.randominteger(r/4,r/2);
			doc.circle(cx, cy, r )
				.dash(tools.randominteger(r/4,r*r))
				.strokeColor(color).lineWidth(lw)
				.stroke()
			colorj = (colorj+1)%colors.length; color = colors[colorj];
			doc.circle(cx, cy, r )
				.dash(tools.randominteger(r/8,r*r))
				.strokeColor(color).lineWidth(lw*tools.randominteger(4,8)/10)
				.stroke()
			}
			if (tools.randominteger(0,10) < 3) {
				// color = colors[tools.randominteger(0,colors.length)];
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				// let x = tools.randominteger(0,nshapes);
				let x = row*width;
				let lw = tools.randominteger(10, dx);
				doc.moveTo(x, 0)
					.lineTo(x, height)
					.dash(tools.randominteger(10, 20))
					.strokeColor(color).lineWidth(lw)             
					.stroke();
			}
			

			if (tools.randominteger(0,10) < 4) {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				r = tools.randominteger(.3*dy,.6*dy);
				cx = row*width, cy = col*height;
				doc.circle(cx, cy, r ).fillColor(color).fill();
				r = Math.floor(dy/8);
				colorj = (colorj+1)%colors.length; color = colors[colorj];
				doc.circle(cx, cy, r ).fillColor(color).fill(); 

			}

			if (tools.randominteger(0,10) < 8) {
				w = dx, h = dy/2, y = col*width, x = row*width;
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				doc.rect(x, y, w, h).fillColor(color).fill();
			}
			
			
			
		});
		if (tools.randominteger(0,10) < 6) {
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				let noise = tools.randominteger(-2,3)/40;
				x = width/2  + noise*width;
				let y1 = row%2===0 ? height : 0, y2 = row%2===1 ? height : 0; 
				lw = (1.1-row)*dx/2;
				doc.moveTo(x, y1)
					.lineTo(x, y2)
					.dash(tools.randominteger(height/4, height/2))
					.strokeColor(color).lineWidth(lw)             
					.stroke();
				// color = colors[tools.randominteger(0,colors.length)];
				colorj = tools.randominteger(0,colors.length); color = colors[colorj];
				noise = tools.randominteger(-2,3)/40;
				let y = height/2 + noise*height; 
				let x1 = row%2===0 ? width : 0, x2 = row%2===1 ? width : 0;
				lw = (1.1-row)*dy/2;
				doc.moveTo(x1,y)
					.lineTo(x2,y)
					.dash(tools.randominteger(width/4, width/2))
					.strokeColor(color).lineWidth(lw)             
					.stroke();  
		}
	});

	rows.forEach( row => {
		cols.forEach( col => {
			if(tools.randominteger(0,10)<2) {
			let colorj=0;
			colorj = tools.randominteger(0,colors.length); color = colors[colorj];
			let r = tools.randominteger(.3*dy,.5*dy);
			let cx = row*width, cy = col*height;
			doc.circle(cx, cy, r ).fillColor(color).fill();
			r = dy*.2;
			colorj = (colorj+1)%colors.length; color = colors[colorj];
			doc.circle(cx, cy, r ).fillColor(color).fill();
		}
		});
	});
	
	page < npages-1 ? doc.addPage() : "done";
});
	
// # Finalize PDF file
doc.end();

});