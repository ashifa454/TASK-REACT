import React,{Component} from 'React';
import {StyleSheet,View,Alert} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SmsListener from 'react-native-android-sms-listener';
var PushNotification=require('react-native-push-notification');
import {Content,Text,H4,Left,Button,Icon,Card,CardItem,Right,Separator,List,ListItem,Body} from 'native-base';
export default class PushScreen extends Component{
   constructor(){
       super();
       var tempMessage=[];
       this.state={messages:[]};
       SmsListener.addListener(message=>{
           tempMessage.push({
               title:message.originatingAddress,
               message:message.body
           });
           this.setState(previous=>{
                return {messages:tempMessage}
           });
       })
   }
DoInstantNotication=function(){
    PushNotification.localNotification({
      autoCancel:true,
      largeIcon:"ic_launcher",
      smallIcon:"ic_launcer",
      bigText:"THIS IS INSTANT NOTIFICATION, DID YOU LIKE THAT",
      subText:"HIT IF YOU LIKE IT",
      title:"Instant Notification",
      message:"IT'S An INSTANT NOTIFICATION",
      actions:'["WOW","IT WAS FINE"]'
    });
  }
  SechduleOnDaily=function(){
      nextDay=new Date();
      if(nextDay.getHours()<18){
          nextDay.setHours(18);
          nextDay.setMinutes(0);
          nextDay.setSeconds(0);
      }else{
        nextDay.setDate(nextDay.getDate()+1);
          nextDay.setHours(18);
          nextDay.setMinutes(0);
          nextDay.setSeconds(0);          
      }
      PushNotification.localNotificationSchedule({
        autoCancel:true,
        largeIcon:"ic_launcher",
        smallIcon:"ic_launcer",
        subText:"HIT IF YOU LIKE IT",
        title:"Daily Notification Notification",
        message:"Wolla is 6PM, I am Ready to Rock",
        actions:'["WOW","IT WAS FINE"]',
        date:nextDay,
        repeatType:'day',
      });
      Alert.alert("Status","Notification Sechdule for 6PM "+nextDay);
  }
    SechduleOnWeekend=function(){
        commingSunday=new Date();
        commingSunday.setDate(commingSunday.getDate()+(0+(7-commingSunday.getDay()))%7)
        commingSunday.setHours(14);
        commingSunday.setMinutes(0);
        commingSunday.setSeconds(0);
        PushNotification.localNotificationSchedule({
          autoCancel:true,
        largeIcon:"ic_launcher",
        smallIcon:"ic_launcer",
        subText:"HIT IF YOU LIKE IT",
        title:"Weekly Notification",
        message:"Its a Lazy Sunday at 2PM, and Here I am",
        actions:'["WOW","IT WAS FINE"]',
        date:commingSunday,
        repeatType:'week',
      });
    Alert.alert("Status","Notification Sechdule for 2PM "+commingSunday);
}
    render(){
        return (
                <Content>
                    <Grid>
                    <Row>
                        <Card>
                        <CardItem header>
                        <Text> Sechdule Notification @</Text>
                        </CardItem>
                    <CardItem>
                       <Icon active name="clock" />
                       <Text>6 PM Daily</Text>
                    <Right>
                    <Button success transparent onPress={()=>{this.SechduleOnDaily()}}>
                    <Text>See in Action</Text>
                    </Button>
                    </Right>
                     </CardItem>
                    <CardItem>
                       <Icon active name="glasses" />
                       <Text>2 PM Sunday</Text>
                       <Right>
                    <Button danger transparent onPress={()=>{this.SechduleOnWeekend()}}>
                          <Text>See in Action</Text>
                    </Button>                       
                    </Right>
                     </CardItem>
                    <CardItem>
                       <Icon active name="flame" />
                       <Text>Notify Now</Text>
                       <Right>
                    <Button transparent onPress={()=>{this.DoInstantNotication()}}>
                          <Text>See in Action</Text>
                    </Button>
                       </Right>
                     </CardItem>
                </Card>
                </Row>
                <Row>
                <Separator bordered>
                    <Text>Message Reader</Text>
                </Separator>
                </Row>
            <Row>
            <List dataArray={this.state.messages} renderRow={(item)=>
                <ListItem>
                <Body>
                    <Text>{item.title}</Text>
                    <Text note>{item.message}</Text>
                </Body>
                </ListItem>        
                }>
          </List>
          </Row>
            </Grid>
            </Content>    
        );
    }
}