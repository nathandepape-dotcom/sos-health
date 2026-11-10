import './style.css'

// SOS Health – your TypeScript code goes here (step 4 and next)

const sosButton = document.querySelector("#sosButton") as HTMLButtonElement;
const paragraphe = document.querySelector("#status") as HTMLParagraphElement
const addressText = document.querySelector("#address") as HTMLParagraphElement;
const locationCard = document.querySelector("#locationCard") as HTMLElement;
interface AdressResponse {
    display_name:string
}

async function getAddress(latitude: number, longitude: number): Promise<string> {
    const URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
    const waitingURL = await fetch(URL)
    const data: AdressResponse = await waitingURL.json();
    return data.display_name
}









sosButton.addEventListener('click', ()=>{
    paragraphe.textContent  = "Getting your location..."
    navigator.geolocation.getCurrentPosition(async position=>{     
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const messagePostion = `Location found ${latitude},${longitude}`;
        paragraphe.textContent = messagePostion;
        locationCard.classList.remove("hidden");
        try {
            const address = await getAddress(latitude, longitude);
            addressText.textContent = address

        } catch(error){
            addressText.textContent = "Address unavailable"
        }
        

        
    },
    
    error =>{
        paragraphe.textContent = "Error couldn't find your position !"
        console.log(error.message);
    },
    { timeout: 10000 }
);     
})

