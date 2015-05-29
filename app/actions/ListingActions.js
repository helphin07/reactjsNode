/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');
var Promise = require('es6-promise').Promise; // jshint ignore:line
var Api = require('../services/Api');

var ContentListingActions = {

    /**
     * Function to get the Configuration
     */
    getConfiguration: function () {
        Api.get('/configuration')
            .then(function (config) {
                console.log(config);
            })
            .catch(function () {
                console.log('error');
            });
    },
    
    /**
     * Function to get the contents list
     */
    getContentList: function () {
        Api.get('/list')
            .then(function (contents) {
                console.log(contents);
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_CONTENTS,
                    contentsList: contents.entries
                });
            })
            .catch(function () {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_ERROR,
                    error: 'There was a problem getting the contents'
                });
            });
    }

};

module.exports = ContentListingActions;
