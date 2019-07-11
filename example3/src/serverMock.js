// this mocks an API endpoint
// the todos are stored in the session storage
const serverMock = {
  _todos: [],
  _updateState() {
    sessionStorage.setItem('todos', JSON.stringify(this._todos));
  },
  addToDo(item, callback) {
    this._todos.push(item);
    this._updateState();
    setTimeout(callback, 1000);
  },
  getToDos(callback) {
    setTimeout(() => {
      callback(this._todos);
    }, 1000);
  }
};

export default serverMock;