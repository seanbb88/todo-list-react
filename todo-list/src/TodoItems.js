import React, { Component } from 'react';

import './TodoItem.css'

class TodoItems extends Component {
    constructor(props) {
        super(props)

        this.createTask = this.createTask.bind(this)
    }
    delete(key) {
        this.props.delete(key);
    }
    createTask(item) {
        console.log(item); 
        return <li className="list-item"
            key={item.key}>
            {item.text}<br></br>
            {!item.link ? "" : "Link: "} <a href={item.link}>{item.link}</a> <br></br>
            Task Created: {item.time}
            <button
                className="deleteBtn"
                onClick={() => this.delete(item.key)} type="submit"> x </button>
        </li>
    }
    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTask);

        return (
            <ul className="theList">
                {listItems}
            </ul>
        )
    }
}
export default TodoItems; 