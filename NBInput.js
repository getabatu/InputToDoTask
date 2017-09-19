import React, { Component } from 'react';
import List from './List';

import {
  AppRegistry,
	StyleSheet,
	Text,
	View,
	StatusBar,
	Dimensions,
	TextInput,
} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Label, Button, Left, Body, Right, Title, Icon } from 'native-base';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  term: '',
		  items: []
		};
	  }

	  onChange = (text) => {
		this.setState({term: text});
	  }

	  onSubmit = (event) => {
			event.preventDefault()

			if (this.state.term == '') {
				return;
			};

			const array = [...this.state.items]
			array.push(this.state.term)

			this.setState({
				term: '',
				items: array
			});
	  }

	render() {
		return (
			<Container>
				<StatusBar hidden = {true}/>
        <Header>
          <Left>
            <Button onPress={this.onSubmit} >
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Input Task</Label>
              <Input 
								value={this.state.term} 
								onChangeText={this.onChange}
								onSubmitEditing={this.onSubmit}
								style={localStyles.entree}
							/>
            </Item>
          </Form>

					<View>
						<List items={this.state.items} />
					</View>
        </Content>
      </Container>
		)

	}
}

const localStyles = StyleSheet.create({

	entree: {
		padding: 15,
		width: 350,
		height: 50,
		},
});
AppRegistry.registerComponent('FBAndInput', () => App);