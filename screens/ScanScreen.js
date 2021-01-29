import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,Image} from 'react-native';

import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export  default class ScanScreen extends React.Component{

    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }

getCameraPermissions = async ()=>{

    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
        hasCameraPermissions: status=== "granted",
        buttonState:'clicked',
         scanned: false,
    });
}

    handleBarCodeScanned= async({type,data})=>{

        this.setState({
            scanned: true,
            scannedData:data,
            buttonState:'normal'
        })
    }


render(){

    const hasCameraPermissions =this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState= this.state.buttonState;


    if(hasCameraPermissions && buttonState==="clicked"){
        return(   
        <BarCodeScanner 
        onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
 style={StyleSheet.absoluteFillObject}
        />
        )
    }

    else if(buttonState==="normal"){
        return(    
            <View>
                <Image
                   style={{
                             alignSelf:'center',
                             width:300,
                             height:300,
                           }} 
    source={{
             uri:'https://cdn4.iconfinder.com/data/icons/barcode-filled-color/300/184340116Untitled-3-512.png'
           }}
          />

                <Text style={{fontSize:16,alignSelf:'center' , marginTop:100}}> BarCodeScanner app "S-BarCodeScanner"  click on scan button to get started!</Text>
             <Text style={{alignSelf:'center' ,fontSize:12, marginTop:10}}>
                 {hasCameraPermissions?this.state.scannedData:"Request for camera access"} </Text>
                 
             <TouchableOpacity onPress={this.getCameraPermissions}>
             <Text style={styles.scanButton}>      Scan A Bar CODE</Text>
             </TouchableOpacity>

             <Text style={{alignSelf:'center' ,fontSize:12, marginTop:30}}>{hasCameraPermissions?this.state.scannedData:"result you can see here also "}</Text>
            </View>
         
             )
    }
    
}

}


const styles=StyleSheet.create({

    scanButton:{
    backgroundColor:'black',
    color:'white',
    width:260,
    alignSelf:'center' ,
    borderRadius:20, 
    marginTop:10,
    height:40,
    fontSize:24,
    },
   /* scanButtonText:{
        backgroundColor:'blue',
        color:'black',
        width:360,  
        },*/
    
})