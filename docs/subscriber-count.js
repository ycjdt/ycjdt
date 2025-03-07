// Subscriber count management
// This is a simple implementation that stores the count in localStorage
// In a production environment, you would replace this with a real database count

// Function to get the current subscriber count
function getSubscriberCount() {
    // Check if count exists in localStorage
    let count = localStorage.getItem('subscriberCount');
    
    // If no count exists, set a default value
    // Replace this with your actual initial count if known
    if (!count) {
        count = 1; // Default starting count - replace with your actual number
        localStorage.setItem('subscriberCount', count);
    }
    
    return parseInt(count);
}

// Function to increment the subscriber count
function incrementSubscriberCount() {
    let count = getSubscriberCount();
    count++;
    localStorage.setItem('subscriberCount', count);
    return count;
}

// Function to update the popup subtitle text
function updateSubscribeButtonText() {
    const count = getSubscriberCount();
    const popupSubtitle = document.querySelector('.popup-subtitle');
    if (popupSubtitle) {
        popupSubtitle.textContent = `Join ${count} others in just doing things`;
    }
} 