import React, { useState, useEffect } from 'react';
import { getDocs, collection } from "firebase/firestore";
import { db } from '../firebase-config'; // path to your firebase config file

const Irasuto = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchUrls().then(setImages); // Fetch URLs when component mounts
    }, []);

    // Define the fetchUrls function at the top level of your component
    const fetchUrls = async () => {
        try {
            const urlsRef = collection(db, 'urls');
            const urlsSnapshot = await getDocs(urlsRef);
            return urlsSnapshot.docs.map((doc) => doc.data().url); // assuming each document contains a 'url' field
        } catch (error) {
            console.error('Error fetching URLs:', error);
        }
    };

    return (
        <div className="irasuto-IrasutoContainer">
            <Table images={images} />
        </div>
    );
};

const Table = ({ images }) => {
    return (
        <table className="irasuto-ImageTable">
            <thead>
                <tr>
                    <th className="irasuto-TableHeader">Drawing and Pictures</th>
                </tr>
            </thead>
            <tbody>
                {images.map((image, id) => (
                    <tr key={id}>
                        <td className="irasuto-ImageCell">
                            <a href={image} target="_blank" rel="noreferrer"> {/* add rel="noreferrer" for security reasons */}
                                <img
                                    className="irasuto-Image"
                                    src={image}
                                    alt={`Image ${id + 1}`}
                                />
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Irasuto;
