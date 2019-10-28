//my code is a bit wonky and the system will freeze if max length is not greater than a certain amount
//I have tried to accomadate for that by giving an error message.
"use strict";

    function update(){
        //making of arrays of the srings below
        var v_list= string_verbs.split(/[\n\t ]+/);
        var n_list= string_nouns.split(/[\n\t ]+/);
        var a_list= string_adj.split(/[\n\t ]+/);
        var total_list= v_list.concat(n_list);
        total_list= total_list.concat(a_list);
        var tbl = document.querySelector("#table");
        var header= document.querySelector(".none");
        header.classList.add("visible");



        var minWordLength= document.querySelector("#MinWord").value;
        var maxWordLenth= document.querySelector("#MaxWord").value;
        var maxChar= document.querySelector("#MaxLength").value;
        var easy= document.querySelector("#check_1");
        var number= document.querySelector("#check_2");
        var wrong= document.querySelector(".wrong");
        if (maxChar< maxWordLenth*3 || maxChar< minWordLength*4 ){
            alert("Error: Max Length is to small make element bigger");}


        else if (easy.checked){
            for(let i = 0; i < 10; i++) {
                var totalChar= 0;
                var row = document.createElement("tr");
                tbl.appendChild(row);
                var charLeft= maxChar;
                while(true){
                    let n = Math.floor(Math.random()*n_list.length);
                    let compar= charLeft-n_list[n].length;
                    if (minWordLength <=n_list[n].length && n_list[n].length <= maxWordLenth && compar>= maxWordLenth*4/3){
                        var noun1= n_list[n];
                        totalChar+= noun1.length;
                        charLeft-= noun1.length;
                        break;
                    }//end of noun if
                }//end of while
                while(true){
                    let n = Math.floor(Math.random()*n_list.length);
                    let compar= charLeft-n_list[n].length;
                    if (minWordLength <=n_list[n].length && n_list[n].length <= maxWordLenth && compar>= maxWordLenth*3/2){
                        var noun= n_list[n];
                        totalChar+= noun.length;
                        charLeft-= noun.length;
                        break;
                    }//end of noun if
                }//end of while

                while(true){
                    var v = Math.floor(Math.random()*v_list.length);
                    let compar= charLeft-v_list[v].length;
                    if (minWordLength <=v_list[v].length && v_list[v].length<= maxWordLenth && compar>= minWordLength){
                        var verb= v_list[v];
                        totalChar+= verb.length;
                        charLeft-= verb.length;
                        break;
                    }//end of verb if
                }//end of while

                while(true){
                    var a = Math.floor(Math.random()*a_list.length);
                    let compar= charLeft-a_list[a].length;
                    if (minWordLength <=a_list[a].length && a_list[a].length<= maxWordLenth && compar>= 0){
                        var adj= a_list[a];
                        totalChar+= adj.length;
                        break;
                    }//end of verb if
                }//end of while

                if(number.checked) {
                        let yas=-1;
                        let t= Math.floor(Math.random()*4);
                        if (t===0) {
                            for (let i = 0; noun.length > i; i++) {
                                if (noun[i] === "o" || noun[i] === "l" || noun[i] === "s" ||
                                    noun[i] === "e" || noun[i] === "h" || noun[i] === "b" ||
                                    noun[i] === "t" ) {
                                    noun = noun.substr(0, i) + number1(noun[i]).toString() + noun.substr(i + 1); //code borrow from https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
                                    yas=4;
                                    break;
                                }
                            }
                            if (yas<4){
                                t= Math.floor(Math.random()*4); }
                        }//noun

                        else if(t===1){
                            for (let i = 0; verb.length > i; i++) {
                                if (verb[i] === "o" || verb[i] === "l" || verb[i] === "s" ||
                                    verb[i] === "e" || verb[i] === "h" || verb[i] === "b" ||
                                    verb[i] === "z" || verb[i] === "i" || verb[i] === "g" || verb[i] === "t"
                                    || verb[i] === "a") {
                                    verb = verb.substr(0, i) + number1(verb[i]).toString() + verb.substr(i + 1);
                                    yas = 4;
                                    break;

                                }
                            }
                            if (yas<4){
                                t= Math.floor(Math.random()*4); }
                        }//verb

                        else if (t===2) {
                            for (let i = 0; noun1.length > i; i++) {
                                if (noun1[i] === "o" || noun1[i] === "l" || noun1[i] === "s" ||
                                    noun1[i] === "e" || noun1[i] === "h" ||
                                    noun1[i] === "z" || noun1[i] === "i" ||
                                    noun1[i] === "g" || noun1[i] === "t" || noun1[i] === "a") {
                                    noun1 = noun1.substr(0, i) + number1(noun1[i]).toString() + noun1.substr(i + 1);
                                    yas = 4;
                                    break;
                                }
                            }
                            if (yas<4){
                                t= Math.floor(Math.random()*4); }
                        }//noun

                        else if (t===3) {
                            for (let i = 0; adj.length > i; i++) {
                                if (adj[i] === "o" || adj[i] === "l" || adj[i] === "s" ||
                                    adj[i] === "e" || adj[i] === "h" || adj[i] === "b" ||
                                    adj[i] === "y" || adj[i] === "z" || adj[i] === "i" ||
                                    adj[i] === "r" || adj[i] === "g" ||
                                    adj[i] === "t" || adj[i] === "a") {
                                    adj = adj.substr(0, i) + number1(adj[i]).toString() + adj.substr(i + 1);
                                    yas = 4;
                                    break;
                                }
                            }
                            if (yas<4){
                                t= Math.floor(Math.random()*4); }
                        }//adj
                }

                var td1 = document.createElement("td");
                td1.innerHTML=adj;
                var td2 = document.createElement("td");
                td2.innerHTML=noun;
                var td3 = document.createElement("td");
                td3.innerHTML=verb;
                var td4 = document.createElement("td");
                td4.innerHTML=noun1;
                var td5 = document.createElement("td");
                td5.innerHTML=totalChar;
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);

            }//end of for
        }//end of if

        else{
            for(let i = 0; i < 10; i++) {
                totalChar= 0;
                row = document.createElement("tr");
                tbl.appendChild(row);
                charLeft= maxChar;
                while(true){
                    let n = Math.floor(Math.random()*total_list.length);
                    let compar= charLeft-total_list[n].length;
                    if (minWordLength <=total_list[n].length && total_list[n].length <= maxWordLenth && compar>= maxWordLenth*4/3){
                        var total1= total_list[n];
                        totalChar+= total1.length;
                        charLeft-= total1.length;
                        break;
                    }//end of total if
                }//end of while
                while(true){
                    let n = Math.floor(Math.random()*total_list.length);
                    let compar= charLeft-total_list[n].length;
                    if (minWordLength <=total_list[n].length && total_list[n].length <= maxWordLenth && compar>= maxWordLenth*3/2){
                        var total2= total_list[n];
                        totalChar+= total2.length;
                        charLeft-= total2.length;
                        break;
                    }//end of total if
                }//end of while
                while(true){
                    let n = Math.floor(Math.random()*total_list.length);
                    let compar= charLeft-total_list[n].length;
                    if (minWordLength <=total_list[n].length && total_list[n].length <= maxWordLenth && compar>= minWordLength){
                        var total3= total_list[n];
                        totalChar+= total3.length;
                        charLeft-= total3.length;
                        break;
                    }//end of total if
                }//end of while
                while(true){
                    let n = Math.floor(Math.random()*total_list.length);
                    let compar= charLeft-total_list[n].length;
                    if (minWordLength <=total_list[n].length && total_list[n].length <= maxWordLenth && compar>= 0){
                        var total4= total_list[n];
                        totalChar+= total4.length;
                        charLeft-= total4.length;
                        break;
                    }//end of total if
                }//end of while

                if(number.checked) {
                    let yas=-1;
                    let t= Math.floor(Math.random()*4);
                    if (t===0) {
                        for (let i = 0; total1.length > i; i++) {
                            if (total1[i] === "o" || total1[i] === "l" || total1[i] === "s" ||
                                total1[i] === "e" || total1[i] === "h" || total1[i] === "b" ||
                                total1[i] === "t" ) {
                                total1 = total1.substr(0, i) + number1(total1[i]).toString() + total1.substr(i + 1); //code borrow from https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
                                yas=4;
                                break;
                            }
                        }
                        if (yas<4){
                            t= Math.floor(Math.random()*4); }
                    }//noun

                    else if(t===1){
                        for (let i = 0; total2.length > i; i++) {
                            if (total2[i] === "o" || total2[i] === "l" || total2[i] === "s" ||
                                total2[i] === "e" || total2[i] === "h" || total2[i] === "b" ||
                                total2[i] === "z" || total2[i] === "i" || total2[i] === "g" || total2[i] === "t"
                                || total2[i] === "a") {
                                total2 = total2.substr(0, i) + number1(total2[i]).toString() + total2.substr(i + 1);
                                yas = 4;
                                break;

                            }
                        }
                        if (yas<4){
                            t= Math.floor(Math.random()*4); }
                    }//verb

                    else if (t===2) {
                        for (let i = 0; total3.length > i; i++) {
                            if (total3[i] === "o" || total3[i] === "l" || total3[i] === "s" ||
                                total3[i] === "e" || total3[i] === "h" ||
                                total3[i] === "z" || total3[i] === "i" ||
                                total3[i] === "g" || total3[i] === "t" || total3[i] === "a") {
                                total3 = total3.substr(0, i) + number1(total3[i]).toString() + total3.substr(i + 1);
                                yas = 4;
                                break;
                            }
                        }
                        if (yas<4){
                            t= Math.floor(Math.random()*4); }
                    }//noun

                    else if (t===3) {
                        for (let i = 0; total4.length > i; i++) {
                            if (total4[i] === "o" || total4[i] === "l" || total4[i] === "s" ||
                                total4[i] === "e" || total4[i] === "h" || total4[i] === "b" ||
                                total4[i] === "y" || total4[i] === "z" || total4[i] === "i" ||
                                total4[i] === "r" || total4[i] === "g" ||
                                total4[i] === "t" || total4[i] === "a") {
                                total4 = total4.substr(0, i) + number1(total4[i]).toString() + total4.substr(i + 1);
                                yas = 4;
                                break;
                            }
                        }
                        if (yas<4){
                            t= Math.floor(Math.random()*4); }
                    }//adj
                }
                td1 = document.createElement("td");
                td1.innerHTML=total1;
                td2 = document.createElement("td");
                td2.innerHTML=total2;
                td3 = document.createElement("td");
                td3.innerHTML=total3;
                td4 = document.createElement("td");
                td4.innerHTML=total4;
                td5 = document.createElement("td");
                td5.innerHTML=totalChar;
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);
            }//end of for
        }//end of else

}

