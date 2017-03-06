const TAG = path.basename(__filename, '.js');

module.exports = function(e) {
	return new Promise((resolve, reject) => {
		console.debug(TAG, e);
		let { parameters:p, fulfillment, resolvedQuery } = e;

		return resolve({
			text: p.q
		});
	});
};