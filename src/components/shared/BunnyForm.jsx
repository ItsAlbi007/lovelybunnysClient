// this form will take several props, and will be used by BunnyCreate as well as BunnyUpdate
// the action will be dependent upon the parent component(update or create)
// but the form itself, will look the same on both pages
import { Form, Button, Container } from 'react-bootstrap'

const BunnyForm = (props) => {
  // we need several specific props to make this bunny form reusable
  // we need the object itself (a bunny), a handleChange, and a handleSubmit
  // those functions will be determined by the parent component and passed to the form as a prop.
  // we'll also add a custom heading to the form, that will change depending on the parent
  const { bunny, handleChange, handleSubmit, heading } = props

  return (
    <Container className="justify-content-center">
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='m-2'>
          <Form.Label>Name: </Form.Label>
          <Form.Control
            placeholder="What is your bunny's name?"
            id="name"
            name="name"
            value={ bunny.name }
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Label>Type: </Form.Label>
          <Form.Control
            placeholder="What is your bunny's type?"
            id="type"
            name="type"
            value={ bunny.type }
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Label>Age: </Form.Label>
          <Form.Control
            type="number"
            placeholder="How old is your bunny?"
            id="age"
            name="age"
            value={ bunny.age }
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Check
            label="Is this Bunny forsale"
            name="forsale"
            // defaultChecked={bunny.forsale}
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="m-2" type="submit">Submit</Button>
      </Form>

    </Container>
  )
}

export default BunnyForm