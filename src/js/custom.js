/* Add here all your javascript (customizations) */

var AppCustom = function () {

  // var chartColors, validationRules = getValidationRules ();

  // Ocean Breeze
  chartColors = ['#94BA65', '#2B4E72', '#2790B0', '#777','#555','#999','#bbb','#ccc','#eee'];

  return {
    init: init,
    chartColors: chartColors,
  };


  /* -------------------------------------------------------------------------------- */
  function init () {

    console.log("AppCustom.init - OK");
    ___pace();

  }
  /* -------------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------------- */
  function ___pace() {
    Pace.on('start', function(){
      console.log('start');
    });

    Pace.on('done', function() {
      $('body').each (function () {
        $(this).addClass('load-body-pace-done');
        $(this).removeClass('load-body').removeClass('load-body-pace-hide');
      });

      // ___sleep(800);
      console.log('done');
    });

    Pace.on('hide', function() {
      $('body').each (function () {
        $(this).addClass('load-body-pace-hide');
        $(this).removeClass('load-body').removeClass('load-body-pace-done');
      });

      $('#load-content').fadeIn(1200);
      $('[data-toggle="tooltip"]').tooltip();
      console.log('hide');
    });
  }
  /* -------------------------------------------------------------------------------- */



  /* -------------------------------------------------------------------------------- */
  function ___sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }
  /* -------------------------------------------------------------------------------- */



}();
