var Singly = function(config) {
  if(!config) config = {
    host: 'singly.com'
  };
  var baseUrl = '';
  var apiHost = 'https://api.' + config.host + '/';
  var message = 'Please enter your API key from https://me.' + config.host + '/dashboard/settings#Settings-APIKey';
  var client = {};
  
  function promptForAPIKey() {
    if(window.location.protocol === 'file:') {
      var apiKey = getApiKey();
      // things get converted to strings in some browsers, so check those, just to be safe
      if(!apiKey || apiKey == 'null' || apiKey == 'undefined') apiKey = setApiKey(prompt(message, ''));
      baseUrl = apiHost + apiKey;
    }
  }

  function setApiKey(apiKey) {
    sessionStorage.setItem("apiKey", apiKey);
    return apiKey;
  }

  function getApiKey() {
    return sessionStorage.getItem("apiKey");
  }

  client.apiCall = function(path, params, callback, retry) {
    if(path.indexOf('/') !== 0) path = '/' + path;
    if(!callback && typeof params === 'function') {
      callback = params;
      params = {};
    }
    $.getJSON(baseUrl + path, params, function(data, success) {
      callback(data, success);
    });
  }
  
  promptForAPIKey();
  return client;
}