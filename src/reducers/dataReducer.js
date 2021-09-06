const dataReducer = (state = {}, action) => {
    switch (action.type) {
        case "SIMPAN_DATA":
            return action.data;
        default:
            return state;
    }
}

export default dataReducer;