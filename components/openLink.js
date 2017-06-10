import React,{Component} from 'react';
import {WebView} from 'react-native';
export default class LinkNavigation extends Component{
static navigationOptions=({navigation})=>({
    title:navigation.state.params.title
    });
    render(){
        const { params } = this.props.navigation.state;
        return(
            <WebView
                source={{uri:params.url}}
            />
        );
    }
}