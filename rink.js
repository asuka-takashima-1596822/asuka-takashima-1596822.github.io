
const date = new Date(); //現在時刻を取得
const y = date.getFullYear(), //西暦年
      m = date.getMonth() + 1, //月　
      d = date.getDate(), //日
      H = date.getHours(), //時
      M = date.getMinutes(), //分
      S = date.getSeconds(); //秒


document.getElementById("nowTime").innerHTML = "🦕NOW TIME🦕 " + y + "/" + m + "/" + d + " " + H + ":" + M 

//登録IDを配列にする
const id = ["1","2","3","4","5","6","7","8","9","10"];


//大分類
const workSpaces =[
    "在宅",
    "現場",
    "出張",
    "教育",
    "帰宅",
    "年休"
];


//小分類
const workTime =[
    "8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","深夜勤務あり"
]

//セーブボタンとロードボタンのオブジェクト変数を定義
const save = document.getElementById("save");
const load = document.getElementById("load");



//関数を定義(引数をid配列の番号とする)※全てのidに対してそれぞれ下記関数を実行してほしいため
function setSelect (num){

//各オブジェクト変数を定義
const getWorkSpace = document.getElementById("workSpace-" + id[num]);
const getWorkTime = document.getElementById("workTime-" + id[num]);
const getText = document.getElementById("text-" + id[num]);
const getComment = document.getElementById("comment-" + id[num]);

//大分類のプルダウンを作成 ★for.Eachで配列の各要素に対して1度ずつ実行
workSpaces.forEach(category => {
    const option = document.createElement('option');    //新しくオプションを作成する
    option.textContent = category; //optionの内容をカテゴリーにする
    return getWorkSpace.appendChild(option);  //id = workSpace　に optionを追加する
  });  

//大分類が変更"change"されたら小分類のプルダウンを生成
getWorkSpace.addEventListener('change', () => {  

//小分類のテキスト(年休と帰宅の時に出したテキスト、セーブした際のテキスト）をリセット
  getText.textContent = "";

// 小分類のプルダウンをリセット
  const options = document.querySelectorAll("#workTime-" + id[num] + "> option");//<option>要素の内、idが"workCode-id[mum]"のもののノードリストを取得　
  options.forEach(option => option.remove()); //ノードに含まれるテキストを削除
  

  // 小分類のプルダウンに最初に「選択してください」を加える
  const firstSelect = document.createElement('option');
  firstSelect.textContent = '選択してください';
  getWorkTime.appendChild(firstSelect);


  // 小分類を選択できるようにする
  getWorkTime.disabled = false;


  // 大分類が選択されていない（テキストが「未選択」になっている）とき、小分類を選択できないようにする
  if (getWorkSpace.value === '未選択') {
    getWorkTime.disabled = true;
  }

  // 大分類で選択されたカテゴリーによって表示を変える
  if(getWorkSpace.value === "帰宅"){
    getWorkTime.disabled = true
    getText.textContent = "CLOCK OUT!!🍺"
    getText.style.backgroundColor = "#87cefa"

  }else if (getWorkSpace.value === "年休"){
    getWorkTime.disabled = true
    getText.style.backgroundColor = "#f08080"
    getText.textContent = "HOLIDAY🌈"

  }else {
    workTime.forEach(category => {
        const option = document.createElement('option');    //新しくオプションを作成する
        option.textContent = category; //optionの内容をカテゴリーにする
        getWorkTime.appendChild(option);  //id = workSpace　に optionを追加する
      });
    
  }
})

//記載内容をローカルストレージに保存する関数
function saveAction(){
  localStorage.setItem("workSpace-"+ id[num],getWorkSpace.value);
  localStorage.setItem("workTime-" + id[num],getWorkTime.value);
  localStorage.setItem("text-" + id[num],getText.textContent);
  localStorage.setItem("comment-" + id[num],getComment.textContent);
};


//記載内容をローカルストレージから取り出す関数
function loadAction(){
  getWorkSpace.value = localStorage.getItem("workSpace-"+ id[num]);//勤務先に格納
  getComment.textContent = localStorage.getItem("comment-" + id[num]);//連絡事項に格納

  if(getWorkSpace.value !== "年休"|| "帰宅"){
    getText.textContent = localStorage.getItem("workTime-" + id[num]);//勤務先が年休か帰宅でない場合、帰宅時間をgetatextに格納(DOMイベントで大分類の"change"で小分類が作成されるようになっている為)
    getText.style.backgroundColor = "#dcdcdc"
  }if (getWorkSpace.value === "年休"){
    getText.textContent = localStorage.getItem("text-" + id[num]);//年休の場合、背景色も変更
    getText.style.backgroundColor = "#f08080";
  }else if (getWorkSpace.value === "帰宅"){
    getText.textContent = localStorage.getItem("text-" + id[num]);//帰宅の場合。背景色も変更
    getText.style.backgroundColor = "#87cefa"
  }
};

//ボタンを押したときに各関数を実行
save.addEventListener("click",saveAction);

load.addEventListener("click",loadAction);

};



//設定した人数(id数)まで上の関数を実行(html内で1人ごとにid番号を○○-numで付与している)
function intoNum (){
  for (i = 0 ; i < id.length ;i++){
    setSelect(i);
  }
}
intoNum();


