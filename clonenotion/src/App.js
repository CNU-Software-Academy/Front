import NavBar from './components/NavBar.js';
import EditPage from './pages/EditPage.js';
import HomePage from './pages/HomePage.js';
import { RouterUtils } from './utils/router.js';
import { request } from './utils/api.js';

export default function App({ $target }) {
  const editPage = new EditPage({
    $target,
    initialState: {
      documentId: '',
      title: '',
      content: '',
    },
  });

  const homePage = new HomePage({
    $target,
  });

  const navBar = new NavBar({
    $target,
    onDeleteDoc: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE',
      });

      let { pathname } = window.location;
      let [, , _documentId] = pathname.split('/');
      if (id === _documentId) {

        RouterUtils.routerDispatcher('/', true);
      }

      pathname = window.location.pathname;
      [, , _documentId] = pathname.split('/');

      navBar.setState();
      editPage.setState({ documentId: _documentId });
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      homePage.render();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      editPage.setState({ documentId });
    }
  };

  this.route();

  RouterUtils.initRouter(() => this.route());
}
