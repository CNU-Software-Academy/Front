import App from './App.js'
import Editor from './Editor.js'

const $target = document.querySelector('#app')

new Editor({$target , initialState: {
    title:'오늘',
    context: ''
},
    onEditing:()=>{
        console.log(post)
    }
})