import { useState } from "react"
import type { FormData } from "../types/index"


const SimpleForm: React.FC =()=>{

    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        age: 18,
        gender:"",
        address: {city: "", state: ""},
        hobbies:[{name: ""}],
        startDate: new Date(),
        subscribe: false,
        refferal: "",
    });
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);




    return (
<form onSubmit={handleSubmit} style={{display: "flex", flexDirection:"column", gap:"5px"}}>
    <div>
        <input></input>
        <label></label>
        {errors}
    </div>
</form>
    )

}