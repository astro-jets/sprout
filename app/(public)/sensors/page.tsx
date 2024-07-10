"use client"

import { BsCloudRain, BsDroplet, BsThermometerHalf } from "react-icons/bs";
import { database } from '../../firebaseApp';
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";

const LandingPage = () => {
    const [humidity, sethumidity] = useState(0);
    const [temperature, settemperature] = useState(0);
    const [soil, setSoil] = useState(null);
    const value = JSON.stringify(soil);
    useEffect(() => {
        const dataRef1 = ref(database, 'Sensor/humidity_data');
        const unsubscribe1 = onValue(dataRef1, (snapshot) => {
            sethumidity(snapshot.val());
        });

        const dataRef2 = ref(database, 'Sensor/temperature_data');
        const unsubscribe2 = onValue(dataRef2, (snapshot) => {
            settemperature(snapshot.val());
        });

        const dataRef3 = ref(database, 'Sensor/soil_moisture');
        const unsubscribe3 = onValue(dataRef3, (snapshot) => {
            setSoil(snapshot.val());
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
            unsubscribe3();
        };
    }, []);

    return (
        <div className=" w-full px-2 md:w-[78%] min-h-80 h-full bg-[#111] space-y-8 flex flex-col items-center py-4 rounded-2xl">
            <h1 className="text-white">Sensor Readings</h1>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 p-2 md:space-x-4 md:space-y-0 h-full  w-full md:flex-row">
                <div className="w-80 h-60 p-4 space-y-4  flex flex-col text-white bg-[#222] items-center rounded-2xl">
                    <h2 className="text-white">Temperature</h2>
                    <div className="w-20 h-20 flex items-center justify-center border border-blue-400 rounded-full">
                        <BsThermometerHalf color="#fff" size={40} />
                    </div>
                    <p>Status: &nbsp;
                        {temperature ?
                            <span className={`${temperature < 25 && temperature > 15 ? 'text-[green]' : 'text-[red]'}`}>
                                {JSON.stringify(temperature)}
                                ° C
                            </span>
                            : 'Loading'
                        }
                    </p>
                </div>

                <div className="w-80 h-60 p-4 space-y-4 flex flex-col text-white bg-[#222] items-center rounded-2xl">
                    <h2 className="text-white">Soil Moisture</h2>
                    <div className="w-20 h-20 flex items-center justify-center border border-blue-400 rounded-full">
                        <BsDroplet color="#fff" size={40} />
                    </div>
                    <p>Status: &nbsp;
                        {
                            soil != null ?
                                <span className={soil < 50 ? "text-[red]" : "text-green"}>
                                    {parseInt(JSON.stringify(soil), 10).toFixed(2) + " %"}
                                </span> :
                                <p>Loading</p>
                        }
                    </p>

                </div>

                <div className="w-80 h-60 p-4 space-y-4 flex flex-col text-white bg-[#222] items-center rounded-2xl">
                    <h2 className="text-white">Humidity</h2>
                    <div className="w-20 h-20 flex items-center justify-center border border-blue-400 rounded-full">
                        <BsCloudRain color="#fff" size={40} />
                    </div>
                    <p>Status: &nbsp;
                        {humidity ?
                            <span className={`${humidity < 80 && humidity > 50 ? 'text-[green]' : 'text-[red]'}`}>
                                {JSON.stringify(humidity)} %
                            </span>
                            : 'Loading'
                        }
                    </p>

                </div>

            </div>

        </div>
    );
}

export default LandingPage;