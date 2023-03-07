
#Wordle Game

This is a web-based implementation of the popular Wordle game, built with Django framework. The game challenges players to guess a word of varying length and difficulty, based on feedback provided by the game. The game has features like light/dark mode, difficulty levels, word number selection, and high scores.

Gameplay
The game starts with a random word, which the player must guess within six attempts. The player inputs a word and clicks the "Guess" button to submit their guess. The game then provides feedback in the form of colored squares, indicating which letters are present in the target word and whether they are in the correct position or not.

If the player successfully guesses the word within six attempts, they win the game. Otherwise, they lose and the correct word is revealed.

Features
In addition to the core gameplay, this implementation of the Wordle game includes the following features:

Light/Dark Mode: The game includes the option to toggle between a light or dark mode. This helps players to play the game comfortably in different lighting conditions.
Difficulty Levels: The player can choose from three difficulty levels: Easy, Medium, and Legendary. Each level has different word lengths and corresponding levels of difficulty.
Word Number Selection: The player can choose the number of words to play the game, from 1 to 5.
High Score Board: The game records the top scores based on the time taken to win the game, and displays them on a leaderboard. Players can compete against each other to see who can complete the game in the shortest time.
Technologies Used
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

Clone this repository to your local machine:
bash
Copy code
git clone https://github.com/<your-username>/wordle-game-django.git
Install the required Python packages:
Copy code
pip install -r requirements.txt
Run the Django server:
Copy code
python manage.py runserver
Open your web browser and navigate to http://localhost:8000 to play the game.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Special thanks to the creators of the original Wordle game for providing the inspiration for this project. Also, thanks to the CS50W course staff for providing the guidance and resources necessary to complete this project. Finally, thanks to the Oxford 3000 Dictionary and the larger dictionary for providing the words for the game.