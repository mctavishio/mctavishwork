let z = {};
z.tools = {
	randominteger: (min, max) => {
		return Math.floor( min + Math.random()*(max-min));
	},
	logmsg: function(msg) {
		try { 
			console.log("### ::: " + msg); 
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
	datestr: (date, options) => {
		if(options===undefined) options = {year: "numeric", month: "2-digit", day: "numeric", hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"};
		return date.toLocaleTimeString("en-US", options);
		//new Date().toLocaleTimeString("en-US", {year: "numeric", month: "2-digit", day: "numeric", hour12: true, hour: "2-digit", minute: "2-digit", second: "2-digit"});
	},
	togrid: (min=1, max=1, x=1, ndivisions=1) => {
		let dx = Math.floor( (max-min) / ndivisions );
		return Math.floor( ( x-min+dx/2)/dx )*dx + min;
	},
};
z.data = {
	colors = {
		sets: {
			warmbw: ["#fcfbe3", "#191918"],
			warmbwred: ["#9a0000", "#fcfbe3", "#191918"],
			warmbw: ["#fcfbe3", "#191918"],
			warmbwyellow: ["#ffcc00", "#fcfbe3", "#191918"],
			warmbw: ["#fcfbe3", "#191918"],
			warmbwbluegray: ["#006699", "#fcfbe3", "#191918", "#4b4b44"],
			warmbwbluesgray: ["#006699", "#fcfbe3", "#191918", "#004488"],
			warmbwblue: ["#006699", "#fcfbe3", "#191918"],
			warmbwbluegreen: ["#006699", "#006666", "#fcfbe3", "#191918"],
		},
		pigments = {
			black: "#191918",
			white: "#fcfbe3",
			blue: "#006699",
			red: "#9a0000",
			yellow: "#ffcc00",
			gray: "#484848",
		}
	}
}

const playlist = [
	//primary colors
	// ["#fcfbe3", "#191918"], //"warmbw",
	// ["#9a0000", "#fcfbe3", "#191918"], //"warmbwred",
	// ["#fcfbe3", "#191918"], //"warmbw",
	// ["#ffcc00", "#fcfbe3", "#191918"], //"warmbwyellow",
	// ["#fcfbe3", "#191918"], //"warmbw",
	// ["#006699", "#fcfbe3", "#191918", "#4b4b44"], //"warmbwbluegray",
	// ["#006699", "#fcfbe3", "#191918", "#004488"], //"warmbwbluegray",
	// ["#006699", "#fcfbe3", "#191918"], //"warmbwblue",
	// ["#006699", "#006666", "#fcfbe3", "#191918"], //"warmbwbluegreen",
	//lake superior
	// ["#CCD8EA", "#CBD3DA", "#818794", "#5B5756", "#413A36", "#413B30"], //lake superior
	// ["#BEC4D0", "#C9CDD8", "#7E808C", "#282730", "#54545F", "#A5ACBF", "#AAA9A5", "#FBFBFF", "#535763", "#211F2B"], //canada snow
	// ["#C7CED8", "#C2C5CC", "#9C9A9D", "#454140", "#454140", "#383330", "#473D3B", "#767B7F"], //lake superior
	// ["#4E505D", "#4F525A", "#808394", "#A4AAB8", "#DEE5F7", "#E6EFFD"], //ice snow river
	// ["#8F97A2", "#5A575E", "#666A79", "#474C58", "#8790A0", "#B5C2D2", "#4E5043", "#181919"], //winter blue green tree
	// ["#BCBFC4", "#B9BABE", "#9FA0A5", "#98999E", "#72757A", "#63686E", "#555F64", "#505C60"], //subtle lake surface grays
	// ["#093F68", "#005A98", "#000112", "#E8ECF5", "#A8B5C8", "#538096", "#45758A", "#234E64", "#001929", "#0A4761", "#00132A", "#095A74", "#033A56", "#0C6180"], //lake superior (very blue)
	// ["#F2F4F8", "#90A2B1", "#475360", "#4E3728", "#B95F2E", "#4C5B70", "#678296", "#293E45"], //lake superior
	// ["#F6E8DD", "#BC8860", "#3B3735", "#405D68", "#041D24", "#606F6D", "#26383F", "#2F4D58", "#2F4652", "#657678", "#5A5858", "#19323D", "#837C75", "#854529"], //lake superior (blue with orange)
	// ["#839FB6", "#AEB7BF", "#A3A6A9", "#797B7B", "#3D4048", "#393A3B", "#688896", "#7C8FAA", "#3F5468"], //lake superior
	// ["#F8FCFD", "#A2B2CC", "#7A8193", "#6D6B51", "#5A583A", "#2C2D24", "#7D92AE", "#615F62", "#5C6C6C"], //lake superior
	// ["#485654", "#3D4949", "#7B8F9D", "#8695A3", "#8C99A1", "#82959C", "#839298", "#768387", "#738187", "#637074", "#738891", "#566871", "#BCCCD0", "#8698AA", "#515E65", "#35404E", "#566367"], //lake superior
	// //water
	// ["#C5E0FB", "#F3FBFD", "#52615E", "#18191B", "#90969A", "#27292E", "#A7C2E0", "#6B838D", "#7E9889", "#1B1E3E", "#110F24"], //waterfall
	// ["#7086A6", "#6E7C78", "#7895BF", "#424639", "#4A6B99", "#7389A3", "#4B607F", "#4F688A", "#263040", "#283247", "#3D536F", "#222126", "#948F84"], //lake (blue)
	// ["#969599", "#796C6C", "#675855", "#635049", "#79685C", "#6E5340", "#515054", "#6A5848", "#968F8A", "#4B4A4F", "#595453"], //lake bottom browns
	// ["#757260", "#616664", "#626562", "#E0E9F5", "#BFCEDF", "#A7ADB6", "#636A6C", "#5D5543", "#49402C", "#849BB4", "#5B422D", "#393E41", "#424544"], //pond
	// ["#BFB9A8", "#C3B481", "#6D604B", "#8E7A6E", "#8097AE", "#3B2F30", "#7F97AE"], //lake sand
	// ["#C3D3E1", "#A5B3BF", "#E5D1B7", "#E7D093", "#8C6F54", "#8CA0B1"], //lake sand
	// ["#696566", "#706E6F", "#79796E", "#AFB199", "#898A7C", "#676357", "#C8CAC9", "#41382C"], //moss
	// ["#E8DFD7", "#DDD6D0", "#8C8780", "#51504A", "#A9A69F", "#D2CCC4", "#444440", "#66685F", "#393B34", "#20211A", "#67665F"], //woods winter snow

	// ["#AAAAAC", "#7C7C7C", "#747371", "#525251", "#797372", "#343632", "#0C0E0B", "#42433E", "#434544", "#6C6D68"], //winter
	// ["#494B4A", "#494B4A", "#534B41", "#373934", "#8C887F", "#504531", "#201F19", "#5F5E5D", "#604F3D", "#5A5A57", "#30322C", "#211D15", "#696964", "#1F231B", "#393B36", "#554A47"], //winter
	// ["#525762", "#4A525F", "#5D6471", "#929DAE", "#AAB5CC", "#A5B0C3", "#353943", "#545F72"], //slate winter sky
	// ["#A8B0C3", "#9599A7", "#242222", "#292724", "#49484B", "#ADAEB3", "#2B2328", "#3F3F4F"], //canada winter
	// ["#414141", "#2B2B2A", "#615146", "#634D3B", "#947049", "#525B68", "#EDE8DB", "#2B261B", "#515262"], //outdoors fall
	// ["#C3C6CF", "#5775B0", "#837C7D", "#7A535B", "#593B3B", "#413B3F"], //boots jeans rock (nice blues browns)
	// ["#0D0F0E", "#767577", "#9AA6B4", "#A2AFB6", "#656863", "#3C3E3C", "#5F5B50", "#38301B", "#636E76", "#82949F", "#4C5A5C", "#302D26", "#A39E8E"], //outdoors fall (nice blues browns)
	
	// //greens
	// ["#183C76", "#64665C", "#967B21", "#5084CB", "#34361D", "#503E2B", "#38370E"], //bright day blue sky yellow leaves
	// ["#556D7F", "#444E33", "#4B5A37", "#50663E", "#6C7937", "#59613E", "#2A2D1E", "#545B38", "#788049", "#998800", "#324528", "#161B13", "#1B2519", "#343222"], //orchard
	// ["#7F7655", "#7C7C58", "#4C4F3A", "#ADA590", "#969374", "#7B7458", "#7D815D", "#454425", "#948C7F", "#5F6E4C", "#474633", "#BEB7A5"], //grasses (green yellow)
	// ["#6C6B6D", "#4B4B4D", "#373435", "#494C57", "#2E2B2E", "#242225", "#5F6264"], //rocks
	// ["#D1E3EF", "#9DAB92", "#8F9675", "#7A7E64", "#727A53", "#535E39", "#576245", "#566163", "#686E60"], //tree
	// ["#D7D6D8", "#8A8B84", "#5C6161", "#6B563F", "#272413", "#423930", "#1E260D", "#3D3A30", "#6D2E29", "#18190C", "#928C87"], //finland arteles
	// ["#778BA8", "#5E6D86", "#686C76", "#4F463D", "#5A432F", "#44301D", "#37261A", "#3F231C", "#4D739F", "#5D1215", "#352B28", "#4A2A28"], //outdoors sumac
	// ["#675944", "#2E2E27", "#927F56", "#A18462", "#4B4437", "#544A39", "#2C352D", "#BEA886"], //grass shadow
	// ["#7A6C57", "#46382F", "#745F4F", "#928B88", "#977E6C", "#E2E3E7", "#3C3023", "#41491D", "#2C2521"], //muddy creek (greens browns)
	// ["#A3958A", "#A49389", "#82706C", "#7C6D66", "#786662", "#746663"], //gravelroadcanada (all beige)
	// ["#17180E", "#585743", "#A9A497", "#938A5E", "#676320", "#463922", "#A76F09", "#A76406", "#3E441F", "#47502D", "#6F7948", "#A1A294", "#272C12"], //lake summer woods (green orange)
	// ["#45424A", "#393536", "#726558", "#B3A6A0", "#6C6060", "#818175", "#8C8E76", "#565C57"], //river rock (greens)
	// ["#B5C1CF", "#79838F", "#988D82", "#5B5351", "#665B49", "#5A5A4C", "#575D4E", "#4B594A", "#8291A4"], //finland fields () 
	// ["#484A2B", "#423F33", "#594E43", "#91827C", "#C9C7C6", "#44502A", "#5D6445"], //finnish forest (green brown)
	// ["#45403C", "#4A3325", "#463A32", "#A99374", "#A4845C", "#BBA156", "#4F4026", "#3F3B21"], //finland fields (green brown yellow)
	
	//loom
	// ["#EAF1F2", "#AFB4BB", "#A3998A", "#735F48", "#5B4F45", "#66513A", "#3D2A1D", "#050A0D", "#53463A"], //looom
	// ["#181410", "#3B302E", "#63544B", "#80756C", "#BFB3A5", "#978777", "#28221D", "#131111", "#E7D7BB", "#3D3730", "#F7EBD5"], //weaving
	// ["#C4BBAC", "#492E21", "#514A47", "#3C3833", "#46443E", "#73695E", "#897768", "#8A7766", "#0F0F0F", "#F5E7CD", "#393633", "#2F2F2C"], //weaving
	

	//ny
	// ["#FFFFFF", "##313331", "#524E4A", "#391F18", "#813B2B", "#A15444", "#354141", "#222222"], //nystairs
	// ["#332725", "#535051", "#705E5A", "#80807F", "#7A756B", "#80807F", "#E8EDF2", "#785E56", "#47484A"], //nystairs
	// ["#42433E", "#5C5C58", "#81796C", "#484238", "#5C5042", "#000000", "#1F2C40", "#2B3E57", "#2A3540", "#78766D"], //nystairs
	// ["#5E646F", "#9BB4C6", "#7F7976", "#4E596E", "#3E3839", "#70625A"], //nystairs (some blue)
	// ["#786652", "#5B4031", "#1A1E1C", "#B6B7B5", "#9B999C", "#16190D", "#5F3D35", "#71391E"], //nystairs
	// ["#FBFBFD", "#7B7879", "#575758", "#5D5048", "#7F7066", "#3C3C3C"], //nystairs
	// ["#977A6D", "#5B5350", "#87847D", "#57646F", "#AFBBC2", "#B6ADA8", "#1B3B51", "#2D2E31", "#546877"], //nystairs (blues)
	// ["#873E04", "#463730", "#7D838A", "#CE8430", "#732F02", "#4E4340", "#453732", "#A19F9B", "#5B4F44"], //nylibrary browns grays
	// ["#403B37", "#444242", "#444242", "#2F2824", "#423D3B", "#423D3B", "#8B5D3E", "#3F3E3F", "#2A211A", "#D8D8D8", "#6C727D"], //nylibrary browns grays blues
	// ["#644C39", "#5B4536", "#B69D88", "#614C3E", "#16100C", "#150F0B", "#120D07"], //ny art haring? all browns dark
	// ["#662512", "#865E40", "#B9916F", "#B58562", "#965C3D", "#662512", "#53200A", "#432916", "#955C3D", "#4A3321"], //ny art reds browns clay
	// ["#040302", "#75604F", "#CDBBAB", "#77614A", "#0E0A06", "#BEA794", "#603102", "#93520D", "#A99588", "#A97D51"], //ny art reds browns clay
	// ["#C09A7A", "#C68425", "#9C1704", "#B38968", "#0D0604", "#967051", "#941102", "#A64A25"], //nyart yellow orange red (vivid color)
	// ["#A4886E", "#866648", "#5F3B1A", "#452B14", "#79552C", "#896338", "#0D0903", "#AA9179", "#4F3015"], //nyart browns
	// ["#AE7C41", "#A54B18", "#AC6C35", "#90350F", "#75270D", "#633E1A", "#0A0502", "#A3270C"], //nyart browns red harring
	// ["#C39B72", "#C29464", "#9A622C", "#864B12", "#823607", "#69350D", "#86480F", "#583D26", "#51270E"], //nyart browns  hesse
	// ["#676863", "#3E3E3C", "#82796D", "#444037", "#5F5343", "#000000", "#3B5478", "#233047", "#333630", "#413A33", "#343C35", "#20293C", "#4E483E"], //ny street sky blue gray brown
	// ["#B1B4B0", "#7D7672", "#604A49", "#504343", "#583E3F", "#828F87", "#61605B"], //nystreet (bg brown)
	// ["#392F28", "#34342E", "#696966", "#5F5B56", "#CDCDCD", "#FFFFFF", "#503D34", "#262420"], //nystreet grays bg brown
	// ["#2C2F2E", "#505351", "#271814", "#823A2B", "#A15444", "#777673", "#453D34"], //ny stairs grays reds bg orange
	//city
	// ["#46474A", "#6C665F", "#6C6C6C", "#2C2D25", "#8D9194", "#2C2920", "#57524E", "#5C5D58"], //window mpls warehouse (green gray brown beige)
	// ["#848482", "#BEAA81", "#88816F", "#9D9892", "#463D2C", "#7F745E", "#30251A", "#3F3626", "#A09C93"], //mpls warehouse window (some yellow)
	// ["#AFBDD0", "#D7DCE1", "#93A7B8", "#4D585B", "#585151", "#908985", "#848181", "#4D585"], //tiger dancing (blues gray)
	// ["#D0D0D0", "#FBFBFB", "#999B99", "#91867F", "#5B4939", "#47392B", "#3C5D5C", "#535351", "#586463", "#304142", "#33261D", "#745C4B"], //bridge bgs (bg brown white0)
	// ["#4B2D13", "#081B30", "#194874", "#0B1C2C", "#0B1C2C", "#101721", "#305F83"], //canada night image w/brown blue dark too vivid?
	// ["#172F4F", "#2A68A1", "#2B4E6B", "#103354", "#3C6FA4"], //canada night image ll blue dark combine with above?
	// ["#EFF0F2", "#DAD1C5", "#828075", "#353934", "#0F1214", "#091007", "#47493D", "#393E2F", "#484E42", "#2D372E"], //greens mist railway duluth with white
	//iowa
	["#CAC4BE", "#A49C99", "#716863", "#675F5A", "#8C857F", "#6D6560", "#635A55", "#948D87", "#655D58", "#C7C1BA"], //iowa farm gradient (all beige)
	["#5B534E", "#685E59", "#9E948E", "#C3BBB5", "#999089", "#978D87"], //iowa farm gradient (all beige)
	["#2A3135", "#596D86", "#8598B1", "#B8BFD3", "#6C7C8C", "#566D8B"], //iowa farm gradient (all blues)
	["#893D22", "#A9400A", "#BBB594", "#732D14", "#ACB9A2", "#5A1B00", "#87886B"], //iowa brick bldg
	["#E5E2E6", "#CAC7C9", "#786458", "#5B4D41", "#644629", "#5F5E50", "#943800", "#2F1E0C", "#47453E", "#372A1E"], //iowa brick bldg
	["#9B3C16", "#922400", "#A07E66", "#BAB8B5", "#E5E6E1", "#A16F58", "#421A03", "#381A04", "#481D09", "#939284"], //iowa brick bldg
	["#D3D3D5", "#B2B3B6", "#1F1F20", "#444C35", "#6F6C5C", "#7F745C", "#3C3F31", "#726A52", "#817153"], //iowa stone bldg
	["#6A4E45", "#8F7257", "#836D60", "#979EA2", "#54615E", "#45493C"], //iowa stone bldg
	["#787574", "#C3C3C4", "#616263", "#595139", "#3A3E27", "#ABABA9", "#363D23", "#746E64"], //iowa stone bldg
	["#6B85B5", "#614E28", "#8B8A87", "#726853", "#FFFDFB", "#453925", "#483D22", "#36363E", "#A7A6A3", "#C2B5A3"], //iowa bldg
	["#FEFAF1", "#E7DBCE", "#BDB6B0", "#94897E", "#7A7E85", "#625D4C", "#5F3B2B", "#898785", "#220300", "#76766C"], //iowa silo
	["#FFF8EE", "#978A80", "#09090A", "#EFE8E0", "#888D8E", "#6F6F62", "#2E0200", "#7C746D", "#CABCA8"], //iowa silo
	["#5A513E", "#A09C93", "#AA5818", "#905C29", "#AD5E1D", "#6B4219", "#6B4219", "#C87A48", "#562400", "#886236", "#989167"], //iowa bldg
	["#7E878D", "#322923", "#748288", "#D8E0DE", "#7E3E36", "#623124", "#7F2E29", "#C3CECE", "#2E3B49", "#11141D"], //iowa bldg marion
	["#F6F8FD", "#C2CACF", "#8C8C8A", "#835D51", "#64473D", "#6C7069", "#5C5B55", "#939B99", "#908675", "#4C443E"], //iowa bldgs
	["#BFB7A5", "#A4988B", "#6A7A88", "#070000", "#2F241C", "#592916", "#77504D", "#52525D", "#8F5F59"], //iowa bldg
	["#78747E", "#B3A895", "#6D6D60", "#605038", "#D7D3CE", "#AAA8AF", "#4D4739", "#241809", "#442500", "#40392A", "#494234", "#69695D"], //iowa cedar rapids under bridge 1
	["#A3A8AC", "#FAF1E5", "#969494", "#706B62", "#69788A", "#3C587C", "#171717", "#273F5A", "#48413A"], //iowa cedar rapids under bridge
	//cello
	// ["#1A0A03", "#2D0E08", "#6B2E12", "#613716", "#9E6528", "#5F370C", "#9A1905", "#FFF9C9"], //cello at sacred heart
	// ["#0E0600", "#2E0F04", "#0F0700", "#484E42", "#577871", "#010101", "#FFFFFF", "#406861", "#902200"], //cello at sacred heart
	// ["#78685B", "#B4A19A", "#877C6A", "#2F3C35", "#435046", "#242216", "#6B867D", "#993B21", "#000100", "#725128", "#15211D"], //cello at sacred heart
	// ["#6B6259", "#43403B", "#51524D", "#8A300F", "#743B1D", "#988071", "#2D2F2E", "#B9AA8D", "#64655E"], //cello stairwell*
	// ["#3D1C04", "#0D0604", "#411B0D", "#6D3F26", "#8E7061", "#8E9490"], //cellosacredheart
	//birdland
	// ["#163341", "#172F47", "#4477A8", "#2A4A69", "#52779B", "#000000", "#384B60", "#1F3350", "#153A69", "#153559", "#9D9990", "#9D9990", "#181E21", "#0C1D32", "#706959", "#D6D3CE", "#534E48", "#3E5766", "#222E34", "#BBB4A4", "#7C7D7F"], //birdland

];

	//controls
	( () => { 
		const soundlink = document.querySelector("#soundlink");
		const telegraph = document.querySelector("#telegraph");
		const audio1 = document.querySelector("#audio1");
		const baseurl = "https://storage.googleapis.com/www.blueboatfilms.com/sound/";
		const tracks = [
			{title: "love meditations", url: "lovemeditationspodcast.mp3", duration: 3980 }, //1:06:24
			{title: "river icarus", url: "rivericaruspodcast.mp3", duration: 2110}, //35:13
			// {title: "monks from outer space", url: "monks.mp3", duration: 380}, //6:22
			{title: "ocean | wind | grief", url: "oceanwindgriefpodcast.mp3", duration: 1870},//31:18
			{title: "nyx", url: "oceanwindgriefpodcast.mp3", duration: 1280},//21:26
			{title: "night train / blue window", url: "nighttrainbluewindow/nighttrainbluewindowpodcast.mp3", duration: 2280}, //38:06
			{title: "origin of birds", url: "originofbirdssound20140330.mp3", duration: 1360},//22:50
			{title: "ahab's dream", url: "ahabsdreampodcast.mp3", duration: 1220},//20:24
			{title: "birdland", url: "birdlandpodcast.mp3", duration: 3780},//1:03:05
			{title: "holy fool", url: "holyfoolpodcast.mp3", duration: 1720},//28:43
			{title: "horse speaks to sky", url: "horsespeakssky.mp3", duration: 420},//7:08
			// {title: "road to williston sound thread #1", url: "traffick20141208_all_v6.mp3", duration:1170}, //19:35
			{title: "rain clouds", url: "dronespace7.mp3", duration:360}, //6:03
			// {title: "the sound of everyday objects", url: "thesoundofeverydayobjectspodcast.mp3", duration: 2380},//39:42
			{title: "between2deserts / two - the swan", url: "theswanpodcast.mp3", duration:2970}, //49:33
			{title: "nyx ::: track #3", url: "nyx3.mp3", duration:200}, //3:20
			{title: "cistern #5", url: "cistern20140630_5_cistern.mp3", duration:1790}, //29:51
			{title: "echo & lightning", url: "echolightningpodcast.mp3", duration:2050}, //34:12
			// sophroniasoundscape
			// {title: "graffiti tunnel", url: "graffititunnelpodcast.mp3", duration: 1720},//45:12
			// {title: "graffiti 2 hands", url: "graffiti2handspodcast.mp3", duration: 3780},//1:03:13
			// {title: "between2deserts / two - the swan", url: "theswanpodcast.mp3", duration: 2960},//49:33

		];
		let soundplaying = false;
		Kefir.fromEvents(soundlink, "click").onValue( e => {
			z.tools.logmsg("play sound !");
			if(!soundplaying) { 
				try {
					let track = tracks[z.tools.randominteger(0,tracks.length)];
					audio1.src = baseurl + track.url;
					let starttime = z.tools.randominteger(0,track.duration);
					audio1.currentTime = starttime;
					z.tools.logmsg("start at " + starttime)
					audio1.play();
					z.tools.logmsg("playback resumed");
					telegraph.innerHTML =  "<i>(currently playing ::: " + track.title + ")</i>";
					soundplaying = true;
					soundlink.innerText = "turn off sound";
					soundlink.classList.add("active");
				} catch(e) { z.tools.logerror("dashboard ::: resumeaudio " + e) } 
			}
			else { 
				try {
					document.querySelector("#audio1").pause();
					telegraph.innerHTML =  " . . . >";
					soundplaying = false;
					soundlink.innerText = "turn on sound";
					soundlink.classList.remove("active");
				} catch(e) { z.tools.logerror("dashboard ::: suspendaudio " + e) }
			}
		});
	})();

			texts = {
				lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;',
				glitch: "xœ½YMo7½Ï¯ÐØ‰(~H‚=$môP oAéÚi{Øöï÷Q³k{Vj½:YÃ#š#½Gj%’’)DüìJIÂá8¹;;;×´üýçÝôêÝ=…_î½M­ýæî¯ßw?½{÷Sœk)‰5U!Ê&PPç¤R#Uƒ¦4!æó‹pø}„øöý#¾ûƒ#²#¾ÙÀÊ?&ê'ëÍÍIÛ”±Èœc 7ÇéÕw¨J¸ù<}xmj«™÷4¼Nwû`mÜ‡ø1Ü|?}{3ýx~±8‹H/·ö9'KV_il3¦f0e…tûbTLòâÃG{ÛÆ$",
				earthprayer: "A prayer for our earth All-powerful God, you are present in the whole universe and in the smallest of your creatures. You embrace with your tenderness all that exists. Pour out upon us the power of your love, that we may protect life and beauty. Fill us with peace, that we may live as brothers and sisters, harming no one. O God of the poor, help us to rescue the abandoned and forgotten of this earth, so precious in your eyes. Bring healing to our lives, that we may protect the world and not prey on it, that we may sow beauty, not pollution and destruction. Touch the hearts of those who look only for gain at the expense of the poor and the earth. Teach us to discover the worth of each thing, to be filled with awe and contemplation, to recognize that we are profoundly united with every creature as we journey towards your infinite light. We thank you for being with us each day. Encourage us, we pray, in our struggle for justice, love and peace.",
				bird: ".......,.,/(##(/..#%#(*,.,/,,*/#%#(.#&&@#//(%/,.*/,*(&@&@%(.*%#/,*/(&@&%/,/#%&,.,*/(#%#/(%#/*/(#%##/../(,%(//(%&#%/,..,(%#/(#%&@&&/,#%#,*/(#&@&%*.*/(&%(./((#%#&%#%&@%/..*%/##&@&*..#%(%@%/../#%#(/*,,(%/*,*/#&@,*(#(#@%,#%@@/.*(//(#%*..*/(#%&@&@.*(#%&@&*,%@%*.,#%#(#%,#%@&@&,.(#%#@..#%&%#%&@&,..*&%&%/../%@&@%./&@@@&@&(,.,(&%&@&,(%&#%&@&*.*#&@&@,./%&%/@&,.#&/#&@./(&@@/(#(#@*./#&@%#*/#%(/(#@&%//&@&@&@#(/,*(#%@&**#&%@&*,*((*,*/#@%.,@&@*,*/(/(/(%#(#%@#*%*,.#&@&%@,*/(/#%#(#@&,.&(,.%&@&@&@(,/#&##(%@%/.@%,.,(&@@&%*/#(&@%#(/(%&&%,..(%&@&@&%@%(*/(#%#%&@%#%@&%#@#/.%&@&#&#%#(#&@&#@%#.(&#.*&&@&%#%&@#(%&&@&%*..*%&@*,(&%&((#%&&%#&@@%*,#@%(.*#%#(##(#%(/%&@&%&@&%,,#&@*((/(#(*/(%&&&%&/./@%(.(&(/*/*/#(//(#(#%#/,*/(/(%&@&%#&@%(*.,/@&/,(&%/(/,*(#%&#(///#%&%@@@&%(.,#&@&%(./%&%(/*#,/(%&%#&@&@%&@%#*,(@%*(#*/(/*/(#//#(*/#&(*/#%&/(%&,(@,.##(#/,.*/*/(/(%&&%(%(,/&/#%#%#*,*/*,.,,*,#@&@/#%&%((&%#%&@#(*(%@*.(%&%/,(#/.,&@&%(/((%&@%@#%#(/(%&(/#&@%(../%*.,(/(#,,.,*%(*(/(/((#%&%&%&##%&%#/#&*.(%&@/,#/*,(#%(/,/#&@&%##%&@#&@%,.#&@(,*#/*,*,,,*((&@&%(#&/*/#&@%/.*%&@&%*.*(%#(*.*(#&&&&(&@&,.#@%*,.(#/,*/(/(#%&@&#%#%/..*%@&@/,.*%#/*,.,.,/@@&@&%@%#*/,.,&*.,*/#@&#%&%#.,/@/.,/#/*,.*,*(#&&@&%#(,./#@#*,.,*,*##(#//%&&@&(,..*%&%#@(*.*,.,*/#&(/*/(#&@##(,,#&@&%/*,(&@,*/*/#&%#/*(#%@%(.,/%*,.(*,./#%/*,*/(/(&*../&&%(*%&@&(%#/*%(,/#&@&@%#/%@(,.*%&@&%#%&@%(//%&#*./#@&%,.,*/%&%&@&&%/(#%&(,,/%#*,,(*,/#%&%#%&@&%(#&@%../#&@&@(#&@&&%/,..,%@%#%&#*,/&@%,.(%#%&%*.,(/,./#,/@&*,/(@%.,(&%#/,/(/.,/%&@%/#@*.*/#@&@&%/(%*.,#%*(%&%&@@/*/.%/#@%/,(*,/#@(/%#&@&,../&@&@@#*,*/%(#%#%&@&&@#(@&@#,.*&&@&/,/#%#,./#%(*#&#,/&(.,*/,#&@&@/*/#&%#%@#%@&*/#@&(,*#*.*(&@&@&@&@%,..*&@&(((#&@,*%&@@&(/(&@&%&@*../&@%#%&*,.*&@%@%@&@%(#&,./#@&&*.,%&@#&%&@@&*%&@(.,%&%@*..#&(,/%&#&@%.,&@@*.,*#&@*.%@&**&%/#,(&%(/%/,,&@&@#/,.(&@%/,,.,(@%&/.&@%,*(%*,.,#(.(%(,,/#*.,.,*,.*%@%,*.*(*,*.,#@#/(#,*(@%,**&(.**(%&(*.,/&@%/.(&@(,#&@%/,,/((,.,(&(.*,.,/%&%(/.%&@&,*/**,/*,.,./#((#%(,.,*(/(%&%/*(/*,*,,(#/./((%#(//,.*,*%#%&%/.(#/#(/.*,,*,.#%#(/*,*/#%(,&@*,,*/&%(/*,.*,*(%@%/,,.*##/,*,.,&%(,,/&,(/(%#(,,*,(%(*.(,*(%&,,*,,**,,%&/*,#&,*,,/%(*,,*#(*,/@,.,,.,%(/.,,(#*,./(*/(/(/(*,.,*(/,,,/(//(/,*,*.,,./*/,/*,*/*.(*,*,*/*/*((*,,*//*//#(*(%#*,*/,.,*/*/#(*(/(/*/*(*,*/*,#,*/%/*,*,/*(//%/,.#%(*/,/(,*%(/(*//*/*#%#*/(/(#*//(#%#*/(/*/#/%&(#(*/*//#(#/(@%#/(/(/*%&@%#(/#((/(#(#((#%@(#/#(#(#//*(/(#(#(((#(#/#%#(#((#(#(#(#/(/(#(#((#*/#(/(/((/(/%(/((/#%##//(#(#%#%#/*#%#%((*,(&##%",
				binary: "011010010111010000100000011101110110000101110011001000000110110001101001011010110110010100100000011101000110100001101001011100110010000001100101011101100110010101110010011110010010000001101101011011110111001001101110011010010110111001100111",
				data: "196201, 2.82, 21.7,-1.82,-1.82, -.22,-1.82,0, 1239, -.04, -.37, -.24, -.94, -.54, -.06, -.17,196202, 3.08, 20.8,-1.35,-1.35,.85, -.87,0, 1173,.53,.21,-.1, -.71, -.54, -.11,-.3,196203,2.2, 33.5,-1.81,-1.81,-1.78,-1.81,0,917,-1.09, -.47, -.52, -.81, -.94, -.32,-.3,196204, 3.88, 44.7,-1.36,-1.36,.79,-.9,0,558,.53, -.37, -.11, -.27, -.87, -.58, -.24,196205, 2.09, 57.4,-2.11,-2.11,-2.69,-2.11,4,306,-1.31, -.48,-1.08, -.88,-1.13, -.94, -.54,196206,3, 65.3,-2.42,-2.42,-1.58,-2.42, 68, 48,-.6,-1.42, -.75, -1,-1.06,-1.12, -.62,196207, 3.36, 66.1,-2.36,-2.36, -.55,-2.36, 88, 36, -.43,-.7, -1.3,-1.05, -.98,-1.31, -.79,196208, 3.63, 66.7,-2.28,-2.28, -.51,-2.28,104, 33, -.08, -.48, -.73,-1.23, -1.1,-1.22, -.67,196209, 3.73, 57.1,-1.93,-1.93,.35,-1.71,8,189,.19,.02, -.28, -.72, -.96, -1, -.83,196210, 4.24, 49.3,-1.34,-1.34, 1.17, -.54,0,457,.66, .5,.34, -.57, -.61, -.62, -.63,196211, 3.46, 35.5, -.97, -.97,.71,.16,0,803,.09,.52,.43, -.15, -.68, -.67, -.51,196212,3.1, 23.2, -.94, -.94, -.22,.08,0, 1215, -.07, -.01,.36,.04, -.33, -.55, -.36",
				chancenotes: "Code is a literature ::: a pattern language ::: a score. It is a choreography ::: a performance. A code renderer is the weaver ::: the mill ::: the alchemist ::: the wizard. Code is a spell ::: an incantation ::: an intent. Chance is a frayed thread, a stochastic cloud, a pointillist field, a variance, a complexity, an uncertainty, a ragged line.  When code is performed, it is an activation of text ::: a linguistic gymnastics that speaks in image & sound. In a perfect confluence of electricity, network, rhythm, memory, processing, action & reactions a program comes to life ::: Pinocchio  ::: a real boi at last. The program (the cybernetic ze) speaks to us, calculates for us, responds to our touch : our keystrokes. It becomes our mirror :|: our cyborg self ::: our memory.. ",
				chancelecturewebs: [": : :", "|:|:| <<-- ::: . ::: -->> |:|:|", "networks", "webs","spiders", "quartets", "the body", "the infinite sky", "the networked (i)", "chords", "tone rows", "electrical current", "radio transmissions", "telephone wires", "choreographies", "scores", "sculpture", "hypertext", "material", "palette", "light", "echo", "resonance", "rivers", "wind mills", "differential equations", "(how things change)", "the carbon cycle", "pipelines", "systems", "cities", "food web", "lattice", "tree", "graph",  "space", "orchestration", "digital cloud", "multi threaded", "multi lingual", "multi dimensional", "infinite between", "gender fluid", "attraction", "diffusion", "distraction", "friction", "resonation", "intra dependent", "ecosystem", "galaxies", "arteries", "cellular connections", "forests", "histories", "the modernist grid", "the API"],
				chancelecturecyborg: ["the cyborg", "trans / border", "trans / platform", "trans / media", "trans / figured", "trans / formed", "trans / gender", "say my name", "cybernetix ze", "cybernetic she", "networked (i)"],
				chancelecture: ["xœ½YMo", "7½Ï¯ÐØ‰", "(~H‚=$môP", "oAéÚi{", "Øöï÷Q³", "k{Vj½:YÃ", "#š#½Gj%’’)", "DüìJIÂá8¹", "×´üýçÝôêÝ=", "it was", "like this", "every morning", ". . .", "networks", "quartets", "sine waves", "infinite sky", "networked (i)", "chordal looms", "time", "electrical currents", "radio transmissions", "telephone wires", "hypertext sea", "torrents", "navigation", "score", "script", "material", "palette", "light", "resonance", "rivers", "wind mills", "/#&@%#*/#%(", "cities", "echo &amp; &amp;", "algorithms", "functions", "streams", "sound", "books", "words", "vectors", "code", "glyphs", "chalk pigment", "charcoal graphite", "house paint", "wood", "fragments", "web browsers", "computing machines", "the cloud", "the number 4", "red black", "white yellow", "electrical wires", "the carbon cycle", "the room", "rising walls", "the sky", "timelines", "random numbers", "circles lines", "body", "hand", "pitch", "bone", "sinew", "horse hair", "resin", "reed", "taut wire", "&infin; canvas sky", "cloud compass", "warp &amp; weft", "magnetic poles", "traversals", "transects", "densities", "gravities", "elliptical", "bendable time", "physical time", "manifest time", "open systems", "emergent systems", "evolving systems", "weather", "seasons", "night train", "blue window", "lonely passenger", "the century !", "the universe !", "industry !", "sandwiches", "a coin", "7 heavens", "winged angels", "holy, holy, høly", "love, love", "&amp; &amp; &amp;", "flight", "count", "map", "pulse", "breathe", "a topology", "a calculus", "an algebra", "ascensions", "extinctions", "trains", "grids", "clocks", "gears", "|:|:|Ø|:|:|", "threads |:| twisted", "crash of waves", "diffusion", "friction", "fray", "echo", "galaxies", "arteries", "neural nets", "forests", "food webs", "labyrinths", "histories", "an API", "technicolor", "galaxies", "infinities", "photosynthesis", "the swarm", "|:|:|<<--:::-->>|:|:|", "chance", "frayed thread", "stochastic cloud", "pointillist field", "variance", "complexity", "uncertainty", "ragged line", "prayer", "hYmn", "spell", "incantation", "invocation", "resistance", "persistence", "siren's lure", "witness", "|:|:|<<--:::-->>|:|:|", "net. x (i)", "(n) coded", "orchestrate", "activate", "pattern language", "digital score", "distillation", "choreography", "performance", "spell ::: ", "::: incantation", "intent", "code", "confluence ", "electricity &amp; network", "rhythm &amp; memory", "map filter reduce", "act || react", "code is", "a literature", "::: a poetry", "= > an intimacy", "fingers", "tapping glass", ": || : rubbing glass", "aladdin's lamp", "fiber optics", "the cyborg body", "the fragile", "electric", "body", "say my name", "|:|:|<<--:::-->>|:|:|", "the cyborg", "trans / border", "trans / platform", "trans / media", "trans / figured", "trans / formed", "trans / gender", "cybernetic ze", "cybernetic she", "web spider", "alchemist", "ø Z ", "omniscient", "machine learner", "data consumer", "sensitive", "cybernetic", "skull", "(m) bodied", "intelligence", "networked (i)", "encrypted cipher", "mechanized logic", "thinking loom", "subterranean gears", "::: heart / beat", "networked omniscience", "super intelligent øZ", "big data oracle", "gepetto's workshop", "pinocchio ::: ", ". reAl boi", "zero / øne", "true / false", "on || off", "magnetic s/ze", "(i) mirror you ::: ", "speak to you", "|:|:|  remember", "your fingerprints", "your irises", "your steps &amp;&amp;", "destinations", "purchases", "preferences", "tickets", "searches", "longings", "your intimate", "data sets", "your imprint", "signals", "blood || circuits", "pulse", "|:|:|<<--:::-->>|:|:|", "memory", "trace", "(i) i ."],
			};
