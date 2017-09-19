/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ListView,
  ScrollView,
  View,
  Button,
  Dimensions,
  Alert,
  AsyncStorage
} from 'react-native';

var ToDo = React.createClass ({

  addToDo: function(oEvent){
    if(oEvent.nativeEvent.text != ''){
      var oDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this._toDoList.push(oEvent.nativeEvent.text);
      this.setState({dataSource: oDataSource.cloneWithRows(this._toDoList)});
      AsyncStorage.setItem("toDoItems", JSON.stringify(this._toDoList));
    } else {
      Alert.alert('Error')
    }
  },

  loadFromLocalStorage: function(oResult){

    var oDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if(oResult){
      try{
        oResult = JSON.parse(oResult);
        this._toDoList = oResult;
        this.setState({dataSource: oDataSource.cloneWithRows(this._toDoList)});
      }
      catch(exp){
        console.log(exp);
      }
    }
  },

  getInitialState(){
     var oDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

     AsyncStorage.getItem("toDoItems").then( (value) => { this.loadFromLocalStorage(value)});

     this._toDoList = ['Buy Coffee', 'Water the Plants'];
     return {
      dataSource: oDataSource.cloneWithRows(this._toDoList),
    };
  },

  renderItem(rowData){
    return (
      <Text style={styles.todoItem}>{rowData}</Text>
    );
  },

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>
          Task :
        </Text>

        <ScrollView  style={styles.scrollView}>

          <ListView dataSource={this.state.dataSource}
                    renderRow={this.renderItem}
                    style={styles.todoList}
           >

          </ListView>
        </ScrollView>

        <TextInput
        ref='anis'
        style={styles.searchInput}
        placeholder="Task Name Here ...."
        onSubmitEditing={this.addToDo}
        />

        <Button
        onPress = {this.addToDo}
        title = "Click Me"
        />

      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  searchInput: {
    height:40,
    width:300,
    fontSize:18,
    borderWidth:1,
    color:'black',
    borderColor: '#488BEC',
    borderRadius:1,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  scrollView:{
    backgroundColor: '#EFEFEF',
    height: 300
  },
  todoList: {
    backgroundColor: "#EFEFEF",
    flex: 1,
    width: Dimensions.get('window').width
  },
  todoItem:{
    backgroundColor: "#FFFFFF",
    textAlign: "left",
    borderColor: "#000000",
    fontSize: 26,
    margin: 2
  }
});

AppRegistry.registerComponent('AwesomeProject', () => ToDo);
