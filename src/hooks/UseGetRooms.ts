import { useEffect, useState } from "react"

const UseGetRooms = () => {
    const [loading,setLoading] = useState(false);
    const [rooms,setRooms] = useState([])

    useEffect(()=>{
        const getRooms = async () => {
            setLoading(true)
            try {
                // const res = await 
                // const data = await res.json()
                // if9
            } catch (error) {
                
            }
        }
    })
}

export default UseGetRooms
