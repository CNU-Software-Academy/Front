export const API_END_POINT = 'https://kdt.roto.codes'

export const request = async(url,options = {}) =>{
    try{
        const res = await fetch(`${API_END_POINT}${url}`,{
            ...options,
            headers:{
                'Content-Type' : 'application/json',
            }
        })
        if (res.ok){
            return await res.json()
        }
        throw new Error('API 처리 중 오류가 발생했습니다.')

    }catch(e){
        alert(e.message)
    }
}
export{request}