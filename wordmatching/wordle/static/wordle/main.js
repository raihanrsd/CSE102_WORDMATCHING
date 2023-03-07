const dict = new Map();
let count = 0;
let gameover = false;
if(localStorage.getItem('game_info') == null){
    let info = { word_amount: 5, game_level: "easy", mode: "light"};
    localStorage.setItem('game_info', JSON.stringify(info));
}
let info = JSON.parse(localStorage.getItem('game_info'));

const words_arr = [];
let max_col = 0;
let rand_num = 0;
let correct_word = "";
let last_input_bx;
var str = "";
var row = 0, col = 0;
let keyBoard = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
                ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
                ['⌫', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Enter'],
]


fetch('/static/wordle/words.txt')
.then(response => response.text())
.then(text =>{
    const words = text.split('\n');
    for(const word in words){
        if(words[word].length === info.word_amount){
            dict.set(words[word].toLowerCase(), true);  
        }
    }
});



async function loadWords(letter_num, file_path) {
    const response = await fetch(file_path);
    const text = await response.text();
    const words = text.split('\n');
    
    for(const word in words){
      if(words[word].length === letter_num){
        count+=1;
        words_arr.push(words[word]);
      }
    }
    console.log(count);
    let rand = Math.random() * count;
    rand = Math.floor(rand);
    rand_num = rand;
}





async function initiate_game(rows, cols, word, user_id, game_level){
    if(game_level == "easy"){
        await loadWords(parseInt(cols), '/static/wordle/small_dict.txt');
    }
    else{
        await loadWords(parseInt(cols), '/static/wordle/words.txt');
    }
    
    const jsConfetti = new JSConfetti();
    max_col = cols;
    let startTime = new Date().getTime();
    let grid = document.querySelector(`.grid`);
    word = words_arr[rand_num].toUpperCase();
    correct_word = word;
    //console.log(word);

    // creating the grid
    for(var i = 0; i < rows; i++){
        let nice_div = document.createElement("div");
        for(var j = 0; j < cols; j++){
            let nice = document.createElement("input");
            nice_div.append(nice);
            nice.setAttribute("maxlength", "1");
            nice.id = `input-${i}-${j}`;
            nice.dataset.row = i;
            nice.dataset.col = j;
            nice.type = "text";
            if(info.word_amount == 8){
                nice.classList.add("input_letter_8");
                nice.style.width = "55px";
                nice.style.setProperty('--box-width', '55px');
            }
            if(info.word_amount == 9){
                nice.classList.add("input_letter_9");
                nice.style.width = "50px";
                nice.style.setProperty('--box-width', '50px');
            }
            if(info.word_amount == 10){
                nice.classList.add("input_letter_10");
                nice.style.width = "42px";
                nice.style.setProperty('--box-width', '42px');
            }
            if(info.word_amount == 11){
                nice.classList.add("input_letter_11");
                nice.style.width = "35px";
                nice.style.setProperty('--box-width', '35px');
            }
            if(i != 0) nice.setAttribute("disabled", "true");
        }
        grid.append(nice_div);
    }

    //creating the keyboard 
    let key_board = document.createElement("div");
    key_board.classList.add("main_keyboard");
    for(var i = 0; i < 3; i++){
        let key_board_row_div = document.createElement("div");
        for(var j = 0; j < keyBoard[i].length; j++){
            let keys = document.createElement("button");
            key_board_row_div.append(keys);
            keys.classList.add("keyboard_keys");
            keys.id = `key_${keyBoard[i][j]}`;
            keys.innerHTML = keyBoard[i][j];
            keys.dataset.letter = keyBoard[i][j];
            keys.onclick = function (){
                if(keys.dataset.letter === "Enter") enter_press_function();
                else if(keys.dataset.letter === "⌫") backspace_press_function();
                else {
                    key_press_function(keys);
                    keys.classList.add("letter_keys");
                };
            };
            
            if(i == 1) {
                keys.classList.add("noice_keys");
            }
            if(keyBoard[i][j] == "Enter" || keyBoard[i][j] == "⌫") keys.classList.add("special_special_keys");
        }
        key_board.append(key_board_row_div);        
    }
    grid.append(key_board);


    // controlling the input box movement
    let first_box = document.getElementById(`input-${row}-${col}`);
    first_box.focus();
    last_input_bx = first_box;


    let input_nice = document.querySelectorAll("input");
    input_nice.forEach(function(input){
    input.addEventListener("focus", ()=>{
        row = input.dataset.row;
        col = input.dataset.col;
        last_input_bx = input;
    })
    input.addEventListener("input", ()=>{
        input.value = input.value.toUpperCase();
        if(input.value.length == input.maxLength){
            input.style.animation = "grow_anim 0.25s forwards";
            setTimeout(function(){
                input.style.animation = 'none';
            }, 1000);
            input.style.borderColor = "#a7adbf";
            
            input.classList.remove("grow_prop");
            let str_nice = str.split("");
            str_nice.splice(col, 0, input.value.toUpperCase());
            str = str_nice.join("");
            console.log(str);
            
            if(col == cols - 1){
                
            }
            else{
                col++;
            }
            
            let input_next = document.getElementById(`input-${row}-${col}`);
            input_next.focus();
            last_input_bx = input_next;

            }
        })
    })

    // using the keyboard making the string

    document.querySelectorAll('.letter_keys').forEach(function(button){
        let curr_inp = document.querySelector(`#input-${row}-${col}`);

    });



        // main game logic for keyboard key press

    document.addEventListener("keydown", function(event){
        if(gameover && event.keyCode === 13){
             location.reload();
        }
        else if(str.length == cols && event.keyCode === 13){
            // runs the main game
            if(run_game(str, word, rows, cols, startTime, jsConfetti, row, col)) str = "";

        }
        else if(event.keyCode === 13 && str.length != cols){
            // insufficient length 
            insufficient_length_func();
        }

        else if(event.keyCode === 8){
            // backspace 
            str = deleting_letter_func(str, row, col);  
        }
    });


        // pressing on screen enter key
        document.getElementById("key_Enter").addEventListener('click', ()=>{
            // win or lose
            if(gameover){
                location.reload();
            }
            else if(str.length == cols){
                if(run_game(str, word, rows, cols, startTime, jsConfetti, row, col)) str = "";
            }
            else{
                insufficient_length_func();
            }
        });

        document.getElementById("key_⌫").addEventListener('click', ()=>{
            // onscreen backspace
            str = deleting_letter_func(str, row, col);
            //let input_next = document.getElementById(`input-${row}-${col}`);
            //input_next.focus();
            console.log(col);
            if(col != 0){
                const next_inp_box = document.getElementById(`input-${last_input_bx.dataset.row}-${parseInt(last_input_bx.dataset.col)}`);
                next_inp_box.focus();
            }
            else{
                last_input_bx.focus();
            }
            

            
        });


        setInterval(function() {
            let elapsedTime = new Date().getTime() - startTime;
            let minutes = Math.floor((elapsedTime / 1000) / 60);
            let seconds = Math.floor((elapsedTime / 1000) % 60);
            document.getElementById("timer").innerHTML = minutes + ":" + seconds;
        }, 1000);
}



