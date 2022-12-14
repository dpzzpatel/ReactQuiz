import Spinner from 'react-bootstrap/Spinner';

function Loader(){
    return(
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
        </div>
    )
}

export default Loader;