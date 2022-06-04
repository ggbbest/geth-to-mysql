// puppeteer을 가져온다.
const puppeteer = require('puppeteer');
// cheerio를 가져온다.
const cheerio = require('cheerio');
////////////////////////////////////////////////////////////////
var mysql = require('mysql');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const dotenv = require('dotenv');
dotenv.config();
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});
var db_config = require(__dirname + '/database.js');// 2020-09-13
var sync_mysql = require('sync-mysql'); //2020-01-28
let sync_connection = new sync_mysql(db_config.constr());
////////////////////////////////////////////////////////////////

async function main(){
    // 브라우저를 실행한다.
    // 옵션으로 headless모드를 끌 수 있다.
    const browser = await puppeteer.launch({ headless: true });

    // 새로운 페이지를 연다.
    const page = await browser.newPage();
    // 페이지의 크기를 설정한다.
    await page.setViewport( { width: 1366, height: 768 } );
    await page.goto('https://sigbtc.pro/derivatives');
    // wait page
    await page.waitForTimeout(6000);
    // 페이지의 HTML을 가져온다.
    const content = await page.content();

    // $에 cheerio를 로드한다.
    const $ = cheerio.load(content);
    // ####################################
    // 1	공포 / 탐욕 지수 : 걱정 = 37.9
    // 2	강도 지수 (RSI) : 중간 = 55.1
    // 3	스토캐스틱 : 과매도 [ 2 ] = 8.6
    // 4	트렌드 : 상승장
    // 5	비트코인 시장 점유율 46.81 %
    // 6	비트코인 김프 +1.38%
    // 7	이더리움 김프 +1.45%
    // 8	리플 김프 +1.56%
    // 9	LONG (공매수) 비율 : 68.7%
    // 10	SHORT (공매도) 비율 : 31.4%
    // 11	비트코인 펀딩 비율 06 : 47 : 54 +0.0014%
    // 12	이더리움 펀딩 비율 06 : 47 : 54 +0.0100% 
    // 13	리플 펀딩 비율 06 : 47 : 54 -0.0189%
    // 14	워뇨띠 (aoa) 포지션 2022-06-03　10 : 00 Short
    // 15	3dudes 포지션 2022-06-03　10 : 00 Long
    // 16	BogPear 포지션 2022-06-03　10 : 00
    // ############## 워뇨띠 ##############
    // 복사한 리스트의 Selector로 리스트를 모두 가져온다.
    const lists1  = $("#g1 > div > div > small > strong").text();
    // console.log(lists1 +":lists1 공포 / 탐욕 지수");
    const lists2  = $("#g2 > div > div > small > strong").text();
    // console.log(lists2 +":lists2 강도 지수 (RSI) ");
    const lists3  = $("#g3 > div > div > small > strong").text();
    // console.log(lists3 +":lists3 스토캐스틱 ");
    const lists4  = $("#g4 > div > div > small > strong").text();
    // console.log(lists4 +":lists4 트렌드 ");
    const lists5  = $("#btcDominance").text();
    // console.log(lists5 +":lists5 비트코인 시장 점유율 ");
    const lists6  = $("#mainMenu > div > div.col-md-12.col-lg-8 > div:nth-child(2) > div.col-md-8 > div:nth-child(1) > div > div > div > div > div:nth-child(1) > div > span").text();
    // console.log(lists6 +":lists6 비트코인 김프 ");
    const lists7  = $("#mainMenu > div > div.col-md-12.col-lg-8 > div:nth-child(2) > div.col-md-8 > div:nth-child(1) > div > div > div > div > div:nth-child(2) > div > span").text();
    // console.log(lists7 +":lists7 이더리움 김프 ");
    const lists8  = $("#mainMenu > div > div.col-md-12.col-lg-8 > div:nth-child(2) > div.col-md-8 > div:nth-child(1) > div > div > div > div > div:nth-child(3) > div > span").text();
    // console.log(lists8 +":lists8 리플 김프 ");
    const lists9  = $("#mainMenu > div > div.col-md-12.col-lg-8 > div:nth-child(2) > div.col-md-8 > div:nth-child(2) > div:nth-child(1) > div > div > small > strong").text();
    // console.log(lists9 +":lists9 LONG (공매수) 비율 ");
    const lists10  = $("#mainMenu > div > div.col-md-12.col-lg-8 > div:nth-child(2) > div.col-md-8 > div:nth-child(2) > div:nth-child(2) > div > div > small > strong").text();
    // console.log(lists10 +":lists10 SHORT (공매도) 비율 ");
    const lists11  = $("#mainMenu > div > div.col-md-12.col-lg-8 > div:nth-child(2) > div:nth-child(3) > div > div > div.d-md-flex > div:nth-child(2) > small").text();
    // console.log(lists11 +":lists11 비트코인 펀딩 비율 ");
    const lists12  = $("#mainMenu > div > div.col-md-12.col-lg-8 > div:nth-child(2) > div:nth-child(4) > div > div > div.d-md-flex > div:nth-child(2) > small").text();
    // console.log(lists12 +":lists12 이더리움 펀딩 비율 ");
    const lists13  = $("#mainMenu > div > div.col-md-12.col-lg-8 > div:nth-child(2) > div:nth-child(5) > div > div > div.d-md-flex > div:nth-child(2) > small").text();
    // console.log(lists13 +":lists13 리플 펀딩 비율 ");
    const lists14_1  = $("#mainMenu > div > div:nth-child(6) > div > div > div > div.px-4.flex > div.text-info.mt-2.type1update").text();
    const lists14_2  = $("#mainMenu > div > div:nth-child(6) > div > div > div > a > span").text();
    // console.log(lists14_1 + " " + lists14_2 +":lists14 워뇨띠 (aoa) ");
    const lists15_1  = $("#mainMenu > div > div:nth-child(7) > div > div > div > div.px-4.flex > div.text-info.mt-2.type2update").text();
    const lists15_2  = $("#mainMenu > div > div:nth-child(7) > div > div > div > a > span").text();
    // console.log(lists15_1 + " " + lists15_2 +":lists15 3dudes ");
    const lists16_1  = $("#mainMenu > div > div:nth-child(8) > div > div > div > div.px-4.flex > div.text-info.mt-2.type3update").text();
    const lists16_2  = $("#mainMenu > div > div:nth-child(8) > div > div > div > a > span").text();
    // console.log(lists16_1 + " " + lists16_2 +":lists16 BogPear ");

    var sql = "INSERT INTO showinfo (f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14_1,f14_2,f15_1,f15_2,f16_1,f16_2) VALUES ('" + lists1 + "','" + lists2 + "','" + lists3 + "','" + lists4 + "','" + lists5 + "','" + lists6 + "','" + lists7 + "','" + lists8 + "','" + lists9 + "','" + lists10 + "','" + lists11 + "','" + lists12 + "','" + lists13 + "','" + lists14_1 + "','" + lists14_2 + "','" + lists15_1 + "','" + lists15_2 + "','" + lists16_1 + "','" + lists16_2 + "'); "; //ON DUPLICATE KEY UPDATE idx=idx
    console.log(sql);
    con.query(sql, function(err, result) {
      if (err) throw err;
    });

    let result2 = sync_connection.query("SELECT MAX(idx)-60 as dCnt FROM showinfo");
    var dCnt = result2[0].dCnt;
    var sql3 = "DELETE FROM showinfo WHERE idx < "+dCnt;
    var result3 = con.query(sql3);
    console.log(sql3);
    console.log(getCurTimestamp() +" / runnung !!!");

    // const lists14 = $("#mainMenu > div > div:nth-child(6)");
    // // 모든 리스트를 순환한다.
    // lists14.each((index, list) => {
    //     // 각 리스트의 하위 노드중 호텔 이름에 해당하는 요소를 Selector로 가져와 텍스트값을 가져온다.
    //     const tit = $(list).find("div > div > div > div.px-4.flex").text();
    //     const tval = $(list).find("div > div > div > a").text();
    //     // 인덱스와 함께 로그를 찍는다.
    //     console.log({ index, tit, tval });
    // });
    // ####################################

    // 브라우저를 종료한다.
    browser.close();
}
// )();

function getCurTimestamp() {
  const d = new Date();

  return new Date(
    Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds()
    )
  // `toIsoString` returns something like "2017-08-22T08:32:32.847Z"
  // and we want the first part ("2017-08-22")
  ).toISOString().replace('T','_').replace('Z','');
}

main();
const interval = setInterval(() => { main(); console.log('====== 1MIN 마다 실행 ======'); }, 1000*60);
// main();
