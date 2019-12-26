
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    // let data = {};

    // const getResource = async (url) => {
    //     const res = await fetch(url);

    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }

    //     return await res.json();
    // }

    // getResource(' http://localhost:3000/questions')
    //     .then(res => data = res)

    const btnOpenModal = document.getElementById('btnOpenModal');
    const modalBlock = document.getElementById('modalBlock');
    const btnCloseModal = document.getElementById('closeModal');

    const questionOutput = document.getElementById('question');
    const answersOutput = document.getElementById('formAnswers');

    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const send = document.getElementById('send');

    btnOpenModal.addEventListener('click', () => {
        modalBlock.style.display = 'block';
        playTest();
    })

    btnCloseModal.addEventListener('click', () => {
        modalBlock.style.display = 'none';
    })

    document.addEventListener('click', (e) => {
        let target = e.target;

        if (target.classList.contains('modal')) {
            modalBlock.style.display = 'none';
        }
    })

    const playTest = () => {
        let numberQuestion = 0;


        // функция выдает нам элементы ответов для отрисовки
        const renderQiestions = (numberQuestion) => {
            questions[numberQuestion].answers.forEach((answer, index) => {

                const itemBlock = document.createElement('div');
                itemBlock.classList.add('answers-item', 'd-flex', 'justify-content-center');

                itemBlock.innerHTML = `
                    <input type="${questions[numberQuestion].type}" id="answerItem${index}" name="answer" class="d-none">
                    <label for="answerItem${index}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src=${answer.url} alt="burger">
                        <span>${answer.title}</span>
                     </label>
                `
                answersOutput.appendChild(itemBlock);
            })

        }

        // вывод информации в элементы окна
        const renderQuestion = (numberQuestion) => {
            answersOutput.innerHTML = '';

            questionOutput.textContent = questions[numberQuestion].question;
            renderQiestions(numberQuestion);

            if (numberQuestion === 0) {
                prev.classList.add('d-none')
            }

            if (numberQuestion > 0 && numberQuestion < questions.length - 1) {
                prev.classList.remove('d-none')
                next.classList.remove('d-none')
            }

            if (numberQuestion === questions.length - 1) {
                next.classList.add('d-none')
            }
        }

        next.addEventListener('click', () => {
            numberQuestion++;
            renderQuestion(numberQuestion)
        })

        prev.addEventListener('click', () => {
            numberQuestion--;
            renderQuestion(numberQuestion)
        })

        // сразу запускаем отрисовку 
        renderQuestion(numberQuestion);
    }
})