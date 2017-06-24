function getQuoteText() {
    $.getJSON("https://crossorigin.me/http://quotes.stormconsultancy.co.uk/random.json?callback=?", function(json) {
        $("#quoteText").html('"' + json.quote + '"');
        $("#quoteAuthor").html("<strong>author:</strong> " + json.author);
    }).fail(function() {
        $("#quoteText").text("Sorry, now server not available");
    });
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