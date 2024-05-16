
import { BiLogoAndroid, BiLogoHtml5 } from 'react-icons/bi'
import './card.css'
const post = [
    {title:'web development', duration:'2 hour', icon:<BiLogoHtml5 />},
    {title:'Android development', duration:'2 hour', icon:<BiLogoAndroid />},
    {title:'web development', duration:'2 hour', icon:<BiLogoHtml5 />},
]

const Card = () => {
  return (
    <div className='card--container'>
     {
        post.map((item,index)=>(
            <div className='card' key={index}>
                <div className="card--cover">{item.icon}</div>
                <div className="card--title">
                    <h2>{item.title}</h2>
                </div>
            </div>
        ))
     }
    </div>
  )
}

export default Card


