import React from "react";
import ToDo from "./ToDo";
import AddToDo from "./AddToDo";
import { call } from "./service/ApiService";
import { Paper, List, Container } from "@material-ui/core"
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =
    {
      items: [
      ]
    };
  }

 //컴포넌트가 로드되면 호출되는 함수
 componentDidMount(){
  call("/todo", "GET", null)
  .then((response) => 
    this.setState({items:response.data}));
};

//데이터 삽입을 위한 함수
add = (item) => {
  call("/todo", "POST", item)
  .then((response) => 
    this.setState({items:response.data}));
};

delete = (item) => {
  call("/todo", "DELETE", item)
  .then((response) => 
    this.setState({items:response.data}));  
}

update = (item) => {
  call("/todo", "PUT", item)
  .then((response) => 
    this.setState({items:response.data}));  
}

  render() {
    //item 길이가 0 이상인 경우에 출력
    var todoItems = this.state.items.length > 0 && (<Paper style={{ margin: 16 }}>
      <List>
        {this.state.items.map(
          (item, idx) => (
            <ToDo item={item} key={item.id} delete={this.delete} />
          ))}
      </List>
    </Paper>
    );

    return (
      <div className="App">
        <Container maxWidth="md">
          <AddToDo add={this.add} />
          <div className="ToDoList">{todoItems}</div>
        </Container>

      </div>
    );
  }
}
export default App;