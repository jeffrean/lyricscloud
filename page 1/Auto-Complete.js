alert("it works");
import 'http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.min.css';
import 'http://code.jquery.com/jquery-1.11.0.min.js';
import 'http://code.jquery.com/ui/1.10.4/jquery-ui.min.js';
alert("it got pasted here");

(function($){

  var $project = $('#project');

  var projects = [
    {
      label: "jQuery",
      icon: "jquery_32x32.png"
    },
    {
      label: "jQuery UI",
      icon: "jqueryui_32x32.png"
    },
    {
      label: "Sizzle JS",
      icon: "sizzlejs_32x32.png"
    }
  ];

  $project.autocomplete({
    minLength: 0,
    source: projects,
    focus: function( event, ui ) {
      $project.val( ui.item.label );
      return false;
    }
  });

  $project.data( "ui-autocomplete" )._renderItem = function( ul, item ) {

    var $li = $('<li>'),
        $img = $('<img>');


    $img.attr({
      src: 'https://jqueryui.com/resources/demos/autocomplete/images/' + item.icon,
      alt: item.label
    });

    $li.attr('data-value', item.label);
    $li.append('<a href="#">');
    $li.find('a').append($img).append(item.label);

    return $li.appendTo(ul);
  };


})(jQuery);
