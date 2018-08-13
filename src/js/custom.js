/* Add here all your javascript (customizations) */

var AppCustom = function () {

  return {
    init: init
  };


  /* -------------------------------------------------------------------------------- */
  function init() {
    console.log("AppCustom.init - OK");
    __pace();
  }
  /* -------------------------------------------------------------------------------- */


  /* -------------------------------------------------------------------------------- */
  function __getQueryVariable(variable) {
    var query = window.location.search.substring(1),
      vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
  }
  /* -------------------------------------------------------------------------------- */


  /* -------------------------------------------------------------------------------- */
  function __InitBarProgress() {
    var percentage = document.getElementById("percentage");
    var elem = document.getElementById("progress_bar");
    var width = 1;
    var id = setInterval(frame, 40);

    function frame() {
      if (width === 100) {
        clearInterval(id);
      } else {
        width++;
        percentage.innerHTML = width + '%';
        elem.style.width = width + '%';
        if (width === 100) {
          console.log(query);
        }
      }
    }
  }
  /* -------------------------------------------------------------------------------- */


  /* -------------------------------------------------------------------------------- */
  function __pace() {
    Pace.on('start', function () {
      console.log('PaceJS - start');
    });

    Pace.on('done', function () {
      console.log('PaceJS - done');
    });

    Pace.on('hide', function () {
      var query = decodeURIComponent(__getQueryVariable("redirect") || "").replace(/\+/g, "%20");
      if (query != "") {
        $('.starter-template .lead').html("Aguarde estamos redirecionando para <span>" + query + "</span>");
        __InitBarProgress();
      }
      console.log('PaceJS - hide');
    });
  }
  /* -------------------------------------------------------------------------------- */


  /* -------------------------------------------------------------------------------- */
  function __sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  /* -------------------------------------------------------------------------------- */


}();
