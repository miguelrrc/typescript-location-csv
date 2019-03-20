import * as React from 'react'
import { Table } from 'reactstrap'
import { fetchApartments, fetchApartmentsLocation } from './Api'
import Apartment from './components/Apartment'
import { IApartment } from './interfaces/IApartment'

interface IAppState {
  readonly apartments: IApartment[]
  readonly priceSqmMean?: number
  readonly livingAreaSqmMean?: number
}

class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      apartments: [],
      priceSqmMean: undefined,
      livingAreaSqmMean: undefined,
    }
  }

  public componentDidMount() {
    fetchApartments().then(apartments => this.setState({ apartments }))
  }

  public locationSelected = (latitude: number, longitude: number) => {
    fetchApartmentsLocation(latitude, longitude).then(median =>
      this.setState({
        apartments: median.apartments,
        priceSqmMean: median.priceSqmMean,
        livingAreaSqmMean: median.livingAreaSqmMean,
      }),
    )
  }

  public render() {
    const { priceSqmMean, apartments } = this.state
    return (
      <div>
        {priceSqmMean && this.renderMean()}
        <Table responsive>
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
      <p>Living square meter average: {this.state.livingAreaSqmMean}</p>
    </div>
  )
}

export default App
