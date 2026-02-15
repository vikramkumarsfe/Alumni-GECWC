import axios, { isAxiosError } from "axios"

export const fetcher = async (url : string) =>{
    try {
        const {data} = await axios.get(url)
        return data
    }
    catch(err)
    {
        if(isAxiosError(err))
        {
            throw new Error(err.response?.data.message)
        }

        if(err instanceof Error)
        {
            throw new Error(err.message)
        }
    }
}