# Jarvis Assistant

import pyttsx3
import datetime
import speech_recognition as sr
import webbrowser
import os
import random

# Initialize text-to-speech engine
engine = pyttsx3.init()

# Set voice rate (optional)
engine.setProperty("rate", 150)

# Function to speak text
def speak(text):
    engine.say(text)
    engine.runAndWait()

# Function to greet the user
def greet():
    hour = datetime.datetime.now().hour
    if 0 <= hour < 12:
        speak("Good morning!")
    elif 12 <= hour < 18:
        speak("Good afternoon!")
    else:
        speak("Good evening!")

# Function to take user's command
def take_command():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1
        audio = r.listen(source)

    try:
        print("Recognizing...")
        query = r.recognize_google(audio, language="en-in")
        print(f"User said: {query}")
    except Exception as e:
        print("Sorry, I didn't catch that. Please say that again.")
        return "None"
    return query.lower()

# Function to execute Jarvis commands
def run_jarvis():
    greet()
    while True:
        query = take_command().lower()

        if "wikipedia" in query:
            speak("Searching Wikipedia...")
            query = query.replace("wikipedia", "")
            results = wikipedia.summary(query, sentences=2)  # Requires 'wikipedia' module
            speak("According to Wikipedia:")
            speak(results)

        elif "open youtube" in query:
            webbrowser.open("https://www.youtube.com")

        elif "open google" in query:
            webbrowser.open("https://www.google.com")

        elif "play music" in query:
            music_dir = "path/to/your/music/folder"  # Specify your music folder path
            songs = os.listdir(music_dir)
            random.shuffle(songs)
            os.startfile(os.path.join(music_dir, songs[0]))

        elif "the time" in query:
            current_time = datetime.datetime.now().strftime("%H:%M:%S")
            speak(f"The current time is {current_time}")

        elif "exit" in query:
            speak("Goodbye!")
            break

        else:
            speak("I'm sorry, I don't understand that command.")

if __name__ == "__main__":
    run_jarvis()