// check and all other functions starts from here

function check_word(word){
    if(dict.has(word.toLowerCase())){
        return true;
    }
    else{
        return false;
    }
}
function close_popup(){
    document.querySelector(".result_div").style.display = "none";
}

function quit_game_nice(rows, cols){
    document.querySelector(".result").innerHTML = "YOU LOST!";
    document.querySelector(".result_div").style.display = "block";
    document.querySelector(".result_content_result").innerHTML = "The answer was:";
    document.querySelector(".correct_word").style.display = "block";
    document.querySelector(".correct_word").innerHTML = correct_word;
    document.querySelector(".give_up_button").disabled = true;
    document.getElementById("key_⌫").disabled = true;
    for(var k = 0; k < rows; k++){
        for(var l = 0; l < cols; l++){
            let box = document.querySelector(`#input-${k}-${l}`);
            box.setAttribute('disabled', 'true');
        }
    }
    keyBoard_disable();
    gameover = true;
}

function quit_game(rows, cols, user_id){
    document.querySelector(".result").innerHTML = "YOU LOST!";
    document.querySelector(".result_div").style.display = "block";
    document.querySelector(".result_content_result").innerHTML = "The answer was:";
    document.querySelector(".correct_word").style.display = "block";
    document.querySelector(".give_up_button").disabled = true;
    document.querySelector(".correct_word").innerHTML = correct_word;
    document.getElementById("key_⌫").disabled = true;
    save_progress(parseInt(user_id), "lose", rows);
    for(var k = 0; k < rows; k++){
        for(var l = 0; l < cols; l++){
            let box = document.querySelector(`#input-${k}-${l}`);
            box.setAttribute('disabled', 'true');
        }
    }
    keyBoard_disable();
    gameover = true;
}



