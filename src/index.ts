import playgame from './pages/index';
import login from './pages/login';
import error404 from './pages/error404';
import { parserRequestUrl , $} from './ultil';
const Assignment = new playgame();
const Login = new login();
const Error404 = new error404();

const routes = {
    '/': Login,
    '/games': Assignment
}

const router = async () => {
    const {resource } = parserRequestUrl();
    const parseUrl = ( resource ? `/${resource}` : '/');
    const page = routes[parseUrl] ? routes[parseUrl] : Error404;
    $('#content').innerHTML = await page.render();
    if (page.afterRender) {
        await page.afterRender();
    }
}


window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);