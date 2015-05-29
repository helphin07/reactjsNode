'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change',
    _contents = [];

/**
 * Set the values for contents that will be used
 * with components.
 */
function setContentList (contents) {
    console.log(contents);
    _contents = contents;
}

var ListingStore = assign({}, EventEmitter.prototype, {

    /**
     * Emits change event.
     */
    emitChange: function () {
        console.log(CHANGE_EVENT);
        this.emit(CHANGE_EVENT);
    },

    /**
     * Adds a change listener.
     *
     * @param {function} callback Callback function.
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * Removes a change listener.
     *
     * @param {function} callback Callback function.
     */
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    /**
     * Return the list for contents.
     */
    getContentList: function () {
        return _contents;
    }
});

ListingStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case ActionConstants.RECEIVE_CONTENTS:
            setContentList(action.contentsList);
            break;

        default:
            return true;
    }

    ListingStore.emitChange();

    return true;
});

module.exports = ListingStore;
