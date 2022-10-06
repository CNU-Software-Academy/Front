import Editor from '../components/Editor.js';
import EditorLink from '../components/Linker.js';
import { request } from '../api/config/index.js';
import { StorageUtils } from '../utils/storage.js';
import { EventUtils } from '../utils/event.js';
import { RouterUtils } from '../utils/router.js';
import {RootDocuments, getDocuments, createDocument, updateDocument, deleteDocument} from '../api/CallApi.js'

export default function EditPage({ $target, initialState }) {
    const $editPage = document.createElement('div');
    $editPage.classList.add('edit-page');
    $editPage.classList.add('page');

    this.state = initialState;

    let KeyLocalDocument = `temp-document-${this.state.documentId}`;
  
    const localSavedDocument = StorageUtils.getItem(KeyLocalDocument, {
        title: '',
        content: '',
    });

    let timer = null;

    const editorDocLink = new EditorLink({
            $target: $editPage,
        });

    const editor = new Editor({
            $target: $editPage,
            initialState: localSavedDocument,

        onEditing: async (document) => {
        
            if (timer !== null) {
                clearTimeout(timer);
            }

            timer = setTimeout(async () => {
            
                KeyLocalDocument = `temp-document-${this.state.documentId}`;

            
            StorageUtils.setItem(KeyLocalDocument, {
                ...document,
                tempSaveDate: new Date(),
            });

            await request(`/documents/${document.id}`, {
                method: 'PUT',
                body: JSON.stringify(document),
            });

        
            StorageUtils.removeItem(KeyLocalDocument);

        
            EventUtils.titleDispatcher();
            }, 200);
        },
    });

    const fetchDocument = async () => {
        const { documentId } = this.state;
        if (documentId) {

            const document = await request(`/documents/${documentId}`).catch(() =>
            RouterUtils.routerDispatcher('/')

            );

            editor.setState(document);
            editor.render();
      
            editorDocLink.makeSubLinks(document);

            this.render();

        }
    };

    this.setState = async (nextState) => {
        this.state = nextState;

        fetchDocument();
    };

    this.render = () => {
        $target.appendChild($editPage);
    };
}