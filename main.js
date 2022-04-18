//eval(UrlFetchApp.fetch('http://path.to/external/javascript.js').getContentText());

const sheet_url = "";
const star_sheet_url = "";
const savelist_url = "";
const SpreadSheet = SpreadsheetApp.openByUrl(sheet_url);
const Star_SpreadSheet = SpreadsheetApp.openByUrl(star_sheet_url);
const Save_SpreadSheet = SpreadsheetApp.openByUrl(savelist_url);

var note_message = "";

const CHANNEL_ACCESS_TOKEN = ""


function set_schoole_code(word) {

  let code_sheet = SpreadSheet.getSheetByName("school_code");
  let lastrow = code_sheet.getLastRow();
  let keyword_column = 2, code_column = 3;

  if (word.includes("台")) {
    word = word.replace("台", "臺");
  }

  for (var x = 1; x <= lastrow; x++) {
    var tmp_match = code_sheet.getRange(x, keyword_column).getValue();
    if (tmp_match.includes(word)) {
      let match_code = code_sheet.getRange(x, code_column).getValue();
      return match_code;
    }
  }
  return "not found";
}

function check_if_school(word) {

  let is_school_name = true;

  if (word.includes("大")) {
    return is_school_name;
  }
  else {
    is_school_name = false;
    return is_school_name;
  }

}

function format_school_name(word) {

  word = word.replace("國立", "");
  word = word.replace("私立", "");
  var word_array;

  if (word.includes("大學")) {
    word_array = word.split("大學");
    formatted_name = word_array[0] + "大學";
  }
  else if (word.includes("大")) {
    word_array = word.split("大");
    formatted_name = word_array[0] + "大";
  }

  return formatted_name;
}

function search_department(code, department) {

  try {
    let school_sheet = SpreadSheet.getSheetByName(code);
    let lastrow = school_sheet.getLastRow();
    var info_array = [], status = "";
    var data_array = school_sheet.getRange(1, 1, lastrow, 1).getValues();
    data_array = data_array.flat();
    var position_array = [];

    var search_data = full_search(department, data_array);
    for (var x = 0; x < search_data.length; x++) {
      if (search_data[x].score <= 0.25) {
        console.log(search_data[x])
        position_array.push(search_data[x].refIndex + 1);
      }
    }

    extensive_search();


    console.log("p_a: " + position_array);

    let time = position_array.length;

    for (var x = 0; x < time; x++) {
      let target_row = position_array[x];
      status = "got";

      var search_count = school_sheet.getRange(target_row, 9).getValue();
      if (search_count == "") {
        search_count = 0;
      }
      school_sheet.getRange(target_row, 9).setValue(search_count += 1);

      let department_info_array = school_sheet.getRange(target_row, 2, 1, 7).getValues();
      console.log(department_info_array);
      info_array = info_array.concat(department_info_array.flat());
      console.log("flatted: " + info_array);
      info_array.push(target_row); // to add position data
    }

  }
  catch (e) {
    if (code == "not found") {
      status = "school not found";
    }
    else {
      console.log("error" + e);
    }
  }

  if (status == "got") {
    console.log("ok");
    console.log("info" + info_array);
    return info_array;
  }

  else if (status == "school not found") {
    return "school not found";
  }

  else {
    return "department not found";
  }

  function extensive_search() {
    if (position_array.length == 0) {
      for (var x = 0; x < search_data.length; x++) {
        if (search_data[x].score <= 0.5) {
          console.log(search_data[x])
          position_array.push(search_data[x].refIndex + 1);
          note_message = "未找到完全相符的科系，已啟用廣泛搜尋模式，下列結果可能較不準，請確認輸入的科系名稱是否正確或避免簡寫";
        }
      }
    }
  }
}

