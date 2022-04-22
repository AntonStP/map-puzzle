//переменные для врапперов карты
const template = document.querySelector('#svg-template');
const templateDiv = document.querySelector('.map__template');
const completeDiv = document.querySelector('.map__complete');
const tCoord = template.getBoundingClientRect();

templateDiv.style.opacity = '1';
//контейнерам размеры svg карты
[templateDiv,completeDiv].forEach((el)=> {
    el.style.width = `${template.clientWidth}px`;
    el.style.height = `${template.clientHeight}px`;
});

//переменные для кусков
const partsDiv = document.querySelectorAll('.map__part');
const parts = document.querySelectorAll('img');
//контейнеры кусков равны размеру внутри
Array.from(parts).forEach((el,id)=> {
    let w = el.offsetWidth;
    let h = el.offsetHeight;
    let x = partsDiv[id].dataset.xxx;
    let y = partsDiv[id].dataset.yyy;
    partsDiv[id].style.top = `${y}px`;
    partsDiv[id].style.left = `${x}px`;
});

document.addEventListener('click', function (event) {
    const target = event.target.closest('.button');
    if(target === null) return;
    templateDiv.classList.add('map__template_crashed')
});


document.addEventListener('mousedown', function (event) {
    const target = event.target.closest('.map__part');
    if(target === null) return;

    console.log('target',target);
    let shiftX = event.clientX - target.getBoundingClientRect().left;
    let shiftY = event.clientY - target.getBoundingClientRect().top;
    target.style.position = 'absolute';
    target.style.zIndex = '100';

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        target.style.left = pageX - tCoord.left - shiftX + 'px';
        target.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

    }

    document.addEventListener('mousemove', onMouseMove);

    target.onmouseup = function() {
        target.style.zIndex = '1';
        document.removeEventListener('mousemove', onMouseMove);
        target.onmouseup = null;
    };

});







