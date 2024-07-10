"use client"
import { useState, useEffect } from 'react';
import { database } from '../../firebaseApp';
import { ref, onValue } from "firebase/database";

function MyComponent() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const humudityRef = ref(database, 'Sensor/humidity_data');

        const unsubscribe = onValue(humudityRef, (snapshot) => {
            setData(snapshot.val());
        });

        return () => unsubscribe(); // Cleanup function to detach listener on unmount
    }, []);

    // Use the data in your component
    return (
        <div>
            {data ? (
                <p>Humidity data: {JSON.stringify(data)}</p>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default MyComponent;