function star_search_department(code, department) {

  try {
    let star_school_sheet = Star_SpreadSheet.getSheetByName(code);
    let lastrow = star_school_sheet.getLastRow();
    var info_array = [], status = "";
    var data_array = star_school_sheet.getRange(1, 1, lastrow, 1).getValues();
    data_array = data_array.flat();
    var position_array = [];

    var search_data = full_search(department, data_array);
    for (var x = 0; x < search_data.length; x++) {
      if (search_data[x].score <= 0.25) {
        console.log(search_data[x])
        position_array.push(search_data[x].refIndex + 1);
      }
    }

    extensive_search();


    console.log("p_a: " + position_array);

    let time = position_array.length;

    for (var x = 0; x < time; x++) {
      let target_row = position_array[x];
      status = "got";

      var search_count = school_sheet.getRange(target_row, 9).getValue();
      if (search_count == "") {
        search_count = 0;
      }
      school_sheet.getRange(target_row, 9).setValue(search_count += 1);

      let department_info_array = school_sheet.getRange(target_row, 2, 1, 7).getValues();
      console.log(department_info_array);
      info_array = info_array.concat(department_info_array.flat());
      console.log("flatted: " + info_array);
      info_array.push(target_row); // to add position data
    }

  }
  catch (e) {
    if (code == "not found") {
      status = "school not found";
    }
    else {
      console.log("error" + e);
    }
  }

  if (status == "got") {
    console.log("ok");
    console.log("info" + info_array);
    return info_array;
  }

  else if (status == "school not found") {
    return "school not found";
  }

  else {
    return "department not found";
  }

  function extensive_search() {
    if (position_array.length == 0) {
      for (var x = 0; x < search_data.length; x++) {
        if (search_data[x].score <= 0.5) {
          console.log(search_data[x])
          position_array.push(search_data[x].refIndex + 1);
          note_message = "未找到完全相符的科系，已啟用廣泛搜尋模式，下列結果可能較不準，請確認輸入的科系名稱是否正確或避免簡寫";
        }
      }
    }
  }
}


