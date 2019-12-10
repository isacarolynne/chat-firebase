import React from "react"
import { GiftedChat } from "react-native-gifted-chat"
import {SafeAreaView,Text } from "react-native"
import Firebase from "../Firebase"

export default class ChatScreen extends React.Component {
  state = {
    messages: []
  }

  get user() {
    return {
      _id: Firebase.uid,
      name: this.props.navigation.state.params.name
    }
  }

  componentDidMount() {
    Firebase.get(message =>
      this.setState(previous => ({
        messages: GiftedChat.append(previous.messages, message)
      }))
    )
  }

  componentWillUnmount() {
    Firebase.off()
  }

  render() {
    const name = this.props.navigation.state.params.name

    const giftedChat = <GiftedChat renderUsernameOnMessage={true} messages={this.state.messages} onSend={Firebase.send} user={this.user} />

    return (<SafeAreaView style={{ flex: 1, backgroundColor:"#FFB6C1" }}>
      <Text style={{alignSelf: 'center',marginTop: 20 }}>{`${name} está online`}</Text>{giftedChat}</SafeAreaView> )
   
  }
}