function number1(x){
    let letter = x;
    var num= 1;
    switch (letter) {
        case "o":
            num=0;
            break;
        case "l":
        case "i":
            num=1;
            break;
        case "s":
            num=5;
            break;
        case "e":
            num=3;
            break;
        case "h":
            num=4;
            break;
        case "b":
            num=6;
            break;
        case "g":
            num=9;
            break;
        case "t":
        case "r":
            num=7;
            break;
        case "y":
        case "z":
            num= 2;
            break;
        case "a":
            num= 8;
    }
    return num;
}


//strings of adjective nouns and verbs
var string_adj="abrupt\n the\t their\t my\t our\t its\n" + "acidic\n" + "adorable\n" + "adventurous\n" + "aggressive\n" + "agitated\n" + "alert\n" + "aloof\n" + "amiable\n" + "amused\n" +
    "annoyed\n" + "antsy\n" + "anxious\n" + "appalling\n" + "arrogant\n" + "ashamed\n" + "attractive\n" + "average\n" + "batty\n" + "beefy\n" + "bewildered\n" +
    "biting\n" + "bitter\n" + "bland\n" + "blushing\n" + "bored\n" + "brave\n" + "bright\n" + "broad\n" + "bulky\n" + "burly\n" + "charming\n" + "cheeky\n" + "cheerful\n" +
    "chubby\n" + "clean\n" + "clear\n" + "cloudy\n" + "clueless\n" + "clumsy\n" + "colorful\n" + "colossal\n" + "combative\n" + "comfortable\n" + "condemned\n" + "confused\n" +
    "convincing\n" + "convoluted\n" + "cooperative\n" + "corny\n" + "costly\n" + "courageous\n" + "crabby\n" + "creepy\n" + "crooked\n" + "cruel\n" + "cumbersome\n" + "curved\n" +
    "cynical\n" + "dangerous\n" + "dashing\n" + "decayed\n" + "deceitful\n" + "deep\n" + "defeated\n" + "defiant\n" + "delicious\n" + "delightful\n" + "depraved\n" + "depressed\n" +
    "despicable\n" + "determined\n" + "dilapidated\n" + "diminutive\n" + "disgusted\n" + "distinct\n" + "distraught\n" + "distressed\n" + "disturbed\n" + "dizzy\n" + "drab\n" +
    "drained\n" + "dull\n" + "eager\n" + "ecstatic\n" + "elated\n" + "elegant\n" + "emaciated\n" + "embarrassed\n" + "enchanting\n" + "encouraging\n" + "energetic\n" + "enormous\n" +
    "enthusiastic\n" + "envious\n" + "exasperated\n" + "excited\n" + "exhilarated\n" + "extensive\n" + "exuberant\n" + "fancy\n" + "fantastic\n" + "fierce\n" + "fluttering\n" +
    "foolish\n" + "frantic\n" + "fresh\n" + "friendly\n" + "frightened\n" + "frothy\n" + "frustrating\n" + "funny\n" + "fuzzy\n" + "gaudy\n" + "gentle\n" + "ghastly\n" + "giddy\n" +
    "gigantic\n" + "glamorous\n" + "gleaming\n" + "glorious\n" + "gorgeous\n" + "graceful\n" + "greasy\n" + "grieving\n" + "gritty\n" + "grotesque\n" + "grubby\n" + "grumpy\n" +
    "handsome\n" + "happy\n" + "harebrained\n" + "healthy\n" + "helpful\n" + "helpless\n" + "high\n" + "hollow\n" + "homely\n" + "horrific\n" + "huge\n" + "hungry\n" + "hurt\n" +
    "icy\n" + "ideal\n" + "immense\n" + "impressionable\n" + "intrigued\n" + "irate\n" + "irritable\n" + "itchy\n" + "jealous\n" + "jittery\n" + "jolly\n" + "joyous\n" + "filthy\n" +
    "flat\n" + "floppy\n" + "fluttering\n" +"juicy\n" + "jumpy\n" + "kind\n" + "large\n" + "lazy\n" + "lethal\n" + "little\n" + "lively\n" + "livid\n" + "lonely\n" +
    "loose\n" + "lovely\n" + "lucky\n" + "ludicrous\n" + "macho\n" + "magnificent\n" + "mammoth\n" + "maniacal\n" + "massive\n" + "melancholy\n" + "melted\n" + "miniature\n" +
    "minute\n" + "mistaken\n" + "misty\n" + "moody\n" + "mortified\n" + "motionless\n" + "muddy\n" + "mysterious\n" + "narrow\n" + "nasty\n" + "naughty\n" + "nervous\n" +
    "nonchalant\n" + "nonsensical\n" + "nutritious\n" + "nutty\n" + "obedient\n" + "oblivious\n" + "obnoxious\n" + "odd\n" + "outrageous\n" + "panicky\n" + "perfect\n" +
    "perplexed\n" + "petite\n" + "petty\n" + "plain\n" + "pleasant\n" + "poised\n" + "pompous\n" + "precious\n" + "prickly\n" + "proud\n" + "pungent\n" + "puny\n" + "quaint\n" +
    "quizzical\n" + "ratty\n" + "reassured\n" + "relieved\n" + "repulsive\n" + "responsive\n" + "ripe\n" + "robust\n" + "rotten\n" + "rotund\n" + "rough\n" + "round\n" + "salty\n" +
    "sarcastic\n" + "scant\n" + "scary\n" + "scattered\n" + "scrawny\n" + "shaggy\n" + "shaky\n" + "shallow\n" + "sharp\n" + "shiny\n" + "short\n" + "silky\n" + "silly\n" +
    "skinny\n" + "slimy\n" + "slippery\n" + "small\n" + "smarmy\n" + "smiling\n" + "smoggy\n" + "smooth\n" + "smug\n" + "soggy\n" + "solid\n" + "sore\n" + "sour\n" + "sparkling\n" +
    "spicy\n" + "splendid\n" + "spotless\n" + "square\n" + "stale\n" + "steady\n" + "steep\n" + "sticky\n" + "stormy\n" + "stout\n" + "straight\n" + "strange\n" + "strong\n"
    + "stunning\n" + "substantial\n" + "successful\n" + "succulent\n" + "superficial\n" + "superior\n" + "swanky\n" + "sweet\n" + "tart\n" + "tasty\n" + "teeny\n" + "tender\n"
    + "tense\n" + "terrible\n" + "testy\n" + "thankful\n" + "thick\n" + "thoughtful\n" + "thoughtless\n" + "tight\n" + "timely\n" + "tricky\n" + "trite\n" + "troubled\n" +
    "twitter pated\n" + "uneven\n" + "unsightly\n" + "upset\n" + "uptight\n" + "vast\n" + "vexed\n" + "victorious\n" + "virtuous\n" + "vivacious\n" + "vivid\n" + "wacky\n" +
    "weary\n" + "whimsical\n" + "whopping\n" + "wicked\n" + "witty\n" + "wobbly\n" + "wonderful\n" + "worried\n" + "yummy\n" + "zany\n" + "zealous\n" + "zippy";

