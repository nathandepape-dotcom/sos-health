import './style.css'

// SOS Health – your TypeScript code goes here (step 4 and next)

const sosButton = document.querySelector("#sosButton") as HTMLButtonElement;
const paragraphe = document.querySelector("#status") as HTMLParagraphElement
const addressText = document.querySelector("#address") as HTMLParagraphElement;
const locationCard = document.querySelector("#locationCard") as HTMLElement;

// Medical profile form
const profileForm = document.querySelector("#profileForm") as HTMLFormElement;
const fullNameInput = document.querySelector("#fullName") as HTMLInputElement;
const bloodTypeSelect = document.querySelector("#bloodType") as HTMLSelectElement;
const allergiesInput = document.querySelector("#allergies") as HTMLInputElement;
const medicationsInput = document.querySelector("#medications") as HTMLInputElement;
const contactNameInput = document.querySelector("#contactName") as HTMLInputElement;
const contactPhoneInput = document.querySelector("#contactPhone") as HTMLInputElement;
const deleteProfileButton = document.querySelector("#deleteProfile") as HTMLButtonElement;
const profileStatus = document.querySelector("#profileStatus") as HTMLParagraphElement;

interface AdressResponse {
    display_name:string
}

interface MedicalProfile {
    fullName: string;
    bloodType: string;
    allergies: string;
    medications: string;
    contactName: string;
    contactPhone: string;
}

async function getAddress(latitude: number, longitude: number): Promise<string> {
    const URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
    const waitingURL = await fetch(URL)
    const data: AdressResponse = await waitingURL.json();
    return data.display_name
}

// ---------- SOS button ----------
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

// ---------- Medical profile ----------
// Save the profile when the form is submitted
profileForm.addEventListener("submit", (event) => {
    event.preventDefault(); // stop the page from reloading

    const profile: MedicalProfile = {
        fullName: fullNameInput.value,
        bloodType: bloodTypeSelect.value,
        allergies: allergiesInput.value,
        medications: medicationsInput.value,
        contactName: contactNameInput.value,
        contactPhone: contactPhoneInput.value,
    };

    // LocalStorage only stores text -> convert the object to a JSON string
    localStorage.setItem("medicalProfile", JSON.stringify(profile));
    profileStatus.textContent = "Profile saved ✅";
});

// Step 4 (your logic): load the saved profile when the page opens

