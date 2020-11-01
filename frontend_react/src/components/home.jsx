import React, { useEffect, useState }  from 'react';
import { getSections }  from './../services/sectionService';
import { toast }        from 'react-toastify';
import Slider           from "./common/slider"; 

function Home(props) {
    const [ sections, setSections ] = useState([]);

    useEffect(() => {
        async function loadSections() {
            try {
                const result    = await getSections();
                setSections(result.data);
            }
            catch (ex) {
                toast.error('Error retrieving sections.');
            }
        }

        loadSections();
    }, [ setSections ]);

    return (
        <>
            <br />
            <Slider items={sections} path='/images/sections'/>
        </>
    );
}

export default Home;