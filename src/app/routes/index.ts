import { Router } from "express";
import { UserRoute } from "../modules/users/user/user.route";
import { AuthRoute } from "../modules/auth/auth.route";
import { ProjectRoute } from "../modules/project/project.route";
import { ProjectGroupRoute } from "../modules/projectGroup/projectGroup.route";

const router = Router();
const apiRoutes = [
  { path: "/user", route: UserRoute },
  { path: "/auth", route: AuthRoute },
  { path: "/projects", route: ProjectRoute },
  { path: "/project-groups", route: ProjectGroupRoute },
];
apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
