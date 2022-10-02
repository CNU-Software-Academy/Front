import DocumentList from './DocumentList.js';
import Header from './Header.js';
import LinkButton from './LinkButton.js';
import { request } from '../api/config/index.js';
import { push } from '../utils/router.js';
import { EventUtils } from '../utils/event.js';

export default function sideBar({ $target, onDeleteDoc }) {
    
    const $navBar = document.createElement('nav');
    $navBar.classList.toggle('nav-bar');
    $target.appendChild($navBar);

    new Header({ $target: $navBar });

    const documentList = new DocumentList({
        $target: $navBar,
        initialState: [],

    onClickDoc: (id) => {
        push.routerDispatcher(`/documents/${id}`);
    },

    onCreateSubDoc: async (id) => {
        const createdDocument = await request('/documents', {
            method: 'POST',
            body: JSON.stringify({
            title: '',
            parent: id,
            }),
        });

      
        push.routerDispatcher(`/documents/${createdDocument.id}`);

        this.setState();
    },
    onDeleteDoc,
  });

    new LinkButton({
        $target: $navBar,
        iconTag: '<span class="material-icons">add</span>',
        text: '새 페이지',

        onCreateRootDoc: async () => {
        const createdDocument = await request('/documents', {
            method: 'POST',
            body: JSON.stringify({
            title: '',
            parent: null,
            }),
        });

      
        push.routerDispatcher(`/documents/${createdDocument.id}`);

        this.setState();
        },
    });

    this.setState = async () => {
    
        const documents = await request('/documents');
    
        documentList.setState(documents);
    };

    this.setState();

    push.titleEventListener(() => this.setState());
}