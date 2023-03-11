import './index.css'

const NotFound = () => (
  <div className="not-found">
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
      className="failure-image"
    />
    <h1 className="last-h">Page Not Found</h1>
    <p className="last-p">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)
export default NotFound
