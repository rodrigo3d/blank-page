/* Add here all your javascript (customizations) */

var AppCustom = function () {

  return {
    init: init
  };


  /* -------------------------------------------------------------------------------- */
  function init() {

    console.log("AppCustom.init - OK");
    ___pace();

  }
  /* -------------------------------------------------------------------------------- */


  /* -------------------------------------------------------------------------------- */
  function ___pace() {
    Pace.on('start', function () {
      // console.log('start');
    });

    Pace.on('done', function () {
      // console.log('done');
    });

    Pace.on('hide', function () {
      $('[data-toggle="tooltip"]').tooltip();
      // console.log('hide');
    });
  }
  /* -------------------------------------------------------------------------------- */


  /* -------------------------------------------------------------------------------- */
  function ___sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  /* -------------------------------------------------------------------------------- */


}();
