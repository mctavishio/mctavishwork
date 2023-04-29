// ***** ############## dom elements ############## ---------
let addelements = z => {
	z.elements["circles"] = []; 
	z.elements["squares"] = []; 
	z.elements["lines"] = [];
	z.elements["texts"] = [];
	Array.from(Array(z.score.nrows).keys()).forEach(  r => {
		z.elements["squares"][r] = []; 
		Array.from(Array(z.score.ncols).keys()).forEach(  c => {
			z.elements["squares"][r].push({ el: document.createElementNS("http://www.w3.org/2000/svg", "rect") });
			z.elements["squares"][r][c].el.setAttributeNS(null, "id", "squares_r"+r+"c"+c);
			z.elements["squares"][r][c].el.setAttributeNS(null, "class", "shape square");
			z.elements["svg"].el.appendChild(z.elements["squares"][r][c].el);
		})
	});
	Array.from(Array(z.score.m).keys()).forEach(  r => {
		z.elements["lines"][r] = []; 
		Array.from(Array(3).keys()).forEach(  c => {
			z.elements["lines"][r][c] = { el: document.createElementNS("http://www.w3.org/2000/svg", "line") };
			z.elements["lines"][r][c].el.setAttributeNS(null, "id", "lines_r"+r+"c"+c);
			z.elements["lines"][r][c].el.setAttributeNS(null, "class", "shape line");
			z.elements["svg"].el.appendChild(z.elements["lines"][r][c].el);
		})
	});
	Array.from(Array(z.score.m).keys()).forEach(  r => {
		z.elements["circles"][r] = []; 
		Array.from(Array(2).keys()).forEach(  c => {
			z.elements["circles"][r][c] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
			z.elements["circles"][r][c].el.setAttributeNS(null, "id", "circles_r"+r+"c"+c);
			z.elements["circles"][r][c].el.setAttributeNS(null, "class", "shape circle");
			z.elements["svg"].el.appendChild(z.elements["circles"][r][c].el);
		})
	});
	z.score.l = z.score.version === "small" ? z.score0.l[0] : z.score0.l[1];
	Array.from(Array(z.score.l).keys()).forEach(  (r,j) => {
		z.elements["texts"][r] = { el: document.createElement("div") };
		z.elements["texts"][r].el.setAttribute("id", "text"+j);
		z.elements["texts"][r].el.setAttribute("class", "absolute zhigh billboard");
		z.elements["texts"][r].el.style.opacity = 0;
		// z.elements["texts"][r].el.style.backgroundColor = "#484848";
		z.elements["texts"][r].el.innerHTML = "hello world";
		z.elements["stage"].el.appendChild(z.elements["texts"][r].el);
	});
}