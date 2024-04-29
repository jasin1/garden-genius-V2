import axios from "axios";

const API_KEY = 'sk-nmqA66236192cd6f53490';
const BASE_URL = 'https://perenual.com/api/species-list';

export async function fetchPlants(){
    try{
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}`);
        return response.data.data;
    }catch (error){
        console.log("Error fetching plants", error);
        throw new Error('Het ophalen van planten is mislukt.');
    }
}