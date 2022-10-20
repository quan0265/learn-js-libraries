function GalleryImage(url) {
    $('#gallery-popup').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function (item) {
                return '<a class="image-source-link" rel="noopener" href="' + decodeURIComponent(url) + '" target="_blank">Xem hình ảnh trong tab mới  <i style="font-size:10px;" class="fa fa-external-link"></i></a>';
            }
        },
        gallery: {
            enabled: true,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
            tPrev: 'Trước đó', // title for left button
            tNext: 'Tiếp theo', // title for right button
            tCounter: '<span class="mfp-counter">%curr%/%total%</span>'
        }
    }).magnificPopup('open');
}
function GalleryVideo(url) {
    console.log(url);
    $('.popup-youtube').magnificPopup({
        items: {
            src: url + "?rel=0&autoplay=1"
        },
        type: 'iframe'
    }).magnificPopup('open');
}

$(document).ready(function () {
    $("#filter-district_id").change(function () {
        $.ajax({
            url: "/ajaxfr/saleland/get_ward",
            type: "post",
            dataType: "text",
            data: {
                district_id: $('#filter-district_id').val()
            },
            success: function (data) {
                $('#filter-ward_id').html(data);
            }
        });
    });
});
$(function () {
    $("#filter-price").ionRangeSlider({
        type: "double",
        min: 0,
        max: 100,
        grid: true
    });
    $("#filter-acreage").ionRangeSlider({
        type: "double",
        min: 0,
        max: 20000,
        grid: true
    });
});
var facreage = '';
var fprice = '';
$("#filter-price").change(function () {
    fprice = $("#filter-price").val();
});
$("#filter-acreage").change(function () {
    facreage = $("#filter-acreage").val();
});
var maxZ = 20;
var geojson;
var cl = false;
$(document).ready(function () {
    loadMapPotential();
});
initMapPotential();
function hiddenLabelCluster(p) {
    var zoom = map.getZoom();
    var last_masrk = markers;
}
var popup = L.popup();
var info = L.control();
var map = L.map('map_index_potential').setView(location_project, z);
L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: maxZ,
    minZoom: 3,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);
var createLabelIcon = function (labelClass, labelText) {
    return L.divIcon({
        className: labelClass,
        html: labelText
    })
}

