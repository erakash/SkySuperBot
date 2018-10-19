function ClassifyMessage(telegramcontext) {
    var telegramcommand = telegramcontext.text.toLowerCase();
    var isYouTubeLink = telegramcommand.includes("youtu");
    if (isYouTubeLink) {
        return 'youtubelink';
    }
    else
        return 'optionnotavailable';
}

module.exports.ClassifyMessage = ClassifyMessage;