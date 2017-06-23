function upcaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* error log gluposti */
var isErrVisible = false, errTimeout;

function hideErr() {
    document.getElementById("error_log").style.visibility = "hidden";
    document.getElementById("error_log").innerHTML= "";
    isErrVisible = false;
    clearTimeout(errTimeout);
}

function err_visible(errmsg, seconds) {
    document.getElementById("error_log").innerHTML += errmsg + ".<br>";
    document.getElementById("error_log").style.visibility = "visible";
    if (!isErrVisible) {
        isErrVisible = true;
        errTimeout = setTimeout(hideErr, seconds*1000);
    }
}

document.getElementById("error_log").addEventListener("click", hideErr);