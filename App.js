import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default function App() {
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');


    const carregarTarefa = async () => {
        try {
            const requisicao = await axios.get(`${API_URL}/tarefas`);
            setTarefas(requisicao.data);
        } catch (error) {
            console.log('Erro ao carregar as tarefas:', error);
        }
    }

    useEffect(() => {
        carregarTarefa();
    }, []);

    const renderItem = ({ item }) => (
        <View style={estilos.ItemTarefa}>
            <Text style={estilos.textoLista}>{item.descricao}</Text>
        </View>
    );
    return (
        <>
            <Text style={estilos.titulo}> Minhas Tarefas</Text>
            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={estilos.listaTarefa}
            />
        </>
    )
}

const estilos = StyleSheet.create({
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1A1A1A'
    },
    listaTarefa: {
        paddingBottom: 100
    },

    ItemTarefa: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 10,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2
    },
    textoLista: {
        fontSize: 16,
        color: '#333'
    }
})