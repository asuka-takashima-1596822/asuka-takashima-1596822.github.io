
const id = ["1","2","3","4","5","6","7","8","9","10","11"];



//大分類
const workSpaces =[
    "在宅",
    "ハウス",
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


//関数を定義
function setSelect (num){

const getWorkSpace = document.getElementById("workSpace-" + id[num]);
const getWorkCode = document.getElementById("workCode-" + id[num]);
const text = document.getElementById("resultSelect-" + id[num]);

//大分類のプルダウンを作成
workSpaces.forEach(category => {
    const option = document.createElement('option');    //新しくオプションを作成する
    option.textContent = category; //optionの内容をカテゴリーにする
    getWorkSpace.appendChild(option);  //id = workSpace　に optionを追加する
  });
 

// 大分類が選択されたら小分類のプルダウンを生成
getWorkSpace.addEventListener('change', () => {//"input":ユーザーの操作によって値が変更されたときに発生するイベント

    //小分類のテキストをリセット
    text.innerHTML = "";

    // 小分類のプルダウンをリセット
  const options = document.querySelectorAll("#workCode-" + id[num] + "> option");//<option>要素の内、idが"workCode-id[mum]"のもののノードリストを取得　
  options.forEach(option => {
    option.remove(); //ノードに含まれるテキストを削除
  });

  // 小分類のプルダウンに「選択してください」を加える
  const firstSelect = document.createElement('option');
  firstSelect.textContent = '選択してください';
  getWorkCode.appendChild(firstSelect);


  // 小分類を選択（クリック）できるようにする
  getWorkCode.disabled = false;


  // 大分類が選択されていない（テキストが「未選択」になっている）とき、小分類を選択（クリック）できないようにする
  if (getWorkSpace.value === '未選択') {
    getWorkCode.disabled = true;
  }

  // 大分類で選択されたカテゴリーによって表示を変える
  if(getWorkSpace.value === "帰宅"){
    getWorkCode.disabled = true
    text.textContent = "お疲れ様でした!🍺"
    text.style.backgroundColor = "#87cefa"
  }else if (getWorkSpace.value === "年休"){
    getWorkCode.disabled = true
    text.style.backgroundColor = "#ffe4e1"
    text.textContent = "年休🌈"
  }else {
    workTime.forEach(category => {
        const option = document.createElement('option');    //新しくオプションを作成する
        option.textContent = category; //optionの内容をカテゴリーにする
        getWorkCode.appendChild(option);  //id = workSpace　に optionを追加する
      });
    
  }
})

}

//設定した人数(id数)まで上の関数を実行
function intoNum (){
  for (i = 0 ; i < id.length ;i++){
    setSelect(i);
  }
}
intoNum();

