function inStreak(date) {
    (new Date(date).getDate() === new Date().getDate() || (new Date().getDate() - new Date(date).getDate()) === 1) ? true : false;
}

module.exports = inStreak;