import { ROUTER_CHANGE_EVENT_NAME, POPSTATE_EVENT_NAME } from './ConstantsName.js';

const routerDispatcher = (nextUrl, isReplace = false) => {
    window.dispatchEvent(
        new CustomEvent(ROUTER_CHANGE_EVENT_NAME, {
            detail: {
                nextUrl,
                isReplace,
            },
        })
    );
};

const initRouter = (onRoute) => {
    window.addEventListener(ROUTER_CHANGE_EVENT_NAME, (event) => {
        const { nextUrl, isReplace } = event.detail;

        if (nextUrl) {
            if (isReplace) {

                window.history.replaceState(null, null, nextUrl);

            }   else{

                window.history.pushState(null, null, nextUrl);
            }
            onRoute();
        }
    });

    window.addEventListener(POPSTATE_EVENT_NAME, () => {
        onRoute();
    });
};

export const RouterUtils = {

  routerDispatcher,
  initRouter,
  
};