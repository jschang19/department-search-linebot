

function format_flex(code, data_array) {

  try {
    var departments_array = separate(data_array);
    console.log(departments_array);
  }
  catch (e) {
    console.log(e);
  }


  let result_array = [];

  for (var x = 0; x < departments_array.length; x++) {

    console.log("addtime : " + x);

    let flex_title = departments_array[x][0];
    flex_title = flex_title.replace("\n", "");
    let flex_recruit_num = String(departments_array[x][1]);
    let flex_plan_to_review = String(departments_array[x][2]);
    let flex_recommend = String(departments_array[x][3]);
    let flex_fee = String(departments_array[x][4]);
    let flex_review_date = departments_array[x][5];
    let flex_url = departments_array[x][6];
    let position = departments_array[x][7];
    let flex_gcd_url = generate_calender_url(flex_title, flex_review_date)

    let flex_bubble_tmp = {
      "type": "bubble",
      /*"size":"giga",*/
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "🔍 科系搜尋結果 " + (x + 1),
            "weight": "bold",
            "size": "20px",
            "margin": "10px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents": [

              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "科系名稱",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 3
                  },
                  {
                    "type": "text",
                    "text": flex_title,
                    "wrap": true,
                    "color": "#000000",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              }, {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "margin": "10px",
                "contents": [
                  {
                    "type": "text",
                    "text": "招生名額",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 3
                  },
                  {
                    "type": "text",
                    "text": flex_recruit_num,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "margin": "10px",
                "contents": [
                  {
                    "type": "text",
                    "text": "預計甄試人數",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 3
                  },
                  {
                    "type": "text",
                    "text": flex_plan_to_review,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "margin": "10px",
                "contents": [
                  {
                    "type": "text",
                    "text": "離島外加名額",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 3
                  },
                  {
                    "type": "text",
                    "text": flex_recommend,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "甄試日期",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 3
                  },
                  {
                    "type": "text",
                    "text": flex_review_date,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "uri",
              "label": "查看校系分則",
              "uri": flex_url
            }
          },
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "postback",
              "label": "加入收藏",
              "data": code + "-" + position + "-" + flex_title, // would be code + "-"+position + "-" +flex_title
              "displayText": "加入收藏 " + flex_title
            }
          },
          {
            "type": "button",
            "style": "primary",
            "height": "sm",
            "action": {
              "type": "uri",
              "label": "加入行事曆",
              "uri": flex_gcd_url
            }
          },
          {
            "type": "spacer",
            "size": "sm"
          }
        ],
        "flex": 0
      }

    }
    result_array.push(flex_bubble_tmp);
  }


  let flex_content = [
    {
      "type": "text",
      "text": "行事曆日期皆以各校簡章之第一天與最後一天做設定，實際的二階日期請點擊「 查看校系分則 」確認 🙏🏻"
    },
    {
      "type": "flex",
      "altText": "找到了！請看大學相關科系的搜尋結果",
      "contents": {
        "type": "carousel",
        "contents": result_array
      }
    }
  ];

  return flex_content;
}


function format_saved_flex(code, department_position) {
  const sheet_url = "https://docs.google.com/spreadsheets/d/1aTTJBQIEVNb2xMQkaO3TmsaaEfN1GaLCrHnyuReX-Nk/edit#gid=0";
  const SpreadSheet = SpreadsheetApp.openByUrl(sheet_url);

  let school_sheet = SpreadSheet.getSheetByName(code);

  var target_row = department_position;
  let departments_array = [];

  for (var y = 2; y <= school_sheet.getLastColumn(); y++) {
    var tmp_data = school_sheet.getRange(target_row, y).getValue();
    departments_array.push(tmp_data);
  }

  let flex_title = departments_array[0];
  let flex_meta_title = flex_title.replace("\n", "");
  let flex_recruit_num = String(departments_array[1]);
  let flex_plan_to_review = String(departments_array[2]);
  let flex_recommend = String(departments_array[3]);
  let flex_fee = String(departments_array[4]);
  let flex_review_date = departments_array[5];
  let flex_url = departments_array[6];
  let flex_gcd_url = generate_calender_url(flex_title, flex_review_date)


  let flex_bubble_tmp = {
    "type": "bubble",
    /*"size":"giga",*/
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "⭐️ 收藏名單",
          "weight": "bold",
          "size": "20px",
          "margin": "10px"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "lg",
          "spacing": "sm",
          "contents": [

            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "科系名稱",
                  "color": "#aaaaaa",
                  "size": "sm",
                  "flex": 3
                },
                {
                  "type": "text",
                  "text": flex_title,
                  "wrap": true,
                  "color": "#000000",
                  "size": "sm",
                  "flex": 5
                }
              ]
            }, {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "margin": "10px",
              "contents": [
                {
                  "type": "text",
                  "text": "招生名額",
                  "color": "#aaaaaa",
                  "size": "sm",
                  "flex": 3
                },
                {
                  "type": "text",
                  "text": flex_recruit_num,
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "margin": "10px",
              "contents": [
                {
                  "type": "text",
                  "text": "預計甄試人數",
                  "color": "#aaaaaa",
                  "size": "sm",
                  "flex": 3
                },
                {
                  "type": "text",
                  "text": flex_plan_to_review,
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "margin": "10px",
              "contents": [
                {
                  "type": "text",
                  "text": "離島外加名額",
                  "color": "#aaaaaa",
                  "size": "sm",
                  "flex": 3
                },
                {
                  "type": "text",
                  "text": flex_recommend,
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            },
            {
              "type": "box",
              "layout": "baseline",
              "spacing": "sm",
              "contents": [
                {
                  "type": "text",
                  "text": "甄試日期",
                  "color": "#aaaaaa",
                  "size": "sm",
                  "flex": 3
                },
                {
                  "type": "text",
                  "text": flex_review_date,
                  "wrap": true,
                  "color": "#666666",
                  "size": "sm",
                  "flex": 5
                }
              ]
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "spacing": "sm",
      "contents": [
        {
          "type": "button",
          "style": "link",
          "height": "sm",
          "action": {
            "type": "uri",
            "label": "查看校系分則",
            "uri": flex_url
          }
        }, {
          "type": "button",
          "style": "link",
          "height": "sm",
          "action": {
            "type": "postback",
            "label": "移除此科系",
            "data": "remove " + code + "-" + flex_meta_title,
            "displayText": "移除 " + flex_meta_title
          }
        },
        {
          "type": "button",
          "style": "primary",
          "height": "sm",
          "action": {
            "type": "uri",
            "label": "加入行事曆",
            "uri": flex_gcd_url
          }
        },
        {
          "type": "spacer",
          "size": "sm"
        }
      ],
      "flex": 0
    }

  }

  console.log("成功整理一個收藏科系的資料")

  return flex_bubble_tmp;
}

function generate_calender_url(department_title, review_date_text) {

  review_date_text = review_date_text.replace("111", "2022");
  review_date_text = review_date_text.replaceAll("\n", "");
  var date_array = [];

  if (review_date_text.indexOf("~") != -1) {
    if (review_date_text.indexOf(" ~ ") != -1) {
      date_array = review_date_text.split(' ~ ');
    }
    else {
      date_array = review_date_text.split("~");
    }
  }

  else if (review_date_text.includes("至")) {
    date_array = review_date_text.split("至");
  }
  else if (review_date_text.includes("/")) {
    date_array = review_date_text.split(" / ");
  }
  else if (review_date_text == "--" || review_date_text.includes("、")) {
    return "https://www.google.com/calendar/";
  }
  else {
    date_array.push(review_date_text);
    date_array.push(review_date_text);
  }

  let start_date = date_array[0].replaceAll(".", "");
  let end_date = date_array[1].replaceAll(".", "");

  department_title = encodeURI(department_title + "二階面試");
  let department_detail = encodeURI("review date");

  gcd_url = "https://www.google.com/calendar/render?action=TEMPLATE&text=" + department_title + "&details=" + department_detail + "&dates=" + start_date + "T000000Z%2F" + end_date + "T090000Z";

  console.log(date_array);
  console.log(gcd_url);

  return gcd_url;

}

function separate(data_array) {

  var departments_array = [];
  for (var x = 0; x < data_array.length; x++) {
    if ((x + 1) % 8 == 0) {
      var tmp_array = data_array.slice(x - 7, x + 1); //0-7; 8-15
      departments_array.push(tmp_array);
    }
  }
  return departments_array;
}