function doPost(e) {
  var msg = JSON.parse(e.postData.contents);

  var test_sheet = SpreadSheet.getSheetByName("json"), log_sheet = Save_SpreadSheet.getSheetByName("unlog");

  var replyToken = msg.events[0].replyToken;
  var receivetype = msg.events[0].type;
  var userMessage = "";
  const user_id = msg.events[0].source.userId;

  test_sheet.getRange(1, 1).setValue(user_id);
  test_sheet.getRange(1, 2).setValue(receivetype);


  switch (receivetype) {
    case "message":
      try {
        userMessage = msg.events[0].message.text;
        handle_message();
      }
      catch (e) {
        test_sheet.getRange(2, 1).setValue(e);
        reply_message = reply_text("哎呀抱歉，程式好像出了點錯誤⋯⋯\n\n錯誤狀況已自動通報給製作團隊，請稍等一下再回來吧！不好意思！")
        send_to_line(replyToken, reply_message);
      }
      break;
    case "postback":
      var userPostback_data = msg.events[0].postback.data;
      test_sheet.getRange(1, 3).setValue(userPostback_data);
      handle_postback();
      break;
    case "follow":
      handle_follow();
      break;
  }

  var reply_message = [];


  function handle_message() {

    userMessage = userMessage.replace("\n", "");

    if (check_if_school(userMessage)) {

      userMessage = userMessage.replace(" ", "");
      userMessage = format_search_word(userMessage);


      let school_name = format_school_name(userMessage);
      let school_code = set_schoole_code(school_name), department = userMessage.replace(school_name, "");

      department = department.replace("國立", "");
      department = department.replace("私立", "");

      let data_array = search_department(school_code, department);

      if (data_array == "school not found") {
        reply_message = reply_text("未找到該學校，請輸入學校全名搜尋\n（ 亦可能是該學校科系尚未被收錄 ）");
      }
      else if (data_array == "department not found") {
        reply_message = reply_text("未找到該科系，請輸入科系完整全名或代碼搜尋\n（ 若有加入分組，請移除分組資訊再搜尋 ）");
        let lastrow = log_sheet.getLastRow()
        log_sheet.getRange(lastrow + 1, 1).setValue(userMessage);
      }

      else {
        reply_message = format_flex(school_code, data_array);
      }
    }
    // end of check if school

    else if(userMessage.includes("繁星")){
      userMessage = userMessage.replace("繁星","");
    }

    else if (userMessage == "顯示收藏" || userMessage == "查看收藏" || userMessage == "看收藏" || userMessage == "收藏") {
      if (showsave(user_id) == "blank") {
        reply_message = reply_text("尚未有收藏紀錄，請先加入至少一個收藏科系");
      }
      else {
        reply_message = showsave(user_id);
      }
    }
    // end of 顯示收藏

    else if (userMessage == "清除收藏") {
      var confrim = [{
        "type": "template",
        "altText": "確定要刪除所有收藏科系嗎？",
        "template": {
          "type": "confirm",
          "text": "確定要刪除所有紀錄嗎？所有收藏的科系都會清空且無法還原",
          "actions": [
            {
              "type": "postback",
              "label": "確定",
              "data": "delete_all",
              "text": "確定刪除"
            },
            {
              "type": "postback",
              "label": "取消",
              "data": "delete_cancel",
              "text": "取消"
            }
          ]
        }
      }]

      reply_message = confrim;
    }
    // end of 清除蒐藏

    else if (userMessage == "確定刪除") {
      reply_message = [];
    }

    else if (userMessage == "關於作者") {
      reply_message = [{
        "type": "text",
        "text": "「 校系分則查詢機器人 」是 Polly, Justin, Shawn 3 個澎湖高中生一起做的的小型程式作品，Shawn 負責寫 code，其他 2 人負責處理各大學校資料。"
      }, {
        "type": "text",
        "text": "【 設計動機 】\n\n我們在整理校系分則資料時，發現翻簡章很麻煩，又怕選到二階日期重複的科系，因此一起彙整了教育部的校系分則簡章、設計 LINE 聊天機器人，讓同學和家長能在 LINE 上快速搜尋各大學的科系個申資訊，一鍵把有興趣的科系收藏起來、或把面試日期加到 Google 日曆裡方便安排時間。"
      }, {
        "type": "text",
        "text": "由於人力和時間有限，儘管力求完美，可能還會有些程式或資料的錯誤，如果在使用上有遇到任何問題，歡迎傳送「聯絡我們」與製作團隊聯繫。\n\n最後要感謝您使用我們的作品！希望能幫到您，如果喜歡這個機器人，也別忘記分享給其他朋友喔！"
      }]
    }
    //end of author about 關於作者

    else if (userMessage == "聯絡我們" || userMessage == "意見回饋" || userMessage == "聯絡") {
      reply_message = [{
        "type": "flex",
        "altText": "歡迎與製作團隊聯絡！",
        "contents": {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "Contact Us",
                "weight": "bold",
                "size": "xl"
              },
              {
                "type": "box",
                "layout": "vertical",
                "margin": "lg",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "text",
                    "text": "若有錯誤回報、意見回饋，或想給予製作者們鼓勵的話，請點選下方按鈕👇",
                    "position": "relative",
                    "wrap": true
                  }
                ],
                "paddingBottom": "15px"
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
                "style": "secondary",
                "height": "sm",
                "action": {
                  "type": "uri",
                  "label": "聯絡作者",
                  "uri": "https://jcshawn.com/department-search-bot"
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
      }]
    }
    // end of contact

    else if (userMessage == "操作教學" || userMessage == "使用教學" || userMessage == "教學") {
      reply_message = [{
        "type": "text",
        "text": "1.搜尋大學科系簡章\n傳送「大學名稱 ( 含大字或大學二字 ) + 科系名稱」，例如：「台大資工」或「清華大學化學系」🔍"
      }, {
        "type": "text",
        "text": "2.收藏科系 or 刪除收藏\n若有喜歡的科系，可以點選資訊卡加入收藏按鈕，之後傳「顯示收藏」就能快速找到你儲存的科系資訊📁\n\n若要刪除科系，可以在收藏名單單獨刪除，或是傳送「清除收藏」刪除所有紀錄🗑"
      }]
    }


    else {
      reply_message = [
        {
          "type": "text",
          "text": "請輸入指定大學名稱 ( 含大字或大學二字 ) 與科系名稱，我會幫你搜尋該科系的校系分則簡章跟相關資料！像是「台大資工」、「政治大學資訊科學系」。\n\n* 若要搜尋私立大學，請打「 完整學校名稱 」，例如「東吳大學」，使用簡寫會搜尋不到科系～🙅\n\n* 本機器人無法由真人回覆，若有疑問或指教，請點選「意見回饋」按鈕 ✉️",
          "quickReply": {
            "items": [
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "顯示收藏⭐️",
                  "text": "顯示收藏"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "清除收藏🗑",
                  "text": "清除收藏"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "操作教學📓",
                  "text": "操作教學"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "message",
                  "label": "關於作者群🧑‍💻",
                  "text": "關於作者"
                }
              },
              {
                "type": "action",
                "action": {
                  "type": "uri",
                  "label": "意見回饋✉️",
                  "uri": "https://jcshawn.com/department-search-bot"
                }
              }
            ]
          }
        }
      ];
    }
    send_to_line(replyToken, reply_message);

    function format_search_word(word) {
      let last_word = word.charAt(word.length - 1);
      let last_two_word = word.charAt(word.length - 2);

      word = word.replace("系", "");

      if (last_word == "學" && last_two_word != "科") {
        word = word.slice(0, word.length - 1);
      }
      return word
    }
  }

  function handle_postback() {
    if (userPostback_data.includes("-") && userPostback_data.indexOf("remove") == -1) {
      let status = add_save(user_id, userPostback_data);
      switch (status) {
        case "department saved":
          reply_message = [
            {
              "type": "text",
              "text": "已成功收藏科系",
              "quickReply": {
                "items": [
                  {
                    "type": "action",
                    "action": {
                      "type": "message",
                      "label": "顯示收藏⭐️",
                      "text": "顯示收藏"
                    }
                  },
                  {
                    "type": "action",
                    "action": {
                      "type": "message",
                      "label": "清除收藏🗑",
                      "text": "清除收藏"
                    }
                  }
                ]
              }
            }
          ]
          break;
        case "fulled":
          reply_message = reply_text("收藏名單已達上限（ 6 個科系 ），傳送「刪除收藏」後再重新加入。");
          break;
        case "repeated":
          reply_message = reply_text("你已收藏過此科系嘍，傳送「顯示收藏」，我就能顯示你的收藏科系～")
          break;
      }
    }

    else if (userPostback_data.includes("remove")) {
      let department = userPostback_data.replace("remove ", "")
      let status = remove_single_save(user_id, department);

      switch (status) {
        case "blank":
          reply_message = reply_text("你的收藏名單沒有該科系嘍～ 🙅");
          break;
        case "cleared":
          reply_message = reply_text("成功刪除收藏科系 👌🏻");
          break;
      }
    }

    else if (userPostback_data.includes("delete")) {
      userPostback_data = userPostback_data.replace("delete_", "");
      if (userPostback_data == "all") {
        var status = remove_all_save(user_id);

        switch (status) {
          case "cleared":
            reply_message = reply_text("已清除所有科系");
            break;
          case "new":
            reply_message = reply_text("您尚未收藏任何科系，請先搜尋科系並收藏 🤔");
            break;
          case "work here but error occured":
            reply_message = reply_text("遇到錯誤，請稍後再試 😵‍💫");
            break;
        }
      }
      else if (userPostback_data == "cancel") {
        reply_message = reply_text("已取消刪除 🤷🏻‍♂️");
      }
    }
    send_to_line(replyToken, reply_message);
  }

  function handle_follow() {

    username = getusername(user_id);

    reply_message = [{
      "type": "text",
      "text": "嗨囉" + username + " 👋 我是「 個申資訊查詢小幫手 」，我可以幫你快速查詢各個大學科系的校系分則簡章，也能幫你收藏科系、把面試日期一鍵加到行事曆！"
    }, {
      "type": "text",
      "text": "如果要搜尋大學科系簡章，傳送「大學名稱 ( 含大或大學二字 ) 」與「科系名稱」。\n\n✅ 正確示範：「 台大資工 」或「 清華大學化學系 」🔍\n\n❌ 錯誤示範：「資工」、「台大」（ 要同時傳送大學名稱和科系 ）"
    },
    {
      "type": "text",
      "text": "若要搜尋私立大學，請打「 完整學校名稱 」，例如「東吳大學」、「輔仁大學」，使用簡寫會搜尋不到科系"
    }]

    send_to_line(replyToken, reply_message);
  }

}


