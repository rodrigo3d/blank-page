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
  function __pace() {
    Pace.on('start', function () {
      console.log('PaceJS - start');
    });

    Pace.on('done', function () {
      console.log('PaceJS - done');
    });

    Pace.on('hide', function () {
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
