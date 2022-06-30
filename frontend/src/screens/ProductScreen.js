import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
  const [qty, setQty] = useState(0);
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;


  useEffect( () => {
        dispatch(listProductDetails(id));
    } , [dispatch, id]);

    const addToCartHandler = () => {
      navigate(`/cart/${id}?qty=${qty}`);
    }


  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {
        loading ? <Loader></Loader> : error ? <Message variant>{error}</Message>
        :(
          <Row>
            <Col md={6}>
                <Image src={product?.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                      <h2>{product.name}</h2>
                  </ListGroupItem>
                  <ListGroupItem>
                      <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                  </ListGroupItem>
                  <ListGroupItem>
                    Price: ${product.price}
                  </ListGroupItem>
                  <ListGroupItem>
                    Description: {product.description}
                  </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                  Price: 
                                </Col>
                                <Col>
                                  <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>
                                  Status: 
                                </Col>
                                <Col>
                                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroupItem>
                        {
                          product.countInStock > 0 && (
                            <ListGroupItem>
                              <Row>
                                <Col>QTY</Col>
                                <Col>
                                  <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                      {
                                        [...Array(product.countInStock).keys()].map(x => (
                                          <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                          </option>
                                        ))
                                      }
                                  </Form.Control>
                                </Col>
                              </Row>
                            </ListGroupItem>
                          )
                        }
                        <ListGroupItem>
                          <Button onClick={addToCartHandler} 
                          className='btn-block' type='button' disabled={product.countInStock === 0 }>
                            Add To Cart
                          </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
          </Row>
        )}
    </>
  )
}

export default ProductScreen