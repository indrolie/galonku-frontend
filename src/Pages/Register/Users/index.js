import React from 'react'
import { Container, Button, Form, Checkbox } from 'semantic-ui-react'

const RegisterUsers = () => (
  <div className=''>
    <label className='daftar-users'>Daftar Pengguna</label>
    <Container>
      <Form>
        <Form.Field>
          <label>Username</label>
          <Form.Input width={8} placeholder='Username' />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <Form.Input width={8} placeholder='Email' />
        </Form.Field>
        <Form.Field>
          <label>Kata Sandi</label>
          <Form.Input width={8} type='password' placeholder='Kata Sandi' />
        </Form.Field>
        <Form.TextArea label='Alamat' placeholder='Alamat' />
        <Form.Field>
          <Checkbox label='Saya Setuju dengan persyaratan dan ketentuan galonku.com' />
        </Form.Field>
        <Button type='submit'>Daftar</Button>
      </Form>
    </Container>
  </div>
)

export default RegisterUsers