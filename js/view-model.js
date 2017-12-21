var DiveSpot = function(data) {
	this.name = ko.observable(data.name);
	this.latLng = ko.observableArray([data.position.lat, data.position.lng]);
	this.img = ko.observable('');
	this.showDropdown = ko.observable(false);
	this.id = ko.observable('');
}

var viewModel = function() {
	var self = this;

	this.locationList = ko.observableArray([]);

	locations.forEach(function(location) {
		self.locationList.push(new DiveSpot(location));
	});

	this.imageFinder = function(element) {
		this.ll = element.latLng()[0] + ',' + element.latLng()[1];
		this.search = 'https://api.foursquare.com/v2/venues/search?'+ 
			'client_id=BUDS1D5K2ZIUUDJYC0KJQK4VLAPE1ETKWYJGG455Z4FJ5EFF' +
  			'&client_secret=STVZLJOV5WUHIZEEWPIDHN1EZ1KLRJWWPZ2DC1VHUECD01NQ' +
  			'&ll=' + this.ll +
  			'&query=' + element.name() + 
  			'&v=20171220'
  		$.ajax({
  			url: this.search,
  			type: "GET",
  			dataType: "jsonp"
  		}).done(function(results) {
  			element.id(results.response.venues[0].id);
  			$.ajax({
		  		url: 'https://api.foursquare.com/v2/venues/'+ element.id() +
		  			'?client_id=BUDS1D5K2ZIUUDJYC0KJQK4VLAPE1ETKWYJGG455Z4FJ5EFF' +
		  			'&client_secret=STVZLJOV5WUHIZEEWPIDHN1EZ1KLRJWWPZ2DC1VHUECD01NQ' +
		  			'&v=20171220',
		  		type: "GET",
		  		dataType: "jsonp"
		  	}).done(function(response) {
		  		this.photo = response.response.venue.bestPhoto;
		  		if (this.photo != undefined) {
		  			this.url = this.photo.prefix + this.photo.width + 'x' + this.photo.height 
		  				+ this.photo.suffix;
		  			element.img(this.url);
		  		}
		  		else {
		  			console.log(response);
		  		}
		  	});
  		});
	};

	this.locationList().forEach(function(location) {
		self.imageFinder(location);
	});

	this.toggleDropdown = function(element) {
		if (element.showDropdown() === false) {
			element.showDropdown(true);
		}
		else {
			element.showDropdown(false);
		}
	};

	this.showInfo = function(element) {
		toggleBounce(element.name());
		if (element.img() === '') {
			self.toggleDropdown(element);
		}
		else {
			self.toggleDropdown(element);
		}
	};

	this.toggleListView = function() {
		this.list = $('#sidebar');
		this.map = $('#map');
		this.icon = $('#menu');

		if (this.list.css('display') !== 'block') {
			this.list.css('display', 'block');
			this.map.css('width', '100%');
			this.icon.css('left', '400px');
		}
		else {
			this.list.css('display', 'none');
			this.map.css('width', '100%');
			this.icon.css('left', '0%');
		}
	};
};

ko.applyBindings(new viewModel());
