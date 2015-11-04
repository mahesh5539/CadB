exports.home = function(req, res){
	res.render('home', { title: 'CadB : home' });
};

exports.menu = function(req, res){
	res.render('menu', { title: 'CadB : home' });
};

exports.galary = function(req, res){
	res.render('galary', { title: 'CadB : galary' });
};

exports.aboutus = function(req, res){
	res.render('aboutus', { title: 'CadB : aboutus' });
};
