import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
export default function Task(props) {
    const [doneTask, setDoneTask] = useState(false);
    const taskDone = () => {
        setDoneTask(true);
  };
  return (
    <View style={styles.item}>
        <View style={styles.itemLeft}>
            <View style={styles.square}></View>
            <Text style={styles.itemText && doneTask && styles.doneTask}>{props.text}</Text>
        </View>
        <View style={styles.icons}>
            <TouchableOpacity onPress={taskDone}>
                <MaterialIcons name="check-circle" size={25} color='#fff' style={styles.icon}/>
            </TouchableOpacity>

            <TouchableOpacity  onPress={props.deleteTask}>
                 <MaterialIcons name="delete" size={25} color='#333' style={styles.icon}/>
            </TouchableOpacity>
        </View>
  </View>
)
}

const styles = StyleSheet.create({
item: {
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 50,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
  elevation:10,
},
itemLeft: {
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap'
},
square: {
  width: 20,
  height: 20,
  backgroundColor: '#c138bca2',
  borderRadius: 25,
  marginRight: 15,
},
itemText: {
  maxWidth: '90%',
},
circular: {
  width: 12,
  height: 12,
  borderColor: '#55BCF6',
  borderWidth: 2,
  borderRadius: 5,
},
icons:{
    flex:1,
    flexDirection:'row',
    margin:5,
    justifyContent:'flex-end'
},
icon:{
    backgroundColor:'pink',
    borderRadius:25,
    padding:5,
    margin:5,
},
doneTask:{
    color:'purple',
    fontSize:20,
    fontWeight:'bold'
}
});

//     <View style={styles.item}>
//         <View style={styles.leftItem}>
//             <View style={styles.leftIcon}/>
//             <Text style={styles.textItem}>{props.text}</Text>
//         </View>
//         <View style={styles.icons}></View>
//         <View style={styles.icons}></View>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//     item:{
//         padding : 20,
//         backgroundColor : '#f18eee67',
//         elevation : 40,
//         borderRadius : 10,
//         marginBottom : 20,
//         flexDirection : 'row',
//         alignItems : 'center',
//         justifyContent : 'space-between'
//       },
//       leftItem:{
//         flexDirection:'row',
//         alignItems : 'center',
//         flexWrap:'wrap'
//       },
//       leftIcon:{
//         width:24,
//         height:24,
//         backgroundColor:'#d533d067',
//         opacity:0.4,
//         marginRight:15,
//         borderRadius:5,
//       },
//       textItem:{
//         maxWidth: '80%'
//       },
//       icons:{
//         width: 12,
//         height: 12,
//         borderColor : '#d533d067',
//         borderWidth : 2,
//         borderRadius : 5,
//       }
// });