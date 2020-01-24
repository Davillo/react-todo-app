import React, { Component } from "react";
import Todos from "./components/Todos";
import Header from './components/layouts/Header';
import AddTodo from './components/AddTodo';

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: "Take out the trash",
        status: false
      },
      {
        id: 2,
        title: "Dinner with wife",
        status: true
      },
      {
        id: 3,
        title: "Meeting with boss",
        status: false
      }
    ]
  };

  //Toggle complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.status = !todo.status;
        }
        return todo;
      })
    });
  };
  //delete Todo
  deleteTodo = (id) => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  addTodo = (title) => {
    const newTodo = {
      id: Math.random(1,1000),
      title,
      status: false
    };
    this.setState({todos: [...this.state.todos, newTodo]})
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddTodo addTodo={this.addTodo} />
          <Todos
            todos={this.state.todos}
            deleteTodo={this.deleteTodo}
            markComplete={this.markComplete}
          />
        </div>
       
      </div>
    );
  }
}

export default App;
