import { Component } from 'react';

import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

class App extends Component {
    constructor(props) {
      super(props);
    
        this.state = {
            dataBase : [
                {name:'John Smit', salary:800, increase : false, rise: true, id:1},
                {name:'Alex Ivanov', salary:3000, increase : true, rise: false, id:2},
                {name:'Petr Spilberg', salary:5000, increase : false, rise: false, id:3},
            ],
            term : '',
            filter : 'all'
        }
        this.maxId = 4;
    }

    onToggleProp = (id, prop) => {
        this.setState(({dataBase}) => ({
            dataBase: dataBase.map(item => {
                if(item.id === id) {
                    return{...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }
    
    deleteItem = (id) => {
        this.setState(({dataBase}) => {
            return {
                dataBase : dataBase.filter(elem => elem.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({dataBase}) => {
            const newArr = [...dataBase, newItem]
            return{
                dataBase: newArr
            }
        })
    }

    searchEmp = (items, term) => {
        if(term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdeteSearch = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise' :
                return items.filter(item => item.rise);
            case 'moreThen1000' :
                return items.filter(item => item.salary > 1000);
            default :
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const { dataBase, term, filter} = this.state
        const employees = this.state.dataBase.length
        const up = this.state.dataBase.filter(item => item.increase).length
        const visibleData = this.filterPost(this.searchEmp(dataBase, term), filter)
        return(
            <div className="app">
                <AppInfo counter={employees}
                up={up}/>

                <div className="search-panel">
                    <SearchPanel onUpdeteSearch={this.onUpdeteSearch}/>
                    <AppFilter 
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList 
                    data={visibleData}
                    onDel={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    sumIncr={this.sumIncr}/>
                <EmployeesAddForm 
                    onAdd={this.addItem}/>
            </div>
        );
    }   
}

export default App;