import {useEffect,useState} from 'react'
const API_GIPHY_KEY='3dgVhuGnB66eroKabHPZsf8da3L5YmMk';

const useFetch =({keyword})=>{
   const [gifUrl,setGifUrl]=useState("");
   //to fetch gifs
   const fetchGifs = async () =>{
       try{
           const response=await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_GIPHY_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
           const {data}=await response.json();
           setGifUrl(data[0]?.images?.downsized_medium.url);

       }
       catch(error){
           setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
       }

   }
   //end function
   useEffect(()=>{
    if (keyword) fetchGifs();
   },[keyword])

   return gifUrl;
}
export default useFetch;