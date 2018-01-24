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
        address += place["方書"];
        var phone = place["電話番号"];
        var departments = place["診療科目"].replace(/;/g, "、");
        var sickbedsNumber = place["病床数"];
        var content = "<h3>" + name + "</h3>";
        content += "<p>所在地: " + address + "</p>";
        content += "<p>電話番号: " + phone + "</p>";
        content += "<p>診療科目: " + departments + "</p>";
        if (sickbedsNumber > 0) {
            content += "<p>病床数: " + sickbedsNumber + "</p>";
        }
        var infowindow = new google.maps.InfoWindow({
            content: content
        });

        // マーカーをクリックすると、情報ウィンドウを開くように設定
        marker.addListener("click", function () {
            infowindow.open(map, marker);
        });
    }

    $.getJSON(
        "022063_hospital.json",
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
