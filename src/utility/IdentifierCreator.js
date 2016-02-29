export default function () {
  return {
    convertBrowserComponents: function (callback) {
      var longHash = 0;
      longHash += this.stringToHash(window.navigator.userAgent);
      longHash += this.stringToHash(window.navigator.language);
      longHash += this.stringToHash(window.screen.colorDepth.toString());
      longHash += this.stringToHash(window.screen.height.toString() + window.screen.width.toString());
      callback(longHash);
      return longHash;
    },
    stringToHash: function(string){
      var hash = 0;
      if (string.length == 0) return hash;
      for (var i = 0; i < string.length; i++) {
        var character = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
      }
      if (hash < 1) {
        hash *= -1;
      }
      return hash;
    }

  }
}

