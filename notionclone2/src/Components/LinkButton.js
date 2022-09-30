import { push } from '../utils/router.js';

export default function LinkButton({ 
    $target,
     initialState 
}) {
    this.state=initialState
    const $linkButton = document.createElement('button')
    $target.appendChild($linkButton);


    this.render = () => {
        const titleLen = this.state.title.length;
        if (titleLen === 0) {
        this.state.title = '제목 없음';
        } else if (titleLen > 10) {
        this.state.title = `${this.state.title.substring(0, 9)}...`;
        }
        $linkButton.textContent = this.state.title;
    };

    this.render();

    $linkButton.addEventListener('click',()=>{
        push(this.state.link);
    });
}