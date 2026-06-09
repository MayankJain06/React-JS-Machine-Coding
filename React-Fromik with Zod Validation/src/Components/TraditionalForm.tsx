import { useState } from "react"
import type { FormData } from "../types/index"
import DatePicker from "react-datepicker";
import simulatedApi from "../api/api";


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


 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  if (name.includes(".")) {
    const [parent, child] = name.split(".") as [keyof FormData, string];

    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent] as any),
        [child]: value,
      },
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

    const handleHobbyChange = (index:number, e:React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = e.target;
        const hobbies =[...formData.hobbies];
        hobbies[index]["name"] = value;
        setFormData({
            ...formData,
            hobbies,
        });
    }

    const addHobby = ()=>{
        setFormData({
            ...formData,
            hobbies: [...formData.hobbies, {name: ""}],
        })
    }

    const removeHobby = (index:number)=>{
        const hobbies = [...formData.hobbies];
        hobbies.splice(index,1);
        setFormData({
            ...formData,
            hobbies,
        });
    };


   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    const newErrors: any = {};

    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email.match(/^\S+@\S+$/i))
      newErrors.email = "Invalid email address";
    if (formData.age < 18) newErrors.age = "You must be at least 18 years old";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address.city)
      newErrors.address = { city: "City is required" };
    if (!formData.address.state)
      newErrors.address = { ...newErrors.address, state: "State is required" };

    formData.hobbies.forEach((hobby, index) => {
      if (!hobby.name) {
        if (!newErrors.hobbies) newErrors.hobbies = [];
        newErrors.hobbies[index] = { name: "Hobby name is required" };
      }
    });

    if (formData.subscribe && !formData.refferal)
      newErrors.referral = "Referral source is required if subscribing";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await simulatedApi(formData);
      console.log("Success:", response);
    } catch (error: any) {
      console.error("Error:", error);
      setErrors({ root: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <input name="address.city" value={formData.address.city} placeholder="City" onChange={handleChange
      
    }></input>
        {errors.address?.city && (
            <p style={{color:"orangered"}}>{errors.address?.city}</p>
        )}
    
        <input name="address.state" value={formData.address.state} onChange={handleChange}></input>
        {errors.address?.state && (
            <p style={{color:"orangered"}}>{errors.address.state}</p>
        )}
    </div>

    <div>
        <label>Start Date:</label>
        <DatePicker selected={formData.startDate} onChange={(date:Date | null)=>
            setFormData({...formData, startDate : date || new Date()})
        }/>
    </div>

    <div>
        <label>Hobbies:</label>
       {formData?.hobbies.map((hobby, index)=>(
        <div key={index}>
            <input type="text" name="name" value={hobby.name} placeholder="Hobby Name" onChange={(e)=>handleHobbyChange(index,e)}></input>
            {errors.hobbies?.[index]?.name && (
                <p style={{color: "orangered"}}>{errors.hobbies?.[index].name}</p>
            )}
            {formData.hobbies.length > 1 && (
                <button type="button" onClick={()=>removeHobby(index)}>Remove Hobby</button>
            )}
        </div>
       ))}

       <button type="button" onClick={addHobby}>Add Hobby</button>
        
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
            <input name="refferal" value={formData.refferal} onChange={handleChange} placeholder="How did you hear about us?"></input>
            {errors.refferal && (
                <p style={{color:"orangered"}}>{errors.refferal}</p>
            )}

        </div>

    )}

    {errors.root && <p style={{color:"red"}}>{errors.root}</p>}

    <button type="submit" disabled={isSubmitting}> {isSubmitting ? "Submitting..." : "Submit"}</button>
</form>
    )

}

export default SimpleForm;