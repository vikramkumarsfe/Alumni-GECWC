import { message } from "antd"
import { isAxiosError } from "axios"

const clientCatchError = (err : unknown) =>{
    if( isAxiosError(err) )
    {
        return message.error(err.response?.data.message)
    }

    if(err instanceof Error)
    {
        return message.error(err.message)
    }

    message.error("Unknown Error Occured")
}

export default clientCatchError