function reply_text(text) {
  let msgdata = [{
    "type": "text",
    "text": text
  }];

  return msgdata;
}

function add_save(user_id, department) {

  const savelist = Save_SpreadSheet.getSheetByName("save_list");

  let lastrow = savelist.getLastRow();
  let lastcolumn = savelist.getLastColumn();
  let save_limit = 6;
  let target_row = 0;

  var x = 1;
  var userstatus = "";

  console.log("start");

  while (x <= lastrow) {

    var tmp_sheet_id = savelist.getRange(x, 1).getValue();

    if (tmp_sheet_id == user_id) {
      target_row = x;
      userstatus = "saved";
      console.log("user found!");
      break;
    }
    else {
      userstatus = "new";
      console.log("new");
      x += 1;
    }
  }
  console.log("start check");

  function check_repeat() {
    for (x = 3; x <= (2 + save_limit); x++) {
      var tmp_cell_value = savelist.getRange(target_row, x).getValue();
      if (department == tmp_cell_value) {
        console.log("repeated");
        return "repeated";
      }
      else {
        if (tmp_cell_value == "") {
          savelist.getRange(target_row, x).setValue(department);
          console.log("department saved");
          return ("department saved");
        }
        else if (savelist.getRange(target_row, save_limit + 2).getValue() != "") {
          full = true;
          console.log("fulled");
          return ("fulled");
        }
      }
    }
  }

  function add_new_user() {
    console.log("start add new");
    let user_name = getusername(user_id);

    savelist.getRange(lastrow + 1, 1).setValue(user_id);
    savelist.getRange(lastrow + 1, 2).setValue(user_name);
    savelist.getRange(lastrow + 1, 3).setValue(department);
    console.log("new save successed!");
  }

  try {
    switch (userstatus) {
      case "saved":
        console.log("user was saved");
        return check_repeat();
        break;
      case "new":
        console.log("new!");
        add_new_user();
        break;
      default:
        console.log("out");
    }
  }
  catch (e) {
    console.log("error");
  }

  console.log("end");

} // end of save user

