import './Input.css';

function Input({id, label, type, placeholder, register }){
    return(

            <label htmlFor={id}>
                {label}
                <input
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    {...register(id)}
                />
            </label>
    )
}

export default Input;