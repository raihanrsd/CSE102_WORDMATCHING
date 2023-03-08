
# Wordle Game

This is a web-based implementation of the popular Wordle game, built with Django framework. The game challenges players to guess a word of varying length and difficulty, based on feedback provided by the game. The game has a lot of features some of which are light/dark mode, difficulty levels, word number selection, timer and much more.

## Gameplay

The game starts with a random word, which the player must guess within six attempts. The player inputs a word and clicks the "Enter" button(or click their keyboard's enter) to submit their guess. The game then provides feedback in the form of colored squares, indicating which letters are present in the target word and whether they are in the correct position or not.

If the player successfully guesses the word within six attempts, they win the game. Otherwise, they lose and the correct word is revealed.

If you open the game you will get a detailed tutorial on how to play the game as I have added them in the home page which is much more easier to understand. I have also provided an icon svg by clicking which you might find a tutorial while playing the game and your game won't be hindered.


## Distinctiveness and Complexity:
This game albeit is a popular wordle game which is available on the internet. Yet, I have implemented it with my very own logic. I faced significant challenge while implementing most of the game logic through JavaScript. I used input boxes in order to take each word as input from the user. Inputs can also be given using the keyboard keys that I made onscreen. 
> One of the most increadible feats of this game is that I can check if a word is valid of not in a constant time. 
The way I achieved is by storing all the words in a JS map initially when the game is being loaded. Then it allows me to use hashmap and just get the value (which is true if the word is correct) for a key (which is a word). I have also made a system that a user always gets a random word each time. I am basically storing all the words in an array and I am choosing just a random word from that array by generating a random number

- I have taken the easy words from a collection of commonly used English word by *Oxford 3000* dictionary. The game uses a [larger dictionary](https://github.com/dwyl/english-words) to generate legendary-level words which it chooses from a pool of more than 450000 words. Thus, the game play becomes increadibly hard and it challenges the user to their vocabulary limit. I am also making sure to check a word from the larger dictionary even if the user is playing in the easy mode. This makes sure that they can type in from a vast pool of word.

- I have also made sure to check all the bugs that a user might encounter by letting the game be played by some of my friends. They enjoyed playing the game and now I am even thinking to lauch this game as they are enjoying it. 

- Care has been taken that regardless of where the user input(in the boxes) my string would always be formed or deleted in that order.

- I have also added a timer and also counter average time of guessing the word for each user, which the actual game doens't have.


## What each file does

* **main.js:** This file contains the main logic and a lot of other functiosn that run the game. All the animations and fetch call are also controlled by this file. 
* **views.py:** This file was basically used to update the user's stats after each gameplay. This is also used to register, login and logout user.
* **styles.css:** Controls the layout and responsiveness of the website and also controls the mode of light/dark.
* **layout.html:** This file links all the static files to the html template and also contains some code and a lot of other views.
* **index.html:** This file is rendered when the game is being played. All the game elements are added using js to this file.
* **models.py:** A user and a word model can be seen from in this file. Word generation from the server option was kept but it is not used for the current version of the game.
* **words.txt:** This file has more than 450000 words which is basically used to verify if a word is in the dictionary and also generates word for the legendary level difficulty.
* **small_dict.txt:** This file just contains all the commonly used words taken from Oxford 3000. This is used to generate a random word for easy level difficulty and makes the gameplay much more easier.
 * **home.html:** Gives a bried tutorial of the game.
 * **other files:** All other files are basically same or some minor changes were brought to them.




## Features
In addition to the core gameplay, this implementation of the Wordle game includes the following features:


- **Taking input in different boxes**: This game can take input in different boxes of the word and not disrupt the sequence of the string. This isn't avaible in the actual wordle game. 
- **On Screen Keyboard**: This can be played both by an onscreen and normal device keyboard.
- **User scoring**: I have implemented the user data scoring by adding some more field to my user model. I have made a system of updating the user data after each game by using js fetch calls, which is really good for user experience. 
- **Storing Settings**: This game can store settings even when the user reloads the page. The default game begins by 5 word length, easy game level and light mode. Even when the user changes those settings and reloads the page those settings aren't changed as I have stored them in the localStorage of my/user's browser.
- **Light/Dark Mode**: The game includes the option to toggle between a light or dark mode. This helps players to play the game comfortably in different lighting conditions.
- **Difficulty Levels**: The player can choose from two difficulty levels: Easy, and Legendary. Each level has different word lengths and corresponding levels of difficulty.
- **Word Number Selection**: The player can choose the number of words to play the game, from 4 to 11. I have also managed to handle the dynamially resize the boxes if necessary even when my device is changed using css variables and Javascript
- **Statistics Board**: The game records the win percentage, number of tries, best streak and a lot of other data with an interactive chart and also with the average time taken by the user.
- **Non registered Users:** This game also lets non registered users to play if they do not want to share their credentials. Although they won't get to see their statistics. This feature is only available for the registered users. 
- **Option to add word from server:** I have also kept an option of adding words from my server if needed. A model had been already been made and tested, yet I decided to not include it in my actual game since giving entry each word in my models is really time consuming and not very efficient. 

## Technologies Used

This implementation of the Wordle game is built using the following technologies:

* **HTML:** The structure and content of the web pages are defined using HTML.
* **CSS:** The styling and layout of the web pages are defined using CSS.
* **JavaScript:** The game logic and user interface are implemented using JavaScript. Most of the api calls has also been implemented through this.
* **Django:** The web application is built using the Django framework, which handles the routing and communication between the client and server.
* **LocalStorage:** The game uses the LocalStorage functionality to store the game level, word number, and mode (light or dark) locally on the user's device.
* **Chart.js:** I used a library in the js in order to create a histogram for tracking a user's progress.
* **JsConfetti:** I have used this js feature in order to create an animation after a user wins. 






## How to run the game:
>You might also need to install virtual environment. This might depend on the operating system.

Install the required Python packages:
code
* pip install -r requirements.txt
Run the Django server:
code
* python manage.py runserver


> For some os at first you might need to activate the virtual env by creating one by giving this command "virtualenv newenv" and then by giving the command 
>"source newenv/bin/activate" you can run the game by giving the earlier python command

* Open your web browser and navigate to http://localhost:8000 to play the game.

## Acknowledgments
Special thanks to the creators of the original Wordle game for providing the inspiration for this project. Also, thanks to the CS50W course staff for providing the guidance and resources necessary to complete this project. Finally, thanks to the Oxford 3000 Dictionary and the [larger dictionary](https://github.com/dwyl/english-words) for providing the words for the game.

