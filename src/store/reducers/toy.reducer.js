import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

export const ADD_MSG_TO_TOY = 'ADD_MSG_TO_TOY'


const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    lastToys: []
}

export function toyReducer(state = initialState, cmd = {}) {
    // console.log('<><>', cmd)

    switch (cmd.type) {
        case SET_TOYS:
            return { ...state, toys: cmd.toys }

        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, cmd.toy]
            }

        case REMOVE_TOY:
            const lastToys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== cmd.toyId),
                lastToys
            }

        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)
            }

        case TOY_UNDO:
            return {
                ...state,
                toys: [...state.lastToys]
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }

        // Add message to toy
        case ADD_MSG_TO_TOY: {
            const { toyId, msg } = cmd
            return {
                ...state,
                toys: state.toys.map(toy =>
                    toy._id === toyId
                        ? { ...toy, msgs: [...(toy.msgs || []), msg] }
                        : toy
                )
            }
        }


        default:
            return state
    }
}