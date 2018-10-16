let questions=[
    {
        question:"Która z planet Układu Słonecznego jest najmniejsza?",
        answers:["Mars","Wenus","Merkury","Neptun"],
        correct:[2]
    },
    {
        question:"Czym zajmuje się myrmekolog?",
        answers:["ptakami","motylami","dżdżownicami","mrówkami"],
        correct:[3]
    },
    {
        question:"W składzie chemicznym pełnego mleka krowiego największy udział ma:",
        answers:["białko","tłuszcz","laktoza","woda"],
        correct:[3]
    },
    {
        question:"Premierem RP była",
        answers:["Henryka Bochniarz","Hanna Suchocka","Jolanta Kwaśniewska","Hanna Gronkiewicz-Waltz"],
        correct:[1]
    },
    {
        question:"Kto opatentował żarówkę?",
        answers:["Aleksander Fleming","Albert Einstein","Thomas Edison","James Watt"],
        correct:[2]
    },
    {
        question:"Litr chłodnej wody waży w przybliżeniu:",
        answers:["2 dekagramy","10 funtów","10 uncji","kilogram"],
        correct:[3]
    },
    {
        question:"Jaką część liter w wyrazie BAJZEL stanowią samogłoski?",
        answers:["jedną trzecią","jedną piątą","jedną drugą","jedną czwartą"],
        correct:[0]
    },
    {
        question:"Co ma na nogach panczenista?",
        answers:["korki","narty","łyżwy","płetwy"],
        correct:[2]
    },
    {
        question:"Agata Duda witała się ze swoimi uczniami, mówiąc:",
        answers:["Guten Morgen","Good morning","Bonjour","Buongiorno"],
        correct:[0]
    },
    {
        question:"Na ile pytań już odpowiedziałeś?",
        answers:["7","8","9","10"],
        correct:[2]
    },
];
let currentQuestion=0;
let answerList=[];
let result=0;
let currentAnswer=[];
(()=>{
    setQuestionValues();
    localStorage.setItem("answers",JSON.stringify([]));
    localStorage.setItem("results",JSON.stringify([]));
})();
 function printOut(e){
    e.preventDefault();
    answerList.push(currentAnswer.slice());
    currentQuestion++;
    document.getElementsByClassName("progress-bar").item(0).style.width=currentQuestion/questions.length*100+"%";
    if(currentQuestion>=questions.length){
        finishQuiz();
    } else{
        setQuestionValues();
    }
	document.getElementById("ans1").checked=false;
	document.getElementById("ans2").checked=false;
	document.getElementById("ans3").checked=false;
	document.getElementById("ans4").checked=false;
}
function setQuestionValues(){
    document.getElementById("question").innerText=questions[currentQuestion].question;
    for(let i=0;i<questions[currentQuestion].answers.length;i++){
        document.getElementById("ans"+i+"txt").innerText=questions[currentQuestion].answers[i];
    }
}
function finishQuiz(){
    document.getElementsByClassName("custom-style-quiz").item(0).classList.add("hidden");
    document.getElementsByClassName("results").item(0).classList.remove("hidden");
    let count=0;
    for(let i=0;i<answerList.length;i++){
        if(JSON.stringify(questions[i].correct)===JSON.stringify(answerList[i])){
            count++;
        }
    }
    result=(count/questions.length*100).toFixed(2);
    document.getElementsByClassName("result-text").item(0).innerHTML="Odpowiedziałeś poprawnie na "+result+" % pytań.";
}
function retry(){
    document.getElementsByClassName("custom-style-quiz").item(0).classList.remove("hidden");
    document.getElementsByClassName("results").item(0).classList.add("hidden");
    currentQuestion=0;
    document.getElementsByClassName("progress-bar").item(0).style.width=currentQuestion/questions.length*100+"%";
    let ans = JSON.parse(localStorage.getItem("answers"));
    let res = JSON.parse(localStorage.getItem("results"));
    ans.push(answerList);
    res.push(result);
    localStorage.setItem("answers",JSON.stringify(ans));
    localStorage.setItem("results",JSON.stringify(res));
    answerList=[];
    setQuestionValues();
}
function set(value){
    if(currentAnswer.includes(value)){
        currentAnswer.splice(currentAnswer.indexOf(value),1);
    } else{
        currentAnswer.push(value);
    }
} 