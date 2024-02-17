import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

const Response = (props) => {

  return (
<Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4" style={{ color: '#f0ad4e' }}>Quiz Results</h1>
          <Card style={{ backgroundColor: '#fdf8e7', border: '1px solid #f0ad4e' }}>
            <Card.Body>
              <Card.Title className="text-center">Hello {props.user}</Card.Title>
              <Card.Text className="text-center">
                You scored {props.marks} out of {props.noOfQuestions}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Response