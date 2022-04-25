//переменные для врапперов карты
const svg = document.querySelector('#svg-template');
const templateDiv = document.querySelector('.map__template');
const completeDiv = document.querySelector('.map__complete');
const svgCoord = svg.getBoundingClientRect();

//контейнерам размеры svg карты
[templateDiv,completeDiv].forEach((el)=> {
    el.style.width = `${svg.clientWidth}px`;
    el.style.height = `${svg.clientHeight}px`;
});

//переменные для кусков
const partsDiv = document.querySelectorAll('.map__part');
const parts = document.querySelectorAll('img');
//контейнеры кусков равны размеру внутри
Array.from(parts).forEach((el,id)=> {
    const x = partsDiv[id].dataset.xxx;
    const y = partsDiv[id].dataset.yyy;
    partsDiv[id].style.top = `${y}px`;
    partsDiv[id].style.left = `${x}px`;
});
templateDiv.style.opacity = '1';

//клик по кнопке
document.addEventListener('click', function (event) {
    const target = event.target.closest('.button');
    if(target === null) return;
    templateDiv.classList.add('map__template_crashed')
});


document.addEventListener('mousedown', function (event) {
    const target = event.target.closest('.map__part');
    if(target === null) return;
    //предотвращение стандартного поведения
    event.preventDefault();
    target.ondragstart = function() {
        return false;
    };
    console.log('target',target);

    const targetCoord = target.getBoundingClientRect();
    let shiftX = event.clientX - targetCoord.left;
    let shiftY = event.clientY - targetCoord.top;
    target.style.position = 'absolute';
    target.style.zIndex = '100';

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        let newX = pageX - shiftX;
        let newY = pageY - shiftY;

        //ограниечение перетаскивания за окно по оси х
        if (newX<0) newX = 0;
        else if (newX>document.documentElement.clientWidth - target.offsetWidth) {
            newX = document.documentElement.clientWidth - target.offsetWidth;
        }
        if (newY<0) newY = 0;
        else if (newY>document.documentElement.clientHeight - target.offsetHeight) {
            newY = document.documentElement.clientHeight - target.offsetHeight;
        }
        target.style.left = newX - svgCoord.left + 'px';
        target.style.top = newY + 'px';

        if (pageX < 0 || pageY < 0 || pageX > document.documentElement.clientWidth || pageY > document.documentElement.clientHeight) {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmousedown = null;
        }
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

    }

    document.addEventListener('mousemove', onMouseMove);

    target.onmouseup = function() {
        target.style.zIndex = '1';
        document.removeEventListener('mousemove', onMouseMove);
        target.onmousedown = null;
    };

});







