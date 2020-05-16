
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
    
    const animateModal = () => {
        modalDialog.style.top = count + "%";
        count += 4;
          
        if (count < 0) {
            requestAnimationFrame(animateModal);

        } else {
            count = -100;
        }
    };

    const playTest = () => {

        let numberQuestion = 0;

        const renderAnswers = (index) => {

            if (numberQuestion === 0) {
                prevButton.style.display = 'none';
            }

            if (numberQuestion > 0) {
                prevButton.style.display = 'block';
            }

            if (numberQuestion === questions.length - 1) {
                nextButton.style.display = 'none';
            }

            questions[index].answers.forEach((answer) => {

                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

                answerItem.innerHTML = `
                            <input type="${questions[index].type}" id="${answer.id}" name="answer" class="d-none">
                            <label for="${answer.id}" class="d-flex flex-column justify-content-between">
                            <img class="answerImg" src=${answer.url} alt="burger">
                            <span>${answer.title}</span>
                            </label>
                            `
                formAnswers.appendChild(answerItem);
            })
        }

        const renderQuestions = (indexQuestion) => {

            formAnswers.textContent = '';

            questionTitle.textContent = `${questions[indexQuestion].question}`

            renderAnswers(indexQuestion);
        }
        renderQuestions(numberQuestion);


        nextButton.onclick = () => {
            numberQuestion++;
            renderQuestions(numberQuestion);
        }

        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        }
    }


    burger.addEventListener('click', function () {
        requestAnimationFrame(animateModal);

        burger.classList.add('active');
        modalBlock.classList.add('d-block');
        playTest();
    })

    btnOpenModal.addEventListener('click', () => {
        requestAnimationFrame(animateModal);

        modalBlock.classList.add('d-block');
        playTest();
    })

    document.addEventListener('click', (e) => {

        const target = e.target

        if (!target.closest('.modal-dialog') && !target.closest('#btnOpenModal') && !target.closest('.burger')) {
            modalBlock.classList.remove('d-block');
            burger.classList.remove('active');
        }
    })

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
        burger.classList.remove('active');
    })


})