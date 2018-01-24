/*jslint devel:true, browser:true */
/*global google, $ */

function initMap() {
    "use strict";

    // マップの生成
    var map = new google.maps.Map($("#map")[0], {
        zoom: 9,
        center: {
            lat: 40.5611965,
            lng: 140.9368946
        }
    });

    var maxLat;
    var minLat;
    var maxLng;
    var minLng;

    // マーカーを追加する関数の宣言
    function addMarker(place) {
        // マーカーの生成
        var lat = parseFloat(place["緯度"]);
        var lng = parseFloat(place["経度"]);

        if (typeof maxLat === "undefined" || maxLat < lat) {
            maxLat = lat;
        }
        if (typeof minLat === "undefined" || minLat > lat) {
            minLat = lat;
        }

        if (typeof maxLng === "undefined" || maxLng < lng) {
            maxLng = lng;
        }

        if (typeof minLng === "undefined" || minLng > lng) {
            minLng = lng;
        }

        var marker = new google.maps.Marker({
            position: {
                lat: lat,
                lng: lng
            },
            map: map
        });

        // 情報ウィンドウの生成
        var name = place["名称"];
        var type = place["種別"];
        var address = place["住所"];
        var phone = place["電話番号"];
        var fax = place["FAX番号"];
        var organization = place["団体名"];
        var capacity = place["収容定員"];
        var ages = place["受入年齢"];
        var businessDays = place["利用可能曜日"];
        var businessHours = place["開始時間"] + "〜" + place["終了時間"];
        var noticeForSchedule = place["利用可能日時特記事項"];
        var baggage = place["一時預かりの有無"];
        var url = place["URL"];
        var content = "<h3>" + name + "</h3>";
        content += "<p>所在地: " + address + "</p>";
        content += "<p>電話番号: " + phone + "</p>";
        content += "<p>FAX番号: " + fax + "</p>";
        content += "<p>団体名: " + organization + "</p>";
        content += "<p>収容定員: " + capacity + "</p>";
        content += "<p>受入年齢: " + ages + "</p>";
        content += "<p>営業曜日: " + businessDays + "</p>";
        content += "<p>営業時間: " + businessHours + "</p>";
        if (noticeForSchedule.length > 0) {
            content += "<p>利用可能日時特記事項: " + noticeForSchedule + "</p>";
        }
        content += "<p>一時預かり: " + baggage + "</p>";
        content += "<p>URL: <a href=\"" + url + "\">" + url + "</a></p>";
        var infowindow = new google.maps.InfoWindow({
            content: content
        });

        // マーカーをクリックすると、情報ウィンドウを開くように設定
        marker.addListener("click", function () {
            console.log("click marker");
            infowindow.open(map, marker);
        });
    }

    $.getJSON(
        "022063_preschool.json",
        function (places) {
            var i = 0;
            while (i < places.length) {
                addMarker(places[i]);
                i += 1;
            }
            var latLngBoundsLiteral = {
                east: maxLng,
                west: minLng,
                north: maxLat,
                south: minLat
            };
            map.fitBounds(latLngBoundsLiteral);
        }
    );
}