var string_nouns= "factor\n" + "hazelnut\n" + "pheasant\n" + "popsicle\n" + "prayer\n" + "ruffle\n" + "training\n" + "turmeric\n" +"affair\n" +
    "cone\n" + "derivative\n" + "fedelini\n" + "gearshift\n" + "manservant\n" + "mansion\n" + "softening\n" + "sympathy\n" + "veil\n" + "anarchy\n" + "campus\n" +
    "disguise\n" + "intervenor\n" + "manicure\n" + "morning\n" + "offence\n" + "peer\n" + "settler\n" + "trapezium\n "+ "abdomen\n" + "ability\n" + "abnormality\n" +
    "abortion\n" + "abrogation\n" + "absence\n" + "abundance\n" + "abuse\n" + "academics\n" + "academy\n" + "accelerant\n" + "accelerator\n" + "accent\n" + "acceptance\n" +
    "access\n" + "accessory\n" + "accident\n" + "accord\n" + "accordion\n" + "account\n" + "accountant\n" + "accounting\n" + "accuracy\n" + "accusation\n" + "acetate\n" +
    "achievement\n" + "achiever\n" + "acid\n" + "acorn\n" + "acoustics\n" + "acre\n" + "acrylic\n" + "act\n" + "ad\n" + "adaptation\n" + "adapter\n" + "addiction\n" +
    "addition\n" + "address\n" + "adjective\n" + "adjustment\n" + "admin\n" + "admission\n" + "adobe\n" + "adoption\n" + "adrenalin\n" + "adult\n" + "adulthood\n" +
    "advance\n" + "advancement\n" + "advantage\n" + "awe\n" + "axis\n" + "azimuth\n" + "babe\n" + "baboon\n" + "babushka\n" + "baby\n" + "bachelor\n" + "back\n" +
    "backbone\n" + "backburn\n" + "backdrop\n" + "background\n" + "backpack\n" + "backup\n" + "backyard\n" + "bacon\n" + "badge\n" + "badger\n" + "bag\n" + "bagel\n" + "baggage\n" +
    "baggie\n" + "bagpipe\n" + "bail\n" + "bait\n" + "bake\n" + "baker\n" + "bakery\n" + "balance\n" + "balcony\n" + "ball\n" + "ballet\n" + "balloon\n" + "ballot\n" + "ballpark\n" +
    "bamboo\n" + "ban\n" + "banana\n" + "band\n" + "bandana\n" + "bangle\n" + "banjo\n" + "bank\n" + "banker\n" + "banking\n" + "bankruptcy\n" + "banner\n" + "banquette\n" +
    "bar\n" + "barbeque\n" + "barber\n" + "bargain\n" + "baritone\n" + "bark\n" + "barn\n" + "bee\n" + "beef\n" + "beer\n" + "beetle\n" + "beggar\n" + "beheading\n" + "believer\n" +
    "bell\n" + "berry\n" + "bin\n" + "bird\n" + "bit\n" + "bite\n" + "blizzard\n" + "block\n" + "blush\n" + "boar\n" + "bongo\n" + "boot\n" + "bowling\n" + "box\n" + "branch\n" +
    "brand\n" + "bridge\n" + "broom\n" + "brother\n" + "bud\n" + "bump\n" + "bush\n" + "cabbage\n" + "cabin\n" + "cabinet\n" + "cable\n" + "cacao\n" + "calculator\n" + "camper\n" +
    "campus\n" + "canal\n" + "cancer\n" + "candy\n" + "car\n" + "care\n" + "career\n" + "carpenter\n" + "carrot\n" + "cart\n" + "cartoon\n" + "castle\n" + "cat\n" + "cattle\n" +
    "cereal\n" + "chef\n" + "chip\n" + "cicada\n" + "class\n" + "coat\n" + "cob\n" + "cook\n" + "cookie\n" + "corn\n" + "crew\n" + "crow\n" + "crowd\n" + "crown\n" + "cyclone\n" +
    "dance\n" + "dancer\n" + "dandelion\n" + "deadline\n" + "deal\n" + "dealer\n" + "deck\n" + "demon\n" + "demur\n" + "depression\n" + "designer\n" + "detector\n" + "detention\n" +
    "determination\n" + "dial\n" + "diamond\n" + "dignity\n" + "disk\n" + "doctor\n" + "donut\n" + "door\n" + "driver\n" + "duck\n" + "ear\n" + "ecology\n" + "elbow\n" +
    "election\n" + "electricity\n" + "email\n" + "enemy\n" + "energy\n" + "episode\n" + "evaporation\n" + "exhibition\n" + "eye\n" + "face\n" + "farm\n" + "fee\n" + "folk\n" +
    "font\n" + "food\n" + "frontier\n" + "frost\n" + "fruit\n" + "frustration\n" + "fry\n" + "gadget\n" + "gambling\n" + "game\n" + "garlic\n" + "genius\n" + "ghost\n" + "giraffe\n" +
    "glove\n" + "goal\n" + "goat\n" + "goose\n" + "gopher\n" + "gorilla\n" + "gravity\n" + "grocery\n" + "guilt\n" + "hail\n" + "hair\n" + "hamburger\n" + "hammock\n" + "hamster\n" +
    "hand\n" + "happiness\n" + "headache\n" + "heart\n" + "hedge\n" + "hemisphere\n" + "hiccups\n" + "history\n" + "honesty\n" + "horror\n" + "house\n" + "hunter\n" + "iceberg\n" +
    "igloo\n" + "index\n" + "ink\n" + "inn\n" + "insomnia\n" + "internet\n" + "issue\n" + "item\n" + "jail\n" + "jelly\n" + "jellybeans\n" + "jellyfish\n" + "journey\n" + "kayak\n" +
    "keyboard\n" + "kiss\n" + "koala\n" + "lamp\n" + "land\n" + "laughter\n" + "lecture\n" + "leopard\n" + "liberty\n" + "lion\n" + "livestock\n" + "lizard\n" + "llama\n" + "locket\n" +
    "macaroon\n" + "maggot\n" + "magic\n" + "magnet\n" + "male\n" + "marathon\n" + "marshmallow\n" + "member\n" + "microphone\n" + "milkshake\n" + "minion\n" + "missile\n" + "mocha\n" +
    "mochi\n" + "monster\n" + "moon\n" + "moth\n" + "mother\n" + "motion\n" + "motor\n" + "mushroom\n" + "mustache\n" + "mustard\n" + "mutton\n" + "napkin\n" + "nation\n" +
    "navigation\n" + "networking\n" + "nightmare\n" + "ninja\n" + "nit\n" + "noodles\n" + "nut\n" + "nymph\n" + "oak\n" + "oar\n" + "oasis\n" + "office\n" + "opinion\n" + "organ\n" +
    "ornament\n" + "oval\n" + "oxygen\n" + "palm\n" + "pan\n" + "pancake\n" + "panda\n" + "parade\n" + "parcel\n" + "payment\n" + "piano\n" + "pickle\n" + "pillow\n" +
    "planet\n" + "plant\n" + "popcorn\n" + "potato\n" + "prison\n" + "probe\n" + "proposal\n" + "publication\n" + "queen\n" + "quest\n" + "question\n" + "rabbit\n" +
    "raccoon\n" + "race\n" + "railroad\n" + "raspberry\n" + "rebellion\n" + "recipe\n" + "reindeer\n" + "rice\n" + "roast\n" + "rose\n" + "rumor\n" + "saloon\n" +
    "sand\n" + "sandal\n" + "scarf\n" + "seaweed\n" + "seller\n" + "shack\n" + "skeleton\n" + "ski\n" + "solution\n" + "soybean\n" + "spice\n" + "spider\n" + "spool\n" + "spoon\n" +
    "sport\n" + "spot\n" + "stack\n" + "statute\n" + "stroke\n" + "suburb\n" + "sunset\n" + "swamp\n" + "swan\n" + "tale\n" + "thief\n" + "ticket\n" + "tide\n" + "tie\n" +
    "tomato\n" + "tongue\n" + "toy\n" + "transport\n" + "trombone\n" + "tummy\n" + "tuna\n" + "turtle\n" + "tutu\n" + "twins\n" + "umbrella\n" + "uncle\n" + "unit\n" + "vane\n" +
    "vanilla\n" + "video\n" + "vitamin\n" + "volcano\n" + "volume\n" + "war\n" + "weed\n" + "whack\n" + "whale\n" + "wind\n" + "window\n" + "wine\n" + "witch\n" +
    "wolf\n" + "woman\n" + "work\n" + "world\n" + "xylophone\n" + "yacht\n" + "year\n" + "yeast\n" + "yellow\n" + "yoga\n" + "yogurt\n" + "zebra\n" + "zero\n" +
    "zombie\n" + "zone\n" + "zoo\n" + "zucchini";

