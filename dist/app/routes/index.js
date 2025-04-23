"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/users/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const project_route_1 = require("../modules/project/project.route");
const projectGroup_route_1 = require("../modules/projectGroup/projectGroup.route");
const team_route_1 = require("../modules/team/team.route");
const router = (0, express_1.Router)();
const apiRoutes = [
    { path: "/user", route: user_route_1.UserRoute },
    { path: "/auth", route: auth_route_1.AuthRoute },
    { path: "/projects", route: project_route_1.ProjectRoute },
    { path: "/project-groups", route: projectGroup_route_1.ProjectGroupRoute },
    { path: "/teams", route: team_route_1.TeamRoute },
];
apiRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
