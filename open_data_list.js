/*jslint devel:true, browser:true */
/*global google, $ */

function addEntry(entry) {
    "use strict";

    var content = "<div class=\"col-md-4\">";
    content += "<h2>" + entry["データ名称"] + "</h2>";
    content += "<p>データ概要: " + entry["データ概要"] + "</p>";
    content += "<p>分類: " + entry["分類"] + "</p>";
    content += "<p>更新頻度: " + entry["更新頻度"] + "</p>";
    content += "<p><a class=\"btn btn-secondary\" href=\"" + entry["ファイル名"] + ".html\" role=\"button\">アプリを見る &raquo;</a></p>";
    content += "</div>";
    $("#entries").append(content);
}

function initEntries() {
    "use strict";

    $.getJSON(
        "022063_open_data_list.json",
        function (entries) {
            var i = 0;
            while (i < entries.length) {
                addEntry(entries[i]);
                i += 1;
            }
        }
    );
}

$(document).ready(function () {
    "use strict";

    initEntries();
});
