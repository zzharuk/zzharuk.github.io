function getQuoteText() {
    $.getJSON('http://quotes.stormconsultancy.co.uk/random.json', function(data){
        $("#quoteText").html('"' + data.quote + '"');
        $("#quoteAuthor").html("<strong>author:</strong> " + data.author);
    })
}
$(document).ready(function() {
    getQuoteText();
    $("#twit").on("click",function() {
        var textInside = $("#quoteAuthor").text() + " " + $("#quoteText").text();
        window.location="https://twitter.com/intent/tweet?text="+textInside;
    });
    $("#getQuote").on("click", function() {
        $("#quoteText, #quoteAuthor").hide(300).show(1000);
        getQuoteText();
    });
});
