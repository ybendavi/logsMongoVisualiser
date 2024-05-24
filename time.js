exports.timestamp = function() {
    return Math.round(new Date().getTime() / 1000);
};

exports.sameDay = function(timestamp1, timestamp2) {
    let date1 = new Date(timestamp1);
    let date2 = new Date(timestamp2);

    if (date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()) {
        return true;
    }
    return false;
};

exports.timestampSaisieToDate = function(timestamp) {
    let date = new Date(timestamp);
    let result;

    if (date.getDate() < 10) {
        result = "0"+date.getDate()+"-";
    } else {
        result = date.getDate()+"-";
    }

    if (date.getMonth() < 10) {
        result += "0"+(date.getMonth()+1)+"-";
    } else {
        result += (date.getMonth()+1)+"-";
    }

    result += date.getFullYear();

    return result;
};

exports.getActualDay = function(timestamp) {
    let date = new Date(timestamp * 1000);

    return date.getDate();
};

exports.getActualMonth = function(timestamp) {
    let date = new Date(timestamp * 1000);

    return date.getMonth();
};

exports.getActualYear = function(timestamp) {
    let date = new Date(timestamp * 1000);

    return date.getFullYear();
};

exports.getTimestampWithDate = function(date) {
    date = date.split('-');
    let d = new Date( date[2], date[1], date[0]);
    return d.getTime() / 1000;
};

exports.getAge = function(dob) {
    dob = new Date(dob);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);

    return age;
};

exports.getDateWithTimestamp = function(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}
