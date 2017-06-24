function getQuoteText() {
    $.getJSON('https://cors-anywhere.herokuapp.com/http://quotes.stormconsultancy.co.uk/random.json', function(data){
        $("#quoteText").html( data.quote );
        $("#quoteAuthor").html("<strong>author:</strong> " + data.author);
        $("#getQuote").removeClass("disabled");
    }).fail(function () {
        $("#quoteText").html('Sorry, server unavailable');
    });
}
$(document).ready(function() {
    getQuoteText();
    $("#twit").on("click",function() {
        var textInside = $("#quoteAuthor").text() + " " + $("#quoteText").text();
        window.location="https://twitter.com/intent/tweet?text="+textInside;
    });

    $("#getQuote").on("click", function() {
        $(this).addClass("disabled");
        getQuoteText();
    });
});
