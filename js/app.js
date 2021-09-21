if (localStorage.getItem("correctAnswer") != undefined)
    localStorage.removeItem("correctAnswer");

if (localStorage.getItem("score") != undefined)
    localStorage.removeItem("score");

    if (localStorage.getItem("numPregunta") != undefined)
    localStorage.removeItem("numPregunta");

function beginApp()
{
    const app = document.getElementById("app");
    localStorage.setItem("score", "0");
    app.innerHTML = getQuestion();
}

function printQuestion(enunciado, respuesta1, respuesta2, respuesta3, respuesta4)
{
    return `<h3>${enunciado}</h3>
    <button id="respuesta1" class="btn-answer" onclick="Answer('a')">${respuesta1}</button>
    <button id="respuesta2" class="btn-answer" onclick="Answer('b')">${respuesta2}</button>
    <button id="respuesta3" class="btn-answer" onclick="Answer('c')">${respuesta3}</button>
    <button id="respuesta4" class="btn-answer" onclick="Answer('d')">${respuesta4}</button>`;
}

function getQuestion()
{
    const total = preguntas.length;
    const numPregunta = getRandomArbitrary(total) - 1;
    const selPregunta = preguntas[numPregunta];
    const enunciado = selPregunta.pregunta;
    const respuesta1 = selPregunta.respuesta1.respuesta;
    const respuesta2 = selPregunta.respuesta2.respuesta;
    const respuesta3 = selPregunta.respuesta3.respuesta;
    const respuesta4 = selPregunta.respuesta4.respuesta;

    console.log(selPregunta);

    if (selPregunta.respuesta1.correctAnswer)
        localStorage.setItem("correctAnswer", "a");
    else if (selPregunta.respuesta2.correctAnswer)
        localStorage.setItem("correctAnswer", "b");
    else if (selPregunta.respuesta3.correctAnswer)
        localStorage.setItem("correctAnswer", "c");
    else if (selPregunta.respuesta4.correctAnswer)
        localStorage.setItem("correctAnswer", "d");

    localStorage.setItem("numPregunta", numPregunta);

    return printQuestion(enunciado, respuesta1, respuesta2, respuesta3, respuesta4);
}

function Answer(ans){
    const app = document.getElementById("app");

    if (localStorage.getItem("correctAnswer") === ans) {
        const score = parseInt(localStorage.getItem("score")) + 10;
        const numPregunta = parseInt(localStorage.getItem("numPregunta"));

        console.log(numPregunta);

        preguntas.splice(numPregunta, 1);

        if (score === 50)
            app.innerHTML = youWin(score);
        else
        {
            localStorage.setItem("score", score);
            app.innerHTML = getQuestion();
        }
    }
    else
        app.innerHTML = youLose(score);
}

function youWin(score)
{
    return `<h2>Felicidades has ganado</h2>
    <h3>Puntuación: ${score} puntos</h3>`;
}

function youLose()
{
    return `<h2>Lo sentimos, suerte para la proxima</h2>
    <h3>Puntuación: ${score} puntos</h3>`;
}

function getRandomArbitrary(max) {
    return Math.floor(Math.random() * max) + 1;
}