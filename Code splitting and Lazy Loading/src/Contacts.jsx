import { useParams } from "react-router-dom";

const Contact = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <h1>This is the Contact Component</h1>
      <h1>{id}</h1>
    </>
  );
};

export default Contact;
