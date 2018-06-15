"use strict";
(function (Role) {
    Role[Role["None"] = 'none'] = "None";
    Role[Role["Participant"] = 'participant'] = "Participant";
    Role[Role["Instructor"] = 'instructor'] = "Instructor";
    Role[Role["Admin"] = 'admin'] = "Admin";
})(exports.Role || (exports.Role = {}));
var Role = exports.Role;