function revert_func(){
    document.querySelector("#Home_page_view").style.display = "flex";
    document.querySelector("#User_progress_view").style.display = "none";
    document.querySelector("#settings_view").style.display = "none";
    document.querySelector("#User_help_view").style.display = "none";
}

function fun_function(){
    document.querySelector("#Home_page_view").style.display = "none";
    document.querySelector("#User_progress_view").style.display = "flex";
    document.querySelector("#settings_view").style.display = "none";
    document.querySelector("#User_help_view").style.display = "none";
}

function show_settings_view(){
    document.querySelector("#Home_page_view").style.display = "none";
    document.querySelector("#User_progress_view").style.display = "none";
    document.querySelector("#settings_view").style.display = "flex";
    document.querySelector("#User_help_view").style.display = "none";
}

function User_help_view(){
    document.querySelector("#Home_page_view").style.display = "none";
    document.querySelector("#User_progress_view").style.display = "none";
    document.querySelector("#settings_view").style.display = "none";
    document.querySelector("#User_help_view").style.display = "flex";
}



function fun_function_user(){
    document.querySelector("#Home_page_view").style.display = "none";
    document.querySelector("#User_progress_view").style.display = "flex";
    document.querySelector("#settings_view").style.display = "none";
    document.querySelector("#User_help_view").style.display = "none";
    fetch('/get_info')
    .then(response => response.json())
    .then(user =>{
        
        document.querySelector(".game_played_h1").innerHTML = user.games_played;
        document.querySelector(".game_won_h1").innerHTML = user.games_won;
        document.querySelector(".win_percentage_h1").innerHTML = parseFloat(user.percentage_of_win).toFixed(2);
        if(user.best_try == 10){
            document.querySelector(".best_try_h1").innerHTML = 0;
        }
        else{
            document.querySelector(".best_try_h1").innerHTML = user.best_try;
        }
        console.log(user.best_try);
        document.querySelector(".best_try_h1").innerHTML = user.best_try;
        document.querySelector(".current_streak_h1").innerHTML = user.current_streak;
        document.querySelector(".best_streak_h1").innerHTML = user.max_streak;
        var totalSeconds = user.average_time;
        console.log(user.average_time);

        var minutes = Math.floor(totalSeconds / 60);
        var seconds = Math.floor(totalSeconds - (minutes * 60));

        var formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        console.log(formattedTime); // outputs something like "2:23"
        document.querySelector(".average_duration_h1").innerHTML = formattedTime;

        let existingChart=null;
        Chart.helpers.each(Chart.instances, function (instance) {
            if (instance.chart.canvas.id === 'myChart') {
              existingChart = instance;
              return;
            }
          });
          

        if(existingChart){
            existingChart.destroy;
        }
        console.log(Chart.instances);
        var ctx = document.getElementById('myChart');
       new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['#Try1', '#Try2', '#Try3', '#Try4', '#Try5', '#Try6'],
            datasets: [{
            label: '# of Tries',
            data: [user.best_tries_1, user.best_tries_2, user.best_tries_3, user.best_tries_4, user.best_tries_5, user.best_tries_6],
            
            backgroundColor:[
                '#e3ecff',
                '#e3ecff',
                '#e3ecff',
                '#e3ecff',
                '#e3ecff',
                '#e3ecff',
            ],
            borderColor :[
            'rgba(227, 236, 255, 1)',
            'rgba(227, 236, 255, 1)',
            'rgba(227, 236, 255, 1)',
            'rgba(227, 236, 255, 1)',
            'rgba(226, 236, 255, 1)',
            'rgba(227, 236, 255, 1)',
            ],
            borderWidth: 1
            }]
        },
        options: {
            scales: {
            y: {
                beginAtZero: true
            }
            }
        }
        });
    });
}

function save_progress(user_id, status, tries, duration){
    console.log("yes");
    console.log("This is the duration");
    console.log(duration);
    fetch(`/get_info/${user_id}/${status}/${tries}`,{
        method: 'POST',
        body: JSON.stringify({
            duration: duration / 1000,
        })
    })
    .then(response => response.json())
    .then(post =>{
        console.log(`It works on this id${user_id}`)
        console.log(post);
    })
}

