import React, { useState, useEffect } from 'react';
import axios from 'axios';
import itemsData from '../assets/data.json';
import p1 from '../assets/Projects/Project1.png';
import p2 from '../assets/Projects/Project2.png';
import p3 from '../assets/Projects/Project3.png';
import p4 from '../assets/Projects/Project4.png';
import p5 from '../assets/Projects/Project5.png';


const boxInfo = [
    {
        id:1,
        image: p1,
        info: "feybh gfeib igufwbas uwids udwnj guwdib d    hu nhud NA UHDx hodangr 8yiofh fedi",
        title: "Project 1",
        link: "https://airaware-f22c0.web.app/",
        gitlink: "https://airaware-f22c0.web.app/",
    },
    {
        id:2,
        image: p2,
        info: "feybh gfeib igufwbas uwids udwnj guwdib d    hu nhud NA UHDx hodangr 8yiofh fedi",
        title: "Project 2",
        link: "https://airaware-f22c0.web.app/",
        gitlink: "https://airaware-f22c0.web.app/",
    },
    {
        id:3,
        image: p3,
        info: "feybh gfeib igufwbas uwids udwnj guwdib d    hu nhud NA UHDx hodangr 8yiofh fedi",
        title: "Project 3",
        link: "https://airaware-f22c0.web.app/",
        gitlink: "https://airaware-f22c0.web.app/",
    },
    {
        id:4,
        image: p4,
        info: "feybh gfeib igufwbas uwids udwnj guwdib d    hu nhud NA UHDx hodangr 8yiofh fedi",
        title: "Project 4",
        link: "https://airaware-f22c0.web.app/",
        gitlink: "https://airaware-f22c0.web.app/",
    },
    {
        id:5,
        image: p5,
        info: "feybh gfeib igufwbas uwids udwnj guwdib d    hu nhud NA UHDx hodangr 8yiofh fedi",
        title: "Project 5",
        link: "https://airaware-f22c0.web.app/",
        gitlink: "https://airaware-f22c0.web.app/",
    },
];

const BentoGrid = () => {
    const [boxData, setBoxData] = useState([]);
    const totalCols = 12;
    const totalRows = 10;

    useEffect(() => {
        fetchBoxData();
        // console.log(itemsData)
    }, []);

    const fetchBoxData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/boxdata');
            console.log(response.data)
            setBoxData(response.data);
        } catch (error) {
            setBoxData([{ 'id': 1, 'x': 5, 'y': 4, 'width': 2, 'height': 4, 'priority': 1 }, { 'id': 2, 'x': 0, 'y': 2, 'width': 4, 'height': 3, 'priority': 1 }, { 'id': 3, 'x': 2, 'y': 5, 'width': 3, 'height': 2, 'priority': 2 }, { 'id': 4, 'x': 0, 'y': 0, 'width': 3, 'height': 2, 'priority': 2 }, { 'id': 5, 'x': 4, 'y': 0, 'width': 3, 'height': 2, 'priority': 2 }])
            console.error('Error fetching box data:', error);
        }
    };

    const handleRandomPlacement = () => {
        fetchBoxData()
        // Implement your logic for random placement here if needed
    };

    const getBgColor = (priority) => {
        switch (priority) {
            case 1:
                return 'red-200';
            case 2:
                return 'green-200';
            default:
                return 'gray-200';
        }
    };
    var wheight = window.innerHeight / 8;
    return (
        <div className='flex justify-center items-center  w-full h-full '>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute z-10" onClick={handleRandomPlacement}>
                Place Boxes
            </button>
            <div className="grid gap-1 h-full w-full" style={{
                backgroundColor: "",
                display: 'grid',
                gridTemplateColumns: `repeat(${totalCols}, minmax(0, 1fr))`,
                // height: `90vh`, 
                // width: `50vw`,  
            }}>
                {Array.from({ length: totalCols * totalRows }, (_, index) => {
                    const currentBox = boxData.find(box => box.id === index + 1);
                    const currentInfo = boxInfo.find(box => box.id === index + 1);
                    if (currentBox) {
                        // console.log(currentBox, index)
                        const { x, y, width, height } = currentBox;
                        return (
                            <div
                                key={index}
                                className={`bg-${getBgColor(currentBox.priority)} border border-gray-500 overflow-hidden relative group`}
                                style={{
                                    gridColumn: `${x + 1} / span ${width}`,
                                    gridRow: `${y + 1} / span ${height}`,
                                    height: { wheight },
                                    width: { wheight },
                                    borderRadius: "10px",
                                    backgroundColor: "white",
                                }}
                            >
                                <img src={boxInfo[index].image} className="block w-full h-full rounded-lg transition-opacity duration-300 ease-in-out group-hover:opacity-50 overflow-hidden" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                    <div className="bg-black bg-opacity-75 text-white rounded-lg p-4">
                                        {boxInfo[index].info}
                                        {/* Additional content to show on hover */}
                                    </div>
                                </div>
                                {/* You can add box content here if needed */}
                            </div>
                        );
                    } else {
                        return
                    }
                })}
            </div>
        </div>
    );
};

export default BentoGrid;


// const [boxData, setBoxData] = useState([
//     { id: 1, x: 0, y: 0, width: 4, height: 3, priority: 1 },
//     { id: 2, x: 0, y: 0, width: 4, height: 3, priority: 1 },
//     { id: 3, x: 0, y: 0, width: 3, height: 2, priority: 2 },
//     { id: 4, x: 0, y: 0, width: 3, height: 2, priority: 2 },
//     { id: 5, x: 0, y: 0, width: 3, height: 2, priority: 2 }
// ]);
// const totalCols = 8;
// const totalRows = 12;

// const handleRandomPlacement = () => {
//     const gridData = Array.from({ length: totalCols }, () => Array(totalRows).fill(0));

//     const checkOverlap = (x, y, w, h) => {
//         for (let i = x; i < x + w; i++) {
//             for (let j = y; j < y + h; j++) {
//                 if (i >= totalCols || j >= totalRows || gridData[i][j] !== 0) {
//                     return false;
//                 }
//             }
//         }
//         return true;
//     };

//     const generateRandomPosition = (w, h) => {
//         const x = Math.floor(Math.random() * (totalCols - w + 1));
//         const y = Math.floor(Math.random() * (totalRows - h + 1));
//         return [x, y];
//     };

//     boxData.forEach(box => {
//         let x, y;
//         do {
//             [x, y] = generateRandomPosition(box.width, box.height);
//         } while (!checkOverlap(x, y, box.width, box.height));

//         box.x = x;
//         box.y = y;

//         for (let i = x; i < x + box.width; i++) {
//             for (let j = y; j < y + box.height; j++) {
//                 gridData[i][j] = box.id;
//             }
//         }
//     });

//     setBoxData([...boxData]);
// };