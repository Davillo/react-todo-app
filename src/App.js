import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./components/pages/About";
import Todos from "./components/Todos";
import Header from "./components/layouts/Header";
import AddTodo from "./components/AddTodo";
import uuid from "uuid";
import axios from "axios";

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=20")
      .then(response => this.setState({ todos: response.data }));
  }

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
  deleteTodo = id => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(response =>
        this.setState({
          todos: [...this.state.todos.filter(todo => todo.id !== id)]
        })
      );
    
  };

  addTodo = title => {
    axios.post("https://jsonplaceholder.typicode.com/todos", {
        title: title,
        completed: false
      })
      .then(response =>
        this.setState({ todos: [...this.state.todos, response.data] })
      );
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              path="/"
              exact
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />

                  <Todos
                    todos={this.state.todos}
                    deleteTodo={this.deleteTodo}
                    markComplete={this.markComplete}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
