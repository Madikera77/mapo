/*

Copyright (c) 2013 Mapo developpers and contributors <mapo.tizen@gmail.com>

This file is part of Mapo.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

var init = function () {
    // TODO:: Do your initialization job
	swipePage();
	refresh();
	// End of initialization
    console.log("init() called");
};

//var initEmail = function() {
//	
//	// caller
//
//	mailInit();
//	sendEmail("This is a test message.", "mapo.tizen@laposte.net");
//
//}

window.onload = init;
//$(document).ready(initEmail);
