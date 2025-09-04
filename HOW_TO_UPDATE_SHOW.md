# 🎵 How to Update Current Show Information

## Quick Update Guide

To update your current show information, simply edit the file: `src/config/currentShow.js`

### 📝 What You Can Update:

1. **Show/Hide Banner**: Set `isActive: true` to show, `false` to hide
2. **Show Title**: Update the `title` field
3. **Date & Time**: Change `date` and `time`
4. **Venue & Location**: Update `venue` and `location`
5. **Booking Link**: Change `link` and `linkText`
6. **Show Type**: Set to "live", "streaming", or "recording"
7. **Collaborating Artists**: Add/remove artists in the `collaborators` array

### 🔧 Example Updates:

**To show a live performance:**
```javascript
export const currentShow = {
  isActive: true,
  title: "Live at Jazz Club Paris",
  date: "January 15, 2025",
  time: "8:00 PM",
  venue: "Blue Note Paris",
  location: "Paris, France",
  link: "https://bluenoteparis.com/events/aniefiok-asuquo",
  linkText: "Book Tickets",
  type: "live",
  description: "An intimate evening of jazz and contemporary music",
  collaborators: [
    {
      name: "Sarah Johnson",
      role: "Vocalist",
      social: "@sarahjazz"
    },
    {
      name: "Marcus Williams", 
      role: "Saxophonist",
      social: "@marcuswilliams"
    }
  ]
};
```

**To hide the banner:**
```javascript
export const currentShow = {
  isActive: false,
  // ... other fields don't matter when hidden
};
```

### ⚡ Steps to Update:

1. Open the file: `src/config/currentShow.js`
2. Edit the information you want to change
3. Save the file
4. The changes will appear on your website immediately!

### 🎨 Banner Features:

- **Automatic hiding** when `isActive: false`
- **Live indicator** with pulsing red dot
- **Responsive design** works on all devices
- **Beautiful animations** and gradient styling
- **Direct booking links** for easy ticket sales

### 👥 Adding Collaborators:

**To add collaborating artists:**
```javascript
collaborators: [
  {
    name: "Artist Name",
    role: "Vocalist", // or Saxophonist, Drummer, Guitarist, etc.
    social: "@artist_handle" // optional social media handle
  }
]
```

**To remove collaborators:**
```javascript
collaborators: [] // Empty array hides the collaborators section
```

### 💡 Tips:

- Keep titles concise but descriptive
- Use clear, action-oriented link text like "Book Tickets" or "Watch Live"
- Update the banner regularly to keep it fresh
- Hide it when you don't have any upcoming shows
- Collaborators appear with their initials in colored circles
- Include their role to help audience understand their contribution

---

**Need help?** Contact your developer for assistance with updates.
