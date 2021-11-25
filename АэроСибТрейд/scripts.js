//Глобальные функции
function setImage(image, elementId){
    document.getElementById(elementId).src = image;
}

function toggleClass(element, className){
    let containClass = () => element.classList.contains(className);

    if(!containClass()){ //Если не содержит и сказано класс добавить
        element.classList.add(className);
    }
    else if(containClass()){ //Иначе, удаляем
        element.classList.remove(className);
    }
}

function addClass(element, className){
    element.classList.add(className);
}

function removeClass(element, className){
    element.classList.remove(className);
}

function setClass(element, className, remove){
    if(remove){
        element.classList.remove(className);
    }
    else{
        element.classList.add(className);
    }
}

function copyText(text, msg){
    navigator.clipboard.writeText(text);
    alert(msg);
}

function validate(element, regexInd){
    return reg[regexInd].test(element.value);
}

    //Заготовки заказов
    let blanks = [
        "Заказ:\nРукава, муфты, хамуты, гайки, болты и тд",
        "Заказ:\nКольца уплотнительные, манжеты, прокладки",
        "Заказ:\nВинты, гайки, шайбы, заклепки по ОСТ1",
        "Заказ:\nНасосы, реле, свечезажигатели, антены и т.д.",
    ]

function setText(element, blankId){
    element.value = blanks[blankId];
}
    
    //Регулярные выражения для валидации данных
    let reg = [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ]   

//Слайдшоу
let curimage = 0;
let introimages = [
    "images/introimage0.png",
    "images/introimage1.jpg",
    "images/introimage2.png"
];

function changeIntroImage(){
    curimage++;
    if(curimage == introimages.length){
        curimage = 0;
    }

    //Смена картинки
    setImage(introimages[curimage], 'intro-image');
}
setInterval(changeIntroImage, 15000);

//Якорные точки
function setAnchors() {
    const anchors = document.querySelectorAll('a[href^="#"]');

    for(let anchor of anchors){
        anchor.addEventListener("click", function(event){
            event.preventDefault();
            const blockID = anchor.getAttribute('href');
            document.querySelector('' + blockID).scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        });
    }
}

//Пластичный хэдр + иконка мыши
let lastScroll = 0;

function updateHeader(){
    const header = document.querySelector('.header');
    const mouse_ico = document.querySelector('.mouseicon');

    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containClass = () => header.classList.contains('hidden');

    window.addEventListener('scroll', () =>{

        if(scrollPosition() > lastScroll && !containClass()){ //Скролим вниз
            addClass(header, 'hidden');
            addClass(mouse_ico, 'hidden');
        }
        if(scrollPosition() < lastScroll && containClass()){ //Скролим вверх
            removeClass(header, 'hidden');
            removeClass(mouse_ico, 'hidden');
        }
        removeClass(document.getElementById('production-button'), 'active');

        lastScroll = scrollPosition();
    })
}

//отправка email
function sendMail(){
    var mailArea = document.getElementById('email-email');
    var nameArea = document.getElementById('email-name');
    var msgArea = document.getElementById('email-message');

    //Валидация данных
    var valMail = validate(mailArea, 0);
    var valName = () => (nameArea.value.length > 0)
    var valMsg = () => (msgArea.value.length > 0)

    setClass(document.getElementById('email-email').parentNode, 'mistake', valMail);
    setClass(document.getElementById('email-name').parentNode, 'mistake', valName());
    setClass(document.getElementById('email-message').parentNode, 'mistake', valMsg())

    if(!valMail || !valName() || !valMsg()){
        return;
    }

    //Отправка письма

    //Если успешно
        //Очистка полей
            mailArea.value = "";
            nameArea.value = "";
            msgArea.value = "";
        //Уведомление
            alert("Сообщение успешно отправлено");
    //Иначе
        //Уведомление
}

//////
function start(){
    setAnchors();
}

setTimeout(start, 0);

function update(){
    updateHeader();
}

setInterval(update, 100);