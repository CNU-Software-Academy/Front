import Header from "./Header";
import { request } from "../../../src/Prac/src/api";

export default function Sidebar({$target,inititalState,onClick}){

    const $sidebar = document.createElement('nav')
    $sidebar.classList.toggle('nav-bar')
    $target.appendChild($sidebar)

    new Header({$target:$sidebar})

    const documentList = new DocumentList({
        $target,
        inititalState:[],

        onClick: (id)=>{
            
        }
    })
}