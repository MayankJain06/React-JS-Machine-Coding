import { useState } from "react"
import type { FormData } from "../types/index"
import DatePicker from "react-datepicker";


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


    function handleChange(event: ChangeEvent<HTMLInputElement, HTMLInputElement>): void {
        throw new Error("Function not implemented.");
    }

    function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
    }

    return (
<form onSubmit={handleSubmit} style={{display: "flex", flexDirection:"column", gap:"5"}}>
    <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}></input>
        {errors.firstName && (
            <p style={{color:"orangered"}}>{errors.firstName}</p>
        )}
    </div>

    <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}></input>
        {errors.lastName && (
            <p style={{color:"orangered"}}>{errors.lastName}</p>
        )}
    </div>

    <div>
        <label>Email:</label>
        <input name="email" value={formData.email} onChange={handleChange}></input>
        {errors.email && (
            <p style={{color:"orangered"}}>{errors.email}</p>
        )}
    </div>

    <div>
        <label>Age:</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange}></input>
        {errors.age && (
            <p style={{color:"orangered"}}>{errors.age}</p>
        )}
    </div>

    <div>
        <label>Gender:</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        </select>
        {errors.gender && (
            <p style={{color:"orangered"}}>{errors.gender}</p>
        )}
    </div>

    <div>
        <label>Address:</label>
        <input name="city" value={formData.address.city}></input>
        {errors.address?.city && (
            <p style={{color:"orangered"}}>{errors.address?.city}</p>
        )}
    
        <input name="state" value={formData.address.state}></input>
        {errors.address?.state && (
            <p style={{color:"orangered"}}>{errors.address.state}</p>
        )}
    </div>

    <div>
        <label>Start Date:</label>
        <DatePicker selected={formData.startDate}/>
    </div>

    <div>
        <label>Hobbies:</label>
       {formData?.hobbies.map((hobby, index)=>(
        <div key={index}>
            <input type="text" name="name" value={hobby.name} placeholder="Hobby Name" onChange={}></input>
            {errors.hobbies?.[index]?.name && (
                <p style={{color: "orangered"}}>{errors.hobbies?.[index].name}</p>
            )}
            {formData.hobbies.length > 1 && (
                <button type="button" onClick={()=>}>Remove Hobby</button>
            )}
        </div>
       ))}

       <button type="button">Add Hobby</button>
        
    </div>

     <div>
        <label htmlFor="sub">Subscribe to Newsletter</label>
        <input
          type="checkbox"
          id="sub"
          name="subscribe"
          checked={formData.subscribe}
          onChange={(e) =>
            setFormData({ ...formData, subscribe: e.target.checked })
          }
        />
      </div>

    {formData.subscribe && (
        <div>
            <label>
                Referral Source
            </label>
            <input name="referral" value={formData.refferal} onChange={} placeholder="How did you hear about us?"></input>
            {errors.refferal && (
                <p style={{color:"orangered"}}>{errors.referral}</p>
            )}

        </div>

    )}

    {errors.root && <p style={{color:"red"}}>{errors.root}</p>}

    <button type="submit" disabled={isSubmitting}> {isSubmitting ? "Submitting..." : "Submit"}</button>
</form>
    )

}