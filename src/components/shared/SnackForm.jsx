import { Form, Button, Container } from 'react-bootstrap'

const SnackForm = (props) => {
    
const { snack, handleChange, handleSubmit, heading } = props

return (
  <Container className="justify-content-center">
    <h3>{heading}</h3>
    <Form onSubmit={handleSubmit}>
      <Form.Group className='m-2'>
      <Form.Label>Name: </Form.Label>
      <Form.Control 
        placeholder="What is the snack's name?"
        id="name"
        name="name"
        value={ snack.name }
        onChange={handleChange}
      />
  </Form.Group>
  <Form.Group className='m-2'>
      <Form.Label>Description: </Form.Label>
      <Form.Control 
        placeholder="What kind of snacks is this?"
        id="description"
        name="description"
        value={ snack.description }
        onChange={handleChange}
      />
  </Form.Group>
  <Form.Group className='m-2'>
      <Form.Check 
        label="Is this snack new?"
        name="isSqueaky"
        defaultChecked={ snack.isSqueaky }
        onChange={handleChange}
      />
  </Form.Group>
  <Form.Group className='m-2'>
      <Form.Select
        aria-label="snack condition"
        name="condition"
        defaultValue={ snack.condition }
        onChange={handleChange}
      >
      <option>Open this select menu</option>
      <option value="new">new</option>
      <option value="used">used</option>
      <option value="disgusting">disgusting</option>
      </Form.Select>
  </Form.Group>
  <Button className="m-2" type="submit">Submit</Button>
    </Form>
    </Container>
  )
}

export default SnackForm 