import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Product from "../components/product"
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Buffer from '../components/Buffer';
import Message from '../components/Message'
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomeScreen = () => {
    const { pageNumber, keyword } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });


    return (
        <>
            {
                !keyword ? <ProductCarousel /> :
                    (<Link to='/' className='btn btn-light mb-4'>Go Back</Link>)
            }

            {isLoading ? (<Buffer />) : error ? (<Message> {error?.data.message || error.error}</Message>) : (
                <>
                    <Row>
                        {
                            data.products.map((product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))
                        }
                    </Row>
                    <Paginate
                        pages={data.pages}
                        page={data.page}
                        keyword={keyword ? keyword : ''} />
                </>
            )}



        </>
    )
}

export default HomeScreen;