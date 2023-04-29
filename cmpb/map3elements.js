// ***** ############## dom elements ############## ---------
let addelements = z => {
	z.elements["circles0"] = []; 
	z.elements["circles1"] = []; 
	z.elements["squares"] = []; 
	Array.from(Array(z.score.nrows).keys()).forEach(  r => {
		z.elements["circles0"][r] = []; 
		z.elements["circles1"][r] = []; 
		z.elements["squares"][r] = []; 
		Array.from(Array(z.score.ncols).keys()).forEach(  c => {
			z.elements["squares"][r].push({ el: document.createElementNS("http://www.w3.org/2000/svg", "rect") });
			z.elements["squares"][r][c].el.setAttributeNS(null, "id", "squares_r"+r+"c"+c);
			z.elements["squares"][r][c].el.setAttributeNS(null, "class", "shape square");
			z.elements["svg"].el.appendChild(z.elements["squares"][r][c].el);

			z.elements["circles1"][r][c] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
			z.elements["circles1"][r][c].el.setAttributeNS(null, "id", "circles1_r"+r+"c"+c);
			z.elements["circles1"][r][c].el.setAttributeNS(null, "class", "shape circle");
			z.elements["svg"].el.appendChild(z.elements["circles1"][r][c].el);
		
			z.elements["circles0"][r][c] = { el: document.createElementNS("http://www.w3.org/2000/svg", "circle") };
			z.elements["circles0"][r][c].el.setAttributeNS(null, "id", "circles0_r"+r+"c"+c);
			z.elements["circles0"][r][c].el.setAttributeNS(null, "class", "shape circle");
			z.elements["svg"].el.appendChild(z.elements["circles0"][r][c].el);
		})
	});
}