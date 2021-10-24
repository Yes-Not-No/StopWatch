// Контейнеры
const contentTime = document.querySelector(".content_time"),
      millisecsContainer = document.querySelector(".content_millisecs"),
      secondsContainer = document.querySelector(".time_seconds"),
      minutesContainer = document.querySelector(".time_minutes"),
      hoursContainer = document.querySelector(".time_hours"),
      setTimeBlock = document.querySelector(".timer_setTime");

// Кнопки
const startButton = document.querySelector(".timer_startButton"),
      setButton = document.querySelector(".timer_setButton"),
      clearButton = document.querySelector(".timer_clearButton"),
      stopButton = document.querySelector(".timer_stopButton"),
      changeModeButton = document.querySelector(".change-mode"),
      changeModePoint = document.querySelector(".change-mode_point");

// Аудио
const audio = new Audio("audio/mixkit-mouse-click-close-1113.wav"),
      clickClackSoundFx = new Audio("audio/02613.mp3");

// Изменяемые параметры
let seconds = 0,
    minutes = 0,
    hours = 0,
    milliseconds = 0,
    counter = 1,
    startAccess = true; // Добавил, чтобы исключить возможность запуска нескольких интервалов сразу

// Запуск секундомера при нажатии на кнопку "Start"
startButton.addEventListener("click", () => {
    if(startAccess){

        startAccess = false; // Запрещаем повторное срабатывание кнопки "Start"

        clickClackSoundFx.play(); // Запуск звука работающих часов

        setButton.removeAttribute("disabled") // Включаем кнопку установки промежуточных значений

        // Устанавливаем начальное значение секунд, минут и часов
        if(seconds < 10){
            secondsContainer.textContent = `0` + seconds;
        } else {
            secondsContainer.textContent = seconds;
        }

        if(minutes < 10){
            minutesContainer.textContent = `0` + minutes;
        } else {
            minutesContainer.textContent = minutes;
        }

        if(minutes < 10){
            hoursContainer.textContent = `0` + hours;
        } else {
            hoursContainer.textContent = hours;
        }

        // Устанавливаем интервал обновления миллисекунд
        // Каждые 10 миллисекунд увеличиваем значение на 10
        let millisecondsInt = setInterval(() => {
            milliseconds = milliseconds + 10;

            if(milliseconds < 999){
                if(milliseconds < 10){
                    millisecsContainer.textContent = "00" + milliseconds;
                } else {
                    if(milliseconds < 100){
                        millisecsContainer.textContent = "0" + milliseconds;
                    } else {
                        millisecsContainer.textContent = milliseconds;
                    }
                }
                
                
            } else {
                // Если значение миллисекунд более 999 =>
                // Увеличиваем значение секунд на 1 и обновляем значение миллисекунд
                riseSeconds();
                milliseconds = 0;
            }
        },10)

        // Функция увеличения значения секунд
        const riseSeconds = () => {
            seconds++;
            if(seconds <= 59){
                if(seconds < 10){
                    secondsContainer.textContent = `0` + seconds;
                } else {
                    secondsContainer.textContent = seconds;
                }
            } else {
                // Если значение секунд более 59 =>
                // Увеличиваем значение минут на 1, обновляем и выводим значение секунд
                seconds = 0;
                secondsContainer.textContent = "0" + seconds;
                riseMinutes();
            } 
        }

        // Функция увеличения значения минут
        const riseMinutes = () => {
            minutes++;
            if(minutes <= 59){
                if(minutes < 10){
                    minutesContainer.textContent = `0` + minutes;
                } else {
                    minutesContainer.textContent = minutes;
                }
            } else {
                // Если значение минут более 59 =>
                // Увеличиваем значение часов на 1, обновляем и выводим значение минут
                minutes = 0;
                minutesContainer.textContent = "0" + minutes;
                riseHours()
            }
        }

        // Фнукция увеличения значения часов
        const riseHours = () => {
            hours++;
            if(minutes < 10){
                hoursContainer.textContent = `0` + hours;
            } else {
                hoursContainer.textContent = hours;
            }
        }

        // Остановка секундомера при нажатии на кнопку "Stop"
        stopButton.addEventListener("click", function(){

            clearInterval(millisecondsInt);

            clickClackSoundFx.pause();

            startAccess = true; // Разрешаем повторное срабатывание кнопки "Start"
        });

        // Обнуление секундомера при нажатии на кнопку "Clear"
        clearButton.addEventListener("click", function(){

            clearInterval(millisecondsInt);

            clickClackSoundFx.load()

            // Включаем кнопку установки промежуточных значений
            setButton.setAttribute("disabled", "disabled")

            // Устанавливаем значение блока и переменных на 0
            secondsContainer.textContent = "0" + 0;
            minutesContainer.textContent = "0" + 0;
            hoursContainer.textContent = "0" + 0;
            millisecsContainer.textContent = "00" + 0;
            seconds = 0;
            minutes = 0;
            hours = 0;

            // Обнуляем промежуточные значения выведенные через кнопку "Set"
            setTimeBlock.textContent = "";
            counter = 1; // Обнуляем счетчик выведенных значений

            startAccess = true; // Разрешаем повторное срабатывание кнопки "Start"
        });
    }
});

// Вывод промежуточных значений секундомера при нажатии на кнопку "Set"
setButton.addEventListener("click", function(){
    const setTimeElement = document.createElement("div");
    setTimeBlock.append(setTimeElement);
    setTimeElement.textContent = `${counter}. ${hoursContainer.textContent} : ${minutesContainer.textContent} : ${secondsContainer.textContent}.${millisecsContainer.textContent}`;
    counter++;
});

// Переключение режимов приложения
changeModeButton.addEventListener("click", function(){
    if(changeModePoint.classList.contains("change-mode_point--time")){
        changeModePoint.classList.add("change-mode_point--stopwatch");
        changeModePoint.classList.remove("change-mode_point--time");
        changeModeButton.style.justifyContent = "flex-end";
    } else {
        changeModePoint.classList.remove("change-mode_point--stopwatch");
        changeModePoint.classList.add("change-mode_point--time");
        changeModeButton.style.justifyContent = "flex-start";
    }
});

// Устанавливаем звуковой сигнал при переключении режимов
changeModeButton.addEventListener("mousedown", function(){
    audio.load();
    audio.play();
});