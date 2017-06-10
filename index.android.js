/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Container,Content} from 'native-base';
import {Footer,FooterTab,Button,Icon,Badge,Text} from 'native-base';
import {AppRegistry,Alert} from 'react-native';
import PushScreen from './components/pushTask';
var PushNotification=require('react-native-push-notification');
import {StackNavigator} from 'react-navigation';
import LinkNavigation from './components/openLink';
export default class INTERN extends Component {
  constructor(){
    super();
    const Localp=new LocalPush();
    Localp.configuration();
  }
  static navigationOptions={
    title:'Task Application'
    };
  render() {
    const {navigate}=this.props.navigation;
    return (
        <Container>
          <PushScreen id="1"/>
           <Footer>
            <FooterTab>
                <Button active>
                    <Icon name="home" />
               <Text> Home </Text>
                </Button>
                <Button verticle onPress={()=>{
                        navigate('OpenUrl',{url:'http://asifansari.me',title:'Web Resume'})
                    }}>
                        <Icon name="paper" />
                <Text> Resume</Text>
                </Button>
                <Button verticle onPress={()=>{
                        navigate('OpenUrl',{url:'https://github.com/ashifa454',title:'Github Link'})
                    }}>
                    <Icon name="flash" />
                <Text> Github </Text>
                </Button>
            </FooterTab>
        </Footer>
        </Container>
    );
  }
}
class LocalPush{
  configuration=function(){
    PushNotification.configure({
      onNotification:function(notification){
        Alert.alert("HELLO WORLD");
      },
      permissions:{
        alert:true,
        badge:true,
        sound:true
      },
      requestPermission:true
    });
  }

}
const SimpleApp = StackNavigator({
  Home: { screen: INTERN }, //Default entry screen
  OpenUrl:{screen:LinkNavigation}
});
AppRegistry.registerComponent('INTERN', () => SimpleApp);
