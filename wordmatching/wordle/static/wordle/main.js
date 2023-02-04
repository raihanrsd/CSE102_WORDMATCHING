function initiate_game(rows, cols, word){
    console.log("usa");
    var row = 0, col = 0;
    var str = "";
    let grid = document.querySelector(`.grid`);
            for(var i = 0; i < rows; i++){
                for(var j = 0; j < cols; j++){
                    let nice = document.createElement("input");
                    grid.append(nice);
                    nice.setAttribute("maxlength", "1");
                    nice.id = `input-${i}-${j}`;
                    nice.dataset.row = i;
                    nice.dataset.col = j;
                    nice.type = "text";
                }
            }
        let input_nice = document.querySelectorAll("input");
        input_nice.forEach(function(input){

            input.addEventListener("focus", ()=>{
                row = input.dataset.row;
                col = input.dataset.col;
            })

            

            input.addEventListener("input", ()=>{
                

                if(input.value.length == input.maxLength){
                    
                    let str_nice = str.split("");
                    str_nice.splice(col, 0, input.value.toUpperCase());
                    str = str_nice.join("");
                    console.log(str);
                    if(col == cols - 1){
                        console.log("ache");
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
            if(col == cols - 1 && event.keyCode === 13){
                for(var i = 0; i < cols; i++){
                    if(word.indexOf(str[i]) !== -1){
                        let correct_letter_box = document.getElementById(`input-${row}-${i}`);
                        correct_letter_box.style.backgroundColor = "orange";
                    }
                    else{
                        let correct_letter_box = document.getElementById(`input-${row}-${i}`);
                        correct_letter_box.style.backgroundColor = "gray";
                    }
                }

                for(var i = 0; i < cols; i++){
                    if(word[i] === str[i]){
                        let correct_letter_box = document.getElementById(`input-${row}-${i}`);
                        correct_letter_box.style.backgroundColor = "green";
                    }
                }
            }
            else if(event.keyCode === 13 && col != cols - 1){
                console.log("insufficient length");
            }

            else if(event.keyCode === 8){
                
                let curr_inp = document.getElementById(`input-${row}-${col}`);
                if(curr_inp.value === ""){
                    console.log(str);
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



            

        

        
        
}

