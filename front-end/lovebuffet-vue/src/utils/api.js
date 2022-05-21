export const fetcher = (...args) => fetch(...args).then((res) => res.json());

const devBackend = 'http://localhost:8080/';
const herokuBackend = 'https://love-buffet.herokuapp.com/';

export const getFoodApiKey = async () => {
    const data = await fetcher(`${herokuBackend}api/foodApi`);
    return data ? data.key : "err";
}

