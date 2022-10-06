import SideBar from './src/components/SideBar.js';
import EditPage from './src/Page/CallEditor.js';
import HomePage from './src/Page/Mainpage.js';
import { RouterUtils } from './src/utils/router.js'
import { request } from './src/api/config/index.js'

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
        initialState,
    });

    const sideBar = new SideBar({

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
            
            sideBar.setState();

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
    this.render()
    
}