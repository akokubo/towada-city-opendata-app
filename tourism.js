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
        var address = place["住所"];
        var businessDays = place["利用可能曜日"];
        var businessHours = place["開始時間"] + "〜" + place["終了時間"];
        var noticeForSchedule = place["利用可能時間特記事項"];
        var price = place["料金（基本）"];
        if (place["料金（詳細）"].length > 0) {
            price += "<br>" + place["料金（詳細）"].replace(/\n/g, "<br>");
        }
        var description = place["説明"].replace(/\n/g, "<br>");
        var access = place["アクセス方法"].replace(/\n/g, "<br>");
        var barrierFree = place["バリアフリー情報"];
        var inquery = place["連絡先名称"].replace(/\n/g, "<br>");
        inquery += "、" + place["連絡先電話番号"].replace(/\n/g, "<br>");

        var content = "<h3>" + name + "</h3>";
        content += "<p>所在地: " + address + "</p>";
        content += "<p>利用可能曜日: " + businessDays + "</p>";
        content += "<p>営業時間: " + businessHours + "</p>";
        if (noticeForSchedule.length > 0) {
            content += "<p>営業時間特記事項: " + noticeForSchedule + "</p>";
        }
        content += "<p>料金: " + price + "</p>";
        content += "<p>説明: " + description + "</p>";
        content += "<p>アクセス方法: " + access + "</p>";
        content += "<p>バリアフリー情報: " + barrierFree + "</p>";
        content += "<p>お問い合わせ: " + inquery;
        var infowindow = new google.maps.InfoWindow({
            content: content
        });

        // マーカーをクリックすると、情報ウィンドウを開くように設定
        marker.addListener("click", function () {
            infowindow.open(map, marker);
        });
    }

    $.getJSON(
        "022063_tourism.json",
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
