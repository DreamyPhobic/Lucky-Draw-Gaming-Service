# Lucky-Draw-Gaming-Service
It allows users to get Lucky Draw Raffle tickets and use one lucky draw raffle ticket to participate in a lucky draw game.

## Architecture
![architecture](/Documentation/architecture.jpg)

# [Lucky-Draw-Backend](Lucky-Draw-Backend)
 A Backend server made with NodeJs for lucky draw gaming service.
 
 ### Base URL: https://lucky-draw-backend.glitch.me/
 
 ----
 ## For Testing purposes:
 
* ### User token:  
  `(valid til June 26, 2024 4:38:42 AM (GMT))`
  
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJuYW1lIjoiVGVzdCB1c2VyIiwiaWF0IjoxNjE5MjczMTIyLCJleHAiOjE3MTkzNzY3MjJ9.EX7GdBF4l8ENndXtOJqI6Vrr4VmRNChDAHZ2ZxHBPZY
 
* ### Admin token:
  `(valid til June 26, 2024 4:38:42 AM (GMT))`

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJuYW1lIjoiQWRtaW4iLCJpYXQiOjE2MTkyNzMxMjIsImV4cCI6MTcxOTM3NjcyMn0.WBCLicO9YUsokHYPy8odGZGcEv0N1r9p6hcOmS61hXo

* ### Testing Credentials:
Field | Value
--- | --- 
_id | 608507630c011a00d1fd9297
name | Sample User
email | test@example.com
password | test

----

## API Requests:

Name | Description 
--- | --- 
[User Signup](Documentation/API%20Calls/UserSignup.md#user-signup) | creates new user and returns the user object
[User Login](Documentation/API%20Calls/UserLogin.md#user-login) | logs in the user and generates a token which is used to authenticate the api requests
[Add Tickets](Documentation/API%20Calls/AddTickets.md#add-tickets) [Admin only]| adds the given number of tickets to the user account
[Create Event](Documentation/API%20Calls/CreateEvent.md#create-event) [Admin only]| creates new event and returns the event object
[Add Participant](Documentation/API%20Calls/AddParticipant.md#add-participant) | adds a new participant in the given event
[Next Events](Documentation/API%20Calls/NextEvents.md#next-events) | gives a list of next(on-going) events
[Previous Events](Documentation/API%20Calls/PreviousEvents.md#previous-events) | gives a list of previous events with winner ids and names
[Compute Winner](Documentation/API%20Calls/ComputeWinner.md#compute-winner) [Admin only]| randomly selects a winner from participants list and saves it for a given event.

----

## Database:
MongoDB Atlas(DaaS) is used for database. It stores all the information about users and events.

* ### [User Schema](/Lucky-Draw-Backend/api/models/user.js):
 ```javascript
 {
    _id: {type: ObjectId},
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    tickets: { type: Number, default: 0 }
} 
 ```
* ### [Event Schema](/Lucky-Draw-Backend/api/models/event.js):
```javascript
{
    _id: {type: ObjectId},
    Reward: { type: String, required: true },
    Time: { type: String, required: true },
    Status: { type: Number, default: 0 },
    Participants: [{ type: ObjectId, ref: 'User' }],
    Winner: { type: ObjectId, ref: 'User' }

}
```

# [Lucky-Draw-Android-App](Lucky-Draw-Android-App)
 A mobile client app for lucky draw gaming service.
 
 ## Screenshots
 <img src="/Documentation/Screenshots/s1.jpeg" width="220"> <img src="/Documentation/Screenshots/s2.jpeg" width="220">   <img src="/Documentation/Screenshots/s3.jpeg" width="220"> <img src="/Documentation/Screenshots/s4.jpeg" width="220">


