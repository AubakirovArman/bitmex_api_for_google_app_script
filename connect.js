
/////////соединение с биржей bitmex
function Bitmex(command, data, method, pos) {

  var baseUrl = "https://www.bitmex.com";
  var key = "api key"
  var secret = "api secret"
  var timestamp = Math.floor(new Date().getTime() / 1000) + 2 + "";
  var postBody = JSON.stringify(data);

  if (pos == 1) {
    var options = {
      method: method,
      contenttype: "application/json; charset=utf-8",
      payload: data
    }
    var response = UrlFetchApp.fetch(baseUrl + command, options);
  }
  if (pos == 0) {
    var options = {
      method: method,
      contenttype: "application/json; charset=utf-8",

    }
    var response = UrlFetchApp.fetch(baseUrl + command + "?" + data, options);
  }
  if (pos == 4) {
    var options = {
      method: method,
      contenttype: "application/json; charset=utf-8",

    }
    var response = UrlFetchApp.fetch(baseUrl + command, options);
  }
  else if (pos == 2) {
    var string = method + command + timestamp;
    var signature = Utilities.computeHmacSha256Signature(string, secret);

    signature = signature.map(function (e) { var v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v; }).join("");
    var options = {
      method: method,
      contentType: "application/json; charset=utf-8",

      headers: {
        "api-expires": timestamp,
        "api-key": key,
        "api-signature": signature
      },
      payload: data
    }


    var response = UrlFetchApp.fetch(baseUrl + command, options);
  }
  else if (pos == 3) {
    Logger.log(JSON.stringify(data))
    var string = method + command + timestamp + JSON.stringify(data)
    var signature = Utilities.computeHmacSha256Signature(string, secret);

    signature = signature.map(function (e) { var v = (e < 0 ? e + 256 : e).toString(16); return v.length == 1 ? "0" + v : v; }).join("");
    var options = {
      method: method,
      contentType: "application/json; charset=utf-8",
      headers: {
        "api-expires": timestamp,
        "api-key": key,
        "api-signature": signature
      },
      payload: JSON.stringify(data)
    }

    var url = encodeURI(baseUrl + command)
    var response = UrlFetchApp.fetch(url, options);
  }
  var data = JSON.parse(response.getContentText());
  return data;
}


