import { useState } from "react";

const BunnyCreate = (props) => {
  // pull out our props
  const { user, msgAlert} = props

  // build our state object
  const [bunny, setBunny] = useState({
    name: '',
    type: '',
    age: '',

  })
}

return (
  <h1>Create Bunny Component</h1>
)
export default BunnyCreate
