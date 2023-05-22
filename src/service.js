import axios from "axios"


export const getOrdersData = async () => {
    const data = await axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders`);
    return data.data;
}

export const getProductsData = async () => {
    const data = await axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products`);
    return data.data;
}

export const getUsersData = async () => {
    const data = await axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users`);
    return data.data;
}

export const getSearchedUsers = async (searchString) =>{
    const data = await axios.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchString}`);
    return data.data;
}
