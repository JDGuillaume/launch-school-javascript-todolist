class Todo {
  static DONE_MARKER = 'X';
  static UNDONE_MARKER = ' ';

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`Invalid index ${index}`);
    }
  }

  add(todo) {
    if (todo instanceof Todo) {
      this.todos.push(todo);
    } else {
      throw new TypeError('can only add Todo objects');
    }
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  filter(callback) {
    const newList = new TodoList(this.title);

    this.forEach(todo => {
      if (callback(todo)) {
        newList.add(todo);
      }
    });

    return newList;
  }

  findByTitle(title) {
    return this.todos.find(todo => todo.getTitle() === title);
  }

  first() {
    return this.todos[0];
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  last() {
    return this.todos[this.todos.length - 1];
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  markDone(title) {
    let todo = this.findByTitle(title);
    if (todo) todo.markDone();
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1)[0];
  }

  shift() {
    return this.todos.shift();
  }

  size() {
    return this.todos.length;
  }

  toArray() {
    return this.todos.map(item => item);
  }

  toString() {
    const title = `----${this.title}----`;
    let list = this.todos.map(todo => todo.toString()).join('\n');
    return `${title}\n${list}`;
  }
}
