import { useState } from "react";
import BunnyForm from "../shared/BunnyForm";
import { useNavigate } from "react-router-dom";
import { createBunny } from "../../api/bunny";
import messages  from '../shared/AutoDismissAlert/messages'


const BunnyCreate = (props) => {
  // pull out our props
  const { user, msgAlert} = props
  const navigate = useNavigate()
  // build our state object
  const [bunny, setBunny] = useState({
    name: '',
    type: '',
    age: '',
    forsale: false
  })

  const onChange = (e) => {
    // e is the placeholder for the event
    // e.persist is bc react uses the virtual dom, we want our form data to persist every time the page renders. Which will be a lot of times.
    e.persist()

    // if you pass an argument to the callback function of your state hook updater, that argument is a placeholder for the most recent state, this will maintain anything that you have typed before the next letter
    // prevBunny is a placeholder(parameter) for the LAST condition of our state.
    setBunny(prevBunny => {
        const updatedName = e.target.name
        let updatedValue = e.target.value

        // the above two items work great for strings
        // however, we need to handle numbers and booleans as well
        if (e.target.type === 'number') {
            // if the target is a number, parst integers from the value
            updatedValue = parseInt(e.target.value)
        }

        // to handle our checkbox, we need to tell it when to send true and when to send false. Because the default values for a checkbox are 'checked' or 'unchecked', we need to convert those to the appropriate boolean value
        if (updatedName === 'forsale' && e.target.checked) {
            updatedValue = true
        } else if (updatedName === 'forsale' && !e.target.checked) {
            updatedValue = false
        }

        // this will actually buiild our bunny object
        // we grab an attribute name, and assign the respective value
        const updatedBunny = { [updatedName] : updatedValue }

        // to keep all the old stuff, and add newly typed letter/numbers etc
        return {
            ...prevBunny, ...updatedBunny
        }
    })
}

const onSubmit = (e) => {
    e.preventDefault()

    createBunny(user, bunny)
        .then(res => { navigate(`/bunnys/${res.data.bunny.id}`)})
        .then(() => {
            msgAlert({
                heading: 'Oh Yeah!',
                message: messages.createBunnySuccess,
                variant: 'success'
            })
        })
        .catch(err => {
            msgAlert({
                heading: 'Oh no!',
                message: messages.generalError,
                variant: 'danger'
            })
        })
}
console.log('the bunny inside create', bunny)
return (
  <BunnyForm
    bunny={bunny}
    handleChange={onChange}
    handleSubmit={onSubmit}
    heading="Add a new bunny"
    />
  )
}

export default BunnyCreate
