var bodyStyle = document.body.style;
bodyStyle.mozUserSelect = 'none';
bodyStyle.webkitUserSelect = 'none';

//다음으로 이미지 클래스를 정의하고 캔버스 요소를 가져온 다음 배경 및 위치 속성을 설정합니다.
var img = new Image();
var canvas = document.querySelector('canvas');
canvas.style.backgroundColor='transparent';
canvas.style.position = 'absolute';

//이 예에서는 두 개의 임의 사진을 사용하여 매번 임의의 이미지를 배경으로 새로고침
var imgs = ['1.jpg','2.jpg','3.jpg'];
var num = Math.floor(Math.random()*3);
img.src = imgs[num];

//그런 다음 본문을 입력합니다. 이미지가로드 된 것을 감지하면 먼저 일부 속성과 함수를 정의합니다. 기능 레이어 ()는 회색 사각형을 그리는 데 사용됩니다 .EventDown ()은 프레스 이벤트를 정의합니다. () 눌렀을 때 좌표 변위를 가져오고 작은 점을 호 (x, y, 10, 0, Math.PI * 2)로 그리는 이동 이벤트를 정의합니다.
img.addEventListener('load', function(e) {
    var ctx;
    var w = img.width,
        h = img.height;
    var offsetX = canvas.offsetLeft,
        offsetY = canvas.offsetTop;
    var mousedown = false;

    function layer(ctx) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, w, h);
    }

    function eventDown(e){
        e.preventDefault();
        mousedown=true;
    }

    function eventUp(e){
        e.preventDefault();
        mousedown=false;
    }

    function eventMove(e){
        e.preventDefault();
        if(mousedown) {
            if(e.changedTouches){
                e=e.changedTouches[e.changedTouches.length-1];
            }
            var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
                y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
            with(ctx) {
                beginPath()

                //점 그리기
                arc(x, y, 30, 0, Math.PI * 2);
                fill();
            }
        }
    }

    //마지막으로, 위의 함수는 캔버스를 통해 호출되어 그래픽을 그리고 터치 및 마우스 이벤트를 듣고 해당 함수를 호출합니다.
    canvas.width=w;
    canvas.height=h;
    canvas.style.backgroundImage='url('+img.src+')';
    ctx=canvas.getContext('2d');
    ctx.fillStyle='transparent';
    ctx.fillRect(0, 0, w, h);//사각형 그리기
    layer(ctx);

    ctx.globalCompositeOperation = 'destination-out';

    canvas.addEventListener('touchstart', eventDown);
    canvas.addEventListener('touchend', eventUp);
    canvas.addEventListener('touchmove', eventMove);
    canvas.addEventListener('mousedown', eventDown);
    canvas.addEventListener('mouseup', eventUp);
    canvas.addEventListener('mousemove', eventMove);
});
