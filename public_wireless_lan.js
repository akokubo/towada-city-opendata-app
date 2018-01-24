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
        var address = place["住所（地番）"];
        var installer = place["設置者"];
        var phone = place["電話番号"];
        var ssid = place["SSID（ネットワーク名）"];
        var area = place["提供エリア"];
        var hours = place["利用時間"];
        var content = "<h3>" + name + "</h3>";
        content += "<p>所在地: " + address + "</p>";
        content += "<p>設置者: " + installer + "</p>";
        if (phone !== "-") {
            content += "<p>電話番号: " + phone + "</p>";
        }
        content += "<p>SSID: " + ssid + "</p>";
        content += "<p>提供エリア: " + area + "</p>";
        content += "<p>利用時間: " + hours + "</p>";
        var infowindow = new google.maps.InfoWindow({
            content: content
        });

        // マーカーをクリックすると、情報ウィンドウを開くように設定
        marker.addListener("click", function () {
            infowindow.open(map, marker);
        });
    }

    $.getJSON(
        "022063_public_wireless_lan.json",
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
