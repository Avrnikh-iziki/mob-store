let cartreducer = (state = { items: [] }, action) => {
    const item = action.payload
    switch (action.type) {
        case "ADD_ITEM":
            const isExist = state.items.find(el => el._id == item._id)
            if (isExist) {
                return {
                    ...state,
                    items: state.items.map(el => el._id === item._id ? item : el)
                }
            } else {
                return {
                    ...state,
                    items: [...state.items, item]
                }
            }
        case "DEL_ITEM":
            return {
                ...state,
                items: state.items.filter(el => el._id !== item._id)
            }
        case "RESET":
            return {
                ...state,
                items: []
            }
        default:
            return state
    }
}

export default cartreducer;