const CheckboxInput = ({value,changeHandler}) => {
    return ( 
        <>
        <div className="my-4">
        <input
          type="checkbox"
          value={value}
          onChange={changeHandler}
          name=""
          id=""
          className="m-4"
        />
         <label htmlFor="">{value}</label>
        </div>
        </>
     );
}
 
export default CheckboxInput;