// TODO:寫一個 doWork的功能  參數帶入要做的事情還有持續的時間
function doWork(work, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let now = new Date();
      resolve(`"執行成功"${work} at ${now}`);
    }, time);
  });
}
// TODO:回傳 promise ()
// promise的參數是一個executor函式
// executor 裡面有兩個參數 (resolve, reject)  分別代表成功內容與失敗內容

// TODO:帶入非同步函式來代表持續的時間

// TODO:用resolve來傳出想要顯示的內容
// .toISOString()能讓時間轉為字串
let now = new Date();
console.log(`"開始執行"${now}`);
// 函式最後要寫入時間

// TODO:console一個開始的時間

// 刷牙(3) => 吃早餐(5) => 寫功課(3)

// 使用函式
doWork('走路', 3000)
  .then((msg) => {
    console.log(`"then" ${msg}`);
    return doWork('搭車', 7000);
  })
  .then((msg) => {
    console.log(`"then" ${msg}`);
  })
  .catch((err) => {
    console.error(err);
  });
// 用then來接收成功資訊
// 參數名稱隨意取，用來接收resolve傳出的內容
// TODO:如果還有下一步再帶入函式
// TODO:新的return要有新的then來接收成功資訊
// TODO:catch接收失敗訊息;
// async function doasync() {
//   try {
//     console.log(await doWork('打祥恩', 5000));
//     console.log(await doWork('打崇淵', 3000));
//   } catch (err) {
//     console.log(err);
//   }
// }
// doasync();
