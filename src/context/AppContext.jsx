import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const CARDS_PER_PAGE = 6;

const initialState = {
    allPosts : [], 
    removedIds: [], 
    currentPage: 1,
    totalPages: 0, 
    isloading: true,
    viewMode: "grid",  //grid|list
    isFeedbackOpen: false
}

function appReducer(state,action){
    switch(action.type){
        case "SET_POSTS" : {
            const totalPages = Math.ceil(action.payload.length / CARDS_PER_PAGE);
            return{...state, allPosts: action.payload, totalPages, isloading: false}
        }
        case "SET_LOADING":
            return { ...state,  isloading: action.payload}
        case "SET_PAGE":
            return { ...state, currentPage: action.payload }
        case "REMOVE_POST": {
            const removedIds =  [...state.removedIds, action.payload]
            const activePosts = state.allPosts.filter((p) => !removedIds.includes(p.id))
            const totalPages = Math.ceil(activePosts.length / CARDS_PER_PAGE)
            const currentPage = Math.min(state.currentPage, totalPages)

            return {...state, removedIds, totalPages, currentPage}
        }
        case "TOGGLE_VIEW":
            return {...state, viewMode: state.viewMode === "grid" ? "list" : "grid"}

        case "TOGGLE_FEEDBACK":
            return {...state ,  isFeedbackOpen: !state.isFeedbackOpen};
        case "CLOSE_FEEDBACK":
            return {...state , isFeedbackOpen:false}
        default:
            return state;
    }
      
}

const AppContext = createContext(null)

export function AppProvider({children}){
    const [state,dispatch] = useReducer(appReducer,initialState)

    const activePosts =  state.allPosts.filter((p)=> !state.removedIds.includes(p.id))

    const start = (state.currentPage - 1) * CARDS_PER_PAGE;
    const visiblePosts = activePosts.slice(start, start + CARDS_PER_PAGE)

    useEffect(()=>{
        const timer = setTimeout(async ()=>{
            try {
                const res = await fetch("https://jsonplaceholder.typicode.com/posts")
                const json = await res.json() 
                const posts =Array.isArray(json) ? json : json.data ?? []; 
                dispatch({ type: "SET_POSTS", payload: posts})
            } catch (error) {
                dispatch({type: "SET_LOADING", payload: { isloading: false }})
            }
        },5000)
        return () => clearTimeout(timer)
    },[])

    const actions = {
        setPage: (page)=> dispatch({ type: "SET_PAGE" , payload: page}),
        removePost : (id) => dispatch({ type: "REMOVE_POST", payload: id}),
        toggleView : ()=> dispatch({type : "TOGGLE_VIEW"}),
        toggleFeedback : () => dispatch({ type : "TOGGLE_FEEDBACK"}),
        closeFeedback : () => dispatch({ type : "CLOSE_FEEDBACK"}),
        isLoading : (isloading) => dispatch({ type: "SET_LOADING", payload: { isloading }})
    }

    return (
        <AppContext.Provider value={{ state, activePosts, visiblePosts, actions, CARDS_PER_PAGE}}>
            {children}
        </AppContext.Provider>
    )

}

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if(!ctx) throw new Error("useAppContext must be within AppProvider")
    return ctx;
}