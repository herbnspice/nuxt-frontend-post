export const state = () => {
    return { 
        errors : {}
    }
}

export const getters = {
    errors(state) {
        return state.errors
    }
}

export const mutations ={
    SET_VALIDATION_ERRORS( state, errors ){
        state.errors = errors 
    }
}

export const actions = {
    setErrors({commit}, error ){
        commit( 'SET_VALIDATION_ERRORS', error )
    },
    clearErrors({commit}){
        commit( 'SET_VALIDATION_ERRORS', {} )
    },
}