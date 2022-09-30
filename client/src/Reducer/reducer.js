const user = JSON.parse(localStorage.getItem("user"));
export const intialState = user || null;


export const reducer = (state,action)=>{
    if(action.type==="USER"){
     return action.payload;
    }
    if(action.type==="LOGOUT"){
        return null;
    }
    if(action.type==="UPDATE_USER"){
        return {
            ...state,
            name:action.payload.name
        }
    }
    return state;
}