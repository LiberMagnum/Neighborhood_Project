var DiveSpot = function(data) {
	this.name = ko.observable(data.name);
	this.latLng = ko.observableArray([data.position.lat, data.position.lng]);
}

var viewModel = function() {
	var self = this;

	this.locationList = ko.observableArray([]);

	locations.forEach(function(location) {
		self.locationList.push(new DiveSpot(location));
	});

	this.showInfo = function(element) {
		toggleBounce(element.name());
	};

	this.toggleListView = function() {
		this.list = $('#sidebar');
		this.map = $('#map');
		this.icon = $('#menu');

		if (this.list.css('display') !== 'block') {
			this.list.css('display', 'block');
			this.map.css('width', '80%');
			this.icon.css('left', '21%');
		}
		else {
			this.list.css('display', 'none');
			this.map.css('width', '100%');
			this.icon.css('left', '0%');
		}
	}
};

ko.applyBindings(new viewModel());