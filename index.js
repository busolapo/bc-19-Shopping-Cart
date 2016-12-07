$(document).ready(function(){
  $('.shoe')
    .bind('dragstart', function(evt){
      evt.dataTransfer.setData('text', this.id);
      $('h2').fadeIn('fast');
    })
      .hover(
        function(){ $('div', this).fadeIn(); },
        function(){ $('div', this).fadeOut(); }

      );

  $('#cart')
    .bind('dragover', function(evt){
      evt.preventDefault();
    })
    .bind('dragenter', function(evt){
      evt.preventDefault();
    })
    .bind('drop', function(evt){
      var id = evt.dataTransfer.getData('text'),
          shoe = $('#' + id),
          cartList = $("#cart ul"),
          total = $("#total span"),
          price = $('p:eq(1) span', shoe).text(),
          prevCartItem = null,
          notInCart = (function (){
            var list = $('li', cartList),
                len = list.length,
                i;
            for(i = 0; i < len; i++){
              var temp = $(list[i]);
              if(temp.data("id") === id){
                prevCartItem = temp;
                return false;
              }
            }
            return true;
          } ()),
          remQuantEl, quantBoughtEl, remQuant;

          $('h2').fadeOut('fast');

          if(notInCart){
            prevCartItem = $('<li />', {
              text : $('p:first', shoe).text(),
              data : { id : id}
            }).prepend($('<span />', {
                'class' : 'quantity',
                 text : '0'
            }))
              .prepend($('<span />', {
                'class' : 'price',
                 text : price
              })).appendTo(cartList);
            }


          remQuantEl = $('p:last span', shoe);
          remQuant = parseInt(remQuantEl.text(), 10) - 1;
          remQuantEl.text(remQuant);
          quantBoughtEl = $('.quantity', prevCartItem);
          quantBoughtEl.text(parseInt(quantBoughtEl.text(), 10) + 1);

          if(remQuant === 0){
            shoe.fadeOut('fast').remove();
          }


          total.text((parseFloat(total.text(), 10) + parseFloat(price.split('$')[1])).toFixed(2))

          evt.stopPropagation();
          return false;
    });

  })
