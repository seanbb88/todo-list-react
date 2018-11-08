import React, { Component } from "react";

import './TodoList.css'; 

class TodoList extends Component {
    constructor(props){
        super(props); 

        this.state = {
            items: [],
            compleded: []
        }

        this.addItem = this.addItem.bind(this); 
    }

    addItem(e){
        e.preventDefault(); 
        if(this._inputElement.value !== ""){
            var newItem = {
                text: this._inputElement.value,
                key: Date.now()
            }; 

            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            });
        }

        this._inputElement.value="";
        console.log(this.state.items)
    }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem} className="list-form">
            <input  className="mandy" 
                    placeholder="enter task"
                    ref={(a) => this._inputElement = a} />
            <button className="mandy" type="submit">add</button>
            <select className="mandy" name="link">
            <option value="no" defaultValue="no">N/A</option>
            <option value="yes">Yes</option>
            </select>
            <input className="nick" placeholder="insert link" />
          </form>
        </div>
      </div>
    );
  }
}

export default TodoList; 