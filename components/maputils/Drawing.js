import React, { useState } from 'react';
import axios from 'axios';
import { classNames } from '../../utils/general';
import {
    CheckIcon,
    DotsHorizontalIcon,
    PencilIcon,
    RefreshIcon,
    TrashIcon,
} from '@heroicons/react/solid';

function createMultiPolyon(array) {
    const multipoly = [];
    let adjustedArray = [...array];
    for (let i = 0; i <= array.length; ) {
        const result = testForClosedPolygon(adjustedArray);
        multipoly.push([result[0]]);
        i = adjustedArray.length - parseInt(result[1]);
        adjustedArray.splice(0, result[1]);
    }
    multipoly.pop();
    return multipoly;
}

function Drawing({
    mapRef,
    polygonRef,
    setMarkers,
    setBusyDrawing,
    setProperties,
    draw,
    setDraw,
}) {
    const [drawCount, setDrawCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleDraw = (e) => {
        e.preventDefault();
        setBusyDrawing(true);
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
                drawFreeHandMouse(map, polygonRef, 'mousedown');
            }
        );

        window.google.maps.event.addDomListener(
            map.getDiv(),
            'touchstart',
            function (e) {
                drawFreeHandMouse(map, polygonRef, 'touchstart');
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
        setDraw(false);
        const viewport = mapRef.current.getBounds();
        try {
            setLoading(true);
            const response = await axios({
                url: '/api/properties/viewport',
                method: 'post',
                data: {
                    viewport,
                },
            });
            const response2 = await axios({
                url: '/api/properties/viewport',
                method: 'post',
                data: {
                    viewport,
                    list: true,
                    limit: 20,
                    skip: 0,
                },
            });
            setMarkers(response.data.properties);
            setProperties(response2.data.properties);
            setLoading(false);
        } catch (error) {
            console.log('error', error);
        }
        setBusyDrawing(false);
    };

    function drawFreeHandMouse(map, polygonRef, mousedown) {
        const queryPolygon = [];
        //the function starts by creating a polyline.
        //the polyline
        let poly = new window.google.maps.Polyline({
            map: map,
            clickable: false,
        });
        //move-listener
        // As the mouse moves, the coordinates are pushed to the poly variable
        let move = window.google.maps.event.addListener(
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
                    mousedown
                );

                // OPTION 2 - REMOVE BOUNDRY / POLYGON
                // Save polygon to the polygonRef
                polygonRef.current = poly;
                const vertices = poly.getPath();
                for (let i = 0; i <= vertices.getLength(); i++) {
                    if (i === vertices.getLength()) {
                        const xy = vertices.getAt(0);
                        if (!xy) {
                            console.log('xy is undefined');
                            // TODO:  Add a snackbar that alerts the user to a drawing mistake and that he needs to start over
                            break;
                        }
                        queryPolygon.push([xy.lng(), xy.lat()]);
                        break;
                    }
                    const xy = vertices.getAt(i);
                    queryPolygon.push([xy.lng(), xy.lat()]);
                }
                if (queryPolygon.length > 0) {
                    try {
                        const response = await axios({
                            url: '/api/properties/polygon',
                            method: 'post',
                            data: {
                                polygon: queryPolygon,
                            },
                        });
                        const response2 = await axios({
                            url: '/api/properties/polygon',
                            method: 'post',
                            data: {
                                polygon: queryPolygon,
                                list: true,
                            },
                        });
                        setMarkers(response.data.properties);
                        setProperties(response2.data.properties);
                    } catch (error) {
                        console.log('Error', error);
                    }
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
        // setDraw(false);
        setDrawCount(1);
        map.setOptions({
            draggable: true,
            zoomControl: true,
            scrollwheel: true,
            disableDoubleClickZoom: true,
        });
    }

    return (
        <div className="absolute z-10 p-4 flex top-1 right-0">
            {drawCount === 1 ? (
                <button
                    onClick={handleClearDrawing}
                    className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 shadow-md focus:outline-none   "
                >
                    <div className="flex items-center">
                        <span>
                            <TrashIcon className="h-5 w-5 text-blue-500 mr-1" />{' '}
                        </span>
                        Clear Boundry
                    </div>
                </button>
            ) : (
                <button
                    onClick={handleDraw}
                    disabled={loading}
                    className={classNames(
                        loading ? 'bg-gray-200' : 'bg-white hover:bg-gray-200',
                        'py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black shadow-md focus:outline-none'
                    )}
                >
                    {draw === false && loading === true ? (
                        <div className="flex items-center">
                            <span>
                                <RefreshIcon className="h-5 w-5 text-blue-500 mr-1" />{' '}
                            </span>
                            Refreshing
                        </div>
                    ) : draw === false && loading === false ? (
                        <div className="flex items-center">
                            <span>
                                <PencilIcon className="h-5 w-5 text-blue-500 mr-1" />{' '}
                            </span>
                            DRAW
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <span>
                                <CheckIcon className="h-5 w-5 text-blue-500 mr-1" />{' '}
                            </span>
                            APPLY
                        </div>
                    )}
                </button>
            )}
        </div>
    );
}

export { Drawing };
