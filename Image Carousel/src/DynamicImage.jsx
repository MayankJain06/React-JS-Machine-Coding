const DynamicImage = ({ url, alt, className }) => {
  return <img src={url} alt={alt} className={className}></img>;
};

export default DynamicImage;
