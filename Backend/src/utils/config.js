// config.js

export const config = {
    production: {
      notesApi: process.env.NOTES_API,
      reminderApi: process.env.REMINDER_API,
      archieveApi: process.env.ARCHIEVE_API
    },
    development: {
      notesApi: "http://localhost:8080/api/v1/Note",
      reminderApi: "http://localhost:8080/api/v1/Reminder",
      archieveApi: "http://localhost:8080/api/v1/Archieve"
    }
  };

  