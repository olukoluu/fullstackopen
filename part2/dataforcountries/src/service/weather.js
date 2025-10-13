import axios from "axios";
const api_key = import.meta.env.VITE_API_KEY;

const getWeather = ( lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const request = axios.get(url);
    return request.then((response) => response.data);
}
export default { getWeather };