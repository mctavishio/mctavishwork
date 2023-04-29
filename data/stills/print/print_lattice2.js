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
	// ["#fcfbe3", "#191918"], //"warmbw",
	// ["#9a0000", "#fcfbe3", "#191918"], //"warmbwred",
	// ["#fcfbe3", "#191918"], //"warmbw",
	// ["#ffcc00", "#fcfbe3", "#191918"], //"warmbwyellow",
	// ["#fcfbe3", "#191918"], //"warmbw",
	// ["#006699", "#fcfbe3", "#191918", "#4b4b44"], //"warmbwbluegray",
	// ["#006699", "#fcfbe3", "#191918", "#004488"], //"warmbwblues",
	// ["#fcfbe3", "#191918", "#4b4b44"], //"warmbwgray",
	
	["#006699", "#fcfbe3", "#191918"], //"warmbwblue",
	
	// ["#006699", "#006666", "#fcfbe3", "#191918"], //"warmbwbluegreen",
];
const pigments = {
	black: "#191918",
	pale: "#fcfbe3",
	blue: "#006699",
	red: "#9a0000",
	yellow: "#ffcc00",
};
const prefix = "print_lattice2_";
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
let colorj=0,w=0,h=0,color="#000";
const grid=[0,0.2,0.4,0.6,0.8,1.0], ngrid=grid.length, dx = 0.2*width, dy = 0.2*height, dmin=Math.min(dx,dy);
const draws = [...Array(ngrid*2).keys()];
const parameters = draws.map( j => {
	return {
		cx: width*grid[tools.randominteger(0,ngrid)],
		cy: height*grid[tools.randominteger(0,ngrid)],
		r: dmin*grid[tools.randominteger(1,ngrid-1)]+0.1*dmin,
	}
});
[...Array(npages).keys()].forEach( page => {
	let colors = tools.shuffle(colorsets[page%colorsets.length]);
	// layer 0 ::: background canvas
	doc.rect(0, 0, width, height).fillColor(pigments.pale).fill();

	// layer 1
	// ( () => {
	// 	let cx=width/2,cy=height/2, min=Math.min(width,height), r=min/2;
	// 	draws.filter(d => tools.randominteger(0,10)<4).forEach( d => {
	// 		let p = parameters[d % parameters.length];
	// 		colorj = tools.randominteger(0,colors.length); color = colors[colorj];
	// 		doc.circle(cx, cy, r )
	// 			.dash(tools.randominteger(r/2,r), {space: tools.randominteger(r/8,r/2)})
	// 			.strokeColor(color).lineWidth(p.r)
	// 			.stroke()
	// 		colorj = tools.randominteger(0,colors.length); color = colors[colorj];
			
	// 		doc.circle(cx, cy, r*0.8 )
	// 			.dash(tools.randominteger(r/4,r/2), {space: tools.randominteger(r/8,r/4)})
	// 			.strokeColor(color).lineWidth(p.r*0.8)
	// 			.stroke()
	// 		colorj = (colorj+1)%colors.length; color = colors[colorj];
	// 		doc.circle(cx, cy, r*0.6 )
	// 			.dash(tools.randominteger(r/8,r/4), {space: tools.randominteger(r/8,r/6)})
	// 			.strokeColor(color).lineWidth(p.r*0.4)
	// 			.stroke() 
	// 	})
		
	// })();

	// layer
	( () => {
		draws.filter(d => tools.randominteger(0,10)<3).forEach( d => {
			let p = parameters[d % parameters.length];
			let lw = tools.randominteger(dx/2,width/2);
			colorj = tools.randominteger(0,colors.length); color = colors[colorj];
			doc.moveTo(p.cx,0)
				.lineTo(p.cx,height)
				.dash(tools.randominteger(10, height*0.6), {space: tools.randominteger(10, height*0.4)})
				.strokeColor(color).lineWidth(lw)             
				.stroke();
			lw = tools.randominteger(dx/4,dx/2);
			colorj = tools.randominteger(0,colors.length); color = colors[colorj];
			doc.moveTo(p.cx,0)
				.lineTo(p.cx,height)
				.dash(tools.randominteger(10, height*0.4), {space: tools.randominteger(10, height*0.4)})
				.strokeColor(color).lineWidth(lw)             
				.stroke();
			lw = tools.randominteger(dy/2,height/2);
			colorj = tools.randominteger(0,colors.length); color = colors[colorj];
			doc.moveTo(0,p.cy)
				.lineTo(width,p.cy)
				.dash(tools.randominteger(10, width*0.6), {space: tools.randominteger(10, width*0.4)})
				.strokeColor(color).lineWidth(lw*0.8)             
				.stroke();
			lw = tools.randominteger(dy/4,dy/2);
			colorj = tools.randominteger(0,colors.length); color = colors[colorj];
			doc.moveTo(0,p.cy)
				.lineTo(width,p.cy)
				.dash(tools.randominteger(10, width*0.4), {space: tools.randominteger(10, width*0.4)})
				.strokeColor(color).lineWidth(lw*0.8)             
				.stroke();
		})
		
	})();

	// layer
	( () => {
		draws.filter(d => tools.randominteger(0,10)<3).forEach( d => {
			let p = parameters[d % parameters.length];
			let lw = tools.randominteger(dx/2,width/2);
			colorj = tools.randominteger(0,colors.length); color = colors[colorj];

			lw = tools.randominteger(dx/4,dx/2);
			colorj = tools.randominteger(0,colors.length); color = colors[colorj];
			doc.circle(p.cx, p.cy, p.r )
				.dash(tools.randominteger(p.r/4,p.r*p.r),{space: tools.randominteger(10, p.r*0.4)})
				.strokeColor(color).lineWidth(lw)
				.stroke()
			lw = lw*0.6;
			colorj = (colorj+1)%colors.length; color = colors[colorj];
			doc.circle(p.cx, p.cy, p.r )
				.dash(tools.randominteger(p.r/6,p.r),{space: tools.randominteger(10, p.r*0.4)})
				.strokeColor(color).lineWidth(lw)
				.stroke() 
		})
	})();

	( () => {
		draws.filter(d => tools.randominteger(0,10)<8).forEach( d => {
			let p = parameters[d % parameters.length];
			let lw = tools.randominteger(dx/2,width/2);
			colorj = tools.randominteger(0,colors.length); color = colors[colorj];
			let cx = [5,5,5][tools.randominteger(0,3)]/10*width, cy = [5,5,9][tools.randominteger(0,3)]/10*height;
			lw = tools.randominteger(dx/4,dx/2);
			colorj = tools.randominteger(0,colors.length); color = colors[colorj];
			doc.circle(cx, cy, p.r )
				.dash(tools.randominteger(p.r/4,p.r*p.r),{space: tools.randominteger(10, p.r*0.4)})
				.strokeColor(color).lineWidth(lw)
				.stroke()
			lw = lw*0.6;
			colorj = (colorj+1)%colors.length; color = colors[colorj];
			doc.circle(cx, cy, p.r )
				.dash(tools.randominteger(p.r/6,p.r),{space: tools.randominteger(10, p.r*0.4)})
				.strokeColor(color).lineWidth(lw)
				.stroke() 
		})
	})();

	
	page < npages-1 ? doc.addPage() : "done";
});
	
// # Finalize PDF file
doc.end();

});