function full_search(word,array) {

    // Load JavaScript from External Server
    function loadJSFromServer() {
    var url = 'https://cdn.jsdelivr.net/npm/fuse.js@6.5.3';
    var javascript = UrlFetchApp.fetch(url).getContentText();
    eval(javascript);
    //console.log(javascript);
  }
    loadJSFromServer();
  
    const options = {
    includeScore: true
    }
  
  const fuse = new Fuse(array, options)
  
  const result = fuse.search(word)
  console.log(result); 
  return result;
  }