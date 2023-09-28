// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();
// const PORT = 3001;
// app.use(bodyParser.json()); // for parsing JSON bodies

// // Items to book rooms
// let bookRooms = [
//     { id: 1, name: "jill", date: '11-2-2023', startTime: "8:00 am", endTime: "12:00 am" },
//     { id: 2, name: "jack", date: '12-2-2023', startTime: "2:00 pm", endTime: "10:00 am" },
// ];

// // Available rooms
// let availableRooms = [
//     {
//         numberOfSeatsAvailable: 30,
//         amenitiesInRoom: ["AC"],
//         pricePerHour: 80
//     }
// ];
// //book room
// app.get('/getbookedRooms', (req, res) => {
//     res.json(bookRooms);
// });

// app.post('/bookRoom', (req, res) => {
//     const newBookRoom = req.body;
//     if (!newBookRoom.id || !newBookRoom.name) {
//         return res.status(500).send("Room must have an id and a customer name");
//     }
//     bookRooms.push(newBookRoom);
//     res.status(201).send(`Room is booked with id: ${newBookRoom.id}`);
// });


// //create room
// app.get('/getAvailableRooms', (req, res) => {
//     res.json(availableRooms);
// });

// app.post('/bookRoom', (req, res) => {
//     const newBookRoom = req.body;
//     if (!newBookRoom.id || !newBookRoom.name) {
//         return res.status(500).send("Room must have an id and a customer name");
//     }
    
//     // Convert the id to a number
//     newBookRoom.id = parseInt(newBookRoom.id);

//     bookRooms.push(newBookRoom);
//     res.status(201).send(`Room is booked with id: ${newBookRoom.id}`);
// });





// // Create a map to store bookings by room ID for efficient lookup
// const bookingsMap = new Map();
// bookRooms.forEach(booking => {
//     bookingsMap.set(booking.id, booking);
// });

// // List all rooms with booking information
// app.get('/listRooms', (req, res) => {
//     const roomsWithBookingInfo = availableRooms.map(room => {
//         const booking = bookingsMap.get(room.id);
//         if (booking) {
//             return {
//                 id: room.id,
//                 roomName: room.amenitiesInRoom.join(', '), // Example: Combine amenities as room name
//                 booked: true,
//                 name: booking.name,
//                 startTime: booking.startTime,
//                 endTime: booking.endTime,
//                 date: booking.date,
//             };
//         } else {
//             return {
//                 id: room.id,
//                 roomName: room.amenitiesInRoom.join(', '), // Example: Combine amenities as room name
//                 booked: false,
//                 name: null,
//                 startTime: null,
//                 endTime: null,
//                 date: null,
//             };
//         }
//     });

//     res.json(roomsWithBookingInfo);
// });

// // ...

// app.listen(PORT, () => {
//     console.log("Server is running on port", PORT);
// });

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;
app.use(bodyParser.json()); // for parsing JSON bodies

// Items to book rooms
let bookRooms = [
    { id: 1, name: "jill", date: '11-2-2023', startTime: "8:00 am", endTime: "12:00 am" },
    { id: 2, name: "jack", date: '12-2-2023', startTime: "2:00 pm", endTime: "10:00 am" },
];

// Available rooms
let availableRooms = [
    {
        numberOfSeatsAvailable: 30,
        amenitiesInRoom: ["AC"],
        pricePerHour: 80
    }
];

// Create a map to store bookings by room ID for efficient lookup
const bookingsMap = new Map();
bookRooms.forEach(booking => {
    bookingsMap.set(booking.id, booking);
});

// List all rooms with booking information
app.get('/listRooms', (req, res) => {
    const roomsWithBookingInfo = availableRooms.map(room => {
        const booking = bookingsMap.get(room.id);
        if (booking) {
            return {
                id: room.id,
                roomName: room.amenitiesInRoom.join(', '), // Example: Combine amenities as room name
                booked: true,
                name: booking.name,
                startTime: booking.startTime,
                endTime: booking.endTime,
                date: booking.date,
            };
        } else {
            return {
                id: room.id,
                roomName: room.amenitiesInRoom.join(', '), // Example: Combine amenities as room name
                booked: false,
                name: null,
                startTime: null,
                endTime: null,
                date: null,
            };
        }
    });

    res.json(roomsWithBookingInfo);
});

// Book a room
app.post('/bookRoom', (req, res) => {
    const newBookRoom = req.body;
    if (!newBookRoom.id || !newBookRoom.name) {
        return res.status(400).send("Room must have an id and a customer name");
    }

    // Convert the id to a number
    newBookRoom.id = parseInt(newBookRoom.id);

    // Check if the room is already booked
    if (bookingsMap.has(newBookRoom.id)) {
        return res.status(400).send("Room with this ID is already booked");
    }

    bookRooms.push(newBookRoom);
    bookingsMap.set(newBookRoom.id, newBookRoom);
    res.status(201).send(`Room is booked with id: ${newBookRoom.id}`);
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});

