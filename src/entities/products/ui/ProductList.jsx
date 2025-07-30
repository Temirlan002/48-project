import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productApi";
import { Avatar, Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const { Meta } = Card;

const ProductList = () => {


  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  })

  console.log('Products:', data);
  

  return (
    <div>
      <Link to={'/products/create'}>
        <Button>Добавить продукт</Button>
      </Link>
    <Row gutter={[16, 16]}>
      {data?.data?.map((product) => (
        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
          <Card 
            hoverable
            cover={product.image ? (
              <img
                alt=""
                src={product.image}
                style={{height: 200, objectFit: 'cover'}}
              />
              
            ) : (
              <div 
                style={{
                  height: 200, 
                  background: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                }}
              >
                No image
              </div>
            )
            }
          >
            <Meta 
              avatar={<Avatar>{product.user?.username?.[0]?.toUpperCase()}</Avatar>}
              title={product.title}
              description={
                <>
                  <p>{product.description}</p>
                  <p style={{marginTop: 8, fontSize: 12, color: '#888'}}>
                    Category: <b>{product.categories?.title || '-'}</b>
                  </p>
                  <p style={{marginTop: 4, fontSize: 12, color: '#888'}}>
                    Seller: <b>{product.user?.username}</b>
                  </p>
                </>
              }
            />
            <Link to={`/products/${product.id}/edit`}>
              <Button type="link">Редактировать</Button>
            </Link>
          </Card>
        </Col>
      ))}
    </Row>
    </div>
  )
}

export default ProductList;