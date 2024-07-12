import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000");
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  }

 const handleDelete=async(id)=>{
  const response=await fetch(`http://localhost:5000/${id}`,{
    method:"DELETE"
  });
  const result=await response.json();
  if(!response.ok){
    console.log(result.error)
    setError(result.error)
  }
  if(response.ok){
   setError("deleted successfuly")
   setTimeout(()=>{
    setError("")
    getData()
   },1000)
  }
 }

  useEffect(() => {
    getData();
  }, []);

  // console.log(data);

  return (
    <div className='container my-2'>
      <h2 className='text-center'>All Data</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className='row'>
        {data.length > 0 ? (
          data.map((ele) => (
            <div key={ele._id} className='col-3'>
              <div className="card">
                <div className="card-body text-center">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className='text-muted'>{ele.age}</p>
                  <a href="#" className="card-link" onClick={()=>handleDelete(ele._id)}>Delete</a>
                  <Link to={`/${ele._id}`} className="card-link">Edit</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          !error && <p className='text-center'>No data available</p>
        )}
      </div>
    </div>
  );
}

export default Read;