L.Control.Watermark = L.Control.extend({
    onAdd: function (map) {
        var img = L.DomUtil.create('img');
        img.src = '/images/logo-dandautu.png';
        img.style.width = '85px';
        img.style.marginBottom = '5px';
        img.style.marginLeft = '3px';
        return img;
    },
    onRemove: function (map) {
    }
});
L.control.watermark = function (opts) {
    return new L.Control.Watermark(opts);
}
L.control.watermark({position: 'bottomleft'}).addTo(map);
var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [1, 1],
        shadowSize: [1, 1],
    }
});
var newMarker = new LeafIcon({iconUrl: '/images/marker.png'});
var markers = L.markerClusterGroup({spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false});
map.scrollWheelZoom.enable();
map.on('click', function () {
    displayPopup();
});
$(window).resize(function () {
    initMapPotential();
});
function changeGoogleEarth() {
    L.TileLayer && map.removeLayer(L.TileLayer);
    if (L.GoogleEarth === 1) {
        L.TileLayer = new L.tileLayer("https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&style=feature:all|element:labels|visibility:off", {
            maxZoom: maxZ,
            minZoom: 3,
            subdomains: ["mt0", "mt1", "mt2", "mt3"]
        });
        L.GoogleEarth = 0;
    } else {
        L.TileLayer = new L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
            maxZoom: maxZ,
            minZoom: 3,
            subdomains: ["mt0", "mt1", "mt2", "mt3"]
        });
        L.GoogleEarth = 1;
    }
    L.TileLayer.addTo(map);
}
function initMapPotential() {
    var window_height = $(window).height();
    var nav_height = $('nav.navbar').height();
    if ($(window).width() > 767) {
        var height_map = window_height - nav_height;
    } else {
        var height_map = window_height - 57;
    }
    $('#map_index_potential').css('height', height_map + 'px');
}
function create_box(e) {
    var c = "<input type='hidden' id='ip_land_id' value=" + e.land_id + " />"
    c += "<h4 style='font-size:16px; font-weight:700'>" + e.name + "</h4>";
    if (e.array_image.length > 0 && e.url_image != '') {
        var url_image = encodeURIComponent(e.url_image);
        c += "<a class='btn-gallery' onclick=GalleryImage('" + url_image + "')><b><i class='fa fa-image'></i> Xem Ảnh </b></a>";
    }
    if (e.link_ytb != '') {
        var url_video = e.link_ytb + "?rel=0&autoplay=1";
        c += " -- <a class='btn-gallery' onclick=GalleryVideo('" + url_video + "')><b><i class='fa fa-youtube-play'></i> Xem Video </b></a>";
    }
    if ((e.array_image.length > 0 && e.url_image != '') || e.link_ytb != '') {
        c += "<br />";
    }
    c += "Diện tích: <b>" + e.acreage + " m<sup>2</sup> </b> </br>";
    if (e.number_plot != '') {
        c += "Số thửa: <b>" + e.number_plot + "</b> ";
    }
    if (e.number_map != '') {
        c += " / Số tờ: <b>" + e.number_map + "</b>";
    }
    if ((e.number_plot != '') || (e.number_map != '')) {
        c += "<br />";
    }
    if (e.address != '') {
        c += "Địa chỉ: <b>" + e.address + "</b></br>";
    }
    if (parseFloat(e.price) > 0) {
        c += "Giá: <b>" + e.price + " </b></br>";
    }
    c += "<b><i class='fa fa-phone'></i> <a style='color:#202020' href='tel:" + e.investor_phone + "'>" + e.investor_phone + "</a></b>";
    c += " -- <b><i class='fa fa-phone'></i> <a style='color:#202020' href='tel:" + e.investor_phone_1 + "'>" + e.investor_phone_1 + "</a></b>";
    if (e.array_image.length > 0) {
        var popp = '<div id="gallery-popup">';
        for (i = 0; i < (e.array_image.length); i++) {
            popp += '<a href="' + e.array_image[i] + '" title="">Image 1</a>';
        }
        popp += '</div>';
        $('#gallery-box').html(popp);
    }
    if (e.link_ytb != "") {
        popp += '<a class="popup-youtube" href="' + e.link_ytb + '" title="">Video 1 </a>';
        $('#gallery-box').html(popp);
    }
    return c;
}
function create_number(e) {
    var f = e.properties;
    var c = "<div class='all-listings' id='listings_" + e.id + "'>";
    if (f.acreage != '0') {
        c += "<div style='padding: 0 10px 0;'  class='listings-map' onclick='getCurentLand(" + e.id + ")'>";
        c += "<span><b>S = " + f.acreage + "m<sup>2</sup></b></span></br>";
        c += '</div><div class="triangle-down"></div>';
    } else {
        c += "<div style='padding: 5px 5px;' class='listings-map' onclick='getCurentLand(" + e.id + ")'>";
        c += "<span><b>" + 'Đất dự án' + " </b></span>";
        c += '</div><div class="triangle-down"></div>';
    }
    c += "</div>";
    return c;
}
function closePop(id) {
    $('#listings_' + id).css('display', 'block');
}
function displayPopup() {
    $land_id = $('#ip_land_id').val();
    if (cl === true) {
        $('#listings_' + $land_id).css('display', 'none');
        cl = false;
    } else {
        if ($land_id) {
            if ($('#popup_content_' + $land_id).length > 0) {
                $('#listings_' + $land_id).css('display', 'none');
            }
            $('#listings_' + $land_id).css('display', 'block');
        } else {
            $('.all-listings').css('display', 'block');
        }
    }
}
function loadMapPotential() {
    $.ajax({
        url: "/ajaxfr/HoaLac/load_map_potential",
        type: "POST",
        dataType: "text",
        data: {
            unique: true
        },
        success: function (response) {
            var data = JSON.parse(response);
            function stylePolygon(feature) {
                return {
                    opacity: 1,
                    dashArray: "3",
                    fillOpacity: .7,
                    color: "GRAY",
                    weight: 1,
                    fillColor: feature.properties.color
                };
            }
            function highlightFeature(e) {
                var layer = e.target;
                layer.setStyle({
                    weight: 2,
                    fillColor: "white",
                    dashArray: "",
                    fillOpacity: .7
                }
                );
                if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                    layer.bringToFront();
                }

                if ($(window).width() > 767) {
                    info.update(layer.feature.properties);
                }
            }

            function resetHighlight(e) {
                geojson.resetStyle(e.target);
                info.update();
            }

            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };
            info.update = function (props) {
                var innerHTML = '<h4 style="text-align: center"> Thông tin chi tiết </h4>' + (props ?
                        '<h4 class="name-land">' + props.name + '</h4>'
                        + '<p>Diện tích: ' + props.acreage + 'm<sup>2</sup></p>'
                        + (parseFloat(props.price) > 0 ? '<p>Giá bán: ' + props.price + ' </p>' : '')
                        : 'Di chuột vào vị trí');
                this._div.innerHTML = innerHTML;
            };
            info.addTo(map);
            geojson = L.geoJson(JSON.parse(data.json), {
                style: stylePolygon,
                onEachFeature: onEachFeature
            }).addTo(map);/*.eachLayer(function (layer) {
             layer.showMeasurements();
             });*/
            function onEachFeature(feature, layer) {
//                layer.showMeasurements();
                populate(feature, layer);
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: openPop,
                    dblclick: zoomToFeature,
                });
            }

            function zoomToFeature(e) {
                map.fitBounds(e.target.getBounds());
            }
            function openPop(e) {
                $('.all-listings').css('display', 'block');
                var div_pop = $('#listings_' + e.target.feature.id);
                var isdisplay = div_pop.css('display');
                if (isdisplay === 'block') {
                    div_pop.css('display', 'none');
                }
                var c = create_box(e.target.feature.properties);
                popup.setLatLng(e.target.getBounds().getCenter())
                        .setContent(c)
                        .openOn(map);
                $('a.leaflet-popup-close-button').attr('onclick', 'closePop(' + e.target.feature.id + ')');
                $('.leaflet-popup-content-wrapper').attr('id', 'popup_content_' + e.target.feature.id);
                cl = true;
            }
            function populate(f, l) {
                var c = f.geometry.coordinates[0].length;
                var a = f.properties;
                var m = L.marker(l.getBounds().getCenter(), {icon: createLabelIcon("textLabelclass", create_number(f))});
                markers.addLayer(m);
                return false;
            }
            function getLatLng(a) {
                return L.latLng(a.X, a.Y);
            }
            var polygon;
            map.on('zoomend', function (a) {
                hiddenLabelCluster(polygon);
                if (polygon) {
                    map.removeLayer(polygon);
                    polygon = null;
                }
                pushStateUrl();
            });
            map.addLayer(markers);
            markers.on('clusterclick', function (a) {
                map.fitBounds(a.layer.getBounds());
            });
            markers.on('click', function (a) {
                var zom = map.getZoom();
                if (zom < 20) {
                    map.setView([a.latlng.lat, a.latlng.lng], 20);
                }
            });
        },
        error: function (xhr, status, errorThrown) {
            console.log("Không thể xử lý, kiểm tra mạng");
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    });
}
function pushStateUrl() {
    window.history.pushState("", "", url_map_potential + '/' + map.getZoom() + '/' + map.getCenter().lat.toFixed(6) + '/' + map.getCenter().lng.toFixed(6) + q);
}
function getCurentLand(land_id) {
    $.ajax({
        url: "/ajaxfr/HoaLac/get_current_land",
        type: "POST",
        dataType: "text",
        data: {
            id: land_id
        },
        success: function (responseJSON) {
            var obj = JSON.parse(responseJSON);
            var value = JSON.parse(obj.json);
            var val = value[0].properties;
            cMark = L.marker([val.X, val.Y], {icon: newMarker}).addTo(map)
                    .bindPopup(create_box(val));
            cMark.openPopup();
            $('.all-listings').css('display', 'block');
            var $divx = $('#listings_' + land_id);
            var isdisplay = $divx.css('display');
            if (isdisplay === 'block') {
                $divx.css('display', 'none');
            }
            $('#listings_' + land_id).css('display', 'none');
            $('a.leaflet-popup-close-button').attr('onclick', 'closePop(' + land_id + ')');
            $('.leaflet-popup-content-wrapper').attr('id', 'popup_content_' + land_id);
        },
        error: function (xhr, status, errorThrown) {
            console.log("Không thể xử lý, kiểm tra mạng");
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    });
}
function FilterMapHL() {
    var search = true;
    var fward_id = $("#filter-ward_id").val();
    var fdistrict_id = $("#filter-district_id").val();
    var fcategory_land_id = $("#filter-category_land_id").val();
    if (fdistrict_id === "" && fward_id === "" && fcategory_land_id === "" && (facreage === "" || facreage === "0;0") && (fprice === "" || fprice === "0;0")) {
        search = false;
    }
    if (search === true) {
        $.ajax({
            url: "/ajaxfr/HoaLac/filter_map",
            type: "POST",
            dataType: "text",
            data: {
                price: fprice,
                acreage: facreage,
                ward_id: fward_id,
                district_id: fdistrict_id,
                category_land_id: fcategory_land_id
            },
            success: function (responseJSON) {
                if ($(".leaflet-popup-close-button").length) {
                    $("a.leaflet-popup-close-button")[0].click();
                }
                if (geojson) {
                    geojson.clearLayers();
                    map.removeLayer(geojson);
                }
                if (markers) {
                    markers.clearLayers();
                    map.removeLayer(markers);
                }
                var data = JSON.parse(responseJSON);
                function stylePolygon(feature) {
                    return {
                        opacity: 1,
                        dashArray: "3",
                        fillOpacity: .7,
                        color: "GRAY",
                        weight: 1,
                        fillColor: feature.properties.color
                    };
                }
                function highlightFeature(e) {
                    var layer = e.target;
                    layer.setStyle({
                        weight: 2,
                        fillColor: "white",
                        dashArray: "",
                        fillOpacity: .7
                    }
                    );
                    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                        layer.bringToFront();
                    }

                    if ($(window).width() > 767) {
                        info.update(layer.feature.properties);
                    }
                }

                function resetHighlight(e) {
                    geojson.resetStyle(e.target);
                    info.update();
                }

                info.onAdd = function (map) {
                    this._div = L.DomUtil.create('div', 'info');
                    this.update();
                    return this._div;
                };
                info.update = function (props) {
                    var innerHTML = '<h4> Thông tin chi tiết </h4>' + (props ?
                            '<h4 class="name-land">' + props.name + '</h4>'
                            + '<p><i class="fa fa-area-chart"></i> ' + props.acreage + ' m<sup>2</sup></p>'
                            + (parseFloat(props.price) > 0 ? '<p><i class="fa fa-usd"></i>  ' + props.price + ' </p>' : '')
                            : 'Di chuột vào vị trí');
                    this._div.innerHTML = innerHTML;
                };
                info.addTo(map);
                geojson = L.geoJson(JSON.parse(data.json), {
                    style: stylePolygon,
                    onEachFeature: onEachFeature
                }).addTo(map);
                function onEachFeature(feature, layer) {
                    populate(feature, layer);
                    layer.on({
                        mouseover: highlightFeature,
                        mouseout: resetHighlight,
                        click: openPop,
                        dblclick: zoomToFeature,
                    });
                }

                function zoomToFeature(e) {
                    map.fitBounds(e.target.getBounds());
                }
                function openPop(e) {
                    $('.all-listings').css('display', 'block');
                    var div_pop = $('#listings_' + e.target.feature.id);
                    var isdisplay = div_pop.css('display');
                    if (isdisplay === 'block') {
                        div_pop.css('display', 'none');
                    }
                    var c = create_box(e.target.feature.properties);
                    popup.setLatLng(e.target.getBounds().getCenter())
                            .setContent(c)
                            .openOn(map);
                    $('a.leaflet-popup-close-button').attr('onclick', 'closePop(' + e.target.feature.id + ')');
                    $('.leaflet-popup-content-wrapper').attr('id', 'popup_content_' + e.target.feature.id);
                    cl = true;
                }
                function populate(f, l) {
                    var c = f.geometry.coordinates[0].length;
                    var a = f.properties;
                    var m = L.marker(l.getBounds().getCenter(), {icon: createLabelIcon("textLabelclass", create_number(f))});
                    markers.addLayer(m);
                    return false;
                }
                function getLatLng(a) {
                    return L.latLng(a.X, a.Y);
                }
                var polygon;
                map.on('zoomend', function () {
                    hiddenLabelCluster(polygon);
                    if (polygon) {
                        map.removeLayer(polygon);
                        polygon = null;
                    }
                    pushStateUrl();
                });
                map.addLayer(markers);
                markers.on('clusterclick', function (a) {
                    map.fitBounds(a.layer.getBounds());
                });
                markers.on('click', function (a) {
                    var zom = map.getZoom();
                    if (zom < 20) {
                        map.setView([a.latlng.lat, a.latlng.lng], 20);
                    }
                });
                map.setView(['20.9812764', '105.529052'], 12);
            },
            error: function (xhr, status, errorThrown) {
                console.log("Không thể xử lý, kiểm tra mạng");
                console.log(xhr.status);
                console.log(xhr.responseText);
            }
        });
        $('#filter-searchbox .DropdownMenu').hide();
    }
}
function filterSearch() {
    $('#filter-searchbox .DropdownMenu').show();
}
function CloseMapHL() {
    $('#filter-searchbox .DropdownMenu').hide();
}
$("a.scroll-more").on("click", function () {
    var id = $(this).attr("href");
    if ($(id).length) {
        $('html, body').animate({
            scrollTop: $(id).offset().top - 100
        }, 'slow');
    }
    return !1;
});