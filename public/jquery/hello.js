(function () {
   $(init);

    function init() {
        var h1=$('.a');
        h1.css(
            'color','red'
        );
        h1.html('Hello again!!');

        var h2=$('<h2> Section 123</h2>');
        var theBody=$('body'); // referrring to something that already exists

        theBody.append(h2);// adds it to something that already exists
        var paragraph=$("<p>");
        paragraph.append("adds it to something that already exists");
        theBody.prepend(paragraph); //prepend above

        var movies=['Dark Knight','Iron Man', 'Interstellar', 'Inception'];
        var ul=$('<ul>');

        for(var m in movies)
        {
            var li=$('<li>').append(movies[m]);
            ul.append(li);

        }
        ul.appendTo(theBody);
        ul.sortable();


        $('p').draggable();



    }init()
})();
