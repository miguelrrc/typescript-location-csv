import * as React from 'react'
import { Table } from 'reactstrap'
import { fetchApartments, fetchApartmentsLocation } from './Api'
import Apartment from './components/Apartment'
import { IApartment } from './interfaces/IApartment'

interface IAppState {
  readonly apartments: IApartment[]
  readonly priceSqmMean?: number
  readonly livingAreaSqmMean?: number
  readonly loading: boolean
}

class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      apartments: [],
      priceSqmMean: undefined,
      livingAreaSqmMean: undefined,
      loading: false,
    }
  }

  public componentDidMount() {
    this.setState({ loading: true })
    fetchApartments()
      .then(apartments => this.setState({ loading: false, apartments }))
      .catch(e => {
        if (process.env.NODE_ENV === 'development') {
          console.log('error: ', e)
        }
        alert('Error fetching data')
      })
  }

  public locationSelected = (latitude: number, longitude: number) => {
    this.setState({ loading: true })
    fetchApartmentsLocation(latitude, longitude)
      .then(median =>
        this.setState({
          apartments: median.apartments,
          priceSqmMean: median.priceSqmMean,
          livingAreaSqmMean: median.livingAreaSqmMean,
          loading: false,
        }),
      )
      .catch(e => {
        if (process.env.NODE_ENV === 'development') {
          console.log('error: ', e)
        }
        alert('Error fetching data')
      })
  }

  public render() {
    const { priceSqmMean, apartments, loading } = this.state

    if (loading) {
      return <div>Loading</div>
    }

    return (
      <div>
        {priceSqmMean && this.renderMean()}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Square meter</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{apartments && apartments.map(apartment => this.renderApartment(apartment))}</tbody>
        </Table>
      </div>
    )
  }

  private renderApartment = (apartment: IApartment) => (
    <Apartment key={apartment.id} onLocationSelected={this.locationSelected} apartment={apartment} />
  )

  private renderMean = () => (
    <div>
      <p>{`Price square meter average:  ${this.state.priceSqmMean} €`}</p>
      <p>{`Living square meter average:  ${this.state.livingAreaSqmMean} sqm`}</p>
    </div>
  )
}

export default App