function color_keyboard_keys(letter, color){
    let keys = document.querySelector(`#key_${letter}`);
    const bg_color = window.getComputedStyle(keys).getPropertyValue('background-color');
    if(bg_color !== "rgb(121, 183, 80)") keys.style.backgroundColor = color;
    keys.style.color = "#ffffff";
}


function key_press_function(x){
    x.blur();
    
    str += x.dataset.letter;
    console.log(str);
    console.log(max_col);
    console.log(last_input_bx.dataset.col);
    last_input_bx.value = x.dataset.letter;
    if(parseInt(last_input_bx.dataset.col) + 1 !== max_col){
        document.querySelector(`#input-${last_input_bx.dataset.row}-${parseInt(last_input_bx.dataset.col) + 1}`).focus();
    }
}

function enter_press_function(){
    console.log("enter");
}

function backspace_press_function(){
    console.log("backspace");
}


function run_game(str, word, rows, cols, startTime, jsConfetti, row, col){
    if(check_word(str)){
        for(var i = 0; i < cols; i++){
            if(word.indexOf(str[i]) !== -1){
                let correct_letter_box = document.getElementById(`input-${row}-${i}`);
                correct_letter_box.style.backgroundColor = "#f2c236";
                correct_letter_box.style.borderColor = "#f2c236";
                color_keyboard_keys(str[i], "#f2c236");
                correct_letter_box.style.borderRadius = "0";
                correct_letter_box.style.color = "white";
            }
            else{
                let correct_letter_box = document.getElementById(`input-${row}-${i}`);
                correct_letter_box.style.backgroundColor = "var(--wrong_letter)";
                correct_letter_box.style.borderColor = "var(--wrong_letter)";
                color_keyboard_keys(str[i],"#a4aec4");
                correct_letter_box.style.borderRadius = "0";
                correct_letter_box.style.color = "white";
            }
        }

        for(var i = 0; i < cols; i++){
            let correct_letter_box = document.getElementById(`input-${row}-${i}`);
            correct_letter_box.setAttribute('disabled', 'true');
            if(word[i] === str[i]){   
                correct_letter_box.style.backgroundColor = "#79b750";
                correct_letter_box.style.borderColor = "#79b750";
                color_keyboard_keys(str[i], "#79b750");
                correct_letter_box.style.borderRadius = "0";
                correct_letter_box.style.color = "white";
            }
            
        }
        if(row != rows - 1){
            row++;
            for(var i = 0; i < cols; i++){
                let input_box = document.getElementById(`input-${row}-${i}`);
                input_box.disabled = false;
            }
            col = 0;
            if(str === word){
                // code for winning
                document.querySelector(".result").innerHTML = "YOU WON!"; 
                document.querySelector(".result_div").style.display = "block";
                document.querySelector(".result_content_result").innerHTML = "You have guessed it correctly!";
                jsConfetti.addConfetti({
                    confettiRadius: 6,
                    confettiNumber: 500,
                    confettiColors: [
                        '#cd0a54', '#0647ff', '#ff70ff', '#7885ff', '#fbb1bd', '#f9bec7',
                      ],
                });
                document.querySelector(".restart").style.display = "block";
                if(user_id != 1){
                    let endTime = new Date().getTime();
                    save_progress(user_id, "win", row, endTime - startTime);
                }
                document.querySelector(".give_up_button").disabled = true;
                document.getElementById("key_⌫").disabled = true;
                for(var k = 0; k < rows; k++){
                    for(var l = 0; l < cols; l++){
                        let box = document.querySelector(`#input-${k}-${l}`);
                        box.setAttribute('disabled', 'true');
                    }
                }
                str = "";
                gameover = true;
                keyBoard_disable();
                return true;
            }
            let input_next = document.getElementById(`input-${row}-${col}`);
            input_next.focus();
            str = "";
            //gameover = true;
            return true;
        }
        else{
            
            if(str === word){
                // code for winning 
                document.querySelector(".result").innerHTML = "YOU WON!"; 
                document.querySelector(".result_div").style.display = "block";
                document.querySelector(".result_content_result").innerHTML = "You have guessed it correctly!";
                document.querySelector(".restart").style.display = "block";
                jsConfetti.addConfetti({
                    confettiRadius: 6,
                    confettiNumber: 500,
                    confettiColors: [
                        '#cd0a54', '#0647ff', '#ff70ff', '#7885ff', '#fbb1bd', '#f9bec7',
                      ],
                });
                if(user_id != 1){
                    let endTime = new Date().getTime();
                    save_progress(user_id, "win", row, endTime - startTime);
                }
                document.querySelector(".give_up_button").disabled = true;
                document.getElementById("key_⌫").disabled = true;
                for(var k = 0; k < rows; k++){
                    for(var l = 0; l < cols; l++){
                        let box = document.querySelector(`#input-${k}-${l}`);
                        box.setAttribute('disabled', 'true');
                    }
                }
                gameover = true;
                keyBoard_disable();
                return true;

                
            }
            else{
                document.querySelector(".result").innerHTML = "YOU LOST!";
                document.querySelector(".result_div").style.display = "block";
                document.querySelector(".result_content_result").innerHTML = "The answer was:";
                document.querySelector(".correct_word").style.display = "block";
                document.querySelector(".correct_word").innerHTML = word;
                document.querySelector(".restart").style.display = "block";
                document.getElementById("key_⌫").disabled = true;
                if(user_id != 1){
                    let endTime = new Date().getTime();
                    save_progress(user_id, "lose", rows, endTime - startTime);
                }
                document.querySelector(".give_up_button").disabled = true;
                
                for(var k = 0; k < rows; k++){
                    for(var l = 0; l < cols; l++){
                        let box = document.querySelector(`#input-${k}-${l}`);
                        box.setAttribute('disabled', 'true');
                    }
                }

            }
            str = "";
            gameover = true;
            keyBoard_disable();
            return true;
        }
    }
    else{
        // incorrect word 
        document.querySelector(".result").innerHTML = "Incorrect Word!";
        document.querySelector(".result_content_result").innerHTML = "Please input a valid word!";
        document.querySelector(".result_div").style.display = "block";
        document.querySelector(".restart").style.display = "none";
        for(var i = 0; i < cols; i++){
            document.querySelector(`#input-${row}-${i}`).classList.add('shake');
        }
        setTimeout(function(){
            document.querySelector(".result_div").style.display = "none";
            for(var i = 0; i < cols; i++){
                document.querySelector(`#input-${row}-${i}`).classList.remove('shake');
            }
        }, 2000);
        return false;
        
    }
}


