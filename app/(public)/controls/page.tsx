"use client"
import { useEffect, useState } from 'react';
import { database } from '../../firebaseApp';
import { BsFan } from "react-icons/bs"

import { set, ref, onValue } from "firebase/database";;

const IotComponent = () => {
    const [fans, setFans] = useState(false);

    useEffect(() => {
        const dataRef1 = ref(database, 'Sensor/humidity_data');
        const unsubscribe1 = onValue(dataRef1, (snapshot) => {
            snapshot.val() == true ? setFans(false) : setFans(true);
        });

        return () => {
            unsubscribe1();
        };
    }, []);

    const toggleFans = async () => {
        setFans(!fans); // Toggle state on click (optional)
        const dataRef = ref(database, 'Appliance/led');
        try {
            const res = await set(dataRef, fans);
            console.log('Data written successfully! => ', res);
        } catch (error) {
            console.error('Error writing data:', error);
        }
    };

    return (
        <div className=" w-full px-2 md:w-[78%] min-h-80 bg-[#111] space-y-8 flex flex-col items-center py-4 rounded-2xl">
            <h1 className="text-white px-2">Farm Controls</h1>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 p-2 md:space-x-4 md:space-y-0  w-full md:flex-row">
                <div className="w-11/12 h-full p-4 space-y-4 flex flex-col text-white bg-[#222] items-center rounded-2xl"
                    onClick={() => { toggleFans(); }}
                >
                    <h2 className="text-white">Fans</h2>
                    <div className="w-20 h-20 flex items-center justify-center border border-blue-400 rounded-full">
                        <BsFan color={fans ? 'green' : 'red'} size={40} />
                    </div>
                    <button className="bg-[#1a1919] flex flex-row space-x-3 w-20 py-3 px-2  rounded-2xl text-white items-center justify-center">
                        <span className="h-5">{fans ? <p>ON</p> : <p>OFF</p>}</span>
                        <span className={`w-4 h-4 rounded-full ${fans ? 'bg-[green]' : 'bg-[red]'}`}></span>
                    </button>
                    <p className="text-sm flex"><p>Status: </p> <span className={`${fans ? 'text-[green]' : 'text-[red]'}`}> {fans ? <p> ON</p> : <p>OFF</p>}</span></p>

                </div>
            </div>
        </div>
    );
}

export default IotComponent;