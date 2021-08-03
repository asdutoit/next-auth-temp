import React, { useCallback, useState, useEffect, memo, useRef } from 'react';
import axios from 'axios';

function Drawing({ mapRef, polygonRef, setMarkers }) {
    const [draw, setDraw] = useState(false);
    const [drawCount, setDrawCount] = useState(0);

    const handleDraw = (e) => {
        e.preventDefault();
        const map = mapRef.current;

        if (draw === true) {
            enable(map);
            return;
        }

        disable(map);
        setDraw(true);

        window.google.maps.event.addDomListener(
            map.getDiv(),
            'mousedown',
            function (e) {
                drawFreeHandMouse(map, polygonRef);
            }
        );
    };

    const handleClearDrawing = async () => {
        if (polygonRef.current === undefined) {
            setDrawCount(0);
            return;
        }
        const polygon = polygonRef.current;
        polygon.setMap(null);
        setDrawCount(0);
        const viewport = mapRef.current.getBounds();
        try {
            const response = await axios({
                url: '/api/shipwrecks/viewport',
                method: 'post',
                data: {
                    viewport,
                },
            });
            setMarkers(response.data);
        } catch (error) {
            console.log('error', error);
        }
    };

    function drawFreeHandMouse(map, polygonRef) {
        const queryPolygon = [];
        //the function starts by creating a polyline.
        //the polyline
        let poly = new window.google.maps.Polyline({
            map: map,
            clickable: false,
        });

        //move-listener
        // As the mouse moves, the coordinates are pushed to the poly variable
        var move = window.google.maps.event.addListener(
            map,
            'mousemove',
            function (e) {
                poly.getPath().push(e.latLng);
            }
        );

        //mouseup-listener
        // The polygon
        // Then, when user releases the mouse button the 2 ends of the line will close.  The poly variable will be duplicated to the "path" variable.  Then the polyline, "poly", will be cleared in order to assign a polygon to the variable name.
        window.google.maps.event.addListenerOnce(
            map,
            'mouseup',
            async function (e) {
                window.google.maps.event.removeListener(move);
                var path = poly.getPath();
                poly.setMap(null);
                poly = new window.google.maps.Polygon({ map: map, path: path });
                window.google.maps.event.clearListeners(
                    map.getDiv(),
                    'mousedown'
                );

                // OPTION 2 - REMOVE BOUNDRY / POLYGON
                // Save polygon to the polygonRef
                polygonRef.current = poly;
                const vertices = poly.getPath();
                for (let i = 0; i <= vertices.getLength(); i++) {
                    if (i === vertices.getLength()) {
                        const xy = vertices.getAt(0);
                        queryPolygon.push([xy.lng(), xy.lat()]);
                        break;
                    }
                    const xy = vertices.getAt(i);
                    queryPolygon.push([xy.lng(), xy.lat()]);
                }
                try {
                    const response = await axios({
                        url: '/api/shipwrecks',
                        method: 'post',
                        data: {
                            queryPolygon,
                        },
                    });
                    console.log('RESPONSE', response);
                    setMarkers(response.data);
                } catch (error) {
                    console.log(error);
                }
                enable(map);
            }
        );

        // OPTION 1 - REMOVE BOUNDRY / POLYGON
        // USING AN EVENT LISTENER
        // window.document
        //   .getElementById("but1")
        //   .addEventListener("click", function (e) {
        //     poly.setMap(null);
        //   });
    }

    function disable(map) {
        map.setOptions({
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: false,
        });
    }

    function enable(map) {
        setDraw(false);
        setDrawCount(1);
        map.setOptions({
            draggable: true,
            zoomControl: true,
            scrollwheel: true,
            disableDoubleClickZoom: true,
        });
    }

    return (
        <div className="absolute z-10 p-4 flex top-12 right-0">
            {drawCount === 1 ? (
                <button
                    onClick={handleClearDrawing}
                    className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none   "
                >
                    Clear Boundry
                </button>
            ) : (
                <button
                    onClick={handleDraw}
                    className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none  "
                >
                    {draw === false ? 'DRAW' : 'APPLY'}
                </button>
            )}
        </div>
    );
}

export { Drawing };
