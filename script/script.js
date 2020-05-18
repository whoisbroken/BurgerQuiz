// upload of DOM tree before action taken
document.addEventListener('DOMContentLoaded', function () {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const burger = document.querySelector('.burger');
    const nextButton = document.querySelector('#next')
    const prevButton = document.querySelector('#prev');
    const modalDialog = document.querySelector('.modal-dialog');
    const send = document.getElementById('send');

    // array of objects with questions
    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    id: 1,
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    id: 2,
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
                    id: 1,
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    id: 2,
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    id: 3,
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
                    id: 1,
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    id: 2,
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    id: 3,
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    id: 4,
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
                    id: 1,
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    id: 2,
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    id: 3,
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    let count = -100;

    modalDialog.style.top = count + "%";

    // animate modal
    const animateModal = () => {
        modalDialog.style.top = count + "%";
        count += 4;

        if (count < 0) {
            requestAnimationFrame(animateModal);

        } else {
            count = -100;
        }
    };

    // start of testing
    const playTest = () => {

        const finalAnswers = [];

        let numberQuestion = 0;

        const renderAnswers = (index) => {

            questions[index].answers.forEach((answer) => {

                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

                answerItem.innerHTML = `
                            <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                            <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                            <img class="answerImg" src=${answer.url} alt="burger">
                            <span>${answer.title}</span>
                            </label>
                            `
                formAnswers.appendChild(answerItem);
            })
        }

        // запуск функции рендеринга
        const renderQuestions = (indexQuestion) => {

            formAnswers.textContent = '';

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {

                questionTitle.textContent = `${questions[indexQuestion].question}`

                renderAnswers(indexQuestion);

                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none');
                send.classList.add('d-none');
            }

            if (numberQuestion === 0) {
                prevButton.classList.add('d-none');
                send.classList.remove('d-block');
            }

            if (numberQuestion === questions.length) {
                questionTitle.textContent = '';
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                formAnswers.textContent = 'Thanks!';
                send.classList.add('d-block');

                formAnswers.innerHTML = `
                <div class="form-group">
                    <label for="exampleInputPassword1">Enter your phone</label>
                    <input type="text" class="form-control" id="numberPhone">
                </div>
                `
            }
            if (numberQuestion === questions.length + 1) {
                formAnswers.textContent = "Спасибо за пройденный тест!"
                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                }, 2000)
            }
        }
        renderQuestions(numberQuestion);

        const checkAnswer = () => {
            const obj = {};
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === "numberPhone");

            inputs.forEach((input, index) => {
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }
                if (numberQuestion === questions.length) {
                    obj['Номер телефона'] = input.value;
                }
            })
            finalAnswers.push(obj);
        }

        // обработчики событий кнопок next и prev
        nextButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        }

        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        }
        send.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        }
    }

    // обработчик события бургер меню 
    burger.addEventListener('click', function () {
        requestAnimationFrame(animateModal);

        burger.classList.add('active');
        modalBlock.classList.add('d-block');
        playTest();
    })

    // обработчик события для начала теста
    btnOpenModal.addEventListener('click', () => {
        requestAnimationFrame(animateModal);

        modalBlock.classList.add('d-block');
        playTest();
    })

    // обработчик события для закрытия моадльного окна или бургер меню по клику на произвольное место
    document.addEventListener('click', (e) => {

        const target = e.target

        if (!target.closest('.modal-dialog') && !target.closest('#btnOpenModal') && !target.closest('.burger')) {
            modalBlock.classList.remove('d-block');
            burger.classList.remove('active');
        }
    })

    // обработчик события для закрытия моадльного окна или бургер меню
    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
        burger.classList.remove('active');
    })

})