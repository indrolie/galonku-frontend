import React, { Component } from 'react'
import { Button, Card, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import MenuLogin from '../../../../MenuLogin'
import { getLocalstorage } from '../../../../function/Localstorage'
import getOrders from '../../../../function/GetOrders'
import MerchantButton from './Button'

import './index.css'

export default class OrderDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fullname: '',
      quantities: '',
      address: '',
      phone_number: '',
      notes: '',
      total_price: '',
      status: '',
      interval: ''
    }
  }

  updateParentStatus = (status) => {
    this.setState({
      status
    })
  }

  fetchOrders = () => {
    const orderDetails = async () => {
      const data = await getLocalstorage('Account')
      const storage = await getLocalstorage('Order')

      const response = await getOrders(`/orders/order/${storage.id}`, data.token)
      const order = response.data

      this.setState({
        fullname: order.fullname,
        quantities: order.quantities,
        address: order.address,
        phone_number: order.phone_number,
        notes: order.notes,
        total_price: order.Total,
        status: order.status,
      })
    }

    orderDetails()
  }

  componentDidMount = async () => {
    this.fetchOrders()
    const fetch = setInterval(this.fetchOrders, 15000)
    this.setState({ interval: fetch })
  }

  componentWillUnmount = () => {
    clearInterval(this.state.interval)
  }

  render() {
    return (
      <MenuLogin>
        <div className='container'>
          <Card className='box'>
            <Card.Content>
              <Card.Header>Informasi pesanan</Card.Header>
              <Card.Description className='information'>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      Nama pemesan: <b>{this.state.fullname}</b>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      Alamat pemesan: <b>{this.state.address}</b>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={8}>
                      Jumlah galon: <b>{this.state.quantities}</b>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      Nomor telepon pemesan: <b>{this.state.phone_number}</b>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={8}>
                      Biaya total pesanan: Rp. <b>{this.state.total_price}</b>
                    </Grid.Column>
                    <Grid.Column width={8}>
                      Catatan: <b>{this.state.notes}</b>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={16} className='status'>
                      Status: <b>{this.state.status}</b>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

              </Card.Description>
            </Card.Content>
            <Card.Content extra>

              <Grid>
                <Grid.Column floated='left' width={5} className='button-return'>
                  <Link to='/merchants/open'>
                    <Button>Kembali</Button>
                  </Link>
                </Grid.Column>
                <MerchantButton updateParentStatus={this.updateParentStatus}>
                  {this.state.status}
                </MerchantButton>
              </Grid>

            </Card.Content>
          </Card>
        </div>
      </MenuLogin >
    )
  }
}
