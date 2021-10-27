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
const audio = new Audio("audio/mixkit-mouse-click-close-1113.wav");

// Изменяемые параметры
let counter = 1;

// Timer
class timer {
    constructor(name, hours, minutes, seconds, milliseconds){
        this.name = name
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.milliseconds = milliseconds;
        this.status = true;
    }

    renewTime(){
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        secondsContainer.textContent = "0" + 0;
        minutesContainer.textContent = "0" + 0;
        hoursContainer.textContent = "0" + 0;
        millisecsContainer.textContent = "00" + 0;
    }

    riseSeconds(){
        this.seconds++;
        if(this.seconds <= 59){
            if(this.seconds < 10){
                secondsContainer.textContent = `0` + this.seconds;
            } else {
                secondsContainer.textContent = this.seconds;
            }
        } else {
            // Если значение секунд более 59 =>
            // Увеличиваем значение минут на 1, обновляем и выводим значение секунд
            this.seconds = 0;
            secondsContainer.textContent = "0" + this.seconds;
            this.riseMinutes();
        } 
    }

    riseMinutes(){
        this.minutes++;
        if(this.minutes <= 59){
            if(this.minutes < 10){
                minutesContainer.textContent = `0` + this.minutes;
            } else {
                minutesContainer.textContent = this.minutes;
            }
        } else {
            // Если значение минут более 59 =>
            // Увеличиваем значение часов на 1, обновляем и выводим значение минут
            this.minutes = 0;
            minutesContainer.textContent = "0" + this.minutes;
            this.riseHours()
        }
    }

    riseHours(){
        this.hours++;
        if(this.hours < 10){
            hoursContainer.textContent = `0` + this.hours;
        } else {
            hoursContainer.textContent = this.hours;
        }
    }
}

const stopwatchTimer = new timer('Stopwatch', 0, 0, 0, 0);

// Запуск секундомера при нажатии на кнопку "Start"
startButton.addEventListener("click", () => {
    if(stopwatchTimer.status){

        stopwatchTimer.status = false; // Запрещаем повторное срабатывание кнопки "Start"

        setButton.removeAttribute("disabled") // Включаем кнопку Set

        // Устанавливаем начальное значение секунд, минут и часов
        if(stopwatchTimer.seconds < 10){
            secondsContainer.textContent = `0` + stopwatchTimer.seconds;
        } else {
            secondsContainer.textContent = stopwatchTimer.seconds;
        }

        if(stopwatchTimer.minutes < 10){
            minutesContainer.textContent = `0` + stopwatchTimer.minutes;
        } else {
            minutesContainer.textContent = stopwatchTimer.minutes;
        }

        if(stopwatchTimer.hours < 10){
            hoursContainer.textContent = `0` + stopwatchTimer.hours;
        } else {
            hoursContainer.textContent = stopwatchTimer.hours;
        }

        // Устанавливаем интервал обновления миллисекунд
        // Каждые 10 миллисекунд увеличиваем значение на 10
        let millisecondsInt = setInterval(() => {
            stopwatchTimer.milliseconds = stopwatchTimer.milliseconds + 10;

            if(stopwatchTimer.milliseconds < 999){
                if(stopwatchTimer.milliseconds < 10){
                    millisecsContainer.textContent = "00" + stopwatchTimer.milliseconds;
                } else {
                    if(stopwatchTimer.milliseconds < 100){
                        millisecsContainer.textContent = "0" + stopwatchTimer.milliseconds;
                    } else {
                        millisecsContainer.textContent = stopwatchTimer.milliseconds;
                    }
                }
                
                
            } else {
                // Если значение миллисекунд более 999 =>
                // Увеличиваем значение секунд на 1 и обновляем значение миллисекунд
                stopwatchTimer.riseSeconds();
                stopwatchTimer.milliseconds = 0;
            }
        },10)

        // Остановка секундомера при нажатии на кнопку "Stop"
        stopButton.addEventListener("click", function(){

            clearInterval(millisecondsInt);

            stopwatchTimer.status = true; // Разрешаем повторное срабатывание кнопки "Start"
        });

        // Обнуление секундомера при нажатии на кнопку "Clear"
        clearButton.addEventListener("click", function(){

            clearInterval(millisecondsInt);

            // Выключаем кнопку Set
            setButton.setAttribute("disabled", "disabled")

            // Устанавливаем значение блока и переменных на 0
            stopwatchTimer.renewTime();

            // Обнуляем промежуточные значения выведенные через кнопку "Set"
            setTimeBlock.textContent = "";
            counter = 1; // Обнуляем счетчик выведенных значений

            stopwatchTimer.status = true; // Разрешаем повторное срабатывание кнопки "Start"
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