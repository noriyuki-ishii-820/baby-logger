import React, { useState, useEffect } from 'react'

function DisplayImage() {
    const [number, setNumber] = useState("");
    const images = [
        {
            url: require("../../assets/app-images/app-image1.jpeg"),
        },
        {
            url: require("../../assets/app-images/app-image2.jpeg"),
        },
        {
            url: require("../../assets/app-images/app-image3.jpeg"),
        },
        {
            url: require("../../assets/app-images/app-image4.jpeg"),
        },
        {
            url: require("../../assets/app-images/app-image5.jpeg"),
        },
    ]

    //generate the random number 
    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * images.length);
        setNumber(randomNumber)
    },[])

    //generate the image number for the img src 
    var imageUrl = images[`${number}`]

    return (
        <div>
             <img src={imageUrl && imageUrl.url} alt="" />  
        </div>
    )
}

export default DisplayImage
