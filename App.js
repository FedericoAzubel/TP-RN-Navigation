import * as React from 'react';
import { Button, TextInput, Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// --------------- Screens Stack A -------------------

function ScreenA1() {
  const navigation = useNavigation();
  return (
    <View style={stylesA.screen}>
      <Text style={styles.text}>HOME</Text>
      <Button title="Ir a HOME 2" onPress={() => navigation.navigate('ScreenA2')} />
      <Image source={{ uri: 'https://reactjs.org/logo-og.png' }} style={styles.image} />
    </View>
  );
}

function ScreenA2() {
  const navigation = useNavigation();
  return (
    <View style={stylesA.screen}>
      <Text style={styles.text}>HOME 2</Text>
      <Button title="Volver a HOME" onPress={() => navigation.goBack()} />
    </View>
  );
}

// --------------- Screens Stack B -------------------

function ScreenB1({ navigation }) {
  const [nombre, setNombre] = React.useState('');
  const [telefono, setTelefono] = React.useState('');

  return (
    <View style={stylesB.screen}>
      <Text style={styles.text}>Buscador</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <Button
        title="Enviar datos"
        onPress={() => navigation.navigate('ScreenB2', { nombre, telefono })}
      />
    </View>
  );
}

function ScreenB2() {
  const route = useRoute();
  const { nombre, telefono } = route.params || {};

  return (
    <View style={stylesB.screen}>
      <Text style={styles.text}>Datos recibidos:</Text>
      <Text style={styles.text}>Nombre: {nombre}</Text>
      <Text style={styles.text}>Teléfono: {telefono}</Text>
    </View>
  );
}

// --------------- Screens Stack C -------------------

function ScreenC1({ navigation }) {
  return (
    <View style={stylesC.screen}>
      <Text style={styles.text}>Perfil</Text>
      <Button title="Ir a Perfil 2" onPress={() => navigation.navigate('ScreenC2')} />
    </View>
  );
}

function ScreenC2() {
  return (
    <View style={stylesC.screen}>
      <Text style={styles.text}>Perfil Detallado</Text>
      <Image
        source={require('./assets/gato.png')}
        style={styles.image}
      />
    </View>
  );
}

// --------------- Stacks -------------------

const StackA = createNativeStackNavigator();
const StackB = createNativeStackNavigator();
const StackC = createNativeStackNavigator();

function StackANavigator() {
  return (
    <StackA.Navigator screenOptions={{ headerShown: false }}>
      <StackA.Screen name="ScreenA1" component={ScreenA1} />
      <StackA.Screen name="ScreenA2" component={ScreenA2} />
    </StackA.Navigator>
  );
}


function StackBNavigator() {
  return (
    <StackB.Navigator screenOptions={{ headerShown: false }}>
      <StackB.Screen name="ScreenB1" component={ScreenB1} />
      <StackB.Screen name="ScreenB2" component={ScreenB2} />
    </StackB.Navigator>
  );
}

function StackCNavigator() {
  return (
    <StackC.Navigator screenOptions={{ headerShown: false }}>
      <StackC.Screen name="ScreenC1" component={ScreenC1} />
      <StackC.Screen name="ScreenC2" component={ScreenC2} />
    </StackC.Navigator>
  );
}


// --------------- Tabs -------------------

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Buscador') iconName = 'search';
          else if (route.name === 'Perfil') iconName = 'person';
          else iconName = 'ellipse';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={StackANavigator} />
      <Tab.Screen name="Buscador" component={StackBNavigator} />
      <Tab.Screen name="Perfil" component={StackCNavigator} />
    </Tab.Navigator>
  );
}

// --------------- App -------------------

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

// --------------- Shared Styles -------------------

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'white',
    width: 200,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

// Estilos específicos por stack

const stylesA = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const stylesB = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0033cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const stylesC = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#228B22',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