function insufficient_length_func(){
    console.log("insufficient length");
    document.querySelector(".result").innerHTML = "Insufficient Length!";
    document.querySelector(".result_content_result").innerHTML = "Please input a word of proper length!";
    document.querySelector(".result_div").style.display = "block";
    document.querySelector(".restart").style.display = "none";
    setTimeout(function(){
    document.querySelector(".result_div").style.display = "none";
    }, 2000);
}


function deleting_letter_func(str, row, col){
    let curr_inp = document.getElementById(`input-${row}-${col}`);
    curr_inp.style.outlineColor = "#d3d6da";
    curr_inp.borderColor = "#d3d6da";
    if(curr_inp.value === ""){
        if(col != 0){
            col--;
        }
        let str_nice = str.split('');
        str_nice.splice(col, 1);
        str = str_nice.join('');
        console.log(str);
        let input_next = document.getElementById(`input-${row}-${col}`);
        //last_input_bx = input_next;
        input_next.focus();
        input_next.value = null;
        
    }
    else{
        curr_inp.value = null;
        let str_nice = str.split('');
        str_nice.splice(col, 1);
        str = str_nice.join('');
        console.log(str);
    }
    return str;
}

function change_word_num(x){
    const className = x.dataset.classname;
    const wordnum = parseInt(x.dataset.wordnum);
    document.querySelectorAll(`.${className}`).forEach(function(btn){
        btn.classList.remove("selected_letter_num");
    });

    x.classList.add("selected_letter_num");
    info.word_amount = wordnum;
    localStorage.setItem('game_info', JSON.stringify(info));
    location.reload();
}

function change_level_func(x){
    const className = x.dataset.className;
    const level = x.dataset.level;
    document.querySelectorAll(`.${className}`).forEach(function(btn){
        btn.classList.remove("selected_letter_num");
    });
    x.classList.add("selected_letter_num");
    info.game_level = level;
    localStorage.setItem('game_info', JSON.stringify(info));
    location.reload();
}


function keyBoard_disable(){
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < keyBoard[i].length; j++){
            if(keyBoard[i][j] != "Enter") document.getElementById(`key_${keyBoard[i][j]}`).disabled = true;
        }
    }
}