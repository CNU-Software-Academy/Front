import DocumentList from './DocumentList.js';
import Header from './Header.js';
import NavButton from './NavButton.js';
import { request } from '../utils/api.js';
import { RouterUtils } from '../utils/router.js';
import { EventUtils } from '../utils/event.js';

export default function NavBar({ $target, onDeleteDoc }) {
  const $navBar = document.createElement('nav');
  $navBar.classList.add('nav-bar');
  $target.appendChild($navBar);

  new Header({ $target: $navBar });

  const documentList = new DocumentList({
    $target: $navBar,
    initialState: [],

    onClickDoc: (id) => {
      RouterUtils.routerDispatcher(`/documents/${id}`);
    },

    onCreateSubDoc: async (id) => {
      const createdDocument = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '',
          parent: id,
        }),
      });

      RouterUtils.routerDispatcher(`/documents/${createdDocument.id}`);

      this.setState();
    },
    onDeleteDoc,
  });

  new NavButton({
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

      RouterUtils.routerDispatcher(`/documents/${createdDocument.id}`);

      this.setState();
    },
  });

  this.setState = async () => {

    const documents = await request('/documents');

    documentList.setState(documents);
  };

  this.setState();

  EventUtils.titleEventListener(() => this.setState());
}
