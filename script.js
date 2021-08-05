let localStream;

// カメラ映像取得
navigator.mediaDevices.getUserMedia({video: true, audio: true})
  .then( stream => {
  // 成功時にvideo要素にカメラ映像をセットし、再生
  const videoElm = document.getElementById('my-video');
  videoElm.srcObject = stream;
  videoElm.play();
  // 着信時に相手にカメラ映像を返せるように、グローバル変数に保存しておく
  localStream = stream;
}).catch( error => {
  // 失敗時にはエラーログを出力
  console.error('mediaDevice.getUserMedia() error:', error);
  return;
});

// ユーザ情報入力項目&ボタン(初期値)
function buttonreset() {
  document.getElementById("id-open").disabled = false;
  document.getElementById("my-id").disabled = false;
  document.getElementById("id-close").disabled = true;
  document.getElementById("your-id").disabled = true;
  document.getElementById("make-call").disabled = true;
}
buttonreset();

//Peer作成
$('#id-open').on('click', function() {
  const myID = document.getElementById('my-id').value;
  // ユーザ情報入力項目&ボタン
  document.getElementById("id-open").disabled = true;
  document.getElementById("my-id").disabled = true;
  document.getElementById("id-close").disabled = false; 
  document.getElementById("your-id").disabled = false;
  document.getElementById("make-call").disabled = false;

  const peer = new Peer(myID, {
  key: '047c0c68-2d54-436d-8f0e-070ae4983ca5',
  debug: 3
  });

  //Peer接続
  peer.on('open', () => {
    //
  });

  // 発信処理
  document.getElementById('make-call').onclick = () => {
    const yourID = document.getElementById('your-id').value;
    // ユーザ情報入力項目&ボタン
    document.getElementById("your-id").disabled = true;
    document.getElementById("make-call").disabled = true;
    
    const mediaConnection = peer.call(yourID, localStream);
    setEventListener(mediaConnection);
  };

  // イベントリスナを設置する関数
  const setEventListener = mediaConnection => {
  mediaConnection.on('stream', stream => {
    // video要素にカメラ映像をセットして再生
    const videoElm = document.getElementById('your-video')
    videoElm.srcObject = stream;
    videoElm.play();
  });
  }

  //着信処理
  peer.on('call', mediaConnection => {
  mediaConnection.answer(localStream);
  setEventListener(mediaConnection);
  });

  //Peer切断
  $('#id-close').on('click', function() {
    peer.destroy();
    buttonreset();
  });

  peer.on('close', () => {
    alert('通信が切断しました。');
  });
});