function showsave(user_id) {

  const save_list = Save_SpreadSheet.getSheetByName("save_list");

  var lastrow = save_list.getLastRow(), target_row = 0, x = 1;

  let id_array = save_list.getRange(1, 1, lastrow, 1).getValues();
  id_array = id_array.flat();

  console.log(id_array);

  let check_if_id = id_array.some(data => data.includes(user_id));


  if (check_if_id == false) {
    console.log("j");
    return "blank";
  }
  else {
    try {
      var target_row = id_array.indexOf(user_id) + 1;
      console.log(target_row);

      var result = get_saved_department();
      if (result == "blank") {
        return result;
      }
      else {
        var flex_content = [
          {
            "type": "text",
            "text": "收藏名單如下👇\n\n*提醒：實際個申資訊與二階日期請另外參考各校簡章與該校規定"
          },
          {
            "type": "flex",
            "altText": "請看收藏名單",
            "contents": {
              "type": "carousel",
              "contents": result
            }
          }];
      }
      return flex_content
    }
    catch (e) {
      console.log(e);
    }

  }

  function get_saved_department() {

    var target_end_column = 0;
    var save_range_start = 3;
    var save_limit = 6;

    for (x = save_range_start; x <= (save_range_start + save_limit); x++) {
      if (save_list.getRange(target_row, x).getValue() == "") {
        target_end_column = x - 1;
        break;
      }
    }

    if (target_end_column == 2) {
      return "blank";
    }
    else {
      var tmp_all_data = save_list.getRange(target_row, 3, 1, target_end_column - 2).getValues();
      console.log("tr: " + tmp_all_data)
      console.log("end:" + target_end_column);
      var saved_array = [], school_code, department_position, raw_title, cell_array;

      for (let x = 0; x <= (target_end_column - 3); x++) { // save_limit is here too

        raw_title = tmp_all_data[0][x];
        cell_array = raw_title.split("-"); // split by -

        school_code = cell_array[0], department_position = cell_array[1];

        saved_array.push(format_saved_flex(school_code, department_position));

      }
      return saved_array;
    }
  }
}

