import { Alert, FlatList, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const image = require ("./assets/pic1.jpg");
export default function InputTask() {

    const [textInput , setTextInput] = useState('');

    const [todos , setTodos] = useState([
        {id :1 , task : 'First Task' , completed : true},
        {id :2 , task : 'Second Task' , completed : false},
    ]);

    useEffect(()=>{
        getTodo();
    },[]);
    
    useEffect(()=>{
        saveTodo(todos);
    },[todos]);

    const saveTodo = async (todos) =>{
        try {
            const stringifyTodos = JSON.stringify(todos)
            await AsyncStorage.setItem('todos', stringifyTodos)
          } catch (e) {
            console.log(e);
          }
    };

    const getTodo = async () =>{
        try {
            const getTask = await AsyncStorage.getItem('todos');
            if(getTask != null){
                setTodos(JSON.parse(getTask));
            }
        } catch (error) {
            console.log(error);
        }
    }


    const ListItem = ({todo}) =>{
        return (
            <View style={styles.listItem}>
                <View style = {{flex : 1 }}>
                    <Text 
                    style = {{
                        fontSize: 18 , 
                        fontWeight : 'bold' , 
                        color: '#333',
                        textDecorationLine : todo?.completed ? 'line-through' : 'none',
                        }}>
                            {todo?.task}
                    </Text>
                </View>
                {!todo.completed && 
                    (<TouchableOpacity 
                        // onPress={ () =>{
                        //     completedTodo(todo.id)
                        // }}
                        >
                        <View style = {styles.actionsIcon} >
                            <MaterialIcons name="done" size={20} color='#062463b7'></MaterialIcons>
                        </View>
                    </TouchableOpacity>
                    )}
                <TouchableOpacity 
                   
                    // onPress = {() =>{
                    //     deleteTodo(todo?.id)
                    // }}
                >
                    <MaterialIcons style = {styles.actionsIcon} name="delete" size={20} color='#ae062267'></MaterialIcons>
                </TouchableOpacity>
            </View>
    );
    };


    const addNewTodo = ()=>{
        if (textInput == '') {
            Alert.alert('Error!' , 'Please Input Task');
        } else {
            const newTodoTask = {
                id : Math.random(),
                task : textInput,
                completed : false
            };
            setTodos([...todos ,  newTodoTask]);
            setTextInput('');
        }
    };

    const completedTodo = (todoId) =>{
        const newTodo = todos.map((item) =>{
            if (item.id == todoId) {
                return {...item , completed: true}
            }
            return item;
        });
        setTodos(newTodo);
    };

    const deleteTodo = (todoId) =>{
        const newTodo = todos.filter(item =>  item.id !== todoId );
        setTodos(newTodo);
    };

    const clearAllTasks = ()=>{
        Alert.alert('Confirm' , 'Are You Sure to Clear Todos?' , 
        [{
            text: 'Yes',
            onPress : ()=> setTodos([]),
        },
        {
            text : 'No'
        }
        ])
        setTodos ([]);
    }
  return (
   
        <ImageBackground source={image} resizeMode='cover' style={styles.image}>
             <View style={styles.container}>
                <Text 
                    style = {{fontSize : 22 , fontWeight : 'bold'}}> 
                    TODO APP 
                </Text>
                <MaterialIcons name="delete" size={30} color='#86061bcd' onPress={clearAllTasks}/>
            </View>
            <FlatList 
                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {{padding : 20 , paddingBottom : 100 ,}}
                data={todos} 
                renderItem = {({item}) => {
                    <ListItem todo = {item}/>
                }}>
            </FlatList>
            <View style={styles.footer}>
                <View style = {styles.inputContainer}>
                    <TextInput 
                        placeholder="Add Todo" 
                        value={textInput}
                        onChangeText={(text)=>{
                            setTextInput(text)
                        }}
                        />
                </View>
                <TouchableOpacity onPress={addNewTodo}>
                    <View style={[styles.iconContainer]}>
                         <MaterialIcons name="add" size={30} color='#fff'/>
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
  )
}



const styles = StyleSheet.create({
  container: {
    // flex: 1 ,
    justifyContent : 'space-between',
    flexDirection : 'row',
    padding: 10,
    // backgroundColor : '#062463b7' ,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  footer:{
    position : 'absolute',
    bottom : 0,
    color: '#fff',
    width: '100%',
    flexDirection:'row',
    alignItems: 'center',
    paddingHorizontal:20,
  },
  inputContainer:{
    backgroundColor : '#fff',
    color:'#333',
    elevation : 40,
    shadowColor: '#333',
    flex: 1,
    height:50,
    marginVertical: 20,
    marginRight : 20,
    borderRadius : 30,
    paddingHorizontal : 20,
  },
  iconContainer :{
    height: 50,
    width : 50,
    backgroundColor : '#c138bca2',
    borderRadius : 25,
    elevation : 20,
    justifyContent : 'center',
    alignItems : 'center'
  },
  listItem:{
    padding : 20,
    backgroundColor : '#f18eee67',
    flexDirection : 'row',
    elevation : 40,
    borderRadius : 10,
    marginVertical : 10
  },
  actionsIcon : {
    height : 25,
    width : 25,
    backgroundColor: '#d533d067',
    justifyContent : 'center',
    alignItems : 'center',
    marginLeft : 5,
    borederRadius : 5
  }
});