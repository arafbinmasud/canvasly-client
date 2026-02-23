import useAuth from "../hooks/useAuth"


const Home = () => {
  const authInfo = useAuth();
  console.log(authInfo);
  
  

  return (
    <div className=" my-5 bg-">
        <h3 className="text-5xl font-heading font-bold">Hello I am home</h3>
        
        
    </div>
  )
}

export default Home