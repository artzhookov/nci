'use strict';

define([
	'underscore',
	'reflux', 'app/actions/build', 'app/connect'
], function(_, Reflux, BuildActions, connect) {
	var Store = Reflux.createStore({
		listenables: BuildActions,

		output: '',

		init: function() {
			console.log('init builds console output');
		},

		onReadTerminalOutput: function(buildId) {
			var self = this;

			self.output = '';

			var resourceName = 'build' + buildId;

			connect.resource(resourceName).unsubscribeAll();
			connect.resource(resourceName).subscribe(function(data) {
				self.output += data;

				self.trigger({
					buildId: buildId,
					name: 'Console for build #' + buildId,
					data: self.output
				});
			});
		}
	});

	return Store;
});
