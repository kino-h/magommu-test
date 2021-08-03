let localStream;
var num = 0;

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
  // 音声ON(相手)(初期設定が音声OFFのため)
  var yoursettings = $('#your-video').get(0);
  yoursettings.muted = false;

  // 撮影機能
  var myvideo = document.getElementById('my-video');
  var yourvideo = document.getElementById('your-video');

  // 写真の撮影(canvasに描写)
  function camera () {
   // myphoto
   mycanvas.width = myvideo.videoWidth;
   mycanvas.height = myvideo.videoHeight;
   mycontext.drawImage(myvideo, 0, 0);
   // yourphoto
   yourcanvas.width = yourvideo.videoWidth;
   yourcanvas.height = yourvideo.videoHeight;
   yourcontext.drawImage(yourvideo, 0, 0);
  }
  映像の切替(アルバム閲覧時)
  var photos = new Array("/img/photo1.jpg","/img/photo2.jpg","/img/photo3.jpg","/img/photo4.jpg","/img/photo5.jpg","/img/photo6.jpg","/img/photo7.jpg","/img/photo8.jpg","/img/photo9.jpg","/img/photo10.jpg");
  var num = 0;

  $('#album').on('click', function() {
    var yourstreamElement = document.getElementById('your-stream');
    yourstreamElement.classList.add('your-stream-album');

    var yourvideoElement = document.getElementById('your-video');
    yourvideoElement.classList.add('your-video-album');

    document.getElementById('photo').src = photos[num];
    num ++;

    if (num == 10) {
      num = 0;
    }

    // function go_back(){
    //     if (num == 0) {
    //         num = 2;
    //     }
    //     else {
    //         num --;
    //     }
    //     document.getElementById("mypic").src=pics_src[num];
    // }
  });

  // 映像の切替(アルバム閲覧終了時)
  $('#album-exit').on('click', function() {
    var yourstreamElement = document.getElementById('your-stream');
    yourstreamElement.classList.add('your-stream-normal');

    var yourvideoElement = document.getElementById('your-video');
    yourvideoElement.classList.add('your-video-normal');
  });

  // 会話続けさせたるちゃん
  var txt = new Array();
  txt[0]="さいきん、おいしかった給食（きゅうしょく）ってなんだった？おじいちゃん・おばあちゃんにおしえてあげよう。";
  txt[1]="きょうは、なんじかん授業（じゅぎょう）だった？";
  txt[2]="さいきん、学校（がっこう）でならった字（じ）おしえて！";
  txt[3]="給食当番（きゅうしょくとうばん）さんってなにするの？";
  txt[4]="学校（がっこう）では、なんの係（かかり）なの？";
  txt[5]="きょうしつは、何階（なんかい）にあるの？";
  txt[6]="学校（がっこう）ですきな科目（かもく）はなーに？わたしは、やすみじかん！";
  txt[7]="学校（がっこう）はなんクラスまであるの？";
  txt[8]="たんにんの先生（せんせい）の名前（なまえ）、フルネームでいえる？";
  txt[9]="学校（がっこう）には、どの門（もん）から入るの？　北門（きたもん）？正門（せいもん）？";
  txt[10]="学校（がっこう）のげたばこ、うえからなんだんめ？";
  txt[11]="学校（がっこう）の校庭（こうてい）にある遊具（ゆうぐ）をおしえて！てつぼう、すなば・・・あとなにがある？";
  txt[12]="ランドセルの色（いろ）をおしえて！";
  txt[13]="きょうはどんな宿題（しゅくだい）がでたの？　え！もうおわったの？";
  txt[14]="学校（がっこう）にいくときは、だれといっしょなの？";
  txt[15]="学校（がっこう）でかっている、そだてているものおしえて。";
  txt[16]="日直（にっちょく）さんってなにするの？";
  txt[17]="学校（がっこう）の校舎（こうしゃ）は、何階（なんかい）まであるの？";
  txt[18]="学校（がっこう）の屋上（おくじょう）いったことある？";
  txt[19]="ほけんしつの先生（せんせい）の名前（なまえ）いえる？";
  txt[20]="いちばんなかよしのおともだちのことおしえて！どんなことはなすの？";
  txt[21]="つぎの４がつになったら、何年生（なんねんせい）になるの？";
  txt[22]="プールすき？わたしは、もぐるのだいすき！";
  txt[23]="漢字（かんじ）すき？　わたしは・・・かきじゅんがニガテ";
  txt[24]="計算（けいさん）すき？　わたしは・・・たしざんがすき！";
  txt[25]="いきものかんさつするのすき？　わたしは・・・アリのぎょうれつをみているのがすき！";
  txt[26]="体育（たいいく）でなにをするのがすき？　わたしは・・・なわとび！";
  txt[27]="ランドセルって、おもたい？";
  txt[28]="わたし、こくばんけしがかりしたことあるよ。";
  txt[29]="学校（がっこう）でも本（ほん）かりられる？わたし、本（ほん）よむのすき！";
  txt[30]="図工（ずこう）のじかんはなにするの？わたし、絵（え）をかくのすき！";
  txt[31]="はるやすみは、なにするの？";
  txt[32]="校歌（こうか）、もしよかったらきかせて！";
  txt[33]="学校（がっこう）のある日（ひ）はなんじにおきてるの？";
  txt[34]="学校（がっこう）のやすみじかんはなにをしてるの？";
  txt[35]="ならいごとはどんなことしてるの？それか、やってみたいならいごとはある？";
  txt[36]="きょうはこどもの日（ひ）だよ。端午の節句（たんごのせっく）とも呼ばれているんだ。";
  txt[37]="きょうは敬老の日（けいろうのひ）だよ。おじいちゃん・おばあちゃんの長寿（ちょうじゅ・・・ながいきすること）をおいのりし、おいわいする日（ひ）なんだ。";
  txt[38]="はるになったらどこいきたい？";
  txt[39]="２がつのことは、如月（きさらぎ）っていうんだよ";
  txt[40]="３がつのことは、弥生（やよい）っていうんだよ";
  txt[41]="２０２１ねん２がつは、２７にちが満月（まんげつ）だよ";
  txt[42]="２がつの夜空（よぞら）には、「りゅうこつ座（ざ）」の１等星（とうせい）「カノープス」がみえるよ";
  txt[43]="３がつ３かのひなまつりは、上巳の節句（じょうしのせっく）ってよばれるんだよ";
  txt[44]="ももの木（き）は、中国（ちゅうごく）では不老長寿（ふろうちょうじゅ・・・いつまでもとしをとらず、ながいきすること）の仙木（せんぼく）とされる、えんぎのいいしょくぶつなんだよ";
  txt[45]="ことしは、２がつと３がつって、日付（ひづけ）と曜日（ようび）がおなじなんだね";
  txt[46]="あー目（め）がかゆい。これって花（か）ふんしょうかも";
  txt[47]="いま、うめの花（はな）がきれいなんだって！";
  txt[48]="菜の花（なのはな）ってお花（はな）なのにたべれるんだよ";
  txt[49]="おひなさま、ってどれも右（みぎ）がわにすわってるよね";
  txt[50]="はるになったらピクニックにいきたいな";
  txt[51]="ゆきがつもったら、ゆきだるまとゆきうさぎとかまくらをつくってみたい";
  txt[52]="きょう、チューリップのはっぱがでてきたよ！";
  txt[53]="チューリップってさくまで、お花（はな）の色（いろ）がわからないんだって";
  txt[54]="もうすぐバレンタインだね！おかしなにかつくった？わたしはたべるせんもん！";
  txt[55]="いまのクラスもそろそろおわっちゃうね。さいごにクラスでイベントみたいなことするの？";
  txt[56]="もうすぐそつぎょうしきだねー";
  txt[57]="１しゅうかんまえの地震（じしん）、びっくりしたね。だいじょうぶだった？";
  txt[58]="さいきん、いい天気（てんき）がつづいているね。どこかおでかけした？";
  txt[59]="コロナのワクチンが国内（こくない）でしょうにんされたね。";
  txt[60]="京急電鉄（けいきゅうでんてつ）ではるから、シートのむきがかえられるでんしゃがはしるんだって";
  txt[61]="２０２０ねん７がつに、アメリカ・メキシコ・カナダきょうてい（ＵＳＭＣＡ）がはっこうしたよ";
  txt[62]="日本海（にほんかい）のほうはおおゆきちゅういだって";
  txt[63]="こんやはさむくなるみたいだよ";
  txt[64]="ひがしにほんだいしんさいからもうすぐ１０ねんなんだって。";
  txt[65]="テニスの大坂（おおさか）なおみせんしゅがすごいの！";
  txt[66]="わたしチョコすきなんだよね";
  txt[67]="きょう、ねぼうしちゃったんだ";
  txt[68]="そろそろ夕（ゆう）ごはん。なにたべようかなあ";
  txt[69]="パラリンピックのアルペンスキーの森井大輝（もりいだいき）さん、がんばれ！";
  txt[70]="ミツクリザメは、水深（すいしん）やく１３００メートルの深海（しんかい）にすむサメなんだよ";
  txt[71]="奈良県三宅町（ならけんみやけちょう）のゆるきゃらは、「みやっぴぃ」。「アザサ」の花（はな）のようせいだよ";
  txt[72]="ＣＯＣＯＡ（ココア）は、りようしゃどうしが１メートルいないに１５ふんいじょういたばあい、せっしょくきろくがのこるよ";
  txt[73]="姫路城（ひめじじょう）は、シラサギがはねをひろげたようなゆうびなすがたから「白鷺城（しらさぎじょう）」とよばれてるよ";
  txt[74]="あさ、どこかでネコがないてたけど、みつけられなかった";
  txt[75]="たいやきたべたい。つぶあんのやつ。";
  txt[76]="きゅうりにはちみつかけたらメロンの味（あじ）ってほんとかな？";
  txt[77]="きのう、空（そら）をとぶゆめをみたの";
  txt[78]="まほうがつかえたら、へんしんしてみたいな";
  txt[79]="じつは、おそうじすきなの。とくに、ぞうきんがけがすき。";
  txt[80]="たまごりょうりといえば、オムレツだよね。";
  txt[81]="イヌがすき？ネコがすき？トリもいいよね！";
  txt[82]="カピバラっておしりをかいてあげるときもちいいんだって";
  txt[83]="いつかアイスやさんのバイトしてみたい。だって、アイスたべられるでしょ。";
  txt[84]="おおきくなったら、学校（がっこう）の先生（せんせい）になりたいな";
  txt[85]="「How are you？（ハウアーユー？）」はにほんごで、「ちょうしはどう？」っていみなんだって！";
  txt[86]="さいきん、ママのおてつだいした？わたしはおふろそうじをしたよ！";
  txt[87]="あったかいおへやでたべるアイスってすっごくおいしいよね";
  txt[88]="空気（くうき）の二酸化炭素（にさんかたんそ）がふえて、きおんがじょうしょうすることを「地球温暖化（ちきゅうおんだんか）」っていうんだって！";
  $('#sasetaruchan').on('click', function() {
    var max = 89; //メッセージ行数
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
  
});