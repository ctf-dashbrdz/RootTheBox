function text_animation(term) {
    var index = 0;
    var user = $('#handle').val();
    var reward = $('#reward').val();
    var bots = $('#usebots').val();
    var bank = $('#banking').val();
    var intro_frames = [
        "Hello [[b;;]" + user + "],\n",
        "I am your new employer. You may call me [[b;;]Morris].",
        " ",
        "I hope you're well rested.  We have a lot of work to do.",
        "I have several assignments which require your... special skill set.",
        " ",
        "You may view your current assignments by selecting \n\"Missions\" from the Game menu.",
    ];
    if (bots === 'true') {
        intro_frames.push("\nI will also be glad to rent your botnet for $" + reward + " per bot.");
    }
    if (bank === 'true') {
        intro_frames.push(" ",
            "\nI've taken the liberty of depositing some seed money in your team's bank account.",
            "See that it's put to good use."
        );
    }
    intro_frames.push(" ", "Good hunting,\n    -Morris", " ");

    term.echo("[[b;;]**************** BEGIN SECURE COMMUNIQUE ****************]\n");

    function display(term, index) {
        term.echo(intro_frames[index]);
        index += 1;
        if (index < intro_frames.length) {
            setTimeout(display, 1500, term, index);
        } else {
            term.echo("[[b;;]**************** END OF TRANSMISSION ****************]");
        }
    }
    setTimeout(display, 1500, term, index);
}

function loading(term) {
    term.clear();
    var count = 0;
    loading_bar = ["|", "/", "-", "\\"];
    message = "\n[[b;;]> Establishing communication channel, please wait...]";

    function display(term, count) {
        term.clear();
        sym = loading_bar[count % loading_bar.length];
        term.echo(message + sym);
        count += 1;
        if (count < 35) {
            setTimeout(display, 100, term, count);
        } else {
            $(".c-glitch").empty();
            term.clear();
            text_animation(term);
        }
    }
    display(term, count);
}

function greetings(term) {
    term.pause();
    loading(term);
}

$(document).ready(function() {
    $("#closebutton").click(function(){
        window.location = '/user';
    });
    $('#console').terminal({
        /* No commands just animation */
    }, {
        prompt: " > ",
        name: 'console',
        greetings: null,
        tabcompletion: true,
        onInit: function(term) {
            greetings(term);
        },
    });
});
