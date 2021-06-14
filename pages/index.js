import Link from 'next/link'

import { sanityClient, urlFor } from '../sanity'
import { isMultiple } from '../utils/isMultiple'

import DashboardMap from '../components/DashboardMap'

const Home = ({ properties }) => {
  return (
    <>
      {properties && (
        <div className="main">
          <div className="feed-container">
            <h1>Places to stay near you</h1>
            <div className="feed">
              {properties.map((property) => (
                <Link key={property._id} href={`/property/${property.slug.current}`}>
                  <div className="card">
                    <img src={urlFor(property.mainImage)} />
                    <p>{property.reviews.length} review{isMultiple(property.reviews.length)}</p>
                    <h3>{property.title}</h3>
                    <h3>£{property.pricePerNight}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="map">
            <DashboardMap properties={properties} />
          </div>
        </div>
      )}
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "property"]'
  const properties = await sanityClient.fetch(query)

  if (!properties.length) {
    return {
      props: {
        properties: [],
      }
    }
  } else {
    return {
      props: {
        properties
      }
    }
  }
}

export default Home