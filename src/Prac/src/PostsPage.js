import PostList from "./PostList.js"
import {request} from './api.js'
import LinkButton from "./LinkButton.js"

export default function PostsPage({
    $target,
    
}){
    const $page = document.createElement('div')

    const postList = new PostList({
        $target:$page,
        initialState:[],
        
    })
    
    new LinkButton({
        $target:$page,
        initialState:{
            text:'Newpost',
            link: '/posts/new'
        }
    })
    
    this.state = async() =>{
        const posts =await request('/posts')
        postList.setState(posts)
        this.render()
    }
    

    this.render=async()=>{
        $target.appendChild($page)
    }
}