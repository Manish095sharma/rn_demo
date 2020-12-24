import AsyncStorage from '@react-native-async-storage/async-storage';
export const getItem = async (key) => {
    try {
        const retrievedItem = await AsyncStorage.getItem(key);

        return JSON.parse(retrievedItem);
    } catch (e) {
        console.log(e.meesage);
    }
};

export const setItem = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value)).then(
            async (res) => {
                const retrievedItem = await AsyncStorage.getItem(key).then((res) => {
                    return JSON.parse(res);
                });
                return retrievedItem;
            },
        );
    } catch (e) {

        console.log(e.meesage);
    }
};
