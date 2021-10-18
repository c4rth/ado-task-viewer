"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@fluentui/react");
const React = require("react");
require("./App.css");
const Inputs_1 = require("./Inputs");
const Theme_1 = require("./Theme");
class App extends React.Component {
    constructor(props) {
        super(props);
        let initialData = this.props.initialData;
        let oldState = this.props.vscode.getState();
        if (oldState) {
            this.state = oldState;
        }
        else {
            this.state = { adoTask: initialData };
        }
    }
    /*
    private defineState(newSate: IConfigState) {
      this.setState(newSate);
      this.props.vscode.setState(newSate);
    }*/
    /*
    onChangeUserActiveState(userIndex: number) {
      let newState = { ...this.state };
      newState.config.users[userIndex].active = !newState.config.users[userIndex]
        .active;
  
      this.defineState(newState);
    }
  
    onAddRole(event: React.KeyboardEvent<HTMLInputElement>, userIndex: number) {
      if (event.keyCode === 13 && event.currentTarget.value !== "") {
        let newState = { ...this.state };
        newState.config.users[userIndex].roles.push(event.currentTarget.value);
        this.defineState(newState);
        event.currentTarget.value = "";
      }
    }
  
    onAddUser(event: React.KeyboardEvent<HTMLInputElement>) {
      if (event.keyCode === 13 && event.currentTarget.value !== "") {
        let newState = { ...this.state };
        let newUser: IUser = {
          name: event.currentTarget.value,
          active: true,
          roles: []
        };
        newState.config.users.push(newUser);
        this.defineState(newState);
        event.currentTarget.value = "";
      }
    }
  
    renderUsers(users: IUser[]) {
      return (
        <React.Fragment>
          <h2>User List :</h2>
          <ul className="">
            {users && users.length > 0
              ? users.map((user, userIndex) => {
                  let roles =
                    user.roles && user.roles.length > 0
                      ? user.roles.join(",")
                      : null;
  
                  return (
                    <li key={userIndex}>
                      {user.name}
                      <br />
                      Is active :{" "}
                      <input
                        type="checkbox"
                        checked={user.active}
                        onChange={() => this.onChangeUserActiveState(userIndex)}
                      />
                      <br />
                      Roles : {roles}
                      <input
                        type="text"
                        placeholder="Add Role"
                        onKeyUp={event => this.onAddRole(event, userIndex)}
                      />
                    </li>
                  );
                })
              : null}
          </ul>
          <input
            type="text"
            placeholder="Add User"
            onKeyUp={event => this.onAddUser(event)}
          />
        </React.Fragment>
      );
    }*/
    render() {
        return (<react_1.ThemeProvider theme={Theme_1.default.appTheme}>
        <div className="App">
          <h1>{this.state.adoTask.friendlyName}</h1>
          <Inputs_1.default adoTask={this.state.adoTask}/>
        </div>
      </react_1.ThemeProvider>);
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map