const uuid = require('uuid/v1');
/**
 * Toast
 * core instance of toast
 *
 * @param _options
 * @returns {Toasted}
 * @constructor
 */

export const Toasted = function (_options) {
    /**
	 * Unique id of the toast
	 */
    this.id = uuid;

    /**
	 * Shared Options of the Toast
	 */
    this.options = _options;
}