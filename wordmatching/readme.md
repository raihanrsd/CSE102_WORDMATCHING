
# Wordle Game

This is a web-based implementation of the popular Wordle game, built with Django framework. The game challenges players to guess a word of varying length and difficulty, based on feedback provided by the game. The game has a lot of features some of which are light/dark mode, difficulty levels, word number selection, timer and much more.

## Gameplay
The game starts with a random word, which the player must guess within six attempts. The player inputs a word and clicks the "Guess" button to submit their guess. The game then provides feedback in the form of colored squares, indicating which letters are present in the target word and whether they are in the correct position or not.

If the player successfully guesses the word within six attempts, they win the game. Otherwise, they lose and the correct word is revealed.

 If you open the game you will get a detailed tutorial on how to play the game as I have added them in the home page which is much more easier to understand.


## Distinctiveness and Complexity:
This game albeit is a popular wordle game which is available on the internet. Yet, I have implemented it with my very own logic. I faced significant challenge while implementing most of the game logic through JavaScript. I used input boxes in order to take each word as input from the user. Inputs can also be given using the keyboard keys that I made onscreen.

## Features
In addition to the core gameplay, this implementation of the Wordle game includes the following features:


- **Taking input in different boxes**: This game can take input in different boxes of the word and not disrupt the sequence of the string. This isn't avaible in the actual wordle game. 
- **On Screen Keyboard**: This can be played both by an onscreen and normal device keyboard.
- **User scoring**: I have implemented the user data scoring by adding some more field to my user model. I have made a system of updating the user data after each game by using js fetch calls, which is really good for user experience. 
- **Storing Settings**: This game can store settings even when the user reloads the page. The default game begins by 5 word length, easy game level and light mode. Even when the user changes those settings and reloads the page those settings aren't changed as I have stored them in the localStorage of my/user's browser.
- **Light/Dark Mode**: The game includes the option to toggle between a light or dark mode. This helps players to play the game comfortably in different lighting conditions.
- **Difficulty Levels**: The player can choose from two difficulty levels: Easy, and Legendary. Each level has different word lengths and corresponding levels of difficulty.
- **Word Number Selection**: The player can choose the number of words to play the game, from 4 to 11.
- **Statistics Board**: The game records the win percentage, number of tries, best streak and a lot of other data with an interactive chart and also with the average time taken by the user.


## Technologies Used
This implementation of the Wordle game is built using the following technologies:

HTML: The structure and content of the web pages are defined using HTML.
CSS: The styling and layout of the web pages are defined using CSS.
JavaScript: The game logic and user interactions are implemented using JavaScript.
Django: The web application is built using the Django framework, which handles the routing and communication between the client and server.
Oxford 3000 Dictionary: The game uses the Oxford 3000 Dictionary to generate easy-level words.
Larger Dictionary: The game uses a larger dictionary to generate legendary-level words.
LocalStorage: The game uses the LocalStorage functionality to store the game level, word number, and mode (light or dark) locally on the user's device.
Installation
To run the Wordle game locally, follow these steps:


## How to run the game:
>You might also need to install virtual environment. This might depend on the operating system.

Install the required Python packages:
code
pip install -r requirements.txt
Run the Django server:
code
python manage.py runserver


> For some os at first you might need to activate the virtual env by creating one by giving this command "virtualenv newenv" and then by giving the command 
>"source newenv/bin/activate" you can run the game by giving the earlier python command

Open your web browser and navigate to http://localhost:8000 to play the game.

## Acknowledgments
Special thanks to the creators of the original Wordle game for providing the inspiration for this project. Also, thanks to the CS50W course staff for providing the guidance and resources necessary to complete this project. Finally, thanks to the Oxford 3000 Dictionary and the larger dictionary for providing the words for the game.
