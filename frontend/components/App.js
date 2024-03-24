import React from 'react'
import axios from 'axios'
import Form from './form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayCompleteds: true
  }

  resetForm = () => {
    this.setState({ todoNameInput: '', error: '' })
  }

  setAxiosError = (err) => {
    this.setState({ error: err.response.data.message })
  }

  onTodoNameInputChange = evt => {
    const { value } = evt.target
    this.setState({ todoNameInput: value })
  }

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm()
      })
      .catch(this.setAxiosError)
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(() => {
        this.setState({
          todos: this.state.todos.map(todo => {
            if (todo.id !== id) return todo;
            return { ...todo, completed: !todo.completed };
          })
        });
      })
      .catch(this.setAxiosError);
  }

  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postNewTodo()
  }

  fetchAllTodos() {
    axios.get(URL)
      .then(res => {
        this.setState({ todos: res.data.data, error: '' })
      })
      .catch(this.setAxiosError)
  }

  toggleDisplayCompleted = () => {
    this.setState({ ...this.state, displayCompleteds: !this.state.displayCompleteds })
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return (
      <div>
        <div id='errors'>Error: {this.state.error}</div>
        <TodoList
        toggleCompleted={this.toggleCompleted}
        displayCompleteds={this.state.displayCompleteds}
        todos={this.state.todos}
        />
        <Form
          onTodoFormSubmit={this.onTodoFormSubmit}
          onTodoNameInputChange={this.onTodoNameInputChange}
          toggleDisplayCompleted={this.toggleDisplayCompleted}
          todoNameInput={this.state.todoNameInput}
          displayCompleteds={this.state.displayCompleteds}
        />
      </div>
    )
  }
}