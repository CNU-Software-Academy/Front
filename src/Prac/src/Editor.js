export default function Editor({$target, initialState = {
    title : '',
    content: '',
}}){
    const $editor = document.createElement('div')

    let isintialize = false

    this.state = initialState

    $editor.style.height = '350px'
    $editor.style.width = '600px'

    $target.appendChild($editor)

    this.setState =(nextState)=>{
        this.state = nextState
        this.render()
    }
    this.render = () =>{
        if(!isintialize){
            $editor.innerHTML = `
                <input type>='text' name='title' style= 'width:600px;' value='${this.state.title}'/>
                <textarra name='content' style='width:600px;height:400px;'>${this.state.content}</textarea>
            `
        }
    }
    this.render() // 규격

    $editor.addEventListener('keyup', e =>{
        const {target} = e
        const name = target.getAttribute('name')
        
        if(this.state[name] !== undefined){
            const nextState = {
                ...this.state,
                [name]:target.value}

        }
        this.setState(nextState)
        onEditing(this.state)

        }
    })
}