function getusername(user_id) {
  try {
    var nameurl = "https://api.line.me/v2/bot/profile/" + user_id;
    var response = UrlFetchApp.fetch(nameurl, {
      "method": "GET",
      "headers": {
        "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
        "Content-Type": "application/json"
      },
    });

    let namedata = JSON.parse(response);
    var user_name = namedata.displayName;
    console.log(user_name);
  }

  catch (e) {
    user_name = "not avaliable";
    console.log(e);
  }

  return user_name;
}



function remove_all_save(user_id) {

  const savelist = Save_SpreadSheet.getSheetByName("save_list");

  let lastrow = savelist.getLastRow();

  var x = 1;
  var userstatus = "";

  console.log("start");

  while (x <= lastrow) {

    var tmp_sheet_id = savelist.getRange(x, 1).getValue();

    if (tmp_sheet_id == user_id) {
      target_row = x;
      userstatus = "saved";
      console.log("user found!");
      break;
    }
    else {
      userstatus = "new";
      console.log("new");
      x += 1;
    }
  }
  console.log("start check");

  function clear_all_data() {
    console.log("start cleaning");
    for (var y = 3; y <= 8; y++) {
      try {
        savelist.getRange(x, y).clear()
      }
      catch (e) {
        console.log(e);
        return "work here but error occured";
      }
    }
    return "cleared";
  }


  try {
    switch (userstatus) {
      case "saved":
        console.log("user was saved");
        return clear_all_data();

      case "new":
        console.log("new");
        return "new";

      default:
        console.log("out");
    }
  }
  catch (e) {
    console.log("error");
  }

  console.log("end");

}

// end of clear user


function remove_single_save(user_id, department) {

  const savelist = Save_SpreadSheet.getSheetByName("save_list");

  let lastrow = savelist.getLastRow(), target_row = 0;
  var x = 1, userstatus = "";

  console.log("start");

  while (x <= lastrow) {

    var tmp_sheet_id = savelist.getRange(x, 1).getValue();

    if (tmp_sheet_id == user_id) {
      target_row = x;
      userstatus = "saved";
      console.log("user found!");
      break;
    }
    else {
      userstatus = "new";
      console.log("new");
      x += 1;
    }
  }
  console.log("start check");

  function clear_single_data() {

    console.log("start cleaning");

    for (var y = 3; y <= 8; y++) {
      let tmp_department = savelist.getRange(target_row, y).getValue();
      console.log("tmp " + tmp_department);

      if (tmp_department.includes(department)) {
        console.log("有已收藏且可移除的科系");
        savelist.getRange(target_row, y).clear();
        var tmp_data = "";

        for (var z = (y + 1); z <= 8; z++) {
          tmp_data = savelist.getRange(target_row, z).getValue();
          savelist.getRange(target_row, z - 1).setValue(tmp_data);
          savelist.getRange(target_row, z).clear();
        }
        return "cleared";
      }
    }

    return "blank";
  }


  try {
    switch (userstatus) {
      case "saved":
        console.log("user was saved");
        return clear_single_data();
        break;
      case "new":
        console.log("new!");
        return "new";
        break;
      default:
        console.log("out");
    }
  }
  catch (e) {
    console.log("error");
  }

  console.log("end");

}

// end of remove single department

function send_to_line(replyToken, reply_message) {
  //回傳訊息給line 並傳送給使用者
  var url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': reply_message,
    }),
  });
}

function whiletest() {
  let result = showsave("Ucf035f28a267b5e22edc042c4d91623c");
  console.log(result);
}
