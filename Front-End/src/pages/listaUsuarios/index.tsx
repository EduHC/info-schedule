import React, { useState } from "react";
import { View, Text, Pressable, Alert, Modal, Image, StatusBar, FlatList, TouchableOpacity } from "react-native";
import api from "../../services/api";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
 

interface Help {
    props: any;
    navigation: any;
    item: any;
    Item: () => void;
}

//   console.log(users);

  export default function ListaUsuario(props: Help) {
    const [users, setUsers] = React.useState([]);
    const [empresa, setEmpresa] = React.useState([]);
    const [modalVisible, setModalVisible] = useState(false);


    React.useEffect(() => {
        api.get('/users') .then(function (response) {
            // handle success
            // console.log(response);
            setUsers(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }, []);

    React.useEffect(() => {
        api.get('/owners/1') .then(function (response) {
            // handle success
            // console.log(response.data);
            setEmpresa(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }, []);



    const [nome, setNome] = React.useState();
    const [id, setid] = React.useState();
    const [data, setdata] = React.useState();

    const Item = ({item}) => (
        <View style={styles.item}>
            <Text style={styles.descricao}>Nome Colaborador: {item.name}</Text>
            <Text style={styles.descricao}>Empresa: {empresa.company_name}</Text>
             <TouchableOpacity 
                onPress={() => {
                    setModalVisible(true);
                    setNome(item.name)
                    setid(item.id_user);
                    setdata(item.created_at);
                }}
             style={styles.containerImagem}>
                <Image
                style={styles.imagem}
                source={require("../../../assets/images/user.png")}
                />
            </TouchableOpacity>
        </View>
    )
      return(
        <SafeAreaView style={styles.container}>
            <StatusBar/>
           
            <Text style={styles.title}>Lista de Coloboradores ativos</Text>
            <FlatList
                data={users}
                renderItem={ ({item}) => <Item item={item} /> }
                keyExtractor={ item => item.id_user.toString() }
            />

<View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Mais Informações
                </Text>
                <Text style={styles.modalText}>
                  Id: {id}
                </Text>
                <Text style={styles.modalText}>
                  Nome: {nome}
                </Text>
                <Text style={styles.modalText}>
                  Data de Entrada: {data}
                </Text>
                <Text style={styles.modalText}>
                  Empresa: {empresa.company_name}
                </Text>
                <Text style={styles.modalText}>
                  CNPJ: {empresa.CNPJ}
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Fechar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        </SafeAreaView>
      );
  }