var string_verbs= "crawl\tknit\tturn\n"+"arise\n" + "awake\n" + "be\n" + "bear\n" + "beat\n" + "become\n" + "begin\n" + "bend\n" + "bet\n" + "bind\n" + "bite\n" +
    "bleed\n" + "blow\n" + "break\n" + "breed\n" + "bring\n" + "broadcast\n" + "build\n" + "burn\n" + "burst\n" + "buy\n" + "can\n" + "catch\n" + "choose\n" +
    "cling\n" + "come\n" + "cost\n" + "creep\n" + "cut\n" + "deal\n" + "dig\n" + "do\n" + "draw\n" + "dream\n" + "drink\n" + "drive\n" + "eat\n" + "fall\n" + "feed\n" +
    "feel\n" + "fight\n" + "find\n" + "fly\n" + "forbid\n" + "forget\n" + "forgive\n" + "freeze\n" + "get\n" + "give\n" + "go\n" + "grind\n" + "grow\n" +
    "hang\n" + "have\n" + "hear\n" + "hide\n" + "hit\n" + "hold\n" + "hurt\n" + "keep\n" + "kneel\n" + "know\n" + "lay\n" + "lead\n" + "lean\n" + "learn\n" +
    "leave\n" + "lent\n" + "lie\n" + "light\n" + "lose\n" + "make\n" + "may\n" + "mean\n" + "meet\n" + "mow\n" + "overtake\n" + "pay\n" + "put\n" + "read\n" + "ride\n" +
    "ring\n" + "rise\n" + "run\n" + "saw\n" + "say\n" + "see\n" + "sell\n" + "send\n" + "set\n" + "sew\n" + "shake\n" + "shed\n" + "shine\n" + "shoot\n" + "show\n" + "shrink\n" +
    "shut\n" + "sing\n" + "sink\n" + "sit\n" + "sleep\n" + "slide\n" + "smell\n" + "sow\n" + "speak\n" + "spell\n" + "spend\n" + "spill\n" + "spit\n" + "spread\n" + "stand\n" +
    "steal\n" + "stick\n" + "sting\n" + "stink\n" + "strike\n" + "swear\n" + "sweep\n" + "swell\n" + "swim\n" + "swing\n" + "take\n" + "teach\n" + "tear\n" + "tell\n" + "trusted\n" +
    "trip\n" + "understand\n" + "wake\n" + "wear\n" + "weep\n" + "winked\n" + "wind\n" + "write\n" + "went\n" + "admit\n" + "advise\n" + "anticipate\n" + "acknowledge\n" + "appreciate\n" +
    "avoid\n" + "buy\n" + "bought\n" + "complete\n" + "consider\n" + "defer\n" + "delay\n" + "deny\n" + "discuss\n" + "dislike\n" + "enjoy\n" + "entail\n" + "finish\n" + "forget\n" +
    "hate\n" + "intend\n" + "involve\n" + "justify\n" + "keep\n" + "kept\n" + "like\n" + "love\n" + "mention\n" + "mind\n" + "miss\n" + "postpone\n" + "practice\n" + "prefer\n" + "quit\n" +
    "recall\n" + "recollect\n" + "recommend\n" + "regret\n" + "resent\n" + "resist\n" + "risk\n" + "sanction\n" + "start\n" + "stop\n" + "suggest\n" + "tolerate\n" + "try\n"+
    "afford\n" + "agree\n" + "aim\n" + "appear\n" + "attempt\n" + "ask\n" + "arrange\n" + "beg\n" + "begin\n" + "care\n" + "choose\n" + "claim\n" + "consent\n" + "continue\n" +
    "dare\n" + "decide\n" + "demand\n" + "deserve\n" + "disliked\n" + "expect\n" + "fail\n" + "forget\n" + "grop\n" + "hesitate\n" + "hope\n" + "hurry\n" + "intended\n" +
    "learn\n" + "liked\n" + "loved\n" + "manage\n" + "mean\n" + "neglect\n" + "need\n" + "offer\n" + "plan\n" + "prefer\n" + "prepare\n" + "pretend\n" + "proceed\n" +
    "promise\n" + "propose\n" + "refuse\n" + "remember\n" + "seem\n" + "start\n" + "stop\n" + "struggle\n" + "swear\n" + "threaten\n" + "yell\n" + "volunteer\n" + "wait\n" +
    "want\n" + "wish\n" + "bathe\n"+ "eat\n" + "sleep\n" + "bow\tsay\tsmell\n" + "buy\tfly\tsnore\n" + "clap\tgive\tstack\n" + "climb\thug\tsmack\n" + "close\tjump\ttold\n" +
    "cook\tkiss\tturn\n"  + "cry\tlaugh\tthink\n" + "cut\tlisten\tthrow\n" + "dance\topen\twait\n" + "dig\tpaint\twash\n" +
    "dive\tplay\twatch\n" + "dream\tread\twin\n" + "drink\tride\twrite\n" + "shake\tsew\tsing\n"+ "add\tpeel\n" + "bake\tpinch\n" + "barbecue\tpour\n" +
    "boil\troast\n" + "break\troll\n ride\n" + "cut\tsaute\n" + "chop\tslice\n" + "fry\tspread\n" + "grate\tsteam\n" + "layer\tstir\n" + "Mmlt\ttaste\n" + "mix\tweigh\n" +
    "give\n" + "drink\n" + "serve\n" + "pay\n" + "eat\n" + "cook\n" + "hold\n" + "light\n" + "order\n" + "spread\n" + "lift\n" + "write\n" + "slice\n" + "stack\n" + "set/n"+
    "bend\tpass\n" + "bounce\tride\n" + "catch\trun\n" + "dribble\tserve\n" + "hit\tshoot\n" + "hop\tsit\n" + "jump\tskip\n" + "kick\tstretch\n" + "kneel\tthrow\n" +
    "lie\twalk"+ "ask\topen\n" + "calculate\tpaint\n" + "close\tplay\n" + "count\tread\n" + "cut\tsay\n" + "draw\tshow\n" + "experiment\tsing\n" + "explain\tspell\n" +
    "give\tstudy\n" + "listen\tteach\n" + "observe\tthink" +"was\n were\n is\n are \n go \n get \n got";








