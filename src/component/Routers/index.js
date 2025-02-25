import HomePage from "../Home";
import ModePage from "../Mode";
import About from "../aboutme";
import Game from "../Game";
import Challenge from "../Challenge";
import Human from "../Human";
const PublicRouters = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/mode",
    component: ModePage,
  },
  {
    path: "/game",
    component: Game,
    layout: null,
  },
  {
    path: "/challenge",
    component: Challenge,
    layout: null,
  },
  {
    path: "/human",
    component: Human,
    layout: null,
  },
];

export default PublicRouters;
