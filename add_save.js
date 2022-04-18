function add_save(id,department) {

    const CHANNEL_ACCESS_TOKEN = 'm9BfpxTGOEFg0udH2KIoeLZDPIRkPdrg40nXFM81nZ4crMj0J+c/XyN8UAW9XohfbDem1/xLdS8tVZnFnxfiHadvx8W0ZsBKZgKZnVrzddI35apIRtm0tkp9TDr22iBpF/yZJdWnCdMPfEZGEwOu2QdB04t89/1O/w1cDnyilFU=';
    
    try {
        //  呼叫 LINE User Info API，以 user ID 取得該帳號的使用者名稱
        var response = UrlFetchApp.fetch(nameurl, {
            "method": "GET",
            "headers": {
                "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN,
                "Content-Type": "application/json"
            },
        });

        let namedata = JSON.parse(response);
        let user_name = namedata.displayName;
    }

    catch {
        user_name = "not avaliable";
    }

    
}