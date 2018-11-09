import React, { Component } from "react";
import TodoItems from './TodoItems'; 
import  fire  from './fire'; 

import './TodoList.css'; 

class TodoList extends Component {
    constructor(props){
        super(props); 
        this.state = {
            items: []
        }
        this.addItem = this.addItem.bind(this);  
        this.deleteItem = this.deleteItem.bind(this);  
    }

    componentDidMount(){
        /* Create reference to messages in Firebase Database */
        let itemsRef = fire.database().ref('items').orderByKey().limitToLast(100);
        itemsRef.on('child_added', snapshot => {
          /* Update React state when message is added at Firebase Database */
          let items = { text: snapshot.val(), id: snapshot.key };
          this.setState({ items: [items].concat(this.state.items) });
        })
      }

    addItem(e){
        e.preventDefault(); 
        if(this._inputElement.value !== ""){
            fire.database().ref('items').push(this._inputElement.value)

            var newItem = {
                text: this._inputElement.value,
                key: Date.now(),
                value: e.target.link.value,
                link: e.target.actualLink.value
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

    deleteItem(key){
        var filteredItems = this.state.items.filter(function(item){
            return (item.key !== key)
        })

        this.setState({
            items: filteredItems
        })
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
            <option name="link"
                    value={false}
                    onSubmit={this.addItem}
                    defaultValue="no">N/A</option>
            <option value={true}
                    name="link"
                    onSubmit={this.addItem}
                    >Yes</option>
            </select>
            <input   className="nick"
                     name="actualLink"
                     placeholder="insert link" />
          </form>
        </div>
        <TodoItems entries={this.state.items}
                    delete={this.deleteItem} />
      </div>
    );
  }
}

export default TodoList;