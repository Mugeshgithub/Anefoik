// Current Show Configuration
// Update this file to change the current show information

export const currentShow = {
  // Set to true to show the banner, false to hide it
  isActive: false,
  
  // Show details
  title: "Live Performance at red Note Paris",
  date: "January 15, 2025",
  time: "8:00 PM",
  venue: "Blue Note Paris",
  location: "Paris, France",
  
  // Streaming/booking link
  link: "https://bluenoteparis.com/events/aniefiok-asuquo",
  linkText: "Book Tickets",
  
  // Show type
  type: "live", // "live", "streaming", "recording"
  
  // Additional info
  description: "An intimate evening of jazz and contemporary music",
  
  // Collaborating artists
  collaborators: [
    {
        "name": "Sarah Johnson",
        "role": "Vocalist",
        "social": "@sarahjazz"
    },
    {
        "name": "Marcus Williams",
        "role": "Saxophonist",
        "social": "@marcuswilliams"
    }
]
};

// Instructions for updating:
// 1. Change isActive to true/false to show/hide banner
// 2. Update title, date, time, venue, location as needed
// 3. Change link and linkText for booking/streaming
// 4. Add/remove collaborators in the collaborators array
// 5. Save the file and the changes will appear on the website

// Collaborators format:
// - name: Artist's full name
// - role: Their role (Vocalist, Saxophonist, Drummer, etc.)
// - social: Their social media handle (optional)
