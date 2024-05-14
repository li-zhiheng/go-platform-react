// 初始状态
const defaultState = {
    num: 20
}

// 这里的类型名需要小写 Number 不被认可
const reducer = (state=defaultState,action:{type:string,val:number})=>{
    const newState = {...state}

    switch (action.type) {
        case 'add':
            newState.num ++ 
            break;
        case 'multi':
            newState.num = newState.num * action.val
            break;

    }

    return newState
}

export default reducer