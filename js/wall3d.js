(function () {
    const stageElem = document.querySelector('.stage');
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');
    const selectCharacterElem = document.querySelector('.select-character');
    const mousePos = { x: 0, y: 0 };
    let maxScrollValue;

    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }

    window.addEventListener('scroll', function () {
        const scrollPer = pageYOffset / maxScrollValue;
        const zMove = scrollPer * 3900 - 490;
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

        // progress bar
        barElem.style.width = scrollPer * 100 + '%';

        $('.toast').addClass('hide')
    });

    window.addEventListener('mousemove', function (e) {
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
        stageElem.style.transform = 'rotateX(' + (mousePos.y * 5) + 'deg) rotateY(' + (mousePos.x * 5) + 'deg)';
    });

    window.addEventListener('resize', resizeHandler);
/* 
    stageElem.addEventListener('click', function (e) {
        new Character({
            xPos: e.clientX / window.innerWidth * 100,
            speed: Math.random() * 0.5 + 0.2
        });
    });
 */
    let clicked = false; // 클릭 여부를 저장하는 변수

    stageElem.addEventListener('click', function (e) {
        if (!clicked) { // 클릭되지 않은 경우에만 실행
            const triggerX = 60; // 트리거 위치의 X 좌표 (%)
            const triggerY = 50; // 트리거 위치의 Y 좌표 (%)
            // 트리거 위치에 Character 객체 생성
            new Character({
                xPos: triggerX,
                speed: Math.random() * 0.5 + 0.2
            });
            clicked = true; // 클릭되었음을 표시
        }
    });
    setTimeout(() => {
        stageElem.click()
    },500)
    selectCharacterElem.addEventListener('click', function (e) {
        const value = e.target.getAttribute('data-char');
        document.body.setAttribute('data-char', value);
    });
    
    resizeHandler();
    selectCharacterElem.children[0].click();
})();
