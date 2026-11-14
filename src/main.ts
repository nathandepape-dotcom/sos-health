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

// Alert buttons (SMS + call contact + call 101)
const alertActions = document.querySelector("#alertActions") as HTMLElement;
const smsButton = document.querySelector("#smsButton") as HTMLAnchorElement;
const callContactButton = document.querySelector("#callContactButton") as HTMLAnchorElement;
const callButton = document.querySelector("#callButton") as HTMLAnchorElement;

// Emergency medical sheet
const emergencySheet = document.querySelector("#emergencySheet") as HTMLElement;
const sheetName = document.querySelector("#sheetName") as HTMLElement;
const sheetBlood = document.querySelector("#sheetBlood") as HTMLElement;
const sheetAllergies = document.querySelector("#sheetAllergies") as HTMLElement;
const sheetMedications = document.querySelector("#sheetMedications") as HTMLElement;
const sheetContact = document.querySelector("#sheetContact") as HTMLElement;
const sheetLocation = document.querySelector("#sheetLocation") as HTMLElement;
const closeSheetButton = document.querySelector("#closeSheet") as HTMLButtonElement;

// Last known location, used by the SMS and the emergency sheet
let lastLocation: { latitude: number; longitude: number; address: string } | null = null;

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

// Read the saved profile from LocalStorage (null if nothing is saved)
function getSavedProfile(): MedicalProfile | null {
    const savedProfile = localStorage.getItem("medicalProfile");
    if (savedProfile === null) {
        return null;
    }
    return JSON.parse(savedProfile);
}

// Google Maps link of a position
function getMapsLink(latitude: number, longitude: number): string {
    return `https://www.google.com/maps?q=${latitude},${longitude}`;
}

// Prepare the SMS and the "call my contact" buttons with the profile and the location
function prepareAlert(latitude: number, longitude: number, address: string): void {
    const profile = getSavedProfile();

    if (profile === null || profile.contactPhone === "") {
        alertActions.classList.add("hidden");
        paragraphe.textContent = "Location found. Save your medical profile with an emergency contact to send an alert.";
        return;
    }

    const message =
        `EMERGENCY - ${profile.fullName || "I"} need(s) help!\n` +
        `Location: ${address}\n` +
        `Map: ${getMapsLink(latitude, longitude)}\n` +
        `Blood type: ${profile.bloodType || "unknown"}\n` +
        `Allergies: ${profile.allergies || "none"}\n` +
        `Medications: ${profile.medications || "none"}`;

    // "?&body=" works on both iPhone and Android
    smsButton.href = `sms:${profile.contactPhone}?&body=${encodeURIComponent(message)}`;
    callContactButton.href = `tel:${profile.contactPhone}`;
    callContactButton.textContent = `📱 Call ${profile.contactName || "my emergency contact"}`;

    alertActions.classList.remove("hidden");
}

// Fill and show the full-screen medical sheet
function showEmergencySheet(): void {
    const profile = getSavedProfile();

    sheetName.textContent = profile?.fullName || "Unknown person";
    sheetBlood.textContent = profile?.bloodType || "Unknown";
    sheetAllergies.textContent = profile?.allergies || "None reported";
    sheetMedications.textContent = profile?.medications || "None reported";
    sheetContact.textContent = profile?.contactPhone
        ? `${profile.contactName} – ${profile.contactPhone}`
        : "None";

    if (lastLocation === null) {
        sheetLocation.textContent = "Unknown – press SOS to get the location";
    } else {
        const link = getMapsLink(lastLocation.latitude, lastLocation.longitude);
        sheetLocation.innerHTML = "";
        const addressLine = document.createElement("div");
        addressLine.textContent = lastLocation.address;
        const mapLink = document.createElement("a");
        mapLink.href = link;
        mapLink.target = "_blank";
        mapLink.textContent = "Open in Google Maps";
        sheetLocation.append(addressLine, mapLink);
    }

    emergencySheet.classList.remove("hidden");
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
        let address = `${latitude}, ${longitude}`;
        try {
            address = await getAddress(latitude, longitude);
            addressText.textContent = address

        } catch(error){
            addressText.textContent = "Address unavailable"
        }

        lastLocation = { latitude, longitude, address };
        prepareAlert(latitude, longitude, address);
        

        
    },
    
    error =>{
        paragraphe.textContent = "Error couldn't find your position !"
        console.log(error.message);
    },
    { timeout: 10000 }
);     
})

// ---------- Medical profile ----------
profileForm.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const profile: MedicalProfile = {
        fullName: fullNameInput.value,
        bloodType: bloodTypeSelect.value,
        allergies: allergiesInput.value,
        medications: medicationsInput.value,
        contactName: contactNameInput.value,
        contactPhone: contactPhoneInput.value,
    };

    localStorage.setItem("medicalProfile", JSON.stringify(profile));
    profileStatus.textContent = "Profile saved ✅";
});

// Load the saved profile when the page opens
function loadProfile() {
    const savedProfile = localStorage.getItem("medicalProfile");

    if (savedProfile === null) {
        return;
    }

    const profile: MedicalProfile = JSON.parse(savedProfile);

  
    fullNameInput.value = profile.fullName;
    bloodTypeSelect.value = profile.bloodType;
    allergiesInput.value = profile.allergies;
    medicationsInput.value = profile.medications;
    contactNameInput.value = profile.contactName;
    contactPhoneInput.value = profile.contactPhone;
}

loadProfile();

// Step 5 (your logic): delete the profile

deleteProfileButton.addEventListener('click',()=>{
    localStorage.removeItem("medicalProfile")
    profileForm.reset()
    profileStatus.textContent = "Deleting your profile"
})

// ---------- Emergency sheet ----------
// When the user calls emergency services, show the medical sheet.
// The call still starts (tel: link); the sheet is waiting when they come back to the app.
callButton.addEventListener("click", () => {
    showEmergencySheet();
});

callContactButton.addEventListener("click", () => {
    showEmergencySheet();
});

closeSheetButton.addEventListener("click", () => {
    emergencySheet.classList.add("hidden");
});
