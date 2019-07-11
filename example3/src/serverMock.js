const serverMock = {
  _todos: [],
  addToDo(item, callback) {
    this._todos.push(item);
    setTimeout(callback, 1000);
  },
  getToDos(callback) {
    setTimeout(() => {
      callback(this._todos),
      1000
    });
  }
};

export default serverMock;