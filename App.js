import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './screens/LoginScreen'
import ChatScreen from './screens/ChatScreen'

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Chat: {
    screen: ChatScreen
  }
});

export default createAppContainer(AppNavigator);

