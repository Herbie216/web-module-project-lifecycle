import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id='todoform' onSubmit={this.props.onTodoFormSubmit}>
          <input
            value={this.props.todoNameInput}
            type='text'
            placeholder='Type Todo'
            onChange={this.props.onTodoNameInputChange}
          />
          <input type='submit' value='Add Todo' />
        </form>
        <button onClick={this.props.toggleDisplayCompleted}>
          {this.props.displayCompleteds ? 'Hide' : 'Show'} Completed
        </button>
      </>
    )
  }
}
