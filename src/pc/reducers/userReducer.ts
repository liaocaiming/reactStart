const initialState = {
  userName: 'liaocaiming', 
  list: [
    {
      name: 5555,
      title: 8888
    }
  ]
}

export default function userReducer (state:any = initialState, action:any) {
  switch(action.type) {
    case 'liaocaiming':
      return (Object as any).assign({}, state, {
        name: 'liaocaiming'
      })
    default: 
      return state;
  }
}