$(function() {

  // つなぐボタン押下
  function popupTsunagu() {
    var popup = document.getElementById('popup-tsunagu');
    if(!popup) return;

    var blackBg = document.getElementById('tsunagu-black-bg');
    var closeBtn = document.getElementById('tsunagu-close-btn');
    var showBtn = document.getElementById('tsunagu');
    var closeBtn1 = document.getElementById('make-call');

    closePopUp(blackBg);
    closePopUp(closeBtn);
    closePopUp(showBtn);
    closePopUp(closeBtn1);
    function closePopUp(elem) {
      if(!elem) return;
      elem.addEventListener('click', function() {
        popup.classList.toggle('is-show');
      });
    }
  }
  popupTsunagu();

  // 音声ON(相手)(初期設定が音声OFFのため)
  var yoursettings = $('#your-video').get(0);
  yoursettings.muted = false;

  // 会話続けさせたるちゃん
  var txt = new Array();
  txt[0]="じゆうけんきゅう、なにやるの？";
  txt[1]="ならいごとのことをおしえて！";
  txt[2]="きのうはなにしたの？";
  txt[3]="なつやすみのしゅくだい、たいへんだよね。";
  txt[4]="おかあさんよりしってること、ある？";
  txt[5]="じまんばなし、きかせて！？";
  txt[6]="さいきん、ハマってることってなに？";
  // txt[7]="";
  // txt[8]="";
  // txt[9]="";
  $('#sasetaruchan').on('click', function() {
    var max = 7; //メッセージ行数
    var txtno = Math.floor(Math.random() * max);
    $('#AItxt').html(txt[txtno]);
  });

  // 時計
  function clock () {
    var twoDigit = function(num) {
      var digit
      if( num < 10 ){
        digit = "0" + num;
      } else {
        digit = num;
      }
      return digit;
    }

    var date = new Date();

    var year = date.getFullYear();
    var month = twoDigit(date.getMonth()+1);
    var day = twoDigit(date.getDate());
    var weeks = new Array("日","月","火","水","木","金","土");
    var week = weeks[date.getDay()];
    var hour = twoDigit(date.getHours());
    var minute = twoDigit(date.getMinutes());
    var second = twoDigit(date.getSeconds());
    $('.clock-date').html(year + "/" + month + "/" + day + " (" + week + ")");
    $('.clock-time').html(hour + ":" + minute + ":" + second);
  }
  setInterval(clock, 1000);

  // アルバム(非表示(初期))
  $('.swiper-container').hide();
  $('.menu-right2').hide();

  // アルバム(通話画面切替))
  function photoSwitch () {
    var yourstreamElement = document.getElementById('your-stream');
    yourstreamElement.classList.toggle('your-stream-photo');
    yourstreamElement.classList.toggle('your-stream-normal');
  
    var yourvideoElement = document.getElementById('your-video');
    yourvideoElement.classList.toggle('your-video-photo');
    yourvideoElement.classList.toggle('your-video-normal');
  }

  // アルバムボタン押下
  $('#photo').on('click', function() {
    $('.swiper-container').show();
    $('.menu-right').hide();
    $('.menu-right2').show();
    $('.AImenu').hide();
    
    // アルバム
    var swiper = new Swiper('.swiper-container', {
      loop: true,
    
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });

    photoSwitch();
  });

  // 閉じるボタン押下
  $('#toziru').on('click', function() {
    $('.swiper-container').hide();
    $('.menu-right').show();
    $('.menu-right2').hide();
    $('.AImenu').show();
    photoSwitch();
  });

  // あげる(おこづかい)
  function popupAgeru() {
    var popup = document.getElementById('popup-ageru');
    if(!popup) return;
  
    var blackBg = document.getElementById('ageru-black-bg');
    var closeBtn = document.getElementById('ageru-close-btn');
    var showBtn = document.getElementById('ageru');
    // var closeBtn1 = document.getElementById('ageru-close-btn1');
    var closeBtn2 = document.getElementById('ageru-close-btn2');
  
    closePopUp(blackBg);
    closePopUp(closeBtn);
    closePopUp(showBtn);
    // closePopUp(closeBtn1);
    closePopUp(closeBtn2);
    function closePopUp(elem) {
      if(!elem) return;
      elem.addEventListener('click', function() {
        popup.classList.toggle('is-show');
      });
    }
  }
  popupAgeru();

  // もらう(おたのしみ)
  function popupMorau() {
    var popup = document.getElementById('popup-morau');
    if(!popup) return;
  
    var blackBg = document.getElementById('morau-black-bg');
    var closeBtn = document.getElementById('morau-close-btn');
    var showBtn = document.getElementById('morau');
    var closeBtn1 = document.getElementById('morau-close-btn1');
    var closeBtn2 = document.getElementById('morau-close-btn2');
    var closeBtn3 = document.getElementById('morau-close-btn3');
    var closeBtn4 = document.getElementById('morau-close-btn4');
  
    closePopUp(blackBg);
    closePopUp(closeBtn);
    closePopUp(showBtn);
    closePopUp(closeBtn1);
    closePopUp(closeBtn2);
    closePopUp(closeBtn3);
    closePopUp(closeBtn4);
    function closePopUp(elem) {
      if(!elem) return;
      elem.addEventListener('click', function() {
        popup.classList.toggle('is-show');
      });
    }
  }
  popupMorau();
  
});