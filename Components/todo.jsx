import { Alert, ImageBackground, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import Task from "./task";
import { StatusBar } from "expo-status-bar";

const image = require('./../assets/pic1.jpg');
export default function Todo() {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    if (task == '') {
        Alert.alert('Error!' , 'Please Input Task');
    } else {
        Keyboard.dismiss();
        Alert.alert('Task Added ^o^~');
        setTaskItems([...taskItems, task])
        setTask(['']);
    }
  }

  const deleteTask = (deleteIndex) => {
    setTaskItems(taskItems.filter((val, id) => id != deleteIndex));
  };


  const clearAllTasks = ()=>{
    Alert.alert('Confirm' , 'Are You Sure to Clear Todos?' , 
    [{
        text: 'Yes',
        onPress : ()=> setTaskItems([]),
    },
    {
        text : 'No'
    }
    ])
    setTask ([]);
    }

  return (
    <View style={styles.container}>
        <ImageBackground source={image} resizeMode='cover' style={styles.image}>
            <ScrollView>
                {/* Today's Tasks */}
                <View style={styles.tasksWrapper}>
                    {/**Title & Icon */}
                    <View style={{
                        justifyContent : 'space-between',
                        flexDirection : 'row',
                        paddingTop:10,
                    }}>
                            <Text style={styles.sectionTitle}>Today's tasks</Text>
                            <MaterialIcons 
                                name="delete" 
                                size={25} 
                                color='#fff' 
                                onPress={clearAllTasks}
                                style={{
                                    backgroundColor:'#c138bca2',
                                    padding:10,
                                    borderRadius:25,
                                    elevation:40
                                    }}/>
                    </View>

                    {/**Title & Icon */}

                    <View style={styles.items}>
                    {/* This is where the tasks will go! */}
                    {
                        taskItems.map((item, index) => {
                        return (
                            <View key={index}>
                            <Task 
                                index={index + 1}
                                text={item} 
                                deleteTask={() =>deleteTask(index)}
                            /> 
                            </View>
                        )
                        })
                    }
                    </View>
                </View>
            </ScrollView>

      {/* Write a task */}
      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TextInput style={styles.inputContainer} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={[styles.iconContainer]}>
                <MaterialIcons name="add" size={30} color='#fff'/>
            </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent : 'space-between',
    // padding: 10,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  tasksWrapper: {
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  iconContainer :{
    height: 50,
    width : 50,
    backgroundColor : '#c138bca2',
    borderRadius : 25,
    elevation :40,
    margin:5,
    justifyContent : 'center',
    alignItems : 'center'
  },
  inputContainer:{
    backgroundColor : '#fff',
    color:'#333',
    elevation : 40,
    shadowColor: '#333',
    flex: 1,
    height:50,
    margin:5,
    marginVertical: 10,
    marginRight : 10,
    borderRadius : 30,
    paddingHorizontal : 20,
  },
//   input: {
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//     backgroundColor: '#FFF',
//     borderRadius: 60,
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//     width: 250,
//   },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
//     const [textInput , setTextInput] = useState([]);
//     const [todos , setTodos] = useState([
//         {id :1 , task : 'First Task' , completed : true},
//         {id :2 , task : 'Second Task' , completed : false},
//     ]);

//     const addNewTodo = ()=>{
//         if (textInput == '') {
//             Alert.alert('Error!' , 'Please Input Task');
//         } else {
//             const newTodoTask = {
//                 id : Math.random(),
//                 task : textInput,
//                 completed : false
//             };
//             setTodos([...todos ,  newTodoTask]);
//             setTextInput('');
//         }
//     };

//     const clearAllTasks = ()=>{
//         Alert.alert('Confirm' , 'Are You Sure to Clear Todos?' , 
//         [{
//             text: 'Yes',
//             onPress : ()=> setTodos([]),
//         },
//         {
//             text : 'No'
//         }
//         ])
//         setTodos ([]);
//     }

//   return (
//         <ImageBackground source={image} resizeMode='cover' style={styles.image}>
//             {/* Start Title & Icon */}

//              <View style={styles.container}>
//                 <StatusBar style="auto"/>
//                 <View style={styles.tasks}>
//                     <Text style={styles.title}> 
//                         Today's Tasks
//                     </Text>
//                     <TouchableOpacity>
//                         <View style={[styles.iconContainer]}>
//                             <MaterialIcons name="delete" size={20} color='#86061bcd' onPress={clearAllTasks}/>
//                         </View>
//                     </TouchableOpacity>
//                 </View>

//              {/* End Title & Icon */}

//             {/* Start Tasks */}

//             <View style={styles.items}>
//                 <Task text={'Task 1'}></Task>
//                 <Task text={'Task 2'}></Task>
//             </View>
//             {/* End Tasks */}
//             </View>

//             {/* Start Input Text */}

//             <View style={styles.footer}>
//                 <View style = {styles.inputContainer}>
//                     <TextInput 
//                         placeholder="Add Todo" 
//                     />
//                 </View>
//                 <TouchableOpacity onPress={addNewTodo} >
//                     <View style={[styles.iconContainer, {marginBottom:7}]}>
//                          <MaterialIcons name="add" size={20} color='#fff'/>
//                     </View>
//                 </TouchableOpacity>
//             </View>

//             {/* End Input Text */}

//         </ImageBackground>
//   )
// }



// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     justifyContent : 'space-between',
//     padding: 10,
//   },
//   image: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   tasks:{
//     paddingHorizontal:10,
//     justifyContent : 'space-between',
//     flexDirection : 'row',
//   },
//   title:{
//     fontSize:24,
//     fontWeight:'bold'
//   },
//   items:{
//     marginTop : 30,
//   },
//   iconContainer :{
//     height: 45,
//     width : 45,
//     backgroundColor : '#c138bca2',
//     borderRadius : 25,
//     elevation : 20,
//     justifyContent : 'center',
//     alignItems : 'center'
//     },
// //   footer:{
// //     position : 'absolute',
// //     bottom : 0,
// //     color: '#fff',
// //     width: '100%',
// //     flexDirection:'row',
// //     alignItems: 'center',
// //     paddingHorizontal:20,
// //   },
// //   inputContainer:{
// //     backgroundColor : '#fff',
// //     color:'#333',
// //     elevation : 40,
// //     shadowColor: '#333',
// //     flex: 1,
// //     height:50,
// //     marginVertical: 20,
// //     marginRight : 20,
// //     borderRadius : 30,
// //     paddingHorizontal : 20,
// //     justifyContent : 'center',
// //     alignItems : 'center'
// //   },
// //   listItem:{
// //     padding : 20,
// //     backgroundColor : '#f18eee67',
// //     flexDirection : 'row',
// //     elevation : 40,
// //     borderRadius : 10,
// //     marginVertical : 10
// //   },
// //   actionsIcon : {
// //     height : 25,
// //     width : 25,
// //     backgroundColor: '#d533d067',
// //     justifyContent : 'center',
// //     alignItems : 'center',
// //     marginLeft : 5,
// //     borederRadius : 5
// //   }
// });