//#31  Tạo InitialState và Thiết Lập AppReducer
export default function reducer(state, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'CURRENT_USER':
            return { ...state, user: action.payload };
        case 'GET_ALL_POSTS':
            return { ...state, posts: action.payload };
        case 'CREATE_ONE_POST':
            return { ...state, posts: [...state.posts, action.payload] };
        case 'UPDATE_ONE_POST':
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? { ...post, ...action.payload } : post
                ),
            };
        case 'DELETE_ONE_POST':
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload._id),
            };
        default:
            return state;
    }
}
