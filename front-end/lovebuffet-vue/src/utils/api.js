export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const getFoodApiKey = async () => {
    const data = await fetcher(`http://localhost:8080/api/foodApi`);
    return data ? data.key : "err";
}

