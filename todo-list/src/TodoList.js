import React, { Component } from "react";
import TodoItems from './TodoItems';
import fire from './fire';
import * as moment from 'moment'; 

import './TodoList.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentWillMount() {
        let itemsRef = fire.database().ref('items').orderByKey().limitToLast(100);
        itemsRef.on('child_added', snapshot => {
            let items = { text: snapshot.val().text, link: snapshot.val().actualLink, key: snapshot.val().key, time: snapshot.val().time };
            this.setState({ items: [items].concat(this.state.items) });
        })
    }
    addItem(e) {
        var now = moment().format("MM-DD-YY"); 
        e.preventDefault();
        var newItem = {
            text: this._inputElement.value,
            value: e.target.link.value,
            actualLink: e.target.actualLink.value,
            time: now,
            key: Date.now()
        }
        fire.database().ref("items").push(newItem)
        this._inputElement.value = "";
        e.target.actualLink.value = "";
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
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
                        <input className="mandy"
                            placeholder="enter task"
                            ref={(a) => this._inputElement = a} />
                        <button className="mandy" type="submit">add</button>
                        <h3 className="addLink">Add a link?</h3>
                        <select className="mandy" name="link">
                            <option name="link"
                                value={false}
                                defaultValue="no">No</option>
                            <option value={true}
                                name="link"
                            >Yes</option>
                        </select>
                        <input className="nick"
                            name="actualLink"
                            placeholder="insert link here" />
                    </form>
                </div>
                <TodoItems entries={this.state.items}
                    delete={this.deleteItem} />
            </div>
        );
    }
}

export default TodoList;