import * as React from 'react'
import { IApartment } from '../interfaces/IApartment'

interface IApartmentProps {
  readonly apartment: IApartment
  readonly onLocationSelected: (longitude: number, latitude: number) => void
}

class Apartment extends React.Component<IApartmentProps> {
  constructor(props: IApartmentProps) {
    super(props)
  }

  public render() {
    const { apartment } = this.props
    return (
      <tr onClick={this.onSelectApartment}>
        <th scope="row">{apartment.id}</th>
        <td>{apartment.longitude}</td>
        <td>{apartment.latitude}</td>
        <td>{apartment.livingSqm}</td>
        <td>{`${apartment.priceSqm} €`}</td>
      </tr>
    )
  }

  private onSelectApartment = () => {
    const { onLocationSelected, apartment } = this.props
    onLocationSelected(apartment.longitude, apartment.latitude)
  }
}

export default Apartment