function weatherinfo(x){
    let keyWord = x;
    var string_word;
    switch (keyWord) {
        case "clear":
            string_word= "<span class='norm'>Clear  </span> ("+ list_array[i].weather.description + ") <br>" ;
            break;
        case "cloud":
            string_word= "<span class='norm'>Clouds  </span> ("+ list_array[i].weather.description + ") <br>"+
                "<span class='norm'>Clouds Coverage  </span>" + list_array[i].clouds.all
                + "% <br>" ;
            break;
        case "rain":
            string_word= "<span class='norm'>Rain  </span> ("+ list_array[i].weather.description + ") <br>"+
                "<span class='norm'>Rain Total </span> (over 3 hours)  " + list_array[i].rain.3h + "mm <br>" ;
            break;
        case "snow":
            string_word= "<span class='norm'>Snow  </span> ("+ list_array[i].weather.description + ") <br>"+
                "<span class='norm'>Snow Total </span> (over 3 hours)  " + list_array[i].snow.3h + "mm <br>" ;
            break;
            break;
    }
    return string_word;
}


/*

let wind_img= imageGrab("wind");
let wind = document.createElement("p");
wind.innerHTML=  "<span class='norm'>Humidity:  </span>"+ list_array[i].wind.speed + " miles/hour <br>";
wind.classList.add("type_words");
weather_holder_days.appendChild(wind_img);
weather_holder_days.appendChild(wind);


let word= list_array[i].weather.main;
let  cloud_precip_img= imageGrab(word);
let  cloud_precip = document.createElement("p");
cloud_precip.innerHTML= weatherinfo(word);
cloud_precip.classList.add("type_words");
weather_holder_days.appendChild(cloud_precip_img);
weather_holder_days.appendChild(cloud_precip);



weatherHolder.appendChild(weather_holder_days);
*/