import React from "react"
import { View, TextInput, StyleSheet,Alert,Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Ionicons } from '@expo/vector-icons'
import Firebase from '../Firebase'

export default class LoginScreen extends React.Component {
  state = {
    name: ""
  }

  validateName = () => {
    if (this.state.name.length < 5) {
      Alert.alert("Error", "Invalid name");

      this.setState({ name: "" });
    } else {
      const name = this.state.name
      Firebase.add(name)

      this.props.navigation.navigate("Chat", {
        name
      })
      
      this.setState({ name: "" })
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
        <Text style={{color:"#1C1C1C", fontSize: 40,fontWeight:'bold',marginBottom: 40,marginTop: -40}}>ChatApp</Text>
        <TextInput style={{ marginTop:-30, height: 70, width:"80%",borderWidth: StyleSheet.hairlineWidth, borderRadius: 30, paddingHorizontal: 60, color: "black", fontWeight: "600",  backgroundColor:"#fff"}}
          placeholder='Digite o nome'
          autoCapitalize='none'
          value={this.state.name} 
          onChangeText={name => {this.setState({ name });
          }}>
          </TextInput>
        
        <View style={{alignItems: "flex-end", marginTop: 64 ,marginTop: 30}}>
          <TouchableOpacity style={{width:90, height:70, borderRadius: 70 / 2, backgroundColor: "#8B008B", alignItems: "center", justifyContent: "center" }} onPress={this.validateName} >
            <Ionicons name="ios-chatbubbles" size={24} color="#fff">Entrar</Ionicons>
          </TouchableOpacity>

        </View>

      </View>
    )
  }
}