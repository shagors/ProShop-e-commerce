import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';

const ProductScreen = () => {
  const {id} = useParams();
  const [product, setProduct] = useState({});

  useEffect( () => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data);
        }
        fetchProduct();
    } , []);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
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
                    <ListGroupItem>
                      <Button className='btn-block' type='button' disabled={product.countInStock === 0 }>
                        Add To Cart
                      </Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen