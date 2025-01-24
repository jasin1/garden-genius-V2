import "./Spinner.css"

const  Spinner=({size="medium", message="Loading..."})=>{
  return(
    <div className="spinner-container" role="status" aria-live="polite">
      <div className={`spinner spinner-${size}`}/>
      <p className="spinner-message">{message}</p>

    </div>
  );

};

export default Spinner;