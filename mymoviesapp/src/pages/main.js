import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';


export default class Main extends Component {

    static navigationOptions = {
        title: "My movies"
    };

    state = {
        data: []
    }

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await api.get('/movies')
        const { data } = response;
        console.log(data);
        this.setState({ data })
    }

    renderItem = ({ item }) => (
        <View style={styles.movieContainer}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text style={styles.moviePlot}>{item.plot}</Text>
            <TouchableOpacity style={styles.movieButton} onPress={() => {
                this.props.navigation.navigate('Movie', {movie: item})
            }}>
                <Text style={styles.movieButtonText}>
                    Excluir
                </Text>
            </TouchableOpacity>

        </View>
    )


    render() {
        return (
            <View style={styles.container}>
                <FlatList keyExtractor={item => item._id}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    contentContainerStyle={styles.list} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
    },
    list: {
        padding: 20,
    },
    movieContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    movieTitle: {
        fontSize:18,
        fontWeight: 'bold',
        color: '#333'
    },
    moviePlot:{
        fontSize: 16,
        marginTop: 5,
        lineHeight: 24,
    },

    movieButton: {
        height: 42,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#E8B708',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    movieButtonText:{
        fontSize: 16,
        color: '#E8B708',
        fontWeight: 'bold',
    }
})