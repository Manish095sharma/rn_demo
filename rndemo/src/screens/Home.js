
import React, { useState, useEffect } from 'react';

import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';

const Pagination = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [isListEnd, setIsListEnd] = useState(false);

    function Paginator(items, page, per_page) {

        var page = page || 1,
            per_page = per_page || 10,
            offset = (page - 1) * per_page,



            paginatedItems = items.slice(offset).slice(0, per_page),
            total_pages = Math.ceil(items.length / per_page);
        return {
            page: page,
            per_page: per_page,
            pre_page: page - 1 ? page - 1 : null,
            next_page: (total_pages > page) ? page + 1 : null,
            total: items.length,
            total_pages: total_pages,
            data: paginatedItems
        };
    }


    useEffect(() => getData(), []);

    const getData = () => {
        if (!loading && !isListEnd) {
            setLoading(true);

            fetch('https://restcountries.eu/rest/v1/all')
                .then((response) => response.json())
                .then((responseJson) => {
                    if (dataSource.length === responseJson.length) {
                        setLoading(false);
                        return
                    }

                    const paginatedData = Paginator(responseJson, offset, 15)
                    setLoading(false)
                    setOffset(paginatedData.next_page)
                    setDataSource([...dataSource, ...paginatedData.data]);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };



    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                {loading ? (
                    <ActivityIndicator color="black" style={{ margin: 15 }} />
                ) : null}
            </View>
        );
    };

    const ItemView = ({ item }) => {
        return (

            <View style={{ width: "100%", height: 50, justifyContent: "center" }}>
                <Text style={styles.itemStyle}>
                    {item.name}
                    {'.'}
                    {item.name.toUpperCase()}
                </Text>
            </View>
        );
    };

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
                ListFooterComponent={renderFooter}
                onEndReached={getData}
                onEndReachedThreshold={0.5}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});

export default Pagination;
