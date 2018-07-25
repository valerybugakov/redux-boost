import {
  createAction,
  createActions,
  createReducer,
} from '../src/'

const store = {
  state: undefined,
  dispatch(action) {
    this.state = this.reducer(this.state, action)
    return action
  },
}

const testAction = createAction('foo')
const dirtyAction = createAction('bad')

const actions = createActions([
  'add',
  'toggle',
  'withoutHandler',
])

const initialState = {
  boolean: true,
  array: ['initialItem'],
  input: '',
  modifyMe: {
    omg: true,
  },
}

store.reducer = createReducer({
  [testAction]: (state, input) => ({ ...state, input }),

  [dirtyAction]: (state, omg) => {
    state.modifyMe.omg = omg
  },

  [actions.add]: (state, item) => ({
    ...state,
    array: [
      ...state.array,
      item
    ]
  }),

  [actions.toggle]: state => ({
    ...state,
    boolean: !state.boolean,
  }),
}, initialState)

describe('Basic utils', () => {
  test('Initial state reducer', () => {
    store.dispatch(actions.withoutHandler())

    expect(store.state).toEqual(initialState)
  })

  test('Prefixed actions', () => {
    const prefixedActions = createActions(['delete'], 'users')

    expect(prefixedActions.delete().type).toEqual('users/delete')
  })

  test('Actions work with reducer', () => {
    const userInput = 'user input'

    store.dispatch(testAction(userInput))
    store.dispatch(actions.toggle())
    store.dispatch(actions.add(userInput))

    expect(store.state.input).toEqual(userInput)
    expect(store.state.boolean).toEqual(false)
    expect(store.state.array).toEqual(['initialItem', userInput])
  })

  test('Not pure reducer works', () => {
    const omg = 'I wanna be a string'
    store.dispatch(dirtyAction(omg))

    expect(store.state.modifyMe.omg).toEqual(omg)
  })
})
