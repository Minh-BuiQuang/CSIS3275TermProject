import {useEffect, useState} from 'react';

function EntityList({entity}) {
    const [data, setData] = useState([]);
    const [headings, setHeadings] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        const fetchEntityData = async () => {
            const response = await fetch('https://localhost:44348/api/'+entity);
            const data = await response.json();
            setData(data.data);
            setHeadings(Object.keys(data.data[0]));
        };
        fetchEntityData();
    }, []);


    const onSearchChange = (e) => {
        setSearch(e.target.value);
    }


    return (
        <>
            <h6>{data.headings[0]}</h6>
            <h6>{headings[1]}</h6>
        </>
    )

    
    return (
        <>
            <div>
                <h3>{entity}</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {headings.map(i=><th scope='col'>{i}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(d=>(
                            <tr key={d.supplierId}>
                                {headings.map(i=>(<td>{d}{i}</td>))}
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EntityList;