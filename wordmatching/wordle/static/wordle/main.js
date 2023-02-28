const dict = new Map();
let count = 0;
const words_arr = [];
let rand_num = 0;
let correct_word = "";

/*
    fetch('/static/wordle/words.txt')
    .then(response => response.text())
    .then(text =>{
        const words = text.split('\n');
        for(const word in words){
            if(words[word].length === 5){
                dict.set(words[word].toLowerCase(), true);
                count+=1;
                words_arr.push(words[word]);
            }
        }
        console.log(count);
        let rand = Math.random() * count;
        rand = Math.floor(rand);
        rand_num = rand;
    });

*/

async function loadWords() {
    const response = await fetch('/static/wordle/words.txt');
    const text = await response.text();
    const words = text.split('\n');
    
    for(const word in words){
      if(words[word].length === 5){
        dict.set(words[word].toLowerCase(), true);
        count+=1;
        words_arr.push(words[word]);
      }
    }
    
    console.log(count);
    let rand = Math.random() * count;
    rand = Math.floor(rand);
    rand_num = rand;
  }





async function initiate_game(rows, cols, word, user_id){
    await loadWords();
    const jsConfetti = new JSConfetti();

    
    
    let startTime = new Date().getTime();
    var row = 0, col = 0;
    var str = "";
    let grid = document.querySelector(`.grid`);
    word = words_arr[rand_num].toUpperCase();
    correct_word = word;
    console.log(word);

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
                if(i != 0) nice.setAttribute("disabled", "true");
            }
            grid.append(nice_div);
        }
        let first_box = document.getElementById(`input-${row}-${col}`);
        first_box.focus();


        let input_nice = document.querySelectorAll("input");
        input_nice.forEach(function(input){

            input.addEventListener("focus", ()=>{
                row = input.dataset.row;
                col = input.dataset.col;
            })
            input.addEventListener("input", ()=>{
                

                if(input.value.length == input.maxLength){
                    input.style.borderColor = "#a7adbf";
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

                }
            })
        })

        document.addEventListener("keydown", function(event){
            if(str.length == cols && event.keyCode === 13){
                if(check_word(str)){
                    for(var i = 0; i < cols; i++){
                        if(word.indexOf(str[i]) !== -1){
                            let correct_letter_box = document.getElementById(`input-${row}-${i}`);
                            correct_letter_box.style.backgroundColor = "#f2c236";
                            correct_letter_box.style.borderColor = "#f2c236";
                            correct_letter_box.style.borderRadius = "0";
                            correct_letter_box.style.color = "white";
                        }
                        else{
                            let correct_letter_box = document.getElementById(`input-${row}-${i}`);
                            correct_letter_box.style.backgroundColor = "#a4aec4";
                            correct_letter_box.style.borderColor = "#a4aec4";
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
                            for(var k = 0; k < rows; k++){
                                for(var l = 0; l < cols; l++){
                                    let box = document.querySelector(`#input-${k}-${l}`);
                                    box.setAttribute('disabled', 'true');
                                }
                            }
                            return;
                        }
                        let input_next = document.getElementById(`input-${row}-${col}`);
                        input_next.focus();
                        str = "";
                    }
                    else{
                        
                        if(str === word){
                            // code for winning 
                            document.querySelector(".result").innerHTML = "YOU WON!"; 
                            document.querySelector(".result_div").style.display = "block";
                            document.querySelector(".result_content_result").innerHTML = "You have guessed it correctly!";
                            document.querySelector(".restart").style.display = "block";
                            jsConfetti.addConfetti();
                            if(user_id != 1){
                                let endTime = new Date().getTime();
                                save_progress(user_id, "win", row, endTime - startTime);
                            }
                            document.querySelector(".give_up_button").disabled = true;
                            for(var k = 0; k < rows; k++){
                                for(var l = 0; l < cols; l++){
                                    let box = document.querySelector(`#input-${k}-${l}`);
                                    box.setAttribute('disabled', 'true');
                                }
                            }
                            
                        }
                        else{
                            document.querySelector(".result").innerHTML = "YOU LOST!";
                            document.querySelector(".result_div").style.display = "block";
                            document.querySelector(".result_content_result").innerHTML = "The answer was:";
                            document.querySelector(".correct_word").style.display = "block";
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
                        return;
                    }
                }
                else{
                    // incorrent word 
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
                    
                }
                
            }
            else if(event.keyCode === 13 && str.length != cols){
                // insufficient length 
                console.log("insufficient length");
                document.querySelector(".result").innerHTML = "Insufficient Length!";
                document.querySelector(".result_content_result").innerHTML = "Please input a word of proper length!";
                document.querySelector(".result_div").style.display = "block";
                document.querySelector(".restart").style.display = "none";
                setTimeout(function(){
                document.querySelector(".result_div").style.display = "none";
                }, 2000);
            }

            else if(event.keyCode === 8){
                
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
                    input_next.focus();
                    
                }
                else{
                    curr_inp.value = null;
                    let str_nice = str.split('');
                    str_nice.splice(col, 1);
                    str = str_nice.join('');
                    console.log(str);
                }  
            }
        })

        setInterval(function() {
            let elapsedTime = new Date().getTime() - startTime;
            let minutes = Math.floor((elapsedTime / 1000) / 60);
            let seconds = Math.floor((elapsedTime / 1000) % 60);
            document.getElementById("timer").innerHTML = minutes + ":" + seconds;
        }, 1000);
}
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
    for(var k = 0; k < rows; k++){
        for(var l = 0; l < cols; l++){
            let box = document.querySelector(`#input-${k}-${l}`);
            box.setAttribute('disabled', 'true');
        }
    }
    gameover = true;
}

function quit_game(rows, cols, user_id){
    document.querySelector(".result").innerHTML = "YOU LOST!";
    document.querySelector(".result_div").style.display = "block";
    document.querySelector(".result_content_result").innerHTML = "The answer was:";
    document.querySelector(".correct_word").style.display = "block";
    document.querySelector(".give_up_button").disabled = true;
    document.querySelector(".correct_word").innerHTML = correct_word;
    save_progress(parseInt(user_id), "lose", rows);
    for(var k = 0; k < rows; k++){
        for(var l = 0; l < cols; l++){
            let box = document.querySelector(`#input-${k}-${l}`);
            box.setAttribute('disabled', 'true');
        }
    }
    gameover = true;
}



function fun_function(){
    console.log("works");
    document.querySelector("#Home_page_view").style.display = "none";
    document.querySelector("#User_progress_view").style.display = "flex";
}
function fun_function_user(){
    console.log("works");
    document.querySelector("#Home_page_view").style.display = "none";
    document.querySelector("#User_progress_view").style.display = "flex";
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