import React, { Component } from 'react'

import * as firebase from 'firebase/app'
import 'firebase/firestore'

import Card from './Card'

export default class Home extends Component {

  state = {
    vinhos: []
  }

  componentDidMount() {
    this.loadvinhos()
  }

  loadvinhos = () => {
    let vinhos = []

    firebase.firestore().collection('vinhos').orderBy('nome').onSnapshot(snapshot => {

      snapshot.docChanges().forEach(change => {

        if (change.type === 'added') {
          vinhos.push({ id: change.doc.id, ...change.doc.data() })
        }

        if (change.type === 'modified') {
          vinhos = vinhos.map(vinho => vinho.id === change.doc.id ?
            { id: change.doc.id, ...change.doc.data() }
            : vinho)
        }

        if (change.type === 'removed') {
          vinhos = vinhos.filter(vinho => vinho.id !== change.doc.id)
        }
      })
      this.setState({ vinhos })
    })
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          {this.state.vinhos.map((vinho) => (
            <Card key={vinho.id}
              id={vinho.id}
              nome={vinho.nome}
              foto={vinho.foto}
              uva={vinho.uva}
              tipo={vinho.tipo}
              origem={vinho.origem}
              safra={vinho.safra}
              alcool={vinho.alcool}
            />
          ))}
        </div>
      </div>
    )
  }
}
